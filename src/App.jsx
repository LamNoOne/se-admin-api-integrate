import { BrowserRouter } from "react-router-dom"
import { store } from "./app/store"
import Router from "./routes"
import { Provider } from "react-redux"

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </Provider>
    )
}

export default App
