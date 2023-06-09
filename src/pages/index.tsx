import React, {useState} from "react";
import {useAuth} from "../Context/authContext";
import Link from "next/link";
import {useRouter} from "next/router";
import styles from "@/styles/Home.module.css";
import {Alert} from "@/Components/Alert/Alert";
export default function Login() {
  const {login, loginWithGoogle}: any = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      router.push("/Dashboard");
    } catch (error: any) {
      console.log("error", error);
      setError(error?.message);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      router.push("/Dashboard");
    } catch (error: any) {
      console.log("error", error);
      setError(error?.message);
    }
  };

  return (
    <main className={styles.main}>
      <div className="w-full max-w-xs m-auto text-black">
        {error && <Alert message={error} />}

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setUser({...user, email: e.target.value})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="youremail@company.tld"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setUser({...user, password: e.target.value})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="*************"
            />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 text-white  w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleSignin}
          className="bg-blue-500 hover:bg-blue-700 text-white  w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Google
        </button>
        <p className="my-4 text-sm flex justify-between px-3">
          Already have an Account?
          <Link href="/Register" className="text-blue-700 hover:text-blue-900">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
