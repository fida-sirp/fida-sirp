
import React from 'react';

import InputBox from '../../../../../../../components/InputBox';
import TextAreaBox from '../../../../../../../components/TextAreaBox';
import SelectBox from '../../Shared/SelectBox/SelectBox';

const AssignTask = props => {
  return (
    <>
      <div style={{ marginTop: '25px' }}>
        <span className="input-label">Task</span>
        <InputBox
          onInputChange={props.handleTaskNameChange}
          value={
            props.taskName
          }
          type="text"
          id="task_name"
          name="task"
          placeholder="Task"
          width="260"
        />
      </div>

      <div style={{ marginTop: '25px' }}>
        <span className="input-label">Task description</span>
        <TextAreaBox
          onInputChange={props.handleTaskDescriptionChange}
          value={
            props.taskDescription
          }
          type="text"
          id="task_description"
          name="task_description"
          placeholder="Task description"
          width="260"
        />
      </div>
      <div className="input-label" style={{ marginTop: '25px' }}>
        <span className="input-label">Task category</span>
      </div>
      {/* <SPSelect
        onChange={props.handleTaskCategoryChange}
        items={props.taskCategories}
        isDiagram={true}
        selected={
          props.selectedNode.taskCategory !== ''
            ? props.selectedNode.taskCategory
            : props.selectedTaskCategory.key
        }
      /> */}
      <SelectBox
        value={props.selectedTaskCategory.key}
        placeholder="Select a category task"
        loading={props.categoryTaskLoader}
        event={props.handleTaskCategoryChange}
        options={props.taskCategories}
      />

      <div className="input-label" style={{ marginTop: '25px' }}>
        <span className="input-label">Assigned</span>
      </div>
{/* 
      <SPSelect
        onChange={props.handleAssignTo}
        items={props.members}
        isDiagram={true}
        selected={
          props.selectedNode.assign_to_id !== ''
            ? props.selectedNode.assign_to_id
            : props.selectedAssigned.key
        }
      /> */}

      <SelectBox
        value={props.selectedAssigned.key}
        placeholder="Select"
        loading={props.assignToLoader}
        event={props.handleAssignTo}
        options={props.members}
      />

    </>
  );
};

export default AssignTask;
