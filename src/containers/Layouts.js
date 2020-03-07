import React, {useMemo} from "react";
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import {setSelectedLayout} from '../actions/main_actions';

const Layouts = props => {
    const layouts = useSelector(state => state.layouts);
    const dispatch = useDispatch();

    return useMemo(() => {
        return <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper><Typography variant="h1" component="h2">Layouts</Typography></Paper>
            </Grid>
            {layouts.map((layout, key) =>
                <Grid item xs={4} key={key}>
                    <Paper onClick={() => dispatch(setSelectedLayout(key))}>
                        <Typography>Select this layout</Typography>
                        <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
                            {layout.map(layoutObject =>
                                <div key={layoutObject.i}>{layoutObject.i}</div>
                            )}
                        </GridLayout>
                    </Paper>
                </Grid>
            )}

        </Grid>
    }, []);
};

Layouts.defaultProps = {};

Layouts.propTypes = {};

export default React.memo(Layouts);