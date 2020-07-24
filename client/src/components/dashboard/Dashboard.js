import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51H8XMFDrfM58ozRHV0XzB6C3NORvUOs7ZJsKV4oNVIpWsjwJqcWcM5WIOslmpXNAXnKVgGALmEGruc0VwokMNjeO00SosmmuNT'
);

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  handleClick = async (e) => {
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    stripe.redirectToCheckout({
      lineItems: [
        {
          price: 'price_1H8ZYgDrfM58ozRHX7IUXln6',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      successUrl: 'http://auth-app-mern.herokuapp.com',
      cancelUrl: 'http://auth-app-mern.herokuapp.com',
    });
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
                It is time you showed <span style={{ fontFamily: 'monospace' }}>DAVID</span> your
                support 👏
              </p>
            </h4>
            <div className="col s6">
              <button
                style={{
                  width: '150px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px',
                  marginTop: '1rem',
                }}
                onClick={this.handleClick}
                className="btn btn-large waves-effect waves-light hoverable green accent-3"
              >
                Subscribe
              </button>
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

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
