import React from 'react';
import AdministrationTab from '../AdministrationTab';
import Workflow from './Components/Workflow';
import Categories from './Components/Categories';

const Workflows = ({ access,  parsedQuery, history }) => {
  const defaultSelectedSubTab = parsedQuery.active_sub_tab || 'workflow';

  const tabsData = [];

  if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-workflow"))){
      
    const workflow =    {
      title: 'Workflow',
      key: 'workflow',
      component: <Workflow access={access} />,
    };
    tabsData.push(workflow);
}

if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-task-categories"))){
      
  const categories =    {
    title: 'Categories',
    key: 'categories',
    component: <Categories access={access} />,
  };
  tabsData.push(categories);
}

  const onClickHandler = data =>
    history.push(
      `/administration?active_tab=workflows&&active_sub_tab=${data?.key}`
    );
  return (
    <AdministrationTab
      defaultSelectedSubTab={defaultSelectedSubTab}
      tabsData={tabsData}
      onTabClick={onClickHandler}
    />
  );
};

export default Workflows;
