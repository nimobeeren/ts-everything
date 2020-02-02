import React from 'react';
import { render, wait } from 'test-utils';
import App from '../App';

describe('<App />', () => {
  it('renders without exploding', async () => {
    // We simply render the App and pass the test if no errors are thrown
    // This component is not responsbile for rendering any content, so we don't make
    // any additional assertions
    render(<App />);

    // Wait a tick for any mocked API to finish
    // This helps to avoid "an update was not wrapped in act(...)" warnings
    await wait();
  });
});
