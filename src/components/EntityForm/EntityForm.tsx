import React, {Component, ReactNode} from "react";

type Props = {
    brokerUrl?: string
    msgEndpoint?: string
}

type State = {
    tabIndex: number
}

class EntityForm extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {tabIndex: 0};
    }

    render(): ReactNode {

    }

}

export default EntityForm