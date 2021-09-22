import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { isArray, map } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Row, Col, Collapse,Modal } from 'antd';
import { getUsersList } from '../../../../../actions/usersManagement';
import {
  getTaskDepartment,
  getTaskCategories,
  getTasks,
} from '../../../../../actions/tasksManagement';
import { incidentDetails, deleteIncidentTaskAction } from '../../../../../actions/incidentManagement';
import SPButton from '../../../../../components/SPButton';
import { IconDiv } from '../../../../../components/SPSingleSelectDropdown/StyledComponents';
import CancelIcon from '../../../../../assets/svgIcon/cancelIcon';
import Pencil from '../../../../../assets/svgIcon/pencil';
import DeleteIcon from '../../../../../assets/svgIcon/cancelIcon';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  StyledModal,
  StyledHeader,
  StyledCol,
  StyledRow,
  HeaderText,
  ColText,
  StyledCollapse,
} from './styledComponents';
import PlusIcon from '../../../../../assets/svgIcon/plusIcon';
import TaskForm from '../taskForm';
import SetDocumentTitleHOC from '../../../../../HOCs/SetDocumentTitleHOC';
const { confirm, error } = Modal;
const { Panel } = Collapse;

const columns = [
  {
    title: 'NAME',
    dataIndex: 'name',
  },
  {
    title: 'ASSIGNED USER',
    dataIndex: 'assignedUser',
  },
  {
    title: 'ASSIGNED DEPARTMENT',
    dataIndex: 'assignedDepartment',
  },
  {
    title: 'STATUS',
    dataIndex: 'status',
  },
  {
    title: 'START DATE',
    dataIndex: 'startDate',
  },
  {
    title: 'END DATE',
    dataIndex: 'endDate',
  },
  {
    title: '',
    dataIndex: 'operation',
  },
];
const dateFormat = 'YYYY-MM-DD';

const getTask = data => {
  return {
    inv_name: data.inv_name,
    inv_assign_to_name: data.invAssignTo?.usr_name,
    inv_department_name: data.invDepartment?.dep_name,
    inv_assign_to_id: data.inv_assign_to_id ? String(data.inv_assign_to_id) : 0,
    inv_department: data.inv_department ? String(data.inv_department) : 0,
    inv_status: data.inv_status,
    inv_start_date: data.inv_start_date,
    inv_end_date: data.inv_end_date,
    inv_id: data.inv_id,
  };
};
const formateTasks = incidentDetailsData => {
 
  let dataStatic = {};
  for (let i = 0; i < incidentDetailsData?.data?.incidentTasks.length; i += 1) {
    const categoryId =
      incidentDetailsData?.data?.incidentTasks[i].inv_task_category ?? 0;
    const task = getTask(incidentDetailsData?.data?.incidentTasks[i]);
    if (dataStatic?.[categoryId]) {
      dataStatic[categoryId] = {
        category: incidentDetailsData?.data?.incidentTasks[i].invTaskCategory,
        tasks: [...dataStatic[categoryId]?.tasks, task],
      };
    } else {
      dataStatic[categoryId] = {
        category: incidentDetailsData?.data?.incidentTasks[i].invTaskCategory,
        tasks: [task],
      };
    }
  }
  return dataStatic;
};

