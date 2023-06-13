// Compound Components
// It is a component design pattern based on creating a parent component with a single goal,
// to provide its children with the necessary properties to render smoothly.

import * as React from 'react'
import {Switch} from '../switch'

// The Toggle component is a wrapper that will provide the context to its children
// Every child component can be defined in the same file or in a different file
function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)
  // This create a clone of the children and pass the props to the children
  return React.Children.map(children, child => {
    // If the child is a string/HTML element, we return the string, otherwise we clone the element
    return typeof child.type === 'string'
      ? child
      // The cloneElement function will clone the element and pass the props to the children
      : React.cloneElement(child, {on, toggle})
  })
}

// This function is a component
function ToggleOn({on, children}) {
  return on ? children : null
}

// This function is a component
function ToggleOff({on, children}) {
  return on ? null : children
}

// This function is a component
function ToggleButton({on, toggle, ...props}) {
  return <Switch on={on} onClick={toggle} {...props} />
}

// In this case, we are using the Toggle component as a wrapper
// And we split the ToggleOn, ToggleOff and ToggleButton components
function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <span>Hello</span>
        <ToggleButton />
      </Toggle>
    </div>
  )
}

export default App
