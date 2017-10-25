// requiring the needed packages
const React = require('react');
const ReactDOM = require('react-dom');
const {browserHistory, hashHistory, Route, Router} = require('react-router');
const login = require('./components/mainComponents/login.jsx');
const LandingPage = require('./components/mainComponents/landingPage.jsx');

const MainComp = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});
ReactDOM.render(
  <Router history={hashHistory}>
  <Route path="/" component={LandingPage}/>
  <Route path="/test" component={login}/>
</Router>, document.getElementById('app'));
