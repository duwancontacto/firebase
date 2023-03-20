import {useAuth} from "@/Context/authContext";
import {useRouter} from "next/router";
import {useEffect} from "react";

export function ProtectedRoute({children}: any) {
  const publicRoutes = ["/Register", "/"];

  const {user}: any = useAuth();
  const router = useRouter();
  const {pathname} = useRouter();

  useEffect(() => {
    if (!user && !publicRoutes.find((path) => path === pathname))
      router.push("/");

    //eslint-disable-next-line
  }, [user]);

  return <>{children}</>;
}
