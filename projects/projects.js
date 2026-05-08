document.addEventListener("DOMContentLoaded", async function () {
  const projectsGrid = document.getElementById("projects-grid");
  const loadingState = document.getElementById("loading-state");
  const errorState = document.getElementById("error-state");
  const repoCountEl = document.getElementById("repo-count");
  const starCountEl = document.getElementById("star-count");
  const languageCountEl = document.getElementById("language-count");

  const fetcher = new GitHubFetcher("DJfarent");

  try {
    let repositories = await fetcher.fetchRepositories();

    repositories = await generateSummariesForRepos(repositories);

    const stats = fetcher.getStatistics(repositories);

    repoCountEl.textContent = stats.totalRepos;
    starCountEl.textContent = stats.totalStars;
    languageCountEl.textContent = stats.languages.length;

    loadingState.style.display = "none";

    if (repositories.length > 0) {
      renderProjects(repositories);
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
//uses ai to generate repo names
async function generateSummariesForRepos(repositories) {

  const reposNeedingSummaries = repositories.filter(repo => 
    !repo.description || repo.description.trim() === ""
  );

  if (reposNeedingSummaries.length === 0) {
    return repositories;
  }

  console.log(`Generating summaries for ${reposNeedingSummaries.length} repos...`);

  for (let repo of reposNeedingSummaries) {
    try {
      const summary = await generateRepoSummary(repo);
      repo.description = summary;
    } catch (error) {
      console.warn(`Could not generate summary for ${repo.name}:`, error);
      repo.description = generateFallbackSummary(repo);
    }
  }

  return repositories;
}

function renderProjects(repositories) {
  const projectsGrid = document.getElementById("projects-grid");
  projectsGrid.innerHTML = "";

  repositories.forEach((repo, index) => {
    const projectCard = createProjectCard(repo, index);
    projectsGrid.appendChild(projectCard);
  });
}

function createProjectCard(repo, index) {
  const card = document.createElement("a");
  card.href = repo.url;
  card.target = "_blank";
  card.className = "project-card";
  card.style.animationDelay = `${index * 0.1}s`;

  const updatedDate = new Date(repo.updatedAt);
  const formattedDate = updatedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  const languageColor = getLanguageColor(repo.language);

  card.innerHTML = `
    <div class="card-header">
      <h3 class="project-name">${escapeHtml(repo.name)}</h3>
      <span class="project-stars">⭐ ${repo.stars}</span>
    </div>

    <div class="card-body">
      <p class="project-description">${escapeHtml(repo.description)}</p>

      <div class="project-meta">
        <span class="language" style="--lang-color: ${languageColor}">
          <span class="lang-dot"></span>
          ${escapeHtml(repo.language)}
        </span>
        <span class="updated">Updated ${formattedDate}</span>
      </div>

      ${repo.topics.length > 0 ? `
        <div class="project-topics">
          ${repo.topics.slice(0, 3).map(topic => 
            `<span class="topic">#${escapeHtml(topic)}</span>`
          ).join("")}
        </div>
      ` : ""}
    </div>

    <div class="card-footer">
      <span class="fork-count">🔗 ${repo.forks}</span>
      <span class="open-indicator">Open in GitHub →</span>
    </div>
  `;

  return card;
}

function getLanguageColor(language) {
  const languageColors = {
    "JavaScript": "#f1e05a",
    "TypeScript": "#3178c6",
    "Python": "#3572A5",
    "Java": "#b07219",
    "C++": "#f34b7d",
    "C#": "#239120",
    "HTML": "#e34c26",
    "CSS": "#563d7c",
    "Lua": "#000080",
    "Shell": "#89e051",
    "Unspecified": "#cccccc"
  };

  return languageColors[language] || "#cccccc";
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