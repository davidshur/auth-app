import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div style={{ height: '75vh' }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              Send love to <b>family</b> and <b>friends</b>!
            </h4>
            <p className="flow-text grey-text text-darken-1">
              You send a postcard online. We send a postcard in real-life.
            </p>
            <br />
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: '140px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px',
                }}
                className="btn btn-large btn-flat waves-effect hoverable white pink-text accent-3"
              >
                Log In
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: '140px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px',
                }}
                className="btn btn-large waves-effect waves-light hoverable pink accent-3"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
