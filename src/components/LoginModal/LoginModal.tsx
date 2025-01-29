import React, { useState } from 'react';
import {
    Button,
    IconButton,
    TextField,
    Typography,
    Dialog,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { login, signUp } from '../../services/authService';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const [isSignUp, setIsSignUp] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const resetError = () => setError(null);

    const handleClose = () => {
        resetError();
        onClose();
    };

    const handleLogin = async () => {
        try {
            resetError();
            const data = await login(email, password);
            setAccessToken(data.token);
            onClose();
        } catch (err: any) {
            setError('Failed to login. Please check your credentials.');
        }
    };

    const handleSignUp = async () => {
        try {
            resetError();
            await signUp(name, email, password);
            setIsSignUp(false);
            onClose();
        } catch (err: any) {
            setError('Failed to register. Please try again.');
        }
    };

    const handleLogout = () => {
        setAccessToken(null);
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    const isLoggedIn = Boolean(accessToken);

    return (
        <Dialog open={isOpen} onClose={onClose} data-testid="login-modal">
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">
                    {isSignUp ? 'Sign Up' : isLoggedIn ? 'Welcome!' : 'Login'}
                </Typography>
                <IconButton size="small" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                {error && (
                    <Typography color="error" paddingBottom="1rem" data-testid="login-error">
                        {error}
                    </Typography>
                )}

                {isLoggedIn ? (
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={handleLogout}
                        data-testid="logout-button"
                    >
                        Log Out
                    </Button>
                ) : isSignUp ? (
                    <>
                        <TextField
                            label="Name"
                            fullWidth
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                resetError();
                            }}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Email"
                            fullWidth
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                resetError();
                            }}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                resetError();
                            }}
                            sx={{ mb: 2 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleSignUp}
                            data-testid="signup-button"
                        >
                            Sign Up
                        </Button>
                        <Typography variant="body2" align="center" mt={2}>
                            Already have an account?{' '}
                            <Button onClick={() => setIsSignUp(false)}>Login</Button>
                        </Typography>
                    </>
                ) : (
                    <>
                        <TextField
                            label="Email"
                            fullWidth
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                resetError();
                            }}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                resetError();
                            }}
                            sx={{ mb: 2 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleLogin}
                            data-testid="login-button"
                        >
                            Login
                        </Button>
                        <Typography variant="body2" align="center" mt={2}>
                            New user?{' '}
                            <Button onClick={() => setIsSignUp(true)}>Sign Up</Button>
                        </Typography>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;
