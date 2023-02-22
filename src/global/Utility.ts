import L from "@languages";

const REGEX_GITHUB_REPO_LINK = /https:\/\/github.com\/((?:.+)\/(?:.+))/;
const REGEX_NPM_REGISTRY_LINK = /https:\/\/www\.npmjs\.com\/package\/(.+)/;
const REGEX_VERCEL_LINK = /https:\/\/(.+?)\.vercel\.app/;

/**
 * 부울 값을 숫자로 반환.
 * 
 * @param bool 값
 */
export const boolToNumber = (bool: boolean) => Number(bool);

/**
 * 1을 0으로, 0을 1로 치환.
 * 
 * @param value 값
 */
export const reverseNumber = (value: string | number | boolean) => Number(value) === 1 ? 0 : 1;

/**
 * 제한된 길이를 넘친만큼 잘라서 반환.
 * 
 * @param text 값
 * @param limit 제한된 길이
 */
export const cut = (text: string, limit: number) => {
  return text.length > limit
    ? text.slice(0, limit-1) + '…'
    : text
  ;
}

/**
 * 페이지를 전환.
 * 
 * @param href 주소
 */
export const cutaway = (href: string) => {
  window.dispatchEvent(new Event("curtain-close"));
  window.setTimeout(() => window.location.href = href, 500);
}

export const getGithubApiCommitsLink = (githubRepoLink: string) => {
  const execArray = REGEX_GITHUB_REPO_LINK.exec(githubRepoLink);
  if (execArray === null) return null;
  return `https://api.github.com/repos/${execArray[1]}/commits?per_page=1000000`;
}

export const getNPMApiLink = (npmRegistryLink: string) => {
  const execArray = REGEX_NPM_REGISTRY_LINK.exec(npmRegistryLink);
  if (execArray === null) return null;
  return {
    registry: `https://registry.npmjs.org/${execArray[1]}`,
    downloads: `https://api.npmjs.org/downloads/range/1900-01-01:2023-02-20/${execArray[1]}`
  };
}

export const getVercelApiLink = (vercelLink: string) => {
  const execArray = REGEX_VERCEL_LINK.exec(vercelLink);
  if (execArray === null) return null;
  return `https://api.vercel.com/v9/projects/${execArray[1]}`;
}

/**
 * 시간을 가독성 높게 변환. (예: `1시간 23분`)
 * 
 * @param time 값
 */
export const getHumanTime = (time: number) => {
  if (time < 1) return L.get("time-now");
  time = Math.round(time);
  let result: [number, string][] = [];
  if (time < 60) result = [[ time, "time-second" ]];
  else if (time < 3600) result = [[ Math.floor(time / 60), "time-minutes" ], [ Math.round(time % 60), "time-second" ]];
  else if (time < 86400) result = [[ Math.floor(time / 3600), "time-hours" ], [ Math.round(time % 3600 / 60), "time-minutes" ]];
  else if (time < 604800) result = [[ Math.floor(time / 86400), "time-day" ], [ Math.round(time % 86400 / 3600), "time-hours" ]];
  else result = [[ Math.floor(time / 2592000), "time-month" ], [ Math.round(time % 2592000 / 86400), "time-day" ]]
  return result.filter(item => item[0]).map(item => L.get(item[1], item[0])).join(' ');
}

/**
 * 주어진 두 시간의 차를 가독성 높게 변환. (예: `1시간 23분 전`)
 */
export const getHumanTimeDistance = (from: number, to: number = Date.now()) => {
  const distance = Math.round((to - from) / 1000);
  if (from === 0) return L.render("loading");
  return distance < 0
    ? L.get("time-distance-future", getHumanTime(-distance))
    : L.get("time-distance-past", getHumanTime(distance))
  ;
}
