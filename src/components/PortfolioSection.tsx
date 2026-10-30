"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { CONTACT_INFO } from "@/data/siteData";
import {
  Sparkles,
  ArrowUpRight,
  Star,
  GitFork,
  RotateCw,
  Search,
  Filter,
  ExternalLink,
  Code2,
  AlertCircle,
  Clock,
} from "lucide-react";

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  created_at: string;
  topics: string[];
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface GitHubProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  public_repos: number;
  bio: string | null;
}

type SortOption = "updated" | "newest" | "stars" | "name";

const CACHE_KEY_REPOS = "synfusion_gh_repos";
const CACHE_KEY_PROFILE = "synfusion_gh_profile";
const CACHE_KEY_TIME = "synfusion_gh_time";
const CACHE_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes

export default function PortfolioSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Filters & Controls
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [includeForks, setIncludeForks] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>("updated");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const username = CONTACT_INFO.githubUsername;

  // Fetch GitHub profile & all public repos across pages without arbitrary limits
  const fetchGitHubData = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      // 1. Fetch User Profile
      const profileRes = await fetch(`https://api.github.com/users/${username}`);
      if (profileRes.status === 403) {
        throw new Error("GitHub API rate limit exceeded. Displaying cached data where available.");
      }
      if (!profileRes.ok) {
        throw new Error(`Failed to fetch GitHub profile (Status ${profileRes.status})`);
      }
      const profileData: GitHubProfile = await profileRes.json();
      setProfile(profileData);

      // 2. Fetch All Public Repositories (unbounded page loop until all repos loaded or rate limited)
      let allRepos: GitHubRepo[] = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const reposRes = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&page=${page}&sort=updated`
        );
        if (reposRes.status === 403) {
          break;
        }
        if (!reposRes.ok) {
          throw new Error(`Failed to fetch repositories page ${page}`);
        }

        const pageRepos: GitHubRepo[] = await reposRes.json();
        if (pageRepos.length === 0) {
          hasMore = false;
        } else {
          allRepos = [...allRepos, ...pageRepos];
          if (pageRepos.length < 100) {
            hasMore = false;
          } else {
            page += 1;
          }
        }
      }

      setRepos(allRepos);

      // Save to localStorage cache
      try {
        localStorage.setItem(CACHE_KEY_REPOS, JSON.stringify(allRepos));
        localStorage.setItem(CACHE_KEY_PROFILE, JSON.stringify(profileData));
        localStorage.setItem(CACHE_KEY_TIME, Date.now().toString());
      } catch {
        // Ignore storage errors
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unable to load GitHub repositories.";
      setError(msg);

      // Fallback to cache if available
      try {
        const cachedRepos = localStorage.getItem(CACHE_KEY_REPOS);
        const cachedProfile = localStorage.getItem(CACHE_KEY_PROFILE);
        if (cachedRepos) setRepos(JSON.parse(cachedRepos));
        if (cachedProfile) setProfile(JSON.parse(cachedProfile));
      } catch {
        // Cache read failed
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [username]);

  // Load from cache or fetch on initial render asynchronously
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const cachedTime = localStorage.getItem(CACHE_KEY_TIME);
        const cachedRepos = localStorage.getItem(CACHE_KEY_REPOS);
        const cachedProfile = localStorage.getItem(CACHE_KEY_PROFILE);

        if (cachedTime && cachedRepos && cachedProfile) {
          const age = Date.now() - parseInt(cachedTime, 10);
          if (age < CACHE_EXPIRY_MS) {
            if (isMounted) {
              setRepos(JSON.parse(cachedRepos));
              setProfile(JSON.parse(cachedProfile));
              setLoading(false);
            }
            return;
          }
        }
      } catch {
        // Ignore cache load errors
      }

      if (isMounted) {
        await fetchGitHubData();
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [fetchGitHubData]);

  // Extract unique languages for filter dropdown
  const languages = useMemo(() => {
    const set = new Set<string>();
    repos.forEach((r) => {
      if (r.language) set.add(r.language);
    });
    return ["All", ...Array.from(set).sort()];
  }, [repos]);

  // Filtered & Sorted Repositories
  const filteredRepos = useMemo(() => {
    return repos
      .filter((repo) => {
        // Filter out forks by default
        if (!includeForks && repo.fork) return false;

        // Language filter
        if (selectedLanguage !== "All" && repo.language !== selectedLanguage) return false;

        // Search query
        if (searchQuery.trim() !== "") {
          const q = searchQuery.toLowerCase();
          const nameMatch = repo.name.toLowerCase().includes(q);
          const descMatch = repo.description?.toLowerCase().includes(q);
          const langMatch = repo.language?.toLowerCase().includes(q);
          const topicMatch = repo.topics?.some((t) => t.toLowerCase().includes(q));
          return nameMatch || descMatch || langMatch || topicMatch;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "updated") {
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        }
        if (sortBy === "newest") {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        if (sortBy === "stars") {
          return b.stargazers_count - a.stargazers_count;
        }
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [repos, includeForks, selectedLanguage, searchQuery, sortBy]);

  // Reset page safely when filters change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
    setCurrentPage(1);
  };

  const handleForkToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncludeForks(e.target.checked);
    setCurrentPage(1);
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);
  const paginatedRepos = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRepos.slice(start, start + itemsPerPage);
  }, [filteredRepos, currentPage]);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getLanguageColor = (lang: string | null) => {
    switch (lang?.toLowerCase()) {
      case "typescript":
        return "#3178C6";
      case "javascript":
        return "#F7DF1E";
      case "python":
        return "#3572A5";
      case "kotlin":
        return "#A97BFF";
      case "java":
        return "#B07219";
      case "html":
        return "#E34C26";
      case "css":
        return "#563D7C";
      case "dart":
        return "#00B4AB";
      default:
        return "#008F4C";
    }
  };

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-[#F3FAF5]/60 border-b border-[#E2ECE6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#008F4C]/20 text-[#064E32] text-xs font-semibold tracking-wide uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#008F4C]" />
            <span>LIVE GITHUB PORTFOLIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#17251E] tracking-tight">
            Automated <span className="text-[#008F4C]">GitHub Repositories.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#64736A]">
            Real-time public source code repositories fetched directly from official GitHub account.
          </p>

          {/* GitHub Profile Banner */}
          {profile && (
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-[#E2ECE6] shadow-xs mt-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#84CC16] animate-pulse" />
              <span className="text-xs font-semibold text-[#17251E]">
                GitHub: <span className="text-[#008F4C] font-bold">@{profile.login}</span> ({profile.public_repos} Public Repositories)
              </span>
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#64736A] hover:text-[#008F4C] transition-colors"
                aria-label="GitHub Profile Link"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Filter, Search & Refresh Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E2ECE6] shadow-sm mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#64736A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search repositories..."
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-[#E2ECE6] focus:outline-hidden focus:ring-2 focus:ring-[#008F4C] text-[#17251E]"
              />
            </div>

            {/* Language & Sorting Selectors */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">

              {/* Language Selector */}
              <div className="flex items-center gap-1.5 text-xs text-[#64736A]">
                <Filter className="w-3.5 h-3.5" />
                <select
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                  className="px-3 py-2 text-xs font-semibold rounded-xl border border-[#E2ECE6] bg-white text-[#17251E] focus:outline-hidden focus:ring-2 focus:ring-[#008F4C]"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang === "All" ? "All Languages" : lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sorting Options */}
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="px-3 py-2 text-xs font-semibold rounded-xl border border-[#E2ECE6] bg-white text-[#17251E] focus:outline-hidden focus:ring-2 focus:ring-[#008F4C]"
              >
                <option value="updated">Recently Updated</option>
                <option value="newest">Newest First</option>
                <option value="stars">Most Stars</option>
                <option value="name">Repository Name</option>
              </select>

              {/* Toggle Forks */}
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#17251E] bg-[#F3FAF5] px-3 py-2 rounded-xl border border-[#E2ECE6]">
                <input
                  type="checkbox"
                  checked={includeForks}
                  onChange={handleForkToggle}
                  className="rounded text-[#008F4C] focus:ring-[#008F4C]"
                />
                <span>Include Forks</span>
              </label>

              {/* Manual Refresh Projects Button */}
              <button
                type="button"
                onClick={() => fetchGitHubData(true)}
                disabled={refreshing || loading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#071C16] hover:bg-[#008F4C] text-white font-semibold text-xs transition-colors shadow-xs disabled:opacity-60 cursor-pointer ml-auto md:ml-0"
              >
                <RotateCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#84CC16]" : ""}`} />
                <span>{refreshing ? "Refreshing..." : "Refresh Projects"}</span>
              </button>
            </div>

          </div>
        </div>

        {/* Rate Limit or API Error Notice */}
        {error && (
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs mb-8">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => fetchGitHubData(true)}
              className="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-bold hover:bg-amber-700 transition-colors cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading Skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-[#E2ECE6] space-y-4 animate-pulse"
              >
                <div className="h-6 bg-slate-200 rounded-md w-3/4" />
                <div className="h-4 bg-slate-100 rounded-md w-full" />
                <div className="h-4 bg-slate-100 rounded-md w-2/3" />
                <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                  <div className="h-4 bg-slate-200 rounded-md w-20" />
                  <div className="h-4 bg-slate-200 rounded-md w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : paginatedRepos.length === 0 ? (
          /* Clear Empty State */
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E2ECE6] max-w-lg mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F3FAF5] text-[#008F4C] flex items-center justify-center mx-auto">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#17251E]">No Public Repositories Found</h3>
            <p className="text-xs text-[#64736A]">
              No repositories matched your selected search filters. Try clearing search keywords or resetting language filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedLanguage("All");
                setIncludeForks(false);
                setCurrentPage(1);
              }}
              aria-label="Reset all search filters"
              className="px-4 py-2 rounded-xl bg-[#008F4C] text-white font-semibold text-xs hover:bg-[#064E32] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Genuine Public GitHub Repository Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedRepos.map((repo) => (
              <div
                key={repo.id}
                className="group bg-white rounded-3xl border border-[#E2ECE6] p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#008F4C]/50 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
              >
                <div>
                  {/* Top Header: Repo Title & Fork Badge */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-extrabold text-lg text-[#17251E] group-hover:text-[#008F4C] transition-colors flex items-center gap-2 line-clamp-1"
                    >
                      <span>{repo.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#008F4C]" />
                    </a>

                    {repo.fork && (
                      <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                        <GitFork className="w-3 h-3" /> Fork
                      </span>
                    )}
                  </div>

                  {/* Real Repository Description */}
                  <p className="text-xs text-[#64736A] leading-relaxed mb-4 line-clamp-3 min-h-[48px]">
                    {repo.description || "No description provided for this public repository."}
                  </p>

                  {/* Topics Tags */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {repo.topics.slice(0, 4).map((topic) => (
                        <span
                          key={topic}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#F3FAF5] border border-[#008F4C]/20 text-[#064E32]"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Metadata & CTA */}
                <div className="pt-4 border-t border-[#E2ECE6] space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#64736A]">

                    {/* Primary Programming Language */}
                    <div className="flex items-center gap-1.5 font-semibold">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      />
                      <span>{repo.language || "Plain Text"}</span>
                    </div>

                    {/* Stars & Forks */}
                    <div className="flex items-center gap-3 font-mono text-[11px]">
                      <span className="flex items-center gap-1" title="Stars">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1" title="Forks">
                        <GitFork className="w-3.5 h-3.5 text-[#008F4C]" />
                        {repo.forks_count}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Updated {formatDate(repo.updated_at)}
                    </span>

                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#008F4C] hover:text-[#064E32] inline-flex items-center gap-1 group/btn"
                    >
                      <span>Open Repo</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                  </div>
                </div>

                {/* Aesthetic Top Green Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#008F4C] to-[#84CC16] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl bg-white border border-[#E2ECE6] text-xs font-semibold text-[#17251E] disabled:opacity-50 hover:bg-[#F3FAF5] cursor-pointer"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  currentPage === p
                    ? "bg-[#008F4C] text-white shadow-xs"
                    : "bg-white border border-[#E2ECE6] text-[#17251E] hover:bg-[#F3FAF5]"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl bg-white border border-[#E2ECE6] text-xs font-semibold text-[#17251E] disabled:opacity-50 hover:bg-[#F3FAF5] cursor-pointer"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
