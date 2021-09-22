import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import 'antd/dist/antd.css';
import { isArray, isEmpty } from 'lodash';
import InputBox from '../../../../../../components/InputBox';
import TextAreaBox from '../../../../../../components/TextAreaBox';
import SelectBox from '../../../../../../components/SelectBox';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { onGetAccessControlActionGroup } from '../../../../../../actions/administration';

const StatusOption = [
  { key: 1, value: 'Enable', label: 'Enable' },
  { key: 2, value: 'Disable', label: 'Disable' },
];


function ActionFormDrawer({ recordValue, submit, closeDrawer, actionGrouplist, getActionGroupList, type, isVisible }) {

  const [actionGroup, setActionGroup] = useState([])
  const [formInitialValues, setFormInitialValues] = useState({
    act_name: '',
    act_description: '',
    act_group: '',
    act_status: ''
  });

  useEffect(() => {
    getActionGroupList()
  }, [])

  useEffect(() => {
    const arr = [];
    if (actionGrouplist && Object.keys(actionGrouplist).length !== 0) {
      for (const [key, value] of Object.entries(actionGrouplist)) {
        arr.push({
          key,
          value: Number(key),
          label: value
        })
      }
    }
    setActionGroup(arr)
  }, [actionGrouplist])


  let validationSchemaStandard = Yup.object({
    act_name: Yup.string().required('Required'),
    act_description: Yup.string().max(250, "Allow Only 250 Character").required('Required')
  });

  useEffect(() => {
    let initialValues = {};
    if (!isEmpty(recordValue)) {
      initialValues['act_name'] = recordValue.act_name;
      initialValues['act_description'] = recordValue.act_description;
      initialValues['act_group'] = recordValue.act_group;
      initialValues['act_status'] = recordValue.act_status;
      setFormInitialValues(initialValues);
    } else {
      setFormInitialValues({
        act_name: '',
        act_description: '',
        act_group: '',
        act_status: ''
      })
    }
  }, [recordValue]);

  return (
    <div>
      <Formik
        id="formik"
        validationSchema={validationSchemaStandard}
        initialValues={formInitialValues}
        enableReinitialize
        onSubmit={(values, { resetForm }) => {
          submit(values);
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
            resetForm()
          }, [isVisible])
          return (
            <Form>
              <InputBox
                id={'act_name'}
                label={'Name'}
                name={'act_name'}
                placeholder={'Name'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.act_name}
                errorMessage={errors.act_name}
                touched={touched.act_name}
                width={345}
                noBorderValidation
              />

              <TextAreaBox
                id={'act_description'}
                label={'Description'}
                name={'act_description'}
                placeholder={'Description'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.act_description}
                errorMessage={errors.act_description}
                touched={touched.act_description}
                width={345}
                noBorderValidation
              />

              <SelectBox
                id="act_group"
                label="Group"
                name="act_group"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.act_group}
                value={values.act_group}
                touched={touched.act_group}
                width={345}
                options={actionGroup}
                disabled={isSubmitting}
              />

              <SelectBox
                id="act_status"
                label="Status"
                name="act_status"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.act_status}
                value={values.act_status}
                touched={touched.act_status}
                width={345}
                options={StatusOption}
                disabled={isSubmitting}
              />

              <Row gutter={11} justify="end" style={{ width: 640 }}>
                <Col>
                  <SPButton
                    title="Cancel"
                    size="small"
                    type="secondary"
                    onButtonClick={() => {
                      resetForm();
                      closeDrawer();
                    }}
                  />
                </Col>
                <Col>
                  <SPButton
                    title={type ? "Create" : "Update"}
                    size="small"
                    type="submit"
                    onButtonClick={handleSubmit}
                    isLoading={false}
                  />
                </Col>
              </Row>
            </Form>
          )
        }}
      </Formik>
    </div>
  );
}



const mapStateToProps = state => ({
  actionGrouplist: state.administration.accessControlList?.actionGroup,
});

const mapDispatchToProps = dispatch => ({
  getActionGroupList: () => dispatch(onGetAccessControlActionGroup()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(ActionFormDrawer);

