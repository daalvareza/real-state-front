import React, { useState } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { login, signUp } from "../../services/favoriteService";
import { FloatingLogin, StyledBackdrop } from "./LoginModal.styled";
import { useDispatch } from "react-redux";
import { setUserId, setUserName } from "../../store/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const userName = useSelector((state: RootState) => state.auth.userName);
    const resetError = () => setError(null);

    const handleLogin = async () => {
        try {
            resetError();
            const data = await login(email, password);
            localStorage.setItem("token", data.token);
            dispatch(setUserId(data.user.id));
            dispatch(setUserName(data.user.name))
            onClose();
        } catch (err: any) {
            setError("Failed to login. Please check your credentials.");
        }
    };

    const handleSignUp = async () => {
        try {
            resetError();
            const data = await signUp(name, password, email);
            localStorage.setItem("token", data.token);
            setIsSignUp(false);
        } catch (err: any) {
            setError("Failed to register. Please try again.");
        }
    };

    const handleLogOut = () => {
        localStorage.removeItem("token");
        dispatch(setUserId(null));
        dispatch(setUserName(null));
        navigate('/');
    };

    if (!isOpen) return null;

    return (
        <StyledBackdrop 
            open={isOpen}
            onClick={(e) => {
                e.stopPropagation();
                onClose()
            }}
            data-testid="login-modal"
        >
            <FloatingLogin onClick={(e) => e.stopPropagation()}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">
                        {isSignUp ? "Sign Up" : userName ? `Welcome, ${userName}` : "Login"}
                    </Typography>
                    <IconButton size="small" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                {error && (<Typography color="error" paddingBottom="1rem">{error}</Typography>)}
                {userName ? (
                    <Button variant="contained" color="secondary" fullWidth onClick={handleLogOut}>
                        Log Out
                    </Button>
                ) : (
                    (isSignUp ? (
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
                        <Button variant="contained" color="secondary" fullWidth onClick={handleSignUp}>
                            Sign Up
                        </Button>
                        <Typography variant="body2" align="center" mt={2}>
                            Already have an account?{" "}
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
                        <Button variant="contained" color="secondary" fullWidth onClick={handleLogin}>
                            Login
                        </Button>
                        <Typography variant="body2" align="center" mt={2}>
                            New user?{" "}
                            <Button onClick={() => setIsSignUp(true)}>Sign Up</Button>
                        </Typography>
                    </>
                    ))
                )}
            </FloatingLogin>
        </StyledBackdrop>
    );
};

export default LoginModal;
