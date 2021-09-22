import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import 'jsoneditor-react/es/editor.min.css';
import SPSearch from '../../../../../components/SPSearch';
import SPButton from '../../../../../components/SPButton';
import FormHeader from '../../../incidentManagement/components/FormHeader';
import { JsonEditor as Editor } from 'jsoneditor-react';
import {
  StyleEditor,
  StyledBox,
  StyledHeader,
  StyledSearchbar,
  StyledText,
} from './StyledComponents';
import './index.css';
import { CaretRightFilled } from '@ant-design/icons';

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
          },
        ],
      },
    ],
  },
];

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

function Output({ visible, onOpen, onClose, jsonData, setResultJson }) {

  const [searchValue, setSearchValue] = useState('');
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const onSearchChange = event => {
    const { value } = event.target;
    const expandedKeys = treeData
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, treeData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);

    setExpandedKeys(expandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const onExpand = expandedKeys => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const handleChange = (value) => {
    console.log(value);
    setResultJson(value)
  }


  return (
    <div style={{ marginBottom: 20 }}>
      <FormHeader
        number={5}
        title="Output"
        visible={visible}
        onOpen={onOpen}
        onClose={onClose}
      >
        <StyledBox>

          <StyleEditor
            mode={'view'}
            value={jsonData}
            onChange={handleChange}

          />
        </StyledBox>
      </FormHeader>
    </div>
  );
}

export default Output;
