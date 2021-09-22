import React from 'react';
import AdministrationTab from '../AdministrationTab';
import Vendors from './components/vendors';
import Publishers from './components/publishers';
import ActionIO from './components/actionIO';
import Action from './components/action';
import Threat from './components/threat';
import CaseFamily from './components/caseFamily';
import Ingestion from './components/ingestion';

const RiskManagement = ({ access, parsedQuery, history }) => {
  const defaultSelectedSubTab = parsedQuery.active_sub_tab || 'vendors';


  const tabsData = [];

  if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-application-product-vendors"))){
      
    const vendors =     {
      title: 'Vendors',
      key: 'vendors',
      component: <Vendors access ={access} parsedQuery={parsedQuery} history={history} />,
    };
    tabsData.push(vendors);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-application-publishers"))){
      
  const publishers =    {
    title: 'Publishers',
    key: 'publishers',
    component: <Publishers access ={access} parsedQuery={parsedQuery} history={history} />,
  };
  tabsData.push(publishers);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-application-action-io-types"))){
      
  const actions_io_types =    {
    title: 'Actions IO Types',
    key: 'actions_io_types',
    component: <ActionIO access ={access} parsedQuery={parsedQuery} history={history} />,
  };
  tabsData.push(actions_io_types);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-application-actions"))){
      
  const actions =     {
    title: 'Actions',
    key: 'actions',
    component: <Action access ={access} parsedQuery={parsedQuery} history={history} />,
  };
  tabsData.push(actions);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-ingestion-sources"))){
      
  const ingestion_sources =     {
    title: 'Ingestion Sources',
    key: 'ingestion_sources',
    component: <Ingestion  access ={access} parsedQuery={parsedQuery} history={history} />,
  };
  tabsData.push(ingestion_sources);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-rss-feed"))){
      
  const threat_feeds =     {
    title: 'Thread Feeds',
    key: 'threat_feeds',
    component: <Threat access ={access} parsedQuery={parsedQuery} history={history} />,
  };
  tabsData.push(threat_feeds);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-use-case-family"))){   

const use_case_family =    {
  title: 'Use Case Family',
  key: 'use_case_family',
  component: <CaseFamily access ={access} parsedQuery={parsedQuery} history={history} />,
};
tabsData.push(use_case_family);
}

  const onClickHandler = data =>
    history.push(
      `/administration?active_tab=automation&&active_sub_tab=${data?.key}`
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

export default RiskManagement;
