import '@testing-library/jest-dom';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import Toast from '../toast';

describe('<Toast />', () => {

    it("should render Toast", () => {
        render(
            <Toast color='danger' display={true}>
                <h1>Error</h1>
            </Toast>
        );
        expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
    it("should not display toast", async () => {
        render(
            <Toast color='danger' display={true}>
                <h1>Error</h1>
            </Toast>
        );

        await waitForElementToBeRemoved(screen.queryByText(/error/i), { timeout: 4000 })
    });
})