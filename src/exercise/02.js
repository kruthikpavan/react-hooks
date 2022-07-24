// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageStateHook(
  defaultValue = '',
  key,
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [state, setState] = React.useState(() => {
    const value = window.localStorage.getItem(key)
    if (value) {
      return deserialize(value)
    }
    return defaultValue
  })
  const prevKey = React.useRef(key)
  React.useEffect(() => {
    const prevKeyValue = prevKey.current
    if (prevKeyValue !== key) {
      localStorage.removeItem(prevKeyValue)
    }
    prevKey.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, serialize, state])

  return [state, setState]
}

function Greeting({initialName}) {
  const [name, setName] = useLocalStorageStateHook(initialName, 'gays')

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName={''} />
}

export default App
