import React from "react"
import moment from "moment"
import {PageHeader} from "react-bootstrap"
import DateList from "components/date-list"
import AddItem from "components/add-item"
import ItemList from "components/item-list"
import ActualItemList from "components/actual-item-list"
import {COMMON_DATE} from "resources/date-formats"
import dummyData from "resources/dummy-data"

// React 0.13.3 includes ES6 class syntax. This will replace React.createComponent
export default class Application extends React.Component {
  // constructor is a special method that runs when the class is created.
  constructor() {
    let days = dummyData.days.map(function (day) {
      day.date = moment(day.date)

      return day
    });

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
      currentDay = days[currentDayIndex]

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
      this.setState({currentDayIndex: 0})
    } else {
      this.setState({
        currentDayIndex: currentDayIndex + 1
      })
    }
  }

  revealActual() {
    let
      {days, currentDayIndex} = this.state,
      currentDay = days[currentDayIndex]

    currentDay.revealed = true

    days[currentDayIndex] = currentDay

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

      <AddItem
        addNew={this.addItem.bind(this)}
        handleNextDay={this.handleNextDay.bind(this)}
        revealActual={this.revealActual.bind(this)}/>

      <ItemList items={currentDay.guess} />

      <ActualItemList currentDay={currentDay} />
    </div>
  }
}
