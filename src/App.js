import React, { useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

import showUpdateAvailableNotification from './showUpdateNotification'

function App() {
  const onVisibilityChange = () => {
    console.log('onVisibilityChange func called')
    if (
      document.visibilityState === 'visible' &&
      'serviceWorker' in navigator
    ) {
      navigator.serviceWorker.getRegistration().then(registration => {
        console.log('registration found', registration)
        registration?.update()
        registration?.addEventListener('updatefound', () => {
          console.log('updatefound event')
          console.log('[registration]', registration)
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
