import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../button';

describe('<Button />', () => {
    it("should render button", () => {

        const mockFn = jest.fn();

        render(
            <Button text="Confirm"
                width="200px"
                height="50px"
                variant="contained"
                fontWeight="600"
                disabled={false}
                loading={false}
                style={{ marginLeft: '10px' }}
                onClick={mockFn}
            />
        );
        expect(screen.getByText(/confirm/i)).toBeInTheDocument();
    })
    it("should handle on button click", () => {
        const mockFn = jest.fn();
        render(
            <Button text="Confirm"
                width="200px"
                height="50px"
                variant="contained"
                fontWeight="600"
                disabled={false}
                loading={false}
                style={{ marginLeft: '10px' }}
                onClick={mockFn}
            />
        );
        expect(screen.getByText(/confirm/i)).toBeInTheDocument();
        fireEvent.click(screen.getByText(/confirm/i));
        expect(mockFn).toHaveBeenCalledTimes(1);
    })
    it("should not handle on button click when disabled", () => {
        const mockFn = jest.fn();
        render(
            <Button text="Confirm"
                width="200px"
                height="50px"
                variant="contained"
                fontWeight="600"
                disabled={true}
                loading={false}
                style={{ marginLeft: '10px' }}
                onClick={mockFn}
            />
        );
        expect(screen.getByText(/confirm/i)).toBeInTheDocument();
        fireEvent.click(screen.getByText(/confirm/i));
        expect(mockFn).toHaveBeenCalledTimes(0);
    })
    it("should display spinner when loading", () => {
        const mockFn = jest.fn();
        render(
            <Button text="Confirm"
                width="200px"
                height="50px"
                variant="contained"
                fontWeight="600"
                disabled={false}
                loading={true}
                style={{ marginLeft: '10px' }}
                onClick={mockFn}
            />
        );
        expect(screen.getByLabelText(/spinner/i)).toBeInTheDocument();
    })
    it("should display spinner when loading", () => {
        const mockFn = jest.fn();
        render(
            <Button text="Confirm"
                width="200px"
                height="50px"
                variant="contained"
                fontWeight="600"
                disabled={false}
                loading={true}
                style={{ marginLeft: '10px' }}
                onClick={mockFn}
            />
        );
        expect(screen.getByLabelText(/spinner/i)).toBeInTheDocument();
    })
})