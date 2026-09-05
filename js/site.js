function setMenuOpen(isOpen) {
  document.body.classList.toggle("nav-open", isOpen);
  const menuButton = document.querySelector(".menu-toggle");
  if (menuButton) {
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  }
}

function toggleMenu() {
  setMenuOpen(!document.body.classList.contains("nav-open"));
}

function closeMenu() {
  setMenuOpen(false);
}

function markCurrentNav() {
  const path = window.location.pathname.replace(/index\.html$/, "");
  document.querySelectorAll('.site-nav a[href]').forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("mailto:") || href.startsWith("http")) return;
    const normalized = href.replace(/index\.html$/, "");
    if (normalized !== "/" && path.startsWith(normalized)) {
      link.setAttribute("aria-current", "page");
    } else if (normalized === "/" && (path === "/" || path === "")) {
      link.setAttribute("aria-current", "page");
    }
  });
}

function initProjectForm() {
  const form = document.getElementById("project-form");
  if (!form) return;

  const status = document.getElementById("form-status");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const lines = [
      "Name: " + (data.get("name") || "").toString().trim(),
      "Email: " + (data.get("email") || "").toString().trim(),
      "Company / project: " + (data.get("company") || "").toString().trim(),
      "",
      "What are you trying to build?",
      (data.get("build") || "").toString().trim(),
      "",
      "What problem are you trying to solve?",
      (data.get("problem") || "").toString().trim(),
      "",
      "Budget range: " + (data.get("budget") || "Not specified")
    ];

    const subject = encodeURIComponent("Start a project — Haven Command");
    const body = encodeURIComponent(lines.join("\n"));
    const mailto = "mailto:contact@havencommand.com?subject=" + subject + "&body=" + body;

    if (status) {
      status.hidden = false;
      status.textContent = "Opening your email app with a structured message to contact@havencommand.com.";
    }

    window.location.href = mailto;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  markCurrentNav();
  initProjectForm();

  const mobileBreakpoint = window.matchMedia("(max-width: 768px)");
  if (mobileBreakpoint.addEventListener) {
    mobileBreakpoint.addEventListener("change", (event) => {
      if (!event.matches) closeMenu();
    });
  }

  document.querySelectorAll(".site-nav a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
});
