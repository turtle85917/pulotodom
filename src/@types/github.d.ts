interface GithubCommit {
  author: GithubUser;
  comments_url: string;
  commit: {
    author: ShortGithubUser;
    comment_count: number;
    committer: ShortGithubUser;
    message: string;
    tree: GithubTree;
    url: string;
    verification: {
      payload: string | null;
      reason: string;
      signature: string | null;
      verified: boolean;
    };
  }
  committer: GithubUser;
  html_url: string;
  node_id: string;
  parents: (GithubTree & { html_url: string; })[];
  sha: string;
  url: string;
}

interface GithubTree {
  sha: string;
  url: string;
}

interface GithubUser {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

interface ShortGithubUser {
  date: string;
  email: string;
  name: string;
}
