import { React, Link, PropTypes } from '../Framework';
import { Modal, Grid, Form, Button, Message, Ricochet } from '../Ui';

export class Authenticate extends React.Component {

  state = {
    formBusy: false,
    feedback: '',
  };

  render() {
    const { formBusy, feedback } = this.state;
    const { onSubmit, onFinish } = this.props;

    return (
      <Ricochet>
        <Modal size="tiny" dimmer open={true} onClose={() => {
          onFinish();
        }}>
          <Modal.Header>
            Sign In To Your Account
          </Modal.Header>
          <Modal.Content>
            {feedback &&
              <Message negative>
                Oops: {feedback}
              </Message>            
            }
            <Form.Managed receiver="yes" formBusy={formBusy} onSubmit={(formData, done) => {
              this.setState({
                formBusy: true,
              });

              onSubmit(formData, (eX) => {
                if (!eX) {
                  onFinish();
                }
                else {
                  this.setState({
                    feedback: eX.message,
                    formBusy: false,
                  });
                }

                if (done) {
                  done(eX);
                }
              });
            }}>
              <Form.Input
                submit="yes"
                name="email"
                icon="user"
                iconPosition="left"
                placeholder="Email address"
              />
              <Form.Input
                submit="yes"
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              />
            </Form.Managed>
          </Modal.Content>
          <Modal.Actions>
            <Grid columns="2" stackable>
              <Grid.Column verticalAlign="middle">
                You may
                &nbsp;
                <Link to="/account/signup" onClick={() => {
                  onFinish();
                }}>
                  Reset Password
                </Link>
                &nbsp;
                or
                &nbsp;
                <Link to="/account/signup" onClick={() => {
                  onFinish();
                }}>
                  Sign Up
                </Link>
              </Grid.Column>
              <Grid.Column>
                <Button onClick={() => {
                  onFinish();
                }}>
                  Cancel
                </Button>
                {formBusy !== true &&
                  <Button positive emitting="yes">
                    Sign In
                  </Button>
                }
                {formBusy === true &&
                  <Button positive loading>
                    Sign In
                  </Button>
                }
              </Grid.Column>
            </Grid>
          </Modal.Actions>
        </Modal>
      </Ricochet>
    );
  }
    
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onFinish: PropTypes.func.isRequired,
  }

}
