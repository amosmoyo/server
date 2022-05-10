import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { cartSliceActions } from '../../store/cart'
import {useDispatch}  from 'react-redux';

const ProductItem = (props) => {
  const dispatch = useDispatch();

  const { title, price, description } = props.product;
  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(cartSliceActions.addProduct({...props.product}))
  }

  return (
    <li key={title} className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
