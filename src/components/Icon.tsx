import React from "react";

interface P {
  name: string[];
}

export default class Icon extends React.Component<P, {}> {
  render(): React.ReactNode {
    return <i className={this.props.name.join(' ')} />
  }
}
