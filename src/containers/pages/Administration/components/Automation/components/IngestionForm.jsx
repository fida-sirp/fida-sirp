import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import SPButton from '../../../../../../components/SPButton';
import 'antd/dist/antd.css';
import { isArray, isEmpty } from 'lodash';
import InputBox from '../../../../../../components/InputBox';
import SelectBox from '../../../../../../components/SelectBox';
import SPToggleSwitch from '../../../../../../components/SPToggleSwitch';
import { Label } from '../../../../../../components/InputBox/StyledComponents';

function IngestionFormDrawer({
  isVisible,
  recordValue,
  submit,
  closeDrawer,
  widget,
  type,
  frequency,
  user,
  application,
  actions,
  configuration,
  isCreate,
  handleApplicationSelect,
}) {
  const initial = {
    dis_name: '',
    dis_status: 'Enable',
    dis_ingestion_method: 'Email',
    dis_ingestion_type: 'Incident',
    dis_stats_type: '',
    dis_frequency: '+5 minutes',
    dis_user: '',
    dis_app_id: '',
    dis_act_id: '',
    configuration: '',
    dis_email_format: '',
    dis_subject: '',
  };
  const [ingestionMethod, handleIngestionMethod] = useState('Email');
  const [format, setFormat] = useState('');
  const [readChecked, setReadChecked] = useState(false);
  const [formInitialValues, setFormInitialValues] = useState(initial);

  let validationSchemaStandard = Yup.object({
    dis_name: Yup.string().required('Required'),
    dis_app_id: Yup.string().required('Required'),
    dis_act_id: Yup.string().required('Required'),
    dis_email_format: Yup.string().required('Required'),
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

  const method = [
    {
      key: 'Email',
      value: 'Email',
      label: 'EMAIL',
    },
    {
      key: 'Api',
      value: 'Api',
      label: 'API',
    },
  ];

  const Formats = [
    {
      key: 'Raw',
      value: 'Raw',
      label: 'Raw',
    },
    {
      key: 'JSON',
      value: 'JSON',
      label: 'JSON',
    },
    {
      key: 'HTML',
      value: 'HTML',
      label: 'HTML',
    },
  ];
  useEffect(() => {
    if (recordValue && !isCreate) {
      let initialValues = {};
      initialValues['dis_name'] = recordValue.dis_name;
      initialValues['dis_status'] = recordValue.dis_status;
      initialValues['dis_ingestion_method'] = recordValue.dis_ingestion_method;
      initialValues['dis_ingestion_type'] = recordValue.dis_ingestion_type;
      initialValues['dis_stats_type'] = recordValue.dis_stats_type;
      initialValues['dis_frequency'] = recordValue.dis_frequency;
      initialValues['dis_user'] = recordValue.dis_user;
      initialValues['dis_app_id'] = recordValue.dis_app_id?.toString();
      initialValues['dis_act_id'] = recordValue.dis_act_id?.toString();
      initialValues['dis_email_format'] = recordValue.dis_email_format;
      if (!isEmpty(recordValue.dis_subject)) {
        setReadChecked(true);
        initialValues['dis_subject'] = recordValue.dis_subject;
      } else setReadChecked(false);
      setFormInitialValues(initialValues);
      setFormat(recordValue.dis_email_format);
      handleIngestionMethod(recordValue.dis_ingestion_method);
    } else {
      let initialValues = {};
      initialValues['dis_name'] = "";
      initialValues['dis_status'] = "";
      initialValues['dis_ingestion_method'] = "Email";
      initialValues['dis_ingestion_type'] = "";
      initialValues['dis_stats_type'] = "";
      initialValues['dis_frequency'] = "";
      initialValues['dis_user'] = "";
      initialValues['dis_app_id'] = "";
      initialValues['dis_act_id'] = ""
      initialValues['dis_email_format'] = "";
      initialValues['dis_subject'] = "";
      setReadChecked(false);
      setFormInitialValues(initialValues);
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
            resetForm()
          }, [isVisible])
          return (
            <Form>
              <InputBox
                id={'dis_name'}
                label={'Name'}
                name={'dis_name'}
                onInputChange={handleChange}
                onBlur={handleBlur}
                value={values.dis_name}
                errorMessage={errors.dis_name}
                touched={touched.dis_name}
                noBorderValidation
              />

              {format !== 'JSON' && (
                <SelectBox
                  id="dis_status"
                  label="Status"
                  name="dis_status"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.dis_status}
                  value={values.dis_status}
                  touched={touched.dis_status}
                  options={status}
                />
              )}

              <SelectBox
                id="dis_ingestion_method"
                label="Ingestion method"
                name="dis_ingestion_method"
                onInputChange={(name, value) => {
                  handleIngestionMethod(value);
                  setFieldValue(name, value);
                }}
                onBlur={handleBlur}
                errorMessage={errors.dis_ingestion_method}
                value={values.dis_ingestion_method}
                touched={touched.dis_ingestion_method}
                options={method}
              />

              <SelectBox
                id="dis_ingestion_type"
                label="Ingestion Type"
                name="dis_ingestion_type"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.dis_ingestion_type}
                value={values.dis_ingestion_type}
                touched={touched.dis_ingestion_type}
                options={type}
              />

              <SelectBox
                id="dis_stats_type"
                label="Widget Name"
                name="dis_stats_type"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.dis_stats_type}
                value={values.dis_stats_type}
                touched={touched.dis_stats_type}
                options={widget}
              />

              <SelectBox
                id="dis_frequency"
                label="Frequency"
                name="dis_frequency"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.dis_frequency}
                value={values.dis_frequency}
                touched={touched.dis_frequency}
                options={frequency}
              />

              <SelectBox
                id="dis_user"
                label="Opened By"
                name="dis_user"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.dis_user}
                value={values.dis_user}
                touched={touched.dis_user}
                options={user}
              />

              <SelectBox
                id="dis_app_id"
                label="Applications"
                name="dis_app_id"
                onInputChange={(name, value) => {
                  handleApplicationSelect(value);
                  setFieldValue(name, value);
                }}
                onBlur={handleBlur}
                errorMessage={errors.dis_app_id}
                value={values.dis_app_id}
                touched={touched.dis_app_id}
                options={application}
              />

              <SelectBox
                id="dis_act_id"
                label="Actions"
                name="dis_act_id"
                onInputChange={setFieldValue}
                onBlur={handleBlur}
                errorMessage={errors.dis_act_id}
                value={values.dis_act_id}
                touched={touched.dis_act_id}
                options={actions}
              />

              {!isEmpty(configuration) && (
                <SelectBox
                  id="configuration"
                  label="Configuration"
                  name="configuration"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.configuration}
                  value={values.configuration}
                  touched={touched.configuration}
                  options={configuration}
                />
              )}

              <SelectBox
                id="dis_email_format"
                label="Format"
                name="dis_email_format"
                onInputChange={(name, value) => {
                  setFormat(value);
                  setFieldValue(name, value);
                }}
                onBlur={handleBlur}
                errorMessage={errors.dis_email_format}
                value={values.dis_email_format}
                touched={touched.dis_email_format}
                options={Formats}
              />

              {ingestionMethod === 'Email' && (
                <>
                  <InputBox
                    id={'dis_folder'}
                    label={'Folder name'}
                    name={'dis_folder'}
                    onInputChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dis_folder}
                    errorMessage={errors.dis_folder}
                    touched={touched.dis_folder}
                    noBorderValidation

                  />

                  <InputBox
                    id={'dis_sender'}
                    label={'Sender Information'}
                    name={'dis_sender'}
                    onInputChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dis_sender}
                    errorMessage={errors.dis_sender}
                    touched={touched.dis_sender}
                    noBorderValidation
                  />
                  <div>
                    <Label>Read selective emails</Label>
                    <SPToggleSwitch
                      onChange={checked => {
                        setReadChecked(checked);
                      }}
                      toggleId={'Select Emails'}
                      onChecked={readChecked}
                    />
                  </div>
                  <InputBox
                    id={'dis_subject'}
                    label={
                      'Subject (Read emails with subject containing following text)'
                    }
                    name={'dis_subject'}
                    onInputChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dis_subject}
                    errorMessage={errors.dis_subject}
                    touched={touched.dis_subject}
                    noBorderValidation
                    isHide={!readChecked}
                  />
                  <InputBox
                    id={'dis_text_prepend'}
                    label={'Prepend (Following text to the title)'}
                    name={'dis_text_prepend'}
                    onInputChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dis_text_prepend}
                    errorMessage={errors.dis_text_prepend}
                    touched={touched.dis_text_prepend}
                    noBorderValidation
                  />

                  <InputBox
                    id={'dis_text_append'}
                    label={'Append (Following text to the title)'}
                    name={'dis_text_append'}
                    onInputChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dis_text_append}
                    errorMessage={errors.dis_text_append}
                    touched={touched.dis_text_append}
                    noBorderValidation
                  />
                </>
              )}
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
                    title={isCreate ? "Save" : "Update"}
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

export default IngestionFormDrawer;
