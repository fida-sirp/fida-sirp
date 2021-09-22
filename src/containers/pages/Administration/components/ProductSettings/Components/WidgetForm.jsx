import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage } from 'formik';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import 'antd/dist/antd.css';
import { isArray, isEmpty } from 'lodash';
import InputBox from '../../../../../../components/InputBox';
import SelectBox from '../../../../../../components/SelectBox';
import TextAreaBox from '../../../../../../components/TextAreaBox';
import { ErrorText } from '../../Organization/StyledComponents';
import SetDocumentTitleHOC from '../../../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import { onGetWidgetGroup, onGetWidgetSource } from '../../../../../../actions/administration';
import { compose } from 'redux';
import { connect } from 'react-redux';

function WidgetFormDrawer({ recordValue, submit, closeDrawer, onGetSources, onGetGroups, listOfGroups, listOfSources, isEdit, isVisible }) {
  const [formInitialValues, setFormInitialValues] = useState({
    gra_name: '',
    gra_description: '',
    gra_title: "",
    gra_source: [],
    gra_group: "",
  });
  const [groups, setGroups] = useState([])
  const [sources, setSources] = useState([])

  useEffect(() => {
    onGetSources()
    onGetGroups()
  }, [])
  useEffect(() => {
    if (!_.isEmpty(listOfGroups)) {
      const groupArray = [];
      if (Object.keys(listOfGroups).length !== 0) {
        for (const [key, value] of Object.entries(listOfGroups)) {
          groupArray.push({
            key,
            value: Number(key),
            label: value
          })
        }
      }
      setGroups(groupArray)
    }
    if (!_.isEmpty(listOfSources)) {
      const sourceArray = [];
      if (Object.keys(listOfSources).length !== 0) {
        for (const [key, value] of Object.entries(listOfSources)) {
          sourceArray.push({
            key,
            value: Number(key),
            label: value
          })
        }
      }
      setSources(sourceArray)
    }
  }, [listOfGroups, listOfSources])

  let validationSchemaStandard = Yup.object({
    gra_name: Yup.string().required('Required'),
    gra_group: Yup.string().required('Required')
  });

  function renderSources(data) {
    return data ? String(data)
      .split(',')
      .map(item => Number(item))
      : [];
  };

  useEffect(() => {
    let initialValues = {};
    if (!isEmpty(recordValue)) {
      initialValues['gra_name'] = recordValue?.gra_name;
      initialValues['gra_description'] = recordValue?.gra_description;
      initialValues['gra_source'] = renderSources(recordValue?.gra_source) || [];
      initialValues['gra_group'] = recordValue?.gra_group || [];
      initialValues['gra_title'] = recordValue?.gra_title || "";
      setFormInitialValues(initialValues);
    } else {
      setFormInitialValues({
        gra_name: '',
        gra_description: '',
        gra_title: "",
        gra_source: [],
        gra_group: "",
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
          if (values.gra_source) {
            values.gra_source = String(values.gra_source).split(',')
          }
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
                id={'gra_name'}
                label={'Widget File Name'}
                name={'gra_name'}
                placeholder={''}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.gra_name}
                errorMessage={errors.gra_name}
                touched={touched.gra_name}
                width={750}
                noBorderValidation
              />
              <InputBox
                id={'gra_title'}
                label={'Widget Title'}
                name={'gra_title'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.gra_title}
                touched={touched.gra_title}
                width={750}
                noBorderValidation
              />
              <SelectBox
                id="gra_source"
                label="Data Sources"
                name="gra_source"
                mode="multiple"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.gra_source}
                value={values.gra_source}
                touched={touched.gra_source}
                width={750}
                setHightAuto
                options={sources}
              />
              <SelectBox
                id="gra_group"
                label="Group"
                name="gra_group"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.gra_group}
                value={values.gra_group}
                touched={touched.gra_group}
                width={750}
                options={groups}
                disabled={isSubmitting}
              />

              <TextAreaBox
                id="gra_description"
                name="gra_description"
                label={'Widget Description'}
                onInputChange={handleChange}
                placeholder="Widget Description"
                onBlur={handleBlur}
                errorMessage={errors.gra_description}
                value={values.gra_description}
                touched={touched.gra_description}
                width={750}
                disabled={isSubmitting}
                noBorderValidation
              />
              <Row gutter={11} justify="end" >
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
                    title={isEdit ? "Update" : "Create"}
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
  listOfSources: state.administration?.productSettingList?.widgetSources,
  listOfGroups: state.administration?.productSettingList?.widgetGroups
});

const mapDispatchToProps = dispatch => ({
  onGetSources: () => dispatch(onGetWidgetSource()),
  onGetGroups: () => dispatch(onGetWidgetGroup()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(WidgetFormDrawer);
