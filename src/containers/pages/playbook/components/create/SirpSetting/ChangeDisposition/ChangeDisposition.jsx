
import React from 'react';

import SelectBox from '../../Shared/SelectBox/SelectBox';

const ChangeDisposition = props => {

  return (
    <>
      <div className="input-label" style={{ marginTop: '25px' }}>
        Disposition
      </div>
      {/* <SPSelect
        onChange={props.handleDispositionChange}
        items={props.disposition}
        isDiagram={true}
        selected={
          props.selectedNode.ticketdisposition !== ''
            ? props.selectedNode.ticketdisposition
            : props.selectedDisposition.key
        }
      /> */}
      {/* <Select
        value={props.selectedNode.ticketdisposition !== ''
          ? props.selectedNode.ticketdisposition
          : props.selectedDisposition.key}
        style={{ width: 170, height: 38 }}
        placeholder="Select a action"
        // loading={selectLoader}
        // dropdownStyle={}
        listHeight={400}
        dropdownAlign="center"
        defaultActiveFirstOption={true}
        onChange={props.handleDispositionChange}
      >
        {
          props.disposition.map((item, index) => {
            return (
              <Option key={item.key} value={item.key}>{item.value}</Option>
            )
          })
        }
      </Select> */}

      <SelectBox
        value={props.selectedDisposition.key}
        placeholder="Select a disposition"
        loading={props.dispositionLoader}
        event={props.handleDispositionChange}
        options={props.disposition}
      />

      <div className="input-label" style={{ marginTop: '25px' }}>
        Disposition Subcategory
      </div>
      {/* <SPSelect
        onChange={props.handleSubDispositionChanged}
        items={props.subDisposition}
        isDiagram={true}
        selected={
          props.selectedNode.ticketsubdisposition !== ''
            ? props.selectedNode.ticketsubdisposition
            : props.selectedSubDisposition.key
        }
      /> */}

      <SelectBox
        value={props.selectedSubDisposition.key}
        placeholder="Select a sub-disposition"
        loading={props.subDispositionLoader}
        event={props.handleSubDispositionChanged}
        options={props.subDisposition}
      />
    </>
  );
};

export default ChangeDisposition;
