const { NavLink, useNavigate } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux;
import { LoginSignup } from './LoginSignup.jsx';
import { logout } from '../store/actions/user.actions.js';




export function AppHeader() {
  const user = useSelector(storeState => storeState.userModule.loggedInUser);
  const todos = useSelector(storeState => storeState.todoModule.todos);
  const checkedTodosCount = useSelector(storeState => storeState.todoModule.checkedTodosCount);

  function howMuchDone() {
    let count = 0
    todos.map(todo => {
      if (todo.isDone) count++
    }
    )
    return count
  }

  function onLogout() {
    logout()
      .then(() => {
        showSuccessMsg('logout successfully');
      })
      .catch(err => {
        showErrorMsg('Oops try again');
      });
  }

  function getStyleByUser() {
    console.log('user:', user)
    const prefs = {
      color: '',
      backgroundColor: ''
    }
    if (user && user.pref) {
      prefs.color = user.pref.color
      prefs.backgroundColor = user.pref.bgColor
    }

    return prefs
  }


  return (
    <section className="header-container">

      <header style={getStyleByUser()} className="app-header full main-layout">
        <h1 className="logo-todo">Todo App</h1>
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/todos">Todos</NavLink>
          {<NavLink to="/user">Profile</NavLink>}
          <NavLink to="/about">About</NavLink>
        </nav>
        {user ? (
          <section className="user-data">
            <span to={`/user/${user._id}`}>
              Hello {user.fullname}
            </span>
            <button onClick={onLogout}>Logout</button>
            <progress value={howMuchDone()} max={todos.length}></progress>
          </section>
        ) : (
          <section className="login-page">
            <LoginSignup />
          </section>
        )}
      </header>
    </section>
  )
}