import React, { useState, useEffect, useCallback } from 'react';
import AddToArtifact from '../addToArtifact';
import { StyledMenu, StyledItem } from './StyledComponents';
import { useHistory } from 'react-router-dom';
import { getArtifactListAction } from '../../../../../actions/incidentMasterData';
import { compose } from 'redux';
import { connect } from 'react-redux';

const useContextMenu = ({ outerRef }) => {
  const [xPos, setXPos] = useState('0px');
  const [yPos, setYPos] = useState('0px');
  const [showMenu, setShowMenu] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  const handleContextMenu = useCallback(
    event => {
      if (showMenu) {
        setShowMenu(false);
      }
      if (outerRef && outerRef.current.contains(event.target)) {
        event.preventDefault();
        setXPos(`${event.layerX}px`);
        setYPos(`${event.layerY + 75}px`);
        setShowMenu(true);
      } else {
        setShowMenu(false);
      }
    },
    [showMenu, outerRef, setXPos, setYPos]
  );

  const handleClick = useCallback(() => {
    setShowMenu(false);
  }, [showMenu]);

  const handleSelectText = useCallback(() => {
    document.onmouseup = () => {
      const x = window.getSelection().toString();
      if (x !== '' && x) setSelectedText(x);
    };
  }, [selectedText]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('mouseup', handleSelectText);
    return () => {
      document.addEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('mouseup', handleSelectText);
    };
  });

  return { xPos, yPos, showMenu, selectedText };
};

const copyToClipBoard = text => {
  var textField = document.createElement('textarea');
  textField.innerText = text;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand('copy');
  textField.remove();
};

function ContextMenu({
  outerRef,
  artifact_type,
  onAdd,
  getArtifactListAction,
}) {
  const [artifactModalVisible, setArtifactModalVisible] = useState(false);
  const [captureText, setCaptureText] = useState();
  const { xPos, yPos, showMenu, selectedText } = useContextMenu({ outerRef });
  const history = useHistory();

  React.useEffect(() => {
    if (selectedText) {
      setCaptureText(selectedText);
    }
  }, [selectedText]);


  const menu =
    showMenu && captureText && captureText !== '' ? (
      <StyledMenu style={{ left: xPos, top: yPos, position: 'absolute' }}>
        <StyledItem
          key="addToArtifact"
          onClick={() => {
            getArtifactListAction();
            setArtifactModalVisible(true);
          }}
        >
          Add to artifact
        </StyledItem>
        <StyledItem
          key="addToAsset"
          onClick={e => {
            history.push(`/assets?name=${captureText}`, '_blank');
          }}
        >
          Add to asset
        </StyledItem>
        <StyledItem key="copy" onClick={() => copyToClipBoard(selectedText)}>
          Copy
        </StyledItem>
      </StyledMenu>
    ) : null;
  return (
    <div>
      {menu}
      <AddToArtifact
        artifact_type={artifact_type}
        selectedText={selectedText}
        onClose={() => {
          setCaptureText();
          setArtifactModalVisible(false);
        }}
        onAdd={values => {
          setCaptureText();
          setArtifactModalVisible(false);
          onAdd(values);
        }}
        visible={artifactModalVisible}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    ...state,
  };
};

const mapDispatchToProps = {
  getArtifactListAction,
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  ContextMenu
);
