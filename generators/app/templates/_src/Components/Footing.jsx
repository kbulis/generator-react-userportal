import { React } from '../Framework';
import { Container, Grid, Icon } from '../Ui';

export class Footing extends React.PureComponent {

  render () {
    return (
      <footer className="app-footer">
        <Container>
          <Grid stackable>
            <Grid.Column width={10}>
              <div className="footer-block">
                <picture>
                  <source srcSet="/images/logo-p-300.png" media="(min-width: 1200px)" />
                  <source srcSet="/images/logo-p-240.png" media="(min-width: 800px)" />
                  <source srcSet="/images/logo-p-180.png" media="(min-width: 500px)" />
                  <img src="/images/logo-p-120.png" alt="portal" />
                </picture>
              </div>
              <div className="footer-block">
                <a className="link" href="">Terms of Use</a>
                <a className="link" href="">Privacy Policy</a>
                <a className="link" href="">Contact Us</a>
              </div>
              <div className="footer-block footer-text">
                Use of Portal is subject to our Terms of Use and Privacy Policy.
              </div>
              <div className="footer-block footer-text">
                &copy; 2018 Portal. All rights reserved.
              </div>
            </Grid.Column>
            <Grid.Column width={6}>
              <div className="footer-block footer-contact">
                <a className="ui circular icon button" href="" target="_blank" alt="facebook">
                  <Icon name="facebook" />
                </a>
                <a className="ui circular icon button" href="" target="_blank" alt="twitter">
                  <Icon name="twitter" />
                </a>
                <a className="ui circular icon button" href="" target="_blank" alt="mail">
                  <Icon name="mail" />
                </a>
              </div>
            </Grid.Column>
          </Grid>
        </Container>
      </footer>
    );
  }

  static propTypes = {
  };

}
