import React, { useEffect, useState } from 'react';
import { Select, message, Button, Input } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

import SPButton from '../../../../../../components/SPButton';
import CacheApplications from '../services/action/cacheApplication.service';
import CacheAction from '../services/action/cacheActions.service';
import CacheAdditionInputs from '../services/action/additionalActions.service';

import './styles.css';
import SelectBox from '../Shared/SelectBox/SelectBox';
import JsonEditor from './JsonEditor/JsonEditor';

const ActionSettings = props => {
  const { Option } = Select;
  let selectedNode = { ...props.actionValues };
  const [multiValueids, setMultiValueIds] = useState([]);
  const [oldMultiValueIds, setOldMultiValueIds] = useState([]);
  // const [oldSelectedAction, setOldSelectedAction] = useState(selectedNode.action);
  // const  = { ...node };
  const [appLoader, setAppLoader] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState([]);
  const [selectedAdditionInput, setSelectedAdditionalInput] = useState({});
  const [multiInput, setMultiInput] = useState({});
  const [additionalInputValues, setAdditionalInputValues] = useState([]);
  const [visibleInputs, setVisibleInputs] = useState(false);
  const [additionInputs, setAdditionalInputs] = useState([]);
  const [configurations, setConfigurations] = useState([]);
  const [showConfigurations, setShowConfigurations] = useState(false);
  const [actionsLoader, setActionsLoader] = useState(false);
  const [actions, setActions] = useState([
    {
      value: 'Any',
      key: 'Any',
      description: '',
      multi_input: '',
      act_type: '',
    },
  ]);
  const [appData, setAppData] = useState([]);
  const [selectedApp, setSelectedApp] = useState({
    value: '',
    key: '',
    multi_config: '',
  });

  const [selectedAction, setSelectedAction] = useState({
    value: '',
    key: '',
    description: '',
    multi_input: '',
    act_type: '',
  });

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

  const handleModelCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    if (selectedNode.action !== '') {
      setIsModalVisible(true);
    }
  };

  const fetchAdditionalInputs = async act_id => {
    const id = Number(act_id);
    try {
      // const userToken = localStorage.getItem('AccessToken');
      const response = await new CacheAdditionInputs().fetchAdditionalInputs(
        id
      );
      if (response) {
        // debugger;
        // console.log('>>>>>>>>>>>>>>', response);
        const inputs = response.data.data.action_additional_inputs.map(
          (item, index) => {
            return {
              key: item.aai_id,
              name: item.aai_name.replace(/\s+/g, '_'),
              type: 'select',
            };
          }
        );
        const inputValues =
          response.data.data.action_additional_input_values.map(item => {
            // console.log(item);
            return {
              key: item.aiv_id,
              name: item.aiv_name.replace(/\s+/g, '_'),
              value: item.aiv_value,
            };
          });
        setAdditionalInputValues(inputValues);
        setActionsLoader(false);
        setVisibleInputs(true);
        // ;

        if (inputs.length > 0) {
          const object = inputs.reduce(
            (obj, item) =>
              Object.assign(obj, {
                [item.name]: '',
                ['sel_' + item.name]: '',
                act_type: selectedAction.act_type,
              }),
            {}
          );
          setMultiInput(object);
        }

        setVisibleInputs(true);
        setAdditionalInputs(inputs);
      }
    } catch (e) {
      // console.log(e);
      if (e.response.status === 401) {
        message.error({
          content: 'Unauthorized, Please login',
          className: 'success-message',
          style: { color: '#FFF' },
        });
      } else {
        message.error({
          content: 'something went wrong',
          className: 'success-message',
          style: { color: '#FFF' },
        });
      }
    }
  };

  /**
   *
   * @param {*} app - app id
   * Fetch actions of perticular application
   */
  const fetchActions = async (app_id, multi_config) => {
    setActionsLoader(true);
    const appId = Number(app_id);
    try {
      // const userToken = localStorage.getItem('AccessToken');
      const response = await new CacheAction().fetchActions(
        multi_config,
        appId
      );

      if (response) {
        // debugger;
        setActionsLoader(false);
        if (
          response.data.data.configuration !== null &&
          response.data.data.configuration.length !== 0
        ) {
          const config = response.data.data.configuration;
          const newConfig = config.map(item => {
            return item.nameConfig;
          });
          // if(appId !== Number(sele.app) ){

          // }
          setConfigurations(newConfig);
          setShowConfigurations(true);
        } else {
          setShowConfigurations(false);
        }
        const data = response.data.data.actions.map((item, index) => {
          return {
            key: String(item.act_id),
            value: item.act_name,
            description: item.act_description,
            multi_input: item.act_is_multiinput,
            act_type: item.act_type,
          };
        });

        if (data.length !== 0) {
          setActions(data);
          if (selectedNode.action !== '') {
            setSelectedAction({
              key: selectedNode.action,
              description: selectedNode.name,
              value: selectedNode.bodyText,
              multi_input: selectedNode.is_multi_input,
              act_type: selectedNode.type,
            });

            // setSelectedAction({ key: selectedNode.action, value: '', description: '' });
            if (selectedNode.is_multi_input === 'True') {
              // debugger;
              await fetchAdditionalInputs(selectedNode.action);
              setMultiInput({ ...multiInput, ...selectedNode.multi_input });
            }
          }
        }
      }
    } catch (e) {
      if (e.response.status === 401) {
        message.error({
          content: 'Unauthorized, Please login',
          className: 'success-message',
          style: { color: '#FFF' },
        });
      } else {
        message.error({
          content: 'something went wrong',
          className: 'success-message',
          style: { color: '#FFF' },
        });
      }
    }
  };

  /**
   * Fetch all applications
   */
  const fetchApplications = async () => {
    const response = await new CacheApplications().fetchApplications();
    if (response) {
      setAppLoader(false);
      let data = response.data.data.map((item, index) => {
        return {
          key: String(item.app_id),
          value: item.app_product_name,
          multi_config: Boolean(item.app_multi_config_allowed),
          // app_type: item.app_type ? item.app_type : 'Investigation'
        };
      });
      setAppData(data);
      if (selectedNode.app !== '') {
        setSelectedConfig(selectedNode.configuration);
        setSelectedApp({
          key: selectedNode.app,
          value: '',
          app_type: selectedNode.type,
          multi_config: selectedNode.multi_config,
        });
      }
      if (selectedNode.action !== '') {
        const actionId = selectedNode.app;
        fetchActions(actionId, selectedNode.multi_config);
      } else {
        setSelectedAction({
          key: '',
          description: '',
          value: '',
          act_type: '',
        });
      }
    }
  };

  /**
   * Save action details
   */
  const handleSave = () => {
    selectedNode.app = selectedApp.key;
    selectedNode.type = selectedAction.act_type;
    selectedNode.name = selectedAction.act_type
      ? selectedAction.act_type + ` (${Math.abs(selectedNode.key)})`
      : `investigation (${Math.abs(selectedNode.key)})`;
    selectedNode.act_type = selectedAction.act_type
      ? selectedAction.act_type + ` (${Math.abs(selectedNode.key)})`
      : `investigation (${Math.abs(selectedNode.key)})`;
    selectedNode.multi_config = selectedApp.multi_config;
    // selectedNode.is_multi_input = selectedAction.multi_input;
    // selectedNode.action_key = selectedNode.key;
    selectedNode.description = selectedAction.description;
    selectedNode.action = selectedAction.key;
    selectedNode.bodyText = selectedAction.value;
    selectedNode.act_type = selectedAction.act_type;
    // debugger
    // console.log('>>>>>>>>>>>>>>>>>', multiValueids);
    selectedNode.multi_values_id = multiValueids.map(item=> item.id).join(',');

    props.handleActionsSave(
      selectedNode,
      multiInput,
      multiValueids,
      selectedAction.multi_input,
      showConfigurations,
      selectedConfig
    );
  };

  const handleActionChange = key => {
    // eslint-disable-next-line no-param-reassign
    selectedNode.action = '';
    // selectedNode.selected_multi_inputs={};
    setVisibleInputs(false);
    setActionsLoader(true);
    setMultiValueIds([]);
    const filterArr = filterArray(actions, key);
    setSelectedAction(filterArr);
    if (filterArr.multi_input === 'True') {
      setSelectedAdditionalInput({});
      fetchAdditionalInputs(key);
    }
  };

  /**
   *
   * @param {*} event - event
   */
  const handleAppSelectChange = key => {
    setVisibleInputs(false);
    setSelectedConfig([]);
    setMultiInput({});
    selectedNode.action = '';
    setSelectedAction({
      value: '',
      key: '',
      description: '',
      multi_input: '',
      act_type: '',
    });
    const selectedApp = appData.find(item => {
      return item.key === key;
    });
    setSelectedApp(selectedApp);
    fetchActions(selectedApp.key, selectedApp.multi_config);
  };

  /**
   *
   * @param {*} value
   * Handle select config
   */
  const handleSelectConfig = value => {
    setSelectedConfig([...value]);
  };

  const showAdditionalInput = (key, index) => {
    Object.values(additionInputs).forEach(e => {
      if (e.key === key) {
        e.type = 'input';
      }
    });
    setAdditionalInputs([...additionInputs]);
  };

  const showAdditionalSelect = (key, index) => {
    Object.values(additionInputs).forEach(e => {
      if (e.key === key) {
        e.type = 'select';
      }
    });

    setAdditionalInputs([...additionInputs]);
  };

  const handleAdditionalInputSelect = (name, key) => {
    // setOldMultiValueIds()
    const selectedInputValue = additionalInputValues.find(
      e => e.key === Number(key)
    );
    setMultiInput({
      ...multiInput,
      act_type: selectedAction.act_type,
      [name]: selectedInputValue.value,
    });

    const objIndex = multiValueids.findIndex(item => item?.name === name);
    // console.log('>>>>>>>>>>>>>', objIndex, name);
    if (objIndex !== -1) {
      const updatedData = multiValueids.filter(item => {
        if (item?.name === name) {
           item.id = key;
        }
        return item;
      });
      // console.log('>>>>>>>>>>>>', updatedData);
      setMultiValueIds(updatedData);
    } else {
      setMultiValueIds([
        ...multiValueids,
        {
          name: name,
          id: key,
        },
      ]);
    }
  };

  const handleAdditionalInputChange = (event, key) => {
    // console.log('>>>>>>>>>>>>', key);
    setMultiInput({
      ...multiInput,
      act_type: selectedAction.act_type,
      ['sel_' + event.target.name]: event.target.value,
      [event.target.name]: event.target.value,
    });

    const ids = multiValueids.filter(item => Number(item) !== key);
    setMultiValueIds(ids);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchApplications();
    if (selectedNode.is_multi_input === 'True') {
      setSelectedAdditionalInput({ ...selectedNode.multi_input });

      // console.log('>>>>>>>>>>>>>>', selectedNode);
      const multiInputIds = selectedNode.selected_multi_inputs;
      setMultiValueIds(multiInputIds);
    }
  }, []);

  return (
    <div className="main-container">
      <div className="input-label" style={{ marginTop: '25px' }}>
        App
      </div>
      <Select
        showSearch
        listHeight={400}
        defaultValue={
          selectedNode.app === '' ? selectedApp.key : selectedNode.app
        }
        // value={}
        style={{ width: 256, height: 38 }}
        loading={appLoader}
        optionFilterProp="children"
        defaultActiveFirstOption={true}
        onChange={handleAppSelectChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {appData.map((item, index) => {
          return (
            <Option key={item.key} value={item.key}>
              {item.value}
            </Option>
          );
        })}
      </Select>
      {showConfigurations ? (
        <>
          <div className="input-label" style={{ marginTop: '25px' }}>
            Configuration
          </div>
          <Select
            mode="multiple"
            size="middle"
            placeholder="Please select"
            value={selectedConfig}
            onChange={handleSelectConfig}
            style={{
              width: '256px',
              overflow: 'hidden',
              height: 'fit-content',
            }}
          >
            {configurations.map((items, index) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <Option
                  key={items ? items.toString() : ''}
                  value={items ? items.toString() : ''}
                >
                  {items}
                </Option>
              );
            })}
          </Select>
        </>
      ) : null}

      <div style={{ marginTop: '25px', display: 'flex' }}>
        <span className="input-label">Actions</span>
        <div
          onClick={showModal}
          style={{ marginLeft: '10px', cursor: 'pointer' }}
        >
          <img src="/images/create-playbook/filter.svg" alt="filter" />
        </div>
      </div>

      <SelectBox
        value={selectedAction.key}
        placeholder="Select a action"
        loading={actionsLoader}
        event={handleActionChange}
        options={actions}
      />

      {selectedAction.multi_input === 'True' && visibleInputs
        ? additionInputs.map((item, index) => {
            return (
              <React.Fragment key={item.key}>
                <div className="input-label" style={{ marginTop: '25px' }}>
                  {item.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {item.type === 'input' ? (
                    <>
                      <Input
                        // size="large"
                        onChange={event =>
                          handleAdditionalInputChange(event, item.key)
                        }
                        // value={
                        //   item.name === selectedNode.multi_input[item.name]
                        //     ? selectedNode.multi_input[item.name]
                        //     : ''
                        // }
                        style={{
                          background: '#1C1C24',
                          width: '225px',
                          borderRadius: '4px',
                          outline: 'none',
                          border: '1px solid #ffffff5c',
                          padding: '5.5px 11px',
                          color: '#FFFFFF',
                        }}
                        type="text"
                        id="field-name"
                        name={item.name}
                        placeholder={item.name}
                        // label="Field"
                        width="256"
                      />
                      <Button
                        onClick={() => showAdditionalSelect(item.key, index)}
                        type="primary"
                        style={{
                          borderColor: 'red',
                          background: 'red',
                          marginLeft: '7px',
                        }}
                        icon={<CloseOutlined />}
                        size="small"
                      ></Button>
                    </>
                  ) : item.type === 'select' ? (
                    <>
                      <Select
                        size="middle"
                        placeholder="Please select"
                        removeIcon={<CloseOutlined />}
                        defaultValue={
                          selectedAdditionInput
                            ? selectedAdditionInput['sel_' + item.name]
                              ? selectedAdditionInput['sel_' + item.name]
                              : ''
                            : ''
                        }
                        onChange={key => {
                          // console.log(value)
                          handleAdditionalInputSelect('sel_' + item.name, key);
                        }}
                        style={{ width: '63%' }}
                      >
                        {additionalInputValues
                          .filter(e => {
                            return e.name === item.name;
                          })
                          .map((item, index) => {
                            return (
                              // eslint-disable-next-line react/no-array-index-key
                              <Option
                                key={item.value ? item.value.toString() : ''}
                                value={item.key ? item.key.toString() : ''}
                              >
                                {item.value}
                              </Option>
                            );
                          })}
                      </Select>
                      <Button
                        onClick={() => showAdditionalInput(item.key, index)}
                        type="primary"
                        style={{
                          borderColor: '#33C758',
                          background: '#33C758',
                          marginLeft: '7px',
                        }}
                        icon={<PlusOutlined />}
                        size="small"
                      ></Button>
                    </>
                  ) : null}
                </div>
              </React.Fragment>
            );
          })
        : null}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '25px',
          width: '40%',
        }}
      >
        <SPButton onButtonClick={handleSave} type="button" title="Save Changes">
          Save Changes
        </SPButton>
      </div>

      {isModalVisible ? (
        <JsonEditor
          actionId={selectedNode.action}
          handleModelCancel={handleModelCancel}
          isModalVisible={isModalVisible}
        />
      ) : null}
    </div>
  );
};

export default ActionSettings;
