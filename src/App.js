import React,{ Fragment} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import  AuthRoute from './components/routing/AuthRoute';
import  ProfileRoute from './components/routing/ProfileRoute';


const App = () => {

  return (
    //<Provider store={store}>
      <Router>
        <AuthRoute/>
        <ProfileRoute/>
      </Router>
    //</Provider>
  );
};
export default App