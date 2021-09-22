import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import * as Yup from 'yup';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SPButton from '../../../../../components/SPButton';
import InputBox from '../../../../../components/InputBox';
import TextAreaBox from '../../../../../components/TextAreaBox';
import SelectBox from '../../../../../components/SelectBox';
import { listOwners } from '../../../../../actions/owners';
import { createAssetRule, editAssetRule } from '../../../../../actions/assetRules';
import { listLocations } from '../../../../../actions/locations';
import { listOrganizations } from '../../../../../actions/organizations';
import SetDocumentTitleHOC from '../../../../../HOCs/SetDocumentTitleHOC';
import 'antd/dist/antd.css';
import { RowDiv, AlertBox } from './StyledComponents';
import { CodeSandboxCircleFilled } from '@ant-design/icons';


const optionData = [
  { key: 1, value: 'ipv4', label: 'IPv4' },
  { key: 2, value: 'ipv6', label: 'IPv6' },

];

const initialValues = {
  "asr_input": "",
  "asr_ip_type": "",
  "asr_owner_id": "",
  "asr_location": "",
 // "asr_organization":"",
};

const validationSchema = Yup.object({
  asr_input: Yup.string().required('Required'),
//  asr_organization:Yup.string().required('Required'),
});

function Create({
  newAssetRule,
  editAssetRule,
  onCloseDrawer,
  refreshAssetRuleList, 
  owners, listOwners, 
  listLocations, locations,
  createAssetRule, organizations, 
  listOrganizations, type,
  item }) {

  const [ownerOptionsData,setOwnerOptionsData] =  useState([]);
  const [locationOptionsData,setLocationOptionsData] =  useState([]);
  const [organizationsOptionsData,setOrganizationsOptionsData] =  useState([]);
  useEffect(() => {
    listOwners();
    listLocations();
   // listOrganizations();
  }, []);

  useEffect(() => {
    if (newAssetRule.isSuccess) {
      onCloseDrawer();
      refreshAssetRuleList();
    }
  }, [newAssetRule.isSuccess]);

 

 
 
  useEffect(() => {
    let optiondata = [];
    if (Object.keys(owners).length != 0) {
      owners.data.items.forEach(element => {
        optiondata.push(
          {
             key: element.usr_id, value: String(element.usr_id), label: element.usr_name 
          }
        );
      });
    }
    setOwnerOptionsData(optiondata);
  }, [owners]);

  useEffect(() => {
    let optiondata = [];
    if (Object.keys(organizations).length != 0) {
      organizations.data.items.forEach(element => {
        optiondata.push(
          {
             key: element.aos_id, value: String(element.aos_id), label: element.aos_os_name 
          }
        );
      });
    }
    setOrganizationsOptionsData(optiondata);
  }, [organizations]);

  useEffect(() => {
    let locationData = [];
    if (Object.keys(locations).length != 0) {
      locations.data.items.forEach(element => {
        locationData.push(
          {
             key: element.loc_id, value: String(element.loc_id), label: element.loc_name 
          }
        );
      });
    }
    setLocationOptionsData(locationData);
  }, [locations]);

  function generateError(data){
    if(Array.isArray(data)){
      const items = data.map((item) =>
          <li >{item.message}</li>
      );
      return items;
    }else{
      return data.message;
    }
  
  }

  return (
    <div>
       {newAssetRule.hasErrors  ? (
       
          <AlertBox message={<ul className="margin-10">{generateError(newAssetRule.data)}</ul>} type="error" closable />
      
      ) : null}
       <Formik
        id="formik"
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          if(type == "edit"){
            editAssetRule(values,item.asr_id)
          }else{
            createAssetRule(values);
          }
         // resetForm();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          resetForm,
          setFieldValue
        }) => {

          useEffect(() => {
            resetForm();
            if (type == "edit" ) {
                // get user and set form fields
          
                    const fieldKey = [ "asr_input",
                    "asr_ip_type",
                    "asr_owner_id",
                    "asr_location",
                    "asr_organization"];

                for (let [key, value] of Object.entries(item)) {
                  if(fieldKey.includes(key)){
                    setFieldValue(key, String(value), false);
                  }
                
                }

            }
        }, [type,item]);

      return   (
      <Form onSubmit={handleSubmit}>
       
        <RowDiv>
          <InputBox
            id="asr_input"
            label="IP Address / Range"
            name="asr_input"
            placeholder="IP Address / Range"
            onInputChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.asr_input}
            value={values.asr_input}
            width={630}
            touched={touched.asr_input}
          />
        </RowDiv>
        <RowDiv>
          <SelectBox
            id="asr_ip_type"
            label="IP Type"
            name="asr_ip_type"
            placeholder="IP Type"
            onInputChange={setFieldValue}
            onBlur={handleBlur}
            errorMessage={errors.asr_ip_type}
            value={values.asr_ip_type}
            width={630}
            touched={touched.asr_ip_type}
            options={optionData}
          />
        </RowDiv>
        <RowDiv>
          <SelectBox
         
            id="asr_owner_id"
            label="Asset Owner"
            name="asr_owner_id"
            placeholder="Asset Owner"
            onInputChange={setFieldValue}
            onBlur={handleBlur}
            errorMessage={errors.asr_owner_id}
            value={values.asr_owner_id}
            width={630}
            touched={touched.asr_owner_id}
            options={ownerOptionsData}
          />
        </RowDiv>
        <RowDiv>
          <SelectBox
         
            id="asr_location"
            label="Location"
            name="asr_location"
            placeholder="Location"
            onInputChange={setFieldValue}
            onBlur={handleBlur}
            errorMessage={errors.asr_location}
            value={values.asr_location}
            width={630}
            touched={touched.asr_location}
            options={locationOptionsData}
            disabled={isSubmitting}
          />
        </RowDiv>
       
        
        <Row gutter={11} justify="end" style={{ width: 640 }}>
          <Col>
            <SPButton
              title="Cancel"
              size="small"
              type="secondary"
            />
          </Col>
          <Col>
            <SPButton
              title={type === "edit"?"Update":"Create"}
              htmlType="submit"
              size="small"
            />
          </Col>
        </Row>
      </Form>
      )
    }
    }
       </Formik>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    owners: state.ownersStore.listData,
    locations: state.locationsStore.listData,
    organizations: state.organizationsStore.listData,
    newAssetRule: state.assetRulesStore,
  };
};

const mapDispatchToProps = {
  listOwners,
  listLocations,
  createAssetRule,
  listOrganizations,
  editAssetRule
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC
)(Create);
