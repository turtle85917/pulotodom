import React from "react";
import ReactTooltip from "react-tooltip";
import L from "@languages";

export default abstract class Template<P = {}, S = {}> extends React.PureComponent<P, S> {
  public get locale() {
    return localStorage.getItem("pf.locale") ?? L.defaultLocale;
  }

  
  public set locale(value: string) {
    localStorage.setItem("pf.locale", value);
    this.reloadLocales();
  }
  

  public reloadLocales() {
    document.title = L.get("title", this.locale);
    ReactTooltip.rebuild();
  }
}
