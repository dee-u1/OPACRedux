import logo from './logo.svg';
import './App.css';
import OPAC from './components/OPAC/OPAC';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';

function App() {
  return (
    <div className="App">
      <header className="App-header"> 
      <Switch>
        <Route path="/" >
          <OPAC />
        </Route>
      </Switch>
      </header>
    </div>
  );
}

export default App;
