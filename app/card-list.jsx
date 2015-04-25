import React from "react"
import Card from "./card"


export default React.createClass({
    propTypes: {
        cards: React.PropTypes.array.isRequired
    },
    renderListItems() {
        return this.props.cards.map(function(card, i) {
            return <li>
                <Card data={card} />
            </li>
        })
    },

    render() {
        return <div>
            <ul>
                {this.renderListItems()}
            </ul>
        </div>
    }


})