import React from 'react';
import { Select } from 'antd';

const SelectBox = props => {
  const { Option } = Select;
  return (
    <Select
      value={props.value}
      // defaultValue={props.defaultValue}
      style={{ width: 256, height: 38 }}
      placeholder={props.placeholder}
      // loading={selectLoader}
      // dropdownStyle={}
      listHeight={400}
      dropdownAlign="center"
      loading={props.loading}
      defaultActiveFirstOption={true}
      onChange={props.event}
    >
      {props.options.map((item, index) => {
        return (
          <Option key={item.key} value={item.key}>
            {item.value}
          </Option>
        );
      })}
    </Select>
  );
};

export default SelectBox;
