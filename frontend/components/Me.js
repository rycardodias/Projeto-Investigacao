import React from 'react';
import PropTypes from 'prop-types';
import { getUserByToken } from '../lib/requests';

class Me extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  fetch = async () => {
    const user = await getUserByToken();
    this.setState({ ...user });
    console.log(this.state)
  };

  async componentDidMount() {
    const user = await getUserByToken();
    this.setState({ ...user });
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return this.props.children(items, isLoaded, this.fetch);
  }
}

Me.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Me;