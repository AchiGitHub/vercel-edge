import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MatchTime from '../match-time';

describe('<MatchTime />', () => {
    it('should render match time and timezone', () => {
        render(<MatchTime timeZone='Australia/Adelaide' utcMatchStart='2021-03-19T08:50:00.000Z' />);
        expect(screen.getByText(/7:20 PM/i)).toBeInTheDocument();
        expect(screen.getByText('(ACDT)')).toBeInTheDocument();
    });
});