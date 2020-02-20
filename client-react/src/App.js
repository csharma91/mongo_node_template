import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

//MUI Stuff
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

//Components
import Navbar from "./components/Navbar";

//Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#7986cb",
      main: "#212121",
      dark: "#303f9f",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff4081",
      main: "#9e9e9e",
      dark: "#c51162",
      contrastText: "#fff"
    }
  },
  typography: {
    useNextVarients: true
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/login" component={login} />
                <Route exact path="/signup" component={signup} />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
