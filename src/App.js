import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import PomodoroClock from './component/PomodoroClock';

function App() {
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <PomodoroClock />
    </div>
  );
}

export default App;
