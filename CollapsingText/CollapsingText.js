import React, { Component } from 'react'

import './CollapsingText.css'

const EXPANDING = 'expanding'
const EXPANDED = 'expanded'
const COLLAPSING = 'collapsing'
const COLLAPSED = 'collapsed'

export default class CollapsingText extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: props.text,
      update: true,
      height: 'auto',
    }
  }

  componentWillMount() {
    if (this.props.text) {
      this.setState({
        state: EXPANDED,
        height: 'auto',
      })
    } else {
      this.setState({
        state: COLLAPSED,
        height: 0,
      })
    }
  }

  isAnimating() {
    return this.state.state === EXPANDING || this.state.state === COLLAPSING
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.text !== nextProps.text) {
      let nextState = {
        update: true,
      }
      switch(this.state.state) {
        case EXPANDING:
        case EXPANDED:
          nextState.state = COLLAPSING
          nextState.height = 0
          break
        case COLLAPSING:
          break
        case COLLAPSED:
          nextState.text = nextProps.text
          break
        // no default
      }
      this.setState(nextState)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.update) {
      if (this.state.text) {
        if (this.state.state === COLLAPSED) {
          this.setState({
            update: false,
            height: this._getHeight(),
            state: EXPANDING,
          })
        }
      } else {
        if (this.state.state === EXPANDED) {
          this.setState({
            update: false,
            height: 0,
            state: COLLAPSING,
          })
        }
      }
    }
  }

  _getHeight() {
    return this.domobj.scrollHeight
  }

  _onTransitionEnd = () => {
    switch(this.state.state) {
      case EXPANDED:
      case EXPANDING:
        this.setState({
          state: EXPANDED,
        })
        break

      case COLLAPSED:
      case COLLAPSING:
        this.setState({
          text: this.props.text,
          state: COLLAPSED,
        })
        break
      // no default
    }
  }

  render() {
    let props = {...this.props}
    const { className: style } = props
    delete props.text
    delete props.className
    return (
      <p
        {...props}
        ref={(paraf) => {this.domobj = paraf}}
        className={`${style} collapsing-text`}
        onTransitionEnd={this._onTransitionEnd}
        style={{height: this.state.height,}}>
          {this.state.text}
      </p>
    )
  }
}
