import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "@/utils/api";

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined,
    { enabled: sessionData?.user !== undefined }
  );

  const handleAuthButton = () => {
    if (sessionData) {
      signOut();
    } else {
      signIn();
    }
  };

  return (
    <div>
      {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      {secretMessage && <span> - {secretMessage}</span>}

      <button onClick={handleAuthButton}>
        {sessionData ? "sign out" : "sign in"}
      </button>
    </div>
  );
};

export default AuthShowcase;
