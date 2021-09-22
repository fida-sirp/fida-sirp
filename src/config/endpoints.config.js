export default class API {
  static baseUrl = process.env.REACT_APP_API_BASE_URL;

  static dashboards = API.baseUrl + '/dashboards';

  static login = API.baseUrl + '/login';

  static forgotPassword = API.baseUrl + '/users/forgot-password';

  static verifyCode = API.baseUrl + '/users/verify-code';

  static changePassword = API.baseUrl + '/users/change-password';

  static googleAuthProfile = API.baseUrl + '/users/google-auth-profile';

  static logout = API.baseUrl + '/users/logout';

  static cases = API.baseUrl + '/cases';

  static help = API.baseUrl + '/sirp-help';

  static casesCategory = API.baseUrl + '/cases/categories';

  static searchCases = API.baseUrl + '/cases/search?iti_type=';

  static filterCase = API.baseUrl + '/cases/filter';

  static dispositions = API.baseUrl + '/cases/dispositions';

  static asset = API.baseUrl + '/asset';

  static assetSearch = API.baseUrl + '/asset/search';

  static assetClassification = API.baseUrl + '/asset-classification';

  static assetOS = API.baseUrl + '/asset-os';

  static assetImport = API.baseUrl + '/asset/import';

  static assetRulesSearch = API.baseUrl + '/asset-rules/search';

  static assetType = API.baseUrl + '/asset-type';

  static assetRules = API.baseUrl + '/asset-rules';

  static assetRulesResults = API.baseUrl + '/asset-rule-results';

  static assetValue = API.baseUrl + '/asset-value';

  static assetOwners = API.baseUrl + '/asset-owners';

  static department = API.baseUrl + '/asset/departments';

  static assetStatus = API.baseUrl + '/asset/asset-status';

  static assetRemoteApp = API.baseUrl + '/asset/asset-remote-app';

  static locations = API.baseUrl + '/cases/locations';

  static userProfile = API.baseUrl + '/users/profile';

  static userQr = API.baseUrl + '/users/google-qr-image';

  static organizations = API.baseUrl + '/asset-os';

  static playbooks = API.baseUrl + '/playbooks';

  static playbooksLogs = API.baseUrl + '/playbooks-queue';

  static playbookRules = API.baseUrl + '/playbook-rules';

  static playbookImport = API.baseUrl + '/playbooks/import';

  static assetDetailsDashboard = API.baseUrl + '/asset/s3-dashboard';

  static assetCategories = API.baseUrl + '/asset/get-categories';

  static assetEnableFields = API.baseUrl + '/asset/enable-fields';

  static incidentManagement = API.baseUrl + '/incident-management';

  static assetSystemTypes = API.baseUrl + '/asset/system-types';

  static assetNetworkTypes = API.baseUrl + '/asset/network-types';

  static assetPowerStatus = API.baseUrl + '/asset/power-status';

  static assetDocumentTypes = API.baseUrl + '/asset/document-types';

  static assetSiems = API.baseUrl + '/asset/siems';

  static assetZones = API.baseUrl + '/asset/zones';

  static assetProducts = API.baseUrl + '/asset/products';

  static assetVendors = API.baseUrl + '/asset/vendors';

  static assetFields = API.baseUrl + '/asset/category-fields';

  static assetServers = API.baseUrl + '/asset/server';

  static googleLogin = API.baseUrl + '/google-login/login';

  static vulnerabilityManagement = API.baseUrl + '/vulnerability-management';

  static riskAssessment = API.baseUrl + '/risk-Assessment'; // change Static one

  static reports = API.baseUrl + '/reports';


  static incidentManagementModule = {
    update: API.incidentManagement,
    taskUsers: `${API.incidentManagement}/task-users`,
    comment: {
      post: `${API.incidentManagement}/comment`,
      delete: `${API.incidentManagement}/delete-comment`,
      deleteAttchement: `${API.incidentManagement}/delete-comment-attachment`,
    },
    task: {
      create: `${API.incidentManagement}/tasks`,
      categories: `${API.incidentManagement}/task/categories`,
      departments: `${API.incidentManagement}/task/departments`,
    },
    asset: {
      deleteCall: `${API.incidentManagement}/custom-delete`,
    },
    member: {
      add: `${API.incidentManagement}/update-members`,
    },
    master: {
      severity: `${API.incidentManagement}/severity`,
      category: `${API.incidentManagement}/category`,
      subCategory: `${API.incidentManagement}/sub-category`,
      disposition: `${API.incidentManagement}/disposition`,
      subDisposition: `${API.incidentManagement}/sub-disposition`,
      location: `${API.incidentManagement}/location`,
      detectionMethods: `${API.incidentManagement}/detection-methods`,
      artifacts: `${API.incidentManagement}/artifacts`,
      artifactList: `${API.incidentManagement}/artifact-list`,
    },
    export: {
      pdf: `${API.incidentManagement}/export`,
    },
    actionApp: {
      list: `${API.baseUrl}/applications/dispense?expand=actApp`,
    },
    runActions: `${API.incidentManagement}/run-action`,
    runMultiConfigActions: `${API.incidentManagement}/select-config`,
    artifact: {
      update: `${API.incidentManagement}/artifact-value-update`,
      add: `${API.incidentManagement}/add-artifact`,
    },
    rowOutput: `${API.incidentManagement}/get-raw-output`,
    reportType: `${API.incidentManagement}/reports-list`,
    generateReport: `${API.incidentManagement}/reports`,
    dispositionKey: `${API.incidentManagement}/disposition-key`,
    dispositionFields: `${API.incidentManagement}/disposition-fields`,
    bulkUpdate: `${API.incidentManagement}/bulk`,
  };

  static userModule = {
    list: `${API.baseUrl}/users`,
  };

  static advisory = API.baseUrl + '/advisory';

  static advisoryArtifactUpdate =
    API.baseUrl + '/advisory/artifact-value-update';

  static advisoryAddEvidence = API.baseUrl + '/advisory/add-evidence';
  static advisoryArtifactExectuteAction = API.baseUrl + '/advisory/run-action';

  static advisoryArtifactMultiConfigExectuteAction =
    API.baseUrl + '/advisory/select-config';

  static advisoryArtifactRawOutput = API.baseUrl + '/advisory/get-raw-output';

  static advisoryCustomUpdate = API.baseUrl + '/advisory/custom-update';

  static advisoryCategory = API.baseUrl + '/advisory/category';

  static casesSubcategories = API.baseUrl + '/cases/subcategories';

  static advisorySeverity = API.baseUrl + '/incident-management/severity';

  static assetList = API.baseUrl + '/incident-management/asset';

  static advisoryDepartments = API.baseUrl + '/advisory/departments';

  static advisoryEvidence = API.baseUrl + '/incident-management/artifact-list';

  static advisoryDispositions = API.baseUrl + '/advisory/dispositions';

  static openCase = API.baseUrl + '/advisory/open-case';

  static CasessubDispositions = API.baseUrl + '/cases/subdispositions';

  static advisoryProducts = API.baseUrl + '/advisory/products';

  static advisoryVendors = API.baseUrl + '/advisory/vendors';

  static advisorySources = API.baseUrl + '/advisory/sources';

  static caseAdvisoryItems = API.baseUrl + '/cases-advisory/all-adv';

  static caseAdvisory = API.baseUrl + '/cases-advisory';

  static casesAdvisorylocation = API.baseUrl + '/incident-management/location';

  static casesAdvisoryUserList = API.baseUrl + '/cases-advisory/users';

  static advisoryExport = API.baseUrl + '/advisory/export';

  static advisoryPlayBook = API.baseUrl + '/advisory/playbook';

  static incidentPlayBook = API.baseUrl + '/incident-management/playbook';
  static advisoryGetPlayBook = API.baseUrl + '/advisory/playbooks';

  static advisoryUserEmail = API.baseUrl + '/advisory/user-emails';

  static advisorySendEmail = API.baseUrl + '/advisory/email';

  static applications = API.baseUrl + '/applications';

  static applicationAction = API.baseUrl + '/application-actions';

  static applicationsDisable = API.baseUrl + '/applications/disable';

  static applicationsConfig = API.baseUrl + '/applications/config-data';

  static applicationsVendorsList = API.baseUrl + '/applications/vendors';

  static applicationsPublishers = API.baseUrl + '/applications/publishers';

  static applicationsType = API.baseUrl + '/applications/type';

  static applicationsRateLimit = API.baseUrl + '/applications/rate-limit';

  static applicationsRateLimit = API.baseUrl + '/applications/rate-limit';

  static applicationsApprovalWorkFlow =
    API.baseUrl + '/applications/approval-workflow';

  static applicationsPrimaryApproversList =
    API.baseUrl + '/incident-management/users';

  static applicationApprovaldeleteWorkFlow = API.baseUrl + '/approval-workflow';

  static applicationsConfigIntegrateData =
    API.baseUrl + '/applications/integrate-data';

  static applicationsConfigIntegrate = API.baseUrl + '/applications/integrate';

  static applicationsIntegrateMultiData =
    API.baseUrl + '/applications/integrate-multi-data';

  static applicationsIntegrateMulti =
    API.baseUrl + '/applications/integrate-multi';

  static caseManagementModule = {
    update: API.cases,
    comment: {
      post: `${API.incidentManagement}/comment`,
      delete: `${API.incidentManagement}/delete-comment`,
    },
    task: {
      create: `${API.incidentManagement}/tasks`,
      categories: `${API.incidentManagement}/task/categories`,
      departments: `${API.incidentManagement}/task/departments`,
    },
    asset: {
      deleteCall: `${API.cases}/custom-delete`,
    },
    member: {
      add: `${API.cases}/update-members`,
    },
    master: {
      severity: `${API.cases}/severity`,
      category: `${API.incidentManagement}/category`,
      subCategory: `${API.incidentManagement}/sub-category`,
      disposition: `${API.incidentManagement}/disposition`,
      subDisposition: `${API.incidentManagement}/sub-disposition`,
      location: `${API.incidentManagement}/location`,
      detectionMethods: `${API.incidentManagement}/detection-methods`,
    },
    export: {
      pdf: `${API.cases}/export`,
    },
    actionApp: {
      list: `${API.baseUrl}/applications/dispense?expand=actApp`,
    },
    runActions: `${API.incidentManagement}/run-action`,
    artifact: {
      update: `${API.cases}/artifact-value-update`,
      add: `${API.incidentManagement}/add-artifact`,
    },
    risk: {
      list: `${API.cases}/cases-risk`,
    },
    vulnerability: {
      list: `${API.cases}/cases-vulnerability`,
    },
  };
  static automationList = API.baseUrl + '/automation-playground';

  static administration = API.baseUrl + '/administration';

  static administrationModule = {
    organization: API.administration + '/organization',
    assets: API.administration + '/assets',
    workflow: API.administration + '/workflow',
    category: API.administration + '/workflow/tasks-categories',
    workflowStatus: API.administration + '/workflow/change-status',
    assetGroups: API.administration + '/assets/assets-group',
    riskManagement: API.administration + '/risk-management',
    riskManagementThreatRegister:
      API.administration + '/risk-management/threat-register',
    riskManagementThreatValue:
      API.administration + '/risk-management/threat-value',
    riskManagementControlRegister:
      API.administration + '/risk-management/control-register',
    riskManagementBusinessImpact:
      API.administration + '/risk-management/impact',
    riskManagementBusinessImpactChangeTitle:
      API.administration + '/risk-management/impact/change-title',
    riskManagementCompliance:
      API.administration + '/risk-management/compliance',
    automationList: API.administration + '/automation',
    automationVendorsList: API.administration + '/automation/vendors',
    automationPublishers: API.administration + '/automation/publishers',
    automationActionsIO: API.administration + '/automation/io-types',
    automationActions: API.administration + '/automation/actions',
    automationThreat: API.administration + '/automation/threat-feeds',
    automationFamily: API.administration + '/automation/use-case-family',
    automationIngestionSource:
      API.administration + '/automation/ingestion-source',
    ingestionType:
      API.administration + '/automation/ingestion-source/ingestion-type',
    ingestionWidget:
      API.administration + '/automation/ingestion-source/widget-list',
    ingestionFrequence:
      API.administration + '/automation/ingestion-source/frequency',
    ingestionApplication:
      API.administration + '/automation/ingestion-source/application-list',
    ingestionUsers:
      API.administration + '/automation/ingestion-source/users-list',
    enableAdvisory:
      API.administration + '/automation/ingestion-source/enable-advisory',
    ingestionAction:
      API.administration + '/automation/ingestion-source/app-actions',
    riskManagementValues: API.administration + '/risk-management/threat-value',
    technicalVulnerability:
      API.administration +
      '/vulnerability-management/technical-vulnerabilities',
    nonTechnicalVulnerability:
      API.administration +
      '/vulnerability-management/non-technical-vulnerabilities',
    vulnerabilitySeverityList:
      API.administration +
      '/vulnerability-management/technical-vulnerabilities/severity-list',
    vulnerabilityNonTechnicalSeverityList:
      API.administration +
      '/vulnerability-management/non-technical-vulnerabilities/severity-list',

    vulnerabilitySeverityLevelList:
      API.administration +
      '/vulnerability-management/severity-order',

    vulnerabilityNonTechnicalSeverityLevel:
      API.administration +
      '/vulnerability-management/severity-list',

    vulnerabilityThreatList:
      API.administration +
      '/vulnerability-management/non-technical-vulnerabilities/threat-list',
    threatIntelCategory: API.administration + '/threat_intel/category',
    threatIntelSubCategory: API.administration + '/threat_intel/subcategories',
    threatIntelSubCategorySeverity:
      API.administration + '/threat_intel/subcategories/severity',
    threatIntelSubCategoryPrimaryCategory:
      API.administration + '/threat_intel/subcategories/category-list',
    threatIntelDispositions: API.administration + '/threat_intel/dispositions',
    automationActions: API.administration + '/automation/actions',
    cases: API.administration + '/cases',
    automationActionsType: API.administration + '/automation/actions/type',
    automationActionsScriptType:
      API.administration + '/automation/actions/script-type',
    automationActionsIOType: API.administration + '/automation/actions/io-type',
    automationActionsApplicationType:
      API.administration + '/automation/actions/application-list',
    ingestionMapping:
      API.administration + '/automation/ingestion-source/mapping',
    ingestionMultiData:
      API.administration + '/automation/ingestion-source/integrate-multi-data',
    ingestionMultiDataPost:
      API.administration + '/automation/ingestion-source/integrate-multi',
    logsApps: API.administration + '/logs/app-logs',
    logsAuthentication: API.administration + '/logs/authentication-logs',
    logsActivity: API.administration + '/logs/activity-logs',
    logsIngestion: API.administration + '/logs/ingestion-logs',
    productsRegister:
      API.administration + '/product-settings/failed-registrations',
    accessControlUsers: API.administration + '/access-control/users',
    accessUsersAuthenticationTypes:
      API.administration + '/access-control/users/authentication-type',
    accessUsersPermission:
      API.administration + '/access-control/users/permissions',
    accessUsersLandingPage:
      API.administration + '/access-control/users/landing-page',
    accessUsersGroup: API.administration + '/access-control/users/group',
    accessSessions: API.administration + '/access-control/sessions',
    accessControlGroups: API.administration + '/access-control/groups',
    accessControlRoles: API.administration + '/access-control/roles',
    accessControlActions: API.administration + '/access-control/actions',
    accessControlActionsGroupsTab: API.administration + '/access-control/action-groups',
    accessControlAuthSetting: API.administration + '/access-control/auth-setting',
    accessControlAuthPrivileges: API.administration + '/access-control/privileges',
    accessControlProductSetting: API.administration + '/product-settings',
    threatActor: API.administration + '/threat_intel/threat-actors',
    associateThreatActor:  API.administration + '/threat_intel/threat-actors/associated-groups',
  };

  static vulnerabilityManagementModule = {
    vulnerabilityManagementList: API.vulnerabilityManagement
  };
  static vulnerabilityCustomUpdate = API.baseUrl + '/vulnerability-management/custom-update';

  static riskAssessmentModule = {
    riskAssessmentList: API.riskAssessment
  }

  static rportsModule = {
    reportsList: API.reports
  }
}
