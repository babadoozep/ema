import React from "react"

export default React.createClass({
    propTypes: {
        data: React.PropTypes.object.isRequired
    },

    render() {
        console.log(this.props)

        var cardDate = this.props.data.cardDate


        return <div className="card">
            <h2>
                {cardDate.day}, {cardDate.month} {cardDate.date}, {cardDate.year}
            </h2>

            <p>
                {this.props.data.cardText}
            </p>
        </div>
    }
})


