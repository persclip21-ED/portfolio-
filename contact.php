<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, string $message): never
{
    http_response_code($status);
    echo json_encode(['message' => $message], JSON_UNESCAPED_SLASHES);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, 'Use the contact form to send a message.');
}

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (stripos($contentType, 'application/json') !== 0) {
    respond(415, 'The form request could not be read. Please refresh and try again.');
}

$input = json_decode(file_get_contents('php://input') ?: '', true);
if (!is_array($input)) {
    respond(400, 'The form data is invalid. Please try again.');
}

if (!empty($input['website'])) {
    respond(200, 'Thanks. Your message has been received.');
}

$name = trim((string) ($input['name'] ?? ''));
$email = trim((string) ($input['email'] ?? ''));
$subject = trim((string) ($input['subject'] ?? ''));
$message = trim((string) ($input['message'] ?? ''));

if (mb_strlen($name) < 2 || mb_strlen($name) > 100) {
    respond(422, 'Please enter a name between 2 and 100 characters.');
}
if (strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, 'Please enter a valid email address.');
}
if (mb_strlen($subject) < 2 || mb_strlen($subject) > 150 || preg_match('/[\r\n]/', $subject)) {
    respond(422, 'Please enter a subject between 2 and 150 characters.');
}
if (mb_strlen($message) < 10 || mb_strlen($message) > 5000) {
    respond(422, 'Please enter a message between 10 and 5000 characters.');
}

$config = require __DIR__ . '/contact-config.php';
$recipient = trim((string) ($config['recipient'] ?? ''));
if ($recipient === '' || !filter_var($recipient, FILTER_VALIDATE_EMAIL)) {
    respond(503, 'The contact form is not configured yet. Set a valid recipient in contact-config.php or PORTFOLIO_CONTACT_EMAIL.');
}

$safeName = preg_replace('/[\r\n]+/', ' ', $name);
$mailSubject = 'Portfolio message: ' . preg_replace('/[\r\n]+/', ' ', $subject);
$body = "Name: {$safeName}\nEmail: {$email}\nSubject: {$subject}\n\n{$message}";
$headers = [
    'From' => 'Portfolio contact <no-reply@localhost>',
    'Reply-To' => $email,
    'Content-Type' => 'text/plain; charset=UTF-8',
];

try {
    $accepted = mail($recipient, $mailSubject, $body, $headers);
} catch (Throwable $error) {
    $accepted = false;
}

if (!$accepted) {
    respond(503, 'The mail server could not accept your message. Please try again later or contact me through a social link.');
}

respond(200, 'Your message was accepted by the mail server. Thank you for reaching out.');