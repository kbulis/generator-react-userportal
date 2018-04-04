import { Segment, Container, Responsive, Grid, Table, Card, Rail, List, Menu, Form, Dropdown, Icon, Image, Label, Header, Button, Loader, Message, Divider, Comment, Modal } from 'semantic-ui-react';
import { React, PropTypes } from './Framework';

Form.Block = class extends React.PureComponent {

  render() {
    return (
      <Segment {...this.props} style={{ margin: 'inherit', boxShadow: 'inherit' }}>
        {this.props.children}
      </Segment>
    );
  
  }

};

Form.Value = class extends React.PureComponent {

  render() {
    return (
      null
    );
  }

};

Form.Value.propTypes = {
  value: PropTypes.string,
}

Form.Picks = class extends React.PureComponent {

  state = {
    selected: '',
  };

  render() {
    return (
      <Button.Group {...this.props}>
        {React.Children.map(this.props.children, child => (
          <Button onClick={(e) => {
            if (this.state.selected !== child.props.value) {
              this.props.onChange && this.props.onChange({ ...e, target: { value: child.props.value }});

              this.setState({
                selected: child.props.value,
              });
            }
            else {
              this.props.onChange && this.props.onChange({ ...e, target: { value: '' }});

              this.setState({
                selected: '',
              });
            }

            e.preventDefault();
          }}>
            {this.state.selected === child.props.value &&
              <Icon color="orange" name="check" />
            }
            {child.props.children}
          </Button>
        ))}
      </Button.Group>
    );
  }

};

Form.Picks.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
};

Form.Drops = class extends React.PureComponent {

  render() {
    return (
      <Dropdown {...{...this.props, children: null}} onChange={(e, { value }) => this.props.onChange && this.props.onChange({ ...e, target: { value: value }})} options={React.Children.map(this.props.children, item => ({
        value: item.value || item.props.children,
        text: item.props.children || item.value,
        key: item.value || item.props.children,
      }))}>
      </Dropdown>
    );
  }

};

Form.Drops.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
};

Form.File = class extends React.PureComponent {

  state = {
    selected: false,
  };

  render() {
    return (
      <span>
        <Icon name="file text" size="big" color="orange" title={this.props.title} onClick={() => {
          this.setState({
            selected: !this.state.selected,
          });
        }} />
        {this.state.selected && this.props.onRemove &&
          <Icon name="x" size="big" color="red" onClick={this.props.onRemove} />
        }
      </span>
    );
  }

};

Form.File.propTypes = {
  onRemove: PropTypes.func,
  title: PropTypes.string,
};

Form.Files = class extends React.PureComponent {

  render() {
    return (
      <Form.Block>
        <input id="upload" type="file" style={{ display: 'none' }} onChange={e => {
          const reader = new window.FileReader();
          const file = e.target.files[0];

          if (file) {
            reader.onload = (loaded) => {
              this.props.onLoaded && this.props.onLoaded({
                content: new Buffer(loaded.target.result).toString('base64'),
                name: file.name,
              });
            };

            reader.readAsArrayBuffer(file);

            e.target.value = '';
          }
        }} />
        {(this.props.files || []).map((file, i) => (
          <Form.File key={i + '-' + file.name} title={file.name} onRemove={() => {
            this.props.onRemove && this.props.onRemove(i);
          }} />
        ))}
        <label htmlFor="upload">
          <Icon name="plus" color="grey" size="big" />
          {!this.props.files && this.props.hint &&
            <span>{this.props.hint}</span>
          }
        </label>
      </Form.Block>
    );
  }

};

Form.Files.propTypes = {
  onLoaded: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  files: PropTypes.array,
  hint: PropTypes.string,
};

