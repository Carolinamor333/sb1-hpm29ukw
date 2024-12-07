import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../stores/authStore';
import { CubeIcon } from '@heroicons/react/24/outline';
import SocialLogin from '../components/auth/SocialLogin';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { login, register: registerUser } = useAuth();
  const { register: registerForm, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      if (isSignUp) {
        await registerUser(data);
      } else {
        await login(data);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      await login({ 
        provider: 'google',
        email: decoded.email,
        firstName: decoded.given_name,
        lastName: decoded.family_name,
        token: credentialResponse.credential
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Google authentication failed');
      console.error('Google auth error:', err);
    }
  };

  const handleAppleClick = () => {
    setError('Apple Sign In coming soon');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <CubeIcon className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to ChainBuddy
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Your Supply Chain Intelligence Partner
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SocialLogin
            onGoogleSuccess={handleGoogleSuccess}
            onAppleClick={handleAppleClick}
            error={error}
          />

          {/* Rest of the form remains the same */}
        </div>
      </div>
    </div>
  );
}