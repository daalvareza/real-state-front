interface LoginResponse {
    token: string;
}

const BASE_URL = 'http://localhost:5025/api';

export async function login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }
    return response.json();
}

export async function signUp(name: string, email: string, password: string): Promise<any> {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Sign up failed');
    }
    return response.json();
}
  