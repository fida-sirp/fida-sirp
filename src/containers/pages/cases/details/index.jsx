import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Modal } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SetDocumentTitleHOC from '../../../../HOCs/SetDocumentTitleHOC';
import AuthTokenHOC from '../../../../HOCs/AuthTokenHOC';
import { concat, includes, filter, map, isArray } from 'lodash';
import PageHeader from '../../incidentManagement/components/pageHeader';
import ScoreComponent from '../../incidentManagement/components/scoreComponent';
import ActivityBox from '../../incidentManagement/components/activityBox';
import IncidentDetailsBox from '../../incidentManagement/components/incidentDetailsBox';
import { TabContentDiv } from './StyledComponents';
import TaskList from '../../incidentManagement/components/taskList';
import AddMember from '../../incidentManagement/components/addMember';
import EvidenceTable from '../../incidentManagement/components/evidenceTable';
import AddRelatedIncident from '../../incidentManagement/components/addRelatedIncident';
import SPTab from '../../../../components/SPTab';
import SendEmailModal from '../../incidentManagement/components/SendEmailModal';
import RemadiationEdit from '../../incidentManagement/components/RemadiationEdit';
import CommentsList from '../../incidentManagement/components/CommentsList';
import TreeChart from '../../../../components/TreeChart';
import { StyledCol } from './StyledComponents';
import {
  caseDetails,
  postComment,
  listCaseDisposition,
  editCase,
  exportPdf,
  deleteCaseAsset,
  addMemberToCase,
  sendEmail,
} from '../../../../actions/caseManagement';
import {
  getTaskCategories,
  getTaskDepartment,
  createTask,
} from '../../../../actions/tasksManagement';
import { getUsersList } from '../../../../actions/usersManagement';
import {
  listLocationUsers,
  getCaseManagementSeverityAction,
  getCaseManagementcategoryAction,
  getCaseManagementsubCategoryAction,
  getCaseManagementdispositionAction,
  getCaseManagementsubDispositionAction,
  getCaseManagementlocationAction,
  getCaseManagementdetectionMethodsAction,
  getCaseManagementartifactsAction,
  getCaseActionAppAction,
  runAction,
  addArtifactAction,
  clearRunAction
} from '../../../../actions/caseMasterData';

import {
  addEvidence,
  listLocationUsersGroup
} from '../../../../actions/incidentMasterData';
import {
  addMemberToIncident,
  deleteComment,
  downloadAsset,
} from '../../../../actions/incidentManagement';
import { getArtifactListAction } from '../../../../actions/incidentMasterData';
import {
  getUserEmailList,
  listAsset,
  getRunPlaybookData,
  executePlaybook,
} from '../../../../actions/threatIntelligence';
import API from '../../../../config/endpoints.config';
import AssetsList from '../../incidentManagement/components/AssetsList';
import { evidentApiToClientTransform } from './utils/ApiToClientDataMapper';
import { Formik, isObject } from 'formik';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import SPTimeLine from '../../../../components/SPTimeLine';
import Vulnerabilities from '../components/Vulnerabilities';
import Threats from '../components/Threats';
import Risks from '../components/Risks';
import { SModal } from '../../assets/components/TemplateModal/StyledComponents';
import Form from 'antd/lib/form/Form';
import { RowDiv } from '../../incidentManagement/components/incidentDetailsBox/StyledComponents';
import SelectBox from '../../../../components/SelectBox';
import SPButton from '../../../../components/SPButton';
import { ExecuteBtn } from '../../ThreatIntelligence/components/evidenceTable/StyledComponents';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  app_execute_type: Yup.string().required('Required'),
});

const initialValues = {
  app_execute_type: '',
};

const templateList = [
  { key: 'template', value: 'template', label: 'Template' },
  { key: 'notify', value: 'notify', label: 'Notify' },
  { key: 'follow-up', value: 'follow-up', label: 'Follow-up' },
];

