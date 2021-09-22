import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isArray } from 'lodash';
import { StyledBox, StyledDiv } from './StyledComponents';
import { SPTable } from '../../../../../components/AssetTableSelection/StyledComponents';
import SPButton from '../../../../../components/SPButton';
import SPRiskTag from '../../../../../components/SPRiskTag';
import CreateTask from '../createTask';


const columns = [
  {
    title: 'TYPE',
    dataIndex: 'type',
    editable: false,
  },
  {
    title: 'NAME',
    dataIndex: 'name',
    editable: false,
  },
  {
    title: 'ASSIGNED BY',
    dataIndex: 'assignedBy',
    editable: false,
  },
  {
    title: 'ASSIGNED TO',
    dataIndex: 'assignedBy',
    editable: false,
  },
  {
    title: 'START DATE',
    dataIndex: 'startDate',
    editable: false,
  },
  {
    title: 'END DATE',
    dataIndex: 'endDate',
    editable: false,
  },
  {
    title: 'STATUS',
    dataIndex: 'status',
    render: t => {
      if (t === 'Done') {
        return <SPRiskTag type="success" text={t} />;
      }
      if (t === 'In Progress') {
        return <SPRiskTag type="primary" text={t} />;
      }

      if (t === 'Open') {
        return <SPRiskTag type="warning" text={t} />;
      }
    },
  },
];
const totalRecord = 10;

function TaskList({
  tasks,
  taskCategories,
  taskDepartments,
  usersList,
  onSubmit,
}) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const onCloseModal = () => setIsCreateModalOpen(false);
  if (!isArray(tasks)) return null;
  return (
    <StyledBox>
      <SPTable
        columns={columns}
        dataSource={tasks.map(t => {
          return {
            type: t?.invTaskCategory?.tca_name,
            name: t?.inv_name,
            assignedBy: t?.invLaunchedBy?.usr_name,
            assignedTo: t?.invAssignTo?.usr_name,
            startDate: t?.inv_start_date,
            endDate: t?.inv_end_date,
            status: t?.inv_status,
          };
        })}
        scroll={{ y: 350 }}
        pagination={{
          hideOnSinglePage: true,
          pageSize: totalRecord,
        }}
        emptyText="No Data"
        noBottomPadding
        noTitle
      />
      <StyledDiv>
        <SPButton
          title="Create Task"
          type="primary"
          size="small"
          onButtonClick={() => setIsCreateModalOpen(true)}
        />
        <CreateTask
          onClose={onCloseModal}
          visible={isCreateModalOpen}
          taskCategories={taskCategories}
          taskDepartments={taskDepartments}
          usersList={usersList}
          onSubmit={onSubmit}
        />
      </StyledDiv>
    </StyledBox>
  );
}

export default TaskList;

TaskList.propTypes = {
  tasks: PropTypes.array,
};
