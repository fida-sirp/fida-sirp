import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import { Menu, Dropdown, Button, Modal  } from 'antd';
import { RowDiv, AlertBox } from './StyledComponents';
import SPButton from '../../../../../components/SPButton';
import InputBox from '../../../../../components/InputBox';
import TextAreaBox from '../../../../../components/TextAreaBox';
import SelectBox from '../../../../../components/SelectBox';
import { 
    SModal
} from './StyledComponents';
import { createTemplates }from '../../../../../actions/assets';
import SetDocumentTitleHOC from '../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../HOCs/AuthTokenHOC';



const initialValues = {
    "at_name": "",
    "at_code":"",
    "at_organization":"1"
  
};

function TemplateModal({isVisible,onSubmit,onClose, createTemplates,createTemplateIsSuccess}) {



    return (
        <>
  
        <SModal title="Create Template" visible={isVisible} onOk={onSubmit} onCancel={onClose} width="825px" footer={[]}>
        <Formik
        id="formik"
      
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          createTemplates(values)
          
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
    
           if(createTemplateIsSuccess){
            resetForm();
            onSubmit();
           }
           
          }, [createTemplateIsSuccess]);
      return   (
      <Form onSubmit={handleSubmit}>
            <RowDiv>
               
                <InputBox
                  id="at_name"
                  label="Name"
                  name="at_name"
                  placeholder=" Name"
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.at_name}
                  value={values.at_name}
                  touched={touched.at_name}
                  width={620}
                  disabled={isSubmitting}
                  noBorderValidation
                />
            </RowDiv>
        <Row gutter={11} justify="end" style={{ width: 640 }}>
          <Col>
            <SPButton
              title="Cancel"
              size="small"
              onButtonClick={onClose}
              type="secondary"
            />
          </Col>
          <Col>
            <SPButton
              title={"Save"}
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
        </SModal>
      </>


    );
}

const mapStateToProps = state => {
  return {
    createTemplateIsSuccess:state.createTemplate.isSuccess
  };
};



const mapDispatchToProps = {
  createTemplates
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(TemplateModal);
