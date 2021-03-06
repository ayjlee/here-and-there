import React, { Component } from 'react';
import google from '../misc/google.png';

// const GoogleAuth = require('google-auth-library');
//
// const auth = new GoogleAuth;
//
// const client = new auth.OAuth2(CLIENT_ID, '', '');
// client.verifyIdToken(
//   token,
//   CLIENT_ID,
//   function(e, login) {
//     const payload = login.getPayload();
//     const userid = payload['sub'];
//     // if request specified a G suite domain:
//       // const domain = payload['hd'];
//   }
// )

class GoogleLogin extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    (function() {
      const e = document.createElement("script");
      e.type = "text/javascript";
      e.async = true;
      e.src = "https://apis.google.com/js/client:platform.js?onload=gPOnLoad";
      const t = document.getElementsByTagName("script")[0];
      t.parentNode.insertBefore(e,t)
    })();
  }
  googleLogin = () => {
    let response = null;
    window.gapi.auth.signIn({
      callback: function(authResponse) {
        this.googleSignInCallback( authResponse)
      }.bind(this),
      clientid: process.env.REACT_APP_GOAUTH_CLIENT_ID,
      cookiepolicy: 'single_host_origin',
      requestvisibleactions: 'http://schema.org/AddAction',
      scope: 'https://www.googleapis.com/auth/plus.login email',
    });
  }
  googleSignInCallback = (e) => {
        console.log( e )
        if (e["status"]["signed_in"]) {
            window.gapi.client.load("plus", "v1", function() {
                if (e["access_token"]) {
                    this.getUserGoogleProfile( e["access_token"] )
                } else if (e["error"]) {
                    console.log('Import error', 'Error occured while importing data')
                }
            }.bind(this));
        } else {
            console.log('Oops... Error occured while importing data')
        }
    }

    getUserGoogleProfile = accesstoken => {
        var e = window.gapi.client.plus.people.get({
            userId: "me"
        });
        e.execute(function(e) {
            if (e.error) {
                console.log(e.message);
                console.log('Import error - Error occured while importing data')
                return

            } else if (e.id) {
                //Profile data
                alert("Successfull login from google : "+ e.displayName );
                console.log('e after sign in and getting usergoogle profile is:')
                console.log( e );
                return;
            }
        }.bind(this));
    }
  render() {
    return(
      <div>
        <span> Sign in with: </span>
        <img src={google} title="google login" alt="google" onClick={ () => this.googleLogin() }/>
      </div>
    )
  }
}

export default GoogleLogin;
