import React, { useState } from 'react';

// import SPSelect from '../../../../../../../components/SPSelect';
import SelectBox from '../../Shared/SelectBox/SelectBox';

const ChangePriority = props => {
  return (
    <>
      <div className="input-label" style={{ marginTop: '25px' }}>
        Priority
      </div>
      {/* <SPSelect
        onChange={props.handlePriorityChange}
        items={props.severityArr}
        isDiagram={true}
        selected={
          props.selectedNode.ticketPriorityId !== ''
            ? props.selectedNode.ticketPriorityId
            : props.severity.key
        }
      /> */}

      <SelectBox
        value={!props.riskRateLoader ? props.severity.key: ''}
        placeholder="Select"
        loading={props.riskRateLoader}
        event={props.handlePriorityChange}
        options={props.severityArr}
      />
    </>
  );
};

export default ChangePriority;
