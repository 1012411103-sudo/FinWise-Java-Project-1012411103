import React, { useState } from 'react';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

export function AuthLayout() {
  const [isSignIn, setIsSignIn] = useState(true);

  return isSignIn ? (
    <SignIn onSwitchToSignUp={() => setIsSignIn(false)} />
  ) : (
    <SignUp onSwitchToSignIn={() => setIsSignIn(true)} />
  );
}