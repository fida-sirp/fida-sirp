import React from 'react';
import AdministrationTab from '../AdministrationTab';
import Users from './Components/Users';
import Groups from './Components/Groups';
import Roles from './Components/Roles';
import Privileges from './Components/Privileges';
import Actions from './Components/Actions';
import ActionsGroup from './Components/ActionGroup';
import ThirdPartyAuth from './Components/ThirdParty';
import SessionPassword from './Components/SessionPassword';


const AccessControl = ({ access, parsedQuery, history }) => {
  const defaultSelectedSubTab = parsedQuery.active_sub_tab || 'users';


  const tabsData = [];

  if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-users"))){
      
    const users = {
      title: 'Users',
      key: 'users',
      component: <Users access ={access}  parsedQuery={parsedQuery} history={history} />,
    };
    tabsData.push(users);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-user-group"))){
      
  const groups = {
    title: 'Groups',
    key: 'groups',
    component: <Groups access ={access} parsedQuery={parsedQuery} history={history} />,
  };
  tabsData.push(groups);
}

if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-user-role"))){
      
  const roles ={
    title: 'Roles',
    key: 'roles',
    component: <Roles access ={access} parsedQuery={parsedQuery} history={history} />,
  };
  tabsData.push(roles);
}

if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-role-action"))){
      
  const privilegs = {
    title: 'Privilegs',
    key: 'privilegs',
    component: <Privileges access ={access} parsedQuery={parsedQuery} history={history} />,
  };
  tabsData.push(privilegs);
}

if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-actions"))){
      
  const actions = {
    title: 'Actions',
    key: 'actions',
    component: <Actions access ={access} parsedQuery={parsedQuery} history={history} />,
  };
  tabsData.push(actions);
}

if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-action-group"))){
      
  const actions_group = {
    title: 'Actions Group',
    key: 'actions_group',
    component: <ActionsGroup access ={access} parsedQuery={parsedQuery} history={history} />,
  };
  tabsData.push(actions_group);
}

if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-organization-settings"))){
      
  const thirdParty_auth = {
    title: 'Third-Party Auth',
    key: 'thirdParty_auth',
    component: <ThirdPartyAuth  access ={access}parsedQuery={parsedQuery} history={history} />,
  };
  tabsData.push(thirdParty_auth);
}

if(access!==undefined && (access.includes("all-super-admin") || access.includes("updateclient-organizations"))){
      
  const thirdParty_auth =  {
    title: 'Sessions & passwords',
    key: 'sessions_passwords',
    component: <SessionPassword />,
  };
  tabsData.push(thirdParty_auth);
}



  const onClickHandler = data =>
    history.push(
      `/administration?active_tab=accessControls&&active_sub_tab=${data?.key}`
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

export default AccessControl;
