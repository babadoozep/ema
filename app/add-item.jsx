import React from "react"


export default React.createClass({
    getInitialState(){
        return{
            newItem: ''
        }
    },
    updateNewItem(e){
        this.setState({
            newItem: e.target.value
        })
    },
    handleAddNew(){
        this.prop.addNew(this.state.newItem);
        this.setState({
            newItem: ''
        });
    },
    render(){
        return(
            <div>
                <input type="text" value={this.state.newItem} onChange={this.updateNewItem} />
                <button onClick={this.handleAddNew}>Add</button>
            </div>
        )
    }
});