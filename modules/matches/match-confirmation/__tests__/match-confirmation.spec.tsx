import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MatchVerification from '../match-confirmation';
import { MockTeamData } from 'utils/constants';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    __esModule: true,
    useRouter: jest.fn()
}));

describe('<MatchConfirmation />', () => {
    it("should render match details", () => {
        const handleClose = jest.fn();
        const handleConfirm = jest.fn();
        render(<MatchVerification selectedTeam={{ teamId: 233066081, side: 'away', match: MockTeamData, round: 'Round 4' }} handleClose={handleClose} handleConfirm={handleConfirm} />);
        expect(screen.getByText(/round 4 - Port Adelaide vs. richmond/i)).toBeInTheDocument();
        expect(screen.getByText(/richmond selected. Please click OK to continue./i)).toBeInTheDocument();
    });

    it("should render error message when team is not selected", () => {
        const handleClose = jest.fn();
        const handleConfirm = jest.fn();
        render(<MatchVerification selectedTeam={{ teamId: 1234, side: 'away', match: null, round: '' }} handleClose={handleClose} handleConfirm={handleConfirm} />);
        expect(screen.getByText(/Please select a team to proceed!/i)).toBeInTheDocument();
    });

    it("should call onOk method on confirm", () => {

        // Mock the requied routing functions
        const mockUseRouter = {
            push: jest.fn()
        };

        (useRouter as jest.Mock).mockReturnValue(mockUseRouter);

        const handleClose = jest.fn();
        const handleConfirm = jest.fn();
        render(<MatchVerification selectedTeam={{ teamId: 233066081, side: 'away', match: MockTeamData, round: 'Round 4' }} handleClose={handleClose} handleConfirm={handleConfirm} />);
        expect(screen.getByText(/round 4 - Port Adelaide vs. richmond/i)).toBeInTheDocument();
        fireEvent.click(screen.getByText('Ok'));

        expect(mockUseRouter.push).toHaveBeenCalledTimes(1);
    });
})