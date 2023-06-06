// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {...state, count: state.count + action.value}
    default:
      throw new Error(`Unsupported action type: ${action.type}`)
  }
}

function Counter({initialCount = 0, step = 1}) {
  // This is the same as useState, but with a reducer like initialState
  const [state, dispatch] = React.useReducer(reducer, {
    count: initialCount,
  })

  // This is the same as setState, but with a reducer like action
  const increment = () => dispatch({type: 'INCREMENT', value: step})
  return <button onClick={() => increment}>{state.count}</button>
}

function App() {
  return <Counter />
}

export default App
