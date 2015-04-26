import React from "react"


export default React.createClass({
    render(){
        var listItems = this.props.items.map(function (item, i) {
            return <li key={i}>{item}</li>;
        });
        return (
            <div>
                <ul>
                    {listItems}
                </ul>
            </div>
        )
    }
});