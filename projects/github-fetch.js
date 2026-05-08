//thanks stack overflow
//My attempt at a github repo fetcher for my website
//Very proud how it came out ¬_¬
//#303 


class GitHubFetcher {
  constructor(username) {
    this.username = username;
    this.apiBaseUrl = "https://api.github.com";
    this.cacheKey = `github_repos_${username}`;
    this.cacheDuration = 60 * 60 * 1000; // cache duration before removal
  }

  getCachedData() {
    const cached = localStorage.getItem(this.cacheKey);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();
    
    // remove data if old
    if (now - timestamp < this.cacheDuration) {
      console.log("Using cached GitHub data");
      return data;
    }

    localStorage.removeItem(this.cacheKey);
    return null;
  }

  setCachedData(data) {
    try {
      localStorage.setItem(this.cacheKey, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.warn("Could not cache data:", e);
    }
  }


  async fetchRepositories() {
    try {

      const cachedData = this.getCachedData();
      if (cachedData) {
        return cachedData;
      }

      console.log(`Fetching repositories for ${this.username}...`);

      const response = await fetch(
        `${this.apiBaseUrl}/users/${this.username}/repos?sort=updated&per_page=100`,
        {
          headers: {
            "Accept": "application/vnd.github.v3+json"
          }
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const repos = await response.json();

      const filteredRepos = repos.filter(repo => !repo.fork);

      const processedRepos = filteredRepos.map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || "No description provided",
        url: repo.html_url,
        language: repo.language || "Unspecified",
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        watchers: repo.watchers_count,
        updatedAt: repo.updated_at,
        topics: repo.topics || [],
        homepage: repo.homepage
      }));

      processedRepos.sort((a, b) => {
        if (b.stars !== a.stars) return b.stars - a.stars;
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });

      this.setCachedData(processedRepos);

      return processedRepos;

    } catch (error) {
      console.error("Error fetching repositories:", error);
      throw error;
    }
  }

  getStatistics(repos) {
    const stats = {
      totalRepos: repos.length,
      totalStars: repos.reduce((sum, repo) => sum + repo.stars, 0),
      totalForks: repos.reduce((sum, repo) => sum + repo.forks, 0),
      languages: new Set(repos.map(repo => repo.language).filter(lang => lang !== "Unspecified")),
      mostStarred: repos.length > 0 ? repos[0] : null
    };

    return {
      ...stats,
      languages: Array.from(stats.languages)
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = GitHubFetcher;
}
