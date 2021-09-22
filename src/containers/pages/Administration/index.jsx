import React, { useEffect, useState } from 'react';
import { Row } from 'antd';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import AuthTokenHOC from '../../../HOCs/AuthTokenHOC';
import { AdministrationTab } from './StyledComponents';
import SPTab from '../../../components/SPTab';
import Organization from './components/Organization';
import AccessControl from './components/AccessControls';
import ProductSettings from './components/ProductSettings';
import RiskManagement from './components/RiskManagement';
import Cases from './components/Cases';
import Asset from './components/Assets';
import Workflow from './components/Workflow';
import Automation from './components/Automation';
import Logs from './components/Logs';
import VulnerabilityManagement from './components/VulnerabilityManagement';
import ThreatIntelligence from './components/ThreatIntelligence';

import {
  getAllTabbsHeading
} from '../../../actions/administration';



const Administration = ({ onGetAllTabbsHeading, allTabsHeading, access }) => {
  const history = useHistory();
  const [defaultActiveKey, setSelectedTab] = useState();
  const [query, setQuery] = useState(location.search);
  const parsedQuery = queryString.parse(query);
  const selectedTab = '';

  useEffect(() => {
    const activeTab = parsedQuery?.active_tab || 'organization';
    setSelectedTab(activeTab);
  }, [query]);

  useEffect(() => onGetAllTabbsHeading('all'), []);



const multiTabList = [];

  

    if(access!==undefined && (access.includes("all-super-admin") || access.includes("index-organizations") || access.includes("selectedone-organizations") || access.includes("index-organizations-users")  ||  access.includes("updateclient-organizations") ||  access.includes("setting-mail-config") )){
        
        const organization =  {
          title: 'Organization',
          key: 'organization',
          component: <Organization access ={access} parsedQuery={parsedQuery} history={history} allTabsHeading={allTabsHeading} />,
        };
      multiTabList.push(organization);
    }
    if(access!==undefined && (access.includes("all-super-admin") || access.includes('setting-asset-fields') || access.includes('index-business-group') || access.includes('index-assets-group' ) || access.includes('index-asset-sub-group' ) || access.includes('index-asset-type') ||  access.includes('index-asset-value') || access.includes('index-asset-classification') ||  access.includes('index-assets-os') || access.includes('index-owners') || access.includes('index-departments'))){
    
        const assets =  {
          title: 'Assets',
          key: 'assets',
          component: <Asset access ={access} parsedQuery={parsedQuery} history={history} allTabsHeading={allTabsHeading} />,
        };
      multiTabList.push(assets);
      }

    if(access!==undefined && (access.includes("all-super-admin") ||  access.includes('field-setting-incident-tickets') || access.includes('index-incident-category') || access.includes('index-incident-subcategories') || access.includes('index-incident-disposition') || access.includes('index-incident-disposition-subcategory') || access.includes('index-incident-awareness-types') || access.includes('index-service-level-agreement') || access.includes('index-locations')  || access.includes('field-setting-incident-tickets'))){
      const cases =  {
        title: 'Cases',
        key: 'cases',
        component: <Cases access ={access} parsedQuery={parsedQuery} history={history} allTabsHeading={allTabsHeading} />,
      };
    
      multiTabList.push(cases);
      }
      if(access!==undefined && (access.includes("all-super-admin") ||  access.includes('index-workflow') || access.includes('index-task-categories'))){
      const workflows={
        title: 'Workflows',
        key: 'workflows',
        component: <Workflow access ={access} parsedQuery={parsedQuery} history={history} allTabsHeading={allTabsHeading} />,
      };
      multiTabList.push(workflows);
    }
    if(access!==undefined && (access.includes("all-super-admin") ||  access.includes('index-application-product-vendors') || access.includes('index-application-publishers') || access.includes('index-application-action-io-types') || access.includes('index-application-actions') || access.includes('index-ingestion-sources') || access.includes('index-rss-feed'))){
      const automation={
        title: 'Automation',
        key: 'automation',
        component: <Automation access ={access} parsedQuery={parsedQuery} history={history} allTabsHeading={allTabsHeading} />,
      };
      multiTabList.push(automation);
    }
    if(access!==undefined && (access.includes("all-super-admin") ||  access.includes('index-advisory-category') || access.includes('index-advisory-subcategories') || access.includes('index-advisory-disposition'))){
      const threatIntelligence={
        title: 'Threat Intelligence',
        key: 'threatIntelligence',
        component: (
          <ThreatIntelligence access ={access} parsedQuery={parsedQuery} history={history} allTabsHeading={allTabsHeading} />
        ),
      };
      multiTabList.push(threatIntelligence);
    }
    if(access!==undefined && (access.includes("all-super-admin") ||  access.includes('index-vulnerabilities-list') || access.includes('index-vulnerability-register') || access.includes('index-vulnerability-severity') || access.includes('index-severity-order'))){
      const vulnerability_management=  {
        title: 'Vulnerability Management',
        key: 'vulnerability_management',
        component: (
          <VulnerabilityManagement access ={access} parsedQuery={parsedQuery} history={history} allTabsHeading={allTabsHeading} />
        ),
      };
      multiTabList.push(vulnerability_management);
    }
    if(access!==undefined && (access.includes("all-super-admin") ||  access.includes('index-threat-register') || access.includes('index-threat-value') || access.includes('index-control-register') || access.includes('index-likelihood-value') || access.includes('index-risk-score') || access.includes('index-risk-business-impact') || access.includes('index-risk-rating-color') || access.includes('index-risk-meta') || access.includes('index-compliance'))){
      const riskManagement=  {
        title: 'Riskmanagement',
        key: 'riskManagement',
        component: <RiskManagement access ={access} parsedQuery={parsedQuery} history={history} allTabsHeading={allTabsHeading} />,
      };
      multiTabList.push(riskManagement);
    }
    if(access!==undefined && (access.includes("all-super-admin") ||  access.includes('index-users') || access.includes('index-user-group') || access.includes('index-user-role') || access.includes('index-role-action') || access.includes('index-actions') || access.includes('index-action-group') || access.includes('index-organization-settings' ) || access.includes('updateclient-organizations' ))){
      const accessControls=  {
        title: 'Access Controls',
        key: 'accessControls',
        component: <AccessControl access ={access} parsedQuery={parsedQuery} history={history} allTabsHeading={allTabsHeading} />,
      };
      multiTabList.push(accessControls);
    }
    if(access!==undefined && (access.includes("all-super-admin") ||  access.includes('index-feedback') || access.includes('index-notifications') || access.includes('index-notification-groups') || access.includes('index-notifications-allow') ||  access.includes('index-graphs') || access.includes('index-license' ) || access.includes('index-health' ))){
      const productSettings= {
        title: 'Product Settings',
        key: 'productSettings',
        component: (
          <ProductSettings access ={access} parsedQuery={parsedQuery} history={history} allTabsHeading={allTabsHeading} />
        ),
      };
      multiTabList.push(productSettings);
    }
    if(access!==undefined && (access.includes("all-super-admin") ||  access.includes('index-app-error') || access.includes('index-users-log') || access.includes('index-action-logs'))){
      const logs=  {
        title: 'Logs',
        key: 'logs',
        component: <Logs access ={access} parsedQuery={parsedQuery} history={history} allTabsHeading={allTabsHeading} />,
      };
      multiTabList.push(logs);
    }

  const onTabChangeHandler = value =>
    history.push(`/administration?active_tab=${value}`);

  return (
    <Row>
      {defaultActiveKey && defaultActiveKey.length > 0 ? (
        <AdministrationTab>
          <SPTab
            onChange={onTabChangeHandler}
            height={'auto'}
            tabs={multiTabList}
            showScroll={true}
            defaultActiveKey={defaultActiveKey}
          />
        </AdministrationTab>
      ) : (
        <React.Fragment />
      )}
    </Row>
  );
};

const mapStateToProps = state => ({
  allTabsHeading: state.administration.allTabsHeading?.listData,
  access :  state?.userStore?. userProfile?.data?.access
});

const mapDispatchToProps = dispatch => ({
  onGetAllTabbsHeading: (...args) => dispatch(getAllTabbsHeading(...args))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  AuthTokenHOC
)(Administration);