import React from "react";
import './app.scss';
import { BrowserRouter as Router, Switch,Route, Redirect } from "react-router-dom";
import {auth} from './firebase'
import Home from './app/pages/HomePage/Home.page';
import Login from "./app/pages/LoginPage/Login.page";

function App() {

  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    const fetchUser = () => {
      auth.onAuthStateChanged(user => {
        console.log(user)
        if(user){
          setFirebaseUser(user)
        } else {
          setFirebaseUser(null)
        }
      })
    }
    fetchUser()
  }, [])

  const PrivateRoute = ({component, path, ...rest}) => {
    if(localStorage.getItem('usuario')){
      const usuarioStorage = JSON.parse(localStorage.getItem('usuario'))
      if(usuarioStorage.uid === firebaseUser.uid){
        return <Route component={component} path={path} {...rest} />
      } else {
        return <Redirect to="/login" {...rest} />
      }
    } else {
      return <Redirect to="/login" {...rest} />
    }
  }

  return firebaseUser !== false ? (
    
    <Router>
      <Switch>
        <PrivateRoute component={Home} path="/" exact/>
        <Route component={Login} path="/login" exact />
      </Switch>
    </Router>
  ) : (
    <h1>Cargando...</h1>
  );
}

export default App;
