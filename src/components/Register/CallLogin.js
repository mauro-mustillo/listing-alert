import { Component } from 'react';

class CallLogin extends Component {
  componentDidMount() {
    this.props.login();
  }

  render() {
    return this.props.children || null;
  }
}

export default CallLogin;
