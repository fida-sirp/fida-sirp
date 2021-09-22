import React, { useState, useEffect } from 'react';
import { Col, Row, Divider } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { map, filter } from 'lodash';
import AuthTokenHOC from '../../../../../../../HOCs/AuthTokenHOC';
import SPToggleSwitch from '../../../../../../../components/SPToggleSwitch'
import { Label } from '../../../../../../../components/InputBox/StyledComponents';
import {
  getFieldSettings,
  updateFieldSettings
} from '../../../../../../../actions/administration';
import SPButton from '../../../../../../../components/SPButton';
import PageHeader from '../../../../../../layout/pageHeader';


const FieldSettings = ({onGetFieldSettings, fieldSettingsList, onUpdateFieldSettings}) => {
  const [notifications, setNotifications] = useState([]);

  const allNotifications = [
    {
      key: 'asf_hardware',
      label: 'Hardware',
      properties: [
        { key: 'ast_ip_address', label: 'IP Address'},
        { key: 'ast_external_ip_address', label: 'External IP Address'},
        { key: 'ast_hostname', label: 'Hostname'},
        { key: 'ast_netbios_name', label: 'NetBIOS Name'},
        { key: 'ast_name', label: 'Name'},
        { key: 'ast_dns', label: 'DNS'},
        { key: 'ast_owner_id', label: 'Owner'},
        { key: 'ast_custodian', label: 'Custodian'},
        { key: 'ast_os_id', label: 'Operating System'},
        { key: 'ast_products', label: 'Product'},
        { key: 'ast_vendor', label: 'Vendor'},
        { key: 'ast_ip_type', label: 'IP Type'},
        { key: 'ast_mac_address', label: 'MAC Address'},
        { key: 'ast_make', label: 'Make'},
        { key: 'ast_model', label: 'Model'},
        { key: 'ast_serial_no', label: 'Serial Number'},
        { key: 'ast_location', label: 'Location'},
        { key: 'ast_location_desc', label: 'Location Description'},
        { key: 'ast_branch_code', label: 'Branch Code'},
        { key: 'ast_classification', label: 'Classification'},
        { key: 'ast_description', label: 'Description'},
        { key: 'ast_siem', label: 'Integrated with SIEM'},
        { key: 'ast_zone', label: 'Zone'},
        { key: 'ast_server_type', label: 'Server Type'},
        { key: 'ast_power_status', label: 'Power Status'},
        { key: 'ast_system_type', label: 'System Type'},
        { key: 'ast_network_type', label: 'Network Type'},
        { key: 'ast_rack_number', label: 'Rack Number'},
        { key: 'ast_department', label: 'Department / Team'},
        { key: 'ast_slot_number', label: 'Slot Number'},
        { key: 'ast_status', label: 'Status'},
        { key: 'ast_remote_ap', label: 'Remote AP'},
        { key: 'ast_function', label: 'Function'},
        { key: 'ast_memory', label: 'Memory'},
        { key: 'ast_tag', label: 'IDF Tag'},
        { key: 'ast_hosted', label: 'Hosted'},
        { key: 'ast_integrated', label: 'Integrated with H+'},
        { key: 'ast_asset_form', label: 'Asset Form'},
      ]
    },
    {
      key: 'asf_software',
      label: 'Software',
      properties: [
        { key: 'ast_name', label: 'Name'},
        { key: 'ast_owner_id', label: 'Owner'},
        { key: 'ast_custodian', label: 'Custodian'},
        { key: 'ast_department', label: 'Department / Team'},
        { key: 'ast_serial_no', label: 'Serial Number'},
        { key: 'ast_products', label: 'Product'},
        { key: 'ast_vendor', label: 'Vendor'},
        { key: 'ast_software_type', label: 'Software Type'},
        { key: 'ast_current_version', label: 'Current Version'},
        { key: 'ast_number_of_licenses', label: 'Number of licenses'},
        { key: 'ast_classification', label: 'Classification'},
        { key: 'ast_description', label: 'Description'},
        { key: 'ast_zone', label: 'Zone'},
        { key: 'ast_asset_form', label: 'Asset Form'},
      ]
    },
    {
      key: 'asf_information',
      label: 'Information',
      properties: [
        { key: 'ast_name', label: 'Name'},
        { key: 'ast_owner_id', label: 'Owner'},
        { key: 'ast_department', label: 'Department / Team'},
        { key: 'ast_document_type', label: 'Document Type'},
        { key: 'ast_process_name', label: 'Process Name'},
        { key: 'ast_process_owner', label: 'Process Owner'},
        { key: 'ast_make', label: 'Identifier'},
        { key: 'ast_number_of_licenses', label: 'Number of Instances'},
        { key: 'ast_location', label: 'Location'},
        { key: 'ast_classification', label: 'Classification'},
        { key: 'ast_description', label: 'Description'},
        { key: 'ast_zone', label: 'Zone'},
        { key: 'ast_asset_form', label: 'Asset Form'},
      ]
    },
    {
      key: 'asf_people',
      label: 'People',
      properties: [
        { key: 'ast_name', label: 'Name'},
        { key: 'ast_employee_number', label: 'Employee Number'},
        { key: 'ast_department', label: 'Department / Team'},
        { key: 'ast_department_head', label: 'Department Head'},
        { key: 'ast_organizational_unit', label: 'Organizational Unit'},
        { key: 'ast_designation', label: 'Designation'},
        { key: 'ast_location', label: 'Location'},
        { key: 'ast_nationality', label: 'Nationality'},
        { key: 'ast_supervisor_id', label: 'Immediate Supervisor ID'},
        { key: 'ast_supervisor_name', label: 'Immediate Supervisor Name'},
        { key: 'ast_employee_type', label: 'Employee Type'},
        { key: 'ast_email', label: 'Email'},
        { key: 'ast_account_expiration', label: 'Account Expiration Date'},
        { key: 'ast_asset_form', label: 'Asset Form'},
      ]
    },
    {
      key: 'asf_outsourced',
      label: 'Outsourced',
      properties: [
        { key: 'ast_name', label: 'Service Name'},
        { key: 'ast_process_owner', label: 'Process Owner'},
        { key: 'ast_make', label: 'Vendor'},
        { key: 'ast_location', label: 'Vendor Detail'},
        { key: 'ast_classification', label: 'Classification'},
        { key: 'ast_department', label: 'Department / Team'},
        { key: 'ast_description', label: 'Description'},
        { key: 'ast_asset_form', label: 'Asset Form'},
      ]
    },

    {
      key: 'asf_infrastructure',
      label: 'Infrastructure',
      properties: [
        { key: 'ast_name', label: 'Name'},
        { key: 'ast_location', label: 'Location'},
        { key: 'ast_owner_id', label: 'Owner'},
        { key: 'ast_custodian', label: 'Custodian'},
        { key: 'ast_department', label: 'Department / Team'},
        { key: 'ast_location_desc', label: 'Location Description'},
        { key: 'ast_description', label: 'Description'},
        { key: 'ast_asset_form', label: 'Asset Form'},
      ]
    },
    {
      key: 'asf_paper_document',
      label: 'Paper Document',
      properties: [
        { key: 'ast_name', label: 'Name'},
        { key: 'ast_owner_id', label: 'Owner'},
        { key: 'ast_custodian', label: 'Custodian'},
        { key: 'ast_process_name', label: 'Process Name'},
        { key: 'ast_process_owner', label: 'Process Owner'},
        { key: 'ast_identifier', label: 'Identified'},
        { key: 'ast_number_of_instances', label: 'Number of Instances'},
        { key: 'ast_current_version', label: 'Current Version'},
        { key: 'ast_location', label: 'Location'},
        { key: 'ast_location_desc', label: 'Location Description'},
        { key: 'ast_classification', label: 'Classification'},
        { key: 'ast_description', label: 'Description'},
        { key: 'ast_zone', label: 'Zone'},
        { key: 'ast_department', label: 'Department / Team'},
        { key: 'ast_document_type', label: 'Document Type'},
        { key: 'ast_asset_form', label: 'Asset Form'},
      ]
    },
    {
      key: 'asf_service',
      label: 'Service',
      properties: [
        { key: 'ast_name', label: 'Name'},
        { key: 'ast_description', label: 'Description'},
        { key: 'ast_owner_id', label: 'Owner'},
        { key: 'ast_custodian', label: 'Custodian'},
        { key: 'ast_department', label: 'Department / Team'},
        { key: 'ast_products', label: 'Product'},
        { key: 'ast_vendor', label: 'Vendor'},
        { key: 'ast_location', label: 'Location'},
        { key: 'ast_location_desc', label: 'Location Description'},
        { key: 'ast_classification', label: 'Classification'},
        { key: 'ast_siem', label: 'Integrated with SIEM'},
        { key: 'ast_zone', label: 'Zone'},
        { key: 'ast_category', label: 'Machine Category'},
        { key: 'ast_server_type', label: 'Server Type'},
        { key: 'ast_ip_address', label: 'IP Address'},
        { key: 'ast_hostname', label: 'Hostname'},
        { key: 'ast_netbios_name', label: 'NetBIOS Name'},
        { key: 'ast_dns', label: 'DNS'},
        { key: 'ast_os_id', label: 'Operating System'},
        { key: 'ast_power_status', label: 'Power Status'},
        { key: 'ast_make', label: 'Make'},
        { key: 'ast_model', label: 'Model'},
        { key: 'ast_serial_no', label: 'Serial Number'},
        { key: 'ast_system_type', label: 'System Type'},
        { key: 'ast_network_type', label: 'Network Type'},
        { key: 'ast_asset_form', label: 'Asset Form'},
      ]
    },
    {
      key: 'asf_application',
      label: 'Application',
      properties: [
        { key: 'ast_name', label: 'Name'},
        { key: 'ast_products', label: 'Product'},
        { key: 'ast_vendor', label: 'Vendor'},
        { key: 'ast_description', label: 'Description'},
        { key: 'ast_serial_no', label: 'Version Number'},
        { key: 'ast_owner_id', label: 'Owner'},
        { key: 'ast_custodian', label: 'Custodian'},
        { key: 'ast_current_version', label: 'Current Version'},
        { key: 'ast_department', label: 'Department / Team'},
        { key: 'ast_classification', label: 'Classification'},
        { key: 'ast_database', label: 'Database'},
        { key: 'ast_administrator', label: 'IT Administrator'},
        { key: 'ast_key_user', label: 'Key User'},
        { key: 'ast_app_type', label: 'App Type'},
        { key: 'ast_installation', label: 'Installation'},
        { key: 'ast_server', label: 'Server'},
        { key: 'ast_hosted', label: 'Hosted'},
        { key: 'ast_integrated', label: 'Integrated with H+'},
        { key: 'ast_asset_form', label: 'Asset Form'},
      ]
    },
  ];

  useEffect(onGetFieldSettings, []);

  useEffect(() => {
    if(fieldSettingsList?.items?.length > 0) {
      const updatedNotification =
        map(allNotifications, notification => {
          const activeNotifications = fieldSettingsList?.items[0]?.[notification.key].split(',');
          map(notification.properties, property => {
            property.isEnabled = activeNotifications.includes(property.key)
            return property;
        })

        notification.isEnabled = filter(notification.properties, property => property.isEnabled).length > 0
        return notification;
      })

      setNotifications(updatedNotification);
    }
  }, [fieldSettingsList]);

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

    onUpdateFieldSettings(payload)
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
    fieldSettingsList: state.administration?.fieldSettingsList?.listData,
  };
};

const mapDispatchToProps = dispatch => ({
  onGetFieldSettings: () => dispatch(getFieldSettings()),
  onUpdateFieldSettings: (payload) => dispatch(updateFieldSettings(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  AuthTokenHOC
)(FieldSettings);
