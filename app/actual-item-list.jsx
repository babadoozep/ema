import React from "react"


export default React.createClass({
    render(){
        var listItems = this.props.items.map(function (item) {
            return <li>{item}</li>;
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