import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import store from "./redux/store";
import Main from "./Main";
import {HashRouter as Router} from "react-router-dom";

require('./index.less');

const App: React.FC = () => {
  return (
    <Router basename={''}>
      <Provider store={store}>
        <Main/>
      </Provider>
    </Router>
  );
};


export default App;
