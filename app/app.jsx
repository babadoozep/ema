import React from "react"
import moment from "moment"
import DateList from "./date-list"
import AddItem from "./add-item"
import ItemList from "./item-list"
import ActualItemList from "./actual-item-list"
import {COMMON_DATE} from "./resources/date-formats"
import dummyData from "./resources/dummy-data"
// Literally,
//
//import dateFormats from "./resources/date-formats"
//const COMMON_DATE = dateFormats.COMMON_DATE


export default React.createClass({
    getInitialState(){
        let days = dummyData.days.map(function (day) {
            day.date = moment(day.date)

            return day
        });

        return {
            days: days,
            currentDayIndex: dummyData.currentDayIndex
        }
    },

    addItem(item){
        let
            {days, currentDayIndex} = this.state,
            currentDay = days[currentDayIndex]

        currentDay.guess.push(item)

        days[currentDayIndex] = currentDay

        this.setState({
            days: days
        })
    },

    getCurrentDay() {
        let {days, currentDayIndex} = this.state

        return days[currentDayIndex]
    },

    handleNextDay() {
        let {days, currentDayIndex} = this.state

        if (currentDayIndex === days.length - 1) {
            this.setState({currentDayIndex: 0})
        } else {
            this.setState({
                currentDayIndex: currentDayIndex + 1
            })
        }
    },

    revealActual(){
        let
            {days, currentDayIndex} = this.state,
            currentDay = days[currentDayIndex]

        currentDay.revealed = true

        days[currentDayIndex] = currentDay

        this.setState({
            days: days
        })
    },

    formatDate(date) {
        return date.format(COMMON_DATE)
    },

    render(){
        let currentDay = this.getCurrentDay()

        return <div>
            <h2>
                {this.formatDate(currentDay.date)}
            </h2>

            <AddItem addNew={this.addItem} handleNextDay={this.handleNextDay} revealActual={this.revealActual}/>

            <ItemList items={currentDay.guess} />

            <ActualItemList currentDay={currentDay} />
        </div>
    }
});