import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';

const ConfirmEmail = () => {
    const navigate = useNavigate();
    const [data, dataSet] = useState(null)
    useEffect(() => {
        const login = async () => {
            if (data) return;

            // access query param of ?hash=
            const search = window.location.search;
            const params = new URLSearchParams(search);
            const hash = params.get('hash');

            // send request to backend to confirm email
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            // request json body
            const requestBody = {
                hash: hash
            }

            await axios.post(import.meta.env.VITE_REACT_APP_BACKEND_URL + '/api/v1/auth/email/confirm', { hash }, config).then((response) => {
                if (response.status === 204) {
                    navigate('/login');
                    toast.success('Email confirmed successfully');
                }
            }).catch((error) => {
                switch (error.response.data.status) {
                    case 'error':
                        toast.error((error.response.data.message) ? error.response.data.message : (error.response.statusText) ? error.response.statusText : 'An unexpected error occurred');
                        break;
                    default:
                }

                // if response 404 either confirmed or wrong hash
                if (error.response.status === 404) {
                    navigate('/login');
                    toast.error('Email is already confirmed or wrong hash');
                }

                dataSet(error)
            });
        };

        login();
    }, [])

    return (
        <div></div>
    );
};

export default ConfirmEmail;