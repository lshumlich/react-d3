import React, { Component } from "react";
import "./SideNav.css";

class SideNavCompV2 extends Component {

    constructor() {
        super()
        this.state = { renderIcon: true };
    }

    componentDidMount() {

        const ops = this.props.options.map((o, i) =>
            <p key={i} index={i} onClick={this.callback}>{o.label}</p>
        );

        this.options =
            <div className="navMenu"
                onMouseLeave={() => this.setState({ renderIcon: true })}
            >
                {ops}
            </div>

    }

    callback = (o) => {
        const i = o.target.getAttribute('index');
        if (this.props.options.callback) {
            this.props.options.callback(this.props.options[i].value);
        } else {
            this.props.options[i].value();
        }
    }

    render() {

        this.icon =
            <div>
                <span className="navIcon"
                    onMouseEnter={() => this.setState({ renderIcon: false })}
                >&#9776;</span>
            </div>

        return (
            <React.Fragment>
                {this.state.renderIcon ? this.icon : this.options}
            </React.Fragment>

        );
    }
}

export default SideNavCompV2;
