import React from 'react';
import AdministrationTab from '../AdministrationTab';
import Category from './Components/Category';
import SubCategory from './Components/Subcategory';
import Field from './Components/Field';
import Disposition from './Components/Disposition';
import SubDisposition from './Components/SubDisposition';
import DetectionMethods from './Components/DetectionMethods';
import Escalation from './Components/Escalation/Escalation';
import Nciss from './Components/Nciss';
import Locations from './Components/Locations';

const AccessControl = ({parsedQuery, history, allTabsHeading,access }) => {
  const defaultSelectedSubTab = parsedQuery.active_sub_tab || 'field';

  const tabsData = [];

  if(access!==undefined && (access.includes("all-super-admin") || access.includes("field-setting-incident-tickets"))){
      
    const field =   {
      title: 'Field',
      key: 'field',
      component: <Field />,
    };
    tabsData.push(field);
}

if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-incident-category"))){
      
  const category =   {
    title: 'Category',
    key: 'category',
    component: <Category access={access} />,
  };
  tabsData.push(category);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-incident-subcategories"))){
      
  const subcategories =    {
    title: 'Subcategories',
    key: 'subcategories',
    component: <SubCategory access={access} />,
  };
  tabsData.push(subcategories);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-incident-disposition"))){
      
  const disposition =    {
    title: 'Disposition',
    key: 'disposition',
    component: <Disposition  access={access} />,
  };
  tabsData.push(disposition);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-incident-disposition-subcategory"))){
      
  const sub_disposition =   {
    title: 'Sub-disposition',
    key: 'sub_disposition',
    component: <SubDisposition access={access} />,
  };
  tabsData.push(sub_disposition);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-incident-awareness-types"))){
      
  const detection_method =   {
    title: 'Detection Methods',
    key: 'detection_method',
    component: <DetectionMethods access={access} />,
  };
  tabsData.push(detection_method);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-service-level-agreement"))){
      
  const escalation =  {
    title: 'Escalation and SLAs',
    key: 'escalation',
    component: <Escalation access={access} />,
  };
  tabsData.push(escalation);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-ncis-options-mapping") || access.includes("index-ncis-periority-colors") || access.includes("index-ncis-scoring-categories"))){

const incident_scoring =  {
  title: 'NCISS Incident Scoring',
  key: 'incident_scoring',
  component: <Nciss access={access} />,
};
tabsData.push(incident_scoring);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-locations"))){
 
  const locations =  {
    title: 'Locations',
    key: 'locations',
    component: <Locations access={access} />,
  };
  tabsData.push(locations);
  }


  const onClickHandler = data =>
    history.push(
      `/administration?active_tab=cases&&active_sub_tab=${data?.key}`
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
