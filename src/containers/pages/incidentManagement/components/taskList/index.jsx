import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyledBox, StyledDiv } from './StyledComponents';
import { SPTable } from '../../../../../components/AssetTableSelection/StyledComponents';
import SPButton from '../../../../../components/SPButton';
import SPRiskTag from '../../../../../components/SPRiskTag';
import CreateTask from '../createTask';
import { isArray } from 'lodash';
import EyeIcon from '../../../../../assets/svgIcon/eyeIcon';
import Dustbin from '../../../../../assets/svgIcon/dustbin';
import Pencil from '../../../../../assets/svgIcon/pencil';

import SPSingleSelectDropdown from '../../../../../components/SPSingleSelectDropdown';

const columns = (setIsCreateModalOpen, setCurrentTask, onDelete, tasks, access) => [
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
    dataIndex: 'invAssignTo',
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
  {
    title: '',
    dataIndex: 'inv_id',
    render: key => {
      const deleteCases = () => {
        onDelete(key);
      };


      const moreItems = [];

      if(access!==undefined && (access.includes("all-super-admin") || access.includes("update-tasks"))){
        const updateTask=  {
          key: 'edit',
          label: 'Edit',
          icon: <Pencil />,
          onClickItem: () => {
            localStorage.setItem('isEdit', 1);
            setCurrentTask(
              tasks.find(task => String(task.inv_id) === String(key))
            );
            setIsCreateModalOpen(true);
          },
        };
        moreItems.push(updateTask);
      }
  if(access!==undefined && (access.includes("all-super-admin") || access.includes("delete-tasks"))){
      const deleteTask=  {
          key: 'delete',
          label: 'Delete',
          icon: <Dustbin />,
          onClickItem: deleteCases,
      };
      moreItems.push(deleteTask);
    }


      return (
        <SPSingleSelectDropdown
          items={moreItems}
          title="more"
          onSelect={() => null}
        />
      );
    },
  },
];
const totalRecord = 10;

function TaskList({ tasks, usersList, onSubmit, onDelete,incidentDetails,incidentDetailsData,access }) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const onCloseModal = () => {
    setCurrentTask(null);
    setIsCreateModalOpen(false);
    localStorage.setItem('isEdit', 0);
    incidentDetails(incidentDetailsData?.iti_id);
  };
  if (!isArray(tasks)) return null;
  console.log({ currentTask });
  return (
    <StyledBox>
      <SPTable
        columns={columns(setIsCreateModalOpen, setCurrentTask, onDelete, tasks,access)}
        dataSource={tasks.map(t => {
          return {
            type: t?.invTaskCategory?.tca_name,
            name: t?.inv_name,
            assignedBy: t?.invLaunchedBy?.usr_name,
            invAssignTo: t?.invAssignTo?.usr_name,
            startDate: t?.inv_start_date,
            endDate: t?.inv_end_date,
            status: t?.inv_status,
            inv_id: t?.inv_id,
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
        {(access!==undefined && (access.includes("all-super-admin") || access.includes("create-tasks")))?
        <SPButton
          title="Create Task"
          type="primary"
          size="small"
          onButtonClick={() => {
            setCurrentTask({});
            localStorage.setItem('isEdit', 1);

            setIsCreateModalOpen(true);
          }}
        /> :""}
        <CreateTask
          onClose={onCloseModal}
          visible={isCreateModalOpen}
          onSubmit={values => {
            setCurrentTask(null);
            setIsCreateModalOpen(false);
            onSubmit(values);
          }}
          currentTask={currentTask}
          usersList={usersList}
        />
      </StyledDiv>
    </StyledBox>
  );
}

export default TaskList;

TaskList.propTypes = {
  tasks: PropTypes.array,
};