function CaseDetails({
  caseDetails,
  postComment,
  editCase,
  exportPdf,
  deleteCaseAsset,
  sendEmail,
  getTaskCategories,
  getTaskDepartment,
  createTask,
  listLocationUsers,
  getCaseManagementsubCategoryAction,
  getCaseManagementsubDispositionAction,
  getCaseActionAppAction,
  runAction,
  addArtifactAction,
  getUserEmailList,
  listAsset,
  getArtifactListAction,
  addMemberToIncident,
  deleteComment,
  executePlaybook,
  downloadAsset,
  getRunPlaybookData,
  // state
  caseDetailsState,
  threatIntelligentUserEmailList,
  caseMasterActionApps,
  incidentUsersData,
  incidentAssets,
  casePostComment,
  taskCategories,
  taskDepartments,
  usersList,
  caseSendEmail,
  caseMasterSeverity,
  disposition,
  caseMasterCategory,
  caseMasterSubCategory,
  caseMasterDisposition,
  caseMasterSubDisposition,
  caseMasterDetectionMethods,
  listLocationUsersGroup,
  caseMasterArtifacts,
  caseMasterLocation,
  userStore,
  incidenArtifactList,
  threatIntelligenceRunPlayBook,
  addEvidence,
  caseRunActionStore,
  clearRunAction,
  incidentUsersGroupData,
  incidentMasterActionRun
}) {
  const history = useHistory();
  const id = location.pathname.split('/').pop();
  const [eviList, setEviList] = useState([]);
  const [comments, setComments] = useState([]);
  const [incidentMemberList, setIncidentMemberList] = useState(null);
  const [assetsList, setAssetsList] = useState(null);
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [advisories, setAdvisories] = useState([]);
  const [risks, setRisks] = useState([]);

  const { caseType } = useParams();
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

  const onAddComment = (comment, file, callback = () => null) => {
    var FormData = require('form-data');
    var data = new FormData();
    data.append('ico_comment', comment);
    if (file) {
      data.append('commentAttachment', file);
    }
    if (comment) {
      postComment({
        id: caseDetailsState?.data?.iti_id,
        payload: {
          data,
          callback: response => {
            callback();
            setComments([...comments, response]);
          },
        },
      });
    }
  };

 

  let treeChartData = [];
  var idsMap = {};
  if (caseDetailsState?.data?.treeGraph) {
    console.log(
      'caseDetailsState?.data?.treeGraph ',
      caseDetailsState?.data?.treeGraph
    );
    const treeGraph = caseDetailsState?.data?.treeGraph;
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

  console.log({ treeChartData });


  useEffect(() => {
    var id = location.pathname.split('/').pop();
    getCaseActionAppAction();
    setselecteAdvisorieId(id);
    caseDetails(id, caseType);
    getUsersList();
    listLocationUsersGroup();
    listLocationUsers();
  }, []);

  useEffect(() => {
    if(caseRunActionStore.isSuccess){
  

      if (caseRunActionStore?.result[0]?.['form-data']?.app_multi_config_allowed == "true") {
        
      }else{
        var id = location.pathname.split('/').pop();
        caseDetails(id, caseType);
        clearRunAction();
      }
     
    }
  }, [caseRunActionStore]);

  

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
    getCaseManagementsubCategoryAction({ cat_id });
  };

  const getSubDisposition = disp_id => {
    getCaseManagementsubDispositionAction({ disp_id });
  };

  useEffect(() => {
    // prefill state here
    setIncidentList(caseDetailsState?.data?.relatedCases ?? []);
    setComments(caseDetailsState?.data?.incidentComments ?? []);
    setIncidentTasks(caseDetailsState?.data?.incidentTasks ?? []);
    const tranformedEvidence = evidentApiToClientTransform(
      caseDetailsState?.data?.incidentArtifact,
      caseDetailsState?.data?.incidentApps
    );
    console.log({tranformedEvidence:tranformedEvidence});
    setEviList(tranformedEvidence);

    setClosedRemidiation(caseDetailsState?.data?.iti_closed_remediation);
    setDetailsRemidiation(caseDetailsState?.data?.iti_suggestions_recovery);
    setAssetsList(caseDetailsState?.data?.incidentAssets?.[0]);
    setVulnerabilities(caseDetailsState?.data?.vulnerabilities);
    setAdvisories(caseDetailsState?.data?.advisories);
    setRisks(caseDetailsState?.data?.risks);
    setRelatedAssetDetails(caseDetailsState?.data?.incidentAssets);
    setSelectedMembers(
      isObject(caseDetailsState?.data?.members?.[0].users)
        ? Object.keys(caseDetailsState?.data?.members?.[0].users)
        : []
    );

    setExistingAttachedMember(
      getMembersArray()
    );
  }, [caseDetailsState]);

 


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

  function getMembersArray(){
    var data = [];
      if(isObject(caseDetailsState?.data?.members?.[0]?.users)){
        var users = Object.keys(caseDetailsState?.data?.members?.[0]?.users);
        for(var i = 0; i < users.length; i++){
          data.push("u_"+users[i]);
        }
      }
      if(isObject(caseDetailsState?.data?.members?.[0]?.groups)){
        var groups = Object.keys(caseDetailsState?.data?.members?.[0]?.groups);
        for(var i = 0; i < groups.length; i++){
          data.push("g_"+groups[i]);
        }
      }
      return data;

  }

  function showConfirm(data) {
    Modal.confirm({
      title: 'Please Confirm if you want to remove the artifact',
      centered: true,
      okText: 'Confirm',
      onOk() {
        onAddArtifactAction(data);
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
          url: `${API.caseManagementModule.task.create}/${inv_id}`,
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

  const onClearRunAction = data => {
    clearRunAction();
  }

  const onSubmitTask = values => {
    const reqPayload = values;
    reqPayload.inv_launched_by_id =
      userStore?.userProfile?.data?.profile?.[0]?.usr_id;
    reqPayload.inv_incidents_id = caseDetailsState?.data?.iti_id;

    if (reqPayload?.inv_id) {
      reqPayload.http_method = 'put';
    }

    createTask({
      url: reqPayload?.inv_id
        ? `${API.caseManagementModule.task.create}/${reqPayload?.inv_id}`
        : API.caseManagementModule.task.create,
      payload: reqPayload,
      callback: newTask => {
        console.log({ newTask });
        if (reqPayload?.inv_id) {
          const updtedIndex = incidentTasks.findIndex(
            t => String(t.inv_id) === String(reqPayload?.inv_id)
          );
          console.log({ newTask, updtedIndex });
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
    editCase({
      data: {
        data,
        id: caseDetailsState?.data?.iti_id,
        url: API.cases + '/' + caseDetailsState?.data?.iti_id,
        atOnce: true,
      },
      caseType,
      callback: () => {
        caseDetails(caseDetailsState?.data?.iti_id, caseType);
      },
    });
  };

  const onEditIncidentManagement = data => {
    editCase({
      ...data,
      id: caseDetailsState?.data?.iti_id,
      url:
        API.incidentManagement +
        '/custom-update?id=' +
        caseDetailsState?.data?.iti_id,
      callback: response => {
        console.log({ response });
        if (data?.iti_compromised_asset) {
          if (isArray(response?.incidentAssets?.[0])) {
            setAssetsList(response?.incidentAssets?.[0]);
          }
        }
      },
    });
  };

  const onExportPDF = () => {
    exportPdf(
      `${API.incidentManagementModule.export.pdf}?id=${caseDetailsState?.data?.iti_id}`
    );
  };

  const onDeleteAsset = asset_id => {
    Modal.confirm({
      title: 'Please Confirm if you want to delete asset',
      centered: true,
      okText: 'Confirm',
      onOk() {
        deleteCaseAsset({
          id: caseDetailsState?.data?.iti_id,
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
    data.t_ID = caseDetailsState?.data?.iti_id;
    runAction(data);
  };

  const onAddArtifactAction = data => {
    addArtifactAction({
      ...data,
      id: caseDetailsState?.data?.iti_id,
      callback: () => {
        caseDetails(caseDetailsState?.data?.iti_id);
      },
    });
  };

  const onAddArtifactFromRightClickAction = data => {
    addArtifactAction({
      ...data,
      id: caseDetailsState?.data?.iti_id,
      url: API.caseManagementModule.artifact.add,
      callback: () => {
        caseDetails(caseDetailsState?.data?.iti_id);
      },
    });
  };

  const onDeleteComment = (ico_id, ico_attachment) => {
    deleteComment({
      data: { ico_id, ico_attachment },
      callback: () => {
        if (ico_attachment) {
          const i = comments.findIndex(c => c?.ico_id === ico_id);
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



  const commonTabs = [
    {
      title: 'Timeline',
      key: 'timeline',
      component: (
        <div>
          <SPTimeLine
            id="case-time-line"
            data={
              isArray(caseDetailsState?.data?.incidentTimeLine)
                ? caseDetailsState?.data?.incidentTimeLine.map(timeline => {
                    return {
                      x: new Date(timeline?.alo_created_at),
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
              caseDetailsState?.data?.incidentActionsMapped
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
          
            downloadFile={url => {
             
              downloadAsset(url);
            }}
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
            id={caseDetailsState?.data?.iti_id}
          />
        </>
      ),
    },
  ];
  let commentAndTasksAndRemidiation = [];

  if (caseDetailsState?.data?.itiDisposition?.ids_name !== 'Vulnerability') {
    commentAndTasksAndRemidiation = [
      ...commentAndTasksAndRemidiation,
      {
        title: 'Remediation',
        key: 'remediation',
        component: (
          <div>
            <RemadiationEdit
              title="Implemented Remediation"
              data={closedRemidiation}
              isEditableEnabled={true}
              updateRediationDetails={data => {
                setClosedRemidiation(data);
                onEditIncidentManagement({
                  iti_closed_remediation: data,
                });
              }}
            />
            <RemadiationEdit
              title="Remediation Details"
              data={detailsRemidiation}
              isEditableEnabled={true}
              onEditIncidentManagement={onEditIncidentManagement}
              updateRediationDetails={data => {
                setDetailsRemidiation(data);
                onEditIncidentManagement({
                  iti_suggestions_recovery: data,
                });
              }}
            />
          </div>
        ),
      },
    ];
  }

  if (caseDetailsState?.data?.itiDisposition?.ids_name === 'Risk') {
    commentAndTasksAndRemidiation = [
      ...commentAndTasksAndRemidiation,
      {
        title: 'Risk(s)',
        key: 'risks',
        component: (
          <>
            <Risks data={isArray(risks) ? risks : []} />
          </>
        ),
      },
    ];
  }

  commentAndTasksAndRemidiation = [
    ...commentAndTasksAndRemidiation,
    {
      title: 'Comments',
      key: 'comments',
      component: (
        <TabContentDiv>
          <CommentsList
            items={comments}
            onAddComment={onAddComment}
            postingComment={casePostComment?.isProcessing}
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
          />
        </div>
      ),
    },
  ];

  let multiTabList = [...commonTabs];
  if (caseDetailsState?.data?.itiDisposition?.ids_name === 'Threat Intel') {
    multiTabList = [
      ...multiTabList,
      {
        title: 'Threat',
        key: 'threat',
        component: (
          <>
            <Threats data={isArray(advisories) ? advisories : []} />
          </>
        ),
      },
    ];
  }
  if (caseDetailsState?.data?.itiDisposition?.ids_name === 'Vulnerability') {
    multiTabList = [
      ...multiTabList,
      {
        title: 'Vulnerabilities',
        key: 'vulnerabilities',
        component: (
          <>
            <Vulnerabilities
              data={isArray(vulnerabilities) ? vulnerabilities : []}
            />
          </>
        ),
      },
    ];
  }

  multiTabList = [...multiTabList, ...commentAndTasksAndRemidiation];

  const treeChartPointClickHandler = e => {
    const pointName = e?.point?.name;
    console.log({ pointName });
    if (new RegExp('incident').test(pointName)) {
      const id = pointName.substr(pointName.indexOf('#') + 1);
      window.open(`/incidentManagement/details/${id}`, '_blank');
    }
  };

  if (caseDetailsState?.data?.itiDisposition?.ids_name === 'Incident') {
    multiTabList = [
      ...multiTabList,
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
  }


  const onTabChange = key => console.log(key);
  const onRemoveMember = SelectedKey => {
    const newList = filter(selectedMembers, memberKey => {
      return memberKey !== SelectedKey;
    });
    setSelectedMembers(newList);
  };
  const onAddMember = SelectedKey => {
    const alreadyAdded = includes(selectedMembers, SelectedKey);
    if (!alreadyAdded) {
      const newList = concat(selectedMembers, SelectedKey);
      addMemberToIncident({
        id: caseDetailsState?.data?.iti_id,
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
    console.log(isSendEmailVisible);
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
    sendEmail({ id, data, caseType });
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
        />
      ),
    },
    {
      title: `Related ${
        caseDetailsState?.data?.itiDisposition?.ids_name
          ? `${caseDetailsState?.data?.itiDisposition?.ids_name}s`
          : ''
      }`,      key: 'relatedIncident',
      component: (
        <AddRelatedIncident
          incidents={incidentList}
          selectedIncidents={selectedIncidents}
          onAdd={onAddIncident}
          type={'Case'}
          onRemove={onRemoveIncident}
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
    if (caseSendEmail.isSuccess) {
      setIsSendEmailVisible(false);
    }
  }, [caseSendEmail]);

  
  let sirpScore = 0;

  const obj = caseDetailsState?.data?.incidentAssets;
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
          onSubmit={(values, { resetForm }) => {
            executePlaybook({
              id: caseDetailsState?.data?.iti_id,
              playBookID: values.app_execute_type,
              playbookName: runPlayBookList.find(r => {
                return String(r?.key) === String(values.app_execute_type);
              })?.label,
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

      <PageHeader
        onRunAction={data => {
    
          onRunAction(data);
        }}
        setRunPlayBook={() => {
          getRunPlaybookData();
          setRunPlayBook(!runPlayBook);
        }}
        onClickSendEmail={onClickSendEmail}
        onExportPDF={onExportPDF}
        onClose={onClose}
        incidentMasterActionApps={caseMasterActionApps?.result}
        type={caseDetailsState?.data?.iti_type +" Case"}
        incidentId={caseDetailsState?.data?.iti_tid}
        incidentTitle={caseDetailsState?.data?.iti_subject}
      />
      
      <Row gutter={[20, 20]}>
        <Col xxl={18} xl={24}>
          <IncidentDetailsBox
            incident={caseDetailsState?.data}
            formMaster={{
              severity: caseMasterSeverity?.result,
              members: incidentMemberList,
              disposition: disposition,
              incidentMasterCategory: caseMasterCategory,
              incidentMasterSubCategory: isArray(
                caseMasterSubCategory?.result?.items
              )
                ? caseMasterSubCategory?.result?.items.map(i => {
                    return {
                      label: i?.msc_name,
                      value: i?.msc_name,
                      key: i?.msc_name,
                    };
                  })
                : [],

              incidentMasterDisposition: caseMasterDisposition,
              incidentMasterSubDisposition: caseMasterSubDisposition,
              incidentMasterDetectionMethods: caseMasterDetectionMethods,
              incidentMasterArtifacts: caseMasterArtifacts,
              incidentMasterLocation: caseMasterLocation,
              incidentAssets: incidentAssets,
              incidenArtifactList,
            }}
            onChangeCategory={category => {
              getSubCategory(category);
            }}
            onChangeDisposition={disposition => {
              getSubDisposition(disposition);
            }}
            updateDisposition={disposition => {
              onEditIncidentManagement({
                iti_disposition_id: parseInt(disposition),
              });
            }}
            onChangeSubCategoryAction={subCat => {
              onEditIncidentManagement({
                iti_category_details: isArray(subCat)
                  ? subCat.filter(s => s !== '' && s !== undefined)
                  : subCat,
              });
            }}
            onFormSubmit={values => {
              onEditIncidentManagementFromEditForm(values);
            }}
            onAddArtifactAction={values => {
              onAddArtifactFromRightClickAction(values);
            }}
            drawerTitle="Case Edit"
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
          <ActivityBox activities={caseDetailsState?.data?.incidentTimeLine} />
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
    caseMasterActionApps: state.caseMasterActionApps,
    threatIntelligentUserEmailList: state.threatIntelligentUserEmailList,
    caseSendEmail: state.caseSendEmail,
    caseDetailsState: state.caseDetails.listData,
    incidentUsersData: state.caseMasterStore.users,
    casePostComment: state.casePostComment,
    taskCategories: state.taskCategories,
    taskDepartments: state.taskDepartments,
    usersList: state.usersList,
    taskCreated: state.taskCreate,
    userStore: state.userStore,
    caseMasterSeverity: state.caseMasterSeverity,
    disposition: state.caseDispositionStore.listData,
    caseMasterCategory: state.caseMasterCategory,
    caseMasterSubCategory: state.caseMasterSubCategory,
    caseMasterDisposition: state.caseMasterDisposition,
    caseMasterSubDisposition: state.caseMasterSubDisposition,
    caseMasterDetectionMethods: state.caseMasterDetectionMethods,
    caseMasterArtifacts: state.caseMasterArtifacts,
    caseMasterLocation: state.caseMasterLocation,
    incidentAssets: state.threatIntelligenceAsset,
    incidenArtifactList: state.incidenArtifactList,
    threatIntelligenceRunPlayBook: state.threatIntelligenceRunPlayBook,
    caseRunActionStore: state.caseRunAction,
    incidentMasterActionRun: state.caseRunAction,
    incidentUsersGroupData: state.incidentMasterStore.userGroups,
  };
};

const mapDispatchToProps = {
  caseDetails,
  postComment,
  listCaseDisposition,
  editCase,
  exportPdf,
  deleteCaseAsset,
  addMemberToCase,
  sendEmail,
  getTaskCategories,
  getTaskDepartment,
  createTask,
  listLocationUsers,
  getCaseManagementSeverityAction,
  getCaseManagementcategoryAction,
  getCaseManagementsubCategoryAction,
  getCaseManagementdispositionAction,
  getCaseManagementsubDispositionAction,
  getCaseManagementlocationAction,
  getCaseManagementdetectionMethodsAction,
  getCaseManagementartifactsAction,
  getCaseActionAppAction,
  runAction,
  clearRunAction,
  addArtifactAction,
  getUserEmailList,
  listAsset,
  getArtifactListAction,
  addMemberToIncident,
  deleteComment,
  listLocationUsersGroup,
  getRunPlaybookData,
  executePlaybook,
  downloadAsset,
  addEvidence,
  
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  SetDocumentTitleHOC,
  AuthTokenHOC
)(CaseDetails);
