import { HashRouter, BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import { NotFoundPage, PersonPage, HomePage, AuthPage} from './pages'
import MainLayout from './layouts/MainLayout'
import { store } from './RTK/store'
import './scss/reset.css'
import './scss/globals.scss'

function App() {
  return (
    <div className='App'>
      <HashRouter>
        <Provider store={store}>
          <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route path='' element={<HomePage />} />
              <Route path='Authorization' element={<AuthPage />} />
              <Route path='User' element={<PersonPage />} />
            </Route>
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Provider>
      </HashRouter>
    </div>
  )
}

export default App
