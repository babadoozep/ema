require("./date-list.styl")

import React from "react"
import {COMMON_DATE} from "../../resources/date-formats"

function renderDayListItem (day, i) {
  return <li key={i}>
    {this.formatDate(day)}
  </li>
}

export default class DateList extends React.Component {
  formatDate(date) {
    return date.format(COMMON_DATE)
  }

  renderDays() {
    return this.props.lastWeek.map(renderDayListItem.bind(this))
  }

  render() {
    return <div>
      <ul>
        {this.renderDays()}
      </ul>
    </div>
  }
}