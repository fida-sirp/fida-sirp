import { Col, Row } from "antd";
import { Label } from "../../../../../../../../components/InputBox/StyledComponents";
import { StystemHeader } from "../StyleComponent";




const SystemComponent = ({ system }) => {
    return (
        <Row style={{ background: '#1C1C24', maxWidth: 360 }}>
            <Col>
                <StystemHeader>
                    Stystem
                </StystemHeader>
                <Row gutter={120} style={{ padding: 8, alignItems: 'center' }}>
                    <Col span={4}>
                        <span style={{ fontWeight: '600' }}>Host:</span>
                    </Col>
                    <Col span={17}>
                        {system.host}
                    </Col>
                </Row>
                <hr style={{ background: '#FFF', height: 1, border: 'none' }} />
                <Row gutter={120} style={{ padding: 8, alignItems: 'center' }}>
                    <Col span={4}>
                        <span style={{ fontWeight: '600' }}>OS:</span>
                    </Col>
                    <Col span={17}>
                        {system.os}
                    </Col>
                </Row>
                <hr style={{ background: '#FFF', height: 1, border: 'none' }} />
                <Row gutter={120} style={{ padding: 8, alignItems: 'center' }}>
                    <Col span={4}>
                        <span style={{ fontWeight: '600' }}>UpTime:</span>
                    </Col>
                    <Col span={17}>
                        {system.uptime}
                    </Col>
                </Row>
                <hr style={{ background: '#FFF', height: 1, border: 'none' }} />
                <Row gutter={120} style={{ padding: 8, alignItems: 'center' }}>
                    <Col span={4}>
                        <span style={{ fontWeight: '600' }}>Kernel:</span>
                    </Col>
                    <Col span={17}>
                        {system.kernel}
                    </Col>
                </Row>
                <hr style={{ background: '#FFF', height: 1, border: 'none' }} />
                <Row gutter={120} style={{ padding: 8, alignItems: 'center' }}>
                    <Col span={4}>
                        <span style={{ fontWeight: '600' }}>Server_date:</span>
                    </Col>
                    <Col span={17}>
                        {system.time}
                    </Col>
                </Row>
            </Col>
        </Row>);
}

export default SystemComponent;