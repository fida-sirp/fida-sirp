import React, { useState, useEffect } from 'react';
import { Card, Button } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

import './style.css';
import SPButton from '../../../../../../components/SPButton';
import SelectBox from '../../../../playbook/components/create/Shared/SelectBox/SelectBox';
import { useSelector } from 'react-redux'
import loaderImg from '../../../../../../assets/images/loader.gif';
const UpdateIngestionFormDrawer = ({
  fieldOptions,
  keyOptions,
  artifactsOptions,
  handleUpdate,
  updateRecord,
}) => {
  const isFormLoading = useSelector((state) => state?.administration?.automation?.isFieldLoading)
  const appConfig = useSelector((state) => state?.administration?.automation?.mappingData)

  const [initialForm, setInitialForm] = useState({
    fieldValues: [{ incident_field_0: '', json_key_field_0: '' }],
    artifactsValues: [{ artifact_field_0: '', json_key_artifact_0: '' }],
  });
  const [temp, setTemp] = useState(0);

  const handleConditionFieldChange = (fieldSetName, key, index, name) => {
    let updateInitialData = initialForm;
    updateInitialData[fieldSetName][index][`${name}_${index}`] = key;
    setInitialForm(updateInitialData);
    setTemp(new Date());
  };

  const addField = fieldSetName => {
    const initialValue = initialForm;
    if (fieldSetName === 'fieldValues') {
      const length = initialForm.fieldValues.length;
      initialValue.fieldValues.push({
        [`incident_field_${length}`]: '',
        [`json_key_field_${length}`]: '',
      });
    } else {
      const length = initialForm.artifactsValues.length;
      initialValue.artifactsValues.push({
        [`artifact_field_${length}`]: '',
        [`json_key_artifact_${length}`]: '',
      });
    }
    setInitialForm(initialValue);
    setTemp(new Date());
  };

  /**
   *
   * @param {*} formIndex - index of parent
   * @param {*} andIndex - index of current AND
   * Function for remove AND condition
   */
  const removeConditionAND = (andIndex, fieldName) => {
    if (fieldName === 'fieldValues') {
      const newData = initialForm.fieldValues.filter(
        (items, itemIndex) => itemIndex !== andIndex
      );
      setInitialForm({ ...initialForm, fieldValues: newData });
    } else {
      const newData = initialForm.artifactsValues.filter(
        (items, itemIndex) => itemIndex !== andIndex
      );
      setInitialForm({ ...initialForm, artifactsValues: newData });
    }
  };

  /**
   * Function for save form data
   */
  const handleSave = () => {
    const payload = _.merge(initialForm.fieldValues, initialForm.artifactsValues);
    const data = Object.assign({}, ...payload);
    handleUpdate(data);
  };

  useEffect(() => {
    const appFieldintialValue = {}
    if (appConfig) {
      const updatedInitialValue = {
        fieldValues: [],
        artifactsValues: []
      };
      let temp = 0;
      _.map(appConfig, (value, index) => {
        if (value?.artifact_field) {
          temp = index;
          updatedInitialValue.artifactsValues.push({
            [`artifact_field_${index}`]: value?.artifact_field,
            [`json_key_artifact_${index}`]: value?.artifact_key,
          });
        } else {
          updatedInitialValue.fieldValues.push({
            [`incident_field_${index - temp - 1}`]: value?.field_key,
            [`json_key_field_${index - temp - 1}`]: value?.json_field,
          });
        }
      })
      setInitialForm({ fieldValues: updatedInitialValue.fieldValues, artifactsValues: updatedInitialValue.artifactsValues });
    }
  }, [appConfig])

  return (
    <>
      {isFormLoading ? <div className="make-child-center">
        <img src={loaderImg} />
      </div> : <>  <div>
        <Card className="custom-card">
          <div>
            <span className="input-label">Field Mapping</span>
            <Button
              onClick={() => addField('fieldValues')}
              type="primary"
              style={{
                borderColor: '#33C758',
                background: '#33C758',
                margin: '2px',
              }}
              icon={<PlusOutlined />}
              size="small"
            />
          </div>
          {initialForm.fieldValues.map((value, i) => {
            return (
              <Card className="custom-card-child">
                <div
                  className="btn-actns"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ padding: '2px' }}>
                    {/* {i !== 0 ? ( */}
                    <Button
                      onClick={() => removeConditionAND(i, 'fieldValues')}
                      type="primary"
                      style={{
                        borderColor: 'red',
                        background: 'red',
                        margin: '2px',
                      }}
                      icon={<CloseOutlined />}
                      size="small"
                    />
                    {/* ) : null} */}
                  </div>
                </div>
                <div className="fields-wrapper">
                  <div className="fields">
                    <span className="input-label">Field</span>
                    <SelectBox
                      value={initialForm.fieldValues[i][`incident_field_${i}`]}
                      className="input-class"
                      event={key =>
                        handleConditionFieldChange(
                          'fieldValues',
                          key,
                          i,
                          'incident_field'
                        )
                      }
                      options={fieldOptions}
                    />
                  </div>
                  <div className="fields">
                    <span className="input-label">Key</span>
                    <SelectBox
                      value={initialForm.fieldValues[i][`json_key_field_${i}`]}
                      className="input-class"
                      event={key =>
                        handleConditionFieldChange(
                          'fieldValues',
                          key,
                          i,
                          'json_key_field'
                        )
                      }
                      options={keyOptions}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </Card>

        <Card className="custom-card">
          <div>
            <span className="input-label">Artifact Mapping</span>
            <Button
              onClick={() => addField('artifactsValues')}
              type="primary"
              style={{
                borderColor: '#33C758',
                background: '#33C758',
                margin: '2px',
              }}
              icon={<PlusOutlined />}
              size="small"
            />
          </div>
          {initialForm.artifactsValues.map((value, i) => {
            return (
              <Card className="custom-card-child">
                <div
                  className="btn-actns"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ padding: '2px' }}>
                    {/* {i !== 0 ? ( */}
                    <Button
                      onClick={() => removeConditionAND(i, 'artifactsValues')}
                      type="primary"
                      style={{
                        borderColor: 'red',
                        background: 'red',
                        margin: '2px',
                      }}
                      icon={<CloseOutlined />}
                      size="small"
                    />
                    {/* ) : null} */}
                  </div>
                </div>
                <div className="fields-wrapper">
                  <div className="fields">
                    <span className="input-label">Artifact</span>
                    <SelectBox
                      value={
                        initialForm.artifactsValues[i][`artifact_field_${i}`]
                      }
                      className="input-class"
                      event={key =>
                        handleConditionFieldChange(
                          'artifactsValues',
                          key,
                          i,
                          'artifact_field'
                        )
                      }
                      options={artifactsOptions}
                    />
                  </div>
                  <div className="fields">
                    <span className="input-label">Key</span>
                    <SelectBox
                      value={
                        initialForm.artifactsValues[i][`json_key_artifact_${i}`]
                      }
                      className="input-class"
                      event={key =>
                        handleConditionFieldChange(
                          'artifactsValues',
                          key,
                          i,
                          'json_key_artifact'
                        )
                      }
                      options={keyOptions}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </Card>
      </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '25px',
          }}
        >
          <SPButton type="button" title="Save Changes" onButtonClick={handleSave}>
            Save Changes
          </SPButton>
        </div>
      </>
      }
    </>
  );
};

export default UpdateIngestionFormDrawer;
