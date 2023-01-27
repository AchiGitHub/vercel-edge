import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CheckBox from '../checkbox';

describe('<Checkbox/>', () => {
  it('should render checkbox', () => {
    const mockFn = jest.fn();
    render(
      <CheckBox
        label="Change the Interchange Count"
        onChecked={mockFn}
        checkBoxValue={true}
      />
    );
    expect(
      screen.getByText(/change the Interchange Count/i)
    ).toBeInTheDocument();
  });
  it('should be able to change the checkbox', () => {
    const mockFn = jest.fn();
    render(
      <CheckBox
        label="Change the Interchange Count"
        onChecked={mockFn}
        checkBoxValue={true}
      />
    );
    expect(
      screen.getByText(/Change the Interchange Count/i)
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Change the Interchange Count/i));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
