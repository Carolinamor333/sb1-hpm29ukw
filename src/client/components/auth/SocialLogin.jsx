import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { AUTH_PROVIDERS } from '../../config/constants';
import AuthProviderButton from './AuthProviderButton';

export default function SocialLogin({ onGoogleSuccess, onAppleClick, error }) {
  const handleGoogleError = (error) => {
    console.error('Google Login Failed:', error);
  };

  return (
    <div className="space-y-4">
      <div className="w-full">
        {import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
          <GoogleLogin
            onSuccess={onGoogleSuccess}
            onError={handleGoogleError}
            useOneTap={false}
            shape="rectangular"
            width="100%"
            text="continue_with"
            context="signin"
          />
        ) : (
          <div className="text-sm text-red-600 text-center">
            Google login is not configured
          </div>
        )}
      </div>

      <AuthProviderButton 
        provider={AUTH_PROVIDERS.APPLE}
        onClick={onAppleClick}
      >
        Continue with Apple
      </AuthProviderButton>

      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}
    </div>
  );
}