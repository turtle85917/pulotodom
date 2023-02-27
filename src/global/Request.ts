type Method = "GET" | "POST";
type Params = [string, string|undefined|null][];
interface RequestOptions {
  params?: Params;
  body?: BodyInit;
}

/**
 * fetch를 유용하게 사용하기 위한 유틸리티 기능.
 */
export default class Request {
  private baseUrl: string;
  private params: Params;

  constructor(baseUrl: string, params: Params = []) {
    this.baseUrl = baseUrl;
    this.params = params;
  }

  private async send<T extends unknown>(endpoint: string, method: Method, options?: RequestOptions) {
    let url = this.baseUrl + endpoint;
    options ??= { params: this.params };
    if (Array.isArray(options.params)) url += `?${options.params.map(data => data[0]+"="+data[1]).join('&')}`;
    return (await fetch(url, {
      method,
      body: options.body,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
      },
      credentials: "include"
    })).json() as T;
  }

  public async get<T extends unknown>(endpoint: string, callback: (result: T) => void, options?: RequestOptions) {
    const result = await this.send<T>(endpoint, "GET", options);
    callback(result);
  }

  public async post<T extends unknown>(endpoint: string, callback: (result: T) => void, options?: RequestOptions) {
    const result = await this.send<T>(endpoint, "POST", options);
    callback(result);
  }
}
