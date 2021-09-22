import { Col, Row } from "antd";
import { map } from "lodash";
import { Label } from "../../../../../../../../components/InputBox/StyledComponents";




const EscalationConditions = ({ slaTRuleViewField, propertyName }) => {
    return (
            <Row gutter={20}>
                <Col>
                    <Label  style={{fontWeight:'500'}}>
                        <Label style={{ paddingRight: 3,  }}><span style={{color:'#4FA67E'}}>IF</span>(</Label>
                        {
                            map(slaTRuleViewField, (items, index) => {
                                return (
                                    <>
                                        <span style={{ paddingRight: 3 }}>{propertyName} = {items}</span>
                                        {
                                            slaTRuleViewField.length - 1 !== index ?
                                                <Label style={{ paddingRight: 3, color:'#4FA67E'}}>OR</Label>
                                                : null
                                        }
                                        {/* <span style={{ paddingRight: 3 }}>OR</span> */}
                                        {/* <span style={{ paddingRight: 3 }}>{items}</span> */}

                                    </>)
                            })
                        }
                        <span>)</span>
                    </Label>
                </Col>
            </Row>
    )
}
export default EscalationConditions;