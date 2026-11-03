<?php
return [
    // Set this to the inbox that should receive portfolio messages.
    'recipient' => getenv('PORTFOLIO_CONTACT_EMAIL') ?: '',
];