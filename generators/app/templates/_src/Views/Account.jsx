import { React, Route, PropTypes } from '../Framework';
import { Container } from '../Ui';
import { SignIn } from '../Components/SignIn';
import { SignUp } from '../Components/SignUp';

export class Account extends React.PureComponent {

  render() {
    const { handling } = this.props;

    return (
      <Container text>
        <Route path="/account/signin" render={(props) => (
          <SignIn
            onSubmit={async (formData, done) => {
              try {
                await handling.checkIdentity(formData);
                done(false);
              }
              catch (eX) {
                done(eX);
              }
            }}
          />
        )} />
        <Route path="/account/signup" render={(props) => (
          <SignUp
            onSubmit={async (formData, done) => {
              try {
                await handling.createAccount(formData);
                done(false);
              }
              catch (eX) {
                done(eX);
              }
            }}
          />
        )} />
      </Container>
    )
  }

  static propTypes = {
    services: PropTypes.object.isRequired,
    handling: PropTypes.object.isRequired,
    identity: PropTypes.object.isRequired,
  };

}