Form.Click = class extends React.PureComponent {

  state = {
    isActive: false,
  }

  render() {
    const { isActive } = this.state;
    const { doChange } = this.props;

    return React.Children.map(this.props.children, (child, i) => {
      if (child && child.type) {
        if ((child.props.active === 'yes' && isActive === true) || (child.props.active !== 'yes' && isActive !== true)) {
          return <child.type {...child.props} onClick={() => {
            if (doChange) {
              doChange(child.props.name, !isActive);
            }

            this.setState({
              isActive: !isActive,
            })
          }}>
            {child.props.children}
          </child.type>;
        }
        else {
          return null;
        }
      }

      return child;
    });
  }

}

Form.Click.displayName = 'Form.Click';

Form.Click.propTypes = {
  doChange: PropTypes.func,
};

Form.Managed = class extends React.PureComponent {

  state = {
    formData: {
    },
  };

  componentDidMount() {
    if (typeof(this.props.onMount) === 'function') {
      this.props.onMount(() => {
        if (this.props.formBusy === false) {
          this.props.onSubmit(this.state.formData);
        }
      });
    }
  }

  render() {
    return (
      <Form refs="form" onSubmit={this.doSubmit}>
        {this.wiringUp(this.props.children)}
      </Form>
    );
  }

  wiringUp = (children) => {
    return React.Children.map(children, (child, i) => {
      if (child && child.type) {
        const parameters = {};

        if (child.type === Form.Input) {
          if (child.props.submit === 'yes') {
            parameters.onChange = this.onChange(child.props.name);
            parameters.onKeyPress = (e) => {
              if (e.charCode === 13) {
                e.stopPropagation();
                this.doSubmit();
              }
            };
          }
          else {
            parameters.onChange = this.onChange(child.props.name);
          }
        }

        if (child.type === Form.Click) {
          parameters.doChange = this.doChange;
        }

        return <child.type {...child.props} {...parameters}>
          {this.wiringUp(child.props.children)}
        </child.type>;    
      }

      return child;
    });
  };

  onChange = (param, value) => (e) => {
    if (param) {
      this.setState({
        formData: {
          ...this.state.formData,
          [param]: value == null ? e.target.value : value,
        },
      });
    }
  };

  doChange = (param, value) => {
    if (param) {
      this.setState({
        formData: {
          ...this.state.formData,
          [param]: value,
        },
      });
    }
  };

  doSubmit = () => {
    if (this.props.formBusy === false) {
      this.props.onSubmit(this.state.formData);
    }
  }

}

Form.Managed.displayName = 'Form.Managed';

Form.Managed.defaultProps = {
  formBusy: false,
};

Icon.Link = class extends React.PureComponent {

  render() {
    return (
      <a href="" onClick={(e) => e.preventDefault() }>
        <Icon {...this.props} />
      </a>
    );
  }

};

class Ricochet extends React.PureComponent {

  state = {
    receivers: [],
  };

  wiringUp = (children) => {
    return React.Children.map(children, (child) => {
      if (child && child.type) {
        const injected = {
        };

        if (child.props.receiver) {
          injected['onMount'] = (receiver) => {
            if (receiver) {
              this.setState({
                receivers: [
                  ...this.state.receivers,
                  receiver,
                ]
              });
            }
          };
        }
        else
        if (child.props.emitting) {
          injected['onClick'] = (e) => {
            this.state.receivers.forEach((receiver) => receiver(e));
          };
        }

        return <child.type {...child.props} {...injected}>
          {this.wiringUp(child.props.children)}
        </child.type>;
      }

      return child;
    });
  };

  render() {
    return this.wiringUp(this.props.children);
  }

}

class Wrapper extends React.Component {
  
  render() {
    return this.props.children;
  }

}

export {
  Segment,
  Container,
  Responsive,
  Ricochet,
  Grid,
  Table,
  Card,
  Rail,
  List,
  Menu,
  Form,
  Icon,
  Image,
  Label,
  Header,
  Button,
  Loader,
  Message,
  Divider,
  Comment,
  Modal,
  Wrapper,
}
