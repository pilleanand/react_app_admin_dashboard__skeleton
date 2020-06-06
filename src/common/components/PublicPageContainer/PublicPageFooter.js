import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.primary.main,
    width: "100%",
    height: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    top: 500
  }
}));

const PublicPageFooter = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      Public footer component
    </div>
  );
};

export default PublicPageFooter;