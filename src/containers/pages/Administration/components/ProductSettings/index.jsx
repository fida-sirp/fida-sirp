import React from 'react';
import AdministrationTab from '../AdministrationTab';
import Feedback from './Components/FeedbackRegister';
import FailedRegistration from './Components/FailedRegistration';
import Widgets from './Components/Widgets';
import Notifications from './Components/Notifications';
import BackUpRestore from './Components/BackUp';
import Licence from './Components/Licence'
import ServerHealth from './Components/ServerHealth/ServerHealth';

const ProductSettings = ({ access, parsedQuery, history }) => {
  const defaultSelectedSubTab = parsedQuery.active_sub_tab || 'feedback';


  const tabsData = [];

  if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-feedback"))){
      
    const feedback =  {
      title: 'Feedback',
      key: 'feedback',
      component: <Feedback access ={access} parsedQuery={parsedQuery} history={history} />,
    };
    tabsData.push(feedback);
}

if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-failed-registration"))){
      
  const failed_registrations =  {
    title: 'Failed Registrations',
    key: 'failed_registrations',
    component: (
      <FailedRegistration access ={access} parsedQuery={parsedQuery} history={history} />
    ),
  };
  tabsData.push(failed_registrations);
}

if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-notifications-allow"))){
      
  const notifications =   {
    title: 'Notifications',
    key: 'notifications',
    component: <Notifications access ={access} parsedQuery={parsedQuery} history={history} />,
  };
  tabsData.push(notifications);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-graphs"))){
      
  const widgets =  {
    title: 'Widgets',
    key: 'widgets',
    component: <Widgets  access ={access} parsedQuery={parsedQuery} history={history} />,
  };
  tabsData.push(widgets);
}

if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-license"))){
      
  const license =   {
    title: 'License',
    key: 'license',
    component: <Licence access ={access} parsedQuery={parsedQuery} history={history} />
  };
  tabsData.push(license);
}

if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-health"))){
      
  const server_health = {
    title: 'Server Health',
    key: 'server_health',
    component: <ServerHealth access ={access} parsedQuery={parsedQuery} history={history} />
  };
  tabsData.push(server_health);
}

if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-backup-restore"))){
      
  const backup_restore = {
    title: 'Backup & Restore',
    key: 'backup_restore',
    component: <BackUpRestore access ={access} parsedQuery={parsedQuery} history={history} />,
  };
  tabsData.push(backup_restore);
}


  const onClickHandler = data =>
    history.push(
      `/administration?active_tab=productSettings&&active_sub_tab=${data?.key}`
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

export default ProductSettings;
