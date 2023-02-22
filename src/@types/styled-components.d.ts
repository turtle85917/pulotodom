import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    device: {
      mobile: string;
      tablet: string;
      laptop: string;
    }
  }
}
