import { Link } from "react-router";
import { Home, AlertCircle } from "lucide-react";
import { useAuthContext } from "../hooks/useAuthContext";

const Error = () => {
  const { user } = useAuthContext();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-danger/10">
        <AlertCircle className="h-12 w-12 text-danger" />
      </div>

      <h1 className="mb-2 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
        404
      </h1>

      <h2 className="mb-4 text-2xl font-semibold text-text-primary">
        Page Not Found
      </h2>

      <p className="mb-8 max-w-md text-text-secondary">
        Sorry, the page you are looking for doesn't exist, has been moved, or
        the link is incorrect.
      </p>

      <Link
        to={user ? "/dashboard" : "/"}
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <Home className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
};

export default Error;
