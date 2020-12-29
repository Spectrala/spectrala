import React from 'react';
import { Col, Card, Row, Button, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SpectrumTools from './spectrum_tools';
import { SpectrumLine } from './spectrum_line';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectValidateLiveSpectrum,
    SPECTRUM_OPTIONS,
    setPreferredSpectrum,
    selectPreferredSpectrumOption,
    selectHasReference,
} from '../../../reducers/spectrum';
import { cardStyle, cardHeaderStyle } from '../../theme/styles';

export default function SpectrumChart({
    height,
    selectedVariant,
    unselectedVariant,
}) {
    const data = useSelector(selectValidateLiveSpectrum);
    const viewSpect = useSelector(selectPreferredSpectrumOption);
    const hasReference = useSelector(selectHasReference);
    const dispatch = useDispatch();

    const getBtnVariant = (spectrumOption) => {
        const isActive = spectrumOption === viewSpect;
        return isActive ? selectedVariant : unselectedVariant;
    };

    const spectrumViewOptions = [
        SPECTRUM_OPTIONS.INTENSITY,
        SPECTRUM_OPTIONS.TRANSMITTANCE,
        SPECTRUM_OPTIONS.ABSORBANCE,
    ];

    function isCollapsed() {
        return false;
    }

    function isEnabled(option) {
        if (option === SPECTRUM_OPTIONS.INTENSITY) return true;
        // Only show transmittance/absorbance if there is a reference spectrum
        return hasReference === true;
    }

    function getHeader() {
        return (
            <Card.Header as="h5" style={cardHeaderStyle}>
                Spectrum
                <ButtonGroup style={{ height: '38px' }}>
                    {spectrumViewOptions.map((spectrumOption, idx) => (
                        <Button
                            key={idx}
                            variant={getBtnVariant(spectrumOption)}
                            onClick={() =>
                                dispatch(
                                    setPreferredSpectrum({
                                        preferredSpectrum: spectrumOption,
                                    })
                                )
                            }
                            disabled={!isEnabled(spectrumOption)}
                            aria-label={spectrumOption}
                            title={spectrumOption}
                        >
                            {spectrumOption}
                        </Button>
                    ))}
                </ButtonGroup>
            </Card.Header>
        );
    }

    return (
        <Row style={{ justifyContent: 'center', display: 'flex' }}>
            <Col style={{ paddingBottom: '1vh' }} lg={8} md={6} xs={12}>
                <Card style={cardStyle}>
                    {getHeader()}
                    {isCollapsed() ? null : (
                        <div style={{ height: height }}>
                            <SpectrumLine height={height} spectrumData={data} />
                        </div>
                    )}
                </Card>
            </Col>
            <Col
                style={{ paddingBottom: '1vh' }}
                xl={4}
                lg={4}
                md={6}
                sm={12}
                xs={12}
            >
                <SpectrumTools height={height} />
            </Col>
        </Row>
    );
}

SpectrumChart.propTypes = {
    height: PropTypes.number,
    selectedVariant: PropTypes.string,
    unselectedVariant: PropTypes.string,
};

SpectrumChart.defaultProps = {
    selectedVariant: 'dark',
    unselectedVariant: 'outline-dark',
};
