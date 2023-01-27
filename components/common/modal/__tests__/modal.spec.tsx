import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Modal from '../modal';

describe('<Modal />', () => {
    it('should render modal', () => {
        const fn = jest.fn();
        render(<Modal open={true} handleClose={fn}><h1>Modal Rendered</h1></Modal>);
        expect(screen.getByText(/Modal Rendered/i)).toBeInTheDocument();
    });
})