import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Modal } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SetDocumentTitleHOC from '../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../HOCs/AuthTokenHOC';
import { concat, includes, filter, map, isArray } from 'lodash';
import PageHeader from '../components/pageHeader';
import ScoreComponent from '../components/scoreComponent';
import ActivityBox from '../components/activityBox';
import IncidentDetailsBox from '../components/incidentDetailsBox';
import { TabContentDiv } from './StyledComponents';
import TaskList from '../components/taskList';
import AddMember from '../components/addMember';
import TabReportBox from '../components/tabReportBox';
import EvidenceTable from '../components/evidenceTable';
import AddRelatedIncident from '../components/addRelatedIncident';
import SPTab from '../../../../components/SPTab';
import SendEmailModal from '../components/SendEmailModal';
import RemadiationEdit from '../components/RemadiationEdit';
import CommentsList from '../components/CommentsList';
import TimelineBox from '../components/TimelineBox';
import TreeGraph from '../components/TreeGraph';
import TreeChart from '../../../../components/TreeChart';
import { StyledCol } from './StyledComponents';
// import AffectedVendor from '../../ThreatIntelligence/components/affectedVendors';
import {
  incidentDetails,
  postComment,
  listIncidentDisposition,
  editIncident,
  exportPdf,
  deleteIncidentAsset,
  addMemberToIncident,
  sendEmail,
  deleteComment,
  downloadAsset,
} from '../../../../actions/incidentManagement';
import {
  getTaskCategories,
  getTaskDepartment,
  createTask,
} from '../../../../actions/tasksManagement';
import { getUsersList } from '../../../../actions/usersManagement';
import {
  listLocationUsers,
  getIncidentManagementSeverityAction,
  getIncidentManagementcategoryAction,
  getIncidentManagementsubCategoryAction,
  getIncidentManagementdispositionAction,
  getIncidentManagementsubDispositionAction,
  getIncidentManagementlocationAction,
  getIncidentManagementdetectionMethodsAction,
  getIncidentManagementartifactsAction,
  getIncidentActionAppAction,
  runAction,
  addArtifactAction,
  getArtifactListAction,
  listLocationUsersGroup,
  addEvidence,
  clearRunAction
} from '../../../../actions/incidentMasterData';
import {
  listAsset,
  getUserEmailList,
  getRunPlaybookData,
  executePlaybook,

} from '../../../../actions/threatIntelligence';
import API from '../../../../config/endpoints.config';
import AssetsList from '../components/AssetsList';
import { evidentApiToClientTransform } from './utils/ApiToClientDataMapper';
import { Formik, isObject } from 'formik';
import * as Yup from 'yup';

import { useHistory } from 'react-router-dom';
import SPTimeLine from '../../../../components/SPTimeLine';
import { SModal } from '../../assets/components/TemplateModal/StyledComponents';
import Form from 'antd/lib/form/Form';
import { RowDiv } from '../components/incidentDetailsBox/StyledComponents';
import SelectBox from '../../../../components/SelectBox';
import SPButton from '../../../../components/SPButton';
import { ExecuteBtn } from '../../ThreatIntelligence/components/evidenceTable/StyledComponents';

const templateList = [
  { key: 'template', value: 'template', label: 'Template' },
  { key: 'notify', value: 'notify', label: 'Notify' },
  { key: 'follow-up', value: 'follow-up', label: 'Follow-up' },
];

const validationSchema = Yup.object({
  app_execute_type: Yup.string().required('Required'),
});

const initialValues = {
  app_execute_type: '',
};

var idsMap = {};

