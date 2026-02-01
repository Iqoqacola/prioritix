import { Link } from "react-router";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import Logo from "../components/ui/Logo";
import { useEffect, useState } from "react";
import { useSignup } from "../hooks/useSignUp";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(fullName, email, password, confirmPassword);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <Logo />
        <h2 className="text-center text-3xl font-extrabold text-text-primary">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-surface py-8 px-6 shadow-xl border border-border rounded-2xl sm:px-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-text-secondary mb-1"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                  <User size={18} />
                </div>
                <input
                  id="name"
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm"
                  placeholder="John Doe"
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-secondary mb-1"
              >
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm"
                  placeholder="name@example.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-secondary mb-1"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                  <Lock size={18} />
                </div>
                <input
                  minLength={8}
                  id="password"
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm"
                  placeholder="At least 8 characters"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-text-secondary mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                  <Lock size={18} />
                </div>
                <input
                  minLength={8}
                  id="confirmPassword"
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm"
                  placeholder="Re-type your password"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-primary hover:bg-secondary transition-all transform hover:-translate-y-0.5"
              disabled={isLoading}
            >
              Create Account
              <ArrowRight size={18} />
            </button>
          </form>
          {error && (
            <div
              className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative my-2"
              role="alert"
            >
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-surface text-muted">
                  Or sign up with
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {/* Google */}
              <button
                type="button"
                className="w-full inline-flex justify-center items-center gap-2 py-3 px-4 border border-border rounded-xl bg-surface text-sm font-medium text-text-secondary hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Google</span>
              </button>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-text-secondary">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-primary hover:text-secondary transition-colors"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
