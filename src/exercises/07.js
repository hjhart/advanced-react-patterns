// State Initializers

import React from 'react'
import {Switch} from '../switch'

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))
const noop = () => {}

function toggleReducer(state, {type, initialOn}) {
  switch (type) {
    case 'toggle': {
      return {on: !state.on}
    }
    case 'reset': {
      return {on: initialOn}
    }
    default: {
      throw new Error(`Unsupported type: ${type}`)
    }
  }
}

// 🐨 We'll need to add an option for `onReset` and `initialOn` here
// 💰 you can default `onReset` to `noop` and `initialOn` to `false`
function useToggle({onToggle = noop, onReset = noop, initialOn = false} = {}) {
  // 🐨 create an initialState object with an on property that's set to the
  // value of `initialOn` and pass that to useReducer as the initial value
  const initialState = { on: initialOn }
  const [{on}, dispatch] = React.useReducer(toggleReducer, initialState)

  function toggle() {
    const newOn = !on
    dispatch({type: 'toggle'})
    onToggle(newOn)
  }

  function reset() {
    dispatch({type: 'reset', initialOn })
    onReset(initialState.on)
  }
  // 🐨 add a reset function here which dispatches a 'reset' type with your
  // initialState object and calls `onReset` with the initialState.on value

  function getTogglerProps({onClick, ...rest} = {}) {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...rest,
    }
  }

  return {
    on,
    toggle,
    reset,
    getTogglerProps,
  }
}

// 💯 What happens if the user of useToggle switches the `initialOn` state
// during the lifetime of this component? What should happen? I would argue that
// we should ignore the update and maintain the `initialOn` state at the time
// this is initially rendered. So your extra credit is to figure out how to
// maintain the initial state value so your initialState object remains the
// same for the lifetime of the component.

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function Usage() {
  const {on, getTogglerProps, reset} = useToggle({
    onToggle: (...args) => console.info('onToggle', ...args),
    onReset: (...args) => console.info('onReset', ...args),
    initialOn: false,
  })
  return (
    <div>
      <Switch {...getTogglerProps({on})} />
      <hr />
      <button onClick={reset}>Reset</button>
    </div>
  )
}
Usage.title = 'State Initializers'

export default Usage
