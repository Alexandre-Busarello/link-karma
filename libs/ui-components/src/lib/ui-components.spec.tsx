import { render } from '@testing-library/react';

import LinkkarmaUiComponents from './ui-components';

describe('LinkkarmaUiComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LinkkarmaUiComponents />);
    expect(baseElement).toBeTruthy();
  });
});
