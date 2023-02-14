import Icon from "@components/Icon";

const REGEXP_SHARP = /#\{(?:(\d+?)|(icon:([\w\d\s]+)(?:\|prefix:(fa.))*(?:\|cycle:(pulse|spin))*))\}/g;
const REGEXP_BRACKETS = /(?!\s)(.+)#\[([을를]|[이가]|[은는]|[와과]|(?:으로|로))\]/;
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
 * - `#{icon:...|cycle:pulse|spin}` 아이콘의 싸이클링 적용
 * - `#[이]` 대괄호 안 조사를 앞쪽에 붙어있는 단어에 맞춰 치환.
 * - *...key 값에 매칭되는 값을 찾지 못하면 `(L#key)` 반환.*
 */
export default class L {
  private static defaultLocale: string = "ko-KR";
  private static dictionary: Map<string, Record<string, string>> = new Map();

  public static get(key: string, locale?: string) {
    const dictionary = L.dictionary.get(locale ?? L.defaultLocale);
    return dictionary?.[key] ?? `(L#${key})`;
  }

  public static render(key: string, ...args: any[]) {
    return ((locale?: string) => {
      const result: React.ReactNode[] = [];
      let content = L.get(key, locale);
      let index = 0;

      // NOTE #{...} 커맨드 처리
      [...content.matchAll(REGEXP_SHARP)].forEach((cmd, cindex) => {
        if (cmd[1]) {
          content = content.replace(cmd[0], args[index]);
          index++;
        } else {
          const classList = [cmd[4] ?? "fas", `fa-${cmd[3]}`];
          cmd[5] && classList.push(`fa-${cmd[5]}`);
          content = content.replace(cmd[0], '');
          result.push(<Icon name={classList} key={cindex} />);
        }
      });
      
      // NOTE 조사 처리
      const chunk = content.split(' ');
      chunk.forEach(item => {
        const itemChunk = item.match(REGEXP_BRACKETS);
        if (itemChunk === null) return;
        const hasJongseong = (itemChunk[1].charCodeAt(itemChunk[1].length-1) - 0xac00) % 28 > 0;
        const selectJosa = Object.entries(MATCH_JOSA).find(item => item[0].includes(itemChunk[2]))?.[1](hasJongseong) ?? itemChunk[2];
        content = content.replace(`#[${itemChunk[2]}]`, selectJosa);
      });

      result.push(content);
      return <>{result}</>;
    });
  }

  public static addLocale(locale: string, data: Record<string, string>) {
    if (L.dictionary.has(locale)) return;
    L.dictionary.set(locale, data);
  }
}
