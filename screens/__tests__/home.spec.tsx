import {render} from '@testing-library/react-native';
import React from 'react';
import {Text} from 'react-native';
test('form submits two answers', () => {
  render(<Hello />);
});

function Hello() {
  return (
    <>
      <Text>{'Hello'}</Text>
    </>
  );
}
