require("./item-list.styl")

import React from "react"

export default class ItemList extends React.Component {
  render() {
    let listItems = this.props.items.map(function (item, i) {
      return <div className="actual-item-background"><li key={i}>
        {item}
      </li></div>
    })

    return <div >
      <ul className="actual">
        {listItems}
      </ul>
    </div>
  }
}
