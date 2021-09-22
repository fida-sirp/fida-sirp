import { combineReducers } from 'redux';
import { loginStore, forgotPasswordStore, googleLoginStore } from './auth';
import { casesStore } from './cases';
import { appStore } from './app';
import { assetsStore } from './assets';
import { importAssetStore } from './importAsset';
import { googleAuthStore } from './googleAuth';
import { newAsset } from './createAsset';
import { editAsset } from './editAsset';
import { ownersStore } from './owners';
import { locationsStore } from './locations';
import { organizationsStore } from './organizations';
import { assetRulesStore } from './assetRules';
import { dispositionsStore } from './dispositions';
import { categoriesStore } from './categories';
import { assetClassificationStore } from './assetClassifications';
import { assetOSStore } from './assetOS';
import { playbookStore } from './playbooks';
import { assetTypeStore } from './assetTypes';
import { assetCategoriesStore } from './assetCategories';
import { assetEnableFieldsStore } from './assetEnableFields';
import { userStore } from './user';
import { incidentManagementStore } from './incidentManagement';
import { incidentCustomersStore } from './incidentCustomers';
import { incidentSourcesStore } from './incidentSources';
import { incidentSeverityStore } from './incidentSeverity';
import { incidentDispositionStore } from './incidentDisposition';
import { assetValueStore } from './assetValue';
import { departmentsStore } from './departments';
import { assetStatusStore } from './assetStatus';
import { assetRemoteAppStore } from './assetRemoteApp';
import { assetsMasterStore } from './assetMasterData';
import { incidentSinglePdf } from './incidentSinglePdf';
import { incidentDetails } from './incidentDetails';
import { incidentCreate } from './incidentCreate';
import { incidentEdit } from './incidentEdit';
import { incidentExcelExport } from './incidentExcelExport';
import { incidentPdfExport } from './incidentPdfExport';
import { incidentSendEmail } from './incidentSendEmail';
import { incidentMasterStore } from './incidentMasterData';
import { createTemplate } from './createTemplate';
import { templateDraft } from './templateDraft';
import { assetImportProcess } from './assetImportProcess';
import { changePasswordStore } from './changePassword';
import { incidentPostComment } from './incidentPostComment';
import { taskCategories } from './taskCategories';
import { taskDepartments } from './taskDepartments';
import { taskUsers } from './taskUsers';
import { usersList } from './usersList';
import { taskCreate } from './taskCreate';
import { threatIntelligenceStore } from './threatIntelligence';
import { threatIntelligenceDetails } from './threatIntelligenceDetails';
import { threatIntelligenceCategories } from './threatIntelligenceCategories';
import { threatIntelligenceSeverity } from './threatIntelligenceSeverity';
import { threatIntelligenceAsset } from './threatIntelligenceAsset';
import { threatIntelligenceDepartments } from './threatIntelligenceDepartments';
import { threatIntelligenceEvidence } from './threatIntelligenceEvidence';
import { threatIntelligenceDisposition } from './threatIntelligenceDisposition';
import { threatIntelligenceProducts } from './threatIntelligenceProducts';
import { threatIntelligenceVendors } from './threatIntelligenceVendors';
import { threatIntelligenceProductList } from './threatIntelligentProductList';
import { threatIntelligenceRunPlayBook } from './threatIntelligenceRunPlaybook';

