import { Col, Row } from "antd";
import { Label } from "../../../../../../../../components/InputBox/StyledComponents";
import { StystemHeader } from "../StyleComponent";




const MemoryComponent = ({ memory }) => {
    return (
        <Row style={{ background: '#1C1C24', maxWidth: 360 }}>
            <Col>
                <StystemHeader>
                Memory
                </StystemHeader>
                <Row gutter={120} style={{ padding: 8, alignItems: 'center' }}>
                    <Col span={4}>
                        <span style={{ fontWeight: '600' }}>Used:</span>
                    </Col>
                    <Col span={17}>
                        {memory.Used}
                    </Col>
                </Row>
                <hr style={{ background: '#FFF', height: 1, border: 'none' }} />
                <Row gutter={120} style={{ padding: 8, alignItems: 'center' }}>
                    <Col span={4}>
                        <span style={{ fontWeight: '600' }}>Free:</span>
                    </Col>
                    <Col span={17}>
                        {memory.Free}
                    </Col>
                </Row>
                <hr style={{ background: '#FFF', height: 1, border: 'none' }} />
                <Row gutter={120} style={{ padding: 8, alignItems: 'center' }}>
                    <Col span={4}>
                        <span style={{ fontWeight: '600' }}>Total:</span>
                    </Col>
                    <Col span={17}>
                        {memory.total}
                    </Col>
                </Row>

            </Col>
        </Row>);
}

export default MemoryComponent;