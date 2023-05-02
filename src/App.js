import styles from './App.module.css';
import NavBar from "./components/NavBar";
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import RecipeCreateForm from './pages/recipes/RecipeCreateForm';
import RecipeDetailPage from './pages/recipes/RecipeDetailPage';


function App() {


  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home page</h1>} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/recipes/create" render={() => <RecipeCreateForm />} />
          <Route exact path="/recipes/:id" render={() => <RecipeDetailPage />} />
          <Route render={() => <p>Page Not Found!</p>}></Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;