require("./actual-item-list.styl")

import React from "react"
import ItemList from "../item-list"

export default class ActualItemList extends React.Component {
  render() {
    let {currentDay} = this.props

    if (currentDay.revealed) {
      return <ItemList items={currentDay.items} />
    } else {
      return <div>Placeholder</div>
    }
  }
}
