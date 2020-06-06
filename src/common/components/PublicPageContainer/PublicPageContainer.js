import React, { Fragment } from 'react';
import PublicPageHeader from './PublicPageHeader';
import PublicPageFooter from './PublicPageFooter';

const PublicPageContainer = (props) => {

  return (
    <Fragment>
      <PublicPageHeader />
      {props.children}
      <PublicPageFooter />
    </Fragment>
  );
}

export default PublicPageContainer;
