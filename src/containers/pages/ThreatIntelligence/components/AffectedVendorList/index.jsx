import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Simg, ProductDropDownWrapper, TagWrapper } from './StyledComponents';
import SPAddItemDropdown from '../../../../../components/SPAddItemDropdown';
import editIcon from '../../../../../assets/images/Shape.png';
import loaderImg from '../../../../../assets/images/loader.gif';
import SPActivityIndicator from '../../../../../components/SPActivityIndicator';
import { useSelector } from 'react-redux'
import Product from '../../../../../components/UploadedItem';

function AffectedVendorList({ vendor, selectedVendor, onAdd, onRemove }) {
  return (
    <div>
      <TagWrapper>
        {selectedVendor.map((value, index) => {
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
            title="Affected Vendor"
            onSelect={({ key, value }) => { onAdd(key); }}
            items={vendor}
            icon={false}
            isProductList={true}
            plusButton={true}
          />
        </ProductDropDownWrapper>
      </div>
    </div>
  );
}

export default AffectedVendorList;

AffectedVendorList.propTypes = {
  vendor: PropTypes.array,
  selectedVendor: PropTypes.array,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
};
