import React, { useEffect, useState } from 'react';

import './styles.css';
import InputBox from '../../../../../../components/InputBox';
import SPSelect from '../../../../../../components/SPSelect';
import Button from '../../../../../../components/SPButton';
import SelectBox from '../Shared/SelectBox/SelectBox';
import { isEmpty, cloneDeep } from 'lodash';

const FilterSetting = props => {
  // console.log(props);
  const [filterOptions, setFilterOptions] = useState(cloneDeep(props.filterOptions));
  const [disabled, setDisabled] = useState(true);
  const [fieldName, setFieldName] = useState('');
 

  const [actions, setActions] = useState([]);
  // const [selectedAction, setSelectedAction] = useState({
  //   value: '',
  //   key: '',
  //   description: '',
  //   multi_input: '',
  //   act_type: '',
  // });


  const transformOptions = [
    { value: 'array_to_json_encode', key: '1' },
    { value: 'xml_to_json_encode', key: '2' },
    { value: 'fetch_domain_from_url', key: '3' },
    { value: 'bas64_encode', key: '4' },
    { value: 'generate_md5', key: '5' },
    { value: 'username_from_email', key: '6' },
    { value: 'domain_from_email', key: '7' },
    { value: 'implode_array', key: '8' },
  ];

  /**
   *
   * @param {*} event - event object
   * Function for handle input changes
   */
  const handleInputChange = event => {
    if (event.target.value !== '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    // eslint-disable-next-line no-param-reassign
    // filterOptions.field = '';
    setFilterOptions({...filterOptions,filter_by: event.target.value})
    setFieldName(event.target.value);
  };

  /**
   *
   * @param {*} event - select event
   * Function for handle select box changes
   */
  const handleTransformChange = key => {
    // eslint-disable-next-line no-param-reassign
    // setFilterOptions({transform: ''})
    // filterOptions.;
    // eslint-disable-next-line no-param-reassign
   
    const selected = transformOptions.find(items => {
      return items.key === key;
    });
    setFilterOptions({...filterOptions, name: selected.value, transform: selected.key})
    // setTransform(selected);
  };

  /**
   * Function for save filter configurations
   */
  const handleSave = () => {
    props.handleFilterSave(filterOptions);
  };


  useEffect(() => {
    const canvasValues = cloneDeep(JSON.parse(props.playbookData)?.nodeDataArray)
    const actionArray = [];
    if (!isEmpty(canvasValues)) {
      canvasValues.map((item, index) => {
        if (item?.category == "Action") {
          actionArray.push({ value: `${item.bodyText} (${Math.abs(item.key)})` || '', key: String(item.key)})
        }
      })
    }
    setActions(actionArray)
  }, [])

  const handleActionChange = key => {
    const selected = actions.find(items => {
      return items.key === key;
    });
    setFilterOptions({...filterOptions,filter_decaction: selected.key});
  };

  return (
    <>
      <div style={{ marginTop: '25px', display: 'flex' }}>
        <span className="input-label">Actions</span>
      </div>
      <div style={{ marginBottom: '25px', display: 'flex' }}>
        <SelectBox
          value={
            filterOptions.filter_decaction ? filterOptions.filter_decaction : ''
          }
          event={handleActionChange}
          options={actions}
        />
      </div>
      <InputBox
        onInputChange={handleInputChange}
        value={
          filterOptions.filter_by ? filterOptions.filter_by : fieldName
        }
        type="text"
        id="field-name"
        name="field_name"
        placeholder="field name"
        label="Field"
        width="256"
      />
      <div className="input-label">Transform</div>
      {/* <SPSelect
        onChange={handleTransformChange}
        items={transformOptions}
        isDiagram={true}
        selected={
          filterOptions.transform
            ? filterOptions.transform
            : transform.key
        }
      /> */}

      <SelectBox
        value={filterOptions.transform
          ? filterOptions.transform
          : ''}
        // placeholder="Select"
        // loading={actionsLoader}
        event={handleTransformChange}
        options={transformOptions}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '25px',
          width: '40%',
        }}
      >
        <Button
          onButtonClick={handleSave}
          type="button"
          title="Save Changes"
        >
          Save Changes
        </Button>
      </div>
    </>
  );
};

export default FilterSetting;
