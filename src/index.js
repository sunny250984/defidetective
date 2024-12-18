import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { AuthProvider } from './provider/AuthProvider'
import { ContractProvider } from './provider/ContractProvider'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <ContractProvider>
      <Provider store={store}>
        <App />
        </Provider>
      </ContractProvider>
    </AuthProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
