import React, { useState, useEffect } from 'react';
import { Col, Row, Divider } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { map, filter } from 'lodash';
import AuthTokenHOC from '../../../../../../HOCs/AuthTokenHOC';
import SPToggleSwitch from '../../../../../../components/SPToggleSwitch';
import { Label } from '../../../../../../components/InputBox/StyledComponents';
import {
  getNotifications,
  updateNotifictions
} from '../../../../../../actions/administration';
import SPButton from '../../../../../../components/SPButton';
import PageHeader from '../../../../../layout/pageHeader';

const Notifications = ({onGetNotifications, notificationList, onUpdateNotifictions}) => {
  const [notifications, setNotifications] = useState([]);

  const allNotifications = [
    {
      key: 'incident',
      label: 'Incident',
      properties: [
        { key: 'create-incident-tickets', label: 'Create Incident'},
        { key: 'update-incident-tickets', label: 'Update Incident'},
        { key: 'delete-incident-tickets', label: 'Delete Incident'},
        { key: 'close-incident-tickets', label: 'Close Incident'},
        { key: 'add-comment-incident-tickets', label: 'Add Comment Tickets'},
      ]
    },
    {
      key: 'vulnerability',
      label: 'Vulnerability',
      properties: [
        { key: 'create-vulnerabilities-list', label: 'Create Vulnerability Repository'},
        { key: 'delete-vulnerabilities-list', label: 'Delete Vulnerability Repository'},
        { key: 'update-vulnerabilities-list', label: 'Update Vulnerability Repository'},
        { key: 'create-vulnerability-assessment', label: 'Create Vulnerability Assessment'},
        { key: 'update-vulnerability-assessment', label: 'Update Vulnerability Assessment'},
        { key: 'delete-vulnerability-assessment', label: 'Delete Vulnerability Assessment'},
      ]
    },
    {
      key: 'asset',
      label: 'Asset',
      properties: [
        { key: 'create-asset', label: 'Create Asset'},
        { key: 'update-asset', label: 'update Asset'},
        { key: 'delete-asset', label: 'Delete Asset'},
      ]
    },
    {
      key: 'tasks',
      label: 'Task',
      properties: [
        { key: 'create-tasks', label: 'Create Task'},
        { key: 'update-tasks', label: 'update Task'},
        { key: 'delete-tasks', label: 'Delete Task'},
        { key: 'assign-tasks', label: 'Assign Task'},
        { key: 'status-tasks', label: 'Change Task Status'},
      ]
    },
    {
      key: 'case',
      label: 'Case',
      properties: [
        { key: 'create-cases-advisory', label: 'Create Case Advisory'},
        { key: 'update-cases-advisory', label: 'update Case Advisory'},
        { key: 'delete-cases-advisory', label: 'Delete Case Advisory'},
        { key: 'close-cases-advisory', label: 'Close Case Advisory'},
        { key: 'add-comment-advisory', label: 'Add Comment Case Advisory'},
        { key: 'create-cases-vulnerability', label: 'Create Case Vulnerability'},
        { key: 'update-cases-vulnerability', label: 'Update Case Vulnerability'},
        { key: 'delete-cases-vulnerability', label: 'Delete Case Vulnerability'},
        { key: 'close-cases-vulnerability', label: 'Close Case Vulnerability'},
        { key: 'add-comment-vulnerability', label: 'Add Comment Case Vulnerability'},
        { key: 'create-cases-risk', label: 'Create Case Risk'},
        { key: 'update-cases-risk', label: 'Update Case Risk'},
        { key: 'delete-cases-risk', label: 'Delete Case Risk'},
        { key: 'close-cases-risk', label: 'Close Case Risk'},
        { key: 'add-comment-advisory', label: 'Add Comment Case Risk'},
      ]
    },

    {
      key: 'advisory',
      label: 'Threat Intel',
      properties: [
        { key: 'create-advisory', label: 'Create Threat Intel'},
        { key: 'update-advisory', label: 'update Threat Intel'},
        { key: 'delete-advisory', label: 'Delete Threat Intel'},
        { key: 'release-advisory', label: 'Assign Threat Intel'},
      ]
    },
  ];

  useEffect(onGetNotifications, []);

  useEffect(() => {
    if(notificationList?.items?.length > 0) {
      const activeNotifications = notificationList?.items[0]?.nta_notifications.split(',');
      const updatedNotification =
        map(allNotifications, notification => {
          map(notification.properties, property => {
            property.isEnabled = activeNotifications.includes(property.key)
            return property;
        })

        notification.isEnabled = filter(notification.properties, property => property.isEnabled).length > 0
        return notification;
      })

      setNotifications(updatedNotification);
    }
  }, [notificationList]);

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
    const nta_notifications = [];
    map(notifications, (notification, notificationKey) => {
      map(notification.properties, property => {
        if(property.isEnabled) {
          nta_notifications.push(property.key);
        }
      });
    });

    onUpdateNotifictions({nta_notifications})
  };

  return (
    <>
      <PageHeader title="Notifications" />
      {notifications && notifications.length > 0 && map(notifications, (notification, notificationIndex) => (
        <div className="mt-40">
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
        </div> 
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
    notificationList: state.administration?.notificationList?.listData,
  };
};

const mapDispatchToProps = dispatch => ({
  onGetNotifications: () => dispatch(getNotifications()),
  onUpdateNotifictions: (payload) => dispatch(updateNotifictions(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  AuthTokenHOC
)(Notifications);
