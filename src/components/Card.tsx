import { Component } from "react";

interface P {
  className?: string;
  children: JSX.Element;
}

export default class Card extends Component<P> {
  constructor(props: P) {
    super(props);
  }

  render() {
    return (
      <div className={["card", this.props.className].join(" ").trim()}>
        {this.props.children}
      </div>
    )
  }
}