import { Provider } from 'react-redux';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home/Home.js';
import { store } from './redux/store/store';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
       <Navbar/>
       <Home/>
    </div>
    </Provider>
  );
}

export default App;
