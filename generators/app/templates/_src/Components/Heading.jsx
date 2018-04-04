import { React, Link, PropTypes } from '../Framework';
import { Container, Responsive, Grid, List, Icon, Button } from '../Ui';

export class Heading extends React.PureComponent {

  state = {
  };

  render() {
    const { identity, fetching, handling } = this.props;

    return (
      <header className="app-header">
        <Container>
          <Grid>
            <Grid.Column width={4} verticalAlign="middle" textAlign="left">
              <Link to="/welcome">
                <picture>
                  <source srcSet="/images/logo-p-300.png" media="(min-width: 1200px)" />
                  <source srcSet="/images/logo-p-240.png" media="(min-width: 800px)" />
                  <source srcSet="/images/logo-p-180.png" media="(min-width: 500px)" />
                  <img src="/images/logo-p-120.png" alt="portal" />
                </picture>
              </Link>
            </Grid.Column>
            <Grid.Column width={12} verticalAlign="middle" textAlign="right">
              <Responsive minWidth="800">
                <List size="large" horizontal={true}>
                  {fetching !== true && identity.access.ucode !== 'guest' &&
                    <List.Item>
                      <Link to="/managed/dashboard" className="command link">Dashboard</Link>
                    </List.Item>
                  }
                  <List.Item>
                    FAQ
                  </List.Item>
                  <List.Item>
                    About
                  </List.Item>
                  {fetching !== true && identity.access.ucode !== 'guest' &&
                    <List.Item>
                      <Button className="command" basic inverted color="orange" onClick={() => {
                        handling.eraseIdentity();
                      }}>
                        Sign Out
                      </Button>
                    </List.Item>
                  }
                  {fetching !== true && identity.access.ucode === 'guest' &&
                    <List.Item>
                      <Button className="command" basic inverted color="orange" onClick={() => {
                        handling.showSigningIn();
                      }}>
                        Sign In
                      </Button>
                    </List.Item>
                  }
                </List>
              </Responsive>
              <Responsive maxWidth="799">
                <List size="medium" horizontal={true}>
                  {fetching !== true && identity.access.ucode !== 'guest' &&
                    <List.Item>
                      <Link to="/managed/dashboard" className="command">Dashboard</Link>
                    </List.Item>
                  }
                  {fetching !== true && identity.access.ucode !== 'guest' &&
                    <List.Item>
                      <Link to="/welcome" className="command" onClick={() => {
                        handling.eraseIdentity();
                      }}>
                        Sign Out
                      </Link>
                    </List.Item>
                  }
                  {fetching !== true && identity.access.group === 'G' &&
                    <List.Item>
                      <Link to="/account/signin" className="command">Sign In</Link>
                    </List.Item>
                  }
                  <List.Item onClick={() => console.log('sidebar')}>
                    <Icon name="sidebar" />
                  </List.Item>
                </List>
              </Responsive>
            </Grid.Column>
          </Grid>
        </Container>
      </header>
    );
  }

  static propTypes = {
    identity: PropTypes.object.isRequired,
    services: PropTypes.object.isRequired,
    handling: PropTypes.object.isRequired,
  };

}