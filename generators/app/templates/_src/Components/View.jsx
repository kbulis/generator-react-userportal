import { React, Link, PropTypes } from '../Framework';
import { Wrapper } from '../Ui';

export class View extends React.Component {

  render() {
    const { params } = this.props.match;

    return (
      <Wrapper>
        This is a view of {params.id}
        <br />
        <br />
        <Link to="/managed/dashboard">
          dashboard
        </Link>
      </Wrapper>
    );
  }
    
  static propTypes = {
    services: PropTypes.object.isRequired,
    identity: PropTypes.object.isRequired,
  }

}
