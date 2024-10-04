import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './RTK/store'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import './scss/reset.css'
import './scss/globals.scss'

function App() {
  return (
    <div className='App'>
      <BrowserRouter >
        <Provider store={store}>
          <Routes>
            <Route path='/Home' element={<MainLayout />}>
              <Route path='' element={<HomePage />} />
              <Route path='Authorization' element={<AuthPage />} />
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
