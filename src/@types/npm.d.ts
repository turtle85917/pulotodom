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
