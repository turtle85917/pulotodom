import ko from "./ko-KR.json";

const REGEXP_BRACKETS = /(.+)#\[([을를]|[이가]|[은는]|[와과]|(?:으로|로))\]/;
const MATCH_JOSA: Record<string, (has: boolean) => string> = {
  "을를": (has) => has ? '을' : '를',
  "은는": (has) => has ? '은' : '는',
  "이가": (has) => has ? '이' : '가',
  "과와": (has) => has ? '과' : '와',
  "으로": (has) => has ? '으로' : '로'
}

export default class L {
  private static defaultLocale: string = "ko-KR";
  private static dictionary: Map<string, Record<string, string>> = new Map();

  public static get(key: string, locale?: string) {
    this.loadLocales();
    const dictionary = L.dictionary.get(locale ?? L.defaultLocale);
    return dictionary?.[key] ?? `(L#${key})`;
  }

  public static render(key: string, ...args: any[]) {
    return ((locale?: string) => {
      let content = L.get(key, locale);
      args.forEach((item, index) => content = content.replaceAll(`#{${index}}`, item));

      // NOTE 조사 처리
      const chunk = content.split(' ');
      chunk.forEach(item => {
        const itemChunk = item.match(REGEXP_BRACKETS);
        if (itemChunk === null) return;
        const hasJongseong = (itemChunk[1].charCodeAt(itemChunk[1].length-1) - 0xac00) % 28 > 0;
        const selectJosa = Object.entries(MATCH_JOSA).find(item => item[0].includes(itemChunk[2]))?.[1](hasJongseong) ?? itemChunk[2];
        content = content.replace(`#[${itemChunk[2]}]`, selectJosa);
      });

      return content;
    });
  }

  private static loadLocales() {
    if (JSON.stringify(L.dictionary) !== '{}') return;
    L.dictionary.set("ko-KR", ko);
  }
}
