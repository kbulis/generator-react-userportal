import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

class WrappingApiFetch {

  endpoint = '';

  post = async (path, body, token = localStorage.getItem('identy')) => {
    try {
      let res = await fetch((this.endpoint.endsWith('/') ? this.endpoint.substr(0, this.endpoint.length - 1) : this.endpoint) + '/' + (path.startsWith('/') ? path.substr(1) : path), {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({
          ...body
        }),
      });

      if (res.status !== 200) {
        let err = {};

        try {
          err = await res.json();
        }
        catch (eX) {
        }

        if (!err.error) {
          throw new Error(res.statusText.toLowerCase());
        }

        throw new Error(err.error);
      }

      return await res.json();
    }
    catch (eX) {
      throw eX;
    }
  };

  json = async (path, token = localStorage.getItem('identy')) => {
    try {
      let res = await fetch((this.endpoint.endsWith('/') ? this.endpoint.substr(0, this.endpoint.length - 1) : this.endpoint) + '/' + (path.startsWith('/') ? path.substr(1) : path), {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token,
        }
      });

      if (res.status !== 200) {
        let err = {};
        
        try {
          err = await res.json();
        }
        catch (eX) {
        }

        if (!err.error) {
          throw new Error(res.statusText.toLowerCase());
        }

        throw new Error(err.error);
      }

      return await res.json();
    }
    catch (eX) {
      throw eX;
    }
  };

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

}

export {
  React,
  ReactDOM,
  WrappingApiFetch,
  Router,
  Switch,
  Route,
  Redirect,
  Link,
  PropTypes,
}
