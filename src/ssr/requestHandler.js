import React from 'react';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import { applyMiddleware, createStore } from 'redux';
// import { SheetsRegistry } from 'jss';
import ReactDOMServer from 'react-dom/server';
// import JssProvider from 'react-jss/lib/JssProvider';
import path from 'path'
import fs from 'fs'
import {
  ThemeProvider,
  ServerStyleSheets
} from '@material-ui/core/styles';
import { StaticRouter, matchPath } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import reducers from '../reducers/index';
import Routes from '../setup/Routes';
import routesConfigs from './routesConfig';
import theme from '../setup/theme';
import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(createSagaMiddleware);

function renderView(req, res, state) {

  // STEP-1 CREATE A REDUX STORE ON THE SERVER
  const store = createStore(reducers, state, middleware);
  const sagaManager = sagaMiddleware.run(sagas);
  //commented below and using the function pasted above to solve css problem in sidebar and for buttons component
  // STEP-2 GET INITIAL STATE FROM THE STORE
  const initialState = JSON.stringify(store.getState()).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
  // STEP-3 IMPLEMENT REACT-ROUTER ON THE SERVER TO INTERCEPT CLIENT REQUESTs AND DEFINE WHAT TO DO WITH THEM
  const sheets = new ServerStyleSheets();
  const css = sheets.toString();
  const reactComponent = ReactDOMServer.renderToString(
    sheets.collect(
      // <JssProvider generateClassName={generateClassName}>
      <ThemeProvider theme={theme} >
        <Provider store={store}>
          <StaticRouter
            location={req.url}
            context={{}}>
            {Routes}
          </StaticRouter>
        </Provider>
      </ThemeProvider>
      // </JssProvider>
    ));
  const reactMetaComponent = DocumentMeta.renderToStaticMarkup();
  //https://crypt.codemancers.com/posts/2016-09-16-react-server-side-rendering/
  //res.status(200).render('index', { reactComponent, reactMetaComponent, initialState });
  fs.readFile(path.resolve('build/index.html'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('An error occurred')
    }
    const replacedData = data.replace(
      '<div id="root"></div>',
      `<div id="root">${reactComponent}</div>
        <style id="jss-server-side">${css}</style>
        <script>
          window.INITIAL_STATE = ${initialState}
        </script>`
    );
    const replacedMetaTagData = replacedData
      .replace(`<meta id="reactMetaTags"/>`,
        `${reactMetaComponent}`);
    res.send(replacedMetaTagData);
  });
}

function handleRender(req, res) {
  // filter matching paths
  // and check if components have data requirement
  const components =
    routesConfigs.filter(route => matchPath(req.path, route))
      .map(route => route.component);
  if (components.length > 0 && (components[0].fetchData instanceof Function)) {
    components[0]
      .fetchData(req.query)
      .then((response) => {
        renderView(req, res, response);
      })
      .catch((error) => {
        try {
          console.log('--- ssr render error --- ', error);
        } catch (e) {
          console.log('--- ssr render error catch--- ', e);
        }
        renderView(req, res, {});
      });
  } else {
    renderView(req, res, {});
  }
}

module.exports = handleRender;
