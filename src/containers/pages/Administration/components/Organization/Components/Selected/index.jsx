import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  ongetSelectedOraganization,
  setSelectedOraganization,
} from '../../../../../../../actions/administration';
import SelectBox from '../../../../../../../components/SelectBox';
import SPButton from '../../../../../../../components/SPButton';
import { Row, Col } from 'antd';
import AuthTokenHOC from '../../../../../../../HOCs/AuthTokenHOC';
import { StylesBox } from '../../StyledComponents';

const OrganizationSelected = ({
  onGetSelectedOrg,
  selectedOraganization,
  onSetOrg,
}) => {
  const [selectedOraganizationList, setSelectedOraganizationList] = useState(
    []
  );
  useEffect(() => {
    onGetSelectedOrg();
  }, [onGetSelectedOrg]);
  useEffect(() => {
    const listData = selectedOraganization?.listData?.list;
    const selectionList = [];
    if (listData && Object.keys(listData).length !== 0) {
      for (const [key, value] of Object.entries(listData)) {
        selectionList.push({
          key,
          value: parseInt(key, 10),
          label: value,
        });
      }
    }
    setSelectedOraganizationList(selectionList);
  }, [selectedOraganization]);

  return (
    <StylesBox>
      <Formik
        id="formik"
        enableReinitialize
        initialValues={{
          selected_one: selectedOraganization?.listData?.selected_one || '',
        }}
        onSubmit={(values, { resetForm }) => {
          onSetOrg(values);
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
          useEffect(() => {
            resetForm();
          }, []);
          return (
            <Form onSubmit={handleSubmit}>
              <SelectBox
                id="selected_one"
                label="Customer"
                name="selected_one"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.selected_one}
                value={values.selected_one}
                touched={touched.selected_one}
                options={selectedOraganizationList}
                width={350}
              />
              <Row gutter={11} justify="start" style={{ marginTop: 20 }}>
                <Col>
                  <SPButton
                    title="Select"
                    type="submit"
                    onButtonClick={handleSubmit}
                    size="small"
                  />
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </StylesBox>
  );
};

const mapStateToProps = state => ({
  selectedOraganization: state.administration.selectedOraganization,
});
const mapDispatchToProps = dispatch => ({
  onGetSelectedOrg: () => dispatch(ongetSelectedOraganization()),
  onSetOrg: (...args) => dispatch(setSelectedOraganization(...args)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  AuthTokenHOC
)(OrganizationSelected);
