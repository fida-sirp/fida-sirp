import React from 'react';
import Cases from './pages/cases';
import Assets from './pages/assets';
import IncidentManagement from './pages/incidentManagement';
import IncidentDetails from './pages/incidentManagement/details';
import ThreatIntelligence from './pages/ThreatIntelligence';
import ThreatIntelligenceDetails from './pages/ThreatIntelligence/details';
import VulnerabilityManagement from './pages/VulnerabilityManagement';
import Administration from './pages/Administration';
import AssetsDiscovery from './pages/assets/discovery';
import ViewResults from './pages/assets/viewResults';
import AssetMapFields from './pages/assets/mapFields';
import Dashboard from './pages/dashboard';
import DashboardList from './pages/dashboard/components/DashboardList';
import Details from './pages/assets/details';
import Playbook from './pages/playbook';
import CreatePlaybook from './pages/playbook/components/create';
import PlaybookLogs from './pages/playbook/components/playbooklogs';
import AutomationPlayground from './pages/automationPlayground';
import ApprovalList from './pages/automationPlayground/components/Approvals';
import ArtifactsList from './pages/automationPlayground/components/Artifacts';
import Help from './pages/Help';
import Apps from './pages/Apps';
import ApprovalWorkFlow from './pages/Apps/ApprovalWorkFlow';
import Helpdetails from './pages/Help/details';
import CreateDashboard from './pages/dashboard/components/CreateDashboard';
import DashboardDetails from './pages/dashboard/details';
import CaseDetails from './pages/cases/details';
import RiskAssessment from './pages/RiskAssessment';
import PlayBookRules from './pages/playbook/components/rules';
import LogDetails from './pages/playbook/components/playbooklogs/logs';
import Reports from './pages/Reports';


