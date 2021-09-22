import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { isArray, isEmpty } from 'lodash';
import InputBox from '../../../../../components/InputBox';
import SelectBox from '../../../../../components/SelectBox';
import SPButton from '../../../../../components/SPButton';

function RulesFormDrawer({
  isVisible,
  FormType,
  title,
  closeDrawer,
  category,
  disposition,
  location,
  type,
  riskRating,
  subDisposition,
  subCategory,
  handleContainerSelect,
  handleCategorySelect,
  handleDispositionSelect,
  submit,
  recordValue,
}) {
  const [formInitialValues, setFormInitialValues] = useState({
    module: 'incident',
    plbr_rule_name: '',
    ticket_name: '',
    ticket_category: '',
    ticket_sub_category: '',
    ticket_disposition: '',
    ticket_sub_disposition: '',
    ticket_location: '',
    ticket_severity: '',
    severity_risk: '',
    plbr_status: 'Enable',
  })
  let validationSchemaStandard = Yup.object({
    plbr_rule_name: Yup.string().required('Required'),
  });


  const status = [
    {
      key: 'enable',
      value: 'Enable',
      label: 'Enable',
    },
    {
      key: 'disable',
      value: 'Disable',
      label: 'Disable',
    },
  ];

  const container = [
    {
      key: 'incident',
      value: 'incident',
      label: 'Incident',
    },
    {
      key: 'advisory',
      value: 'advisory',
      label: 'Threat Intelligence',
    },
    {
      key: 'case',
      value: 'case',
      label: 'Case',
    },
    {
      key: 'vulnerability',
      value: 'vulnerability',
      label: 'Vulnerability',
    },
    {
      key: 'risk',
      value: 'risk',
      label: 'Risk',
    },
  ];

  const severity = [
    {
      key: 'low',
      value: 'Low',
      label: 'Low',
    },
    {
      key: 'medium',
      value: 'Medium',
      label: 'Medium',
    },
    {
      key: 'high',
      value: 'High',
      label: 'High',
    },
  ];

  useEffect(() => {
    let initialValues = {};
    if (!isEmpty(recordValue)) {
      let parsedValue = {};
      if (!isEmpty(recordValue.plbr_code)) {
        parsedValue = JSON.parse(recordValue.plbr_code);
        initialValues['ticket_name'] = parsedValue.ticket_name;
        initialValues['ticket_category'] =
          parsedValue.ticket_category && !isEmpty(category)
            ? Number(parsedValue.ticket_category)
            : '';
        initialValues['module'] = parsedValue.module;
        initialValues['ticket_sub_category'] =
          parsedValue.ticket_sub_category && !isEmpty(subCategory)
            ? Number(parsedValue.ticket_sub_category)
            : '';
        initialValues['ticket_disposition'] =
          parsedValue.ticket_disposition && !isEmpty(disposition)
            ? Number(parsedValue.ticket_disposition)
            : '';
        initialValues['ticket_location'] =
          parsedValue.ticket_location && !isEmpty(location)
            ? Number(parsedValue.ticket_location)
            : '';
        initialValues['ticket_severity'] = parsedValue.ticket_severity
          ? parsedValue.ticket_severity
          : '';
        initialValues['ticket_sub_disposition'] =
          parsedValue.ticket_sub_disposition && !isEmpty(subDisposition)
            ? Number(parsedValue.ticket_sub_disposition)
            : '';
      }
      initialValues['plbr_rule_name'] = recordValue.plbr_rule_name;
      initialValues['plbr_status'] = recordValue.plbr_status;

      setFormInitialValues(initialValues);
    }
  }, [recordValue]);

  return (
    <div>
      <h3 className="add-rules-title">{title}</h3>
      <Formik
        id="formik"
        validationSchema={validationSchemaStandard}
        initialValues={FormType === "Create" ? {
          module: 'incident',
          plbr_rule_name: '',
          ticket_name: '',
          ticket_category: '',
          ticket_sub_category: '',
          ticket_disposition: '',
          ticket_sub_disposition: '',
          ticket_location: '',
          ticket_severity: '',
          severity_risk: '',
          plbr_status: 'Enable',
        } : formInitialValues}
        enableReinitialize
        onSubmit={(values, { resetForm }) => {
          submit(values);
          resetForm();
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
          }, [isVisible]);
          return (
            <Form>
              <InputBox
                id={'plbr_rule_name'}
                label={'Rule Name'}
                name={'plbr_rule_name'}
                placeholder={'Rule Name'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.plbr_rule_name}
                touched={touched.plbr_rule_name}
                errorMessage={errors.plbr_rule_name}
                noBorderValidation
              />
              <SelectBox
                id="module"
                label="Container"
                name="module"
                onInputChange={(name, value) => {
                  handleContainerSelect(value);
                  setFieldValue(name, value);
                }}
                onBlur={handleBlur}
                errorMessage={errors.module}
                value={values.module}
                touched={touched.module}
                options={container}
              //   disabled={isSubmitting}
              />
              <InputBox
                id={'ticket_name'}
                label={'Name'}
                name={'ticket_name'}
                placeholder={'Enter Name'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.ticket_name}
                touched={touched.ticket_name}
                errorMessage={errors.ticket_name}
                noBorderValidation
              />
              {(type == 'incident' || type == 'advisory') && (
                <SelectBox
                  id="ticket_category"
                  label="Category"
                  name="ticket_category"
                  onInputChange={(name, value) => {
                    handleCategorySelect(value);
                    setFieldValue(name, value);
                  }}
                  onBlur={handleBlur}
                  errorMessage={errors.ticket_category}
                  value={values.ticket_category}
                  touched={touched.ticket_category}
                  options={category}
                //   disabled={isSubmitting}
                />
              )}
              {type == 'incident' && (
                <>
                  <SelectBox
                    id="ticket_sub_category"
                    label="Subcategory"
                    name="ticket_sub_category"
                    onInputChange={(name, value) => {
                      // handleticket_sub_categorySelect(value);
                      setFieldValue(name, value);
                    }}
                    onBlur={handleBlur}
                    errorMessage={errors.ticket_sub_category}
                    value={values.ticket_sub_category}
                    touched={touched.ticket_sub_category}
                    options={subCategory}
                  //   disabled={isSubmitting}
                  />
                  <SelectBox
                    id="ticket_disposition"
                    label="Disposition"
                    name="ticket_disposition"
                    onInputChange={(name, value) => {
                      handleDispositionSelect(value);
                      setFieldValue(name, value);
                    }}
                    onBlur={handleBlur}
                    errorMessage={errors.ticket_disposition}
                    value={values.ticket_disposition}
                    touched={touched.ticket_disposition}
                    options={disposition}
                  //   disabled={isSubmitting}
                  />
                  <SelectBox
                    id="ticket_sub_disposition"
                    label="Subdisposition"
                    name="ticket_sub_disposition"
                    onInputChange={(name, value) => {
                      // handleticket_sub_dispositionSelect(value);
                      setFieldValue(name, value);
                    }}
                    onBlur={handleBlur}
                    errorMessage={errors.ticket_sub_disposition}
                    value={values.ticket_sub_disposition}
                    touched={touched.ticket_sub_disposition}
                    options={subDisposition}
                  //   disabled={isSubmitting}
                  />
                </>
              )}
              {type == 'incident' && (
                <SelectBox
                  id="ticket_location"
                  label="Location"
                  name="ticket_location"
                  onInputChange={(name, value) => {
                    // handlelocationSelect(value);
                    setFieldValue(name, value);
                  }}
                  onBlur={handleBlur}
                  errorMessage={errors.ticket_location}
                  value={values.ticket_location}
                  touched={touched.ticket_location}
                  options={location}
                />
              )}
              {(type == 'vulnerability' ||
                type == 'incident' ||
                type == 'advisory') && (
                  <SelectBox
                    id="ticket_severity"
                    label="Severity"
                    name="ticket_severity"
                    onInputChange={(name, value) => {
                      // handleseveritySelect(value);
                      setFieldValue(name, value);
                    }}
                    onBlur={handleBlur}
                    errorMessage={errors.ticket_severity}
                    value={values.ticket_severity}
                    touched={touched.ticket_severity}
                    options={severity}
                  //   disabled={isSubmitting}
                  />
                )}
              {type == 'risk' && (
                <SelectBox
                  id="severity_risk"
                  label="Risk Rating"
                  name="severity_risk"
                  onInputChange={(name, value) => {
                    // handleseverity_riskSelect(value);
                    setFieldValue(name, value);
                  }}
                  onBlur={handleBlur}
                  errorMessage={errors.severity_risk}
                  value={values.severity_risk}
                  touched={touched.severity_risk}
                  options={riskRating}
                //   disabled={isSubmitting}
                />
              )}
              <SelectBox
                id="plbr_status"
                label="Status"
                name="plbr_status"
                onInputChange={(name, value) => {
                  // handleplbr_statusSelect(value);
                  setFieldValue(name, value);
                }}
                onBlur={handleBlur}
                errorMessage={errors.plbr_status}
                value={values.plbr_status}
                touched={touched.plbr_status}
                options={status}
              //   disabled={isSubmitting}
              />
              <Row gutter={11} justify="end">
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
                    title="Save"
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

export default RulesFormDrawer;
