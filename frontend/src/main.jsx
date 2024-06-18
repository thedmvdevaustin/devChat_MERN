import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import DashboardScreen from './screens/DashboardScreen.jsx'
import ConversationScreen from './screens/ConversationScreen.jsx'
import NoConvoDisplay from './components/NoConvoDisplay.jsx'
import SocketContextProvider from './socket/SocketContextProvider.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/dashboard" element={<DashboardScreen />}>
        <Route index={true} path="/dashboard" element={<NoConvoDisplay />} />
        <Route path="/dashboard/:id" element={<ConversationScreen />} />
      </Route>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketContextProvider>
        <RouterProvider router={router} />
      </SocketContextProvider>
    </Provider>
  </React.StrictMode>,
)
