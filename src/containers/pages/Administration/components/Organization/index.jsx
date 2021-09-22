import React from 'react';
import AdministrationTab from '../AdministrationTab';
import OrganizationDetails from './Components/Organization';
import OrganizationInformation from './Components/OrganizationInformation';
import OrganizationUsers from './Components/OrganizationsUsers';
import Selected from './Components/Selected';

const Organization = ({ access, parsedQuery, history }) => {
  const defaultSelectedSubTab = parsedQuery.active_sub_tab || 'organization';



  const tabsData = [];  

  if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-organizations"))){
      
      const organization =   {
        title: 'Organization',
        key: 'organization',
        component: (
          <OrganizationDetails access={access} parsedQuery={parsedQuery} history={history} />
        ),
      };
      tabsData.push(organization);
  }
  if(access!==undefined && (access.includes("all-super-admin") || access.includes("selectedone-organizations"))){
      
    const organization_selected =  {
      title: 'Selected',
      key: 'organization_selected',
      component: <Selected  parsedQuery={parsedQuery} history={history} />,
    };
    tabsData.push(organization_selected);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-organizations-users"))){
      
  const organization_Users =  {
    title: 'Organization Users',
    key: 'organization_Users',
    component: (
      <OrganizationUsers access={access} parsedQuery={parsedQuery} history={history} />
    ),
  };
  tabsData.push(organization_Users);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("updateclient-organizations"))){
      
  const organization_information =  {
    title: 'Organization Information',
    key: 'organization_information',
    component: (
      <OrganizationInformation parsedQuery={parsedQuery} history={history} />
    ),
  };
  tabsData.push(organization_information);
}


  const onClickHandler = data =>
    history.push(
      `/administration?active_tab=organization&&active_sub_tab=${data?.key}`
    );

  return (
    <AdministrationTab
      defaultSelectedSubTab={defaultSelectedSubTab}
      tabsData={tabsData}
      onTabClick={onClickHandler}
    />
  );
};

export default Organization;
