import React, { useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

import showUpdateAvailableNotification from './showUpdateNotification'

function App() {
  const onVisibilityChange = () => {
    if (
      document.visibilityState === 'visible' &&
      'serviceWorker' in navigator
    ) {
      navigator.serviceWorker.getRegistration().then(registration => {
        registration?.update()
        registration?.addEventListener('updatefound', () => {
          showUpdateAvailableNotification(registration)
        })
      })
    }
  }

  useEffect(() => {
    if (!document) return

    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
