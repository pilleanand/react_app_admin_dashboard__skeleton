import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes';
// import theme from './theme';
import Themes from "./themes";
import configureStore from './StoreSetup';
import { LayoutProvider } from '../common/context/LayoutContext';
import { UserProvider } from '../common/context/UserContext';

const store = configureStore();

const App = () => (
  <LayoutProvider>
    <UserProvider>
      <ThemeProvider theme={Themes.default}>
        <Provider store={store}>
          <BrowserRouter>
            <CssBaseline />
            <Routes />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </UserProvider>
  </LayoutProvider>
);

export default App;
