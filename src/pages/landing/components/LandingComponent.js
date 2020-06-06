import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLandingpagstatsAction } from '../actions/LandingpageActions';
import PublicPageContainer from '../../../common/components/PublicPageContainer';

class LandingComponent extends Component {

  componentDidMount() {
    this.props.fetchLandingpagstatsAction();
  }

  render() {
    console.log('state redux common:', this.props.common);
    console.log('state redux landing:', this.props.landing);

    return (
      <PublicPageContainer>
        <div className="App">
          This is Landing Page
          <div>
            All th public facing landing  data  will appear here
          </div>
        </div>
      </PublicPageContainer>
    );
  }
}

const mapStateToProps = ({ landing, common }) => ({
  landing, common
});

const mapDispatchToProps = dispatch => {
  return {
    fetchLandingpagstatsAction: () => dispatch(fetchLandingpagstatsAction()),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(LandingComponent);