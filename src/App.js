import './App.css';
import Ioa from './components/Ioa';
import Signin from './components/Signin';
import SignUp from './components/SignUp';
import SignMethod from './Context/SignMethod';
import Main from './materialUI/main';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import Feed from './components/Feed';

function App() {
  return (
    <Router>
      <SignMethod>
        <Switch>
          {console.log("Hello")}
          <PrivateRoute exact path="/" component={Feed}></PrivateRoute>
          <Route path="/signin" component={Signin}></Route>
          <Route path="/signup" component={SignUp}></Route>
        </Switch>
    </SignMethod>
    </Router>
    
  );
}

export default App;
