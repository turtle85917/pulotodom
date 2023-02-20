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

interface ImportMeta {
  env: {
    VITE_VERCEL_API_TOKEN?: string;
  }
}

// NOTE Vercel API 그냥 미쳤다.
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
  permissions?: {
    aliasGlobal?: ACLAction[];
    aliasProject?: ACLAction[];
    analytics?: ACLAction[];
    analyticsSampling?: ACLAction[];
    analyticsUsage?: ACLAction[];
    auditLog?: ACLAction[];
    billingAddress?: ACLAction[];
    billingInformation?: ACLAction[];
    billingInvoice?: ACLAction[];
    billingInvoiceEmailRecipient?: ACLAction[];
    billingInvoiceLanguage?: ACLAction[];
    billingPlan?: ACLAction[];
    billingPurchaseOrder?: ACLAction[];
    billingTaxId?: ACLAction[];
    cacheArtifact?: ACLAction[];
    cacheArtifactUsageEvent?: ACLAction[];
    concurrentBuilds?: ACLAction[];
    connect?: ACLAction[];
    connectConfiguration?: ACLAction[];
    connectConfigurationLink?: ACLAction[];
    deployment?: ACLAction[];
    deploymentProductionGit?: ACLAction[];
    deploymentCheck?: ACLAction[];
    deploymentCheckPreview?: ACLAction[];
    deploymentPreview?: ACLAction[];
    deploymentPrivate?: ACLAction[];
    deploymentRollback?: ACLAction[];
    domain?: ACLAction[];
    domainAcceptDelegation?: ACLAction[];
    domainAuthCodes?: ACLAction[];
    domainCertificate?: ACLAction[];
    domainCheckConfig?: ACLAction[];
    domainMove?: ACLAction[];
    domainPurchase?: ACLAction[];
    domainRecord?: ACLAction[];
    domainTransferIn?: ACLAction[];
    event?: ACLAction[];
    sensitiveEnvironmentVariablePolicy?: ACLAction[];
    fileUpload?: ACLAction[];
    gitRepository?: ACLAction[];
    integration?: ACLAction[];
    integrationConfiguration?: ACLAction[];
    integrationConfigurationTransfer?: ACLAction[];
    integrationConfigurationProjects?: ACLAction[];
    integrationVercelConfigurationOverride?: ACLAction[];
    job?: ACLAction[];
    logDrain?: ACLAction[];
    monitoringQuery?: ACLAction[];
    monitoringChart?: ACLAction[];
    notificationDomainConfiguration?: ACLAction[];
    notificationDomainExpire?: ACLAction[];
    notificationDomainMoved?: ACLAction[];
    notificationDomainPurchase?: ACLAction[];
    notificationDomainRenewal?: ACLAction[];
    notificationDomainTransfer?: ACLAction[];
    notificationDomainUnverified?: ACLAction[];
    notificationPaymentFailed?: ACLAction[];
    notificationUsageAlert?: ACLAction[];
    notificationSpendCap?: ACLAction[];
    openTelemetryEndpoint?: ACLAction[];
    passwordProtection?: ACLAction[];
    paymentMethod?: ACLAction[];
    permissions?: ACLAction[];
    previewDeploymentSuffix?: ACLAction[];
    proTrialOnboarding?: ACLAction[];
    project?: ACLAction[];
    projectDeploymentHook?: ACLAction[];
    projectDomain?: ACLAction[];
    projectDomainMove?: ACLAction[];
    projectEnvVars?: ACLAction[];
    projectEnvVarsUnownedByIntegration?: ACLAction[];
    sharedEnvVars?: ACLAction[];
    projectEnvVarsProduction?: ACLAction[];
    sharedEnvVarsProduction?: ACLAction[];
    projectIntegrationConfiguration?: ACLAction[];
    projectLink?: ACLAction[];
    projectMember?: ACLAction[];
    projectProductionBranch?: ACLAction[];
    projectTransfer?: ACLAction[];
    projectProtectionBypass?: ACLAction[];
    rateLimit?: ACLAction[];
    remoteCaching?: ACLAction[];
    samlConfig?: ACLAction[];
    secret?: ACLAction[];
    spendCapConfiguration?: ACLAction[];
    spendCapState?: ACLAction[];
    store?: ACLAction[];
    supportCase?: ACLAction[];
    supportCaseComment?: ACLAction[];
    team?: ACLAction[];
    teamAccessRequest?: ACLAction[];
    teamFellowMembership?: ACLAction[];
    teamInvite?: ACLAction[];
    teamInviteCode?: ACLAction[];
    teamJoin?: ACLAction[];
    teamOwnMembership?: ACLAction[];
    teamOwnMembershipDisconnectSAML?: ACLAction[];
    token?: ACLAction[];
    usage?: ACLAction[];
    user?: ACLAction[];
    userConnection?: ACLAction[];
    webAnalytics?: ACLAction[];
    edgeConfig?: ACLAction[];
    edgeConfigItem?: ACLAction[];
    edgeConfigToken?: ACLAction[];
    webhook?: ACLAction[];
    "webhook-event"?: ACLAction[];
    endpointVerification?: ACLAction[];
    aliasProtectionBypass?: ACLAction[];
  };
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
