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
 * 페이지를 전환.
 * 
 * @param href 주소
 */
export const cutaway = (href: string) => {
  window.dispatchEvent(new Event("curtain-close"));
  window.setTimeout(() => window.location.href = href, 500);
};
