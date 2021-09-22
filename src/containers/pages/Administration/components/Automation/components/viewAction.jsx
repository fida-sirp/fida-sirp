import React, { useState } from 'react'
import SPcodeMirror from '../../../../../../components/SPcodeMirror';
import TextAreaBox from '../../../../../../components/TextAreaBox';
import SPButton from '../../../../../../components/SPButton';
import { useSelector } from 'react-redux'
import { Row, Col } from 'antd'
import loaderImg from '../../../../../../assets/images/loader.gif';

const ViewAction = () => {
    const [value, setValue] = useState("")
    const state = useSelector((state) => state.administration.automation.viewSciptData)
    const isFieldLoading = useSelector((state) => state.administration.automation.isFieldLoading)
    const handleChange = () => { }
    return (
        <div>
            {isFieldLoading ? <div className="make-child-center">
                <img src={loaderImg} />
            </div> :
                <>
                    <Row style={{ display: 'flex', alignItems: "center" }}>
                        <Col span={18}>
                            <TextAreaBox
                                id="Input"
                                label="Input"
                                name="Input"
                                placeholder="Input"
                                className="description"
                                onInputChange={(e) => console.log(e.target)}
                                value={value}
                            />
                        </Col>
                        <Col style={{ marginLeft: 20 }}>
                            <SPButton title="Save/Run" size="small" />
                        </Col>
                    </Row>
                    <SPcodeMirror value={state?.script} language={state?.actions?.act_execution_script_type || "python"} label="script.py" onChange={handleChange} />
                </>}
        </div >
    )
}
export default ViewAction