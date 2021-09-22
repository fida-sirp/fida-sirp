import React, { useState, useEffect } from 'react';
import { Container, Text, RoundCircle, ProgressChield, CenterText } from './StyledComponents';
import { Col, Row } from 'antd';
import { ChartTitle } from '../../StyledComponents';

function ProgressBarChart({ data, title, width, height }) {
    const [chartData, setChartData] = useState([]);
    const [total, setTotal] = useState(0)
    const [chartWidth, setChartWidth] = useState(0)
    const [chartheight, setChartheight] = useState(0)

    useEffect(() => {
        setChartWidth(width);
        setChartheight(height)
    }, [width, height])

    useEffect(() => {
        if (data && data.length > 0 && data[0].data && data[0].data.length > 0) {
            const chartData = [];
            let total = 0;
            data[0].data.map(d => total += parseInt(d));
            data[0].data.map((dRow, dRowindex) => {
                const percentance = parseFloat(parseInt(dRow) * 100 / total).toFixed(2);
                chartData.push({
                    color: data[0]?.backgroundColor[dRowindex],
                    text: data[0]?.label[dRowindex],
                    percentance: parseFloat(percentance)
                });
            });
            setTotal(total)
            setChartData(chartData);
        }
    }, [data]);

    return (
        <Container style={{ width: chartWidth, height: chartheight, overflow: 'auto' }}>
            <Row>
                <Col span={12}>
                <ChartTitle>{title}</ChartTitle>
                </Col>
                <Col span={12} style={{ fontSize: 20 }} style={{ textAlign: "right" }}>
                    <Text>{total}</Text>
                </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
                {chartData.map((item, index) => {
                    return (
                        <Col span={12} style={{ color: "#fff", marginTop: 20 }} >
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <RoundCircle color={item.color}></RoundCircle>
                                <span style={{ marginLeft: 10, fontSize: 20 }}>{item.text}</span>
                            </div>
                        </Col>
                    )
                })}
            </Row>

            <Row gutter={16} style={{ marginTop: 50 }}>
                {chartData.map((item, index) => {
                    return (
                        <ProgressChield width={item.percentance}>
                            <CenterText style={{ background: item.color }}>{item.percentance}%</CenterText>
                        </ProgressChield>
                    )
                })}
            </Row>
        </Container>
    );

}

export default ProgressBarChart;
