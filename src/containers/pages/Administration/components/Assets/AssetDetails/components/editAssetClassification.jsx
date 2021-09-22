import { Formik, Form } from 'formik';
import InputBox from '../../../../../../../components/InputBox';
import SPButton from '../../../../../../../components/SPButton';
import { RowDiv } from '../../../../../ThreatIntelligence/components/editTicket/StyledComponents';

const updateClassification = ({ initialValues, onFormSubmit }) => {
  return (
    <Formik
      id="formik"
      // validationSchema={validationSchema}
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
      }) => (
        <Form onSubmit={handleSubmit}>
          <RowDiv>
            <InputBox
              id="asc_name"
              name="asc_name"
              label="Name"
              onInputChange={handleChange}
              onBlur={handleBlur}
              errorMessage={errors.asc_name}
              value={values.asc_name}
              touched={touched.asc_name}
              width={575}
            />
          </RowDiv>
          <RowDiv>
            <InputBox
              id="asc_value"
              name="asc_value"
              label="Value"
              type="number"
              onInputChange={handleChange}
              onBlur={handleBlur}
              errorMessage={errors.asc_value}
              value={values.asc_value}
              touched={touched.asc_value}
              width={575}
            />
          </RowDiv>
          <SPButton
            type="submit"
            onButtonClick={handleSubmit}
            title="Update"
            size="small"
          />
        </Form>
      )}
    </Formik>
  );
};

export default updateClassification;
