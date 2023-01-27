import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ConnectionStatus from '../connection-status';

describe('<ConnectionStatus />', () => {
    it("should render the disconnected status when offline", () => {
        render(<ConnectionStatus status={false} />);
        expect(screen.getByText(/Disconnected/i)).toBeInTheDocument();
    });
    it("should render the connected status when online", () => {
        render(<ConnectionStatus status={true} />);
        expect(screen.getByText(/Connected/i)).toBeInTheDocument();
    });
})