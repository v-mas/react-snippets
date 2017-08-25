# Collapsing text widget

sample of use:
```
import React, { Component } from 'react'
import CollapsingText from './CollapsingText'

export default class Example extends Component {
  onNameChange = (evt) => {
    this.setState({
      name: evt.target.value,
      nameValidation: /^[A-Z]/.test(evt.target.value) ? null: 'Name should start with capital letter',
    })
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="Name:" onChange={this.onNameChange} />
        <CollapsingText text={this.state.nameValidation} />
      </div>
    )
  }
}
```
