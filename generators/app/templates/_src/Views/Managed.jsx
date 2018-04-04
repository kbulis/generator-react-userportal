import { React, Route, Redirect, Link, PropTypes } from '../Framework';
import { Container } from '../Ui';
import { Dashboard } from '../Components/Dashboard';
import { View } from '../Components/View';

export class Managed extends React.PureComponent {

  render() {
    const { identity } = this.props;

    if (identity.access.group !== 'G') {
      return (
        <Container text>
          Managed {identity.access.ucode}
          <br />
          <br />
          <Route path="/managed/dashboard" render={(props) => (
            <Dashboard {...this.state} {...this.props} {...props} />
          )} />
          <Route path="/managed/view/:id" render={(props) => (
            <View {...this.state} {...this.props} {...props} />
          )} />
          <br />
          <br />
          <Link to="/welcome">
            welcome
          </Link>
        </Container>
      )
    }
    else {
      return (
        <Redirect to="/welcome" />
      )
    }
  }

  static propTypes = {
    services: PropTypes.object.isRequired,
    identity: PropTypes.object.isRequired,
  };

}
