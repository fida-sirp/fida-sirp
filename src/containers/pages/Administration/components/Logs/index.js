import React from 'react';
import AdministrationTab from '../AdministrationTab';
import AppLogs from './Components/AppLogs';
import AuthenticationLogs from './Components/AuthenticationLogs';
import ActivityLogs from './Components/ActivityLogs';
import IngestionLogs from './Components/IngestionLogs';

const Logs = ({ access, parsedQuery, history }) => {
  const defaultSelectedSubTab = parsedQuery.active_sub_tab || 'app_logs';


  const tabsData = [];

  if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-app-error"))){
      
    const app_logs =  {
      title: 'App Logs',
      key: 'app_logs',
      component: <AppLogs parsedQuery={parsedQuery} history={history} />,
    };
    tabsData.push(app_logs);
}

if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-users-log"))){
      
  const authentication_logs = {
    title: 'Authentication Logs',
    key: 'authentication_logs',
    component: (
      <AuthenticationLogs parsedQuery={parsedQuery} history={history} />
    ),
  };
  tabsData.push(authentication_logs);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-action-logs"))){
      
  const activity_logs = {
    title: 'Activity Logs',
    key: 'activity_logs',
    component: <ActivityLogs parsedQuery={parsedQuery} history={history} />,
  };
  tabsData.push(activity_logs);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-ingestion-logs"))){
      
  const ingestion_logs =  {
    title: 'Ingestion Logs',
    key: 'ingestion_logs',
    component: <IngestionLogs  parsedQuery={parsedQuery} history={history} />,
  };
  tabsData.push(ingestion_logs);
}


  const onClickHandler = data =>
    history.push(
      `/administration?active_tab=logs&&active_sub_tab=${data?.key}`
    );

  return (
    <div>
      <AdministrationTab
        defaultSelectedSubTab={defaultSelectedSubTab}
        tabsData={tabsData}
        onTabClick={onClickHandler}
      />
    </div>
  );
};

export default Logs;
