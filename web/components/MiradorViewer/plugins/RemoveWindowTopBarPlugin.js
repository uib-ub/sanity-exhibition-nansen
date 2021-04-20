import React, { Component } from 'react';

// a plugin to remove default navigation controls
class RemoveWindowTopBarPlugin extends Component {

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default {
  component: RemoveWindowTopBarPlugin,
  target: 'WindowTopBar',
  mode: 'wrap',
};