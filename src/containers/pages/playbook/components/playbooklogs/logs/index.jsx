import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as go from 'gojs';
import { message } from 'antd';
import { useLocation, useParams } from 'react-router';
import PageHeader from '../../../../../layout/pageHeader';
import images from '../../../../playbook/components/create/Shared/svgImages/createSvg';
import axios from 'axios';
import API from '../../../../../../config/endpoints.config';
import SPModal from '../../../../../../components/SPModal';
import ActionsLogsContainer from './ActionsLogsContainer'

function LogDetails({ }) {
  const location = useLocation();
  const params = useParams();
  const $ = go.GraphObject.make;
  let diagram;
  let myPalette;
  const customEditor = new go.HTMLInfo();
  const [viewMode, setViewMode] = useState(false);
  const [sideMenuHeader, setSideMenuHeader] = useState('');
  const [playbookId, setPlaybookId] = useState();
  const [actionData, setActionData] = useState();
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
  const [isModalOpen, setModalOpen] = useState({
    visible: false
  });

  const svgElements = {
    delete: '/images/create-playbook/delete.svg',
  };

  useEffect(async () => {
    initDiagram();
  }, []);

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

  function showLinkLabel(e) {
    const label = e.subject.findObject('LABEL');
    if (label !== null)
      label.visible = e.subject.fromNode.data.category === 'Decision';
  }
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
        allowDrop: false,
        // hoverDelay: 50,
        // "textEditingTool.defaultTextEditor": window.TextEditorSelectBox,
        LinkDrawn: showLinkLabel, // this DiagramEvent listener is defined below
        LinkRelinked: showLinkLabel,
        isReadOnly: true,
        allowSelect: true,
        // positionComputation : positionfunc,
        initialDocumentSpot: go.Spot.Top,
        initialAutoScale: go.Diagram.Uniform,
        initialViewportSpot: go.Spot.Top,
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
            },
            new go.Binding('stroke', 'act_icon_color'),
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
              new go.Binding('background', 'act_icon_color'),
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
        },
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
            },
            new go.Binding('fill', 'act_icon_color'),
            new go.Binding('stroke', 'act_icon_color'),
          ),
          $(go.Picture, {
            desiredSize: new go.Size(45, 45),
            source: images.decision(),
          })
        ),
        {
          doubleClick: () => {
            const currentNode = diagram.selection.first();
            // showDrawer(currentNode);
          },
        },
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
            },
            new go.Binding('fill', 'act_icon_color'),
            new go.Binding('stroke', 'act_icon_color'),
          ),
          $(go.Picture, {
            desiredSize: new go.Size(45, 45),
            source: images.filter(),
          })
        ),
        {
          doubleClick: () => {
            const currentNode = diagram.selection.first();
            // showDrawer(currentNode);
          },
        },
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
            },
            new go.Binding('stroke', 'act_icon_color'),
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
              new go.Binding('background', 'act_icon_color'),
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
            // showDrawer(currentNode);
          },
        },
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
        {
          toArrow: 'Triangle',
          scale: 1.5,
          fill: '#3DD598',
          stroke: '#3DD598',
        }
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
          'YES', // the label
          {
            textAlign: 'center',

            font: '10pt helvetica, arial, sans-serif',
            stroke: '#FFF',
            textEditor: customEditor,
            choices: ['YES', 'NO'],
            editable: true,
          },
          new go.Binding('text', 'text').makeTwoWay()
        )
      )
    );

    // custom select box for select link label
    // customSelectBoxEditor();

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
        fill: '#3DD598',
        stroke: '#3DD598',
      })
    );
    diagram.toolManager.linkingTool.temporaryFromNode = $(go.Node, {
      selectable: false,
      layerName: 'Tool',
      portId: '',
    });
    diagram.toolManager.linkingTool.temporaryToNode = $(go.Node, {
      selectable: false,
      layerName: 'Tool',
      portId: '',
    });
    diagram.model = $(go.GraphLinksModel, {
      copiesArrays: true,
      copiesArrayObjects: true,
      linkFromPortIdProperty: 'fromPort',
      linkToPortIdProperty: 'toPort',
      nodeDataArray: [
        { key: -1, category: 'Start', loc: '0 0', type: 'Start' },

        {
          key: -2,
          category: 'End',
          loc: '600 0',
          text: 'End',
          type: 'Start',
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
        // paletteNodeStyle(),
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
        // paletteNodeStyle(),
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
        // paletteNodeStyle(),
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
        // paletteNodeStyle(),

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
          },

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
        multi_config: '',
        multi_input: {},
        act_icon_color:'#373747',
        app: '',
        action: '',
        icon: '',
        isMolecule: 1,
      },
      {
        category: 'Decision',
        text: '',
        decisions: [],
        type: 'Decision',
        act_icon_color:'#373747',
        field: 'Field',
        condition: '',
        value: '',
        icon: '',
        isMolecule: 1,
      },
      {
        category: 'Filter',
        name: null,
        type: 'Filter',
        act_icon_color:'#373747',
        action: '',
        icon: '',
        configuration: ' ',
        isMolecule: 1,
      },
      {
        category: 'SIRP',
        app: '',
        action: '',
        name: 'SIRP',
        type: 'SIRP',
        act_icon_color:'#373747',
        icon: '',
        configuration: '',
        ticketPriority: '',
        ticketPriorityId: '',
        description: '',
        isMolecule: '',
        handlers: [],
        taskCategory: '',
        emails: [],
        isMolecule: 1,
        multi_values_id: '',
        Message: '',
        subject: '',
        bodyText: '',
        ticketcategory: '',
        ticketdisposition: '',
        ticketstatus: '',
        task_name: '',
        assign_to_id: '',
        ticketsubcategory: '',
        ticketsubdisposition: '',
        act_sirp_type: '',
        text: 'SIRP',
      },
    ];

    // animation
    diagram.animationManager.initialAnimationStyle =
      go.AnimationManager.AnimateLocations;
    myPalette.animationManager.initialAnimationStyle =
      go.AnimationManager.AnimateLocations;


    // diagram.scrollMode = go.Diagram.DocumentScroll;
    setViewMode(true);
    diagram.isEnabled = true;
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
      diagram.model = go.Model.fromJson(
        response.data.data.playbookName.plb_code
      );
      setTimeout(hide, 0);
    }
    setDiagramModel(diagram.model);

    diagram.scrollMode = go.Diagram.DocumentScroll;

    // grid pattern in background
    diagram.grid.visible = false;
    diagram.grid.gridCellSize = new go.Size(30, 30);
    diagram.toolManager.draggingTool.isGridSnapEnabled = true;
    diagram.toolManager.resizingTool.isGridSnapEnabled = true;
    diagram.toolManager.panningTool.isEnabled = false;
    // diagram.isEnabled = false;
  };


  function nodeStyle(defaultNodes, nodeHoverAdornment) {
    return [
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),

      {
        // the Node.location is at the center of each node
        locationSpot: go.Spot.Center,
        // selectionAdorned: true,
        deletable: defaultNodes ? true : false,
        resizable: false,
        selectionAdorned: false,
        cursor: 'grabbing',
        rotatable: false,
        click: (id, action) => {
          if (action?.data?.type !== "Start" && action?.data?.type !== "End") {
            // console.log('<<<<<<<<<<<<<',action?.data)
            setActionData(action?.data)
            setModalOpen({ visible: true })
          }
        }
      },
    ];
  }

  const fetchPlaybook = async () => {
    const id = Number(params.id);
    const userToken = localStorage.getItem('AccessToken');
    try {
      const response = await axios.get(
        API.baseUrl + `/playbooks-queue/${id}?expand=playbookName`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
          },
        }
      );
      setPlaybookName({ name: response.data.data.playbookName.plb_name });
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


  const onCloseCreateModal = () => {
    setModalOpen({ visible: false })
  }

  return (
    <div>
      <PageHeader title={playbookName.name || ''} options={[]} />

      <SPModal
        visible={isModalOpen.visible}
        onOk={() => console.log('Open')}
        onCancel={onCloseCreateModal}
        width={950}
        footer={null}
      >
        <ActionsLogsContainer playbookQueueid={params?.id} actionData={actionData} />
      </SPModal>
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

          <span class="zoom-level">{zoomlevel}%</span>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(LogDetails);