import { helpStore } from './help';
import { incidentMasterSeverity } from './incidentMasterSeverity';
import { threatIntelligenceUpdateAdversory } from './updateAdversory';
import { incidentMasterCategory } from './incidentMasterCategory';
import { incidentMasterSubCategory } from './incidentMasterSubCategory';
import { incidentMasterDisposition } from './incidentMasterDisposition';
import { incidentMasterSubDisposition } from './incidentMasterSubDisposition';
import { incidentMasterDetectionMethods } from './incidentMasterDetectionMethods';
import { incidentMasterArtifacts } from './incidentMasterArtifacts';
import { incidentMasterLocation } from './incidentMasterLocation';
import { threatIntelligenceCreateAdvisory } from './threatIntelligenceCreateAdversory';
import { threatIntelligencePartialUpdate } from './threatIntelligencePartialUpdate';
import { threatIntelligenceExecutePlayBook } from './threatIntelligenceExecutePlayBook';
import { threatIntelligentUserEmailList } from './threatIntelligentUserEmailList';
import { threatIntelligentSendEmail } from './threatIntelligentSendEmail';
import { tasksListStore } from './tasksList';
import { verifyCodeStore } from './verifyCode';
import { threatIntelligenceSource } from './threatIntelligenceSources';
import { threatIntelligenceCaseAdvisoryLocation } from './threatIntelligenceCaseAdvisoryLocation';
import {
  threatIntelligenceCaseAdvisoryUsersList,
  threatIntelligenceCaseAdvisoryItems,
  threatIntelligenceSubcategoriesItems,
  threatIntelligenceSubdispositionscategories,
} from './helpers';
import { threatIntelligenceOpenCase } from './openCase';
import { incidentDeleteAsset } from './incidentDeleteAsset';
import { incidentMasterActionApps } from './incidentMasterActionApps';
import { incidentMasterAddMember } from './incidentMasterAddMember';
import { threatIntelligentUpdateArtifacts } from './threatIntelligentUpdateArtifacts';
import { incidentMasterActionRun } from './incidentMasterActionRun';
import { incidentAddArtifact } from './incidentAddArtifact';
import { threatIntelligentExecuteAction } from './threatIntelligentExecuteAction';
import { threatIntelligentMultiConfigExecuteAction } from './threatIntelligentMultiConfigExecuteAction';
import { incidenArtifactList } from './incidenArtifactList';
import { caseDetails } from './caseDetails';
import { caseMasterActionApps } from './caseMasterActionApps';
import { caseMasterStore } from './caseMasterData';
import { casePostComment } from './casePostComment';
import { caseSendEmail } from './caseSendEmail';
import { caseDispositionStore } from './caseDisposition';
import { caseMasterCategory } from './caseMasterCategory';
import { caseMasterSubCategory } from './caseMasterSubCategory';
import { caseMasterDisposition } from './caseMasterDisposition';
import { caseMasterSubDisposition } from './caseMasterSubDisposition';
import { caseMasterDetectionMethods } from './caseMasterDetectionMethods';
import { caseMasterArtifacts } from './caseMasterArtifacts';
import { caseMasterLocation } from './caseMasterLocation';
import { caseEdit } from './caseEdit';
import { caseDeleteAsset } from './caseDeleteAsset';

import { appsDetails } from './appsDetails';
import { appsUpdateDetails } from './appUpdateDetails';
import { caseMasterSeverity } from './caseMasterSeverity';
import { automation } from './automation';
import { appsUpdateStatus } from './appUpdateStatus';
import { appsConfigurationDetails } from './appConfigurationDetails';
import { appConfigurationFieldsData } from './appConfigurationFieldsData';
import { appConfigurationUpdateDetails } from './appConfigurationUpdateDetails';
import { appsCheckIsMultiConfig } from './appsCheckIsMultiConfig';
import { deleteComment } from './deleteComment';
import { actionRowOutput } from './actionRowOutput';
import { incidentReportTypes } from './incidentReportTypes';
import { appVenderList } from './appVenderList';
import { appPublishersList } from './appPublishersList';
import { appTypesList } from './appTypesList';
import { appRateList } from './appRateList';
import { appCreateApplication } from './appCreateApplication';
import { appApprovalFlowList } from './appApprovalFlowList';
import { appPrimaryApproversList } from './appPrimaryApproversList';
import { appUpdateWorkFlowDetails } from './appUpdateWorkFlowDetails';
import { appDeleteApprovalWorkFlow } from './appDeleteApprovalWorkFlow';
import administration from './administration';
import { incidentDispositionKeys } from './incidentDispositionKeys';
import { appConfig } from './appConfig'
import { deleteIncidentTask } from './deleteIncidentTask';
import { caseDeleteStore } from './caseDelete';
import { dashboardStore } from './dashboard';
import { caseRunAction } from './caseRunAction';

