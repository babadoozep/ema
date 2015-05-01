require("./add-item.styl")

import React from "react"
import {Button} from "react-bootstrap"

const ENTER_KEYCODE = 13;

export default class AddItem extends React.Component {
  constructor() {
    this.state = {
      newItem: ""
    }
  }

  updateNewItem(event) {
    this.setState({
      newItem: event.target.value
    })
  }

  handleAddNew() {
    let {newItem} = this.state;  //let newItem = this.state.newItem;

    if (newItem.length === 0) {
      return
    }

    this.props.addNew(newItem)

    this.setState({
      newItem: ""
    })
  }

  handleKeyUp(event) {
    event.preventDefault();

    if (event.keyCode === ENTER_KEYCODE) {
      this.handleAddNew()
    }
  }

  render() {
    return <div>
      <input
        type="text" value={this.state.newItem}
        onChange={this.updateNewItem.bind(this)}
        onKeyUp={this.handleKeyUp.bind(this)}
      />

      <Button onClick={this.props.handleNextDay}>Done</Button>
      <Button onClick={this.props.revealActual}>Reveal</Button>
      </div>
  }
}
