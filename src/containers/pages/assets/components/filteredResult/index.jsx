import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { Formik, Form } from 'formik';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SPButton from '../../../../../components/SPButton';
import SelectBox from '../../../../../components/SelectBox';
import InputBox from '../../../../../components/InputBox';
import FormHeader from '../../../incidentManagement/components/FormHeader';

function FilteredResult({ visible, onOpen, onClose,resultArray }) {
  const [resultArrayItem,setResultArrayItem] = useState(resultArray);

  useEffect(() => {
    setResultArrayItem(resultArray);
    console.log(resultArray);
  }, [resultArray]);

  return (
    <div style={{ marginBottom: 20 }}>
      <FormHeader
        number={4}
        title="Filtered Result"
        visible={visible}
        onOpen={onOpen}
        onClose={onClose}
      >
        <div style={{ color: '#fff' }}>
          { resultArrayItem.map((item,index) =>
              <div key={index}>{item}</div>
            ) }
        </div>
      </FormHeader>
    </div>
  );
}

export default FilteredResult;
