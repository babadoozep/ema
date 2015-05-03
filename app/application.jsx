import React from "react"
import moment from "moment"
import {Button} from "react-bootstrap"
import {PageHeader} from "react-bootstrap"
import DateList from "components/date-list"
import AddItem from "components/add-item"
import ItemList from "components/item-list"
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
      currentDayIndex: dummyData.currentDayIndex
    }
  }

  // Class definitions like this one don't have commas between methods.

  addItem(item) {
    let
      {days, currentDayIndex} = this.state,
      currentDay = this.getCurrentDay()

    currentDay.guess.push(item)

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

    if (currentDayIndex === days.length - 1) {
      console.debug("current days is wrapping around")

      this.setState({
        currentDayIndex: 0
      })
    } else {
      console.debug("current day is incrementing.")

      this.setState({
        currentDayIndex: currentDayIndex + 1
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

    return <div>
      <PageHeader>
        {this.formatDate(currentDay.date)}
      </PageHeader>

      <AddItem addNew={this.addItem.bind(this)} />

      <Button onClick={this.handleNextDay.bind(this)}>
        Done
      </Button>

      <Button onClick={this.toggleActualVisibility.bind(this)}>
        {/* Ternary statements are like one liner if statements */}
        {currentDay.revealed ? "Hide" : "Show"}
      </Button>

      <ItemList items={currentDay.guess} />

      {/* This component decides to show depending on the currentDay reveal state. */}
      <ActualItemList currentDay={currentDay} />

      {/* Shows regardless of anything. */}
      <DateList lastWeek={this.state.days} />

      <aside className="debugging">
        Current Day Index: {this.state.currentDayIndex}
      </aside>
    </div>
  }
}
