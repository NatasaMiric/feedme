import styles from './App.module.css';
import NavBar from "./components/NavBar";
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import RecipeCreateForm from './pages/recipes/RecipeCreateForm';
import RecipeDetailPage from './pages/recipes/RecipeDetailPage';
import RecipesPage from './pages/recipes/RecipesPage';
import { useCurrentUser } from './contexts/CurrentUserContext';


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "" ;

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route 
          exact 
          path="/" 
          render={() => (
          <RecipesPage message="No results found. Adjust the search keyword" />
          )} />
          <Route 
          exact 
          path="/bookmarked" 
          render={() => (
          <RecipesPage message="No results found. Adjust the search keyword or bookmark a recipe" 
          filter={`bookmarks__owner__profile=${profile_id}&ordering=-bookmarks__created_at&`} />
          )} />
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