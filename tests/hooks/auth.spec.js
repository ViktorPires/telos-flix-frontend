import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../../src/hooks/auth';
import { AuthenticateContext } from '../../src/contexts/AuthenticateContext';

const mockApiPost = jest.fn();
jest.mock('../../src/server/api', () => ({
    post: mockApiPost,
}));

const mockAuthenticateContextValue = {
    savedUser: {
        id: 1,
        name: 'Test User',
        token: 'test-token',
    },
};

describe('useAuth Hook', () => {
    it('should provide signIn and addMovies functions', () => {
        const { result } = renderHook(() => useAuth(), {
            wrapper: ({ children }) => (
                <AuthenticateContext.Provider value={mockAuthenticateContextValue}>
                    <AuthProvider>{children}</AuthProvider>
                </AuthenticateContext.Provider>
            ),
        });

        expect(typeof result.current.signIn).toBe('function');
        expect(typeof result.current.addMovies).toBe('function');
        expect(result.current.user).toEqual({
            id: 1,
            name: 'Test User',
        });
    });

    it('should call api.post when signIn is called', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
            wrapper: ({ children }) => (
                <AuthenticateContext.Provider value={mockAuthenticateContextValue}>
                    <AuthProvider>{children}</AuthProvider>
                </AuthenticateContext.Provider>
            ),
        });

        act(() => {
            result.current.signIn({ email: 'test@example.com', password: 'password' });
        });

        await waitForNextUpdate();

        expect(mockApiPost).toHaveBeenCalledWith('authenticate', {
            email: 'test@example.com',
            password: 'password',
        });
    });

    it('should update user data after successful signIn', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
            wrapper: ({ children }) => (
                <AuthenticateContext.Provider value={mockAuthenticateContextValue}>
                    <AuthProvider>{children}</AuthProvider>
                </AuthenticateContext.Provider>
            ),
        });

        act(() => {
            result.current.signIn({ email: 'test@example.com', password: 'password' });
        });

        await waitForNextUpdate();

        expect(result.current.user).toEqual({
            id: 1,
            name: 'Test User',
        });
    });

    it('should call api.post when addMovies is called', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
            wrapper: ({ children }) => (
                <AuthenticateContext.Provider value={mockAuthenticateContextValue}>
                    <AuthProvider>{children}</AuthProvider>
                </AuthenticateContext.Provider>
            ),
        });

        act(() => {
            result.current.addMovies({ movie: { title: 'Test Movie' } });
        });

        await waitForNextUpdate();

        expect(mockApiPost).toHaveBeenCalledWith('movies', { title: 'Test Movie' });
    });
});
