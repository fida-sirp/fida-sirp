import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { Row, Col } from 'antd';
import { Menu, Dropdown, Button, Modal } from 'antd';
import * as Yup from 'yup';
import { RowDiv, AlertBox } from './StyledComponents';
import SPButton from '../../../../../components/SPButton';
import InputBox from '../../../../../components/InputBox';
import TextAreaBox from '../../../../../components/TextAreaBox';
import SelectBox from '../../../../../components/SelectBox';
import { SModal } from './StyledComponents';

const initialValues = {
  to: undefined,
  cc: undefined,
  template: undefined,
  description: '',
};

const validationSchema = Yup.object({
  to: Yup.array().of(Yup.string().email('Please enter valid email.')).required('Required'),
  cc: Yup.array().of(Yup.string()).nullable(),
  template: Yup.string().required('Required'),
  description: Yup.string().nullable(),
});

function SendEmailModal({
  isVisible,
  onSubmit,
  onClose,
  userEmailData,
  templateList,
}) {
  return (
    <>
      <SModal
        title="Send email"
        visible={isVisible}
        onOk={onSubmit}
        onCancel={onClose}
        width="825px"
        footer={[]}
      >
        <Formik
          id="formik"
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values);
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
            return (
              <Form onSubmit={handleSubmit}>
                <RowDiv>
                  <SelectBox
                    id="to"
                    name="to"
                    label="To"
                    mode="tags"
                    placeholder="To"
                    onInputChange={setFieldValue}
                    onBlur={handleBlur}
                    errorMessage={errors.to}
                    value={values.to}
                    touched={touched.to}
                    width={620}
                    options={userEmailData}
                    disabled={isSubmitting}
                  />
                </RowDiv>

                <RowDiv>
                  <SelectBox
                    id="cc"
                    name="cc"
                    label="CC"
                    mode="multiple"
                    placeholder="CC"
                    onInputChange={setFieldValue}
                    onBlur={handleBlur}
                    errorMessage={errors.cc}
                    value={values.cc}
                    touched={touched.cc}
                    width={620}
                    options={userEmailData}
                    disabled={isSubmitting}
                  />
                </RowDiv>

                <RowDiv>
                  <SelectBox
                    id="template"
                    name="template"
                    label="Template"
                    placeholder="Template"
                    onInputChange={setFieldValue}
                    onBlur={handleBlur}
                    errorMessage={errors.template}
                    value={values.template}
                    touched={touched.template}
                    width={620}
                    options={templateList}
                    disabled={isSubmitting}
                  />
                </RowDiv>
                <RowDiv>
                  <TextAreaBox
                    id="description"
                    name="description"
                    label=" Description"
                    placeholder=" Description"
                    onInputChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={errors.description}
                    value={values.description}
                    touched={touched.description}
                    width={620}
                    disabled={isSubmitting}
                    noBorderValidation
                  />
                </RowDiv>
                <Row gutter={11} justify="end" style={{ width: 640 }}>
                  <Col>
                    <SPButton
                      onButtonClick={onClose}
                      title="Cancel"
                      size="small"
                      type="secondary"
                    />
                  </Col>
                  <Col>
                    <SPButton
                      title={'Send Email'}
                      htmlType="submit"
                      size="small"
                    />
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </SModal>
    </>
  );
}

export default SendEmailModal;
