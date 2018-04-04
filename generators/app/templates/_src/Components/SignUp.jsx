import { React, Link, PropTypes } from '../Framework';
import { Wrapper, Grid, Form, Segment, Message, Container, Button, Image, Icon } from '../Ui';

export class SignUp extends React.Component {

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
                Enter your account details to get started. If you already have an
                account, then click <Link to="/account/signin">Sign In</Link> to
                return.
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
                      name="label"
                      icon="id badge"
                      iconPosition="left"
                      placeholder="Your company name"
                    />
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      name="email"
                      icon="mail"
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
                  <Form.Field>
                    <Form.Input
                      name="confirms"
                      icon="lock"
                      iconPosition="left"
                      placeholder="Confirm password"
                      type="password"
                    />
                  </Form.Field>
                  <Form.Field>
                    <Form.Click
                      name="accepted"
                    >
                      <Container active="yes" textAlign="right">
                        <Icon size="large" name="heart" />
                        Yes, I do agree to terms and conditions
                      </Container>
                      <Container textAlign="right">
                        <Icon size="large" name="question" />
                        Do you agree to terms and conditions
                      </Container>
                    </Form.Click>
                  </Form.Field>
                </Segment>
                <Segment basic textAlign="right">
                  {formBusy !== true &&
                    <Button positive>
                      Create Account
                    </Button>
                  }
                  {formBusy === true &&
                    <Button positive loading disabled>
                      Create Account
                    </Button>
                  }
                </Segment>
              </Form.Managed>
            </Grid.Column>
            <Grid.Column only="computer tablet">
              <Segment basic textAlign="left">
                <Image src="/images/hero-p-320.png" alt="portal" />
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
