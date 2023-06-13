import AuthShowcase from "@/components/AuthShowcase";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <div>
        <h1>Private Dashboard</h1>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    );
  }
  return (
    <div>
      <h2>this is the main page</h2>
      <AuthShowcase />
    </div>
  );
};

export default Home;
