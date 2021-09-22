import { Select } from 'antd';
import React from 'react';


const AddMembers = props => {
  const { Option } = Select;

  return (
    <>
      <div className="input-label" style={{ marginTop: '25px' }}>
        Handlers
      </div>
      <Select
        mode="multiple"
        size="middle"
        placeholder="Please select"
        defaultValue={
          props.selectedNode?.handlers ?
          props.selectedNode?.handlers.length !== 0
            ? props.selectedNode.handlers
            : props.selectedMembers
            : props.selectedMembers
        }
        onChange={props.handleSelectMembers}
        style={{ width: '70%' }}
      >
        {props.members.map((items, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Option
              key={items ? items.usr_id.toString() : ''}
              value={items ? items.usr_id.toString() : ''}
            >
              {items.usr_name}
            </Option>
          );
        })}
      </Select>
    </>
  );
};

export default AddMembers;
