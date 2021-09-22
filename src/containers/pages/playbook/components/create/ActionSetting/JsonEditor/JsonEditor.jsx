import React, { useEffect, useState } from 'react';
import { message, Modal, Tooltip } from 'antd';
import axios from 'axios';
// import { JsonEditor as Editor } from 'jsoneditor-react';
import JSONEditor from 'jsoneditor/dist/jsoneditor';
import 'jsoneditor/dist/jsoneditor.min.css'

import InputBox from '../../../../../../../components/InputBox';
import SPButton from '../../../../../../../components/SPButton';
import API from '../../../../../../../config/endpoints.config';
// import Button from '../../../../../../../components/SPButton';

const JsonEditor = (props) => {
    let editor;
    const [error, setError] = useState(false);
    const [path, setPath] = useState([]);
    const [json, setJson] = useState([]);
    const [toolTipVisible, setToolTipVisible] = useState(false);
    const [result, setResult] = useState('Result');
    const [fieldName, setFieldName] = useState('');
    const [jsonValue, setJsonValue] = useState('');
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = () => {

    }

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
        if (Array.isArray(result)) {
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

    /**
     * Get output data from server
     */
    const getOutputJson = () => {
        const userToken = localStorage.getItem('AccessToken');
        try {
            const response = axios.get(`${API.baseUrl}/application-actions/output?id=${props.actionId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + userToken,
                    }
                });
            return response;
        } catch (e) {
            if (e.response.status === 401) {
                message.error({
                    content: 'Unauthorized, Please login',
                    className: 'success-message',
                    style: { color: '#FFF' },
                });
            } else {
                message.error({
                    content: 'something went wrong',
                    className: 'success-message',
                    style: { color: '#FFF' },
                });
            }
        }

    }

    useEffect(async () => {
        const container = document.getElementById("jsoneditor")
        const options = { mode: 'view', onEvent: handlePropertyClick }
        if (!editor) {
            editor = new JSONEditor(container, options);
        }
        const responseData = await getOutputJson();
        if (responseData.data.data.length > 0) {
            editor.set(JSON.parse(responseData.data.data));
            setJson(JSON.parse(responseData.data.data));
        }
    }, [])



    return (
        <Modal title="Output" style={{ top: 20 }} visible={props.isModalVisible} className="json-editor-model" width={700} height={350} footer={false} onCancel={props.handleModelCancel}>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <InputBox
                    onInputChange={handleInputChange}
                    value={inputValue}
                    type="text"
                    id="output"
                    name="output"
                    placeholder="Output"
                    width="256"
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
            {/* <Editor
                value={json}
                mode="view"
                click={handleChange}
                name="json"
                // onModeChange={handleChange}
                schema={json}
                onChange={handleChange}
                onClick={handleChange}
                
            /> */}
        </Modal>

    )
}

export default JsonEditor;
