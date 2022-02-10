
import * as React from 'react';
import { connect } from 'react-redux';

import { IAppState } from '../../store/store';

import { IProduct } from '../../reducers/productReducer';

import {ProductSimple} from "../product";

// Create the containers interface
interface IProps {
  products: IProduct[];
}

class ProductList extends React.Component<IProps> {
  public render() {
    const { products } = this.props;
    return (
      <div className="name-container">
        {products &&
          products.map(products => {
            return (
              <ProductSimple product={products.article} ></ProductSimple>
            );
          })}
      </div>
    );
  }
}

// Grab the characters from the store and make them available on props
const mapStateToProps = (store: IAppState) => {
  return {
    products: store.productState.products,
  };
};

export default connect(mapStateToProps)(ProductList);