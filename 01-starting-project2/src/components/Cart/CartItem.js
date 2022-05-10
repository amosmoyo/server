import classes from './CartItem.module.css';
import {cartSliceActions} from '../../store/cart';
import {useDispatch, useSelector} from 'react-redux';

const CartItem = (props) => {
  const dispatch = useDispatch();

  const { title, quantity, total, price } = props.item;
  const totalprice = (quantity * price).toFixed(2)

  const handleIncreaseCartItems = (e, title) => {
     e.preventDefault();
     dispatch(cartSliceActions.increment(title))
  }

  const handleDecreaseCartItems = (e, title) => {
    e.preventDefault();
    dispatch(cartSliceActions.decrement(title))
 }

  return (
    <li key={title} className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${totalprice}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={(e) => {
            return handleDecreaseCartItems(e, title)
          }}>-</button>
          <button onClick={(e) => {
            return handleIncreaseCartItems(e, title)
          }}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
