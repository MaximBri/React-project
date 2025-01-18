import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store';
import { AppRoutes } from './routes';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </HashRouter>
    </div>
  );
}

export default App;
