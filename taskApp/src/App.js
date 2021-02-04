import './App.css';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import Tasks from "./components/task";

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute restricted={true} component={SignIn} path="/" exact/>
        <PublicRoute restricted={true} component={SignUp} path="/sign-up" exact/>
        <PrivateRoute component={Tasks} path="/task" exact/>
      </Switch>
    </Router>
  );
}

export default App;