function assignTaskModal({
  incidentDetailsData,
  incidentDetails,
  deleteIncidentTaskAction,
  deleteIncidentTask,
  isProcessing,
  getUsersList,
  onClose,
  visible,
  selectedCase,
  getTasks,
  tasks,
  getTaskDepartment,
  getTaskCategories,
}) {
  const [editingMode, setEditingMode] = useState();
  const [addMode, setAddingMode] = useState(false);
  const [activeKey, setActiveKey] = useState();
  const [dataStatic, setDataStatic] = useState({});



  useEffect(() => {
    if (selectedCase) {
      getUsersList();
      getTaskDepartment();
      getTaskCategories();
      incidentDetails(selectedCase.iti_id,true);
      // getTasks({inv_incidents_id:selectedCase.iti_id});
    }
  }, [selectedCase]);

  useEffect(() => {
    const tasks = formateTasks(incidentDetailsData);
    setDataStatic(tasks);
  }, [incidentDetailsData]);

  function refreshList() {
    if (selectedCase) {
      getUsersList();
      getTaskDepartment();
      getTaskCategories();
      incidentDetails(selectedCase.iti_id,true);
       //getTasks({inv_incidents_id:selectedCase.iti_id});
    }
  }

  function deleteTask(taskId){
    deleteIncidentTaskAction({id:taskId})
    
  }

  function showConfirm(key,category) {
    confirm({
      title: 'Are you sure you want to delete the task?',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      onOk() {
     
     
        console.log(dataStatic[category]);
        var items = dataStatic[category].tasks;
        items = items.filter(function(item) {
          return item.inv_id !=key;
        });
        console.log(items);
        dataStatic[category].tasks = items;
        console.log(dataStatic[category]);
        setDataStatic(dataStatic);
        deleteTask(
         key);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  useEffect(() => {
    if (deleteIncidentTask) {
     // refreshList();
    }
  }, [deleteIncidentTask]);

  const getWidth = key => '15%';

  return (
    <StyledModal
      centered
      visible={visible}
      onOk={() => {
        setEditingMode();
        setAddingMode(false);
        onClose();
      }}
      onCancel={() => {
        setEditingMode();
        setAddingMode(false);
        onClose();
      }}
      footer={null}
      width={1210}
    >
      <StyledHeader>
        <text>Assign Tasks</text>
        <IconDiv>
          <CancelIcon />
        </IconDiv>
      </StyledHeader>
      <StyledRow type="header">
        {map(columns, item => {
          const width = getWidth(item.dataIndex);

          return (
            <StyledCol width={width}>
              <HeaderText>{item.title}</HeaderText>
            </StyledCol>
          );
        })}
      </StyledRow>
      <div className="task-modal">
        <StyledCollapse
          defaultActiveKey={Object.keys(dataStatic).map((r, i) => i)}
          activeKey={
            activeKey ? activeKey : Object.keys(dataStatic).map((r, i) => i)
          }
          onChange={key => {
            setActiveKey(key);
          }}
        >
          {map(Object.keys(dataStatic), (item, index) => {
            const tasks = dataStatic?.[item]?.tasks;
            let rows = null;
            const tempRow = Object.entries(tasks);
            if (isArray(tasks)) {
              rows = tasks.map(task => {
                let row;

                if (editingMode === task?.inv_id) {
                  row = (
                    <TaskForm
                      type="edit"
                      selectedCase={selectedCase}
                      item={task}
                      onSave={(newTask, id) => {
                        console.log({ newTask, id });
                        setAddingMode(false);
                        setEditingMode(null);
                        const category = newTask?.invTaskCategory?.tca_id ?? 0;
                        const task = getTask(newTask);
                        const tasks = dataStatic[category].tasks ?? [];
                        const i = tasks.findIndex(
                          t => String(t?.inv_id) === String(id)
                        );
                        if (i > -1) {
                          dataStatic[category].tasks[i] = task;
                        }
                        setDataStatic(dataStatic);
                      }}
                      onCancel={() => setEditingMode(null)}
                    />
                  );
                } else {
                  row = (
                    <StyledRow>
                      {map(Object.entries(task), ([key, value]) => {
                        const width = getWidth(key);
                        if (
                          key !== 'inv_id' &&
                          key !== 'inv_assign_to_id' &&
                          key !== 'inv_department'
                        ) {
                          return (
                            <StyledCol width={width}>
                              <ColText>{value}</ColText>
                            </StyledCol>
                          );
                        }
                      })}
                      <StyledCol width="6%" justifyContent="center">
                        <IconDiv
                          role="presentation"
                          onClick={() => {
                            setEditingMode(task?.inv_id);
                          }}
                        >
                          <Pencil />
                        </IconDiv>
                        <IconDiv
                          role="presentation"
                          onClick={() => {
                            showConfirm(task?.inv_id,item);
                          }}
                        >
                          <DeleteIcon />
                        </IconDiv>
                      </StyledCol>
                    </StyledRow>
                  );
                }
                return row;
              });
            }

            return (
              <Panel
                header={
                  dataStatic?.[item]?.category?.tca_name ?? 'Category N/A'
                }
                key={index}
              >
                {rows}
              </Panel>
            );
          })}
        </StyledCollapse>
      </div>
      {addMode && (
        <TaskForm
          selectedCase={selectedCase}
          addMode={addMode}
          onCancel={() => {
            setAddingMode(false);
          }}
          onSave={newTask => {
            setAddingMode(false);
            const category = newTask?.invTaskCategory?.tca_id ?? 0;
           
            const task = getTask(newTask);
            if(category in dataStatic){
              dataStatic[category].tasks = [...dataStatic[category]?.tasks, task];
              setDataStatic(dataStatic);
            }else{
              refreshList();
            }
            
          }}
        />
      )}
      <Row justify="end" style={{ padding: 20 }}>
        <Col>
          <SPButton
            title="Add Task"
            size="small"
            type="primary"
            image={<PlusIcon />}
            onButtonClick={() => setAddingMode(true)}
          />
        </Col>
      </Row>
    </StyledModal>
  );
}

const mapStateToProps = state => {
  return {
    tasks: state.tasksListStore.listData,
    isProcessing: state.incidentDetails.isProcessing,
    incidentDetailsData: state.incidentDetails.listData,
    deleteIncidentTask: state.deleteIncidentTask.result,
  };
};

const mapDispatchToProps = {
  getTasks,
  getUsersList,
  incidentDetails,
  getTaskDepartment,
  getTaskCategories,
  deleteIncidentTaskAction
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC
)(assignTaskModal);
