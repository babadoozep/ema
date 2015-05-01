// This stylesheet will only be included once, no matter how many ExampleComponents there are.
require('./example-component.styl')

import React from "react"
import {Glyphicon} from "react-bootstrap"

class ExampleComponent extends React.Component {
  render() {
    return <section className='example-component'>
      Here's an example component with custom styles!

      <Glyphicon glyph='star' />

      <p>
        The test prop given was <strong>{this.props.test}</strong>
      </p>
    </section>
  }
}

// defaultProps replaces the old getDefaultProps method.
ExampleComponent.defaultProps = {
  test: "default"
}

export default ExampleComponent
