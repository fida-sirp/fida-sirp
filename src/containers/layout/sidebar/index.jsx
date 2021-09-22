import React, { useState , useEffect } from 'react';
import 'antd/dist/antd.css';
import map from 'lodash/map';
import { useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { StyledMenu, StyledItem, StyledDiv, IconDiv } from './StyledComponents';
import Colors from '../../../theme/Colors';

import Dashboard from '../../../assets/svgIcon/sidebar/dashboard';
import Cases from '../../../assets/svgIcon/sidebar/cases';
import IncidentManagement from '../../../assets/svgIcon/sidebar/incidentManagement';
import ThreatIntelligence from '../../../assets/svgIcon/sidebar/threatIntelligence';
import VulnerabilityManagement from '../../../assets/svgIcon/sidebar/vulnerabilityManagement';
import RiskAssessment from '../../../assets/svgIcon/sidebar/riskAssessement';
import Playbooks from '../../../assets/svgIcon/sidebar/playbooks';
import Apps from '../../../assets/svgIcon/sidebar/apps';
import AutomationPlayground from '../../../assets/svgIcon/sidebar/automationPlayground';
import Assets from '../../../assets/svgIcon/sidebar/assets';
import Reports from '../../../assets/svgIcon/sidebar/reports';
import Administration from '../../../assets/svgIcon/sidebar/administration';
import { getUserProfile } from '../../../actions/user';

import { useDispatch , useSelector } from 'react-redux';

function SidebarContainer(props) {

const dispatch = useDispatch()

useEffect(() => {
    dispatch(getUserProfile())
},[dispatch]);

const access = useSelector((state) => state?.userStore?.userProfile?.data?.access)

  const history = useHistory();
  const [selectedItem, setSelectedItem] = useState(
    history.location.pathname.split('/')[1]
  );
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setSelectedItem(history.location.pathname.split('/')[1]);
  }, [history.location]);

  useEffect(() => {
    return history.listen(location => {
      setSelectedItem(location.pathname.split('/')[1]);
    });
  }, [history]);


  return (
    <StyledDiv>
      <StyledMenu
        defaultSelectedKeys={selectedItem}
        defaultOpenKeys={selectedItem}
        selectedKeys={[selectedItem]}
        mode="inline"
        onClick={({ key }) => {
          setSelectedItem(key);

          if (key === selectedItem) {
            history.push(`/${key}`);
          } else {
            history.push(`/${key}`);
          }
        }}
        inlineCollapsed={isCollapsed}
      > 

          <StyledItem key='dashboard' icon={<div><Dashboard/></div>}>Dashboard</StyledItem>
      {((access!==undefined && access.includes("index-cases")) || ( access!==undefined && access.includes("all-super-admin") )) ? <StyledItem key='cases' icon={<div><Cases/>
          </div>}>Cases</StyledItem> : ''}
      {((access!==undefined && access.includes("index-incident-tickets")) || ( access!==undefined && access.includes("all-super-admin") )) ? <StyledItem key='incidentManagement'  icon={<div><IncidentManagement/>
          </div>}>Incident Management</StyledItem> : ''}
      {((access!==undefined && access.includes("index-advisory"))  || ( access!==undefined && access.includes("all-super-admin") )) ? <StyledItem key='threatIntelligence'  icon={<div><ThreatIntelligence/>
          </div>}>Threat Intelligence</StyledItem> : ''}
      {((access!==undefined && access.includes("index-vulnerability-assessment"))  || ( access!==undefined && access.includes("all-super-admin") )) ? <StyledItem key='vulnerabilityManagement'  icon={<div>
              <VulnerabilityManagement/></div>}>Vulnerability Management</StyledItem> : ''}
      {((access!==undefined && access.includes("index-risk-assessment")) || ( access!==undefined && access.includes("all-super-admin") )) ? <StyledItem key='riskAssessment'  icon={<div><RiskAssessment/>
          </div>}>Risk Assessment</StyledItem> : ''}
      {((access!==undefined && access.includes("index-playbooks")) || ( access!==undefined && access.includes("all-super-admin") )) ? <StyledItem key='playbooks'  icon={<div><Playbooks/>
          </div>}>Playbooks</StyledItem> : ''}
      {((access!==undefined && access.includes("index-applications")) || ( access!==undefined && access.includes("all-super-admin") )) ? <StyledItem key='apps'  icon={<div><Apps/>
          </div>}>Apps</StyledItem> : ''}
      {((access!==undefined && access.includes("index-automation-playground")) || ( access!==undefined && access.includes("all-super-admin") )) ? <StyledItem key='automationPlayground'  icon={<div>
              <AutomationPlayground/></div>}>Automation Playground</StyledItem> : ''}
      {((access!==undefined && access.includes("index-asset")) || ( access!==undefined && access.includes("all-super-admin") )) ? <StyledItem key='assets'  icon={<div><Assets/>
          </div>}>Assets</StyledItem> : ''}
      {((access!==undefined && access.includes("index-risk-assessment")) || ( access!==undefined && access.includes("all-super-admin") )) ? <StyledItem key='reports'  icon={<div><Reports/>
          </div>}>Reports</StyledItem> : ''}
      {((access!==undefined && access.includes("index-administration")) || ( access!==undefined && access.includes("all-super-admin") ))? <StyledItem key='administrations'  icon={<div><Administration/>
          </div>}>Administration</StyledItem> : ''}
      
      
      </StyledMenu>
      <IconDiv
        role="presentation"
        onClick={() => setIsCollapsed(!isCollapsed)}
        inlineCollapsed={isCollapsed}
      >
        {isCollapsed ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
      </IconDiv>
    </StyledDiv>
  );
}

export default SidebarContainer;
