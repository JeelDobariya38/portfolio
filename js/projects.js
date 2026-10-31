// Edit this array to add, remove, or update featured projects.
window.portfolioProjects = [
  {
    name: "Passcodes",
    type: "Open-source application",
    tags: ["Maintainer", "Password manager"],
    description: "An open-source password manager focused on helping people manage their credentials through a thoughtfully designed application. Jeel contributes to product development, application architecture, feature improvements, and the community around the project.",
    highlights: ["React Native", "Expo", "SQLite", "Android Autofill"],
    repo: "https://github.com/PasscodesApp/Passcodes",
    demo: null,
    art: "passcodes",
    featured: true
  },
  {
    name: "ScriptMaker",
    type: "Web application",
    tags: ["Open source", "University project"],
    description: "A visual shell-script builder that makes automation more approachable through an interactive drag-and-drop editor. Assemble reusable snippets, customize parameters, preview syntax-highlighted output, and export scripts for multiple environments.",
    highlights: ["Vanilla JavaScript", "Tailwind CSS", "Prism.js", "Multi-language output"],
    repo: "https://github.com/JeelDobariya38/ScriptMaker",
    demo: "https://jeeldobariya38.github.io/ScriptMaker/",
    art: "scriptmaker",
    featured: false
  },
  {
    name: "PassAlgo",
    type: "Developer library",
    tags: ["Open source", "Reusable package"],
    description: "A reusable library from the Passcodes ecosystem, bringing password-generation and date-formatting utilities into a package that can be shared across projects.",
    highlights: ["TypeScript", "Package design", "Reusable utilities"],
    repo: "https://github.com/PasscodesApp/PassAlgo",
    demo: null,
    art: "passalgo",
    featured: false
  }
];

function projectArtwork(kind, name) {
  const labels = {
    passcodes: '<div class="art-line blue"></div><div class="art-line short"></div><div class="art-line mid"></div><div class="art-grid"><span></span><span></span><span></span></div>',
    scriptmaker: '<div class="art-line blue"></div><div class="art-line mid"></div><div class="art-line short"></div><div class="art-grid"><span></span><span></span><span></span></div>',
    passalgo: '<div class="art-line blue"></div><div class="art-line short"></div><div class="art-line mid"></div><div class="art-line short"></div>'
  };
  return `<div class="project-art ${kind}"><div class="art-glow"></div><div class="art-window"><div class="art-window-top"><i></i><i></i><i></i></div>${labels[kind] || labels.passcodes}</div><div class="art-wordmark">${name}</div></div>`;
}

function renderProjects() {
  const target = document.getElementById("projectsList");
  if (!target || !Array.isArray(window.portfolioProjects)) return;
  target.innerHTML = window.portfolioProjects.map(project => `
    <article class="project-card reveal">
      ${projectArtwork(project.art, project.name)}
      <div class="project-content">
        <div class="project-meta"><span class="project-type">${project.type}</span>${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join("")}</div>
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <div class="project-highlights">${project.highlights.map(item => `<span>${item}</span>`).join("")}</div>
        <div class="project-links">
          <a href="${project.repo}" target="_blank" rel="noreferrer"><i data-lucide="github"></i> Source code <i data-lucide="arrow-up-right"></i></a>
          ${project.demo ? `<a href="${project.demo}" target="_blank" rel="noreferrer"><i data-lucide="external-link"></i> Live demo</a>` : ""}
        </div>
      </div>
    </article>`).join("");
}
