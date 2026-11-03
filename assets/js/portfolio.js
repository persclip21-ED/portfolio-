const portfolio = {
  skills: [
    { name: "React", category: "Frontend", icon: "react" },
    { name: "JavaScript", category: "Frontend", icon: "javascript" },
    { name: "HTML", category: "Frontend", icon: "html5" },
    { name: "Tailwind CSS", category: "Frontend", icon: "tailwindcss" },
    { name: "PHP", category: "Backend", icon: "php" },
    { name: "Java", category: "Backend", icon: "openjdk" },
    { name: "Flutter", category: "Mobile", icon: "flutter" },
    { name: "MySQL", category: "Database", icon: "mysql" },
    { name: "Git", category: "DevOps", icon: "git" },
    { name: "Figma", category: "Tools", icon: "figma" }
  ],
  projects: [],
  education: {
    date: "CURRENT",
    course: "Information Technology",
    school: "ACLC College of Mandaue",
    note: "I’m studying programming, web development, and database fundamentals as I build my skills in technology."
  },
  contact: {
    email: "edcyrellelendio2@gmail.com",
    phone: "938 309 9796",
    phoneHref: "tel:+639383099796"
  },
  services: [
    { title: "Web development", detail: "Responsive websites built around your needs." },
    { title: "Frontend development", detail: "Accessible, polished interfaces for the web." },
    { title: "Database management", detail: "Organized data and practical database support." }
  ],
  socials: [
    { label: "GitHub", url: "https://github.com/persclip21-ED" },
    { label: "Facebook", url: "https://www.facebook.com/ed.cyrelle.lendio.2025" }
  ]
};

const safeExternalUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
  } catch {
    return "";
  }
};

function renderSkills(category = "All") {
  const skillGrid = document.querySelector("#skill-grid");
  const skills = category === "All"
    ? portfolio.skills
    : portfolio.skills.filter((skill) => skill.category === category);
  skillGrid.replaceChildren();

  skills.forEach((skill) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "skill-chip";
    chip.dataset.skillName = skill.name;
    chip.setAttribute("aria-label", `Show ${skill.name}`);
    chip.setAttribute("aria-expanded", "false");
    chip.title = `Show ${skill.name}`;
    const logo = document.createElement("img");
    logo.src = `https://cdn.simpleicons.org/${skill.icon}`;
    logo.alt = "";
    logo.loading = "lazy";
    logo.decoding = "async";
    const name = document.createElement("span");
    name.className = "skill-name";
    name.textContent = skill.name;
    chip.append(logo, name);
    chip.addEventListener("click", () => {
      const shouldExpand = chip.getAttribute("aria-expanded") !== "true";
      skillGrid.querySelectorAll(".skill-chip").forEach((item) => {
        item.classList.remove("is-expanded");
        item.setAttribute("aria-expanded", "false");
        item.setAttribute("aria-label", `Show ${item.dataset.skillName}`);
        item.title = `Show ${item.dataset.skillName}`;
      });
      if (shouldExpand) {
        chip.classList.add("is-expanded");
        chip.setAttribute("aria-expanded", "true");
        chip.setAttribute("aria-label", skill.name);
        chip.title = skill.name;
      }
    });
    skillGrid.append(chip);
  });
}

function setupSkillFilters() {
  const filterGroup = document.querySelector("#skill-filters");
  const categories = ["All", "Frontend", "Backend", "Mobile", "Database", "DevOps", "Tools"];

  categories.forEach((category, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "skill-filter";
    button.textContent = category;
    button.setAttribute("aria-pressed", String(index === 0));
    button.addEventListener("click", () => {
      filterGroup.querySelectorAll(".skill-filter").forEach((filter) => {
        filter.setAttribute("aria-pressed", String(filter === button));
      });
      renderSkills(category);
    });
    filterGroup.append(button);
  });
}

