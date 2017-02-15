import React, {Component} from 'react';
import text from './hello.json';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
          {text.content}
        </div>
    );
  }
}

export default App;