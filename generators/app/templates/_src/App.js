import { React, Router, Switch, Route, WrappingApiFetch, PropTypes } from './Framework';
import { Wrapper, Container } from './Ui';
import { Authenticate } from './Components/Authenticate';
import { Heading } from './Components/Heading';
import { Footing } from './Components/Footing';
import { Welcome } from './Views/Welcome';
import { Account } from './Views/Account';
import { Managed } from './Views/Managed';

/**
 * App
 * 
 * Simple portal app for accessing views based on route. Expects settings and
 * identity determined by api lookup.
 * 
 */
export class App extends React.Component {

  state = {
    fetching: true,
    authenUp: false,
    services: {
      sitesapi: new WrappingApiFetch(this.props.settings.sitesUrl),
    },
    handling: {
      showSigningIn: () => {
        this.setState({
          authenUp: true,
        });
      },
      createAccount: async ({ label, email, password, confirms, accepted }) => {
        try {
          let result = await this.state.services.sitesapi.post('/merchant/register', {
            label: label,
            email: email,
            password: password,
            confirms: confirms,
            accepted: accepted,
          });
    
          if (!result.error) {
            localStorage.setItem('identy', result.identy);
            this.setState({
              identity: {
                access: {
                  email: result.employ.email,
                  ucode: result.employ.ucode,
                  group: 'E',
                }
              }
            });
          }
          else {
            throw new Error(result.error);
          }
        }
        catch (eX) {
          throw new Error(eX.message.toLowerCase());
        }
      },
      checkIdentity: async ({ email, password }) => {
        try {
          let result = await this.state.services.sitesapi.post('/merchant/authenticate', {
            email: email,
            password: password,
          });
    
          if (!result.error) {
            localStorage.setItem('identy', result.identy);
            this.setState({
              identity: {
                access: {
                  email: result.employ.email,
                  ucode: result.employ.ucode,
                  group: 'E',
                }
              }
            });
          }
          else {
            throw new Error(result.error);
          }
        }
        catch (eX) {
          throw new Error(eX.message.toLowerCase());
        }
      },
      eraseIdentity: async () => {
        localStorage.removeItem('identy');
        this.setState({
          identity: {
            access: {
              ucode: 'guest',
              group: 'G',
            }
          }
        })
      },
    },
    identity: {
      access: {
        ucode: 'guest',
        group: 'G',
      },
    },
  };

  componentDidMount() {
    this.fetchIdentity();
  }

  render() {
    const { fetching, handling, authenUp } = this.state;

    return (
      <Router>
        <Wrapper>
          <Heading {...this.state}>
          </Heading>
          <section className="app-section">
            <Container>
              {fetching !== true &&
                <Wrapper>
                  {authenUp === true &&
                    <Authenticate
                      onSubmit={async (formData, done) => {
                        try {
                          await handling.checkIdentity(formData);
                          done(false);
                        }
                        catch (eX) {
                          done(eX);
                        }
                      }}
                      onFinish={() => {
                        this.setState({
                          authenUp: false,
                        });
                      }}
                    />
                  }
                  <Switch>
                    <Route path="/welcome" render={(props) => (
                      <Welcome {...this.state} {...props} />
                    )} />
                    <Route path="/account" render={(props) => (
                      <Account {...this.state} {...props} />
                    )} />
                    <Route path="/managed" render={(props) => (
                      <Managed {...this.state} {...props} />
                    )} />
                    <Route render={(props) => (
                      <Welcome {...this.state} {...props} />
                    )} />
                  </Switch>
                </Wrapper>
              }
              {fetching === true &&
                <span>
                Loading...
                </span>
              }
            </Container>
          </section>
          <Footing>
          </Footing>
        </Wrapper>
      </Router>
    );
  }

  fetchIdentity = async () => {
    try {
      let result = await this.state.services.sitesapi.json('/merchant/self');

      if (!result.error) {
        localStorage.setItem('identy', result.identy);
        this.setState({
          identity: {
            access: {
              email: result.employ.email,
              ucode: result.employ.ucode,
              group: 'E',
            }
          }
        });
      }
    }
    catch (eX) {
    }
    finally {
      this.setState({
        fetching: false,
      });
    }
  };

  static propTypes = {
    settings: PropTypes.object.isRequired,
  };

}
