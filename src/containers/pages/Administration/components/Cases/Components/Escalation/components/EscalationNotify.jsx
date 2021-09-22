import { Col, Row } from "antd"
import { map } from "lodash"
import { Label } from "../../../../../../../../components/InputBox/StyledComponents"



const EscalationNotify = ({ notification, disposition, container, response, breach }) => {
    return (
        <>
            {
                map(notification, (item, index) => {
                    return (
                        <>
                            <Row style={{ marginTop: 10 }}>
                                <Col>
                                    <Label style={{ fontWeight: '500' }}>
                                        <span style={{ color: '#FFF', fontWeight: '600',color:'#4FA67E' }}>IF</span>
                                        <span style={{ color: '#FFF', fontWeight: '600', paddingLeft: 3 }}>{container} {disposition}</span>
                                        <span style={{ color: '#FFF', fontWeight: '500', paddingLeft: 3 }}>{response}</span>
                                    </Label>
                                </Col>
                            </Row>
                            {
                                item[`since_${index}`] ?
                                    <Row gutter={10}>
                                        <Col>
                                            <Label style={{color:'#4FA67E'}}>
                                                SINCE
                                           </Label>
                                        </Col>
                                        <Col>
                                            <Label style={{ color: "#FFF", fontWeight: '500' }}>
                                                {item[`since_${index}`]}
                                            </Label>
                                        </Col>
                                    </Row>
                                    : null

                            }

                            <Row>
                                <Col>
                                    <Label style={{color:'#4FA67E'}}>
                                        THEN NOTIFY TO
                                    </Label>
                                </Col>
                            </Row>
                            {
                                item[`user_${index}`] ?
                                    <Row gutter={25}>
                                        <Col>
                                            <Label style={{color:'#4FA67E'}}>
                                                Users:
                                    </Label>
                                        </Col>
                                        <Col>
                                            <Label style={{ fontWeight: '500' }}>
                                                {item[`user_${index}`]}
                                            </Label>
                                        </Col>
                                    </Row>
                                    : null
                            }

                            {
                                item[`group_${index}`] ?
                                    <Row gutter={25}>
                                        <Col>
                                            <Label style={{color:'#4FA67E'}}>
                                                Groups:
                                    </Label>
                                        </Col>
                                        <Col>
                                            <Label style={{ fontWeight: '500' }}>
                                                {item[`group_${index}`]}
                                            </Label>
                                        </Col>
                                    </Row>
                                    : null
                            }

                            {
                                item[`external_${index}`] ?
                                    <Row gutter={25}>
                                        <Col>
                                            <Label style={{color:'#4FA67E'}}>
                                                External:
                                    </Label>
                                        </Col>
                                        <Col>
                                            <Label style={{ fontWeight: '500' }}>
                                                {item[`external_${index}`]}
                                            </Label>
                                        </Col>
                                    </Row>
                                    : null
                            }


                        </>

                    )
                })
            }
            {
                breach ?
                    <>
                        <Row>
                            <Col>
                                <Label style={{ color: 'red', fontWeight: '500' }}>
                                    When all of the SLA escalations have expired without being acted on, issue SLA breach notification
                            </Label>
                            </Col>
                        </Row>
                        {
                            breach?.breach_since ?
                                <Row gutter={10}>
                                    <Col>
                                        <Label style={{color:'#4FA67E'}}>
                                            SINCE
                                    </Label>
                                    </Col>
                                    <Col>
                                        <Label style={{ color: "#FFF", fontWeight: '500' }}>
                                            {breach.breach_since}
                                        </Label>
                                    </Col>
                                </Row>
                                : null

                        }

                        <Row>
                            <Col>
                                <Label style={{color:'#4FA67E'}}>
                                    THEN NOTIFY TO
                                    </Label>
                            </Col>
                        </Row>
                        {
                            breach?.user ?
                                <Row gutter={25}>
                                    <Col>
                                        <Label style={{color:'#4FA67E'}}>
                                            Users:
                                    </Label>
                                    </Col>
                                    <Col>
                                        <Label style={{ fontWeight: '500' }}>
                                            {breach.user}
                                        </Label>
                                    </Col>
                                </Row>
                                : null
                        }

                        {
                            breach?.group ?
                                <Row gutter={25}>
                                    <Col>
                                        <Label style={{color:'#4FA67E'}}>
                                            Groups:
                                    </Label>
                                    </Col>
                                    <Col>
                                        <Label style={{ fontWeight: '500' }}>
                                            {breach.group}
                                        </Label>
                                    </Col>
                                </Row>
                                : null
                        }

                        {
                            breach?.breach_external ?
                                <Row gutter={25}>
                                    <Col>
                                        <Label style={{color:'#4FA67E'}}>
                                            External:
                                    </Label>
                                    </Col>
                                    <Col>
                                        <Label style={{ fontWeight: '500' }}>
                                            {breach?.breach_external}
                                        </Label>
                                    </Col>
                                </Row>
                                : null
                        }

                    </>

                    : null
            }

        </>
    )
}

export default EscalationNotify;

