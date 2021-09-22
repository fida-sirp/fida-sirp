import React, { useState, useEffect } from 'react';
import { Card, Button } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
// import * as _ from 'lodash';

import './styles.css';
import InputBox from '../../../../../../components/InputBox';
import SPSelect from '../../../../../../components/SPSelect';
import SelectBox from '../Shared/SelectBox/SelectBox';
import SPButton from '../../../../../../components/SPButton';
import _, { isEmpty, cloneDeep, map } from 'lodash';

const DecisionSetting = props => {
  const [initialForm, setInitialForm] = useState([
    {
      decision_value: [{ condition_0_0: '' }],
    },
  ]);

  const [action, setActions] = useState([])

  const conditions = [
    { value: 'equeal', key: '1', operation: '==' },
    { value: 'not equal', key: '2', operation: '!==' },
    { value: 'in', key: '3', operation: 'IN' },
    { value: 'not in', key: '4', operation: 'NOT IN' },
    { value: 'less', key: '5', operation: '<' },
    { value: 'less or equal', key: '6', operation: '<=' },
    { value: 'greater', key: '7', operation: '>' },
    { value: 'greater or equal', key: '8', operation: '>=' },
    { value: 'begins with', key: '9', operation: 'begins_with' },
    { value: "doesn't begin with", key: '10', operation: 'not_begins_with' },
    { value: 'contain', key: '11', operation: 'contains' },
    { value: "doeasn't contain", key: '12', operation: 'not_contains' },
    { value: 'end with', key: '13', operation: 'end_with' },
    { value: "doesn't end with", key: '14', operation: 'not_end_with' },
    { value: 'is null', key: '15', operation: 'IS NULL' },
    { value: 'is not null', key: '16', operation: 'IS NOT NULL' },
  ];

  useEffect(() => {
    const canvasValues = JSON.parse(props.playbookData)?.nodeDataArray
    const actionArray = [];
    if (!isEmpty(canvasValues)) {
      canvasValues.map((item, index) => {
        if (item?.category == "Action") {
          actionArray.push({ value: `${item.bodyText} (${Math.abs(item.key)})` || '', key: String(item.key) })
        }
      })
    }
    setActions(actionArray)
  }, [])

  /**
   *
   * @param {*} event
   * @param {*} optionIndex
   * @param {*} subOptionIndex
   * Function for handle select box changes
   */
  const handleConditionChange = (key, optionIndex, subOptionIndex) => {
    // eslint-disable-next-line no-use-before-define
    const filter = filterArray(conditions, key);
    const form = cloneDeep(initialForm);
    const result = form.map((items, index) => {
      if (index !== optionIndex) return items;
      let conditions = [...items.decision_value];

      conditions = items.decision_value.map((subItem, subIndex) => {
        if (subIndex !== subOptionIndex) return subItem;
        return {
          ...subItem,
          [`condition_${optionIndex}_${subOptionIndex}`]: filter.operation,
          [`condition_key_${optionIndex}_${subOptionIndex}`]: key,
        };
      });

      // eslint-disable-next-line no-param-reassign
      items.decision_value = [...conditions];
      return items;
    });
    // console.log(result)
    setInitialForm([...result]);
  };

  const handleActionChange = (key, optionIndex, subOptionIndex) => {
    // eslint-disable-next-line no-use-before-define
    const form = cloneDeep(initialForm);
    const result = form.map((items, index) => {
      if (index !== optionIndex) return items;
      let conditions = [...items.decision_value];

      conditions = items.decision_value.map((subItem, subIndex) => {
        if (subIndex !== subOptionIndex) return subItem;
        return {
          ...subItem,
          [`decaction_${optionIndex}_${subOptionIndex}`]: key,
          [`decaction_value_${optionIndex}_${subOptionIndex}`]: action[optionIndex]?.value || '',
        };
      });

      // eslint-disable-next-line no-param-reassign
      items.decision_value = [...conditions];
      return items;
    })
    setInitialForm([...result]);
  };



  /**
   *
   * @param {*} event
   * @param {*} optionIndex
   * @param {*} subOptionIndex
   * Function for handle select box changes
   */
  const handleFieldChange = (event, optionIndex, subOptionIndex) => {
    const form = cloneDeep(initialForm);
    const result = form.map((items, index) => {
      if (index !== optionIndex) return items;
      let conditions = [...items.decision_value];

      conditions = items.decision_value.map((subItem, subIndex) => {
        if (subIndex !== subOptionIndex) return subItem;
        return {
          ...subItem,
          [`field_${optionIndex}_${subOptionIndex}`]: event.target.value,
        };
      });

      // eslint-disable-next-line no-param-reassign
      items.decision_value = [...conditions];
      return items;
    })
    setInitialForm([...result]);
  };

  /**
   *
   * @param {*} itemsArr - array of items
   * Filter array and return value
   */
  const filterArray = (itemsArr, key) => {
    const filteredArray = itemsArr.filter(item => {
      return item.key === key;
    });
    return filteredArray[0];
  };

  /**
   *
   * @param {*} event
   * @param {*} optionIndex
   * @param {*} subOptionIndex
   * Function for handle select box changes
   */
  const handleValueChange = (event, optionIndex, subOptionIndex) => {
    const form = cloneDeep(initialForm);
    const result = form.map((items, index) => {
      if (index !== optionIndex) return items;
      let conditions = [...items.decision_value];

      conditions = items.decision_value.map((subItem, subIndex) => {
        if (subIndex !== subOptionIndex) return subItem;
        return {
          ...subItem,
          [`value_${optionIndex}_${subOptionIndex}`]: event.target.value,
        };
      });

      // eslint-disable-next-line no-param-reassign
      items.decision_value = [...conditions];
      return items;
    })
    setInitialForm([...result]);
  };

  /**
   *
   * @param {*} index - index
   * Function for add OR condition
   */
  const addConditionOR = index => {
    setInitialForm(element => [
      ...element,
      {
        decision_value: [
          {
            [`condition_${index + 1}_0`]: '',
            [`condition_${index + 1}_0_value`]: '',
          },
        ],
      },
    ]);
  };

  /**
   *
   * @param {*} optionIndex - option index
   * @param {*} subOptionIndex - subOption index
   * Function for add AND condition
   */
  const addConditionAND = (optionIndex, subOptionIndex) => {
    const form = cloneDeep(initialForm);
    const data = form.map((item, i) => {
      if (optionIndex !== i) return item;
      return {
        decision_value: [
          ...item.decision_value,
          {
            [`condition_${optionIndex}_${subOptionIndex + 1}`]: '',
            [`condition_${optionIndex}_${subOptionIndex + 1}_value`]: '',
          },
        ],
      };
    });
    setInitialForm([...data]);
  };

  /**
   *
   * @param {*} formIndex - index
   * Function for remove OR condition
   */
  const removeConditionOR = formIndex => {
    const form = cloneDeep(initialForm);
    const arr = form.filter((item, index) => {
      return index !== formIndex;
    });
    setInitialForm([...arr]);
  }

  /**
   *
   * @param {*} formIndex - index of parent
   * @param {*} andIndex - index of current AND
   * Function for remove AND condition
   */
  const removeConditionAND = (formIndex, andIndex) => {
    const form = cloneDeep(initialForm);
    const newData = form.map(items => ({
      ...items,
      decision_value: items.decision_value.filter(
        (item, i) => i !== andIndex
      ),
    }));
    setInitialForm([...newData]);
  };

  /**
   * Function for save form data
   */
  const handleSave = () => {
    // console.log(initialForm);
    const updatedDecisions = {}
    map(initialForm, (deciValue, deciKey) => {
      updatedDecisions[deciKey] = deciValue.decision_value
    });
    const conditions = Object.values(updatedDecisions);
    const form = JSON.stringify({ ...conditions });
    props.handleDecisionSave(form);
  };

  useEffect(() => {
    if (props.decisionsOptions.decision_value.length !== 0) {

      let revertArray = [];
      const transform = _.values(JSON.parse(props.decisionsOptions.decision_value));
      // console.log(transform);
      map(transform, (deciValue, deciKey) => {
        const revertObj = {};
        revertObj['decision_value'] = deciValue
        revertArray.push(revertObj);
      });
      // console.log(revertArray);
      setInitialForm(revertArray);
    }
  }, []);


  return (
    <>

      {
        initialForm.length !== 0 ?
          initialForm.map((value, index) => {
            return (
              <div>
                <Card className="custom-card">
                  <div class="btn-container">
                    <span className="input-label">Condition #{index + 1}</span>
                    {index !== 0 ? <span className="input-label">OR</span> : null}
                    <div
                      style={{
                        padding: '2px',
                        display: 'flex',
                        justifyContent: 'space-around',
                      }}
                    >
                      {initialForm.length - 1 === index ? (
                        <Button
                          onClick={() => addConditionOR(index)}
                          type="primary"
                          style={{
                            borderColor: '#33C758',
                            background: '#33C758',
                            margin: '2px',
                          }}
                          icon={<PlusOutlined />}
                          size="small"
                        ></Button>
                      ) : null}
                      {index !== 0 ? (
                        <Button
                          onClick={() => removeConditionOR(index)}
                          type="primary"
                          style={{
                            borderColor: 'red',
                            background: 'red',
                            margin: '2px',
                          }}
                          icon={<CloseOutlined />}
                          size="small"
                        ></Button>
                      ) : null}
                    </div>
                  </div>
                  {initialForm[index].decision_value.map((value, i) => {
                    return (
                      <Card className="custom-card-child">
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div></div>
                          {i !== 0 ? (
                            <span className="input-label">AND</span>
                          ) : null}
                          <div style={{ padding: '2px' }}>
                            {initialForm[index].decision_value.length - 1 === i ? (
                              <Button
                                onClick={() => addConditionAND(index, i)}
                                type="primary"
                                style={{
                                  borderColor: '#33C758',
                                  background: '#33C758',
                                  margin: '2px',
                                }}
                                icon={<PlusOutlined />}
                                size="small"
                              ></Button>
                            ) : null}
                            {i !== 0 ? (
                              <Button
                                onClick={() => removeConditionAND(index, i)}
                                type="primary"
                                style={{
                                  borderColor: 'red',
                                  background: 'red',
                                  margin: '2px',
                                }}
                                icon={<CloseOutlined />}
                                size="small"
                              ></Button>
                            ) : null}
                          </div>
                        </div>
                        <div className="input-label">Action</div>
                        <SelectBox
                          value={
                            initialForm[index].decision_value[i][
                            `decaction_${index}_${i}`
                            ]
                          }
                          event={key => handleActionChange(key, index, i)}
                          options={action}
                        />
                        <div style={{ marginTop: 15 }}>
                          <span className="input-label">Field</span>
                          <InputBox
                            onInputChange={event => {
                              handleFieldChange(event, index, i)
                            }
                            }
                            type="text"
                            value={
                              initialForm[index].decision_value[i][
                              `field_${index}_${i}`
                              ]
                            }
                            id="field-name"
                            name="field_name"
                            placeholder="Enter field"
                            width="256"
                          />
                        </div>
                        <div className="input-label">Condition</div>
                        {/* <SPSelect
                      onChange={event => handleConditionChange(event, index, i)}
                      items={conditions}
                      isDiagram={true}
                      selected={
                        initialForm[index].decision_value[i][
                        `condition_${index}_${i}`
                        ]
                      }
                    /> */}
                        <SelectBox
                          value={
                            initialForm[index].decision_value[i][
                            `condition_key_${index}_${i}`
                            ]
                          }
                          event={key => handleConditionChange(key, index, i)}
                          options={conditions}
                        />
                        <div style={{ marginTop: '25px' }}>
                          <span className="input-label">Value</span>
                          <InputBox
                            onInputChange={event =>
                              handleValueChange(event, index, i)
                            }
                            value={
                              initialForm[index].decision_value[i][
                              `value_${index}_${i}`
                              ]
                            }
                            type="text"
                            id="field-name"
                            name="field_name"
                            placeholder="value"
                            width="256"
                          />
                        </div>
                      </Card>
                    );
                  })}
                </Card>
              </div>
            );
          }) : null
      }
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '25px',
          width: '40%',
        }}
      >
        <SPButton type="button" title="Save Changes" onButtonClick={handleSave}>
          Save Changes
        </SPButton>
      </div>
    </>
  );
};

export default DecisionSetting;
