import React, { Component } from "react";
import './D3ExerciseComp.css';

class D3ExerciseComp extends Component {

    componentDidMount = () => {
        //
        // Assume that this fetched data from an API and voila this data appeared.
        //
        const data = [
            { fname: "Jane", lname: "Smith", balance: 10 },
            { fname: "Liam", lname: "Henry", balance: 1000 },
            { fname: "Emma", lname: "Jones", balance: 1330 },
            { fname: "Olivia", lname: "Notly", balance: 310 },
            { fname: "Noah", lname: "Ho", balance: 503 },
            { fname: "William", lname: "Lee", balance: 520 },
            { fname: "Benjamin", lname: "Amis", balance: 150 },
        ];

        const bigger = data.filter(d => d.balance > 100);
        console.log(bigger);

        //
        // Do a nifty "map" type callback function.
        //

        //
        // Call one of those there nifty d3 graphs. Be creative and compare. 
        //

    }



    render() {
        return (
            <div className="parent">
                <div className="child">
                    <div className="msgExercise">
                        <p>Exercise</p>
                        <p>Change me to a graph is you dare.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default D3ExerciseComp;
