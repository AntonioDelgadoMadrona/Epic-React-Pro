// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

// Create the CountContext
const CountContext = React.createContext()

// Create the CountProvider wrapper for use in App
function CountProvider(props) {
  const [count, setCount] = React.useState(0)
  return <CountContext.Provider value={{count, setCount}} {...props} />
}

// Create a custom hook to use the CountContext
function useCount() {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`)
  }
  return context
}

function CountDisplay() {
  // Use the CountContext, just using the count value
  const {count} = useCount()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  // Use the CountContext, just using the setCount function
  const {setCount} = useCount()
  const increment = () => setCount(prevCount => prevCount + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}

export default App
