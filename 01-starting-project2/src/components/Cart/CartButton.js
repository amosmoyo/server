import classes from './CartButton.module.css';
import { useSelector, useDispatch } from "react-redux";
import {cartSliceActions} from '../../store/cart'

const CartButton = (props) => {
  const dispatch = useDispatch();

  const { cartProducts } = useSelector((state) => state.cartReducer);
  
  const cartItems = cartProducts.filter((x) => x.quantity > 0);

  const handleShowCart = (e) => {
    e.preventDefault();
    dispatch(cartSliceActions.toggleCart());
  }

  return (
    <button className={classes.button} onClick={handleShowCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItems.length}</span>
    </button>
  );
};

export default CartButton;
