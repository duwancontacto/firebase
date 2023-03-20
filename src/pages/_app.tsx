import {ProtectedRoute} from "@/Components/ProtectedRoutes/ProtectedRoutes";
import {AuthProvider} from "@/Context/authContext";
import "@/styles/globals.css";
import type {AppProps} from "next/app";

export default function App({Component, pageProps}: AppProps) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <Component {...pageProps} />{" "}
      </ProtectedRoute>
    </AuthProvider>
  );
}
