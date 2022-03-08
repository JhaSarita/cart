import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  { id : 'p1',
    title : 'A Book',
    price : 8,
    description : 'My Book'
  },
  {
    id : 'p2',
    title : 'A Phone',
    price : 3,
    description : 'My Phone'
  }
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        { DUMMY_PRODUCTS.map((products) => 
          <ProductItem
          key={products.id}
          id={products.id}
          title={products.title}
          price={products.price}
          description={products.description}
        />)}
      </ul>
    </section>
  );
};

export default Products;
