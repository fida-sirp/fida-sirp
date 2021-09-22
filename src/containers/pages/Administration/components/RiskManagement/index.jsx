import React from 'react';
import AdministrationTab from '../AdministrationTab';
import ThreatRegister from './components/threatRegister';
import ThreatValue from './components/threatValue';
import ControlRegister from './components/controlRegister';
import BusinnessImpact from './components/impact';
import Compliances from './components/compliances';
import Probability from './components/probability'
import RiskScore from './components/riskScore'
import RiskMtrix from './components/RiskMtrix'
import RiskMeta from './components/RiskMeta';

const RiskManagement = ({ access, parsedQuery, history, allTabsHeading }) => {


  const defaultSelectedSubTab =
    parsedQuery.active_sub_tab || 'threat_register';

    const tabsData = [];

    if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-threat-register"))){
        
      const threat_register =       {
        title: 'Threat Register',
        key: 'threat_register',
        component: <ThreatRegister access ={access} parsedQuery={parsedQuery} history={history} />,
      };
      tabsData.push(threat_register);
  }

  if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-threat-value"))){
        
    const threat_value =       {
      title: 'Threat value',
      key: 'threat_value',
      component: <ThreatValue access ={access} parsedQuery={parsedQuery} history={history} />,
    };
    tabsData.push(threat_value);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-control-register"))){
        
  const control_register =       {
    title: 'Control Register',
    key: 'control_register',
    component: (
      <ControlRegister access ={access} parsedQuery={parsedQuery} history={history} />
    ),
  };
  tabsData.push(control_register);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-likelihood-value"))){
        
  const probability =      {
    title: allTabsHeading?.riskmanagementProbability?.lhv_label ? allTabsHeading?.riskmanagementProbability?.lhv_label : 'Likelihood',
    key: 'probability',
    component: <Probability access ={access} />
  };
  tabsData.push(probability);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-risk-score"))){
        
  const risk_score =       {
    title: allTabsHeading?.riskScore?.rks_label ? allTabsHeading?.riskScore?.rks_label : 'Risk Score',
    key: 'risk_score',
    component: <RiskScore access ={access} />
  };
  tabsData.push(risk_score);
}  

if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-risk-business-impact"))){
        
  const business_impact =  {
    title: allTabsHeading?.businessImpact?.rbi_label ? allTabsHeading?.businessImpact?.rbi_label : 'Business Impact',
    key: 'business_impact',
    component: (
      <BusinnessImpact access ={access} parsedQuery={parsedQuery} history={history} />
    ),
  };
  tabsData.push(business_impact);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-risk-rating-color"))){
        
  const risk_matrix =  {
    title: 'Risk Matrix',
    key: 'risk_matrix',
    component: <RiskMtrix access ={access} parsedQuery={parsedQuery} history={history} />
  };
  tabsData.push(risk_matrix);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-risk-meta"))){
        
  const risk_meta = {
    title: 'Risk Meta',
    key: 'risk_meta',
    component: <RiskMeta access ={access} parsedQuery={parsedQuery} history={history} />
  };
  tabsData.push(risk_meta);
}
if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-compliance"))){
        
  const compliances =  {
    title: 'Compliances',
    key: 'compliances',
    component: <Compliances access ={access} parsedQuery={parsedQuery} history={history} />,
  };
  tabsData.push(compliances);
}



  const onClickHandler = data =>
    history.push(
      `/administration?active_tab=riskManagement&&active_sub_tab=${data?.key}`
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
