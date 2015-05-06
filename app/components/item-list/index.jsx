require("./item-list.styl")

import React from "react"

export default class ItemList extends React.Component {
  render() {
    let listItems = this.props.items.map(function (item, i) {
      return <li className="guess" key={i}>
        {item}
      </li>
    })

    return <div >
      <ul className="item-list">
        {listItems}
      </ul>
    </div>
  }
}
