import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SPSelect from '../../../../../../../components/SPSelect';
import API from '../../../../../../../config/endpoints.config';
import SelectBox from '../../Shared/SelectBox/SelectBox';

const ChangeCategory = props => {
  return (
    <>
      <div className="input-label" style={{ marginTop: '25px' }}>
        Category
      </div>
      {/* <SPSelect
        onChange={props.handleCategoryChange}
        items={props.categories}
        isDiagram={true}
        selected={
          props.selectedNode.ticketcategory !== ''
            ? props.selectedNode.ticketcategory
            : props.selectedCategory.key
        }
      /> */}


      <SelectBox
        value={!props.categoryLoader ? props.selectedCategory.key : ''}
        placeholder="Select"
        loading={props.categoryLoader}
        event={props.handleCategoryChange}
        options={props.categories}
      />


      <div className="input-label" style={{ marginTop: '25px' }}>
        Subcategories
      </div>
      {/* <SPSelect
        onChange={props.handleSubCategoryChange}
        items={props.subCategories}
        isDiagram={true}
        selected={
          props.selectedNode.ticketsubcategory !== ''
            ? props.selectedNode.ticketsubcategory
            : props.selectedSubCategory.key
        }
      /> */}


      <SelectBox
        value={!props.subCategoryLoader ? props.selectedSubCategory.key : ''}
        placeholder="Select sub-category"
        loading={props.subCategoryLoader}
        event={props.handleSubCategoryChange}
        options={props.subCategories}
      />
    </>
  );
};

export default ChangeCategory;
