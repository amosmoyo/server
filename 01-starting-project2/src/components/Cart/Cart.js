import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";


const Cart = (props) => {
  const { cartProducts, showCart } = useSelector((state) => state.cartReducer);
  const cartItems = cartProducts.filter((x) => x.quantity > 0);
  return (
    <>
      {cartItems.length > 0 && showCart && (
        <Card className={classes.cart}>
          <h2>Your Shopping Cart</h2>
          <ul>
            {cartItems.map((product) => {
              return (
                <>
                  {product.quantity > 0 && (
                    <CartItem
                      // item={{ title: "Test Item", quantity: 3, total: 18, price: 6 }}
                      item={product}
                    />
                  )}
                </>
              );
            })}
          </ul>
        </Card>
      )}
    </>
  );
};

export default Cart;
