/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as _  from  'lodash'
 
import './styles.css';
import Button from '../../../../../../components/SPButton';
import API from '../../../../../../config/endpoints.config';
import SendEmailAlerts from './SendEmailAlert/SendEmailAlert';
import AddMembers from './AddMembers/AddMembers';
import ChangePriority from './ChangePriority/ChangePriority';
import ChangeDisposition from './ChangeDisposition/ChangeDisposition';
import AssignTask from './AssignTask/AssignTask';
import ChangeSeverity from './ChangeSeverity/ChangeSeverity';
import ChangeCategory from './ChangeCategory/ChangeCategory';
import ChangeStatus from './ChangeStatus/ChangeStatus';
import SendReportedIocs from './SendReportedIocs/SendReportedIocs';
import SelectBox from '../Shared/SelectBox/SelectBox';

import CacheSirpActions from '../services/sirp/sirpactions.service';
import CacheSirpMembers from '../services/sirp/sirpmembers.service';
import CacheSirpEmails from '../services/sirp/sirpemails.service';
import CacheDisposition from '../services/sirp/disposition.service';
import CacheTaskCategries from '../services/sirp/taskcategory.service';
import CacheRiskRate from '../services/sirp/riskrate.service';
import CacheSirpCategories from '../services/sirp/sirpcategories.service';


