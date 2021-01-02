import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Card, Row, Button } from 'react-bootstrap';
import { cardStyle, cardHeaderStyle } from '../theme/styles';
import { selectRecordedSpectra } from '../../reducers/spectrum';
import ExportCell from './export_cell';
import { downloadAllSpectra } from '../../util/download';

export default function DataExport() {
    const recordedSpectra = useSelector(selectRecordedSpectra);

    function getHeader() {
        return (
            <Card.Header as="h5" style={cardHeaderStyle}>
                Export
                <Button
                    variant="outline-dark"
                    onClick={() => downloadAllSpectra(recordedSpectra)}
                >
                    Download all as CSV
                </Button>
            </Card.Header>
        );
    }

    function getCells() {
        return recordedSpectra.map((spectrum, idx) =>
            ExportCell({ key: idx, name: spectrum.name })
        );
    }

    function getDataExport() {
        return (
            <Col style={{ paddingBottom: '1vh' }} lg={8} md={6} xs={12}>
                <Card style={cardStyle}>
                    {getHeader()}
                    {getCells()}
                </Card>
            </Col>
        );
    }

    return (
        <Row
            style={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            {getDataExport()}
        </Row>
    );
}
