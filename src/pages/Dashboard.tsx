import React, {useEffect, useState} from "react";

import styles from "@/styles/Home.module.css";
import {useAuth} from "@/Context/authContext";
import {collection, getDocs} from "@firebase/firestore";
import {db} from "@/Firebase/firebase";
import {useRouter} from "next/router";
export default function Dashboard() {
  const {logout, user}: any = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState([]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const handleUpload = () => {
    router.push("/Admin");
  };

  const getData = async () => {
    try {
      const datos = await getDocs(collection(db, "productos"));

      const documents: any = [];

      datos.forEach((documento) => {
        documents.push(documento.data());
      });
      setProducts(documents);
    } catch (error) {
      console.log("Erroir", error);
    }
  };

  useEffect(() => {
    getData();
  }, [user]);

  const Product = ({product}: any) => {
    return (
      <div className=" cursor-pointer bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4 min-h-[150px] w-[250px] m-4">
        <h3 className="font-bold">{product.title}</h3>
        <p> {product.description} </p>
        <span>Price: {product.price}$ </span>
      </div>
    );
  };

  return (
    <main className={styles.main}>
      <h1 className="text-3xl font-bold underline">Dashboard</h1>
      <div className="mt-5 flex">
        {products.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </div>
      <div className="flex  absolute bottom-5 m-5">
        <button
          onClick={handleLogout}
          className="m-2 bg-blue-500  w-96 hover:bg-blue-700 text-white  w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
        <button
          onClick={handleUpload}
          className="m-2 bg-blue-500 w-96 hover:bg-blue-700 text-white  w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Upload data
        </button>
      </div>
    </main>
  );
}
