require("./date-list.styl")

import React from "react"
import {COMMON_DATE} from "../../resources/date-formats"

function renderDayListItem (day, i) {
  return <li className="day-list-item" key={i}>
    {this.formatDate(day)}
  </li>
}

export default React.createClass({
  formatDate(date) {
    return date.date.format(COMMON_DATE)
  },

  renderDays() {
    return this.props.lastWeek.map(renderDayListItem.bind(this))
  },
  render(){

    return (
        <div className="date-list">
          <ol>
            {this.renderDays()}
          </ol>
        </div>
    )
  }
});