import React from "react"
import moment from "moment"
//import {Button} from "react-bootstrap"
//import {PageHeader} from "react-bootstrap"
import DateList from "components/date-list"
import AddItem from "components/add-item"
//import ItemList from "components/item-list"
import ActualItemList from "components/actual-item-list"
import {COMMON_DATE, STORAGE_DATE} from "resources/date-formats"
import dummyData from "resources/dummy-data"


// React 0.13.3 includes ES6 class syntax. This will replace React.createComponent
export default class Application extends React.Component {
  // constructor is a special method that runs when the class is created.
  constructor() {
    let dayIDs = []

    for (let i = 0; i < 7; i++) {
      dayIDs.push(moment().subtract(i, "days").format(STORAGE_DATE))
    }

    let days = dayIDs.map(function (dayID) {
      let day = window.localStorage[dayID]

      if (day) {
        // Retrieve data from localstorage
        return JSON.parse(day)
      } else {
        // User has never been here before. Make some data.
        return {
          date: dayID,
          items: [],
          guess: [],
          revealed: false
        }
      }
    })

    // Replace date string with moment object
    days = days.map(function (day) {
      day.date = moment(day.date)

      return day
    })

    // This code replaces the previous getInitialState.
    this.state = {
      days: days,
      currentDayIndex: dummyData.currentDayIndex,
      completed: false
    }
  }

  // Class definitions like this one don't have commas between methods.

  addItem(item) {
    let
      {days, currentDayIndex} = this.state,
      currentDay = this.getCurrentDay()

    if (currentDayIndex === 0){
      currentDay.items.push(item)
    }else {
      currentDay.guess.push(item)
    }

    days[currentDayIndex] = currentDay

    this.setState({
      days: days
    })
  }

  deleteItem(itemIndex){
    let
        {days, currentDayIndex} = this.state,
        currentDay = this.getCurrentDay()

    if (currentDayIndex === 0){
      currentDay.items.splice(itemIndex, 1)
    }else {
      currentDay.guess.splice(itemIndex, 1)
    }

    days[currentDayIndex] = currentDay

    this.setState({
      days: days
    })
  }

  getCurrentDay() {
    let {days, currentDayIndex} = this.state

    return days[currentDayIndex]
  }

  handleNextDay() {
    let {days, currentDayIndex} = this.state

    days[currentDayIndex].guess = []
    days[currentDayIndex].revealed = false

    let remainingDays = days.filter((day,index)=>day.items.length > 0 && index > currentDayIndex)

    if (remainingDays.length > 0) {
      let nextDay = remainingDays[0]
      this.setState({
        currentDayIndex: days.indexOf(nextDay)
      })
    } else {
      this.setState({
        completed: true
      })
    }


    this.saveData()
  }

  saveData() {
    let {days} = this.state

    days.forEach(function (day) {
      window.localStorage[day.date.format(STORAGE_DATE)] = JSON.stringify(day)
    })
  }

  toggleActualVisibility() {
    let
      {days, currentDayIndex} = this.state,
      currentDay = this.getCurrentDay()

    // Flip the revealed boolean to the opposite of what it is.
    currentDay.revealed = !currentDay.revealed

    // store the day copy in the days array copy
    days[currentDayIndex] = currentDay


    // Tell React to replace the days array in the component state with the copy.
    this.setState({
      days: days
    })
  }


  formatDate(date) {
    return date.format(COMMON_DATE)
  }

  render() {
    let currentDay = this.getCurrentDay()

    if (this.state.currentDayIndex === 0){
      var sourceList = currentDay.items
    } else {
      var sourceList = currentDay.guess
}

    let listItems = sourceList.map((item, i) =>
      <li className="guess" key={i}>
        <button className="delete-button" onClick={e=>this.deleteItem(i)}>Delete</button>
        {item}
      </li>
    )

    if (this.state.completed){
      return <div className="final-image">
          <img className="cube" src="app/resources/img/goodday.jpg" />
          <div className="goodbye">
            <p>Great Job! Come back tomorrow or click the button below to go back to today.</p>
            <button className="refresh" onClick={e=>window.location.reload()}>Go Back</button>
          </div>
        </div>
    }

    //if state completed is true, return new page, else... return this:

    return <div>
      <h1 className="today">
        {this.formatDate(currentDay.date)}
      </h1>

      <section className="bottom-components">

        <div className="center">
          <AddItem addNew={this.addItem.bind(this)} />
          <h4>
            *Press the <u>return</u> key to create a new item.
          </h4>
          <div className="buttons">
            <button className="next" onClick={this.handleNextDay.bind(this)}>
              {this.state.currentDayIndex == 0 ? "Save" : "Next"}
            </button>
            {this.state.currentDayIndex == 0 ? null : <button className="toggle" onClick={this.toggleActualVisibility.bind(this)}>
              {currentDay.revealed ? "Hide" : "Show Actual"}
            </button>}
          </div>
            <ul className="item-list">
              {listItems}
            </ul>
        </div>

        <div className="right">
        {/* This component decides to show depending on the currentDay reveal state. */}
        <ActualItemList currentDay={currentDay}  />
        </div>

        {/* Shows regardless of anything. */}
        <div className="left">
          <DateList lastWeek={this.state.days} currentDayIndex={this.state.currentDayIndex} />
        </div>
        <span className="stretch"></span>
      </section>

    </div>
  }
}
