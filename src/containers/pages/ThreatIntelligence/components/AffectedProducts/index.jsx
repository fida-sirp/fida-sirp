import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Simg, ProductDropDownWrapper, TagWrapper } from './StyledComponents';
import SPAddItemDropdown from '../../../../../components/SPAddItemDropdown';
import editIcon from '../../../../../assets/images/Shape.png';
import Product from '../../../../../components/UploadedItem';

function AffectedProducts({ products, selectedProduct, onAdd, onRemove }) {

  const [showSearchProduct, setShowSearchProduct] = useState(false);

  return (
    <div>
      <TagWrapper>
        {selectedProduct.map((value, index) => {
          return (
            <Product
              width={200}
              name={value}
              margin="3px 6px"
              backgroundColor="#373747"
              onRemove={() => {
                onRemove(value);
              }}
            />
          );
        })}
      </TagWrapper>
      <div>
        <ProductDropDownWrapper>
          <SPAddItemDropdown
            title="Affected Products"
            onSelect={({ key, value }) => { onAdd(key); }}
            items={products}
            icon={false}
            isProductList={true}
            plusButton={true}
            onSearchOnly
          />
        </ProductDropDownWrapper>
      </div>
    </div>
  );
}

export default AffectedProducts;

AffectedProducts.propTypes = {
  products: PropTypes.array,
  selectedProduct: PropTypes.array,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
};
