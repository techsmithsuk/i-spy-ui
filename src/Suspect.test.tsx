import React from 'react';
import ReactDOM from 'react-dom';
import Suspect from './components/Suspect'

test('renders suspect', () => {
    const container = document.createElement('Container');
    ReactDOM.render(<Suspect />, container);
  });
