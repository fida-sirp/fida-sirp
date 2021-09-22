import React, { useState, useEffect } from 'react';
import { Col, Row, Modal, Divider } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { map, max } from 'lodash';
import SPToggleSwitch from '../../../../../../components/SPToggleSwitch';
import SPButton from '../../../../../../components/SPButton';
import SelectBox from '../../../../../../components/SelectBox';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Label } from '../../../../../../components/InputBox/StyledComponents';
import { filter } from 'lodash'
import { createPrivileges, onGetListOfRoles, updatePrivileges } from '../../../../../../actions/administration';
import styled from 'styled-components';
export const ErrorText = styled.div`
   color:#fc5a5a;
   font-size:13px;
   text-align:left;
   font-weight:700;
   margin-left:10px;
   margin-bottom:20px;
`
const PrevilegesItem = ({ onGetRols, groupList, isCreate, record, closeModal, createPrev, updatePrev }) => {



  const [groupListOptions, setGroupListOptions] = useState([]);
  const [privileges, setPrivileges] = useState([
    {
      key: 'access_control',
      label: 'Access Control',
      properties: [
        { key: 'index-users', label: 'View Users' },
        { key: 'create-users', label: 'Add User' },
        { key: 'update-users', label: 'Update User' },
        { key: 'delete-users', label: 'Delete User' },
        { key: 'invite-users', label: 'Invite User' },
        { key: 'index-user-group', label: 'View User Group' },
        { key: 'create-user-group', label: 'Add User Group' },
        { key: 'update-user-group', label: 'Update User Group' },
        { key: 'delete-user-group', label: 'Delete User Group' },
        { key: 'index-user-role', label: 'View User Role' },
        { key: 'create-user-role', label: 'Add User Role' },
        { key: 'update-user-role', label: 'Update User Role' },
        { key: 'delete-user-role', label: 'Delete User Role' },
        { key: 'index-role-action', label: 'View Privileges' },
        { key: 'create-role-action', label: 'Assign Privileges' },
        { key: 'update-role-action', label: 'Update Privileges' },
        { key: 'delete-role-action', label: 'Delete Privileges' },
        { key: 'view-users', label: 'Session & Password Settings' },
        { key: 'index-incident-classifications', label: 'View Third-Party Authentication' },
        { key: 'create-incident-classifications', label: 'Add Third-Party Authentication' },
        { key: 'update-incident-classifications', label: 'Update Third-Party Authentication' },
        { key: 'delete-incident-classifications', label: 'Delete Third-Party Authentication' },
      ]
    },
    {
      key: 'administration',
      label: 'Administration',
      properties: [
        { key: 'index-administration', label: 'Access Administration Section' },
        { key: 'updateclient-organizations', label: 'Organizational Settings' },
        { key: 'update-notifications-allow', label: 'Edit Notifications' },
        { key: 'index-notifications-allow', label: 'View Notifications' },
        { key: 'upload-license', label: 'Upload License' },
        { key: 'setting-mail-config', label: 'Update Mail Server Settings' },
        { key: 'index-app-error', label: 'View Application Errors' },
        { key: 'index-license', label: 'View Licenses List' },
        { key: 'update-license', label: 'Update License' },
        { key: 'download-license', label: 'Download License' },
        { key: 'delete-license', label: 'Delete License' },
        { key: 'delete-backup-restore', label: 'Delete Backup' },
        { key: 'download-backup-restore', label: 'Download Backup' },
        { key: 'restore-backup-restore', label: 'Restore Backup' },
        { key: 'import-backup-backup-restore', label: 'Import Backup' },
        { key: 'settings-backup-restore', label: 'Configure Automatic Backup Settings' },
        { key: 'database-backup-backup-restore', label: 'Create Manual Backup' },
        { key: 'index-backup-restore', label: 'View Backup and Restore' },
        { key: 'patch-license', label: 'SIRP Patch' },
      ]
    },
    {
      key: 'asset_management',
      label: 'Asset Management',
      properties: [
        { key: 'index-asset-classification', label: 'View Asset Classifications List' },
        { key: 'create-asset-classification', label: 'Add Asset Classification' },
        { key: 'update-asset-classification', label: 'Update Asset Classification' },
        { key: 'delete-asset-classification', label: 'Delete Asset Classification' },
        { key: 'index-departments', label: 'View Departments List' },
        { key: 'create-departments', label: 'Add Department' },
        { key: 'update-departments', label: 'Update Department' },
        { key: 'delete-departments', label: 'Delete Department' },
        { key: 'index-business-group', label: 'View Business Groups List' },
        { key: 'create-business-group', label: 'Add Business Group' },
        { key: 'change-title-business-group', label: 'Change Business Group Title' },
        { key: 'update-business-group', label: 'Update Business Group' },
        { key: 'delete-business-group', label: 'Delete Business Group' },
        { key: 'index-asset-type', label: 'View Asset Types List' },
        { key: 'create-asset-type', label: 'Add Asset Type' },
        { key: 'change-title-asset-type', label: 'Change Asset Type Title' },
        { key: 'update-asset-type', label: 'Update Asset Type' },
        { key: 'delete-asset-type', label: 'Delete Asset Type' },
        { key: 'index-asset-value', label: 'View Asset Type Values List' },
        { key: 'create-asset-value', label: 'Add Asset Type Value' },
        { key: 'change-title-asset-value', label: 'Change Asset Type Value Title' },
        { key: 'update-asset-value', label: 'Update Asset Type Value' },
        { key: 'delete-asset-value', label: 'Delete Asset Type Value' },
        { key: 'index-assets-group', label: 'View Asset Groups List' },
        { key: 'create-assets-group', label: 'Add Asset Group' },
        { key: 'update-assets-group', label: 'Update Asset Group' },
        { key: 'delete-assets-group', label: 'Delete Asset Group' },
        { key: 'index-asset-sub-group', label: 'View Asset Subgroups List' },
        { key: 'create-asset-sub-group', label: 'Add Asset Subgroup' },
        { key: 'update-asset-sub-group', label: 'Update Asset Subgroup' },
        { key: 'delete-asset-sub-group', label: 'Delete Asset Subgroup' },
        { key: 'index-owners', label: 'View Asset Owners List' },
        { key: 'create-owners', label: 'Add Asset Owner' },
        { key: 'update-owners', label: 'Update Asset Owner' },
        { key: 'delete-owners', label: 'Delete Asset Owner' },
        { key: 'index-assets-os', label: 'View Asset Operating Systems List' },
        { key: 'create-assets-os', label: 'Add OS' },
        { key: 'update-assets-os', label: 'Update OS' },
        { key: 'delete-assets-os', label: 'Delete OS' },
        { key: 'index-asset', label: 'View Assets List' },
        { key: 'create-asset', label: 'Add Asset' },
        { key: 'update-asset', label: 'Update Asset' },
        { key: 'delete-asset', label: 'Delete Asset' },
        { key: 'import-asset', label: 'Import Assets' },
        { key: 'setting-asset-fields', label: 'Configure Asset Field Settings' },
        { key: 'index-asset-rules', label: 'View Asset Discovery Rules' },
        { key: 'create-asset-rules', label: 'Add Asset Discovery Rule' },
        { key: 'update-asset-rules', label: 'Update Asset Discovery Rule' },
        { key: 'play-asset-rules', label: 'Initiate Asset Discovery Scan' },
        { key: 'delete-asset-rules', label: 'Delete Asset Discovery Rule' },
        { key: 'index-asset-rule-results', label: 'View Asset Discovery Scan Results' },
        { key: 'save-asset-rule-results', label: 'Save Asset Discovery Scan Result' },
        { key: 'remove-asset-rule-results', label: 'Remove Asset Discovery Scan Result' },
        { key: 'view-network-blocks-list', label: 'View Network Blocks List' },
        { key: 'update-network-blocks', label: 'Update Network Blocks' },
        { key: 'delete-network-blocks', label: 'Delete Network Blocks' },
        { key: 'create-network-blocks', label: 'Create Network Blocks' },
        { key: 'export-asset', label: 'Export Assets' },
        { key: 'change-formula-asset-classification', label: 'Change Asset Classification Formula' },
        { key: 'index-confidentiality', label: 'Confidentiality List' },
        { key: 'create-confidentiality', label: 'Create Confidentiality' },
        { key: 'update-confidentiality', label: 'Update Confidentiality' },
        { key: 'delete-confidentiality', label: 'Delete Confidentiality' },
        { key: 'index-integrity', label: 'Integrity List' },
        { key: 'create-integrity', label: 'Create Integrity' },
        { key: 'update-integrity', label: 'Update Integrity' },
        { key: 'delete-integrity', label: 'Delete Integrity' },
        { key: 'index-availability', label: 'Availability List' },
        { key: 'create-availability', label: 'Create Availability' },
        { key: 'update-availability', label: 'Update Availability' },
        { key: 'delete-availability', label: 'Delete Availability' },
      ]
    },
    {
      key: 'automation',
      label: 'Automation',
      properties: [
        { key: 'index-ingestion-sources', label: 'View Ingestion Sources List' },
        { key: 'create-ingestion-sources', label: 'Add Ingestion Sources' },
        { key: 'update-ingestion-sources', label: 'Update Ingestion Sources' },
        { key: 'integrate-multi-ingestion-sources', label: 'Configure Ingestion Sources' },
        { key: 'delete-ingestion-sources', label: 'Delete Ingestion Sources' },
        { key: 'index-playbooks', label: 'View Playbooks List' },
        { key: 'create-playbooks', label: 'Create Playbook' },
        { key: 'duplicate-playbooks', label: 'Duplicate Playbook' },
        { key: 'update-playbooks', label: 'Update Playbook' },
        { key: 'delete-playbooks', label: 'Delete Playbook' },
        { key: 'index-automation-playground', label: 'Access Automation Playground' },
        { key: 'create-automation-playground', label: 'Execute Action' },
        { key: 'update-automation-playground', label: 'Update Action' },
        { key: 'result-automation-playground', label: 'View Executed Action Output' },
        { key: 'delete-automation-playground', label: 'Delete Action' },
        { key: 'index-artifacts', label: 'View Artifacts List' },
        { key: 'create-artifacts', label: 'Add Artifact' },
        { key: 'update-artifacts', label: 'Update Artifact' },
        { key: 'execute-artifacts', label: 'Execute Action Against Artifact' },
        { key: 'occurence-artifacts', label: 'View Artifact Occurences' },
        { key: 'delete-artifacts', label: 'Delete Artifacts' },
        { key: 'index-playbooks-queue', label: 'View Playbook Logs List' },
        { key: 'logs-playbooks-queue', label: 'View Playbook Logs' },
        { key: 'delete-playbooks-queue', label: 'Delete Playbook Logs' },
        { key: 'view-playbooks', label: 'View Playbook' },
        { key: 'import-playbooks', label: 'Import Playbook' },
        { key: 'download-playbooks', label: 'Download Playbook' },
        { key: 'integrate-applications', label: 'Enable/Disable Application' },
        { key: 'integrate-multi-applications', label: 'Enabl/Disable Multi-Config Application' },
        { key: 'multi-config-applications', label: 'Configure Multi-Config Application' },
        { key: 'config-applications', label: 'Configure Application' },
        { key: 'index-applications', label: 'View Applications List' },
        { key: 'disable-applications', label: 'Disable Application' },
        { key: 'actions-application-actions', label: 'View Actions List on the Apps Page' },
        { key: 'assign-application-workflow', label: 'Assign Application Workflows' },
        { key: 'create-application-workflow', label: 'Add Application Workflow' },
        { key: 'index-application-workflow', label: 'View Application Workflow' },
        { key: 'update-application-workflow', label: 'Update Application Workflow' },
        { key: 'delete-application-workflow', label: 'Delete Application Workflow' },
        { key: 'index-application-approval', label: 'View Approvals' },
        { key: 'approve-application-approval', label: 'Can Approve Approvals' },
        { key: 'view-artifacts', label: 'View Artifact' },
      ]
    },
    {
      key: 'case_management',
      label: 'Case Management',
      properties: [
        { key: "index-cases", label: "View All Cases List" },
        { key: "update-cases", label: "Update All Cases" },
        { key: "view-cases", label: "View All Cases" },
        { key: "delete-cases", label: "Delete All Cases" },
        { key: "index-cases-vulnerability", label: "View Vulnerability Cases List" },
        { key: "create-cases-vulnerability", label: "Create Vulnerability Case" },
        { key: "update-cases-vulnerability", label: "Update Vulnerability Case" },
        { key: "view-cases-vulnerability", label: "View Vulnerability Case Details" },
        { key: "delete-cases-vulnerability", label: "Delete Vulnerability Case" },
        { key: "index-cases-advisory", label: "View Threat Intel Cases List" },
        { key: "create-cases-advisory", label: "Create Threat Intel Case" },
        { key: "update-cases-advisory", label: "Update Threat Intel Case" },
        { key: "view-cases-advisory", label: "View Threat Intel Case" },
        { key: "pdf-cases-advisory", label: "Generate Threat Intel Case PDF Report" },
        { key: "send-email-cases-advisory", label: "Send Threat Intel Case Email Notification" },
        { key: "delete-cases-advisory", label: "Delete Threat Intel Case" },
        { key: "index-cases-risk", label: "View Risk Treatment Cases List" },
        { key: "create-cases-risk", label: "Create Risk Treatment Case" },
        { key: "update-cases-risk", label: "Update Risk Treatment Case" },
        { key: "view-cases-risk", label: "View Risk Treatment Case Details" },
        { key: "delete-cases-risk", label: "Delete Risk Treatment Case" },
        { key: "sla-incident-category", label: "SLA Cases Category" },
      ]
    },
    {
      key: 'dashboard_and_widgets',
      label: 'Dashboards and Widgets',
      properties: [
        { key: "index-dashboards", label: "View Custom Dashboards List" },
        { key: "create-dashboards", label: "Add Dashboard" },
        { key: "update-dashboards", label: "Update Dashboard" },
        { key: "add-dashboard-dashboards", label: "Add Dashboard to Profile" },
        { key: "remove-dashboard-dashboards", label: "Remove Dashboard from Profile" },
        { key: "delete-dashboards", label: "Delete Dashboard" },
        { key: "assets-dashboard", label: "View S3 Dashboard Asset Detail Page" },
        { key: "default-dashboard-dashboards", label: "Default Dashboard" },
      ]
    },
    {
      key: 'escalation_and_slas',
      label: 'Escalation and SLAs',
      properties: [
        { key: "index-incident-escalation", label: "View Escalation and SLA Rules" },
        { key: "create-incident-escalation", label: "Add Escalation and SLA Rule" },
        { key: "update-incident-escalation", label: "Update Escalation and SLA Rule" },
        { key: "delete-incident-escalation", label: "Delete Escalation and SLA Rule" },
        { key: "index-service-level-agreement", label: "Show New SLA List" },
        { key: "create-service-level-agreement", label: "Create New SLA" },
        { key: "update-service-level-agreement", label: "Update New SLA" },
        { key: "delete-service-level-agreement", label: "Delete New SLA" },
        { key: "view-service-level-agreement", label: "View New SLA" },
        { key: "logs-service-level-agreement", label: "SLA Logs" },
      ]
    },
    {
      key: 'incident_management',
      label: 'Incident Management',
      properties: [
        {
          key: "index-incident-classifications",
          label: "View Incident Classifications"
        },
        { key: "create-incident-classifications", label: "Add Incident Classification" },
        {
          key: "update-incident-classifications",
          label: "Update Incident Classification"
        },
        {
          key: "delete-incident-classifications",
          label: "Delete Incident Classification"
        },
        {
          key: "index-incident-category",
          label: "View Incident Categories"
        },
        {
          key: "create-incident-category",
          label: "Add Incident Category"
        },
        {
          key: "update-incident-category",
          label: "Update Incident Category"
        },
        {
          key: "update-close-tickets",
          label: "Update Closed Incidents & Cases"
        },
        {
          key: "delete-incident-category",
          label: "Delete Incident Category"
        },
        {
          key: "index-incident-subcategories",
          label: "View Incident Subcategories"
        },
        {
          key: "create-incident-subcategories",
          label: "Add Incident Subcategory"
        },
        {
          key: "update-incident-subcategories",
          label: "Update Incident Subcategory"
        },
        {
          key: "delete-incident-subcategories",
          label: "Delete Incident Subcategory"
        },
        {
          key: "index-incident-disposition-subcategory",
          label: "View Incident Subdispositons"
        },
        {
          key: "create-incident-disposition-subcategory",
          label: "Add Incident Subdispositon"
        },
        {
          key: "update-incident-disposition-subcategory",
          label: "Update Incident Subdispositons"
        },
        {
          key: "delete-incident-disposition-subcategory",
          label: "Delete Incident Subdispositons"
        },
        {
          key: "index-incident-disposition",
          label: "View Incident Dispositions"
        },
        {
          key: "create-incident-disposition",
          label: "Add Incident Disposition"
        },
        {
          key: "update-incident-disposition",
          label: "Update Incident Disposition"
        },
        {
          key: "delete-incident-disposition",
          label: "Delete Incident Disposition"
        },
        {
          key: "index-locations",
          label: "View Locations"
        },
        {
          key: "create-locations",
          label: "Add Location"
        },
        {
          key: "update-locations",
          label: "Update Location"
        },
        {
          key: "delete-locations",
          label: "Delete Location"
        },
        {
          key: "index-incident-tickets",
          label: "View Incident Management"
        },
        {
          key: "create-incident-tickets",
          label: "Add Incident"
        },
        {
          key: "update-incident-tickets",
          label: "Update Incident"
        },
        {
          key: "delete-incident-tickets",
          label: "Delete Incident"
        },
        {
          key: "view-incident-tickets",
          label: "View Incident Details"
        },
        {
          key: "print-incident-tickets",
          label: "Print Incident Details"
        },
        {
          key: "other-incident-tickets",
          label: "View \"Others\" Incident Dispositions List"
        },
        {
          key: "send-email-incident-tickets",
          label: "Email Ticket"
        },
        {
          key: "all-incident-tickets",
          label: "View List of All (Assigned & Unassigned) Tickets"
        },
        {
          key: "field-setting-incident-tickets",
          label: "Configure Incident Field Settings"
        },
        {
          key: "create-playbooks-queue",
          label: "Execute Playbook"
        },
        {
          key: "pdf-incident-tickets",
          label: "Generate Incidents PDF Report"
        },
        {
          key: "reports-incident-tickets",
          label: "View Incidents Reports"
        },
        {
          key: "spillover-report-incident-tickets",
          label: "Generate Incidents \"Spillover\" Report"
        },
        {
          key: "executive-report-incident-tickets",
          label: "Generate Incidents \"Executive\" Report "
        },
        {
          key: "week-executive-report-incident-tickets",
          label: "Generate Incidents \"Weekly Executive\" Report"
        },
        {
          key: "alf-report-incident-tickets",
          label: "Generate (BAF) Custom PDF Report"
        },
        {
          key: "hbl-report-incident-tickets",
          label: "HBL Custom Report"
        },
        {
          key: "ubl-report-incident-tickets",
          label: "UBL Custom Report"
        },
        {
          key: "ubl-excel-incident-tickets",
          label: "Generate (UBL) Custom Excel Report"
        },
        {
          key: "mbl-excel-incident-tickets",
          label: "Generate Incidents \"MBL Excel\" Report"
        },
        {
          key: "alerts-incident-tickets",
          label: "View Alerts List"
        },
        {
          key: "investigations-incident-tickets",
          label: "View Investigations List"
        },
        {
          key: "incidents-incident-tickets",
          label: "View Incidents List"
        },
        {
          key: "severity-breakdown-incident-tickets",
          label: "Incident Stats with Severity Breakdown"
        },
        {
          key: "all-incidents",
          label: "View All Incidents"
        },
        {
          key: "all-investigations",
          label: "View All Investigations"
        },
        {
          key: "all-alerts",
          label: "View All Alerts"
        },
        {
          key: "excel-incident-tickets",
          label: "Generate Excel Report"
        },
        {
          key: "albaraka-report-report-incident-tickets",
          label: "Generate (ALBaraka) Custom PDF Report"
        },
        {
          key: "delete-ncis-periority-colors",
          label: "Delete NCISS Priority Levels"
        },
        {
          key: "update-ncis-periority-colors",
          label: "Update NCISS Priority Levels"
        },
        {
          key: "create-ncis-periority-colors",
          label: "Create NCISS Priority Levels"
        },
        {
          key: "index-ncis-periority-colors",
          label: "View NCISS Priority Levels"
        },
        {
          key: "delete-ncis-scoring-categories",
          label: "Delete NCISS Categories"
        },
        {
          key: "update-ncis-scoring-categories",
          label: "Update NCISS Categories"
        },
        {
          key: "create-ncis-scoring-categories",
          label: "Create NCISS Categories"
        },
        {
          key: "index-ncis-scoring-categories",
          label: "View NCISS Categories"
        },
        {
          key: "delete-ncis-options-mapping",
          label: "Delete NCISS Category Options"
        },
        {
          key: "update-ncis-options-mapping",
          label: "Update NCISS Category Options"
        },
        {
          key: "create-ncis-options-mapping",
          label: "Create NCISS Category Options"
        },
        {
          key: "index-ncis-options-mapping",
          label: "NCISS Administration"
        },
        {
          key: "view-incident-subcategories",
          label: "View Incident Subcategories API"
        },
        {
          key: "view-incident-disposition-subcategory",
          label: "View Incident DispositionSubcategory API"
        }
      ]
    },
    {
      key: 'logging',
      label: 'Logging',
      properties: [
        { key: "index-action-logs", label: "View App Actions Execution Logs" },
        { key: "index-users-log", label: "View Users Logs" },
        { key: "index-ingestion-logs", label: "View Ingestion Logs" }
      ]
    },
    {
      key: 'risk_management',
      label: 'Risk Management',
      properties: [
        {
          key: "index-risk-assessment",
          label: "View Risk Assesments List",
        },
        {
          key: "create-risk-assessment",
          label: "Initiate Risk Assessment",
        },
        {
          key: "update-risk-assessment",
          label: "Update Risk Assessment",
        },
        {
          key: "mark-risk-assessment",
          label: "Mark Assessment as Complete",
        },
        {
          key: "import-risk-assessment",
          label: "Import Risk Assesment",
        },
        {
          key: "pdf-risk-assessment",
          label: "Generate Risk Asessment PDF Report",
        },
        {
          key: "export-excel-risk-assessment",
          label: "Export Risk Assessment (Excel)",
        },
        {
          key: "delete-risk-assessment",
          label: "Delete Risk Assessment",
        },
        {
          key: "index-risk-rating-color",
          label: "View Risk Matrix",
        },
        {
          key: "create-risk-rating-color",
          label: "Configure Risk Matrix Levels and Colors",
        },
        {
          key: "reset-risk-rating-color",
          label: "Reset Risk Matrix",
        },
        {
          key: "index-control-register",
          label: "View Control Register",
        },
        {
          key: "create-control-register",
          label: "Add Control",
        },
        {
          key: "update-control-register",
          label: "Update Control",
        },
        {
          key: "delete-control-register",
          label: "Delete Control",
        },
        {
          key: "index-risk-meta",
          label: "View Risk Meta Settings",
        },
        {
          key: "index-vulnerability-register",
          label: "View Non Technical Vulnerabilites List",
        },
        {
          key: "create-vulnerability-register",
          label: "Add Non Technical Vulnerability",
        },
        {
          key: "update-vulnerability-register",
          label: "Update Technical Vulnerability",
        },
        {
          key: "delete-vulnerability-register",
          label: "Delete Technical Vulnerability",
        },
        {
          key: "index-risk-scope",
          label: "View Risk Scopes List",
        },
        {
          key: "create-risk-scope",
          label: "Add Risk Scope",
        },
        {
          key: "update-risk-scope",
          label: "Update Risk Scope",
        },
        {
          key: "delete-risk-scope",
          label: "Delete Risk Scope",
        },
        {
          key: "index-risk-group-assessment",
          label: "View Risk Register",
        },
        {
          key: "create-risk-group-assessment",
          label: "Add Risk",
        },
        {
          key: "update-risk-group-assessment",
          label: "View Risk Assessment Details",
        },
        {
          key: "view-risk-group-assessment",
          label: "View Risk Details",
        },
        {
          key: "delete-risk-group-assessment",
          label: "Delete Risk",
        },
        {
          key: "index-likelihood-value",
          label: "View Likelihood Values List",
        },
        {
          key: "create-likelihood-value",
          label: "Add Likelihood Value",
        },
        {
          key: "change-title-likelihood-value",
          label: "Change Likelihood Title",
        },
        {
          key: "update-likelihood-value",
          label: "Update Likelihood Value",
        },
        {
          key: "delete-likelihood-value",
          label: "Delete Likelihood Value",
        },
        {
          key: "index-threat-register",
          label: "View Threats Register",
        },
        {
          key: "create-threat-register",
          label: "Add Threat",
        },
        {
          key: "update-threat-register",
          label: "Update Threat",
        },
        {
          key: "delete-threat-register",
          label: "Delete Threat",
        },
        {
          key: "create-risk-treatment",
          label: "Add Risk Treatment",
        },
        {
          key: "change-multiple-status-risk-treatment",
          label: "Change Multiple Risk Treatments Status",
        },
        {
          key: "update-risk-treatment",
          label: "Update Risk Treatment",
        },
        {
          key: "delete-risk-treatment",
          label: "Delete Risk Treatmen",
        },
        {
          key: "index-threat-value",
          label: "View Threat Values List",
        },
        {
          key: "create-threat-value",
          label: "Add Threat Value",
        },
        {
          key: "update-threat-value",
          label: "Update Threat Value",
        },
        {
          key: "delete-threat-value",
          label: "Delete Threat Value",
        },
        {
          key: "index-risk-business-impact",
          label: "View Business Impact Levels",
        },
        {
          key: "create-risk-business-impact",
          label: "Add Business Impact Level",
        },
        {
          key: "change-title-risk-business-impact",
          label: "Change Business Impact Title",
        },
        {
          key: "update-risk-business-impact",
          label: "Update Business Impact Level",
        },
        {
          key: "delete-risk-business-impact",
          label: "Delete Business Impact Level",
        },
        {
          key: "index-vulnerability-severity",
          label: "View Vulnerability Severity Levels",
        },
        {
          key: "create-vulnerability-severity",
          label: "Add Vulnerability Severity Level",
        },
        {
          key: "update-vulnerability-severity",
          label: "Update Vulnerability Severity Level",
        },
        {
          key: "delete-vulnerability-severity",
          label: "Delete Vulnerability Severity Level",
        },
        {
          key: "index-risk-score",
          label: "Update Risk Score Formula",
        },
        {
          key: "export-risk-group-assessment",
          label: "Export Risk Register",
        },
      ]
    },
    {
      key: 'super_admin',
      label: 'Super Admin',
      properties: [
        {
          key: "create-license",
          label: "Create License",
        },
        {
          key: "actions-application-output",
          label: "Test & Create Application Filter Queries",
        },
        {
          key: "index-feedback",
          label: "View Feedback Page",
        },
        {
          key: "create-feedback",
          label: "Share Feedback",
        },
        {
          key: "view-feedback",
          label: "View Feedback Details",
        },
        {
          key: "delete-feedback",
          label: "Delete Feedback",
        },
        {
          key: "create-applications",
          label: "Add Application",
        },
        {
          key: "update-applications",
          label: "Update Application",
        },
        {
          key: "delete-applications",
          label: "Delete Application",
        },
        {
          key: "index-organizations",
          label: "View Organizations List",
        },
        {
          key: "create-organizations",
          label: "Create Organization",
        },
        {
          key: "update-organizations",
          label: "Update Organization",
        },
        {
          key: "selectedone-organizations",
          label: "Switch Organization",
        },
        {
          key: "delete-organizations",
          label: "Delete Organization",
        },
        {
          key: "index-organizations-users",
          label: "View Organization Users List",
        },
        {
          key: "create-organizations-users",
          label: "Add Organizations User",
        },
        {
          key: "update-organizations-users",
          label: "Update Organizations User",
        },
        {
          key: "delete-organizations-users",
          label: "Delete Organizations User",
        },
        {
          key: "index-application-actions",
          label: "View Application Actions List",
        },
        {
          key: "create-application-actions",
          label: "Add Application Action",
        },
        {
          key: "update-application-actions",
          label: "Update Application Action",
        },
        {
          key: "delete-application-actions",
          label: "Delete Application actions",
        },
        {
          key: "index-application-action-io-types",
          label: "View Action IO Types",
        },
        {
          key: "create-application-action-io-types",
          label: "Add Action IO Type",
        },
        {
          key: "update-application-action-io-types",
          label: "Update Action IO Type",
        },
        {
          key: "delete-application-action-io-types",
          label: "Delete Action IO Type",
        },
        {
          key: "index-application-publishers",
          label: "View Publishers List",
        },
        {
          key: "create-application-publishers",
          label: "Add Publisher",
        },
        {
          key: "update-application-publishers",
          label: "Update Publisher",
        },
        {
          key: "delete-application-publishers",
          label: "Delete Publisher",
        },
        {
          key: "index-application-product-vendors",
          label: "View Product Vendors List",
        },
        {
          key: "create-application-product-vendors",
          label: "Add Product Vendor",
        },
        {
          key: "update-application-product-vendors",
          label: "Update Product Vendor",
        },
        {
          key: "delete-application-product-vendors",
          label: "Delete Product Vendor",
        },
        {
          key: "index-graphs",
          label: "View Dashboard Widgets List",
        },
        {
          key: "create-graphs",
          label: "Add Dashboard Widget",
        },
        {
          key: "update-graphs",
          label: "Update Dashboard Widget",
        },
        {
          key: "delete-graphs",
          label: "Delete Dashboard Widget",
        },
        {
          key: "index-health",
          label: "Sever Heath",
        },
      ]
    },
    {
      key: 'thred_intel',
      label: 'Threat Intelligence',
      properties: [
        {
          key: "index-rss-feed-entries",
          label: "View Ingested RSS Feed Threat Intel List",
        },
        {
          key: "view-rss-feed-entries",
          label: "View Ingested RSS Feed Threat Intel Details",
        },
        {
          key: "delete-rss-feed-entries",
          label: "Delete Ingested RSS Feed Threat Intel",
        },
        {
          key: "send-advisory-rss-feed-entries",
          label: "Push Single Ingested RSS Feed Threat Intel to Pending List",
        },
        {
          key: "send-multiple-advisories-rss-feed-entries",
          label: "Push Mutiple Ingested RSS Feed Threat Intels to Pending List",
        },
        {
          key: "index-rss-feed",
          label: "View RSS Feeds List",
        },
        {
          key: "create-rss-feed",
          label: "Add RSS Feed",
        },
        {
          key: "update-rss-feed",
          label: "Update RSS Feed",
        },
        {
          key: "delete-rss-feed",
          label: "Delete RSS Feed",
        },
        {
          key: "index-advisory-disposition",
          label: "View Threat Intel Dispositions List",
        },
        {
          key: "create-advisory-disposition",
          label: "Add Threat Intel Disposition",
        },
        {
          key: "update-advisory-disposition",
          label: "Update Threat Intel Disposition",
        },
        {
          key: "delete-advisory-disposition",
          label: "Delete Threat Intel Disposition",
        },
        {
          key: "index-advisory-subcategories",
          label: "View Threat Intel Subcategories List",
        },
        {
          key: "create-advisory-subcategories",
          label: "Add Threat Intel Subcategory",
        },
        {
          key: "update-advisory-subcategories",
          label: "Update Threat Intel Subcategory",
        },
        {
          key: "delete-advisory-subcategories",
          label: "Delete Threat Intel Subcategory",
        },
        {
          key: "pending-advisory",
          label: "View Pending Threat Intel List",
        },
        {
          key: "send-email-advisory",
          label: "Send Threat Intel Email Notification",
        },
        {
          key: "publish-advisory",
          label: "Publish Released Threat Intel",
        },
        {
          key: "index-advisory-category",
          label: "View Threat Intel Categories List",
        },
        {
          key: "create-advisory-category",
          label: "Add Threat Intel Category",
        },
        {
          key: "update-advisory-category",
          label: "Update Threat Intel Category",
        },
        {
          key: "delete-advisory-category",
          label: "Delete Threat Intel Category",
        },
        {
          key: "index-advisory",
          label: "View Released Threat Intel List",
        },
        {
          key: "create-advisory",
          label: "Add Threat Intel",
        },
        {
          key: "update-advisory",
          label: "Update Threat Intel",
        },
        {
          key: "view-advisory",
          label: "View Threat Intel",
        },
        {
          key: "reports-advisory",
          label: "Generate Threat Intel Reports",
        },
        {
          key: "pdf-advisory",
          label: "Generate Threat Intel Details PDF",
        },
        {
          key: "export-advisory",
          label: "Export Threat Intel XLS",
        },
        {
          key: "delete-advisory",
          label: "Delete Threat Intel",
        },
        {
          key: "delete-multiple-advisory",
          label: "Delete Multiple Threat Intels",
        },
        {
          key: "update-advisories-advisory",
          label: "Threat Intel Bulk Update",
        },
      ]
    },
    {
      key: 'valnerability_management',
      label: 'Vulnerability Management',
      properties: [
        {
          key: "index-vulnerability-assessment",
          label: "View Vulnerability Assessments List",
        },
        {
          key: "create-vulnerability-assessment",
          label: "Create Assessmen",
        },
        {
          key: "update-vulnerability-assessment",
          label: "Update Assessment",
        },
        {
          key: "delete-vulnerability-assessment",
          label: "Delete Assessment",
        },
        {
          key: "delete-multiple-vulnerability-assessment",
          label: "Delete Multiple Assessments",
        },
        {
          key: "pending-vulnerability-assessment",
          label: "View and Edit Pending Assessment",
        },
        {
          key: "import-vulnerability-assessment",
          label: "Import Vulnerabilities",
        },
        {
          key: "generate-reports-vulnerability-assessment",
          label: "Generate Vulnerability Assessment Reports",
        },
        {
          key: "pdf-vulnerability-assessment",
          label: "Generate PDF Report of All Vulnerabilities (Host)",
        },
        {
          key: "pdf-by-exploitable-vulnerability-assessment",
          label: "Generate PDF Report of Exploitable Vulnerabilities",
        },
        {
          key: "pdf-by-non-exploitable-vulnerability-assessment",
          label: "Generate PDF Report of Non Exploitable Vulnerabilities",
        },
        {
          key: "pdf-not-mitigated-without-evidence-vulnerability-assessment",
          label: "Generate PDF Report of Mitigated Vulnerabilities (w/o Evidence)",
        },
        {
          key: "pdf-not-mitigated-vulnerability-assessment",
          label: "Generate PDF Report of Non Mitigated Vulnerabilities",
        },
        {
          key: "pdf-by-vulnerabilities-vulnerability-assessment",
          label: "Generate PDF Report of All Vulnerabilities (IP)",
        },
        {
          key: "pdf-credentialed-patch-audit-vulnerability-assessment",
          label: "Generate PDF Report of Credentialed Patch Audit",
        },
        {
          key: "pdf-by-vulnerabilities-evidence-vulnerability-assessment",
          label: "Generate PDF Report of All Vulnerabilities (With Evidence)",
        },
        {
          key: "pdf-mitigated-vulnerability-assessment",
          label: "Generate PDF Report of Mitigated Vulnerabilities",
        },
        {
          key: "index-vulnerabilities-analytics",
          label: "View Vulnerabilities List/Register",
        },
        {
          key: "view-vulnerabilities-analytics",
          label: "View Vulnerability Details",
        },
        {
          key: "pdf-vulnerabilities-analytics",
          label: "Generate Vulnerabilities Register PDF Report",
        },
        {
          key: "export-vulnerabilities-analytics",
          label: "Export Vulnerabilities Register",
        },
        {
          key: "index-vulnerabilities-submit-scan",
          label: "View Automated Vulnerability Scans List",
        },
        {
          key: "create-vulnerabilities-submit-scan",
          label: "Add Vulnerability Scan",
        },
        {
          key: "update-vulnerabilities-submit-scan",
          label: "Update Vulnerability Scan",
        },
        {
          key: "delete-vulnerabilities-submit-scan",
          label: "Delete Vulnerability Scan",
        },
        {
          key: "launch-vulnerabilities-submit-scan",
          label: "Execute Vulnerability Scan",
        },
        {
          key: "paused-vulnerabilities-submit-scan",
          label: "Pause Vulnerability Scan",
        },
        {
          key: "resume-vulnerabilities-submit-scan",
          label: "Resume Vulnerability Scan",
        },
        {
          key: "stop-vulnerabilities-submit-scan",
          label: "Stop Vulnerability Scan",
        },
        {
          key: "check-status-vulnerabilities-submit-scan",
          label: "Check Vulnerability Scan Status",
        },
        {
          key: "update-status-vulnerabilities-submit-scan",
          label: "Update Vulnerability Scan Status",
        },
        {
          key: "index-vulnerabilities-list",
          label: "View Master (Technical) Vulnerabilities List (Admin)",
        },
        {
          key: "create-vulnerabilities-list",
          label: "Add Vulnerability",
        },
        {
          key: "update-vulnerabilities-list",
          label: "Update Vulnerability",
        },
        {
          key: "delete-vulnerabilities-list",
          label: "Delete Vulnerability",
        },
        {
          key: "duplicate-vulnerability-assessment",
          label: "Duplicate Vulnerability Assessment",
        },
        {
          key: "index-severity-order",
          label: "Severity",
        },
        {
          key: "create-severity-order",
          label: "Create Severity",
        },
        {
          key: "update-severity-order",
          label: "Update Severity",
        },
        {
          key: "delete-severity-order",
          label: "Delete Severity",
        },
        {
          key: "view-vulnerability-assessment",
          label: "View Vulnerability Assessments Details",
        },
      ]
    },
    {
      key: 'workflow_and_task_managment',
      label: 'Workflow and Task Management',
      properties: [
        { key: "create-tasks", label: "Add Task" },
        { key: "update-tasks", label: "Update Task" },
        { key: "delete-tasks", label: "Delete Single Task" },
        { key: "delete-multiple-tasks", label: "Delete Multiple Tasks" },
        { key: "index-workflow", label: "View Workflow Tasks List" },
        { key: "create-workflow", label: "Add Workflow Task" },
        { key: "duplicate-workflow", label: "Duplicate Workflow Task" },
        { key: "update-workflow", label: "Update Workflow Task" },
        { key: "change-status-workflow", label: "Change Workflow Task Status" },
        { key: "delete-workflow", label: "Delete Workflow Task" },
        { key: "index-task-categories", label: "View Workflow Task Categories" },
        { key: "create-task-categories", label: "Add Task Category" },
        { key: "update-task-categories", label: "Update Task Category" },
        { key: "delete-task-categories", label: "Delete Task Category" },
      ]
    },
  ]);



  useEffect(() => {
    if (isCreate) {
      onGetRols()
    }
  }, [onGetRols, isCreate])

  useEffect(() => {
    if (!_.isEmpty(groupList) && isCreate) {
      const groupListOptions = [];
      if (Object.keys(groupList).length !== 0) {
        for (const [key, value] of Object.entries(groupList)) {
          groupListOptions.push({
            key,
            value: parseInt(key),
            label: value,
          })
        }
      }
      setGroupListOptions(groupListOptions)
    }
  }, [groupList])



  useEffect(() => {
    if (record?.rac_actions && !isCreate) {
      const activeNotifications = record?.rac_actions?.split(',');
      const updatedPrivileges =
        map(privileges, notification => {
          map(notification.properties, property => {
            property.isEnabled = activeNotifications.includes(property.key)
            return property;
          })
          notification.isEnabled = filter(notification.properties, property => property.isEnabled).length > 0
          return notification;
        })
      setPrivileges(updatedPrivileges);
    }
  }, [record?.rac_actions]);

  const toggleSwitch = (notificationIndex, propertyKey, isParent) => {
    const updatedPrivileges =
      map(privileges, (notification, notificationKey) => {
        if (notificationKey === notificationIndex) {
          if (isParent) {
            notification.isEnabled = !notification.isEnabled;
          }

          map(notification.properties, property => {
            if (isParent) {
              property.isEnabled = notification.isEnabled;
            } else if (propertyKey === property.key) {
              property.isEnabled = !property.isEnabled;
            }
            return property;
          })
        }

        notification.isEnabled = filter(notification.properties, property => property.isEnabled).length > 0
        return notification;
      })
    setPrivileges(updatedPrivileges);
  };

  let validationSchemaStandard = Yup.object({
    rac_role_id: Yup.number().required('Required'),
  });

  return (
    <>
      <Formik
        id="formik"
        initialValues={{}}
        validationSchema={isCreate ? validationSchemaStandard : null}
        enableReinitialize
        onSubmit={(values, { resetForm }) => {
          const nta_notifications = [];
          map(privileges, (notification, notificationKey) => {
            map(notification.properties, property => {
              if (property.isEnabled) {
                nta_notifications.push(property.key);
              }
            });
          });
          if (isCreate) {
            const payload = {
              rac_actions: nta_notifications,
              rac_role_id: values.rac_role_id
            }
            createPrev(payload)
            resetForm()
          } else {
            const payload = {
              rac_actions: nta_notifications
            }
            if (record?.rac_id) {
              updatePrev(record?.rac_id, payload)
            }
          }
          closeModal()
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          resetForm,
          setFieldValue,
        }) => (
          <Form>
            <SelectBox
              id="rac_role_id"
              label="Role"
              name="rac_role_id"
              onInputChange={setFieldValue}
              onBlur={handleBlur}
              errorMessage={errors.rac_role_id}
              value={values.rac_role_id}
              touched={touched.rac_role_id}
              width={750}
              setHightAuto
              options={groupListOptions}
              isHide={!isCreate}
            />
            {errors.rac_role_id ? <ErrorText>{errors.rac_role_id}</ErrorText> : <></>}
            {/* <ErrorMessage name="upload_patch" render={msg => <ErrorText>{msg}</ErrorText>} /> */}
            {!isCreate && <Row style={{ marginBottom: 20 }} >
              <Col span={24} style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                <Label style={{ fontSize: 25, textTransform: "uppercase" }}>{record?.racRole?.uro_name}</Label>
              </Col>
            </Row>}

            {privileges && privileges.length > 0 && map(privileges, (notification, notificationIndex) => (
              <>
                <div className={notificationIndex === 0 ? "switch-wrapper" : "switch-wrapper mt-40"}>
                  <SPToggleSwitch onChecked={notification.isEnabled} onChange={() => toggleSwitch(notificationIndex, false, true)} />
                  <Label>{notification.label}</Label>
                </div>
                <Divider className="asset-separator" />
                <Row>
                  {map(notification.properties, property => (
                    <Col span={6}>
                      <div className="switch-wrapper main">
                        <SPToggleSwitch onChecked={property.isEnabled} onChange={() => toggleSwitch(notificationIndex, property.key, false)} />
                        <Label>{property.label}</Label>
                      </div>
                    </Col>
                  ))}
                </Row>
              </>
            ))}
            <Row className="mt-40">
              <Col span={2} >
                <SPButton
                  onButtonClick={handleSubmit}
                  title={isCreate ? "Assign" : "Update"}
                  size="small"
                />
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

const mapStateToProps = state => {
  return {
    groupList: state.administration.accessControlList?.previlegesGroup,
  };
};
const mapDispatchToProps = dispatch => ({
  onGetRols: () => {
    dispatch(onGetListOfRoles());
  },
  createPrev: (...args) => dispatch(createPrivileges(...args)),
  updatePrev: (...args) => dispatch(updatePrivileges(...args)),
});


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  AuthTokenHOC
)(PrevilegesItem);
