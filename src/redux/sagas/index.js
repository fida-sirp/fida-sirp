import { all } from 'redux-saga/effects';
import auth from './auth';
import cases from './cases';
import assets from './assets';
import owners from './owners';
import locations from './locations';
import assetRules from './assetRules';
import organizations from './organizations';
import dispositions from './dispositions';
import playbooks from './playbooks';
import user from './user';
import incidentManagement from './incidentManagement';
import assetValue from './assetValue';
import departments from './departments';
import assetStatus from './assetStatus';
import assetRemoteApp from './assetRemoteApp';
import assetMasterData from './assetMasterData';
import incidentMasterData from './incidentMasterData';
import taskCategories from './taskCategories';
import taskDepartments from './taskDepartments';
import taskUsers from './taskUsers';
import usersManagement from './usersManagement';
import taskCreate from './taskCreate';
import threatIntelligence from './threatIntelligence';
import apps from './apps';
import caseMasterData from './caseMasterData';
import caseManagement from './caseManagement';
import automationPlayground from './automationMasterData';
import helper from './helpers';
import help from './help';
import administration from './administrationSaga';
import dashboard from './dashboardSaga';

export default function* generalSaga() {
  yield all([
    auth(),
    cases(),
    assets(),
    owners(),
    assetRules(),
    locations(),
    organizations(),
    dispositions(),
    playbooks(),
    user(),
    incidentManagement(),
    assetValue(),
    departments(),
    assetStatus(),
    assetRemoteApp(),
    assetMasterData(),
    incidentMasterData(),
    automationPlayground(),
    taskCategories(),
    taskDepartments(),
    taskUsers(),
    usersManagement(),
    taskCreate(),
    threatIntelligence(),
    helper(),
    help(),
    apps(),
    caseMasterData(),
    caseManagement(),
    administration(),
    dashboard(),
  ]);
}
