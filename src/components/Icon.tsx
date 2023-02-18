import React from "react";

interface Props {
  name: string[];
}

export default class Icon extends React.Component<Props, {}> {
  public render(): React.ReactNode {
    return <i className={this.props.name.join(' ')} />
  }
}
