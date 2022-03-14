import * as React from 'react';
import Header from './components/header';
import Main from './pages/main';

import './style.css'

const App = () => {
    return (
      <div className='App'>
        <Header/>
        <Main />
      </div>
    )
  }

export default App;
  