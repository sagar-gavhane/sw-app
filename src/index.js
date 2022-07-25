import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import 'antd/dist/antd.css'
import showUpdateAvailableNotification from './showUpdateNotification'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onUpdate: registration => {
    console.log('onUpdate has been called')
    const waitingServiceWorker = registration.waiting

    if (waitingServiceWorker) {
      console.log('add event listener on statechange')
      waitingServiceWorker.addEventListener('statechange', event => {
        console.log(
          'check event.target.state === activated',
          event.target.state
        )
        if (event.target.state === 'activated') {
          console.log('[registration]', registration)
          showUpdateAvailableNotification(registration)
        }
      })

      console.log('post message SKIP_WAITING')
      waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' })
    }
  },
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
