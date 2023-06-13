// Flexible Compound Components with context
// The Flexible Compound Components Pattern only differs from the previous exercise
// in that it uses React context. You should use this version of the pattern more often.

import * as React from 'react'
import {Switch} from '../switch'

// CONTEXT
const ToggleContext = React.createContext()
ToggleContext.displayName = 'ToggleContext'

// The toggle component is a wrapper that will provide the context to its children
function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return (
    <ToggleContext.Provider value={{on, toggle}}>
      {children}
    </ToggleContext.Provider>
  )
}

// CUSTOM HOOK
function useToggle() {
  const context = React.useContext(ToggleContext)
  if (context === undefined) {
    throw new Error('useToggle must be used within a <Toggle />')
  }
  return context
}

// Thid child component consume the context
function ToggleOn({children}) {
  const {on} = useToggle()
  return on ? children : null
}

// Thid child component consume the context
function ToggleOff({children}) {
  const {on} = useToggle()
  return on ? null : children
}

// Thid child component consume the context
function ToggleButton({...props}) {
  const {on, toggle} = useToggle()
  return <Switch on={on} onClick={toggle} {...props} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

export default App
