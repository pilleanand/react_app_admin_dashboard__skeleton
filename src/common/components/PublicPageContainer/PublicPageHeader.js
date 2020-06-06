import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { APP_NAME_CONSTANTS } from '../../../resources/StringsEn';
import { navigateToPageWithPath } from '../../../helpers/NavigationHelpers';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1
  }
}));

const PublicPageHeader = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {APP_NAME_CONSTANTS.NAME}
        </Typography>
        <Button color="inherit">Contact</Button>
        <Button color="inherit">About</Button>
        <Button color="inherit" onClick={() => navigateToPageWithPath(history, '/login')}>Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default PublicPageHeader;