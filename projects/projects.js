document.addEventListener("DOMContentLoaded", async function () {
  const projectsGrid = document.getElementById("projects-grid");
  const loadingState = document.getElementById("loading-state");
  const errorState = document.getElementById("error-state");
  const repoCountEl = document.getElementById("repo-count");
  const starCountEl = document.getElementById("star-count");
  const languageCountEl = document.getElementById("language-count");

  const fetcher = new GitHubFetcher("DJfarent");

  try {
    let repos = await fetcher.fetchRepositories();
    const stats = fetcher.getStatistics(repos);

    repoCountEl.textContent = stats.totalRepos;
    starCountEl.textContent = stats.totalStars;
    languageCountEl.textContent = stats.languages.length;

    loadingState.style.display = "none";

    if (repos.length > 0) {
      renderProjects(repos);
    } else {
      projectsGrid.innerHTML = '<p class="no-projects">No public repositories found</p>';
    }

  } catch (error) {
    console.error("Failed to load projects:", error);
    
    loadingState.style.display = "none";
    errorState.style.display = "block";
    projectsGrid.style.display = "none";
  }
});

function renderProjects(repositories) {
  const projectsGrid = document.getElementById("projects-grid");
  projectsGrid.innerHTML = "";

  repositories.forEach((repo, index) => {
    const card = createProjectCard(repo, index);
    projectsGrid.appendChild(card);
  });
}

function createProjectCard(repo, index) {
  const card = document.createElement("a");
  card.href = repo.url;
  card.target = "_blank";
  card.className = "project-card";
  card.style.animationDelay = `${index * 0.1}s`;

  const date = new Date(repo.updatedAt);
  const dateStr = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  const color = getLanguageColor(repo.language);
  const desc = repo.description || "No description";

  card.innerHTML = `
    <div class="card-header">
      <h3 class="project-name">${escapeHtml(repo.name)}</h3>
      <span class="project-stars">${repo.stars}</span>
    </div>

    <div class="card-body">
      <p class="project-description">${escapeHtml(desc)}</p>

      <div class="project-meta">
        <span class="language" style="--lang-color: ${color}">
          <span class="lang-dot"></span>
          ${escapeHtml(repo.language)}
        </span>
        <span class="updated">Updated ${dateStr}</span>
      </div>

      ${repo.topics.length > 0 ? `
        <div class="project-topics">
          ${repo.topics.slice(0, 3).map(t => 
            `<span class="topic">${escapeHtml(t)}</span>`
          ).join("")}
        </div>
      ` : ""}
    </div>

    <div class="card-footer">
      <span class="fork-count">${repo.forks} forks</span>
      <span class="open-indicator">view</span>
    </div>
  `;

  return card;
}

function getLanguageColor(language) {
  const colors = {
    "JavaScript": "#f1e05a",
    "Python": "#3572A5",
    "Java": "#b07219",
    "C++": "#f34b7d",
    "C#": "#239120",
    "HTML": "#e34c26",
    "CSS": "#563d7c",
    "Lua": "#000080",
    "Go": "#00ADD8",
    "Rust": "#CE422B",
    "TypeScript": "#3178c6",
    "Shell": "#89e051"
  };

  return colors[language] || "#999";
}

function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

document.addEventListener("mouseover", function (e) {
  const card = e.target.closest(".project-card");
  if (card) {
    card.classList.add("hovering");
  }
});

document.addEventListener("mouseout", function (e) {
  const card = e.target.closest(".project-card");
  if (card) {
    card.classList.remove("hovering");
  }
});