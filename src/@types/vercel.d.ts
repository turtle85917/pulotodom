interface VercelProjects {
  accountId: string;
  analytics?: {
    id: string;
    canceledAt: number | null;
    disabledAt: number;
    enabledAt: number;
    paidAt?: number;
    sampleRatePercent?: number | null;
    spendLimitInDollars?: number | null;
  };
  autoExposeSystemEnvs?: boolean;
  buildCommand?: string | null;
  commandForIgnoringBuildStep?: string | null;
  connectConfigurationId?: string | null;
  createdAt?: number;
  devCommand?: string | null;
  directoryListing: boolean;
  installCommand?: string | null;
  env?: {
    target?:
      | ("production" | "preview" | "development" | "preview" | "development")[]
      | ("production" | "preview" | "development" | "preview" | "development");
    type: "secret" | "system" | "encrypted" | "plain" | "sensitive";
    id?: string;
    key: string;
    value: string;
    configurationId?: string | null;
    createdAt?: number;
    updatedAt?: number;
    createdBy?: string | null;
    updatedBy?: string | null;
    gitBranch?: string;
    edgeConfigId?: string | null;
    edgeConfigTokenId?: string | null;
    decrypted?: boolean;
  }[];
  framework?:
    | (
        | "blitzjs"
        | "nextjs"
        | "gatsby"
        | "remix"
        | "astro"
        | "hexo"
        | "eleventy"
        | "docusaurus-2"
        | "docusaurus"
        | "preact"
        | "solidstart"
        | "dojo"
        | "ember"
        | "vue"
        | "scully"
        | "ionic-angular"
        | "angular"
        | "polymer"
        | "svelte"
        | "sveltekit"
        | "sveltekit-1"
        | "ionic-react"
        | "create-react-app"
        | "gridsome"
        | "umijs"
        | "sapper"
        | "saber"
        | "stencil"
        | "nuxtjs"
        | "redwoodjs"
        | "hugo"
        | "jekyll"
        | "brunch"
        | "middleman"
        | "zola"
        | "hydrogen"
        | "vite"
        | "vitepress"
        | "vuepress"
        | "parcel"
        | "sanity"
      )
    | null;
  gitForkProtection?: boolean;
  id: string;
  latestDeployments?: VercelDeployment[];
  link?:
    | {
        org?: string;
        repo?: string;
        repoId?: number;
        type?: "github";
        createdAt?: number;
        deployHooks: {
          createdAt?: number;
          id: string;
          name: string;
          ref: string;
          url: string;
        }[];
        gitCredentialId?: string;
        updatedAt?: number;
        sourceless?: boolean;
        productionBranch?: string;
      }
    | {
        projectId?: string;
        projectName?: string;
        projectNameWithNamespace?: string;
        projectNamespace?: string;
        projectUrl?: string;
        type?: "gitlab";
        createdAt?: number;
        deployHooks: {
          createdAt?: number;
          id: string;
          name: string;
          ref: string;
          url: string;
        }[]
        gitCredentialId?: string;
        updatedAt?: number;
        sourceless?: boolean;
        productionBranch?: string;
      }
    | {
        name?: string;
        slug?: string;
        owner?: string;
        type?: "bitbucket";
        uuid?: string;
        workspaceUuid?: string;
        createdAt?: number;
        deployHooks: {
          createdAt?: number;
          id: string;
          name: string;
          ref: string;
          url: string;
        }[]
        gitCredentialId?: string;
        updatedAt?: number;
        sourceless?: boolean;
        productionBranch?: string;
      }
  name: string;
  nodeVersion: "18.x" | "16.x" | "14.x" | "12.x" | "10.x";
  outputDirectory?: string | null;
  passwordProtection?: {
    deploymentType: "preview" | "all";
  } | null;
  publicSource?: boolean | null;
  rootDirectory?: string | null;
  serverlessFunctionRegion?: string | null;
  skipGitConnectDuringLink?: boolean;
  sourceFilesOutsideRootDirectory?: boolean;
  ssoProtection?: {
    deploymentType: "preview" | "all";
  } | null;
  targets?: Record<string, VercelDeployment>;
  transferCompletedAt?: number;
  transferStartedAt?: number;
  transferToAccountId?: string;
  transferredFromAccountId?: string;
  updatedAt?: number;
  live?: boolean;
  enablePreviewFeedback?: boolean | null;
  permissions?: Record<string, ACLAction[]>;
  lastRollbackTarget?: {
    fromDeploymentId: string;
    toDeploymentId: string;
    jobStatus: "succeeded" | "failed" | "skipped" | "pending" | "in-progress";
    requestedAt: number;
  } | null;
  hasFloatingAliases?: boolean;
  protectionBypass?: Record<string, string>;
}

type ACLAction = "create" | "delete" | "read" | "update" | "list" | "count";

interface VercelDeployment {
  alias?: string[];
  aliasAssigned?: (number | boolean) | null;
  aliasError?: {
    code: string;
    message: string;
  } | null;
  aliasFinal?: string | null;
  automaticAliases?: string[];
  builds?: {
    use: string;
    src?: string;
    dest?: string;
  }[];
  createdAt: number;
  createdIn: string;
  creator: {
    email: string;
    githubLogin?: string;
    gitlabLogin?: string;
    uid: string;
    username: string;
  } | null;
  deploymentHostname: string;
  name: string;
  forced?: boolean;
  id: string;
  meta?: Record<string, string>;
  monorepoManager?: string | null;
  plan: "hobby" | "enterprise" | "pro" | "oss";
  private: boolean;
  readyState:
    | "BUILDING"
    | "ERROR"
    | "INITIALIZING"
    | "QUEUED"
    | "READY"
    | "CANCELED";
  requestedAt?: number;
  target?: string | null;
  teamId?: string | null;
  type: "LAMBDAS";
  url: string;
  userId: string;
  withCache?: boolean;
  checksConclusion?: "succeeded" | "failed" | "skipped" | "canceled";
  checksState?: "registered" | "running" | "completed";
  readyAt?: number;
  buildingAt?: number;
  previewCommentsEnabled?: boolean;
}
