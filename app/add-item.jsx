import React from "react"

const ENTER_KEYCODE = 13;

export default React.createClass({
    getInitialState(){
        return{
            newItem: ''
        }
    },

    updateNewItem(event) {
        this.setState({
            newItem: event.target.value
        })
    },

    handleAddNew(){
        let {newItem} = this.state;  //let newItem = this.state.newItem;

        if (newItem.length === 0){
            return
        }

        this.props.addNew(newItem);

        this.setState({
            newItem: ''
        });
    },

    handleKeyUp(event){
        event.preventDefault();

        if (event.keyCode === ENTER_KEYCODE){
            this.handleAddNew()
        }
    },

    render(){
        return(
            <div>
                <input type="text" value={this.state.newItem} onChange={this.updateNewItem} onKeyUp={this.handleKeyUp} />
                <button onClick={this.props.handleNextDay}>Done</button>
                <button onClick={this.props.revealActual}>Reveal</button>
            </div>
        )
    }
});