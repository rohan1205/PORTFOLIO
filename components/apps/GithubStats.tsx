"use client";

import { useState, useEffect } from "react";

export default function GithubStats() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/rohan1205")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="mt-4 mb-4 text-accent animate-pulse font-mono flex gap-2 items-center"><span className="w-4 h-4 rounded-full bg-accent animate-ping"></span> Fetching GitHub API metrics...</div>;
  }

  if (!stats || stats.message) {
    return <div className="mt-4 mb-4 text-accent/60 font-mono">WARN: Unable to fetch live metrics (Rate limit or network error).</div>;
  }

  return (
    <div className="mt-4 mb-4 p-6 glass-panel border border-primary/20 bg-black/60 w-fit max-w-sm">
      <div className="flex items-center gap-4 mb-4">
        {stats.avatar_url && <img src={stats.avatar_url} alt="GitHub Avatar" className="w-12 h-12 rounded-full border border-primary/50" />}
        <div>
          <h3 className="text-primary font-bold">{stats.login}</h3>
          <a href={stats.html_url} target="_blank" className="text-xs text-secondary hover:text-accent underline transition-colors">View Profile</a>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 font-mono text-sm">
        <div className="bg-black/50 p-3 rounded border border-primary/10">
          <p className="text-foreground/50 mb-1">Public Repos</p>
          <p className="text-xl text-foreground font-bold">{stats.public_repos}</p>
        </div>
        <div className="bg-black/50 p-3 rounded border border-primary/10">
          <p className="text-foreground/50 mb-1">Followers</p>
          <p className="text-xl text-foreground font-bold">{stats.followers}</p>
        </div>
      </div>
    </div>
  );
}
