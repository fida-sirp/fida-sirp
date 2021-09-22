
import React, { useState, useEffect } from 'react';
import { Col, Row, Divider } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { map, filter } from 'lodash';
import AuthTokenHOC from '../../../../../../../HOCs/AuthTokenHOC';
import SPToggleSwitch from '../../../../../../../components/SPToggleSwitch'
import { Label } from '../../../../../../../components/InputBox/StyledComponents';
import {
  getCaseFieldSettings,
  updateCaseFieldSettings,
} from '../../../../../../../actions/administration';
import SPButton from '../../../../../../../components/SPButton';
import PageHeader from '../../../../../../layout/pageHeader';


const FieldSettings = ({onGetCaseFieldSettings, caseFieldSettingsList, onUpdateCaseFieldSettings}) => {
  const [notifications, setNotifications] = useState([]);

  const allNotifications = [
    {
      key: 'tkf_incident',
      label: 'Incident',
      properties: [
        { key: 'iti_handler_id', label: 'Members'},
        { key: 'iti_category_details', label: 'Subcategories'},
        { key: 'iti_analysis_summary', label: 'Analysis Summary'},
        { key: 'iti_owner', label: 'Owner / Custodian'},
        { key: 'iti_attack_date', label: 'Attack Date'},
        { key: 'iti_detect_date', label: 'Detection Date'},
        { key: 'iti_attack_ended', label: 'Attack Ended'},
        { key: 'iti_attack_duration', label: 'Attack Duration'},
        { key: 'iti_escalation_date', label: 'Escalation Date'},
        { key: 'iti_estimated_recovery_clock', label: 'Estimated Recovery Clock'},
        { key: 'iti_approx_users_affeacted', label: 'Users Affected'},
        { key: 'iti_approx_host_affeacted', label: 'Hosts Affected'},
        { key: 'iti_aware_incident', label: 'Detection Method'},
        { key: 'iti_evidence_description', label: 'Evidence Description'},
        { key: 'iti_compromised_asset', label: 'Affected Assets'},
        { key: 'iti_data_compromised', label: 'Data Compromised'},
        { key: 'iti_system_damage_detail', label: 'Damage Details'},
        { key: 'iti_suggestions_recovery', label: 'Remediation Details'},
        { key: 'iti_rca', label: 'Root Cause Analysis'},
        { key: 'iti_closed_remediation', label: 'Implemented Remediation'},
      ]
    },
    {
      key: 'tkf_alert',
      label: 'Alert',
      properties: [
        { key: 'iti_handler_id', label: 'Members'},
        { key: 'iti_category_details', label: 'Subcategories'},
        { key: 'iti_analysis_summary', label: 'Alert Summary'},
        { key: 'iti_owner', label: 'Owner / Custodian'},
        { key: 'iti_attack_date', label: 'Alert Date'},
        { key: 'iti_detect_date', label: 'Detection Date'},
        { key: 'iti_attack_ended', label: 'Alert Ended'},
        { key: 'iti_attack_duration', label: 'Alert Duration'},
        { key: 'iti_escalation_date', label: 'Escalation Date'},
        { key: 'iti_estimated_recovery_clock', label: 'Estimated Recovery Clock'},
        { key: 'iti_estimated_recovery_hours', label: 'Estimated Recovery Hours'},
        { key: 'iti_approx_users_affeacted', label: 'Users Affected'},
        { key: 'iti_approx_host_affeacted', label: 'Hosts Affected'},
        { key: 'iti_aware_incident', label: 'Alert Type'},
        { key: 'iti_evidence_description', label: 'Evidence Description'},
        { key: 'iti_compromised_asset', label: 'Affected Assets'},
        { key: 'iti_data_compromised', label: 'Data Compromised'},
        { key: 'iti_system_damage_detail', label: 'Damage Details'},
        { key: 'iti_suggestions_recovery', label: 'Remediation Details'},
        { key: 'iti_rca', label: 'Root Cause Analysis'},
        { key: 'iti_closed_remediation', label: 'Implemented Remediation'},
      ]
    },
    {
      key: 'tkf_investigation',
      label: 'Investigation',
      properties: [
        { key: 'iti_handler_id', label: 'Members'},
        { key: 'iti_category_details', label: 'Subcategories'},
        { key: 'iti_analysis_summary', label: 'Anomaly Observe'},
        { key: 'iti_owner', label: 'Owner / Custodian'},
        { key: 'iti_attack_date', label: 'Investigation Date'},
        { key: 'iti_detect_date', label: 'Detection Date'},
        { key: 'iti_attack_ended', label: 'Investigation Ended'},
        { key: 'iti_attack_duration', label: 'Investigation Duration'},
        { key: 'iti_escalation_date', label: 'Escalation Date'},
        { key: 'iti_estimated_recovery_clock', label: 'Estimated Recovery Clock'},
        { key: 'iti_estimated_recovery_hours', label: 'Estimated Recovery Hours'},
        { key: 'iti_approx_users_affeacted', label: 'Users Investigated'},
        { key: 'iti_approx_host_affeacted', label: 'Hosts Investigated'},
        { key: 'iti_aware_incident', label: 'Investigation Type'},
        { key: 'iti_evidence_description', label: 'Evidence Description'},
        { key: 'iti_compromised_asset', label: 'Affected Assets'},
        { key: 'iti_data_compromised', label: 'Data Compromised'},
        { key: 'iti_system_damage_detail', label: 'Damage Details'},
        { key: 'iti_suggestions_recovery', label: 'Remediation Details'},
        { key: 'iti_rca', label: 'Root Cause Analysis'},
        { key: 'iti_closed_remediation', label: 'Implemented Remediation'}
      ]
    },
  ];

  useEffect(onGetCaseFieldSettings, []);

  useEffect(() => {
    if(caseFieldSettingsList && Object.keys(caseFieldSettingsList)?.length > 0) {
      const updatedNotification =
        map(allNotifications, notification => {
          const activeNotifications = caseFieldSettingsList[0]?.[notification.key].split(',');
          map(notification.properties, property => {
            property.isEnabled = activeNotifications.includes(property.key)
            return property;
        })

        notification.isEnabled = filter(notification.properties, property => property.isEnabled).length > 0
        return notification;
      })

      setNotifications(updatedNotification);
    }
  }, [caseFieldSettingsList]);

  const toggleSwitch = (notificationIndex, propertyKey, isParent) => {
    const updatedNotification =
        map(notifications, (notification, notificationKey) => {
          if(notificationKey === notificationIndex) {
            if(isParent) {
              notification.isEnabled = !notification.isEnabled;
            }
            
            map(notification.properties, property => {
                if(isParent) {
                  property.isEnabled = notification.isEnabled;
                } else if(propertyKey === property.key){
                  property.isEnabled = !property.isEnabled;
                }
                return property;
            })
          }
          
          notification.isEnabled = filter(notification.properties, property => property.isEnabled).length > 0
          return notification;
        })
      setNotifications(updatedNotification);
  };
  
  const onUpdateNotificationForm = () => {
    const payload = {};
    map(notifications, (notification, notificationKey) => {
      payload[notification.key] =[];
      map(notification.properties, property => {
        if(property.isEnabled) {
          payload[notification.key].push(property.key);
        }
      });

      payload[notification.key] = payload[notification.key].toString();
    });

    onUpdateCaseFieldSettings(payload)
  };

  return (
    <>
      <PageHeader
        title="Asset Fields Settings"
      />
      {notifications && notifications.length > 0 && map(notifications, (notification, notificationIndex) => (
        <>
          <div className={notificationIndex === 0 ? "switch-wrapper" : "switch-wrapper mt-40"}>
            <SPToggleSwitch onChecked={notification.isEnabled} onChange={() => toggleSwitch(notificationIndex, false, true)} />
            <Label>{notification.label}</Label>
          </div>
          <Divider className="asset-separator" />
          <Row>
            {map(notification.properties, property => (
              <Col span={8}>
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
            onButtonClick={onUpdateNotificationForm}
            title="Update"
            size="small"
          />
        </Col>
      </Row>
      
    </>
  );
};

const mapStateToProps = state => {
  return {
    caseFieldSettingsList: state.administration?.caseFieldSettingsList?.listData,
  };
};

const mapDispatchToProps = dispatch => ({
  onGetCaseFieldSettings: () => dispatch(getCaseFieldSettings()),
  onUpdateCaseFieldSettings: (payload) => dispatch(updateCaseFieldSettings(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  AuthTokenHOC
)(FieldSettings);
