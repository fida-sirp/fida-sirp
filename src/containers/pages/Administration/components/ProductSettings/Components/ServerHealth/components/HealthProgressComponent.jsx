import { Col, Row } from "antd"
import { Label } from "../../../../../../../../components/InputBox/StyledComponents"
import SPRoundProgress from "../../../../../../../../components/SPRoundProgress"




const HealthProgressComponent = ({ health }) => {
    return (
        <>
            <Row style={{ margin: 15 }}>
                <Col>
                    <SPRoundProgress type={health.CPU > 85 ? 'danger' : 'success'} progress={health.CPU} width="120" />
                </Col>
            </Row>
            <Row style={{ justifyContent: 'center' }}>
                <Col>
                    <Label>CPU</Label>
                </Col>
            </Row>
            <Row style={{ margin: 15 }}>
                <Col>
                    <SPRoundProgress type={health.RAM > 80 ? 'danger' : 'success'} progress={health.RAM} width="120" />
                </Col>
            </Row>
            <Row style={{ justifyContent: 'center' }}>
                <Col>
                    <Label>RAM</Label>
                </Col>
            </Row>
            <Row style={{ margin: 15 }}>
                <Col>
                    <SPRoundProgress type={health.HDD > 85 ? 'danger' : 'success'} progress={health.HDD} width="120" />
                </Col>
            </Row>
            <Row style={{ justifyContent: 'center' }}>
                <Col>
                    <Label>HDD</Label>
                </Col>
            </Row>
        </>
    )
}


export default HealthProgressComponent