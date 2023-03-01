import L from "@languages";

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
 * 
 * @param from 시작 시간
 * @param to 도착 시간
 */
export const getHumanTimeDistance = (from: number, to: number = Date.now()) => {
  const distance = Math.round((to - from) / 1000);
  return distance < 0
    ? L.get("time-distance-future", getHumanTime(-distance))
    : L.get("time-distance-past", getHumanTime(distance))
  ;
}

/**
 * 현재 시간을 가독성 높게 변환. (예: 1900-12-31)
 */
export const getHumanNowTime = () => {
  return new Intl.DateTimeFormat("fr-CA", {year: "numeric", month: "2-digit", day: "2-digit"}).format(Date.now());
}

/**
 * 부족한 길이만큼 채울 값으로 배열을 채움.
 * 
 * @param array 배열
 * @param limit 제한된 길이
 * @param value 채울 값
 */
export const fillArrayWithEmptyValues = <T = string>(array: Array<T>, limit: number, value: T) => {
  return [
    ...Array.from<T>({ length: limit-array.length }).fill(value),
    ...array
  ];
}

/**
 * 컴포넌트(모달창 등)를 열어달라고 요청함.
 * 
 * @param type 타입
 * @param title 제목
 * @param content 내용
 */
export const openAsideComponent = (type: ComponentType, title: string|JSX.Element, content: React.ReactNode) => {
  window.dispatchEvent(new CustomEvent<Component>("component-open", {
    detail: {
      type,
      title,
      content
    }
  }));
}

/**
 * 색상 값이 어두운지 판단함.
 * 
 * @param hexcode 헥스코드.
 * @see https://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black
 */
export const checkColorBright = (hexcode: string) => {
  const color = hexcode.slice(1);
  const hexadecimal = parseInt(color, 16);
  const rgb = {
    r: hexadecimal >> 16 & 0xff,
    g: hexadecimal >> 8 & 0xff,
    b: hexadecimal >> 0 & 0xff
  };
  return (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) < 40;
}
