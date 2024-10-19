import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import NotFoundPage from './pages/NotFoundPage'
import PersonPage from './pages/PersonPage'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import MainLayout from './layouts/MainLayout'
import { store } from './RTK/store'
import './scss/reset.css'
import './scss/globals.scss'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path='/React-project' element={<MainLayout />}>
              <Route path='' element={<HomePage />} />
              <Route path='Authorization' element={<AuthPage />} />
              <Route path='User' element={<PersonPage/>}/>
            </Route>
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  )
}

export default App