import React from "react";
import useCart from "../hooks/useCart";

const Cart = ({ setRoute }: { setRoute: (data: any) => void }) => {
  const { loading, products, message, loadCart, removeToCart } = useCart();
  return (
    <div>
      {loading && <div data-testid="loading">Loading....</div>}
      {!loading && <div>Data</div>}
      {message && <p>{message}</p>}
      <div onClick={() => setRoute({ route: "home" })}>Retour</div>
      <div data-testid="productList">
        {products.map((product) => {
          return (
            <React.Fragment>
              <div>
                <img src={product.image} alt="" />
                <p data-testid="name">Figurine de {product.name}</p>
                <p data-testid="quantity">Quantitée {product.quantity}</p>
              </div>
              <button onClick={() => removeToCart(product)}>
                Supprimer du panier
              </button>
              <hr />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
