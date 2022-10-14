// hooks
import { useState } from 'react';
import { dispatch } from 'react-redux';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();

        if(!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }

        if(response.ok) {
            // Save the user to cookie

            // Update the user state

            setIsLoading(false);
        }
    }

    return { signup, error, isLoading };
};