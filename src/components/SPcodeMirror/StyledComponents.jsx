import styled from 'styled-components'
import { UnControlled as ControlledEditor } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/python/python'
import 'codemirror/mode/python/python'
import 'codemirror/mode/javascript/javascript'

export const CodeViewer = styled(ControlledEditor)`
    height:auto;
    width:100%;
`
export const LabelDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-direction: row;
`;

export const Label = styled.label`
  font-size: 15px;
  color: #ffffff;
  font-weight: 700;
  display: flex;
  margin-bottom: 15px;
`;