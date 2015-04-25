import React from "react"


export default React.createClass({
    render(){
        var pastWeek = this.props.lastWeek.map(function (day) {
            return <li>{day}</li>;
        });
        return (
            <div>
                <ul>
                    {pastWeek}
                </ul>
            </div>
        )
    }
});