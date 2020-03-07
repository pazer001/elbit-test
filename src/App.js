import React from 'react';
import 'typeface-roboto';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './App.css';
import Layouts from "./containers/Layouts";
import Configurations from "./containers/Configurations";
import {Provider} from "react-redux";
import store from "./store/store";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Router>
                    <AppBar position="static">
                        <Toolbar>
                            <Link to="/layouts"><Button>Layouts</Button ></Link>
                            <Link to="/configurations"><Button>Configurations</Button></Link>
                        </Toolbar>
                    </AppBar>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/layouts" />
                        </Route>
                        <Route path="/layouts">
                            <Layouts/>
                        </Route>
                        <Route path="/configurations">
                            <Configurations/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        </Provider>
    );
}

export default App;