const routes = [
  {
    path: '/dashboard/details',
    key: 'dashboard',
    exact: true,
    breadcrumb: () => 'Dashboard',
    component: () => {
      return <DashboardDetails title="Dashboard" />;
    },
  },
  {
    path: '/dashboard',
    key: 'dashboard',
    exact: true,
    breadcrumb: () => 'Dashboard',
    component: () => {
      return <Dashboard title="Dashboard" />;
    },
  },
  {
    path: '/dashboard/view/:id',
    key: 'dashboardView',
    exact: true,
    breadcrumb: () => 'dashboard_view',
    component: () => {
      return <Dashboard title="Dashboard View" />;
    },
  },
  {
    path: '/dashboard/list',
    key: 'dashboardList',
    exact: true,
    breadcrumb: () => 'DashboardList',
    component: () => {
      return <DashboardList title="Dashboard List" />;
    },
  },
  {
    path: '/dashboard/detail/:id',
    key: 'dashboardDetails',
    exact: true,
    breadcrumb: () => 'Dashboard',
    component: () => {
      return <Dashboard title="Dashboard" />;
    },
  },
  {
    path: '/dashboard/create',
    key: 'createDashboard',
    exact: true,
    breadcrumb: () => 'createDashboard',
    component: () => {
      return <CreateDashboard title="Create Dashboard" />;
    },
  },

  {
    path: '/dashboard/edit/:id',
    key: 'editDashboard',
    exact: true,
    breadcrumb: () => 'editDashboard',
    component: () => {
      return <CreateDashboard title="Edit Dashboard" />;
    },
  },
  {
    path: '/cases/:caseType/:id',
    key: 'caseDetails',
    exact: true,
    breadcrumb: () => 'Cases Details',
    component: () => {
      return <CaseDetails title="Case Details" />;
    },
  },
  {
    path: '/cases',
    key: 'cases',
    exact: true,
    breadcrumb: () => 'Cases',
    component: () => {
      return <Cases title="Cases" />;
    },
  },
  {
    path: '/cases/:path',
    key: 'cases',
    exact: true,
    breadcrumb: () => 'Cases',
    component: () => {
      return <Cases title="Cases" />;
    },
  },


  // {
  //   path: '/incidentManagement',
  //   key: 'incidentManagement',
  //   exact: true,
  //   breadcrumb: () => 'Incident Management',
  //   component: () => {
  //     return <IncidentManagement title="Incident Management" />;
  //   },
  // },
  {
    path: '/incidentManagement/:path?',
    key: 'incidentManagement',
    exact: true,
    breadcrumb: () => 'Incident Management',
    component: () => {
      return <IncidentManagement title="Incident Management" />;
    },
  },
  {
    path: '/incidentManagement/details/:id',
    key: 'incidentManagementDetails',
    exact: true,
    breadcrumb: () => 'IncidentManagementDetails',
    component: () => {
      return <IncidentDetails title="Incident Management" />;
    },
  },
  {
    path: '/threatIntelligence',
    key: 'threatIntelligence',
    exact: true,
    breadcrumb: () => 'Threat Intelligence',
    component: () => {
      return <ThreatIntelligence title="Threat Intelligence" />;
    },
  },
  {
    path: '/threatIntelligence/:path',
    key: 'threatIntelligence',
    exact: true,
    breadcrumb: () => 'Threat Intelligence',
    component: () => {
      return <ThreatIntelligence title="Threat Intelligence" />;
    },
  },
  {
    path: '/threatIntelligence/details/:id',
    key: 'threatIntelligenceDetails',
    exact: true,
    breadcrumb: () => 'ThreatIntelligenceDetails',
    component: () => {
      return <ThreatIntelligenceDetails title="Threat Intelligence" />;
    },
  },
  {
    path: '/vulnerabilityManagement',
    key: 'vulnerabilityManagement',
    exact: true,
    breadcrumb: () => 'Vulnerability Management',
    component: () => {
      return <VulnerabilityManagement title="Vulnerability Management" />;
    },
  },
  {
    path: '/vulnerabilityManagement/:path',
    key: 'vulnerabilityManagement',
    exact: true,
    breadcrumb: () => 'Vulnerability Management',
    component: () => {
      return <VulnerabilityManagement title="Vulnerability Management" />;
    },
  },

  {
    path: '/riskAssessment',
    key: 'riskAssessment',
    exact: true,
    breadcrumb: () => 'Risk Assessment',
    component: () => {
      return <RiskAssessment title="Risk Assessment" />;
    },
  },
  {
    path: '/riskAssessment/:slug',
    key: 'riskAssessment',
    exact: true,
    breadcrumb: () => 'Risk Assessment',
    component: () => {
      return <RiskAssessment title="Risk Assessment" />;
    },
  },

  {
    path: '/playbooks',
    key: 'playbooks',
    exact: true,
    breadcrumb: () => 'Playbooks',
    component: () => {
      return <Playbook title="Playbooks" />;
    },
  },
  {
    path: '/playbooks-queue',
    key: 'playbooks-logs',
    exact: true,
    breadcrumb: () => 'Playbooks-logs',
    component: () => {
      return <PlaybookLogs title="Playbooks Logs" />;
    },
  },
  {
    path: '/playbook/:id',
    key: 'playbook-details',
    exact: true,
    breadcrumb: () => 'Playbook-Details',
    component: () => {
      return <CreatePlaybook title="PlayBook Details" />;
    },
  },
  {
    path: '/playbook-queue/:id',
    key: 'playbook-details',
    exact: true,
    breadcrumb: () => 'Playbook-Logs',
    component: () => {
      return <LogDetails title="Playbook-Logs" />;
    },
  },
  {
    path: '/playbook-rule/:id',
    key: 'playbook-details',
    exact: true,
    breadcrumb: () => 'Playbook-Details',
    component: () => {
      return <PlayBookRules title="Playbook Rules" />;
    },
  },
  {
    path: '/playbook/update/:id',
    key: 'playbook-update',
    exact: true,
    breadcrumb: () => 'Playbook-Update',
    component: () => {
      return <CreatePlaybook title="Playbook Update" />;
    },
  },
  {
    path: '/playbooks/create',
    key: 'createPlaybook',
    exact: true,
    breadcrumb: () => 'createPlaybook',
    component: () => {
      return <CreatePlaybook title="Create Playbook" />;
    },
  },
  {
    path: '/apps',
    key: 'apps',
    exact: true,
    breadcrumb: () => 'Apps',
    component: () => {
      return <Apps title="Apps" />;
    },
  },
  {
    path: '/apps/filters',
    key: 'apps',
    exact: true,
    breadcrumb: () => 'Apps',
    component: () => {
      return <Apps title="Apps">APPS</Apps>;
    },
  },
  {
    path: '/approval-workflow',
    key: 'approvalWorkFlow',
    exact: true,
    breadcrumb: () => 'Approval Workflow',
    component: () => {
      return (
        <ApprovalWorkFlow title="Approval Workflow">
          Approval Workflow
        </ApprovalWorkFlow>
      );
    },
  },
  {
    path: '/approval',
    key: 'approval',
    exact: true,
    breadcrumb: () => 'Apporoval',
    component: () => {
      return (
        <ApprovalList title="Application Workflow" showTabHeader={false} />
      );
    },
  },
  {
    path: '/automationPlayground',
    key: 'automationPlayground',
    exact: true,
    breadcrumb: () => 'Automation Playground',
    component: () => {
      return <AutomationPlayground title="Automation Playground" />;
    },
  },
  {
    path: '/automationPlayground/filters',
    key: 'automationPlayground',
    exact: true,
    breadcrumb: () => 'Automation Playground',
    component: () => {
      return <AutomationPlayground title="Automation Playground" />;
    },
  },
  {
    path: '/automationPlayground/artifacts',
    key: 'automationPlayground',
    exact: true,
    breadcrumb: () => 'Automation Playground',
    component: () => {
      return <ArtifactsList title="Automation Playground" />;
    },
  },
  {
    path: '/assets',
    key: 'assets',
    exact: true,
    breadcrumb: () => 'Assets',
    component: () => {
      return <Assets title="Assets" />;
    },
  },
  {
    path: '/assets/discovery',
    key: 'discovery',
    exact: true,
    breadcrumb: () => 'Assets Discovery',
    component: () => {
      return <AssetsDiscovery title="Assets Discovery" />;
    },
  },
  {
    path: '/assets/discovery/:id',
    key: 'discovery',
    exact: true,
    breadcrumb: () => 'Assets Discovery',
    component: () => {
      return <ViewResults title="Assets Discovery" />;
    },
  },

  {
    path: '/assets/asset-details/:id',
    key: 'assetsDetails',
    exact: true,
    breadcrumb: () => 'AssetsDetails',
    component: () => {
      return <Details title="Assets" />;
    },
  },
  {
    path: '/assets/mapFields',
    key: 'assetsMapFields',
    exact: true,
    breadcrumb: () => 'assetsMapFields',
    component: () => {
      return <AssetMapFields title="Assets" />;
    },
  },
  {
    path: '/reports',
    key: 'Reports',
    exact: true,
    breadcrumb: () => 'Reports',
    component: () => {
      return <Reports title="Reports" />;
    },
  },
  {
    path: '/administration',
    key: 'administration',
    exact: true,
    breadcrumb: () => 'Administration',
    component: () => {
      return <Administration title="Administration" />;
    },
  },
  {
    path: '/administrations',
    key: 'administration',
    exact: true,
    breadcrumb: () => 'Administration',
    component: () => {
      return <Administration title="Administration" />;
    },
  },
  {
    path: '/help',
    key: 'help',
    exact: true,
    breadcrumb: () => 'Help',
    component: () => {
      return <Help title="Help" />;
    },
  },
  {
    path: '/help/:id',
    key: 'helpDetails',
    exact: true,
    breadcrumb: () => 'Help Details',
    component: () => {
      return <Helpdetails title="Help" />;
    },
  },
];

export default routes;
