const { NavLink, useNavigate } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux;
import { LoginSignup } from './LoginSignup.jsx';
import { logout } from '../store/actions/user.actions.js';



export function AppHeader() {
  const user = useSelector(storeState => storeState.loggedInUser);
  const todos = useSelector(storeState => storeState.todos);
  const checkedTodosCount = useSelector(storeState => storeState.checkedTodosCount);

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


  return (
    <section className="header-container">

      <header className="app-header full main-layout">
        <h1>Todo App</h1>
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/todos">Todos</NavLink>
          {/* {<NavLink to="/user">Profile</NavLink>} */}
          {/* {user.isAdmin && <NavLink to="/admin">Admin</NavLink>} */}
          <NavLink to="/about">About</NavLink>
        </nav>
        {user ? (
          <section>
            <span to={`/user/${user._id}`}>
              Hello {user.fullname} <span>${user.score.toLocaleString()}</span>
            </span>
            <button onClick={onLogout}>Logout</button>
            <progress value={howMuchDone()} max={todos.length}></progress>
          </section>
        ) : (
          <section>
            {/* <LoginSignup onSetUser={onSetUser} />  */}
            <LoginSignup />
          </section>
        )}
      </header>
    </section>
  )
}