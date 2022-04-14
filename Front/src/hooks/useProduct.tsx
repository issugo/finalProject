import { useState } from "react";
import { endpoint, Product } from "../App";

const useProduct = (product: Product) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  
  const addProduct = () => {
    return new Promise((resolve) => {
      setLoading(true);
      fetch(`${endpoint}/cart/${product.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ quantity }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            setMessage("Trop de quantité");
          } else {
            setMessage("Enregistré dans le panier");
          }
          setLoading(false);
          resolve(true);
        });
    });
  };

  //remove product
  const removeProduct = () => {
    return new Promise((resolve) => {
      setLoading(true);
      fetch(`${endpoint}/cart/${product.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify({ quantity }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            setMessage("Erreur lors de la suppression du produit");
          } else {
            setMessage("Produit supprimé du panier");
          }
          setLoading(false);
          resolve(true);
        });
    });
  };

  //modify product
  const modifyProduct = () => {
    return new Promise((resolve) => {
      setLoading(true);
      fetch(`${endpoint}/cart/${product.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ quantity }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            setMessage("Trop de quantité");
          } else {
            setMessage("Produit modifié dans le panier");
          }
          setLoading(false);
          resolve(true);
        });
    });
  };  

  //load product
  const loadProduct = () => {
    return new Promise((resolve) => {
      setLoading(true);
      fetch(`${endpoint}/cart/${product.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
        })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            setMessage("Trop de quantité");
          } else {
            setMessage(res.quantity);
          }
          setLoading(false);
          resolve(true);
        });
    });
  };
      
  //check product quantity
  // const checkProductQuantity = () => {
  //   return new Promise((resolve) => {
  //     setLoading(true);
  //     fetch(`${endpoint}/cart/${product.id}`, {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       method: "GET",
  //     })
  //       .then((res) => res.json())
  //       .then((res) => {
  //         if (res.error) {
  //           setMessage("Trop de quantité");
  //         } else {
  //           setMessage("Enregistré dans le panier");
  //         }
  //         setLoading(false);
  //         resolve(true);
  //       });
  //   });
  // };

  return {
    quantity,
    message,
    loading,
    setQuantity,
    addProduct,
    removeProduct,
    modifyProduct,
    loadProduct,
  };
};

export default useProduct;
