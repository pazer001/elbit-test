import React, {useCallback, useMemo, useState} from "react";
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import GridLayout from "react-grid-layout";
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components';

import {addWidgetToCell} from '../actions/main_actions';
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';


const Wrapper = styled.div`
    .MuiListItem-root {
        cursor: pointer
    }
    .cell {
        border: 1px solid black
    }
`;

const Configurations = props => {
    const layout = useSelector(state => state.layouts[state.selectedLayout]);
    const widgets = useSelector(state => state.widgets);
    const dispatch = useDispatch();
console.log(layout)
    const onCellDrop = (e, cellId) => {
        e.preventDefault();
        const widgetId = e.dataTransfer.getData('widgetId');
        const widgetName = widgets[widgetId];
        dispatch(addWidgetToCell(cellId, widgetName));
    };

    const widgetsFactory    =   widgetName  =>  {
        switch (widgetName) {
            case 'Button':
                return <Button>Example</Button>;

            case 'Checkbox':
                return <Checkbox></Checkbox>;

            case 'Select':
                return <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={10}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>;

            case 'Slider':
                return <Slider
                    defaultValue={30}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={10}
                    max={110}
                />;
        }
    };

    return useMemo(() => {
        return <Wrapper>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper><Typography variant="h1">Configurations</Typography></Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper><Typography variant="h3">Widgets:</Typography></Paper>
                    <Paper>
                        <List component="nav">
                            {widgets.map((widget, key) =>
                                <ListItem>
                                    <ListItemText primary={widget} draggable={true}
                                                  onDragStart={(e) => e.dataTransfer.setData('widgetId', key)}/>
                                </ListItem>
                            )}
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={10}>
                    <Paper><Typography variant="h3">Build your layout</Typography></Paper>
                    <Paper>
                        <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200} autoSize={true} isResizable={true}>
                            {layout.map((layoutObject, key) =>
                                <div className="cell"
                                     key={layoutObject.i}
                                     onDragOver={e => e.preventDefault()}
                                     onDrop={(e) => onCellDrop(e, key)}>
                                    {Boolean(layoutObject.widgets && layoutObject.widgets.length) && layoutObject.widgets.map(widgetName =>
                                        <div>{widgetsFactory(widgetName)}</div>
                                    )}
                                </div>
                            )}
                        </GridLayout>
                    </Paper>
                </Grid>
            </Grid>
        </Wrapper>
    }, [layout]);
};

Configurations.defaultProps = {};

Configurations.propTypes = {};

export default React.memo(Configurations);