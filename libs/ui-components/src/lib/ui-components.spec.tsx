import { render } from '@testing-library/react';

import ReactLearningMonorepoUiComponents from './ui-components';

describe('ReactLearningMonorepoUiComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactLearningMonorepoUiComponents />);
    expect(baseElement).toBeTruthy();
  });
});
