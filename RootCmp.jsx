const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM
const { Provider } = ReactRedux

import { AppHeader } from './cmps/AppHeader.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { TodoApp } from './pages/TodoIndex.jsx'
import { store } from './store/store.js'
import { TodoDetails } from './cmps/TodoDetails.jsx'
import { UserProfile } from './pages/UserProfile.jsx'
// import { UserProfile } from './pages/UserProfile.jsx'
// import { AdminDashboard } from './pages/AdminDashboard.jsx'


export class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <section className="app">
                        <AppHeader />
                        <main className='main-layout'>
                            <Routes>
                                <Route element={<HomePage />} path="/" />
                                <Route element={<AboutUs />} path="/about" />
                                <Route element={<TodoApp />} path="/todos" />
                                <Route element={<TodoDetails />} path={'/todo/:id'} />
                                <Route element={<UserProfile />} path={'/user'} />
                            </Routes>
                        </main>
                        <AppFooter />
                    </section>
                </Router>
            </Provider>

        )
    }
}
