import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';

class Success extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div style={{ height: '75vh' }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(' ')[0]}
              <p className="flow-text grey-text text-darken-1">
                Thanks for the <span style={{ fontFamily: 'monospace' }}>SUPPORT</span> 👏
              </p>
            </h4>
            <div className="col s6">
              <Link to="/dashboard">
                <button
                  style={{
                    width: '150px',
                    borderRadius: '3px',
                    letterSpacing: '1.5px',
                    marginTop: '1rem',
                  }}
                  className="btn btn-large btn-flat waves-effect white black-text"
                >
                  Dashboard
                </button>
              </Link>
            </div>
            <div className="col s6">
              <button
                style={{
                  width: '150px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px',
                  marginTop: '1rem',
                }}
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Success.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Success);
