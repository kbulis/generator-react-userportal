import { React, Link, PropTypes } from '../Framework';
import { Wrapper, Grid, Form, Segment, Message, Button, Image } from '../Ui';

export class SignIn extends React.Component {

  state = {
    formBusy: false,
    feedback: '',
  };

  render() {
    const { formBusy, feedback } = this.state;
    const { onSubmit } = this.props;

    return (
      <Wrapper>
        <Grid stackable>
          <Grid.Row columns="2" divided>
            <Grid.Column>
              <Segment basic textAlign="left">
                Enter your email address and password to sign in. If you need to get
                started, then click <Link to="/account/signup">Sign Up</Link> to
                create an account.
                <br />
                <br />
                Forgot your password? Click <b>Request Reset</b> to recover access
                to your account.
              </Segment>
              <Form.Managed formBusy={formBusy} onSubmit={(formData, done) => {
                this.setState({
                  formBusy: true,
                });

                onSubmit(formData, (eX) => {
                  if (eX) {
                    this.setState({
                      feedback: eX.message,
                      formBusy: false,
                    });
                  }
                  else {
                    this.setState({
                      formBusy: false,
                      feedback: '',
                    });
                  }

                  if (done) {
                    done(eX);
                  }
                });
              }}>
                <Segment basic textAlign="left">
                  {feedback &&
                    <Message negative>
                      Oops: {feedback}
                    </Message>            
                  }
                  <Form.Field>
                    <Form.Input
                      name="email"
                      icon="user"
                      iconPosition="left"
                      placeholder="Email address"
                    />
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      name="password"
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                    />
                  </Form.Field>
                </Segment>
                <Segment basic textAlign="right">
                  {formBusy !== true &&
                    <Button positive>
                      Sign In
                    </Button>
                  }
                  {formBusy === true &&
                    <Button positive loading disabled>
                      Sign In
                    </Button>
                  }
                </Segment>
              </Form.Managed>
            </Grid.Column>
            <Grid.Column only="computer tablet">
              <Segment basic textAlign="left">
                <Image src="/images/hero-p-320.png" alt="custom" />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    );
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

}
