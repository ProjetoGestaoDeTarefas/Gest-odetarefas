//Para Ver a página coloque o nome do import em <nome/> e coloque as outras paginas como comentário
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import LandingPage from './components/Definitivos Header/LandingPage'
import SignIn from './components/Login/cadastro/Signin'
import SignUp from './components/Login/cadastro/Signup';
import Updatepass from './components/Login/cadastro/Updatepass'

  
function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route exact path="/sup" component={SignUp} />
        <Route path="/uppass" component={Updatepass} />
      </Switch>
    </Router>
    <SignIn/>
    </>
  )
}

export default App
