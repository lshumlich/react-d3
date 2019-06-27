import React, { Component } from "react";
import "./SideNav.css";

class SideNavComp extends Component {

    stuffFunc = (m) => {
        console.log("stuffFunc", m)
    }

    openNav = () => {
        // document.getElementById("mySidenav").style.width = "200px";
        console.log(this.menu);
        console.log(this.menu.props);
        // this.menu.style.width = "200px";
        // this.menu.className("WhatEver");
    }

    closeNav = () => {
        // document.getElementById("mySidenav").style.width = "0px";
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
        console.log('Render Props From: ' + this.props.options.title);

        const options = this.props.options.map((o, i) =>
            <p key={i} index={i} onClick={this.callback}>{o.label}</p>
        );

        this.menu =
            <div 
                className="sidenav"
                onMouseLeave={this.closeNav}
                onMouseEnter={this.openNav}
            >
                {options}
            </div>


        return (
            <React.Fragment>
                <span className="navIcon"
                    onMouseEnter={this.openNav}
                >&#9776;</span>

                {this.menu}

                {/* <div id="mySidenav"
                    className="sidenav"
                    onMouseLeave={this.closeNav}
                    onMouseEnter={this.openNav}
                >
                    {options}
                </div> */}




            </React.Fragment>
        );
    }
}

export default SideNavComp;