function IncidentDetails({
  listLocationUsersGroup,
  incidentDetailsData,
  incidentDetails,
  postComment,
  incidentUsersData,
  listLocationUsers,
  incidentPostComment,
  getTaskCategories,
  taskCategories,
  getTaskDepartment,
  taskDepartments,
  getUsersList,
  usersList,
  createTask,
  taskCreated,
  userStore,
  getIncidentManagementSeverityAction,
  incidentMasterSeverity,
  listIncidentDisposition,
  disposition,
  getIncidentManagementcategoryAction,
  getIncidentManagementsubCategoryAction,
  getIncidentManagementdispositionAction,
  getIncidentManagementsubDispositionAction,
  getIncidentManagementlocationAction,
  getIncidentManagementdetectionMethodsAction,
  getIncidentManagementartifactsAction,
  listAsset,
  incidentMasterCategory,
  incidentMasterSubCategory,
  incidentMasterDisposition,
  incidentMasterSubDisposition,
  incidentMasterDetectionMethods,
  incidentMasterArtifacts,
  incidentMasterLocation,
  incidentAssets,
  editIncident,
  exportPdf,
  incidentDeleteAsset,
  deleteIncidentAsset,
  deleteComment,
  getIncidentActionAppAction,
  incidentMasterActionApps,
  addMemberToIncident,
  threatIntelligentUserEmailList,
  getUserEmailList,
  sendEmail,
  incidentSendEmail,
  runAction,
  clearRunAction,
  addArtifactAction,
  incidenArtifactList,
  getArtifactListAction,
  getRunPlaybookData,
  threatIntelligenceRunPlayBook,
  incidentMasterActionRun,
  executePlaybook,
  downloadAsset,
  incidentAddArtifact,
  incidentUsersGroupData,
  addEvidence,
  access,
}) {
  const history = useHistory();
  const id = location.pathname.split('/').pop();
  const [eviList, setEviList] = useState([]);
  const [comments, setComments] = useState([]);
  const [incidentMemberList, setIncidentMemberList] = useState(null);
  const [assetsList, setAssetsList] = useState(null);
  const [relatedAssetDetails, setRelatedAssetDetails] = useState(null);
  const [affectedVendorList, setAffectedVendorList] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [incidentList, setIncidentList] = useState([]);
  const [selectedIncidents, setSelectedIncidents] = useState([]);
  const [isSendEmailVisible, setIsSendEmailVisible] = useState(false);
  const [incidentTasks, setIncidentTasks] = useState([]);
  const [closedRemidiation, setClosedRemidiation] = useState();
  const [detailsRemidiation, setDetailsRemidiation] = useState();
  const [existingAttachedMember, setExistingAttachedMember] = useState([]);
  const [userEmailData, setUserEmailData] = useState();
  const [selecteAdvisorieId, setselecteAdvisorieId] = useState();

  const [runPlayBook, setRunPlayBook] = useState(false);
  const [runPlayBookList, setRunPlayBookList] = useState([]);
  const [formLoader, setFormLoader] = useState({
    subCategory: false,
    subDisposition: false,
  });

  const onAddComment = (comment, file, callback = () => null) => {
    var FormData = require('form-data');
    var data = new FormData();
    data.append('ico_comment', comment);
    if (file) {
      data.append('commentAttachment', file);
    }
    if (comment) {
      postComment({
        id: incidentDetailsData?.data?.iti_id,
        payload: {
          data,
          callback: response => {

            setComments([...comments, response]);
            callback();
          },
        },
      });
    }
  };

  const treeChartPointClickHandler = e => {
    const pointName = e?.point?.name;

    if (new RegExp('#').test(pointName)) {
      const id = pointName.substr(pointName.indexOf('#') + 1);
      window.open(`/incidentManagement/details/${idsMap?.[id]}`, '_blank');
    }
  };

  let treeChartData = [];

  if (incidentDetailsData?.data?.treeGraph) {

    const treeGraph = incidentDetailsData?.data?.treeGraph;
    const parentNode = treeGraph.parent;
    const parentText = parentNode.type + ' #' + parentNode.iti_tid;
    idsMap[parentNode.iti_tid] = parentNode?.iti_id;
    const child = treeGraph.child;
    for (const property in child) {
      treeChartData.push([parentText, property]);
      for (const property1 in child[property]) {
        treeChartData.push([
          property,
          property + ' ' + child[property][property1].value,
        ]);
        let subchild = child[property][property1]['sub-child'];
        for (const subProperty in subchild) {
          if (subchild[subProperty].length > 0) {
            for (let i = 0; i < subchild[subProperty].length; i++) {
              let subText =
                subchild[subProperty][i].ids_name +
                ' #' +
                subchild[subProperty][i].iti_tid;
              idsMap[subchild[subProperty][i].iti_tid] =
                subchild[subProperty][i].iti_id;
              treeChartData.push([
                property + ' ' + child[property][property1].value,
                subText,
              ]);
            }
          }
        }
      }
    }
  }


  const openNotification = (title, description) => {
    notification.open({
      message: title,
      description: description,
      onClick: () => { },
    });
  };

  useEffect(() => {

    getIncidentActionAppAction();
    setselecteAdvisorieId(id);
    // getIncidentManagementSeverityAction();
    // getIncidentManagementcategoryAction();
    // getIncidentManagementdispositionAction();
    // getIncidentManagementlocationAction();
    // getIncidentManagementdetectionMethodsAction();
    // getIncidentManagementartifactsAction();
    // listAsset();
    // listIncidentDisposition();
    // getArtifactListAction();
    localStorage.setItem('isEdit', 0);
    incidentDetails(id);
    listLocationUsers();
    listLocationUsersGroup();
    // getUserEmailList();
  }, []);





  useEffect(() => {
    const updatedPlaybookData = [];
    if (
      threatIntelligenceRunPlayBook?.listData &&
      Object.keys(threatIntelligenceRunPlayBook?.listData).length > 0
    ) {
      Object.entries(threatIntelligenceRunPlayBook?.listData).map(
        ([key, value], index) => {
          updatedPlaybookData.push({
            key: key,
            label: value,
            value: key,
          });
          return value;
        }
      );
      setRunPlayBookList(updatedPlaybookData);
    }
  }, [threatIntelligenceRunPlayBook?.listData]);

  useEffect(() => {
    const updatedEmailList = [];
    if (
      threatIntelligentUserEmailList?.listData &&
      Object.keys(threatIntelligentUserEmailList?.listData).length > 0
    ) {
      Object.entries(threatIntelligentUserEmailList?.listData).map(
        ([key, value], index) => {
          updatedEmailList.push({
            key: key,
            label: value,
            value: key,
          });
          return value;
        }
      );
      setUserEmailData(updatedEmailList);
    }
  }, [threatIntelligentUserEmailList?.listData]);


  const getSubCategory = cat_id => {
    getIncidentManagementsubCategoryAction({
      cat_id,
      callback: () => {
        setFormLoader({
          ...formLoader,
          subCategory: false,
        });
      },
    });
  };

  const getSubDisposition = disp_id => {
    getIncidentManagementsubDispositionAction({
      disp_id,
      callback: () => {
        setFormLoader({
          ...formLoader,
          subDisposition: false,
        });
      },
    });
  };

  useEffect(() => {
    // prefill state here
    setIncidentList(incidentDetailsData?.data?.relatedIncidents ?? []);
    setComments(incidentDetailsData?.data?.incidentComments ?? []);
    setIncidentTasks(incidentDetailsData?.data?.incidentTasks ?? []);
    const tranformedEvidence = evidentApiToClientTransform(
      incidentDetailsData?.data?.incidentArtifact,
      incidentDetailsData?.data?.incidentApps
    );
    // console.log({ incidentArtifact:incidentDetailsData?.data?.incidentArtifact });
    // console.log({ incidentApps:incidentDetailsData?.data?.incidentApps });
    // console.log({ tranformedEvidence });
    setEviList(tranformedEvidence);

    setClosedRemidiation(incidentDetailsData?.data?.iti_closed_remediation);
    setDetailsRemidiation(incidentDetailsData?.data?.iti_suggestions_recovery);
    setAssetsList(incidentDetailsData?.data?.incidentAssets?.[0]);
    setRelatedAssetDetails(incidentDetailsData?.data?.incidentAssets);
    setSelectedMembers(
      getMembersArray()
    );

    setExistingAttachedMember(
      getMembersArray()
    );
  }, [incidentDetailsData]);


  function getMembersArray(){
    var data = [];
      if(isObject(incidentDetailsData?.data?.members?.[0]?.users)){
        var users = Object.keys(incidentDetailsData?.data?.members?.[0]?.users);
        for(var i = 0; i < users.length; i++){
          data.push("u_"+users[i]);
        }
      }
      if(isObject(incidentDetailsData?.data?.members?.[0]?.groups)){
        var groups = Object.keys(incidentDetailsData?.data?.members?.[0]?.groups);
        for(var i = 0; i < groups.length; i++){
          data.push("g_"+groups[i]);
        }
      }
      return data;

  }
  
  useEffect(() => {
    let obData = [];
    if (
      Object.keys(incidentUsersData).length != 0 &&
      incidentUsersData !== undefined
    ) {
      for (const [key, value] of Object.entries(incidentUsersData.data)) {
        obData.push({
          value: Object.keys(value)[0],
          key: Object.keys(value)[0],
          label: value[Object.keys(value)[0]],
          GroupLabel: 'Users',
        });
      }
    }

    if (
      Object.keys(incidentUsersGroupData).length != 0 &&
      incidentUsersGroupData !== undefined
    ) {
      for (const [key, value] of Object.entries(incidentUsersGroupData.data)) {
        obData.push({
          value: Object.keys(value)[0],
          key: Object.keys(value)[0],
          label: value[Object.keys(value)[0]],
          GroupLabel: 'Groups',
        });
      }
    }

    
    setIncidentMemberList(obData);
  }, [incidentUsersData,incidentUsersGroupData]);

  function showConfirm(data) {
    Modal.confirm({
      title: 'Please Confirm if you want to remove the artifact',
      centered: true,
      okText: 'Confirm',
      onOk() {
        onAddArtifactAction(data, 'delete');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const onRemoveTag = (key, tagKey) => {
    const newList = map(eviList, evi => {
      let newEvi;
      if (evi.key === key) {
        const newTags = filter(evi.tags, tag => {
          return tag.tag_key !== tagKey;
        });
        newEvi = {
          key: evi.key,
          label: evi.label,
          tags: newTags,
        };
      } else {
        newEvi = evi;
      }
      return newEvi;
    });
    setEviList(newList);
  };

  const onRemoveVendor = SelectedKey => {
    const newList = filter(affectedVendorList, vendor => {
      return vendor.key !== SelectedKey;
    });
    setAffectedVendorList(newList);
  };

  const onDeleteTask = inv_id => {
    Modal.confirm({
      title: 'Please Confirm if you want to delete task',
      centered: true,
      okText: 'Confirm',
      onOk() {
        createTask({
          url: `${API.incidentManagementModule.task.create}/${inv_id}`,
          payload: {
            http_method: 'delete',
          },
          callback: () => {
            const newTasks = incidentTasks.filter(
              t => String(t.inv_id) !== String(inv_id)
            );
            setIncidentTasks([...newTasks]);
          },
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const onSubmitTask = values => {
    const reqPayload = values;
    reqPayload.inv_launched_by_id =
      userStore?.userProfile?.data?.profile?.[0]?.usr_id;
    reqPayload.inv_incidents_id = incidentDetailsData?.data?.iti_id;

    if (reqPayload?.inv_id) {
      reqPayload.http_method = 'put';
    }

    createTask({
      url: reqPayload?.inv_id
        ? `${API.incidentManagementModule.task.create}/${reqPayload?.inv_id}`
        : API.incidentManagementModule.task.create,
      payload: reqPayload,
      callback: newTask => {
        localStorage.setItem('isEdit', 0);
        incidentDetails(incidentDetailsData?.data?.iti_id);
        if (reqPayload?.inv_id) {
          const updtedIndex = incidentTasks.findIndex(
            t => String(t.inv_id) === String(reqPayload?.inv_id)
          );
        //  console.log({ newTask, updtedIndex });
          if (updtedIndex >= 0) {
            incidentTasks[updtedIndex] = newTask;
            setIncidentTasks([...incidentTasks]);
          }
        } else {
          setIncidentTasks([newTask, ...incidentTasks]);
        }
      },
    });
  };

  const onEditIncidentManagementFromEditForm = data => {
    editIncident({
      data: {
        data,
        id: incidentDetailsData?.data?.iti_id,
        url: API.incidentManagement + '/' + incidentDetailsData?.data?.iti_id,
        atOnce: true,
        type: incidentDetailsData?.data?.itiDisposition?.ids_name,
      },
      callback: () => {
        localStorage.setItem('isEdit', 0);

        incidentDetails(incidentDetailsData?.data?.iti_id);
      },
    });
  };

  const onEditIncidentManagement = data => {
    editIncident({
      ...data,
      id: incidentDetailsData?.data?.iti_id,
      url:
        API.incidentManagement +
        '/custom-update?id=' +
        incidentDetailsData?.data?.iti_id,
      type: incidentDetailsData?.data?.itiDisposition?.ids_name,
      callback: response => {
       // console.log({ response });
        if (data?.iti_compromised_asset) {
          if (isArray(response?.incidentAssets?.[0])) {
            setAssetsList(response?.incidentAssets?.[0]);
          }
        } else {
          incidentDetails(incidentDetailsData?.data?.iti_id);
        }
      },
    });
  };

  const onEditremediation = data => {
    editIncident({
      ...data,
      id: incidentDetailsData?.data?.iti_id,
      url:
        API.incidentManagement +
        '/custom-update?id=' +
        incidentDetailsData?.data?.iti_id,
      type: incidentDetailsData?.data?.itiDisposition?.ids_name,
      disableLoader:true,
      callback: response => {
     //   console.log({ response });
        if (data?.iti_compromised_asset) {
          if (isArray(response?.incidentAssets?.[0])) {
            setAssetsList(response?.incidentAssets?.[0]);
          }
        } else {
          //incidentDetails(incidentDetailsData?.data?.iti_id);
        }
      },
    });
  };

  const onExportPDF = () => {
    exportPdf(
      `${API.incidentManagementModule.export.pdf}?id=${incidentDetailsData?.data?.iti_id}`
    );
  };

  const onDeleteAsset = asset_id => {
    Modal.confirm({
      title: 'Please Confirm if you want to delete asset',
      centered: true,
      okText: 'Confirm',
      onOk() {
        deleteIncidentAsset({
          id: incidentDetailsData?.data?.iti_id,
          iti_compromised_asset: [asset_id],
          callback: () => {
            if (isArray(assetsList)) {
              setAssetsList(
                assetsList.filter(a => {
                  return String(a.ast_id) !== String(asset_id);
                })
              );
            }
          },
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const onAddAsset = id => {
    onEditIncidentManagement({
      iti_compromised_asset: [id],
    });
  };

  const onRunAction = data => {
    data.t_ID = incidentDetailsData?.data?.iti_id;
    runAction(data);
  };

  const onClearRunAction = data => {
    clearRunAction();
  }

  const onAddArtifactAction = (data, type = 'update') => {
    
    addArtifactAction({
      ...data,
      id: incidentDetailsData?.data?.iti_id,
      type,
      callback: () => {
      },
    });
  };

  useEffect(() => {
    if(incidentAddArtifact?.result){
      if(incidentAddArtifact?.result?.incidentApps){
        let tranformedEvidence1 = evidentApiToClientTransform(
          incidentDetailsData?.data?.incidentArtifact,
          incidentAddArtifact?.result.incidentApps
        );
        setEviList(tranformedEvidence1);
      }
    }
  }, [incidentAddArtifact]);

  const onAddArtifactFromRightClickAction = data => {
    addArtifactAction({
      ...data,
      id: incidentDetailsData?.data?.iti_id,
      url: API.incidentManagementModule.artifact.add,
      callback: () => {
        incidentDetails(incidentDetailsData?.data?.iti_id);
      },
    });
  };

  const onDeleteComment = (ico_id, ico_attachment) => {
    deleteComment({
      data: { ico_id, ico_attachment },
      callback: () => {
        if (ico_attachment) {
          const i = comments.findIndex(c => c?.ico_id === ico_id);
          console.log({ onDeleteComment: i });
          if (i > -1) {
            comments[i].attachment = null;
            setComments([...comments]);
          }
          return;
        }
        setComments([...comments].filter(c => c?.ico_id !== ico_id));
      },
    });
  };
  const multiTabList = [
    {
      title: 'Timeline',
      key: 'timeline',
      component: (
        <div>
          <SPTimeLine
            data={
              isArray(incidentDetailsData?.data?.incidentTimeLine)
                ? incidentDetailsData?.data?.incidentTimeLine.map(timeline => {
                  return {
                    x: new Date(timeline?.alo_created_at),
                    user: timeline?.aloUser?.usr_name,
                    name: timeline?.alo_type,
                    label: timeline?.alo_subject,
                    description: timeline?.alo_description,
                  };
                })
                : []
            }
          />
        </div>
      ),
    },
    {
      title: 'Artifacts',
      key: 'artifacts',
      component: (
        <div>
          <EvidenceTable
            ina_incident_id={id}
            addEvidence = {addEvidence}
            evidences={eviList}
            onRemoveTag={data => showConfirm(data)}
            onSelectOption={key => console.log(key)}
            incidentActionsMapped={
              incidentDetailsData?.data?.incidentActionsMapped
            }
            onRunAction={data => {
           
        
              onRunAction(data);
            }}

            onClearRunAction={data => {
              onClearRunAction(data);
            }}
            addArtifactAction={data => {
              onAddArtifactAction(data);
            }}
            incidentMasterActionRun={incidentMasterActionRun}
            downloadFile={data => {
              downloadAsset(data);
            }}
            formMaster={{
              incidenArtifactList,
            }}
            onAddArtifactAction={values => {
              onAddArtifactFromRightClickAction(values);
            }}
            checkAccess = {
             (incidentDetailsData?.data?.iti_ticket_status === "Open")?
              (access!==undefined && (access.includes("all-super-admin") ||  access.includes('update-incident-tickets'))) ? true : false :

             (incidentDetailsData?.data?.iti_ticket_status === "Close")?
             (access!==undefined && (access.includes("all-super-admin") ||  access.includes('update-close-tickets'))) ? true : false : ""

            }
          />
        </div>
      ),
    },
    {
      title: 'Assets',
      key: 'assets',
      component: (
        <>
          <AssetsList
            data={isArray(assetsList) ? assetsList : []}
            onDeleteAsset={onDeleteAsset}
            incidentAssets={incidentAssets}
            relatedAssetDetails={relatedAssetDetails}
            onAdd={id => onAddAsset(id)}
            checkAccess = {
             (incidentDetailsData?.data?.iti_ticket_status === "Open")?
              (access!==undefined && (access.includes("all-super-admin") ||  access.includes('update-incident-tickets'))) ? true : false :

             (incidentDetailsData?.data?.iti_ticket_status === "Close")?
             (access!==undefined && (access.includes("all-super-admin") ||  access.includes('update-close-tickets'))) ? true : false : ""

            }
          />
        </>
      ),
    },
    {
      title: 'Remediation',
      key: 'remediation',
      component: (
        <div>
          <RemadiationEdit
            title="Implemented Remediation"
            data={closedRemidiation}
            isEditableEnabled={
             (incidentDetailsData?.data?.iti_ticket_status === "Open")?
              (access!==undefined && (access.includes("all-super-admin") ||  access.includes('update-incident-tickets'))) ? true : false :

             (incidentDetailsData?.data?.iti_ticket_status === "Close")?
             (access!==undefined && (access.includes("all-super-admin") ||  access.includes('update-close-tickets'))) ? true : false : ""

            }
            updateRediationDetails={data => {
              setClosedRemidiation(data);
              onEditremediation({
                iti_closed_remediation: data,
              });
            }}
          />
          <RemadiationEdit
            title="Remediation Details"
            data={detailsRemidiation}
            isEditableEnabled={
             (incidentDetailsData?.data?.iti_ticket_status === "Open")?
              (access!==undefined && (access.includes("all-super-admin") ||  access.includes('update-incident-tickets'))) ? true : false :

             (incidentDetailsData?.data?.iti_ticket_status === "Close")?
             (access!==undefined && (access.includes("all-super-admin") ||  access.includes('update-close-tickets'))) ? true : false : ""

            }
            onEditIncidentManagement={onEditremediation}
            updateRediationDetails={data => {
              setDetailsRemidiation(data);
              onEditremediation({
                iti_suggestions_recovery: data,
              });
            }}
          />
        </div>
      ),
    },
    {
      title: 'Comments',
      key: 'comments',
      component: (
        <TabContentDiv>
          <CommentsList
            items={comments}
            onAddComment={onAddComment}
            postingComment={incidentPostComment?.isProcessing}
            deleteComment={onDeleteComment}
            loggedInUser={userStore?.userProfile?.data?.profile?.[0]?.usr_id}
          />
        </TabContentDiv>
      ),
    },
    {
      title: 'Tasks',
      key: 'tasks',
      component: (
        <div>
          <TaskList
            tasks={incidentTasks}
            onSubmit={onSubmitTask}
            onDelete={onDeleteTask}
            usersList={incidentMemberList}
            incidentDetails={incidentDetails}
            incidentDetailsData={incidentDetailsData?.data}
            access = {access}

          />
        </div>
      ),
    },
    {
      title: 'Tree Graph',
      key: 'treeGraph',
      component: (
        <div className="p-rleative-block" style={{ height: 500 }}>
          <TreeChart
            data={treeChartData}
            pointClickHandler={treeChartPointClickHandler}
          />
        </div>
      ),
    },
  ];


  const onTabChange = key => console.log(key);
  const onRemoveMember = SelectedKey => {
    console.log({ SelectedKey, selectedMembers });
    const newList = filter(selectedMembers, memberKey => {
      return memberKey !== SelectedKey;
    });
    addMemberToIncident({
      id: incidentDetailsData?.data?.iti_id,
      iti_handler_id: newList.join(','),
      callback: () => {
        setSelectedMembers(newList);
        setExistingAttachedMember(newList);
      },
    });
  };
  const onAddMember = SelectedKey => {
    const alreadyAdded = includes(selectedMembers, SelectedKey);
    if (!alreadyAdded) {
      const newList = concat(selectedMembers, SelectedKey);
      addMemberToIncident({
        id: incidentDetailsData?.data?.iti_id,
        iti_handler_id: newList.join(','),
        callback: () => {
          setSelectedMembers(newList);
          setExistingAttachedMember([SelectedKey, ...existingAttachedMember]);
        },
      });
    }
  };

  const onRemoveIncident = SelectedKey => {
    const newList = filter(selectedIncidents, incidentKey => {
      return incidentKey !== SelectedKey;
    });
    setSelectedIncidents(newList);
  };
  const onAddIncident = SelectedKey => {

    const alreadyAdded = includes(selectedIncidents, SelectedKey);
    if (!alreadyAdded) {
     
      const newList = concat(selectedIncidents, SelectedKey);
      setSelectedIncidents(newList);
    }
  };

  const onClickSendEmail = () => {
    getUserEmailList();
    setIsSendEmailVisible(true);
  };

  const sendEmailSubmitHandler = data => {
    const id = location.pathname.split('/').pop();
    data = {
      send_email_ids: data.to,
      send_email_cc_ids: data.cc,
      send_email_template: data.template,
      email_note: data.description,
      send_email_formats: 'notify',
    };
    sendEmail({ id, data });
  };

  const twoTabList = [
    {
      title: 'Members',
      key: 'members',
      component: (
        <AddMember
          members={incidentMemberList}
          selectedMembers={existingAttachedMember}
          onAdd={onAddMember}
          onRemove={onRemoveMember}
          checkAccess = {
           (incidentDetailsData?.data?.iti_ticket_status === "Open")?
            (access!==undefined && (access.includes("all-super-admin") ||  access.includes('update-incident-tickets'))) ? true : false :

           (incidentDetailsData?.data?.iti_ticket_status === "Close")?
           (access!==undefined && (access.includes("all-super-admin") ||  access.includes('update-close-tickets'))) ? true : false : ""

          }
          
        />
      ),
    },
    {
      title: `Related ${incidentDetailsData?.data?.itiDisposition?.ids_name
        ? `${incidentDetailsData?.data?.itiDisposition?.ids_name}s`
        : ''
        }`,
      key: 'relatedIncident',
      component: (
        <AddRelatedIncident
          incidents={[]}
          selectedIncidents={incidentList}
          onAdd={onAddIncident}
          onRemove={onRemoveIncident}
          type={incidentDetailsData?.data?.itiDisposition?.ids_name}
        />
      ),
    },
  ];

  function sendEmailModal() {
    return (
      <SendEmailModal
        isVisible={isSendEmailVisible}
        onSubmit={sendEmailSubmitHandler}
        onClose={() => setIsSendEmailVisible(false)}
        userEmailData={userEmailData}
        templateList={templateList}
      />
    );
  }

  useEffect(() => {
    if (incidentSendEmail.isSuccess) {
      setIsSendEmailVisible(false);
    }
  }, [incidentSendEmail]);


  let sirpScore = 0;

  const obj = incidentDetailsData?.data?.incidentAssets;
  if (isArray(obj) && obj.length > 0 && obj?.[0]?.[0]?.ast_s3_score) {
    sirpScore = obj?.[0]?.[0]?.ast_s3_score;
  }


  const onClose = () => {
    history.goBack();
  };


  return (
    <>
      <SModal
        title="Execute Playbook"
        visible={runPlayBook}
        onCancel={() => {
          setRunPlayBook(!runPlayBook);
        }}
        width="825px"
        footer={[]}
      >
        <Formik
          id="formik"
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            executePlaybook({
              id: incidentDetailsData?.data?.iti_id,
              playBookID: values.app_execute_type,
              playbookName: runPlayBookList.find(r => {
                return String(r?.key) === String(values.app_execute_type);
              })?.label,
              type:"incident",
              callback: () => {
                resetForm({});
                setSubmitting(false);
                setRunPlayBook(!runPlayBook);
              },
            });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            resetForm,
            setFieldValue,
          }) => (
            <Form>

              <RowDiv>
                <SelectBox
                  id="app_execute_type"
                  name="app_execute_type"
                  label="Playbook"
                  // placeholder="Power Status"
                  onInputChange={setFieldValue}
                  onBlur={handleBlur}
                  errorMessage={errors.app_execute_type}
                  value={values.app_execute_type}
                  touched={touched.app_execute_type}
                  width={575}
                  options={runPlayBookList}
                // disabled={isSubmitting}
                />
              </RowDiv>
              <RowDiv>
                <Row gutter={[19, 10]}>
                  <Col>
                    <ExecuteBtn>
                      <SPButton
                        isLoading={isSubmitting}
                        onButtonClick={handleSubmit}
                        title="Execute"
                        size="small"
                      />
                    </ExecuteBtn>
                  </Col>
                </Row>
              </RowDiv>
            </Form>
          )}
        </Formik>
      </SModal>

      <PageHeader access={access}
        onRunAction={data => {
          onRunAction(data);
        }}
        setRunPlayBook={() => {
          if (!runPlayBook) {
            getRunPlaybookData();
          }
          setRunPlayBook(!runPlayBook);
        }}
        incidentId={incidentDetailsData?.data?.iti_tid}
        incidentTitle={incidentDetailsData?.data?.iti_subject}
        onClickSendEmail={onClickSendEmail}
        onExportPDF={onExportPDF}
        onClose={onClose}
        incidentMasterActionApps={incidentMasterActionApps?.result}
        type={incidentDetailsData?.data?.itiDisposition?.ids_name}
      />
      <Row gutter={[20, 20]}>
        <Col xxl={18} xl={24}>
          <IncidentDetailsBox
            access={access}
            incident={incidentDetailsData?.data}
            incidentDetails={incidentDetails}
            formLoader={formLoader}
            formType="incident"
            formMaster={{
              incidentArtifact: incidentDetailsData?.data?.incidentArtifact,
              severity: incidentMasterSeverity?.result,
              members: incidentMemberList,
              disposition: disposition,
              incidentMasterCategory,
              incidentMasterSubCategory: isObject(
                incidentMasterSubCategory?.result
              )
                ? Object.keys(incidentMasterSubCategory?.result).map(
                  subcategory => {
                    const name =
                      incidentMasterSubCategory?.result?.[subcategory];
                    return {
                      label: name,
                      value: subcategory,
                      key: subcategory,
                    };
                  }
                )
                : [],
              incidentMasterDisposition,
              incidentMasterSubDisposition,
              incidentMasterDetectionMethods,
              incidentMasterArtifacts,
              incidentMasterLocation,
              incidentAssets,
              incidenArtifactList,
            }}
            onChangeCategory={category => {
              setFormLoader({
                ...formLoader,
                subCategory: true,
              });
              getSubCategory(category);
            }}
            onChangeDisposition={disposition => {
              setFormLoader({
                ...formLoader,
                subDisposition: true,
              });
              getSubDisposition(disposition);
            }}
            updateDisposition={disposition => {
              onEditIncidentManagement({
                iti_disposition_id: parseInt(disposition),
              });
            }}
            onChangeSubCategoryAction={subCat => {
              onEditIncidentManagement({
                iti_category_details: subCat,
              });
            }}
            onFormSubmit={values => {

              onEditIncidentManagementFromEditForm(values);
            }}
            onAddArtifactAction={values => {
              onAddArtifactFromRightClickAction(values);
            }}
          />
        </Col>
        <StyledCol xxl={6} xl={24}>
          <ScoreComponent
            value={sirpScore}
            priority="danger"
            label="SIRP Score"
          />
          <SPTab mode="twoTabs" tabs={twoTabList} onTabChange={onTabChange} />
        </StyledCol>
        <Col xxl={6} xl={24}>
          <ActivityBox
            activities={incidentDetailsData?.data?.incidentTimeLine}
          />
        </Col>
        <Col xxl={18} xl={24}>
          <SPTab tabs={multiTabList} onChange={onTabChange} />
        </Col>
      </Row>
      {sendEmailModal()}
    </>
  );
}

const mapStateToProps = state => {
  return {
    incidentDetailsData: state.incidentDetails.listData,
    incidentAddArtifact:state.incidentAddArtifact,
    incidentUsersData: state.incidentMasterStore.users,
    incidentPostComment: state.incidentPostComment,
    taskCategories: state.taskCategories,
    taskDepartments: state.taskDepartments,
    usersList: state.usersList,
    taskCreated: state.taskCreate,
    userStore: state.userStore,
    incidentMasterSeverity: state.incidentMasterSeverity,
    disposition: state.incidentDispositionStore.listData,
    incidentMasterCategory: state.incidentMasterCategory,
    incidentMasterSubCategory: state.incidentMasterSubCategory,
    incidentMasterDisposition: state.incidentMasterDisposition,
    incidentMasterSubDisposition: state.incidentMasterSubDisposition,
    incidentMasterDetectionMethods: state.incidentMasterDetectionMethods,
    incidentMasterArtifacts: state.incidentMasterArtifacts,
    incidentMasterLocation: state.incidentMasterLocation,
    incidentAssets: state.threatIntelligenceAsset,
    incidentEdit: state.incidentEdit,
    incidentDeleteAsset: state.incidentDeleteAsset,
    incidentMasterActionApps: state.incidentMasterActionApps,
    threatIntelligentUserEmailList: state.threatIntelligentUserEmailList,
    incidentSendEmail: state.incidentSendEmail,
    incidenArtifactList: state.incidenArtifactList,
    threatIntelligenceRunPlayBook: state.threatIntelligenceRunPlayBook,
    incidentMasterActionRun: state.incidentMasterActionRun,
    incidentUsersGroupData: state.incidentMasterStore.userGroups,
    access :  state?.userStore?. userProfile?.data?.access,
  };
};

const mapDispatchToProps = {
  listLocationUsersGroup,
  incidentDetails,
  listLocationUsers,
  postComment,
  getTaskCategories,
  getTaskDepartment,
  getUsersList,
  createTask,
  getIncidentManagementSeverityAction,
  listIncidentDisposition,
  getIncidentManagementcategoryAction,
  getIncidentManagementsubCategoryAction,
  getIncidentManagementdispositionAction,
  getIncidentManagementsubDispositionAction,
  getIncidentManagementlocationAction,
  getIncidentManagementdetectionMethodsAction,
  getIncidentManagementartifactsAction,
  listAsset,
  editIncident,
  exportPdf,
  deleteIncidentAsset,
  getIncidentActionAppAction,
  addMemberToIncident,
  getUserEmailList,
  sendEmail,
  runAction,
  clearRunAction,
  addArtifactAction,
  getArtifactListAction,
  deleteComment,
  getRunPlaybookData,
  executePlaybook,
  downloadAsset,
  addEvidence
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(IncidentDetails);
