import { Component } from "react";
import Skills from "../utils/pages";

interface P {
  category: string;
  skills: string[];
}

export default class SkillList extends Component<P> {
  constructor(props: P) {
    super(props);
  }

  render() {
    return (
      <details onClick={(event) => {
        (document.querySelectorAll("div.skills details[open]") as NodeListOf<HTMLDetailsElement>).forEach(details => {
          if (event.currentTarget !== details && details.open) {
            details.removeAttribute("open");
            details.classList.remove("active");
          }
        });
      }}>
        <summary className="title">{this.props.category}</summary>
        <div className="description">
          {this.props.skills.map((skill, idx) => (
            <img key={idx} alt={skill} src={Skills[skill]} />
          ))}
        </div>
      </details>
    )
  }
}