function renderPortfolio() {
  renderSkills();
  const projectGrid = document.querySelector("#project-grid");
  portfolio.projects.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project-card reveal";
    const image = safeExternalUrl(project.image);
    card.innerHTML = `<div class="project-art"><span class="project-index">0${index + 1}</span><img loading="lazy" src="" alt=""></div><div class="project-content"><div class="project-topline"><span class="project-category"></span><span class="project-year"></span></div><h3></h3><p class="project-description"></p><div class="project-tags"></div><div class="project-links"></div></div>`;
    const imageElement = card.querySelector("img");
    if (image) imageElement.src = image;
    imageElement.alt = project.imageAlt || "";
    card.querySelector(".project-category").textContent = project.category;
    card.querySelector(".project-year").textContent = project.year;
    card.querySelector("h3").textContent = project.title;
    card.querySelector(".project-description").textContent = project.description;
    const tags = card.querySelector(".project-tags");
    project.tags.forEach((tag) => {
      const item = document.createElement("span");
      item.className = "project-tag";
      item.textContent = tag;
      tags.append(item);
    });
    const links = card.querySelector(".project-links");
    [["GitHub", project.github], ["Live demo", project.demo]].forEach(([label, url]) => {
      const safeUrl = safeExternalUrl(url);
      if (!safeUrl) return;
      const link = document.createElement("a");
      link.href = safeUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.append(document.createTextNode(label));
      const arrow = document.createElement("span");
      arrow.textContent = "↗";
      link.append(arrow);
      links.append(link);
    });
    if (!links.childElementCount) {
      const note = document.createElement("span");
      note.className = "project-links-note";
      note.textContent = "Project links can be added in assets/js/portfolio.js";
      links.append(note);
    }
    projectGrid.append(card);
  });

  document.querySelector("#education-date").textContent = portfolio.education.date;
  document.querySelector("#education-course").textContent = portfolio.education.course;
  document.querySelector("#education-school").textContent = portfolio.education.school;
  document.querySelector("#education-note").textContent = portfolio.education.note;

  const serviceList = document.querySelector("#service-list");
  portfolio.services.forEach((service, index) => {
    const row = document.createElement("article");
    row.className = "service-row";
    row.innerHTML = `<span class="service-number">0${index + 1}</span><h3></h3><p></p><span class="service-arrow" aria-hidden="true">↗</span>`;
    row.querySelector("h3").textContent = service.title;
    row.querySelector("p").textContent = service.detail;
    serviceList.append(row);
  });

  const socialLinks = document.querySelector("#social-links");
  [
    { label: portfolio.contact.email, href: `mailto:${portfolio.contact.email}` },
    { label: portfolio.contact.phone, href: portfolio.contact.phoneHref }
  ].forEach((contact) => {
    const link = document.createElement("a");
    link.href = contact.href;
    link.textContent = contact.label;
    socialLinks.append(link);
  });
  portfolio.socials.forEach((social) => {
    const url = safeExternalUrl(social.url);
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = `${social.label} ↗`;
    socialLinks.append(link);
  });
  document.querySelector("#year").textContent = new Date().getFullYear();
}

function setupNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    nav.classList.remove("is-open");
  };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    nav.classList.toggle("is-open", open);
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

function setupTheme() {
  const toggle = document.querySelector(".theme-toggle");
  let transitionActive = false;
  const updateLabel = () => {
    const dark = document.documentElement.dataset.theme === "dark";
    toggle.setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} mode`);
    toggle.title = `Switch to ${dark ? "light" : "dark"} mode`;
    toggle.querySelector(".theme-icon").textContent = dark ? "☼" : "◐";
  };
  updateLabel();
  toggle.addEventListener("click", (event) => {
    if (transitionActive) return;
    const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    const bounds = toggle.getBoundingClientRect();
    const originX = event.clientX || bounds.left + bounds.width / 2;
    const originY = event.clientY || bounds.top + bounds.height / 2;
    const updateTheme = () => {
      root.dataset.theme = theme;
      localStorage.setItem("portfolio-theme", theme);
      updateLabel();
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      updateTheme();
      return;
    }

    transitionActive = true;
    const wipe = document.createElement("div");
    wipe.className = "theme-wipe";
    wipe.setAttribute("aria-hidden", "true");
    wipe.style.setProperty("--wipe-x", `${originX}px`);
    wipe.style.setProperty("--wipe-y", `${originY}px`);
    wipe.style.setProperty("--wipe-color", theme === "light" ? "#f6f9ff" : "#101927");
    wipe.addEventListener("animationend", () => {
      updateTheme();
      wipe.classList.add("is-settling");
      wipe.addEventListener("transitionend", () => {
        wipe.remove();
        transitionActive = false;
      }, { once: true });
    }, { once: true });
    document.body.append(wipe);
  });
}

function setupPortrait() {
  const image = document.querySelector(".portrait-image");
  const fallback = document.querySelector(".portrait-fallback");
  const showFallback = () => {
    image.hidden = true;
    fallback.classList.add("is-visible");
  };

  if (image.complete && image.naturalWidth === 0) showFallback();
  else image.addEventListener("error", showFallback, { once: true });
}

function setupReveal() {
  const revealItems = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  document.documentElement.classList.add("reveal-ready");
  const revealVisibleItems = () => {
    revealItems.forEach((item) => {
      const bounds = item.getBoundingClientRect();
      if (bounds.top >= window.innerHeight - 24 || bounds.bottom <= 24) return;
      item.classList.add("is-visible");
      observer.unobserve(item);
    });
  };
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });

  revealItems.forEach((item) => observer.observe(item));
  revealVisibleItems();
  window.addEventListener("scroll", revealVisibleItems, { passive: true });
  window.addEventListener("resize", revealVisibleItems);
  document.addEventListener("visibilitychange", revealVisibleItems);
}

renderPortfolio();
setupSkillFilters();
setupNavigation();
setupTheme();
setupPortrait();
setupReveal();
