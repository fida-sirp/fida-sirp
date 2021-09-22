import React from 'react';
import AdministrationTab from '../AdministrationTab';
import FieldSettings from './Components/AssetFieldSettings/FieldSettings';
import BusinessGroup from './Components/AssetBusinessGroup/BusinessGroup';
import AssetGroups from './Components/AssetGroups/AssetGroups';
import AssetSubGroups from './Components/AssetSubGroups/AssetSubGroups';
import AssetType from './Components/AssetType/AssetType';
import Classification from './Components/AssetClassification';
import AssetOS from './Components/OperatingSystem/OS';
import AssetOwner from './Components/AssetOwners/Owners';
import AssetDepartment from './Components/Departments/Departments';
import AssetValue from './Components/AssetValue/AssetValue';

const Asset = ({access, parsedQuery, history, allTabsHeading }) => {
  const defaultSelectedSubTab = parsedQuery.active_sub_tab || 'field_settings';

  const tabsData = [];

  if(access!==undefined && (access.includes("all-super-admin") || access.includes("setting-asset-fields"))){
      
    const field_settings =  {
      title: 'Field Settings',
      key: 'field_settings',
      component: <FieldSettings />,
    };
    tabsData.push(field_settings);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-business-group"))){
      
  const business_group =  {
    title: allTabsHeading?.assetsBussinessGroup,
    key: 'business_group',
    component: <BusinessGroup access={access} />,
  };
  tabsData.push(business_group);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-assets-group"))){
      
  const assets_group =  {
    title: 'Assets Groups',
    key: 'assets_group',
    component: <AssetGroups access={access} />,
  };
  tabsData.push(assets_group);
}

if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-asset-sub-group"))){
      
  const assest_subgroup =  {
    title: 'Assets Subgroups',
    key: 'assest_subgroup',
    component: <AssetSubGroups access={access} />,
  };
  tabsData.push(assest_subgroup);
}

if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-asset-type"))){
      
  const asset_type =  {
    title: allTabsHeading?.assetsType ? allTabsHeading?.assetsType : 'Asset Type',
    key: 'asset_type',
    component: <AssetType access={access} />,
  };
  tabsData.push(asset_type);
}

if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-asset-value"))){
      
  const asset_value =  {
    title: allTabsHeading?.assetsValue?.asv_label ? allTabsHeading?.assetsValue?.asv_label : 'Asset Value',
    key: 'asset_value',
    component: <AssetValue access={access} />,
  };
  tabsData.push(asset_value);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-asset-classification"))){
      
  const classification = {
    title: allTabsHeading?.assetsClassification ? allTabsHeading?.assetsClassification :  'Classification',
    key: 'classification',
    component: <Classification access={access} />,
  };
  tabsData.push(classification);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-assets-os"))){
      
  const os = {
    title: 'Operating systems',
    key: 'os',
    component: <AssetOS access={access} />,
  };
  tabsData.push(os);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-owners"))){
      
  const owner =  {
    title: 'Owners',
    key: 'owner',
    component: <AssetOwner  access={access} />,
  };
  tabsData.push(owner);
}  
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-departments"))){
      
  const department = {
    title: 'Departments',
    key: 'department',
    component: <AssetDepartment access={access} />,
  };
  tabsData.push(department);
}   
 
  const onClickHandler = data =>
    history.push(
      `/administration?active_tab=assets&&active_sub_tab=${data?.key}`
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

export default Asset;
