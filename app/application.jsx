import React from "react"
import appData from "./resources/app-data"
import Card from "./card"
import CardList from "./card-list"

export default React.createClass({

    getInitialState() {
        return {
            activeCard: appData.cards[0]
        }
    },

    render() {


        return <div className="app-container">
            <CardList cards={appData.cards} />
            <h1>
                Click card above to see card info below:
            </h1>

            <Card data={this.state.activeCard} />
        </div>
    }
})

