// build a basic toggle component

import React from 'react'
import {Switch} from '../switch'

function Toggle({onToggle}) {
  // 🐨 this toggle component is going to need to have state for `on`

  // 🐨 make a `toggle` function here which will:
  // 1. toggle the `on` state
  // 2. call `onToggle` with the new `on` state.
  // 💰 `const newOn = !on`
  // 🐨 render the Switch here and pass `on` and `onClick`
  const [on, setOn] = React.useState(false)

  function toggle() {
    const newOn = !on
    setOn(newOn)
    onToggle(newOn)
  }
  return <Switch on={on} onClick={toggle} />;
}

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function Usage() {
  return <Toggle onToggle={(...args) => console.info('onToggle', ...args)} />
}
Usage.title = 'Build Toggle'

export default Usage
