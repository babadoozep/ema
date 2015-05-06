require("./actual-item-list.styl")

import React from "react"
import ItemList from "../item-list"

export default class ActualItemList extends React.Component {
  render() {
    let {currentDay} = this.props

    if (currentDay.revealed) {
      return <div>
        <ItemList items={currentDay.items} />
        </div>

    } else {
      return <div className="directions">
        <ol>
          <li><div className="color">Create a list of all the things you did today.</div></li>
          <li><div>Click <b>Save</b> to store those events in today's date.</div></li>
          <li><div className="color">Come back tomorrow and do the same thing, then...</div></li>
          <li><div>Try to remember the events from the previous day(s) and make a new list.</div></li>
          <li><div className="color">Click <b>Reveal Actual</b> to compare your new list with the original one.</div></li>
          <li><div>Repeat! Try to remember what you did on each day of the previous week.</div></li>
        </ol>
      </div>
    }
  }
}

