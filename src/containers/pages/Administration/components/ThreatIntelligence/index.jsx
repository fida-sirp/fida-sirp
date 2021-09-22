import React from 'react';
import AdministrationTab from '../AdministrationTab';
import Category from './Components/Category/Category';
import SubCategory from './Components/SubCategory/SubCategory';
import Disposition from './Components/Disposition/disposition';
import ThreatActor from "./Components/ThreatActor/ThreatActor";

const ThreatIntelligence = ({ access,  parsedQuery, history }) => {
  const defaultSelectedSubTab = parsedQuery.active_sub_tab || 'category';


  const tabsData = [];

  if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-advisory-category"))){
      
    const category =     {
      title: 'Category',
      key: 'category',
      component: <Category access ={access} parsedQuery={parsedQuery} history={history} />,
    };
    tabsData.push(category);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-advisory-subcategories"))){
      
  const sub_category =     {
    title: 'Sub-Category',
    key: 'sub-category',
    component: <SubCategory access ={access} parsedQuery={parsedQuery} history={history} />,
  };
  tabsData.push(sub_category);
}

if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-advisory-disposition"))){
      
  const disposition =    {
    title: 'Disposition',
    key: 'disposition',
    component: <Disposition  access ={access} parsedQuery={parsedQuery} history={history} />,
  };
  tabsData.push(disposition);
}
  if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-threat-actors"))){

    const threatActor =    {
      title: 'Threat Actors',
      key: 'threat-actors',
      component: <ThreatActor  access ={access} parsedQuery={parsedQuery} history={history} />,
    };
    tabsData.push(threatActor);
  }

  const onClickHandler = data =>
    history.push(
      `/administration?active_tab=threatIntelligence&&active_sub_tab=${data?.key}`
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

export default ThreatIntelligence;
