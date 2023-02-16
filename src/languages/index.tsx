import Icon from "@components/Icon";

const REGEXP_PATTERN = /#\{(?:(\d+?)|(?:icon:([^!@#$%^&*()_+-=|]+))(?:\|prefix:([^|]+))?(?:\|cycle:(spin|pulse))?)\}/g;
const REGEXP_BRACKETS = /([^\s]+)#\[([을를]|[이가]|[은는]|[와과]|(?:으로|로))\]/g;
const MATCH_JOSA: Record<string, (has: boolean) => string> = {
  "을를": (has) => has ? '을' : '를',
  "은는": (has) => has ? '은' : '는',
  "이가": (has) => has ? '이' : '가',
  "과와": (has) => has ? '과' : '와',
  "으로": (has) => has ? '으로' : '로'
}

/**
 * 다국어 지원을 위한 유틸리티 기능.
 * 
 * - `#{n}` 인자 배열의 인덱스 `n` 요소로 대체.
 * - `#{icon:...}` 아이콘으로 대체.
 * - - `#{...|prefix:...}` 아이콘의 접두어에 맞춰 대체. *(optional)*
 * - - `#{...|cycle:pulse|spin}` 아이콘의 싸이클링 적용. *(optional)*
 * - `#[이]` 대괄호 안 조사를 앞쪽에 붙어있는 단어에 맞춰 치환.
 * - *...key 값에 매칭되는 값을 찾지 못하면 `(L#key)` 반환.*
 */
export default class L {
  public static defaultLocale: string = "ko-KR";
  private static dictionary: Map<string, Record<string, string>> = new Map();

  public static get(key: string, locale?: string) {
    const dictionary = L.dictionary.get(locale ?? L.defaultLocale);
    return dictionary?.[key] ?? `(L#${key})`;
  }

  public static render(key: string, ...args: any[]) {
    return ((locale?: string) => {
      const result: React.ReactNode[] = [];
      let content = L.get(key, locale);

      // NOTE #{...} 커맨드 처리
      let execArray: RegExpExecArray | null = null;
      let lastIndex: number = 0;
      while (execArray = REGEXP_PATTERN.exec(content)) {
        if (execArray.index - lastIndex > 0) {
          result.push(content.slice(lastIndex, execArray.index));
        }
        const argIndex = Number(execArray[1]);
        if (!isNaN(argIndex)) {
          result.push(args[argIndex]);
        } else {
          const classList = [execArray[3] ?? "fas", `fa-${execArray[2]}`];
          execArray[4] && classList.push(`fa-${execArray[4]}`);
          result.push(<Icon name={classList} key={execArray.index} />);    
        }
        lastIndex = REGEXP_PATTERN.lastIndex;
      }

      // NOTE 조사 처리
      content = content.replace(REGEXP_BRACKETS, (original, ...values: string[]) => {
        const hasJongseong = (values[0].charCodeAt(values[0].length-1) - 0xac00) % 28 > 0;
        const result = Object.entries(MATCH_JOSA).find(item => item[0].includes(values[1]))?.[1](hasJongseong) ?? values[1];
        return original.replace(`#[${values[1]}]`, result);
      });

      if (lastIndex < content.length) result.push(content.slice(lastIndex));
      return <>{result}</>;
    });
  }

  public static addLocale(locale: string, data: Record<string, string>) {
    if (L.dictionary.has(locale)) return;
    L.dictionary.set(locale, data);
  }
}
