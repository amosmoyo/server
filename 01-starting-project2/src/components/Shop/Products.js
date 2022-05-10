import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
import { useSelector } from "react-redux";

const Products = (props) => {
  const { products } = useSelector((state) => state.productReducer);
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {products.length >= 0 &&
          products.map((product) => {
            return (
              <>
                <ProductItem
                  // title={product.title}
                  // price={product.price}
                  // description={product.description}
                  product={product}
                />
              </>
            );
          })}
      </ul>
    </section>
  );
};

export default Products;
