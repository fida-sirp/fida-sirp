import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './styles.css';
import InputBox from '../../../../../../components/InputBox';
import SPSelect from '../../../../../../components/SPSelect';
import Button from '../../../../../../components/SPButton';
import API from '../../../../../../config/endpoints.config';
import SelectBox from '../Shared/SelectBox/SelectBox';

const PlaybookSetting = props => {
  const [playbookName, setPlaybookName] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setselectedCategory] = useState({
    value: '',
    key: '',
  });
  const [playbookStatus, setPlaybookStatus] = useState({
    value: 'Enable',
    key: '1',
  });

  const playbookStatusOptions = [
    { value: 'Enable', key: '1' },
    { value: 'Disable', key: '2' },
  ];

  const fetchCategories = async () => {
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.get(
      API.baseUrl + `/playbooks/playbook-category`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
      }
    );
    const data = response.data.data.map((item, index) => {
      return {
        key: String(item.pc_id),
        value: item.pc_name,
      };
    });
    setCategories(data);
    setselectedCategory(data[0]);
  };

  const handleInputChange = event => {
    // eslint-disable-next-line no-param-reassign
    props.playbookName.name = '';
    setPlaybookName(event.target.value);
  };

  const handleUseCaseSelectChange = key => {
    // eslint-disable-next-line no-param-reassign
    props.selectedCategory.key = '';
    const selected = categories.filter(items => {
      return items.key === key;
    });
    setselectedCategory(selected[0]);
  };

  const handlePlaybookStatusSelectChange = key => {
    // eslint-disable-next-line no-param-reassign
    props.playbookStatus.value = '';
    props.playbookStatus.key = '';
    const selected = playbookStatusOptions.filter(items => {
      return items.key === key;
    });
    setPlaybookStatus(selected[0]);
  };

  const filterPrevious = (items, key) => {
    const filter = items.filter(item => {
      return item.key === key;
    });

    return filter[0];
  };

  const filterStatus = () => {
    const filter = playbookStatusOptions.filter(item => {
      return item.value === props.playbookStatus.value;
    });

    return filter[0];
  };

  const handleSave = () => {
    const name = playbookName === '' ? props.playbookName.name : playbookName;
    let category;
    let status;

    if (props.selectedCategory.key !== '') {
      category = filterPrevious(categories, props.selectedCategory.key);
    } else {
      category = selectedCategory;
    }
    if (props.playbookStatus.value !== '') {
      const filter = filterStatus();
      // eslint-disable-next-line prefer-destructuring
      status = filter;
    } else {
      status = playbookStatus;
    }

    props.handlePlaybookSave(name, category, status);
  };

  useEffect(() => {
    fetchCategories();

    if (props.playbookStatus.value !== '') {
      const filter = filterStatus();
      setPlaybookStatus(filter);
    }
  }, []);

  return (
    <>
      <div style={{ marginTop: '25px' }}>
        <span className="input-label">Playbook name</span>
        <InputBox
          onInputChange={handleInputChange}
          value={
            props.playbookName.name ? props.playbookName.name : playbookName
          }
          type="text"
          id="playbook-name"
          name="playbook_name"
          placeholder="Playbook name"
          width="260"
        />
      </div>

      <div style={{ marginTop: '25px' }}>
        <span className="input-label">Use case family</span>
        {/* <SPSelect
          onChange={handleUseCaseSelectChange}
          items={categories}
          isDiagram={true}
          selected={
            props.selectedCategory.key
              ? props.selectedCategory.key
              : selectedCategory.key
          }
        /> */}

        <SelectBox
          value={props.selectedCategory.key
            ? props.selectedCategory.key
            : selectedCategory.key}
          placeholder="Select"
          // loading={actionsLoader}
          event={handleUseCaseSelectChange}
          options={categories}
        />
      </div>
      <div style={{ marginTop: '25px' }}>
        <span className="input-label">Playbook status</span>
        {/* <SPSelect
          onChange={handlePlaybookStatusSelectChange}
          items={playbookStatusOptions}
          isDiagram={true}
          selected={
            props.playbookStatus.key
              ? props.playbookStatus.key
              : playbookStatus.key
          }
        /> */}


        <SelectBox
          value={props.playbookStatus.key
            ? props.playbookStatus.key
            : playbookStatus.key}
          placeholder="Select"
          // loading={actionsLoader}
          event={handlePlaybookStatusSelectChange}
          options={playbookStatusOptions}
        />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '25px',
          width: '40%',
        }}
      >
        <Button onButtonClick={handleSave} type="button" title="Save Changes">
          Save Changes
        </Button>
      </div>
    </>
  );
};

export default PlaybookSetting;
