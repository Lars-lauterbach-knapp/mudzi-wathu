import React, {useEffect, useState} from 'react';
import geldBackground from "./assets/geld.jpg";
import {Link} from "react-router-dom";
import {useAuth} from "./providers/AuthProvider.jsx";

function RegistrationPage() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [role] = useState('User')

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [formValid, setFormValid] = useState(false);


    const {register} = useAuth();

    useEffect(() => {
            if (password && confirmpassword) {
                if (password !== confirmpassword) {
                    setPasswordError('Passwords do not match');
                } else {
                    setPasswordError('');
                }
            } else {
                setPasswordError('');
            }
        }, [password, confirmpassword]
    );

    useEffect(() => {
        const isValid =
            firstname &&
            lastname &&
            username &&
            email &&
            password &&
            confirmpassword &&
            password === confirmpassword &&
            password.length >= 8;
        setFormValid(isValid);
    }, [firstname, lastname, username, email, password, confirmpassword]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('')
        setLoading(true);

        if (password !== confirmpassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            setLoading(false);
            return;
        }

        try {
            const userData = {
                firstname,
                lastname,
                username,
                email,
                password,
                role
            };

            const result = await register(userData);

            if (result.success) {
                setSuccess('Account created successfully! Proceed to login...');
                setError('');

                // Clear form
                setFirstname('');
                setLastname('');
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');

            } else {
                setError(result.message);
                setSuccess('');
            }
        } catch (error) {
            setError(error.message || 'An unexpected error occurred. Please try again.');
            setSuccess('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-cover bg-center bg-no-repeat"
                 style={{ backgroundImage: `url(${geldBackground})` }}>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#"
                   className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    Mudzi Wathu
                </a>
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        {success && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                <span className="block sm:inline">{success}</span>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}

                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div className="flex flex-row gap-4">
                                <div className="flex-1">
                                    <label htmlFor="firstname"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                        Firstname</label>
                                    <input type="text"
                                           name="firstname"
                                           id="firstname"
                                           value={firstname}
                                           onChange={(e) => setFirstname(e.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="firstname" required=""/>
                                </div>
                                <div>
                                    <label htmlFor="lastname"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lastname
                                    </label>
                                    <input type="text"
                                           name="lastname"
                                           id="lastname"
                                           value={lastname}
                                           onChange={(e) => setLastname(e.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="Lastname" required=""/>
                                </div>
                            </div>
                            <div className="flex flex-row gap-4">
                                <div className="flex-1">
                                    <label htmlFor="username"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                    <input type="text"
                                           name="username"
                                           id="username"
                                           value={username}
                                           onChange={(e) => setUsername(e.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="username" required=""/>
                                </div>
                                <div>
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                        Firstname</label>
                                    <input type="email"
                                           name="email"
                                           id="email"
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="email" required=""/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password"
                                       name="password"
                                       id="password"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="password"
                                       required=""/>
                                {password && password.length < 8 && (
                                    <p className="text-red-500 text-xs mt-1">Password must be at least 8 characters</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="confirmpassword"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                <input type="password"
                                       name="confirmpassword"
                                       id="confirmpassword"
                                       value={confirmpassword}
                                       onChange={(e) => setConfirmPassword(e.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="password" required=""/>
                                {passwordError && (
                                    <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                                )}
                                {!passwordError && confirmpassword && password === confirmpassword && (
                                    <p className="text-green-500 text-xs mt-1">Passwords match!</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={!formValid || loading}
                                className="w-full text-white bg-blue-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                {loading ? 'Creating account...' : 'Create Account'}
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account yet? <Link to="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login
                             </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RegistrationPage;