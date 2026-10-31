document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  // Theme preference is saved locally; dark mode is the default.
  const savedTheme = localStorage.getItem("jeel-portfolio-theme");
  if (savedTheme === "light" || savedTheme === "dark") root.dataset.theme = savedTheme;
  const updateThemeIcon = () => {
    themeToggle.innerHTML = root.dataset.theme === "dark"
      ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
    themeToggle.setAttribute("aria-label", root.dataset.theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    if (window.lucide) lucide.createIcons();
  };
  updateThemeIcon();
  themeToggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("jeel-portfolio-theme", root.dataset.theme);
    updateThemeIcon();
  });

  menuToggle.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.innerHTML = open ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    if (window.lucide) lucide.createIcons();
  });
  mobileNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i data-lucide="menu"></i>';
    if (window.lucide) lucide.createIcons();
  }));

  if (typeof renderProjects === "function") renderProjects();
  if (window.lucide) lucide.createIcons();
  document.getElementById("year").textContent = new Date().getFullYear();

  // Progressive reveal, with a visible fallback if IntersectionObserver is unavailable.
  const revealItems = document.querySelectorAll(".section-block, .project-card, .github-callout, .education-card");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealItems.forEach(el => el.classList.add("reveal"));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(el => observer.observe(el));
  }

  // Highlight the navigation item for the section currently in view.
  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = document.querySelectorAll(".desktop-nav a");
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach(section => sectionObserver.observe(section));
  }
});
