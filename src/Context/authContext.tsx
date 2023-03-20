import {auth} from "@/Firebase/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "@firebase/auth";
import {createContext, useContext, useEffect, useState} from "react";

const authContext = createContext({});

export const useAuth = () => {
  const context = useContext(authContext);

  return context;
};

export function AuthProvider({children}: any) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email: string, password: string) => {
    try {
      const result = createUserWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      return error;
    }
  };
  const login = (email: string, password: string) => {
    try {
      const result = signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      return error;
    }
  };

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, (currentUser: any) => {
      console.log({currentUser});
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubuscribe();
  }, []);

  return (
    <authContext.Provider
      value={{user, signup, login, loading, logout, loginWithGoogle}}
    >
      {children}
    </authContext.Provider>
  );
}
