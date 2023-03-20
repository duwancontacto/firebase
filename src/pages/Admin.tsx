import React, {useEffect, useState} from "react";

import styles from "@/styles/Home.module.css";
import {useAuth} from "@/Context/authContext";
import {collection, getDocs} from "@firebase/firestore";
import {db} from "@/Firebase/firebase";
import {useRouter} from "next/router";
import ModalProduct from "@/Components/ModalProduct/ModalProduct";
export default function Admin() {
  const {logout, user}: any = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [product, setProduct] = useState(null);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      console.error(error.message);
    }
  };
  const handleUpload = () => {
    router.push("/Dashboard");
  };

  const getData = async () => {
    try {
      const datos = await getDocs(collection(db, "productos"));

      const documents: any = [];

      datos.forEach((documento) => {
        documents.push({...documento.data(), id: documento.id});
      });
      setProducts(documents);
    } catch (error) {
      console.log("Erroir", error);
    }
  };

  useEffect(() => {
    getData();
  }, [user, showModal]);

  const handleProduct = (product: any) => {
    setShowModal(true);
    setProduct(product);
  };

  const Product = ({product}: any) => {
    return (
      <div
        onClick={() => handleProduct(product)}
        className=" cursor-pointer bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4 min-h-[150px] w-[250px] m-4"
      >
        <h3 className="font-bold">{product.title}</h3>
        <p> {product.description} </p>
        <span>Price: {product.price}$ </span>
      </div>
    );
  };
  const NewProduct = () => {
    return (
      <div
        onClick={() => handleProduct(null)}
        className=" cursor-pointer bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4 min-h-[150px] w-[250px] m-4 flex align-middle justify-center"
      >
        <p> Add product + </p>
      </div>
    );
  };

  return (
    <main className={styles.main}>
      <h1 className="text-3xl font-bold underline">Admin</h1>
      <ModalProduct
        showModal={showModal}
        setShowModal={setShowModal}
        product={product}
      />
      <div className="mt-5 flex">
        {products.reverse().map((product, index) => (
          <Product key={index} product={product} />
        ))}
        <NewProduct />
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
          View data
        </button>
      </div>
    </main>
  );
}
