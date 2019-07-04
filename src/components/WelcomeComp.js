import React, { Component } from "react";
import './Welcome.css';

class WelcomeComp extends Component {


	render() {
		return (
			<div className="parent">
                <div className="child">
                    <div className="msg">
                        <p>Welcome to</p>
                        <p>Data Visulization</p>
                    </div>
                </div>
			</div>
		);
	}
}

export default WelcomeComp;
