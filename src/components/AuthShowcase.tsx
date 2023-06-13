import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthShowcase: React.FC = () => {
  const { data: session } = useSession();

  const handleAuthButton = () => {
    if (session) {
      signOut();
    } else {
      signIn();
    }
  };

  return (
    <div>
      <button onClick={handleAuthButton}>
        {session ? "sign out" : "sign in"}
      </button>
    </div>
  );
};

export default AuthShowcase;
