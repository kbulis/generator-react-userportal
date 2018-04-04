import { React, Link, PropTypes } from '../Framework';
import { Container } from '../Ui';

export class Welcome extends React.PureComponent {

  render() {
    const { identity } = this.props;

    return (
      <Container text>
        Welcome {identity.access.ucode} to <%= name %>
        <br />
        <br />
        <%= description %>
        <br />
        <br />
        {identity.access.group === 'E' &&
          <Link to="/managed/dashboard">
            dashboard
          </Link>
        }
        {identity.access.group !== 'E' &&
          <Link to="/account/signin">
            account
          </Link>
        }
      </Container>
    )
  }

  static propTypes = {
    services: PropTypes.object.isRequired,
    identity: PropTypes.object.isRequired,
  };

}
