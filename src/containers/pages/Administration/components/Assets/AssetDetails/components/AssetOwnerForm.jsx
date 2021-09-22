import { Formik, Form } from 'formik';
import { useEffect } from 'react';
import InputBox from '../../../../../../../components/InputBox';
import SPButton from '../../../../../../../components/SPButton';
import { RowDiv } from '../../../../../ThreatIntelligence/components/editTicket/StyledComponents';
import * as Yup from 'yup'

const updateClassification = ({ initialValues, onFormSubmit, isVisible, isCreate }) => {
  let validationSchemaStandard = Yup.object({
    usr_name: Yup.string().required('Required'),
    usr_email: Yup.string().email('Invalid Email').required('Required'),

  });
  return (
    <Formik
      id="formik"
      validationSchema={validationSchemaStandard}
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        onFormSubmit(values);
      }}
      enableReinitialize
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
          <Form onSubmit={handleSubmit}>
            <RowDiv>
              <InputBox
                id="usr_name"
                name="usr_name"
                label="Name"
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.usr_name}
                value={values.usr_name}
                touched={touched.usr_name}
                width={575}
              />
            </RowDiv>
            <RowDiv>
              <InputBox
                id="usr_email"
                name="usr_email"
                label="Email"
                type="email"
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.usr_email}
                value={values.usr_email}
                touched={touched.usr_email}
                width={575}
              />
            </RowDiv>
            <RowDiv>
              <InputBox
                id="usr_phone_number"
                name="usr_phone_number"
                label="Phone Number"
                type="number"
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.usr_phone_number}
                value={values.usr_phone_number}
                touched={touched.usr_phone_number}
                width={575}
              />
            </RowDiv>
            <RowDiv>
              <InputBox
                id="usr_mobile_number"
                name="usr_mobile_number"
                label="Mobile Number"
                type="number"
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.usr_mobile_number}
                value={values.usr_mobile_number}
                touched={touched.usr_mobile_number}
                width={575}
              />
            </RowDiv>
            <RowDiv>
              <InputBox
                id="usr_designation"
                name="usr_designation"
                label="Designation"
                onInputChange={handleChange}
                onBlur={handleBlur}
                errorMessage={errors.usr_designation}
                value={values.usr_designation}
                touched={touched.usr_designation}
                width={575}
              />
            </RowDiv>
            <SPButton
              type="submit"
              onButtonClick={handleSubmit}
              title={isCreate ? "Create" : "Update"}
              size="small"
            />
          </Form>
        )
      }}
    </Formik>
  );
};

export default updateClassification;
