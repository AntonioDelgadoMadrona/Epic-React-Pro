// useDebugValue: useMedia
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

const formatCountDebugValue = ({query, state}) =>
  `query: ${query}, state: ${state}`

function useMedia(query, initialState = false) {
  const [state, setState] = React.useState(initialState)

  // useDebugValue is a hook that allows us to display a label for custom hooks in React DevTools.
  // It accepts a value and a formatter function (optional) as arguments.
  // It only displays in React DevTools.
  // It is useful for custom hooks that are used in many places in an app.
  React.useDebugValue({query, state}, formatCountDebugValue)

  React.useEffect(() => {
    let mounted = true
    const mql = window.matchMedia(query)
    function onChange() {
      if (!mounted) {
        return
      }
      setState(Boolean(mql.matches))
    }

    mql.addListener(onChange)
    setState(mql.matches)

    return () => {
      mounted = false
      mql.removeListener(onChange)
    }
  }, [query])

  return state
}

function Box() {
  const isBig = useMedia('(min-width: 1000px)')
  const isMedium = useMedia('(max-width: 999px) and (min-width: 700px)')
  const isSmall = useMedia('(max-width: 699px)')
  const color = isBig ? 'green' : isMedium ? 'yellow' : isSmall ? 'red' : null

  return <div style={{width: 200, height: 200, backgroundColor: color}} />
}

function App() {
  return <Box />
}

export default App
