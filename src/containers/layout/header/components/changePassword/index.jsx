import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { Formik, Form } from 'formik';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { changePassword } from '../../../../../actions/user'
import SPButton from '../../../../../components/SPButton';
import InputBox from '../../../../../components/InputBox';
import Key from '../../../../../assets/svgIcon/key';
import { StyledDiv, StyledTitle, StyledText } from './StyledComponents';
import { AlertBox } from '../../../../pages/assets/components/createRule/StyledComponents';

const initialValues = {
  password: '',
  new_password: '',
  passconf: '',
};

function ChangePassword({changePassword,passwordStore}) {

  return (
    <div>
      <StyledTitle>
        <Key /> <StyledText> Change Password</StyledText>
      </StyledTitle>
      <StyledDiv>
        <Formik
          id="formik"
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => {
            changePassword(values);
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
            setFieldValue,
          }) => {
            const keyDown = e => {
            if (e.keyCode === 13) {
              handleSubmit();
            }
          };

          function generateError(data){
            let errorItem =null;
            if(typeof data === 'object' && data !== null){
              const items =  Object.keys(data).map((item) =>
                  <li >{data[item][0]}</li>
              );
              errorItem =  items;
            }else{
              errorItem =  data.message;
            }

            return errorItem;
          


          }

          useEffect(() => {
            if(passwordStore.isSuccess){
              resetForm();
            }
          }, [passwordStore.isSuccess]);
            return (
              <Form onSubmit={handleSubmit}>
              {passwordStore.hasErrors  ? (
                    
                    <AlertBox message={<ul className="margin-10">{generateError(passwordStore.hasErrors)}</ul>} type="error" closable />
                
                ) : null}

                {passwordStore.isSuccess  ? (
                    
                    <AlertBox message={<ul className="margin-10">{passwordStore?.listData?.data?.success}</ul>} type="success" closable />
                
                ) : null}

                <InputBox
                  id="password"
                  label="Old Password"
                  name="password"
                  type='password'
                  placeholder="Old Password"
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.password}
                  value={values.password}
                  touched={touched.password}
                />
                <InputBox
                  id="new_password"
                  label="New Password"
                  name="new_password"
                   type='password'
                  placeholder="New Password"
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.new_password}
                  value={values.new_password}
                  touched={touched.new_password}
                />
                <InputBox
                  id="passconf"
                  label="Confirm Password"
                  name="passconf"
                  type='password'
                  placeholder="Confirm Password"
                  onInputChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={errors.passconf}
                  value={values.passconf}
                  touched={touched.passconf}
                />

                <Row gutter={11} justify="end">
                  <Col>
                    <SPButton title="Save" htmlType="submit" size="small"  isLoading={passwordStore.isProcessing ? passwordStore.isProcessing:false}/>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </StyledDiv>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    passwordStore: state.changePasswordStore,
  };
};

const mapDispatchToProps = {
changePassword
};

export default connect(mapStateToProps,mapDispatchToProps)(ChangePassword);
