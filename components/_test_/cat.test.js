import React from 'react';
import ReactDOM from 'react-dom';
import Cat from '../cat';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Cat />, div);
});
