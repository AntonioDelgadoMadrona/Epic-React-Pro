// Prop Collections and Getters
// The Prop Collections and Getters Pattern allows your hook to support common
// use cases for UI elements people build with your hook.

import * as React from 'react'
import {Switch} from '../switch'

// CUSTOM HOOK
function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return {
    on,
    toggle,
    // This is a prop collection
    // aria-pressed is a property that indicates the current state of toggle buttons
    // The onClick event handler is a property that indicates the action that will be executed when the button is clicked
    togglerProps: {
      'aria-pressed': on,
      onClick: toggle,
    },
  }
}

function App() {
  const {on, togglerProps} = useToggle()
  return (
    <div>
      <Switch on={on} {...togglerProps} />
      <hr />
      <button aria-label="custom-button" {...togglerProps}>
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default App
