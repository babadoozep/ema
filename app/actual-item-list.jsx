import React from "react"
import ItemList from "./item-list"


export default React.createClass({
    render(){
        let {currentDay} = this.props

        if (currentDay.revealed){
            return <ItemList items={currentDay.items} />
        } else {
            return <div>Placeholder</div>
        }

    }
});