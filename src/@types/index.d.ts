interface Project {
  title: string;
  description: string;
  links: {
    github?: string;
    preview?: string;
    wiki?: string;
    npm?: string;
  }
}

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

// NOTE NPM API 복잡함
interface NpmRegistry {
  _id: string;
  _rev: string;
  name: string;
  "dist-tags": Record<string, string>;
  versions: Record<string, NpmVersion>;
  time: Record<string, string>;
  maintainers: NpmMaintainer[];
  description: string;
  homepage: string;
  keywords: string[];
  repository: NpmRepository;
  author: NpmAuthor;
  bugs: NpmBug;
  license: string;
  readme: string;
  readmeFilename: string;
}

interface NpmDist {
  integrity: string;
  shasum: string;
  tarball: string;
  fileCount: number;
  unpackedSize: number;
  "npm-signature": string;
}

interface NpmMaintainer {
  name: string;
  email: string;
}

interface NpmOperationalInternal {
  host: string;
  tmp: string;
}

interface NpmUser {
  name: string;
  email: string;
}

interface NpmAuthor {
  name: string;
}

interface NpmBug {
  url: string;
}

interface NpmRepository {
  type: string;
  url: string;
}

interface NpmVersion {
  name: string;
  version: string;
  description: string;
  main: string;
  types: string;
  scripts: Record<string, string>;
  repository: NpmRepository;
  keywords: string[];
  author: NpmAuthor;
  license: string;
  bugs: NpmBug;
  homepage: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  gitHead: string;
  _id: string;
  _nodeVersion: string;
  _npmVersion: string;
  dist: NpmDist;
  maintainers: NpmMaintainer[];
  _npmUser: NpmUser;
  directories: Object;
  _npmOperationalInternal: NpmOperationalInternal;
  _hasShrinkwrap: boolean;
}

interface NpmDownloads {
  downloads: NpmDownload[];
  end: string;
  package: string;
  start: string;
}

interface NpmDownload {
  downloads: number;
  day: string;
}
