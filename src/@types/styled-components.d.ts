import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    device: {
      mobile: number;
      tablet: number;
      laptop: number;
    }
  }
}
