import React from 'react';
import SelectBox from '../../Shared/SelectBox/SelectBox';

const ChangeSeverity = props => {
  return (
    <>
      <div className="input-label" style={{ marginTop: '25px' }}>
        Severity
      </div>
      {/* <SPSelect
        onChange={props.handleSeverityChange}
        items={props.severityArr}
        isDiagram={true}
        selected={
          props.selectedNode.ticketPriorityId !== ''
            ? props.selectedNode.ticketPriorityId
            : props.severity.key
        }
      /> */}
         <SelectBox
        value={props.severity.key}
        placeholder="Select"
        loading={props.severityLoader}
        event={props.handleSeverityChange}
        options={props.severityArr}
      />
    </>
  );
};

export default ChangeSeverity;
