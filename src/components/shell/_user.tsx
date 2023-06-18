import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export function User() {
  const user = useSession();
  return (
    <div>
      {user.data ? (
        <button onClick={() => signOut()}> Sign Out</button>
      ) : (
        <button onClick={() => signIn()}>Login</button>
      )}
    </div>
  );
}
