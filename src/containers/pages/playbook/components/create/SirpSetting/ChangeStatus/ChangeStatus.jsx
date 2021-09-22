import React, { useState } from 'react';
import SPSelect from '../../../../../../../components/SPSelect';
import SelectBox from '../../Shared/SelectBox/SelectBox';

const ChangeStatus = props => {
  return (
    <>
      <div className="input-label" style={{ marginTop: '25px' }}>
        Status
      </div>
      {/* <SPSelect
        onChange={props.handleStatusChange}
        items={props.statusOptions}
        isDiagram={true}
        selected={
          props.selectedNode.ticketstatus !== ''
            ? props.selectedNode.ticketstatus
            : props.status.key
        }
      /> */}
        <SelectBox
        value={props.status.key}
        placeholder="Select"
        loading={false}
        event={props.handleStatusChange}
        options={props.statusOptions}
      />
    </>
  );
};

export default ChangeStatus;
