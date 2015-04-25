import React from "react"
import Moment from "react-starter-pack/node_modules/moment/moment.js"
import DateList from "./../date-list.jsx"
import AddItem from "./add-item.jsx"
import ItemList from "./item-list"



export default React.createClass({
    getInitialState(){
        var today = moment();
        var oneDayAgo = today.subtract('days', 1);
        var twoDaysAgo = today.subtract('days', 2);
        var threeDaysAgo = today.subtract('days', 3);
        var fourDaysAgo = today.subtract('days', 4);
        var fiveDaysAgo = today.subtract('days', 5);
        var sixDaysAgo = today.subtract('days', 6);
        return{
            items: [],
            lastWeek: [today, oneDayAgo, twoDaysAgo, threeDaysAgo, fourDaysAgo, fiveDaysAgo, sixDaysAgo]
        }
    },
    addItem(item){
        this.state.items.push(item);
        this.setState({
            items: this.state.items
        })
    },
    render(){
        return(
        <div>
            <h2>{this.state.lastWeek[0]}</h2>
            <AddItem addNew={this.addItem} />
            <ItemList items={this.state.items} />
            <DateList lastWeek={this.state.lastWeek} />
            <ActualItemList items={this.state.items} />
        </div>
        )
    }
});