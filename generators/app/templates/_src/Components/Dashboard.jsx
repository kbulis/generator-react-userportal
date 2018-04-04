import { React, Link, PropTypes } from '../Framework';
import { Wrapper } from '../Ui';

export class Dashboard extends React.Component {

  render() {
    return (
      <Wrapper>
        This is the dashboard...
        <br />
        <br />
        <Link to="/managed/view/item-a">
          Item A
        </Link>
        <br />
        <Link to="/managed/view/item-b">
          Item B
        </Link>
        <br />
        <Link to="/managed/view/item-c">
          Item C
        </Link>
      </Wrapper>
    );
  }
    
  static propTypes = {
    services: PropTypes.object.isRequired,
    identity: PropTypes.object.isRequired,
  }

}
