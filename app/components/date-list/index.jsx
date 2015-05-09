require("./date-list.styl")

import React from "react"
import {COMMON_DATE} from "../../resources/date-formats"


export default React.createClass({
  formatDate(date) {
    return date.date.format(COMMON_DATE)
  },

  renderDays() {
    return this.props.lastWeek.map((day,index)=>
            <li key={index} className={index == this.props.currentDayIndex ? "currentDay" : ""}>
          {this.formatDate(day)}
        </li>
    )
  },
  render(){

    return (
        <div >
          <ol className="date-list">
            {this.renderDays()}
          </ol>
        </div>
    )
  }
});