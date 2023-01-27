import '@testing-library/jest-dom';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import InterchangeButton from '../interchange-button';
import { fireEvent, render, screen } from '@testing-library/react';

describe('<InterchangeButton /`>', () => { 
    it('should render button', () => {
        const mockOnClick = jest.fn();
        render(<InterchangeButton icon={RemoveCircleOutlineIcon} onClick={mockOnClick} />);
        expect(screen.getByLabelText(/button-icon/i)).toBeInTheDocument();
    });
    it('should handle on button click', () => {
        const mockOnClick = jest.fn();
        render(<InterchangeButton icon={RemoveCircleOutlineIcon} onClick={mockOnClick} />);
        fireEvent.click(screen.getByLabelText(/button-icon/i));
        expect(mockOnClick).toHaveBeenCalled();
    });
})