const { useSelector, useDispatch } = ReactRedux;


export function AppFooter() {
  const user = useSelector(storeState => storeState.loggedInUser);

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
      <footer style={getStyleByUser()} className="flex center ">
        <p>&copy; Coffeerights Aviya Harel 2024</p>
      </footer>
    )
  }
  