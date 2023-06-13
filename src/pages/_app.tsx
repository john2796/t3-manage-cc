import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Session } from "next-auth";
import { api } from "@/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    // configure shared session state
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
