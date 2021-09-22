import React, { Fragment, useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { JsonEditor as Editor } from 'jsoneditor-react';
import { Colors, Fonts } from '../../../../../../theme';
import { useSelector } from 'react-redux'
import { message, Tooltip } from 'antd';
import loaderImg from '../../../../../../assets/images/loader.gif';
import 'jsoneditor-react/es/editor.min.css'
import InputBox from '../../../../../../components/InputBox';
import SPButton from '../../../../../../components/SPButton';
import JSONEditor from 'jsoneditor/dist/jsoneditor';
import 'jsoneditor/dist/jsoneditor.min.css'
import _ from 'lodash';




export const StyleEditor = styled(Editor)`
  background-color: ${Colors.transparent};
  margin: 24px;
  font-family: ${Fonts.type.robotoRegular};
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0px;
  color: ${Colors.primaryWhite};
`;

function OutputAction({ listValue, isView }) {

    const [error, setError] = useState(false);
    const [path, setPath] = useState([]);
    const [json, setJson] = useState([]);
    const [toolTipVisible, setToolTipVisible] = useState(false);
    const [result, setResult] = useState('Result');
    const [fieldName, setFieldName] = useState('');
    const [jsonValue, setJsonValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const state = useSelector(state => state.administration.automation.actionOutputList)
    const isLoading = useSelector(state => state.administration.automation.isDataLoading);

    const handleCopy = () => {
        const copyText = document.getElementById("output");
        copyText.select();
        copyText.setSelectionRange(0, 99999)
        document.execCommand("copy");
        setToolTipVisible(true);
        setTimeout(() => {
            setToolTipVisible(false);
        }, 2000)
    }

    const showResult = () => {
        const result = path.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, json);
        if (_.isArray(result)) {
            setResult('Array');
        } else if (result === null) {
            setResult('null');
        } else if (typeof result === 'object' && result !== null) {
            setResult(typeof result);
        } else {
            setResult(result);
        }
    }
    const handlePropertyClick = ({ field, path, value }, event) => {
        if (event.type === 'click') {
            setPath(path);
            setFieldName(field);
            setJsonValue(value);
            const array = path.map((item, index) => {
                if (typeof item === 'number') {
                    item = "*"
                };
                return item;
            });
            const newPath = array.join('/');
            setInputValue(newPath);
        }
    }

    const resetDrawerValue = () => {
        setInputValue('');
        setResult('Result')
    }
    useEffect(() => {
        let editor;
        const container = document.getElementById("jsoneditor")
        const options = { mode: 'view', onEvent: handlePropertyClick }
        if (!editor && container) {
            editor = new JSONEditor(container, options);
        }
        if (state?.isJson) {
            editor.set(JSON.parse(state?.act_sample_output));
            setJson(JSON.parse(state?.act_sample_output));
        }
    }, [state])
    useEffect(() => {
        resetDrawerValue()
    }, [isLoading])

    return (
        <div>
            {isLoading ? <div className="make-child-center">
                <img src={loaderImg} />
            </div> : <div>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <InputBox
                        onInputChange={() => { }}
                        value={inputValue}
                        type="text"
                        id="output"
                        name="output"
                        placeholder="Output"
                        width="256"
                        noBorderValidation
                    />
                    <div
                        style={{
                            marginLeft: '15px',
                            marginTop: '2px',
                            width: '15%',
                        }}
                    >
                        <SPButton onButtonClick={showResult} type="button" title="Result" size="small">
                            Result
                        </SPButton>
                    </div>
                    <div
                        style={{
                            marginLeft: '15px',
                            marginTop: '2px',
                            width: '15%',
                        }}
                    >
                        <Tooltip visible={toolTipVisible} placement="top" title="copy on clipboard">
                            <SPButton onButtonClick={handleCopy} type="button" title="copy" size="small">
                                Copy
                            </SPButton>
                        </Tooltip>
                    </div>
                </div>
                <div className="filter-output">
                    Filter Output
                </div>
                {
                    !error
                        ? <div className="filter-output-result">{result}</div>
                        : <div className="filter-output-error">No input found. Skipping</div>
                }
                <div id="jsoneditor" style={{ marginTop: '27px' }}>
                </div>
            </div>
            }
        </div>
    );
}

export default OutputAction;