const SirpSetting = props => {
  const selectedNodeData = _.cloneDeep(props.sirpOptions);
  const [sirpOption, setSirpOption] = useState({
    value: '',
    key: '',
    act_description: '',
    act_app_id: '',
  });

  const [sirpActions, setSirpActions] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [priorityStatus, setPriorityStatus] = useState(false);
  const [membersStatus, setMembersStatus] = useState(false);
  const [categoryStatus, setCategoryStatus] = useState(false);
  const [emailAlertStatus, setEmailAlertStatus] = useState(false);
  const [dispositionStatus, setDispositionStatus] = useState(false);
  const [assignTaskStatus, setAssignTaskStatus] = useState(false);
  const [severityStatus, setSeverityStatus] = useState(false);
  const [changeStatus, setChangeStatus] = useState(false);
  const [reportedIocsStatus, setReportedIocsStatus] = useState(false);

  const [selectedEmails, setSelectedEmails] = useState([]);
  const [userEmail, setUserEmails] = useState([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [disposition, setDisposition] = useState([]);
  const [subDisposition, setSubDisposition] = useState([]);
  const [selectedDisposition, setSelectedDisposition] = useState({
    value: '',
    key: '',
  });
  const [selectedSubDisposition, setSelectedSubDisposition] = useState({
    value: '',
    key: '',
    dsc_organization: '',
  });

  const [sirpLoader, setSirpLoader] = useState(true);
  const [dispositionLoader, setDispositionLoader] = useState(true);
  const [subDispositionLoader, setSubDispositionLoader] = useState(false);
  const [categoryLoader, setCategoryLoader] = useState(true);
  const [subCategoryLoader, setSubCategoryLoader] = useState(false);
  const [riskRateLoader, setRiskRateLoader] = useState(true);
  const [categoryTaskLoader, setCategoryTaskLoader] = useState(true);
  const [assignToLoader, setAssignToLoader] = useState(true);

  const [taskCategories, setTaskcategories] = useState([]);
  const [selectedTaskHandle, setSelectedTaskHandle] = useState(false);
  const [selectedTaskMembers, setSelecedMemberSelect] = useState(false);
  const [taskDescription, setTaskDescription] = useState('');
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [selectedTaskCategory, setSelectedTaskCategory] = useState({
    key: '',
    value: '',
    tca_created_at: '',
    tca_organization: '',
    tca_updated_at: '',
  });

  const [selectedAssigned, setSelectedAssigned] = useState({
    key: '',
    value: '',
  });

  const [severityArr, setSeverityArr] = useState([]);
  const [severity, setSeverity] = useState({
    value: '',
    key: '1',
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    key: '',
    value: '',
  });

  const [selectedSubCategory, setSelectedSubCategory] = useState({
    key: '',
    value: '',
  });

  const [status, setStatus] = useState({
    value: '',
    key: '1',
  });

  const [email, setEmail] = useState('');



  const statusOptions = [
    { value: 'Any', key: '1' },
    { value: 'Open', key: '2' },
    { value: 'Close', key: '3' },
    { value: 'Deferred', key: '4' },
  ];

  /**
   *
   * @param {*} event - event
   * Handle Actions change
   */
  const handleActionsChanged = async key => {
    selectedNodeData.action = '';
    const filter = filterArray(sirpActions, key);
    setSirpOption(filter);
    showSubOptions(filter.value);
  };

  const showSubOptions = async value => {
    switch (value) {
      case 'change_priority':
        // eslint-disable-next-line prettier/prettier
        toggleSubComponent(
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        );
        fetchRiskRate();
        // setSubOptions([{ value: 'Any', key: '1' }]);
        break;

      case 'add_members':
        // eslint-disable-next-line prettier/prettier
        toggleSubComponent(
          false,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        );
        // eslint-disable-next-line no-case-declarations
        const response = await fetchMembers();
        if (response) {
          setMembers(response.data.data);
          if(selectedNodeData?.handlers && selectedNodeData.handlers.length>0){
               setSelectedMembers(selectedNodeData.handlers)
          }
        }

        break;

      case 'send_email_notifications':
        if(selectedNodeData?.emails && selectedNodeData.emails !== ''){
          const string = selectedNodeData.emails;
          const emails = string.split(',');

          setSelectedEmails(emails);
        }

        if(selectedNodeData?.subject && selectedNodeData.subject !== ''){
          setSubject(selectedNodeData.subject); 
        }

        if(selectedNodeData?.message && selectedNodeData.message !== ''){
          setMessage(selectedNodeData.message);
        }
        // eslint-disable-next-line prettier/prettier
        toggleSubComponent(
          false,
          false,
          true,
          false,
          false,
          false,
          false,
          false,
          false
        );
        fetchEmails();
        break;

      case 'create_case':
        setDisabled(false);
        // eslint-disable-next-line prettier/prettier
        toggleSubComponent(
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        );
        break;

      case 'change_disposition':

        // eslint-disable-next-line prettier/prettier
        toggleSubComponent(
          false,
          false,
          false,
          true,
          false,
          false,
          false,
          false,
          false
        );
        fetchDisposition();
        if (selectedNodeData.ticketdisposition !== '') {
          const dispId = Number(selectedNodeData.ticketdisposition);
          fetchSubDispositions(dispId);
        }
        break;

      case 'assign_task':
        // eslint-disable-next-line prettier/prettier
        toggleSubComponent(
          false,
          false,
          false,
          false,
          true,
          false,
          false,
          false,
          false
        );
        fetchTaskCategories();
        // eslint-disable-next-line no-case-declarations
        const membersResponse = await fetchMembers();
        // eslint-disable-next-line no-case-declarations
        if (membersResponse) {
          const data = membersResponse.data.data.map((item, index) => {
            return {
              key: String(item.usr_id),
              value: item.usr_name,
            };
          });
          setMembers(data);
          setSelectedAssigned(data[0]);

          if( selectedNodeData?.task_name && selectedNodeData.task_name !== ''){
            setTaskName(selectedNodeData.task_name);
          }

          if(selectedNodeData?.description && selectedNodeData.description!== ''){
            setTaskDescription(selectedNodeData.description);
          }
        }
        break;

      case 'get_asset_details':
        setDisabled(false);
        // eslint-disable-next-line prettier/prettier
        toggleSubComponent(
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        );
        break;

      case 'change_severity':
        // eslint-disable-next-line prettier/prettier
        toggleSubComponent(
          false,
          false,
          false,
          false,
          false,
          true,
          false,
          false,
          false
        );
        fetchRiskRate();
        break;

      case 'change_category':
        // eslint-disable-next-line prettier/prettier
        toggleSubComponent(
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          false,
          false
        );
        fetchCategories();
        if (selectedNodeData.ticketcategory !== '') {
          const catId = Number(selectedNodeData.ticketcategory);
          fetchSubCategories(catId);
        }
        break;

      case 'change_status':
        // eslint-disable-next-line prettier/prettier
        toggleSubComponent(
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true,
          false
        );

        if (selectedNodeData.ticketstatus !== '') {
          setStatus({ key: selectedNodeData.ticketstatus, value: '' });
        } else {
          setStatus(statusOptions[0]);
        }
        setDisabled(false);
        break;

      case 'send_reported_iocs':
        // eslint-disable-next-line prettier/prettier
        toggleSubComponent(
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          true
        );
        break;
      default:
    }
  };

  const toggleSubComponent = (
    priority,
    member,
    email,
    disposition,
    task,
    severity,
    category,
    status,
    reported
  ) => {
    setPriorityStatus(priority);
    setEmailAlertStatus(email);
    setMembersStatus(member);
    setDispositionStatus(disposition);
    setAssignTaskStatus(task);
    setSeverityStatus(severity);
    setCategoryStatus(category);
    setChangeStatus(status);
    setReportedIocsStatus(reported);
  };

  /**
   *
   * @param {*} itemsArr - array of items
   * Filter array and return value
   */
  const filterArray = (itemsArr, key) => {
    const filteredArray = itemsArr.filter(item => {
      return item.key === key;
    });
    return filteredArray[0];
  };

  /**
   * Function for get sirp actions
   */
  const getSirpActions = async () => {
    const response = await new CacheSirpActions().fetchSirpActions();
    if (response) {
      setSirpLoader(false);
      const data = response.data.data.map((item, index) => {
        return {
          key: String(item.act_id),
          value: item.act_name,
          act_app_id: item.act_app_id,
          act_description: item.act_description,
        };
      });

      setSirpActions(data);
      if (selectedNodeData.name !== 'SIRP') {
        setSirpOption({
          value: selectedNodeData.name,
          key: selectedNodeData.action,
          act_description: '',
          act_app_id: selectedNodeData.app,
        });
      }
    }
  };

  /**
   * Function for fetch emails from server
   */
  const fetchEmails = async () => {
    const response = await new CacheSirpEmails().fetchSirpAEmails();
    if (response) {
      const emails = [];
      // eslint-disable-next-line prefer-destructuring
      const data = response.data.data;
      // eslint-disable-next-line no-restricted-syntax
      for (const email in data) {
        // eslint-disable-next-line no-prototype-builtins
        if (data.hasOwnProperty(email)) {
          emails.push({ email: email, user_name: data[email] });
        }
      }
      setUserEmails(emails);
    }

    // eslint-disable-next-line prettier/prettier
  };

  /**
   * Function for fetch dispositions
   */
  const fetchDisposition = async () => {
    const response = await new CacheDisposition().fetchSirpDispositions();
    if (response) {
      setDispositionLoader(false);
      const data = response.data.data.map((item, index) => {
        return {
          key: String(item.ids_id),
          value: item.ids_name,
        };
      });
      setDisposition(data);
      if (selectedNodeData.ticketdisposition !== '') {
        setSelectedDisposition({ key: selectedNodeData.ticketdisposition, value: '' });
        fetchSubDispositions(selectedNodeData.ticketdisposition);
        // setSelectedDisposition({key: selectedNodeData.ticketdisposition, value: ''});
      } else {
        setSelectedDisposition(data[0]);
        fetchSubDispositions(data[0].key);
      }
    }

    // eslint-disable-next-line prettier/prettier
  };

  /**
   *
   * @param {*} dispId - disposition id
   * Function for fetch sub dispositions
   */
  const fetchSubDispositions = async dispId => {
    setSubDispositionLoader(true);
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.get(
      API.baseUrl + `/playbooks/sub-disposition?disp_id=${dispId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
      }
    );

    if (response) {
      setDisabled(false);
      setSubDispositionLoader(false);
      const data = response.data.data.map((item, index) => {
        return {
          key: String(item.dsc_id),
          value: item.dsc_name,
          dsc_organization: item.dsc_organization,
        };
      });

      if (data.length === 0) {
        setSubDisposition([]);
        setSelectedSubDisposition({
          value: '',
          key: '',
          dsc_organization: '',
        });
      } else {
        setSubDisposition(data);
        if (selectedNodeData.ticketsubdisposition !== '') {
          setSelectedSubDisposition({ key: selectedNodeData.ticketsubdisposition, value: '' });
          // setSelectedSubDisposition({
          //   key: selectedNodeData.ticketsubdisposition,
          //   value: ''
          // });
        } else {
          setSelectedSubDisposition(data[0]);
        }
      }
    }
  };


  /**
   * Fetch tasks categories
   */
  const fetchTaskCategories = async () => {
    setCategoryTaskLoader(true);
    const response = await new CacheTaskCategries().fetchSirpTaskCategories();
    if (response) {
      setCategoryTaskLoader(false);
      const data = response.data.data.map((item, index) => {
        return {
          key: String(item.tca_id),
          value: item.tca_name,
          tca_created_at: item.tca_created_at,
          tca_organization: item.tca_organization,
          tca_updated_at: item.tca_updated_at,
        };
      });
      if (data.length !== 0) {
        setTaskcategories(data);

        if (selectedNodeData.taskCategory !== '') {
          setSelectedTaskCategory({ key: selectedNodeData.taskCategory, value: '' })
        } else {
          setSelectedTaskCategory(data[0]);
        }
      } else {
        setTaskcategories([]);
        setSelectedTaskCategory({
          key: '',
          value: '',
          tca_created_at: '',
          tca_organization: '',
          tca_updated_at: '',
        });
      }
    }
  };

  /**
   * Functiom for fetch members
   */
  const fetchMembers = async () => {

    const response = await new CacheSirpMembers().fetchSirpMembers();
    setAssignToLoader(false)
    return response;

    // eslint-disable-next-line prettier/prettier
  };

  const fetchRiskRate = async () => {

    const response = await new CacheRiskRate().fetchSirpRiskRate();
    if (response) {
      setRiskRateLoader(false);
      const severity = [];
      let count = 1;
      // eslint-disable-next-line prefer-destructuring
      const data = response.data.data;
      // eslint-disable-next-line no-restricted-syntax

      // eslint-disable-next-line no-restricted-syntax
      for (const property in data) {
        // eslint-disable-next-line no-prototype-builtins
        if (data.hasOwnProperty(property)) {
          severity.push({ key: count.toString(), value: data[property] });
          // eslint-disable-next-line no-plusplus
          count++;
        }
      }
      setSeverityArr(severity);
      if (selectedNodeData.ticketPriorityId !== '') {
        // setSeverity({key: selectedNodeData.ticketPriorityId, value: selectedNodeData.bodyText});
        setSeverity({ key: selectedNodeData.ticketPriorityId, value: selectedNodeData.bodyText });
      } else {
        setSeverity(severity[0]);
      }
    }
  };

  /**
   * Fuction for fetch categories
   */
  const fetchCategories = async () => {
    const response = await new CacheSirpCategories().fetchSirpCategories();

    if (response) {
      setCategoryLoader(false);
      const data = response.data.data.map((item, index) => {
        return {
          key: String(item.ica_id),
          value: item.ica_name,
        };
      });

      if (data.length === 0) {
        setCategories([]);
        setSelectedCategory({
          value: '',
          key: '',
        });
      } else {
        setCategories(data);
        if (selectedNodeData.ticketcategory !== '') {
          setSelectedCategory({ key: selectedNodeData.ticketcategory, value: '' })
        } else {
          setSelectedCategory(data[0]);
          fetchSubCategories(data[0].key);
        }
      }
    }
  };

  /**
   *
   * @param {*} cat_id - category id
   * Fetch sub categories of category
   */
  const fetchSubCategories = async cat_id => {
    // const cat_id = Number(selectedCategory.key);
    setSubCategoryLoader(true);
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.get(
      API.baseUrl + `/playbooks/sub-category?cat_id=${cat_id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
      }
    );

    if (response) {
      setDisabled(false);
      setSubCategoryLoader(false);
      const data = response.data.data.map((item, index) => {
        return {
          key: String(item.msc_id),
          value: item.msc_name,
          msc_severity: item.msc_severity,
        };
      });

      if (data.length === 0) {
        setSubCategories([]);
        setSelectedSubCategory({
          value: '',
          key: '',
        });
      } else {
        setSubCategories(data);
        if (selectedNodeData.ticketsubcategory !== '') {
          setSelectedSubCategory({ key: selectedNodeData.ticketsubcategory, value: '' });
        } else {
          setSelectedSubCategory(data[0]);
        }
      }
    }
  };

  /**
   *
   * @param {*} event
   * Function for handle priority change
   */
  const handlePriorityChange = event => {
    setDisabled(false);

    selectedNodeData.ticketPriority = '';
    selectedNodeData.ticketPriorityId = '';
    const filter = filterArray(severityArr, event);
    setSeverity(filter);
  };

  /**
   *
   * @param {*} event
   * Handle task name change
   */
  const handleTaskNameChange = event => {
    setDisabled(false);
    selectedNodeData.task_name = '';
    setTaskName(event.target.value);
  };

  /**
   *
   * @param {*} event
   * handle task description change
   */
  const handleTaskDescriptionChange = event => {
    setDisabled(false);
    selectedNodeData.description = '';
    setTaskDescription(event.target.value);
  };

  /**
   *
   * @param {*} values
   * Handle select members
   */
  const handleSelectMembers = values => {
    setDisabled(false);
    setSelectedMembers([...values]);
  };

  /**
   *
   * @param {*} value
   * Handle email selects
   */
  const handleEmailSelect = value => {
    setDisabled(false);
    setSelectedEmails([...value]);
  };

  /**
   *
   * @param {*} event
   * Handle subject change
   */
  const handleSubjectChange = event => {
    setDisabled(false);
   
    selectedNodeData[`subject_${sirpOption.key}`] = '';
    setSubject(event.target.value);
  };

  /**
   *
   * @param {*} event
   * Handle message change
   */
  const handleMessageChange = event => {
    // console.log(event.target.value);
    setDisabled(false);
    selectedNodeData.message = '';
    selectedNodeData[`message_${sirpOption.key}`] = '';
    setMessage(event.target.value);
  };

  /**
   *
   * @param {*} event
   * Handle desposition change event
   */
  const handleDispositionChange = key => {
    setDisabled(false);
    selectedNodeData.ticketdisposition = '';
    const filter = filterArray(disposition, key);
    setSelectedDisposition(filter);
    fetchSubDispositions(Number(filter.key));
  };

  /**
   *
   * @param {*} event
   * Handle sub desposition change event
   */
  const handleSubDispositionChanged = key => {
    setDisabled(false);
    selectedNodeData.ticketsubdisposition = '';
    const filter = filterArray(subDisposition, key);
    setSelectedSubDisposition(filter);
  };

  /**
   *
   * @param {*} event
   * Handle task category change event
   */
  const handleTaskCategoryChange = key => {
    setSelectedTaskHandle(true);
    setDisabled(false);
    selectedNodeData.taskCategory = '';
    const filter = filterArray(taskCategories, key);
    setSelectedTaskCategory(filter);
  };

  const handleAssignTo = key => {
    setSelecedMemberSelect(true);
    setDisabled(false);
    selectedNodeData.assign_to_id = '';

    const filter = filterArray(members, key);
    setSelectedAssigned(filter);
  };

  /**
   *
   * @param {*} event
   * Function for handle priority change
   */
  const handleSeverityChange = event => {
    setDisabled(false);
    selectedNodeData.ticketPriority = '';
    selectedNodeData.ticketPriorityId = '';
    const filter = filterArray(severityArr, event);
    setSeverity(filter);
  };

  /**
   *
   * @param {*} event
   * Handle category change event
   */
  const handleCategoryChange = key => {
    setDisabled(false);
    selectedNodeData.ticketcategory = '';
    const filter = filterArray(categories, key);
    setSelectedCategory(filter);
    fetchSubCategories(Number(filter.key));
  };

  /**
   *
   * @param {*} event
   * Handle sub category change event
   */
  const handleSubCategoryChange = key => {
    setDisabled(false);
    selectedNodeData.ticketsubcategory = '';
    const filter = filterArray(subCategories, key);
    setSelectedSubCategory(filter);
  };

  /**
   *
   * @param {*} event
   * Function for handle priority change
   */
  const handleStatusChange = event => {
    setDisabled(false);
    selectedNodeData.ticketstatus = '';
    const filter = filterArray(statusOptions, event);
    setStatus(filter);
  };

  /**
   *
   * @param {*} event
   * Handle email input change event
   */
  const handleEmailChange = event => {
    setDisabled(false);
    setEmail(event.target.value);
  };

  const handleSirpSave = () => {

    if (priorityStatus) {
      setPriporityAndSave();
    } else if (membersStatus) {
      setMembersAndSave();
    } else if (emailAlertStatus) {
      setEmailAlertAndSave();
    } else if (dispositionStatus) {
      setDispositionAndSave();
    } else if (categoryStatus) {
      setCategoriesAndSave();
    } else if (assignTaskStatus) {
      setTaskAssignedAndSave();
    } else if (severityStatus) {
      setSeverityAndSave();
    } else if (changeStatus) {
      setChangeStatusAndSave();
    } else if (reportedIocsStatus) {
      setReportedIocsAndSave();
    } else {
      selectedNodeData.action = sirpOption.key;
      selectedNodeData.name = sirpOption.value;
      selectedNodeData.app = String(sirpOption.act_app_id);
      props.handleSirpSave('notSelected', selectedNodeData);
    }
  };

  /**
   * set priority values and save it into gojs
   */
  const setPriporityAndSave = () => {
    // setChangePriorityAction({
    //   ticketPriority : severity.value,
    //   ticketPriorityId : severity.key,
    //   action: sirpOption.key,
    //   name: sirpOption.value,
    //   bodyText: severity.value,
    //   app: String(sirpOption.act_app_id)
    // });
    const selectedNodeData = {};
    selectedNodeData.ticketPriority = severity.value;
    selectedNodeData.ticketPriorityId = severity.key;
    selectedNodeData.action = sirpOption.key;
    selectedNodeData.name = sirpOption.value;
    selectedNodeData.bodyText = selectedNodeData.bodyText ? selectedNodeData.bodyText: severity.value;
    selectedNodeData.app = String(sirpOption.act_app_id);
    console.log(selectedNodeData);
    // eslint-disable-next-line no-param-reassign
    props.handleSirpSave('priorityStatus',selectedNodeData);
  };

  /**
   * set member values and save it into gojs
   */
  const setMembersAndSave = () => {
    selectedNodeData.action = sirpOption.key;
    selectedNodeData.name = sirpOption.value;
    selectedNodeData.app = String(sirpOption.act_app_id);
    selectedNodeData.handlers = [...selectedMembers];
    props.handleSirpSave('membersStatus', selectedNodeData);
  };

  /**
   * set email alert and save it into gojs
   */
  const setEmailAlertAndSave = () => {
    selectedNodeData.action = sirpOption.key;
    selectedNodeData.app = String(sirpOption.act_app_id);
    selectedNodeData.name = sirpOption.value;
    if (subject !== '') {
      selectedNodeData.subject = subject;
    }
    if (message !== '') {
      selectedNodeData.message = message;
    }
    selectedNodeData.emails = selectedEmails.join(',');
    props.handleSirpSave('emailAlertStatus',selectedNodeData);
  };

  /**
   * set disposition and save it into gojs
   */
  const setDispositionAndSave = () => {
    selectedNodeData.action = sirpOption.key;
    selectedNodeData.app = String(sirpOption.act_app_id);
    selectedNodeData.name = sirpOption.value;
    selectedNodeData.ticketdisposition = selectedDisposition.key;
    if (selectedDisposition.value !== '') {
      selectedNodeData.bodyText = selectedDisposition.value;
    }
    selectedNodeData.ticketsubdisposition = selectedSubDisposition.key;


    props.handleSirpSave('dispositionStatus', selectedNodeData);
  };

  /**
   * set categories and save it into gojs
   */
  const setCategoriesAndSave = () => {
    selectedNodeData.action = sirpOption.key;
    selectedNodeData.app = String(sirpOption.act_app_id);
    selectedNodeData.name = sirpOption.value;
    selectedNodeData.ticketcategory = selectedCategory.key;
    if (selectedCategory.value !== '') {
      selectedNodeData.bodyText = selectedCategory.value;
    }

    selectedNodeData.ticketsubcategory = selectedSubCategory.key;
    props.handleSirpSave('categoryStatus', selectedNodeData);
  };

  /**
   * set assign task and save into gojs
   */
  const setTaskAssignedAndSave = () => {
    selectedNodeData.action = sirpOption.key;
    selectedNodeData.app = String(sirpOption.act_app_id);
    selectedNodeData.name = sirpOption.value;
    if (!selectedTaskMembers) {
      const assignTo = selectedNodeData.assign_to_id;
      selectedNodeData.assign_to_id = assignTo;
    } else {
      selectedNodeData.assign_to_id = selectedAssigned.key;
    }
    if (taskName !== '') {
      selectedNodeData.task_name = taskName;
    }

    if (taskDescription !== '') {
      selectedNodeData.description = taskDescription;
    }

    if (!selectedTaskHandle) {
      // eslint-disable-next-line prefer-destructuring
      const bodyText = selectedNodeData.bodyText;
      // eslint-disable-next-line prefer-destructuring
      const key = selectedNodeData.taskCategory;
      selectedNodeData.bodyText = bodyText;
      selectedNodeData.taskCategory = key;
    } else {
      selectedNodeData.bodyText = selectedTaskCategory.value;
      selectedNodeData.taskCategory = selectedTaskCategory.key;
    }

    props.handleSirpSave('assignTaskStatus',selectedNodeData);
  };

  /**
   * set severity and save
   */
  const setSeverityAndSave = () => {
    selectedNodeData.action = sirpOption.key;
    selectedNodeData.app = String(sirpOption.act_app_id);
    selectedNodeData.name = sirpOption.value;
    selectedNodeData.bodyText = severity.value;
    selectedNodeData.ticketPriority = severity.value;
    selectedNodeData.ticketPriorityId = severity.key;
    props.handleSirpSave('severityStatus', selectedNodeData);
  };

  /**
   * Set change status and save
   */
  const setChangeStatusAndSave = () => {
    selectedNodeData.action = sirpOption.key;
    selectedNodeData.app = String(sirpOption.act_app_id);
    selectedNodeData.name = sirpOption.value;
    if (status.value !== '') {
      selectedNodeData.bodyText = status.value;
    }
    selectedNodeData.ticketstatus = status.key;
    props.handleSirpSave('changeStatus',selectedNodeData);
  };

  /**
   * Set rerortedIocs and save
   */
  const setReportedIocsAndSave = () => {
    selectedNodeData.action = sirpOption.key;
    selectedNodeData.app = String(sirpOption.act_app_id);
    selectedNodeData.name = sirpOption.value;
    if (email !== '') {
      selectedNodeData.email = email;
      selectedNodeData.bodyText = email;
    }

    if (subject !== '') {
      selectedNodeData[`subject_${sirpOption.key}`] = subject;
    }

    if (message !== '') {
      selectedNodeData[`message_${sirpOption.key}`] = message;
    }
    // eslint-disable-next-line no-unused-expressions
    props.handleSirpSave('reportedIocsStatus', selectedNodeData, sirpOption.key);
  };

  useEffect(() => {
    getSirpActions();
    if (selectedNodeData.name !== 'SIRP') {
      showSubOptions(selectedNodeData.name);
    }
  }, []);

  return (
    <>
      <div className="input-label" style={{ marginTop: '25px' }}>
        Actions
      </div>
      {/* <SPSelect
        onChange={handleActionsChanged}
        items={sirpActions}
        isDiagram={true}
        selected={
          props.sirpOptions.action !== ''
            ? props.sirpOptions.action
            : sirpOption.key
        }
      /> */}
      {/* <Select
        value={sirpOption.key}
        style={{ width: 170, height: 38 }}
        placeholder="Select a action"
        // loading={selectLoader}
        // dropdownStyle={}
        listHeight={400}
        dropdownAlign="center"
        defaultActiveFirstOption={true}
        onChange={handleActionsChanged}
      >
        {
          sirpActions.map((item, index) => {
            return (
              <Option key={item.key} value={item.key}>{item.value}</Option>
            )
          })
        }
      </Select> */}

      <SelectBox
        value={sirpOption.key}
        placeholder="Select a action"
        event={handleActionsChanged}
        options={sirpActions}
        loading={sirpLoader}
      />


      {priorityStatus ? (
        <ChangePriority
          handlePriorityChange={handlePriorityChange}
          severityArr={severityArr}
          riskRateLoader={riskRateLoader}
          severity={severity}
          selectedNode={selectedNodeData}
        />
      ) : membersStatus ? (
        <AddMembers
          selectedMembers={selectedMembers}
          handleSelectMembers={handleSelectMembers}
          members={members}
          selectedNode={selectedNodeData}
        />
      ) : emailAlertStatus ? (
        <SendEmailAlerts
          selectedEmails={selectedEmails}
          handleEmailSelect={handleEmailSelect}
          userEmail={userEmail}
          handleSubjectChange={handleSubjectChange}
          subject={subject}
          handleMessageChange={handleMessageChange}
          message={message}
          selectedNode={selectedNodeData}
        />
      ) : dispositionStatus ? (
        <ChangeDisposition
          handleDispositionChange={handleDispositionChange}
          disposition={disposition}
          subDispositionLoader={subDispositionLoader}
          dispositionLoader={dispositionLoader}
          selectedDisposition={selectedDisposition}
          handleSubDispositionChanged={handleSubDispositionChanged}
          subDisposition={subDisposition}
          selectedSubDisposition={selectedSubDisposition}
          selectedNode={selectedNodeData}
        />
      ) : assignTaskStatus ? (
        <AssignTask
          handleTaskNameChange={handleTaskNameChange}
          taskName={taskName}
          handleTaskDescriptionChange={handleTaskDescriptionChange}
          taskDescription={taskDescription}
          handleTaskCategoryChange={handleTaskCategoryChange}
          taskCategories={taskCategories}
          assignToLoader={assignToLoader}
          categoryTaskLoader={categoryTaskLoader}
          selectedTaskCategory={selectedTaskCategory}
          selectedAssigned={selectedAssigned}
          handleAssignTo={handleAssignTo}
          members={members}
          selectedNode={selectedNodeData}
        />
      ) : severityStatus ? (
        <ChangeSeverity
          handleSeverityChange={handleSeverityChange}
          severityArr={severityArr}
          severityLoader={riskRateLoader}
          severity={severity}
          selectedNode={selectedNodeData}
        />
      ) : categoryStatus ? (
        <ChangeCategory
          handleCategoryChange={handleCategoryChange}
          categories={categories}
          subCategoryLoader={subCategoryLoader}
          categoryLoader={categoryLoader}
          selectedCategory={selectedCategory}
          handleSubCategoryChange={handleSubCategoryChange}
          subCategories={subCategories}
          selectedSubCategory={selectedSubCategory}
          selectedNode={selectedNodeData}
        />
      ) : changeStatus ? (
        <ChangeStatus
          handleStatusChange={handleStatusChange}
          statusOptions={statusOptions}
          status={status}
          selectedNode={selectedNodeData}
        />
      ) : reportedIocsStatus ? (
        <SendReportedIocs
          handleEmailChange={handleEmailChange}
          email={email}
          handleSubjectChange={handleSubjectChange}
          subject={subject}
          handleMessageChange={handleMessageChange}
          message={message}
          selectedNode={selectedNodeData}
          sirpKey={
            selectedNodeData.action !== ''
              ? selectedNodeData.action
              : sirpOption.key
          }
        />
      ) : null}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '25px',
          width: '40%',
        }}
      >
        <Button
          onButtonClick={handleSirpSave}
          type="button"
          title="Save Changes"
        >
          Save Changes
        </Button>
      </div>
    </>
  );
};

export default SirpSetting;
