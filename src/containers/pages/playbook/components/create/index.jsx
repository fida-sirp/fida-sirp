/* eslint-disable */
import React, { useState, useEffect } from 'react';
import * as go from 'gojs';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { filter, map } from 'lodash';

import './styles.css';
import SetDocumentTitleHOC from '../../../../../HOCs/SetDocumentTitleHOC';
import PlaybookOptions from './PlaybookOptions/PlaybookOptions';
import SPDrawer from '../../../../../components/SPDrawer';
import PlaybookSetting from './PlaybookSetting/PlaybookSetting';
import ActionSettings from './ActionSetting/ActionSettings';
import SirpSetting from './SirpSetting/SirpSetting';
import FilterSetting from './FilterSetting/FilterSetting';
import DecisionSetting from './DecisionSetting/DecisionSetting';
import API from '../../../../../config/endpoints.config';
import images from './Shared/svgImages/createSvg';

const Createplaybooks = () => {
  const location = useLocation();
  const params = useParams();
  const { confirm } = Modal;
  const $ = go.GraphObject.make;
  let diagram;
  let myPalette;
  const customEditor = new go.HTMLInfo();
  const [viewMode, setViewMode] = useState(false);
  const [sideMenuHeader, setSideMenuHeader] = useState('');
  const [playbookId, setPlaybookId] = useState();
  // const [zoomScale, setZoomScale] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [playbookData, setPlaybookData] = useState({});
  const [currentSelectedNode, setCurrentSelectesNode] = useState();
  const [zoomlevel, setZoomLevel] = useState('');
  const [actionValue, setActionValue] = useState();
  const [sirpOptions, setSirpOptions] = useState();
  const [diagramModel, setDiagramModel] = useState();
  const [actionStatus, setActionStatus] = useState(false);

  const [conditionStatus, setConditionStatus] = useState(false);
  const [filterStatus, setFilterStatus] = useState(false);
  const [sirpStatus, setSirpStatus] = useState(false);
  const [playbookName, setPlaybookName] = useState({
    name: '',
  });
  const [filterOptions, setFilterOptions] = useState();
  const [decisionsOptions, setDecisionsOptions] = useState();
  const [selectedCategory, setSelectedCategory] = useState({
    key: '',
    value: '',
  });
  const [playbookStatus, setPlaybookStatus] = useState({
    key: '',
    value: '',
  });
  const [playbookSideMenuStatus, setPlaybookSideMenuStatus] = useState(false);

  const [drawerState, setDrawerState] = useState({
    visible: false,
    placement: 'left',
  });

  const svgElements = {
    delete: '/images/create-playbook/delete.svg',
  };

  useEffect(() => {
    initDiagram();
  }, []);

  //styleName: Title / Regular;

  /**
   * Action side menu config
   */
  const ActionConfig = () => {
    return (
      <ActionSettings
        handleActionsSave={handleActionsSave}
        actionValues={actionValue}
      />
    );
  };

  /**
   * Decision side menu config
   */
  const DecisionConfig = () => {
    return (
      <DecisionSetting
        playbookData={playbookData}
        handleDecisionSave={handleDecisionSave}
        decisionsOptions={decisionsOptions}
      />
    );
  };

  /**
   * Filter side menu config
   */
  const FilterConfig = () => {
    return (
      <FilterSetting
        playbookData={playbookData}
        handleFilterSave={handleFilterSave}
        filterOptions={filterOptions}
      />
    );
  };

  /**
   * SIRP side menu config
   */
  const SIRPConfig = () => {
    return (
      <SirpSetting handleSirpSave={handleSirpSave} sirpOptions={sirpOptions} />
    );
  };

  // Show drawer
  const showDrawer = currentNode => {
    setDrawerState({ visible: true });
    setCurrentSelectesNode(currentNode);
    if (currentNode !== null) {
      switch (currentNode.data.category) {
        case 'Action':
          setActionValue(currentNode.data);
          setSideMenuHeader('Action Configuration');
          setActionStatus(true);
          setFilterStatus(false);
          setSirpStatus(false);
          setConditionStatus(false);
          break;

        case 'Decision':
          setSideMenuHeader('Decision Configuration');
          setDecisionsOptions(currentNode.data);
          setActionStatus(false);
          setFilterStatus(false);
          setSirpStatus(false);
          setConditionStatus(true);
          break;

        case 'Filter':
          setSideMenuHeader('Filter Configruation');
          setFilterOptions(currentNode.data);
          setActionStatus(false);
          setFilterStatus(true);
          setSirpStatus(false);
          setConditionStatus(false);
          break;

        case 'SIRP':
          setSideMenuHeader('SIRP Configuration');
          setSirpOptions(currentNode.data);
          setActionStatus(false);
          setFilterStatus(false);
          setSirpStatus(true);
          setConditionStatus(false);
          break;
      }
    }
  };

  // Hide drawer
  const hideDrawer = () => {
    setDrawerState({
      visible: false,
    });
    setActionStatus(false);
    setFilterStatus(false);
    setSirpStatus(false);
    setConditionStatus(false);
    setPlaybookSideMenuStatus(false);
  };

  /**
   *
   * @param {*} appValue
   * @param {*} actionValue
   * Save Actions related configurations
   */
  const handleActionsSave = (
    selectedNodeData,
    multiInputValues,
    selectedMultiInputs,
    isMultiInput,
    isConfig,
    selectedConfig
  ) => {
    // console.log(multiInputValues)
    diagramModel.setDataProperty(
      currentSelectedNode.data,
      'bodyText',
      selectedNodeData.bodyText
    );
    diagramModel.setDataProperty(
      currentSelectedNode.data,
      'name',
      selectedNodeData.name
    );

    diagramModel.setDataProperty(
      currentSelectedNode.data,
      'description',
      selectedNodeData.description
    );

    diagramModel.setDataProperty(
      currentSelectedNode.data,
      'type',
      selectedNodeData.type
    );

    diagramModel.setDataProperty(
      currentSelectedNode.data,
      'multi_config',
      selectedNodeData.multi_config
    );

    diagramModel.setDataProperty(
      currentSelectedNode.data,
      'multi_values_id',
      selectedNodeData.multi_values_id
    );

    diagramModel.setDataProperty(
      currentSelectedNode.data,
      'action',
      selectedNodeData.action
    );

    diagramModel.setDataProperty(
      currentSelectedNode.data,
      'app',
      selectedNodeData.app
    );

    diagramModel.setDataProperty(
      currentSelectedNode.data,
      'act_type',
      selectedNodeData.act_type
    );

    diagramModel.setDataProperty(
      currentSelectedNode.data,
      'selected_multi_inputs',
      selectedMultiInputs
    );
    //  console.log('<<<<<<<<<<<<<<',multiInputValues)
    if (!_.isEmpty(multiInputValues)) {
      diagramModel.setDataProperty(
        currentSelectedNode.data,
        'multi_input',
        multiInputValues
      );

      diagramModel.setDataProperty(
        currentSelectedNode.data,
        'is_multi_input',
        'True'
      );
      Object.keys(multiInputValues).forEach(function (key) {
        // console.log(key)
        diagramModel.setDataProperty(
          currentSelectedNode.data,
          key,
          multiInputValues[key]
        );
      });
    } else {
      for (const key in currentSelectedNode.data) {
        if (key.indexOf('sel_') >= 0) {
          delete currentSelectedNode.data[key];
        }
      }
      delete currentSelectedNode.data.multi_input;
      currentSelectedNode.data.multi_values_id = '';
      diagramModel.setDataProperty(currentSelectedNode.data, '');
    }

    if (isConfig) {
      diagramModel.setDataProperty(
        currentSelectedNode.data,
        'configuration',
        selectedConfig
      );
    }

    hideDrawer();
  };

  /**There should be no confirmation.
   * @param {*} fieldName
   * @param {*} transform
   * save filter details in gojs data object
   */
  const handleFilterSave = filterOptions => {
    // console.log('>>>>>>>>>>>>>>',filterOptions);
    diagramModel.setDataProperty(
      currentSelectedNode.data,
      'filter_by',
      filterOptions.filter_by
    );
    diagramModel.setDataProperty(
      currentSelectedNode.data,
      'name',
      filterOptions.name
    );
    diagramModel.setDataProperty(
      currentSelectedNode.data,
      'transform',
      filterOptions.transform
    );
    diagramModel.setDataProperty(
      currentSelectedNode.data,
      'filter_decaction',
      filterOptions.filter_decaction
    );
    hideDrawer();
  };

  /**
   *
   * @param {*} decisions - Array of decisions
   * Save decision configurations
   */
  const handleDecisionSave = decisions => {
    diagramModel.setDataProperty(
      currentSelectedNode.data,
      'decision_value',
      decisions
    );
    hideDrawer();
  };

  const handleSirpSave = (actionName, selectedNodeData, key = 0) => {
    if (actionName === 'priorityStatus') {
      setPriorityAndSave(selectedNodeData);
    } else if (actionName === 'membersStatus') {
      setMembersAndSave(selectedNodeData);
    } else if (actionName === 'emailAlertStatus') {
      setEmailAlertAndSave(selectedNodeData);
    } else if (actionName === 'dispositionStatus') {
      setDispositionAndSave(selectedNodeData);
    } else if (actionName === 'categoryStatus') {
      setCategoriesAndSave(selectedNodeData);
    } else if (actionName === 'assignTaskStatus') {
      setTaskAssignedAndSave(selectedNodeData);
    } else if (actionName === 'severityStatus') {
      setSeverityAndSave(selectedNodeData);
    } else if (actionName === 'changeStatus') {
      setChangeStatusAndSave(selectedNodeData);
    } else if (actionName === 'reportedIocsStatus') {
      setReportedIocsAndSave(selectedNodeData, key);
    } else if (actionName === 'notSelected') {
      const currentNode = currentSelectedNode.data;
      currentNode.action = selectedNodeData.action;
      currentNode.bodyText = '';
      currentNode.name = selectedNodeData.name;
      currentNode.app = selectedNodeData.app;

      diagramModel.setDataProperty(currentSelectedNode.data, '', currentNode);
      hideDrawer();
    }
  };

  const setPriorityAndSave = selectedNode => {
    const currentNode = currentSelectedNode.data;

    currentNode.ticketPriority = selectedNode.ticketPriority;
    currentNode.ticketPriorityId = selectedNode.ticketPriorityId;
    currentNode.action = selectedNode.action;
    currentNode.name = selectedNode.name;
    currentNode.bodyText = selectedNode.bodyText;
    currentNode.app = selectedNode.app;
    diagramModel.setDataProperty(currentSelectedNode.data, '', currentNode);
    hideDrawer();
  };

  const setMembersAndSave = selectedNode => {
    const currentNode = currentSelectedNode.data;

    currentNode.action = selectedNode.action;
    currentNode.name = selectedNode.name;
    currentNode.bodyText = '';
    currentNode.app = selectedNode.app;
    currentNode.handlers = selectedNode.handlers;
    diagramModel.setDataProperty(currentSelectedNode.data, '', currentNode);

    hideDrawer();
  };

  const setEmailAlertAndSave = selectedNode => {
    const currentNode = currentSelectedNode.data;

    currentNode.action = selectedNode.action;
    currentNode.name = selectedNode.name;
    currentNode.app = selectedNode.app;
    currentNode.bodyText = '';
    currentNode.subject = selectedNode.subject;
    currentNode.message = selectedNode.message;
    currentNode.emails = selectedNode.emails;

    diagramModel.setDataProperty(currentSelectedNode.data, '', currentNode);

    hideDrawer();
  };

  const setDispositionAndSave = selectedNode => {
    const currentNode = currentSelectedNode.data;

    currentNode.action = selectedNode.action;
    currentNode.name = selectedNode.name;
    currentNode.app = selectedNode.app;

    currentNode.ticketdisposition = selectedNode.ticketdisposition;
    currentNode.ticketsubdisposition = selectedNode.ticketsubdisposition;
    currentNode.bodyText = selectedNode.bodyText;

    diagramModel.setDataProperty(currentSelectedNode.data, '', currentNode);

    hideDrawer();
  };

  const setCategoriesAndSave = selectedNode => {
    const currentNode = currentSelectedNode.data;

    currentNode.action = selectedNode.action;
    currentNode.name = selectedNode.name;
    currentNode.app = selectedNode.app;

    currentNode.ticketcategory = selectedNode.ticketcategory;
    currentNode.bodyText = selectedNode.bodyText;
    currentNode.ticketsubcategory = selectedNode.ticketsubcategory;

    diagramModel.setDataProperty(currentSelectedNode.data, '', currentNode);

    hideDrawer();
  };

  const setTaskAssignedAndSave = selectedNode => {
    const currentNode = currentSelectedNode.data;

    currentNode.action = selectedNode.action;
    currentNode.name = selectedNode.name;
    currentNode.app = selectedNode.app;

    currentNode.assign_to_id = selectedNode.assign_to_id;
    currentNode.task_name = selectedNode.task_name;
    currentNode.description = selectedNode.description;
    currentNode.bodyText = selectedNode.bodyText;
    currentNode.taskCategory = selectedNode.taskCategory;

    diagramModel.setDataProperty(currentSelectedNode.data, '', currentNode);

    hideDrawer();
  };

  const setSeverityAndSave = selectedNode => {
    const currentNode = currentSelectedNode.data;

    currentNode.action = selectedNode.action;
    currentNode.name = selectedNode.name;
    currentNode.app = selectedNode.app;

    currentNode.ticketPriority = selectedNode.ticketPriority;
    currentNode.bodyText = selectedNode.bodyText;
    currentNode.ticketPriorityId = selectedNode.ticketPriorityId;

    diagramModel.setDataProperty(currentSelectedNode.data, '', currentNode);

    hideDrawer();
  };

  const setChangeStatusAndSave = selectedNode => {
    const currentNode = currentSelectedNode.data;

    currentNode.action = selectedNode.action;
    currentNode.name = selectedNode.name;
    currentNode.app = selectedNode.app;

    currentNode.bodyText = selectedNode.bodyText;
    currentNode.ticketstatus = selectedNode.ticketstatus;

    diagramModel.setDataProperty(currentSelectedNode.data, '', currentNode);

    hideDrawer();
  };

  const setReportedIocsAndSave = (selectedNode, key) => {
    const currentNode = currentSelectedNode.data;

    currentNode.action = selectedNode.action;
    currentNode.name = selectedNode.name;
    currentNode.app = selectedNode.app;

    currentNode.bodyText = selectedNode.bodyText;
    currentNode.email = selectedNode.email;

    currentNode[`subject_${key}`] = selectedNode[`subject_${key}`];
    currentNode[`message_${key}`] = selectedNode[`message_${key}`];

    diagramModel.setDataProperty(currentSelectedNode.data, '', currentNode);

    hideDrawer();
  };

  /**
   *
   * @param {*} playbookName
   * @param {*} useCaseFamily
   * @param {*} playbookStatus
   * Save playbook setting configurations
   */
  const handlePlaybookSave = (playbookName, category, playbookStatus) => {
    setPlaybookStatus(playbookStatus);
    setSelectedCategory(category);
    setPlaybookName({ name: playbookName });
    hideDrawer();
  };

  //Handle playbook side menu open/close
  const handlePlaybook = () => {
    setDrawerState({ visible: true });
    setSideMenuHeader('Playbook Settings');
    setPlaybookSideMenuStatus(true);
  };

  const handleSavePlaybook = () => {
    const updatedPlaybookData = JSON.parse(playbookData);
    console.log('>>>>>>>>>>>>>>>>>>', updatedPlaybookData);
    const data = {
      playbook_name: playbookName.name,
      status: playbookStatus.value,
      plb_code: JSON.stringify(updatedPlaybookData),
      playbook_category: Number(selectedCategory.key),
      plb_executable: 1,
    };

    if (
      playbookName.name === '' ||
      playbookStatus.value === '' ||
      selectedCategory.key === '' ||
      playbookData === {}
    ) {
      showErrorModal();
    } else {
      if (!editMode) {
        savePlaybook(data);
      } else {
        updatePlaybook(data);
      }
    }
  };

  const updatePlaybook = async data => {
    const hide = message.loading({
      content: 'Updating playbook...',
      className: 'success-message',
      style: { color: '#FFF' },
    });
    const userToken = localStorage.getItem('AccessToken');
    try {
      await axios.put(API.baseUrl + `/playbooks/${playbookId}`, data, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
      });
      hide.then(() => {
        message.success({
          content: 'playbook update successfuly',
          className: 'success-message',
          style: { color: '#FFF' },
        });
      });

      setEditMode(true);
      setCreateMode(false);
    } catch (e) {
      hide.then(() => {
        message.error({
          content: 'error while updating playbook...',
          className: 'success-message',
          style: { color: '#FFF' },
          duration: 2,
        });
      });
    }
  };

  const savePlaybook = async data => {
    const hide = message.loading({
      content: 'Saving playbook...',
      className: 'success-message',
      style: { color: '#FFF' },
    });

    const userToken = localStorage.getItem('AccessToken');
    try {
      const response = await axios.post(API.baseUrl + `/playbooks`, data, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
      });

      hide.then(() => {
        message.success({
          content: 'Playbook saved successfully',
          className: 'success-message',
          style: { color: '#FFF' },
          duration: 2,
        });
      });

      setEditMode(true);
      setCreateMode(false);
      setPlaybookId(response.data.data.data.plb_id);
    } catch (e) {
      hide.then(() => {
        message.error({
          content: 'error while saving playbook...',
          className: 'success-message',
          style: { color: '#FFF' },
          duration: 2,
        });
      });
    }
  };

  const fetchPlaybook = async () => {
    const id = Number(params.id);
    const userToken = localStorage.getItem('AccessToken');
    try {
      const response = await axios.get(API.baseUrl + `/playbooks/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
      });

      setPlaybookName({ name: response.data.data.plb_name });
      setPlaybookStatus({ value: response.data.data.plb_status });
      setSelectedCategory({ key: String(response.data.data.pc_id) });
      return response;
    } catch (e) {
      message.error({
        content: 'error while fetching playbook...',
        className: 'success-message',
        style: { color: '#FFF' },
        duration: 2,
      });
    }
  };

  function isUnoccupied(r, node) {
    const diagram = node.diagram;

    const navig = obj => {
      const part = obj.part;
      if (part === node) return null;
      if (part instanceof go.Link) return null;
      return part;
    };

    const lit = diagram.layers;
    while (lit.next()) {
      const lay = lit.value;
      if (lay.isTemporary) continue;
      if (lay.findObjectsIn(r, navig, null, true).count > 0) return false;
    }
    return true;
  }

  function avoidNodeOverlap(node, pt, gridpt) {
    const bnds = node.actualBounds;
    const loc = node.location;
    const x = gridpt.x - (loc.x - bnds.x);
    const y = gridpt.y - (loc.y - bnds.y);
    const r = new go.Rect(x, y, bnds.width, bnds.height);
    if (isUnoccupied(r, node)) {
      return pt;
    }
    return loc;
  }
  /**
   * init diagram first time when page load
   */
  const initDiagram = async () => {
    const projectDiagramDiv = document.getElementById('myDiagramDiv');
    const projectPalletDiv = document.getElementById('myPaletteDiv');
    const projectDiagram = go.Diagram;
    const projectPalett = go.Palette;
    const diagramDiv = projectDiagram.fromDiv(projectDiagramDiv);
    const paletteDiv = projectPalett.fromDiv(projectPalletDiv);

    if (diagramDiv && paletteDiv) {
      diagramDiv.div = null;
      paletteDiv.div = null;
    }

    //initial configurations
    diagram = $(
      go.Diagram,
      'myDiagramDiv', // must name or refer to the DIV HTML element
      {
        initialContentAlignment: go.Spot.TopLeft,
        allowDrop: true,
        // hoverDelay: 50,
        // "textEditingTool.defaultTextEditor": window.TextEditorSelectBox,
        LinkDrawn: showLinkLabel, // this DiagramEvent listener is defined below
        LinkRelinked: showLinkLabel,
        // positionComputation : positionfunc,
        initialDocumentSpot: go.Spot.Top,
        initialAutoScale: go.Diagram.Uniform,

        initialViewportSpot: go.Spot.Center,
        'animationManager.isEnabled': false,
        "draggingTool.isGridSnapEnabled": true,
        'undoManager.isEnabled': true, // enable undo & redo
        ModelChanged: e => {
          setPlaybookData(diagram.model.toJson());
        },
      }
    );
    setZoomLevel(Math.ceil(diagram.scale * 100));
    // zoom in event
    document.getElementById('button-zoom-in').addEventListener('click', () => {
      diagram.commandHandler.increaseZoom();
      setZoomLevel(Math.ceil(diagram.scale * 100));
    });

    // zoom out event
    document.getElementById('button-zoom-out').addEventListener('click', () => {
      diagram.commandHandler.decreaseZoom();
      setZoomLevel(Math.ceil(diagram.scale * 100));
    });

    // open side menu immidiately after object drop
    diagram.addDiagramListener('ExternalObjectsDropped', e => {
      const node = diagram.selection.first();
      if (node.data.category === 'Action') {
        const currentNode = diagram.selection.first();
        showDrawer(currentNode);
      } else if (node.data.category === 'SIRP') {
        const currentNode = diagram.selection.first();
        showDrawer(currentNode);
      } else if (node.data.category === 'Filter') {
        const currentNode = diagram.selection.first();
        showDrawer(currentNode);
      } else if (node.data.category === 'Decision') {
        const currentNode = diagram.selection.first();
        showDrawer(currentNode);
      }
    });

    // show delete button on mouseover
    const nodeHoverAdornment = $(
      go.Adornment,
      'Spot',
      {
        background: 'transparent',
        // cursor: 'grabbing',
        // hide the Adornment when the mouse leaves it
        mouseLeave: (e, obj) => {
          const ad = obj.part;
          if (ad === null) return;
          ad.adornedPart.removeAdornment('mouseHover');
        },
      },
      $(go.Placeholder, {
        background: 'transparent', // to allow this Placeholder to be "seen" by mouse events
        isActionable: true, // needed because this is in a temporary Layer
        click: (e, obj) => {
          const node = obj.part.adornedPart;
          node.diagram.select(node);
        },
      }),
      $(
        'Button',
        {
          alignment: go.Spot.TopRight,
          alignmentFocus: go.Spot.TopRight,
          'ButtonBorder.fill': 'transparent',
          'ButtonBorder.stroke': 'transparent',
          _buttonFillOver: 'transparent',
          _buttonStrokeOver: 'transparent',
          _buttonFillPressed: 'transparent',
          _buttonStrokePressed: 'transparent',
        },
        new go.Binding('fill', 'transparent').makeTwoWay(),
        {
          click: (e, obj) => {
            showDeleteConfirm(e);
          },
        },
        $(
          go.Shape,
          'Circle',
          {
            desiredSize: new go.Size(25, 25),
            spot1: go.Spot.TopLeft,
            spot2: go.Spot.BottomRight,
          },
          new go.Binding(
            'desiredSize',
            'actionMainsize',
            go.Size.parse
          ).makeTwoWay(go.Size.stringify),
          {
            name: 'SHAPE',
            fill: '#FC5A5A',
            stretch: go.GraphObject.Horizontal,
            stroke: '#FC5A5A',
            strokeWidth: 2.5,
          }
        ),
        $(go.Picture, {
          desiredSize: new go.Size(20, 20),
          source: svgElements.delete,
        })
      )
    );

    // default start node
    diagram.nodeTemplateMap.add(
      'Start',
      $(
        go.Node,
        'Spot',
        nodeStyle(false, null),
        {
          selectionAdorned: false,
        },
        $(
          go.Panel,
          'Auto',
          $(go.Picture, {
            margin: new go.Margin(0, 0, 0, 0),
            desiredSize: new go.Size(150, 150),
            source: images.start(),
          })
        ),

        makePort('L', new go.Spot(0.05, 0.5), true, false),
        makePort('R', new go.Spot(0.95, 0.5), true, false),
        makePort('B', new go.Spot(0.5, 0.92), true, false)
      )
    );

    //Default end node
    diagram.nodeTemplateMap.add(
      'End', // the default category

      $(
        go.Node,
        'Spot',
        nodeStyle(false, null),
        {
          selectionAdorned: false,
        },
        // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
        $(
          go.Panel,
          'Auto',

          $(go.Picture, {
            margin: new go.Margin(0, 0, 0, 0),
            desiredSize: new go.Size(150, 150),
            source: images.end(),
          })
        ),
        // four named ports, one on each side:
        makePort('T', new go.Spot(0.5, 0.04), false, true),
        makePort('L', new go.Spot(0.04, 0.5), false, true),
        makePort('R', new go.Spot(0.96, 0.5), false, true)
        //makePort("B", go.Spot.Bottom, true, false)
      )
    );

    // Action node
    diagram.nodeTemplateMap.add(
      'Action',
      $(
        go.Node,
        'Spot',
        nodeStyle(true, nodeHoverAdornment),

        $(
          go.Panel,
          'Auto',
          $(
            go.Shape,
            'RoundedRectangle',
            {
              desiredSize: new go.Size(270, 80),
              spot1: go.Spot.TopLeft,
              spot2: go.Spot.BottomRight,
            },
            new go.Binding(
              'desiredSize',
              'actionMainsize',
              go.Size.parse
            ).makeTwoWay(go.Size.stringify),

            {
              name: 'SHAPE',
              fill: '#2C2C38',
              stretch: go.GraphObject.Horizontal,
              stroke: 'transparent',
              strokeWidth: 3,
            }
          ),

          $(
            go.Panel,
            'Table',
            { alignment: go.Spot.Left },
            $(
              go.Panel,
              'Vertical',
              {
                alignment: go.Spot.LeftCenter,
                row: 0,
                name: 'ACTION_SHAPE',
                column: 0,
                margin: new go.Margin(0, 0, 0, 3),
                desiredSize: new go.Size(70, 77.4),
                background: '#373747',
              },
              new go.Binding(
                'desiredSize',
                'actionTitleSize',
                go.Size.parse
              ).makeTwoWay(go.Size.stringify),
              $(
                go.Picture,
                {
                  margin: new go.Margin(10, 0, 0, 0),
                  desiredSize: new go.Size(55, 60),
                  source: images.action(),
                }
                // new go.Binding('source', 'actionIcon', e => {
                //   if (e === 'Action') {
                //     return svgElements.action;
                //   } else if (e === 'Investigate') {
                //     return svgElements.action;
                //   }
                // }).makeTwoWay()
              )
            ),
            $(
              go.Panel,
              'Table',
              {
                row: 0,
                column: 1,
                alignment: go.Spot.TopLeft,
              },
              $(
                go.TextBlock,
                {
                  alignment: go.Spot.TopLeft,
                  stroke: '#FFFFFF',
                  font: 'bold 11pt sans-serif',
                  row: 0,
                  column: 0,
                  name: 'AppText',
                  margin: new go.Margin(10, 10, 10, 10),
                },
                new go.Binding('text', 'name')
              ),

              // $(
              //   go.TextBlock,
              //   {
              //     // alignment: go.Spot.RightCenter,
              //     stroke: '#FFFFFF',
              //     font: 'bold 11pt sans-serif',
              //     row: 0,
              //     column: 0,
              //     name: 'AppText',
              //     // margin: new go.Margin(10, 10, 10, 0),
              //   },
              //   new go.Binding('text', 'action_key', (n)=>{
              //     return `(${Math.abs(n)})`
              //   })
              // ),

              $(
                go.TextBlock,
                {
                  alignment: go.Spot.TopLeft,
                  stroke: '#FFFFFF',
                  font: '11pt sans-serif',
                  row: 1,
                  name: 'ActionText',
                  margin: new go.Margin(10, 10, 10, 10),
                },
                new go.Binding('text', 'bodyText')
              )
            )
          )
        ),
        {
          doubleClick: () => {
            const currentNode = diagram.selection.first();
            showDrawer(currentNode);
          },
        },
        //four named ports, one on each side:
        makePort('T', go.Spot.Top, true, true),
        makePort('L', go.Spot.Left, true, true),
        makePort('R', go.Spot.Right, true, true),
        makePort('B', go.Spot.Bottom, true, true)
      )
    );

    // Decision node
    diagram.nodeTemplateMap.add(
      'Decision',
      $(
        go.Node,
        'Spot',
        nodeStyle(true, nodeHoverAdornment),
        // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
        $(
          go.Panel,
          'Auto',
          $(
            go.Shape,
            'RoundedRectangle',
            {
              desiredSize: new go.Size(65, 65),
              spot1: go.Spot.TopLeft,
              spot2: go.Spot.BottomRight,
            },
            new go.Binding(
              'desiredSize',
              'actionMainsize',
              go.Size.parse
            ).makeTwoWay(go.Size.stringify),
            {
              name: 'BRANCH_SHAPE',
              fill: '#4a4b68',
              stretch: go.GraphObject.Horizontal,
              stroke: '#4a4b68',
              strokeWidth: 2.5,
            }
          ),
          $(go.Picture, {
            desiredSize: new go.Size(45, 45),
            source: images.decision(),
          })
        ),
        {
          doubleClick: () => {
            const currentNode = diagram.selection.first();
            showDrawer(currentNode);
          },
        },
        //four named ports, one on each side:
        makePort('T', go.Spot.Top, true, true),
        makePort('L', go.Spot.Left, true, true),
        makePort('R', go.Spot.Right, true, true),
        makePort('B', go.Spot.Bottom, true, true)
      )
    );

    // Filter node
    diagram.nodeTemplateMap.add(
      'Filter',
      $(
        go.Node,
        'Spot',
        nodeStyle(true, nodeHoverAdornment),
        // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
        $(
          go.Panel,
          'Auto',
          $(
            go.Shape,
            'RoundedRectangle',
            {
              desiredSize: new go.Size(65, 65),
              spot1: go.Spot.TopLeft,
              spot2: go.Spot.BottomRight,
            },
            new go.Binding(
              'desiredSize',
              'actionMainsize',
              go.Size.parse
            ).makeTwoWay(go.Size.stringify),
            {
              name: 'FILTER_SHAPE',
              fill: '#4a4b68',
              stretch: go.GraphObject.Horizontal,
              stroke: '#4a4b68',
              strokeWidth: 2.5,
            }
          ),
          $(go.Picture, {
            desiredSize: new go.Size(45, 45),
            source: images.filter(),
          })
        ),
        {
          doubleClick: () => {
            const currentNode = diagram.selection.first();
            showDrawer(currentNode);
          },
        },

        makePort('T', go.Spot.Top, true, true),
        makePort('L', go.Spot.Left, true, true),
        makePort('R', go.Spot.Right, true, true),
        makePort('B', go.Spot.Bottom, true, true)
      )
    );

    // SIPR node
    diagram.nodeTemplateMap.add(
      'SIRP',
      $(
        go.Node,
        'Spot',
        nodeStyle(true, nodeHoverAdornment),
        // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
        $(
          go.Panel,
          'Auto',
          $(
            go.Shape,
            'RoundedRectangle',
            {
              desiredSize: new go.Size(270, 80),
              spot1: go.Spot.TopLeft,
              spot2: go.Spot.BottomRight,
            },
            new go.Binding(
              'desiredSize',
              'actionMainsize',
              go.Size.parse
            ).makeTwoWay(go.Size.stringify),
            {
              name: 'SHAPE',
              fill: '#2C2C38',
              stretch: go.GraphObject.Horizontal,
              stroke: 'transparent',
              strokeWidth: 3,
            }
          ),

          $(
            go.Panel,
            'Table',
            { alignment: go.Spot.Left },
            $(
              go.Panel,
              'Vertical',
              {
                alignment: go.Spot.Left,
                row: 0,
                name: 'ACTION_SHAPE',
                column: 0,
                margin: new go.Margin(0, 0, 0, 3),
                desiredSize: new go.Size(70, 77.4),
                background: '#373747',
              },
              new go.Binding(
                'desiredSize',
                'actionTitleSize',
                go.Size.parse
              ).makeTwoWay(go.Size.stringify),
              $(go.Picture, {
                margin: new go.Margin(10, 0, 0, 0),
                desiredSize: new go.Size(55, 55),
                source: images.sirp(),
              })
            ),
            $(
              go.Panel,
              'Table',
              {
                row: 0,
                column: 1,
                alignment: go.Spot.TopCenter,
              },
              $(
                go.TextBlock,
                {
                  alignment: go.Spot.TopLeft,
                  stroke: '#FFFFFF',
                  font: 'bold 11pt sans-serif',
                  row: 0,
                  name: 'AppText',
                  margin: new go.Margin(10, 10, 10, 10),
                },
                new go.Binding('text', 'name')
              ),

              $(
                go.TextBlock,
                {
                  alignment: go.Spot.TopLeft,
                  stroke: '#FFFFFF',
                  font: '11pt sans-serif',
                  row: 1,
                  name: 'ActionText',
                  textAlign: go.Spot.LeftCenter,
                  margin: new go.Margin(10, 10, 10, 10),
                },
                new go.Binding('text', 'bodyText')
              )
            )
          )
        ),
        {
          doubleClick: () => {
            const currentNode = diagram.selection.first();
            showDrawer(currentNode);
          },
        },
        //four named ports, one on each side:
        makePort('T', go.Spot.Top, true, true),
        makePort('L', go.Spot.Left, true, true),
        makePort('R', go.Spot.Right, true, true),
        makePort('B', go.Spot.Bottom, true, true)
      )
    );

    //design arrow link shape and arrow type
    diagram.linkTemplate = $(
      go.Link,
      {
        routing: go.Link.AvoidsNodes,
        adjusting: go.Link.End,
        curve: go.Link.JumpOver,
        corner: go.Link.Bezier,
        toShortLength: 4,
        relinkableFrom: true,
        relinkableTo: false,
        selectable: true,
        reshapable: false,
        resegmentable: false,
        smoothness: 1.0,

        // mouse-overs subtly highlight links:
        mouseEnter: (e, link) => {
          link.findObject('HIGHLIGHT').stroke = 'rgba(30,144,255,0.2)';
        },
        mouseLeave: (e, link) => {
          link.findObject('HIGHLIGHT').stroke = 'transparent';
        },
        selectionAdorned: false,
      },
      new go.Binding('points').makeTwoWay(),
      $(
        go.Shape, // the highlight shape, normally transparent
        {
          isPanelMain: true,
          strokeWidth: 8,
          segmentOffset: new go.Point(9, 0),
          stroke: 'transparent',
          name: 'HIGHLIGHT',
        }
      ),
      $(
        go.Shape, // the link path shape
        { isPanelMain: true, strokeWidth: 5, stroke: '#216159' }
      ),
      $(
        go.Shape, // the arrowhead
        { toArrow: 'Triangle', scale: 1.5, fill: '#3DD598', stroke: '#3DD598' }
      ),
      $(
        go.Panel,
        'Auto', // the link label, normally not visible
        {
          visible: false,
          name: 'LABEL',
          segmentIndex: 2,
          segmentFraction: 0.5,
        },
        new go.Binding('visible', 'visible').makeTwoWay(),
        $(
          go.Shape,
          'RoundedRectangle', // the label shape
          { fill: '#2C2C38', stroke: null, desiredSize: new go.Size(55, 55) }
        ),
        $(
          go.TextBlock,
          'LABEL', // the label
          {
            textAlign: 'center',
            font: '10pt helvetica, arial, sans-serif',
            stroke: '#FFF',
            name: 'LABEL_TEXT',
            textEditor: customEditor,
            choices: ['YES', 'NO'],
            editable: true,
          },
          new go.Binding('text', 'text').makeTwoWay()
          // new go.Binding("choices").ofModel()
        )
      )
    );

    // // custom select box for select link label
    customSelectBoxEditor();

    // link routing
    diagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
    diagram.toolManager.relinkingTool.temporaryLink.routing =
      go.Link.Orthogonal;
    diagram.toolManager.linkingTool.temporaryLink.path.stroke = '#216159';
    diagram.toolManager.linkingTool.temporaryLink = 'background';
    diagram.toolManager.linkingTool.temporaryLink = $(
      go.Link,
      { layerName: 'Tool' },
      $(go.Shape, { stroke: '#216159', strokeWidth: 5 }),
      $(go.Shape, {
        toArrow: 'Triangle',
        scale: 1.5,
        // nodeValue: 'YES',
        fill: '#3DD598',
        stroke: '#3DD598',
      })
    );
    diagram.toolManager.linkingTool.temporaryFromNode = $(go.Node, {
      selectable: false,
      layerName: 'Tool',
    });
    diagram.toolManager.linkingTool.temporaryToNode = $(go.Node, {
      selectable: false,
    });
    diagram.model = $(go.GraphLinksModel, {
      copiesArrays: true,
      copiesArrayObjects: true,
      linkFromPortIdProperty: 'fromPort',
      linkToPortIdProperty: 'toPort',
      nodeDataArray: [
        {
          key: -1,
          category: 'Start',
          loc: '0 0',
          type: 'Start',
          name: 'Start',
          isMolecule: 1,
          model: '{}',
        },

        {
          key: -4,
          category: 'End',
          loc: '600 0',
          text: 'End',
          type: 'End',
          name: 'End',
          isMolecule: 1,
          model: '{}',
        },
      ],
      linkDataArray: [],
    });

    // left side palette
    myPalette = $(go.Palette, 'myPaletteDiv', {
      contentAlignment: go.Spot.Top,
    });

    // Palette decision option
    myPalette.nodeTemplateMap.add(
      'Decision',
      $(
        go.Part,
        'Spot',
        paletteNodeStyle(),
        $(
          go.Shape,
          'RoundedRectangle',
          {
            desiredSize: new go.Size(75, 80),
            spot1: go.Spot.Top,
            spot2: go.Spot.Bottom,
            stroke: null,
          },
          new go.Binding(
            'desiredSize',
            'actionMainsize',
            go.Size.parse
          ).makeTwoWay(go.Size.stringify),
          {
            name: 'PALETTE_SHAPE',

            fill: 'transparent',
            alignment: go.Spot.TopCenter,
            stretch: go.GraphObject.Vertical,
          }
        ),
        // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
        $(
          go.Panel,
          'Table',

          new go.Binding('angle').makeTwoWay(),
          $(go.Picture, {
            row: 0,
            name: 'PALLETE_IMAGE',
            column: 1,
            name: 'BRANCH_PICTURE',
            desiredSize: new go.Size(45, 45),
            source: images.decision(),
          }),
          $(go.TextBlock, {
            text: 'Decision',
            name: 'PALLETE_TEXT',
            font: 'bold 11pt sans-serif',
            stroke: '#fff',
            margin: new go.Margin(8, 0, 0, 0),
            row: 1,
            column: 1,
          })
        )
      )
    );

    // Palette action option
    myPalette.nodeTemplateMap.add(
      'Action',
      $(
        go.Part,
        'Spot',
        paletteNodeStyle(),
        $(
          go.Shape,
          'RoundedRectangle',
          {
            desiredSize: new go.Size(75, 80),
            spot1: go.Spot.Top,
            stroke: null,
            spot2: go.Spot.Bottom,
          },
          new go.Binding(
            'desiredSize',
            'actionMainsize',
            go.Size.parse
          ).makeTwoWay(go.Size.stringify),
          {
            name: 'PALETTE_SHAPE',
            fill: 'transparent',
            alignment: go.Spot.TopCenter,
            stretch: go.GraphObject.Vertical,
          }
        ),
        $(
          go.Panel,
          'Table',
          new go.Binding('angle').makeTwoWay(),
          $(go.Picture, {
            row: 0,
            column: 1,
            name: 'ACTION_PICTURE',
            desiredSize: new go.Size(45, 45),
            source: images.action(),
          }),

          $(go.TextBlock, {
            text: 'Action',
            stroke: '#fff',
            font: 'bold 11pt sans-serif',
            margin: new go.Margin(7, 0, 0, 0),
            row: 1,
            column: 1,
          })
        )
      )
    );

    // Palette filter option
    myPalette.nodeTemplateMap.add(
      'Filter',
      $(
        go.Part,
        'Spot',
        paletteNodeStyle(),
        $(
          go.Shape,
          'RoundedRectangle',
          {
            desiredSize: new go.Size(75, 80),
            spot1: go.Spot.Top,
            spot2: go.Spot.Bottom,
            stroke: null,
          },
          new go.Binding(
            'desiredSize',
            'actionMainsize',
            go.Size.parse
          ).makeTwoWay(go.Size.stringify),
          {
            name: 'PALETTE_SHAPE',
            fill: 'transparent',
            alignment: go.Spot.TopCenter,
            stretch: go.GraphObject.Vertical,
          }
        ),
        $(
          go.Panel,
          'Table',
          new go.Binding('angle').makeTwoWay(),
          $(go.Picture, {
            row: 0,
            column: 1,
            name: 'FILTER_PICTURE',
            desiredSize: new go.Size(45, 45),
            source: images.filter(),
          }),

          $(go.TextBlock, {
            text: 'Filter',
            stroke: '#fff',
            font: 'bold 11pt sans-serif',
            row: 1,
            margin: new go.Margin(10, 0, 0, 0),
            column: 1,
          })
        )
      )
    );

    // Palette SIRP option
    myPalette.nodeTemplateMap.add(
      'SIRP',
      $(
        go.Part,
        'Spot',
        paletteNodeStyle(),

        $(
          go.Shape,
          'RoundedRectangle',
          {
            desiredSize: new go.Size(75, 80),
            spot1: go.Spot.Top,
            spot2: go.Spot.Bottom,
            stroke: null,
          },
          new go.Binding(
            'desiredSize',
            'actionMainsize',
            go.Size.parse
          ).makeTwoWay(go.Size.stringify),
          {
            name: 'PALETTE_SHAPE',
            fill: 'transparent',
            alignment: go.Spot.TopCenter,
            stretch: go.GraphObject.Vertical,
          }
        ),
        $(
          go.Panel,
          'Table',
          $(go.Picture, {
            row: 0,
            column: 1,
            name: 'SIRP_PICTURE',
            desiredSize: new go.Size(45, 45),
            source: images.sirp(),
          }),

          $(go.TextBlock, {
            text: 'SIRP',
            stroke: '#fff',
            font: 'bold 11pt sans-serif',
            row: 1,
            margin: new go.Margin(10, 0, 0, 0),
            column: 1,
          })
        )
      )
    );

    // attach default node array
    myPalette.model.nodeDataArray = [
      {
        category: 'Action',
        name: 'Action',
        typeId: '',
        bodyText: '',
        type: 'Action',
        app: '',
        action: '',
        icon: '',
        size: '',
        isMolecule: 1,
        multi_values_id: '',
        text: 'Action',
        model: '',
        act_type: '',
      },
      {
        category: 'Decision',
        text: 'Decision',
        name: 'Decision',
        bodyText: '',
        model: '',
        decision_value: [],
        type: 'Decision',
        field: 'Field',
        condition: '',
        value: '',
        icon: '',
        isMolecule: 1,
      },
      {
        category: 'Filter',
        name: 'Filter',
        type: 'Filter',
        text: 'Filter',
        filter_by: '',
        bodyText: '',
        size: '',
        model: {},
        icon: '',
        isMolecule: 1,
        transform: '',
        filter_decaction: '',
      },
      {
        category: 'SIRP',
        app: '',
        action: '',
        name: 'SIRP',
        type: 'SIRP',
        icon: '',
        isMolecule: '',
        isMolecule: 1,
        multi_values_id: '',
        act_sirp_type: '',
        text: 'SIRP',
      },
    ];

    // animation
    diagram.animationManager.initialAnimationStyle =
      go.AnimationManager.AnimateLocations;
    myPalette.animationManager.initialAnimationStyle =
      go.AnimationManager.AnimateLocations;

    // delete confirmation with delete key
    diagram.commandHandler.doKeyDown = () => {
      const e = diagram.lastInput;
      if (e.key == 'Del') {
        const selectedNode = diagram.selection.first();
        if (selectedNode !== null) {
          if (
            selectedNode.data.category !== 'Start' &&
            selectedNode.data.category !== 'End' &&
            !selectedNode.data.hasOwnProperty('fromPort')
          ) {
            showDeleteConfirm(e);
          } else {
            e.diagram.commandHandler.deleteSelection();
          }
        }
      }
    };

    // open diagram in create, edit and view mode
    if (location.pathname.includes('create')) {
      setCreateMode(true);
      const element = document.getElementById('myDiagramDiv');
      element.style.visibility = 'visible';
    } else if (location.pathname.includes('update')) {
      // diagram.scrollMode = go.Diagram.DocumentScroll;
      setPlaybookId(params.id);
      setEditMode(true);
      const hide = message.loading({
        content: 'Loading diagram...',
        className: 'success-message',
        style: { color: '#FFF' },
      });
      const response = await fetchPlaybook();
      const element = document.getElementById('myDiagramDiv');
      element.style.visibility = 'visible';

      if (response) {
        diagram.model = go.Model.fromJson(response.data.data.plb_code);
        setTimeout(hide, 0);
      }
    } else {
      // diagram.scrollMode = go.Diagram.DocumentScroll;
      setViewMode(true);
      diagram.isEnabled = false;
      myPalette.isEnabled = false;
      const hide = message.loading({
        content: 'Loading diagram...',
        className: 'success-message',
        style: { color: '#FFF' },
      });
      const response = await fetchPlaybook();
      const element = document.getElementById('myDiagramDiv');
      element.style.visibility = 'visible';
      if (response) {
        diagram.model = go.Model.fromJson(response.data.data.plb_code);
        setTimeout(hide, 0);
      }
    }
    setDiagramModel(diagram.model);

    diagram.scrollMode = go.Diagram.DocumentScroll;

    // grid pattern in background
    diagram.grid.visible = false;
    diagram.grid.gridCellSize = new go.Size(30, 30);
    diagram.toolManager.draggingTool.isGridSnapEnabled = true;
    diagram.toolManager.resizingTool.isGridSnapEnabled = true;
  };

  /**
   * Function for style nodes
   * @param {*} defaultNodes - default node value for delete
   * @param {*} nodeHoverAdornment - for hide delete button for start and end
   */
  function nodeStyle(defaultNodes, nodeHoverAdornment) {
    return [
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      {
        selectionAdornmentTemplate: $(
          go.Adornment,
          'Auto',

          $(go.Shape, 'RoundedRectangle', {
            fill: null,
            stroke: '#33C758',
            name: 'AdornmentShape',
            strokeWidth: 2.5,
          }),
          $(go.Placeholder, { margin: -2.9 })
        ), // end Adornment
      },
      {
        // the Node.location is at the center of each node
        locationSpot: go.Spot.Center,
        // selectionAdorned: true,
        deletable: defaultNodes ? true : false,
        resizable: false,
        cursor: 'grabbing',
        rotatable: false,
        dragComputation: avoidNodeOverlap,
        mouseEnter: (e, obj) => {
          onMouseEnter(e, obj);
        },
        mouseLeave: (e, obj) => {
          onMouseLeave(e, obj);
        },
      },
    ];
  }

  /**
   * Customm select box for select link label
   */
  const customSelectBoxEditor = () => {
    const customSelectBox = document.createElement('select');
    customSelectBox.classList = 'link-select-box';
    // customSelectBox.style = "border-radius:36px; outline: none; width: 12vw; height: 12vh;";

    customEditor.show = (textBlock, diagram, tool) => {
      if (!(textBlock instanceof go.TextBlock)) return;

      // Populate the select box:
      customSelectBox.innerHTML = '';

      const list = textBlock.choices;
      for (let i = 0; i < list.length; i++) {
        const op = document.createElement('option');
        op.text = list[i];
        op.value = list[i];
        customSelectBox.add(op, null);
      }

      // After the list is populated, set the value:
      customSelectBox.value = textBlock.text;
      customSelectBox.addEventListener(
        'keydown',
        e => {
          const keynum = e.which;
          if (keynum == 13) {
            // Accept on Enter
            tool.acceptText(go.TextEditingTool.Enter);
            return;
          } else if (keynum == 9) {
            // Accept on Tab
            tool.acceptText(go.TextEditingTool.Tab);
            e.preventDefault();
            return false;
          } else if (keynum === 27) {
            // Cancel on Esc
            tool.doCancel();
            if (tool.diagram) tool.diagram.focus();
          }
        },
        false
      );

      const loc = textBlock.getDocumentPoint(go.Spot.TopLeft);
      const pos = diagram.transformDocToView(loc);
      customSelectBox.style.left = pos.x + 'px';
      customSelectBox.style.top = pos.y + 'px';
      customSelectBox.style.position = 'absolute';
      customSelectBox.style.zIndex = 100; // place it in front of the Diagram

      diagram.div.appendChild(customSelectBox);
    };

    customEditor.hide = (diagram, tool) => {
      if (diagram) {
        diagram.div.removeChild(customSelectBox);
      }
    };
    customEditor.valueFunction = () => customSelectBox.value;
  };

  /**
   *
   * @param {*} elem - body element
   * Function for show page in full screen mode
   */
  function toggleFullScreen(elem) {
    if (
      (document.fullScreenElement !== undefined &&
        document.fullScreenElement === null) ||
      (document.msFullscreenElement !== undefined &&
        document.msFullscreenElement === null) ||
      (document.mozFullScreen !== undefined && !document.mozFullScreen) ||
      (document.webkitIsFullScreen !== undefined &&
        !document.webkitIsFullScreen)
    ) {
      if (elem.requestFullScreen) {
        elem.requestFullScreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullScreen) {
        elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  /**
   * Style palette options
   */
  function paletteNodeStyle() {
    return [
      {
        selectionAdorned: false,
        cursor: 'grabbing',
        // the Node.location is at the center of each node
        mouseEnter: (e, obj) => {
          const shape = obj.findObject('PALETTE_SHAPE');
          const actionPicture = obj.findObject('ACTION_PICTURE');
          const branchPitcure = obj.findObject('BRANCH_PICTURE');
          const filterPitcure = obj.findObject('FILTER_PICTURE');
          const sirpPitcure = obj.findObject('SIRP_PICTURE');
          // shape.strokeDashArray = [5, 10];
          shape.fill = '#373747';
          shape.stroke = null;
          if (actionPicture) {
            // actionPicture.reloadSource = svgElements.actionGreen;
            actionPicture.source = images.actionGreen();
            // actionPicture.fill = '#777777';
          }

          if (branchPitcure) {
            // branchPitcure.reloadSource = svgElements.branchGreen;
            branchPitcure.source = images.decisionGreen();
          }

          if (filterPitcure) {
            // filterPitcure.reloadSource = svgElements.filterGreen;
            filterPitcure.source = images.filterGreen();
          }

          if (sirpPitcure) {
            // sirpPitcure.reloadSource = svgElements.SIRPGreen;
            sirpPitcure.source = images.sirpGreen();
          }
        },
        mouseLeave: (e, obj) => {
          const shape = obj.findObject('PALETTE_SHAPE');
          const actionPicture = obj.findObject('ACTION_PICTURE');
          const branchPitcure = obj.findObject('BRANCH_PICTURE');
          const filterPitcure = obj.findObject('FILTER_PICTURE');
          const sirpPitcure = obj.findObject('SIRP_PICTURE');
          shape.fill = 'transparent';
          if (actionPicture) {
            // actionPicture.reloadSource = svgElements.action;
            actionPicture.source = images.action();
          }

          if (branchPitcure) {
            // branchPitcure.reloadSource = svgElements.branch;
            branchPitcure.source = images.decision();
          }

          if (filterPitcure) {
            // filterPitcure.reloadSource = svgElements.filter;
            filterPitcure.source = images.filter();
          }

          if (sirpPitcure) {
            // sirpPitcure.reloadSource = svgElements.SIRP;
            sirpPitcure.source = images.sirp();
          }
          //obj.background = "#13131A"
        },
      },
    ];
  }

  /**
   * Show link lable if node is Decision (Yes/No )
   * @param {*} e
   */
  function showLinkLabel(e) {
    const label = e.subject.findObject('LABEL');
    if (label !== null)
      label.visible = e.subject.fromNode.data.category === 'Decision';
  }

  /**
   *
   * @param {*} e
   * @param {*} obj
   * Changed style when mouse enter on node
   */
  function onMouseEnter(e, obj) {
    showPorts(obj.part, true);
    const shape = obj.findObject('SHAPE');
    const shape1 = obj.findObject('ACTION_SHAPE');
    const shape2 = obj.findObject('BRANCH_SHAPE');
    const shape3 = obj.findObject('FILTER_SHAPE');

    if (shape && shape1) {
      shape.stroke = '#33C758';
      shape.strokeWidth = 3.5;
      shape1.background = '#33C758';
    }
    if (shape2) {
      shape2.fill = '#33C758';
      shape2.stroke = '#33C758';
    }
    if (shape3) {
      shape3.fill = '#33C758';
      shape3.stroke = '#33C758';
    }
  }

  /**
   * Changed style when mouse leave from node
   * @param {*} e
   * @param {*} obj
   */
  function onMouseLeave(e, obj) {
    showPorts(obj.part, false);
    const shape = obj.findObject('SHAPE');
    const shape1 = obj.findObject('ACTION_SHAPE');
    const shape2 = obj.findObject('BRANCH_SHAPE');
    const shape3 = obj.findObject('FILTER_SHAPE');
    if (shape && shape1) {
      shape.stroke = 'transparent';
      shape.strokeWidth = 3;
      shape1.background = '#373747';
    }

    if (shape2) {
      shape2.fill = '#4a4b68';
      shape2.stroke = '#4a4b68';
    }
    if (shape3) {
      shape3.fill = '#4a4b68';
      shape3.stroke = '#4a4b68';
    }
  }

  /**
   * Show port in dot shape when mouse enter on particular
   * @param {*} node
   * @param {*} show
   */
  function showPorts(node, show) {
    const mydiagram = node.diagram;
    if (!mydiagram || mydiagram.isReadOnly || !mydiagram.allowLink) return;
    node.ports.each(port => {
      port.stroke = show ? '#FFF' : null;
      port.fill = show ? '#FFF' : null;
    });
  }

  /**
   * Function for create port for particular node
   * @param {*} name
   * @param {*} spot
   * @param {*} output
   * @param {*} input
   */
  function makePort(name, spot, output, input) {
    // const horizontal = spot.equals(go.Spot.Top) || spot.equals(go.Spot.Bottom);

    // the port is basically just a small circle that has a white stroke when it is made visible
    return $(go.Shape, 'Circle', {
      fill: 'transparent',
      stroke: null, // this is changed to "white" in the showPorts function
      desiredSize: new go.Size(15, 15),
      alignment: spot,
      alignmentFocus: spot, // align the port on the main Shape// spot.opposite()
      portId: name, // declare this object to be a "port"
      fromSpot: spot,
      // margin: new go.Margin(10,10,10,10),
      // stretch: (horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical),
      // fromMaxLinks: 1,
      // toMaxLinks: 2,
      toSpot: spot, // declare where links may connect at this port
      fromLinkable: output,
      toLinkable: input, // declare whether the user may draw links to/from here
      cursor: 'pointer', // show a different cursor to indicate potential link point
    });
  }

  /**
   *
   * @param {*} e - node event
   * Function for delete modal
   */
  function showDeleteConfirm(e) {
    confirm({
      title: 'Are you sure you want to delete this element?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Confirm',
      okType: 'danger',
      centered: true,
      cancelButtonProps: {
        style: {
          background: 'transparent',
          borderColor: '#FFF',
          color: '#FFF',
        },
      },
      okButtonProps: {
        style: { background: '#33C758', borderColor: '#33C758', color: '#FFF' },
      },
      cancelText: 'Cancel',
      onOk() {
        e.diagram.commandHandler.deleteSelection();
      },
      onCancel() {},
    });
  }

  /**
   *
   * @param {*} e - node event
   * Function for delete modal
   */
  function showErrorModal() {
    confirm({
      title: 'Playbook information is required',
      icon: <ExclamationCircleOutlined />,
      okText: 'Okay',
      okType: 'danger',
      centered: true,
      maskClosable: true,
      okCancel: false,
      okButtonProps: {
        style: { background: '#33C758', borderColor: '#33C758', color: '#FFF' },
      },
    });
  }

  return (
    <>
      <div>
        <PlaybookOptions
          viewMode={viewMode}
          playbookName={playbookName.name}
          handlePlaybook={handlePlaybook}
          handleSavePlaybook={handleSavePlaybook}
        />
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div
            id="myPaletteDiv"
            style={{
              width: '85px',
              height: '38vh',
              marginLeft: '10px',
              marginTop: '15px',
              minHeight: '370px',
              background: '#2C2C38',
              borderRadius: '10px',
            }}
          ></div>
          <div
            id="myDiagramDiv"
            style={{
              visibility: 'hidden',
              flexGrow: 1,
              zIndex: 0,
              height: '85vh',
              marginLeft: '15px',
              marginTop: '15px',
            }}
          ></div>
        </div>
        <div className="zoom-in-out">
          <div
            style={{ cursor: 'pointer' }}
            className="button-full-screen"
            onClick={() => toggleFullScreen(document.body)}
          >
            <img
              style={{ width: '34px' }}
              src={images.fullScreen()}
              alt="open-in-full"
            />
          </div>
          <div id="button-zoom-in" style={{ cursor: 'pointer' }}>
            <img
              style={{ width: '34px' }}
              src={images.zoomIn()}
              alt="zoom-in"
            />
          </div>
          <div id="button-zoom-out" style={{ cursor: 'pointer' }}>
            <img
              style={{ width: '34px' }}
              src={images.zoomOut()}
              alt="zoom-out"
            />
          </div>

          <span className="zoom-level">{zoomlevel}%</span>
        </div>
      </div>

      <SPDrawer
        title={sideMenuHeader}
        isVisible={drawerState.visible}
        // onOpen={showDrawer}
        isdiagram="true"
        onClose={hideDrawer}
        drawerWidth={400}
      >
        {playbookSideMenuStatus ? (
          <PlaybookSetting
            handlePlaybookSave={handlePlaybookSave}
            playbookName={playbookName}
            selectedCategory={selectedCategory}
            playbookStatus={playbookStatus}
          />
        ) : actionStatus ? (
          <ActionConfig />
        ) : conditionStatus ? (
          <DecisionConfig />
        ) : filterStatus ? (
          <FilterConfig />
        ) : sirpStatus ? (
          <SIRPConfig />
        ) : null}
      </SPDrawer>
    </>
  );
};
export default SetDocumentTitleHOC(Createplaybooks);