const appReducer = combineReducers({
  automation,
  dashboardStore,
  loginStore,
  casesStore,
  caseMasterSeverity,
  appStore,
  assetsStore,
  forgotPasswordStore,
  importAssetStore,
  googleAuthStore,
  newAsset,
  ownersStore,
  assetRulesStore,
  locationsStore,
  organizationsStore,
  dispositionsStore,
  categoriesStore,
  assetClassificationStore,
  assetOSStore,
  playbookStore,
  assetTypeStore,
  editAsset,
  assetEnableFieldsStore,
  assetCategoriesStore,
  userStore,
  incidentManagementStore,
  incidentSourcesStore,
  incidentCustomersStore,
  incidentSeverityStore,
  incidentDispositionStore,
  assetValueStore,
  departmentsStore,
  assetStatusStore,
  assetRemoteAppStore,
  assetsMasterStore,
  googleLoginStore,
  incidentSinglePdf,
  incidentDetails,
  incidentCreate,
  incidentEdit,
  incidentExcelExport,
  incidentPdfExport,
  incidentSendEmail,
  incidentMasterStore,
  changePasswordStore,
  createTemplate,
  templateDraft,
  assetImportProcess,
  incidentPostComment,
  taskCategories,
  taskDepartments,
  taskUsers,
  usersList,
  taskCreate,
  threatIntelligenceStore,
  threatIntelligenceDetails,
  threatIntelligenceCategories,
  threatIntelligenceSource,
  threatIntelligenceSeverity,
  threatIntelligenceAsset,
  threatIntelligenceDepartments,
  threatIntelligenceEvidence,
  threatIntelligenceDisposition,
  threatIntelligenceProducts,
  threatIntelligenceVendors,
  threatIntelligenceProductList,
  helpStore,
  incidentMasterSeverity,
  incidentMasterCategory,
  incidentMasterSubCategory,
  incidentMasterDisposition,
  incidentMasterSubDisposition,
  incidentMasterDetectionMethods,
  incidentMasterArtifacts,
  incidentMasterLocation,
  threatIntelligenceUpdateAdversory,
  threatIntelligenceRunPlayBook,
  threatIntelligenceCreateAdvisory,
  threatIntelligencePartialUpdate,
  threatIntelligenceExecutePlayBook,
  threatIntelligentUserEmailList,
  threatIntelligentSendEmail,
  threatIntelligenceCaseAdvisoryLocation,
  threatIntelligenceCaseAdvisoryItems,
  threatIntelligenceOpenCase,
  threatIntelligenceSubcategoriesItems,
  threatIntelligenceSubdispositionscategories,
  threatIntelligenceCaseAdvisoryUsersList,
  tasksListStore,
  verifyCodeStore,
  incidentDeleteAsset,
  incidentMasterActionApps,
  incidentMasterAddMember,
  threatIntelligentUpdateArtifacts,
  threatIntelligentExecuteAction,
  threatIntelligentMultiConfigExecuteAction,
  incidentMasterActionRun,
  incidentAddArtifact,
  incidenArtifactList,
  caseDetails,
  caseMasterActionApps,
  caseMasterStore,
  casePostComment,
  caseSendEmail,
  caseDispositionStore,
  caseMasterCategory,
  caseMasterSubCategory,
  caseMasterDisposition,
  caseMasterSubDisposition,
  caseMasterDetectionMethods,
  caseMasterArtifacts,
  caseMasterLocation,
  caseEdit,
  caseDeleteAsset,
  appsDetails,
  appsUpdateDetails,
  appsUpdateStatus,
  appsConfigurationDetails,
  appConfigurationFieldsData,
  appConfigurationUpdateDetails,
  appsCheckIsMultiConfig,
  deleteComment,
  actionRowOutput,
  incidentReportTypes,
  appVenderList,
  appPublishersList,
  appTypesList,
  appRateList,
  appCreateApplication,
  appApprovalFlowList,
  administration,
  appPrimaryApproversList,
  appUpdateWorkFlowDetails,
  appDeleteApprovalWorkFlow,
  incidentDispositionKeys,
  appConfig,
  deleteIncidentTask,
  caseDeleteStore,
  caseRunAction,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_REQUESTED') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
