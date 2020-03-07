import {cloneDeep} from 'lodash';
const initialState  =   {
    layouts: [
        [
            {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
            {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
            {i: 'c', x: 4, y: 0, w: 1, h: 2}
        ],
        [
            {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
            {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
            {i: 'c', x: 4, y: 0, w: 1, h: 2},
            {i: 'd', x: 5, y: 0, w: 1, h: 2}
        ],
        [
            {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
            {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
            {i: 'c', x: 4, y: 0, w: 1, h: 2},
            {i: 'd', x: 5, y: 0, w: 1, h: 2},
            {i: 'e', x: 7, y: 0, w: 1, h: 2}
        ],
    ],
    selectedLayout: 0,
    widgets: [
        'Button', 'Select', 'Checkbox', 'Slider'
    ]
};

function mainReducer(state = initialState, action) {
    switch (action.type) {
        case `SET_SELECTED_LAYOUT`:
            return {
                ...state,
                selectedLayout: action.payload
            };

        case 'ADD_WIDGET_TO_CELL':
            const clonedState   =   cloneDeep(state);
            if(!clonedState.layouts[state.selectedLayout][action.payload.cellId].widgets) {
                clonedState.layouts[state.selectedLayout][action.payload.cellId].widgets    =   [];
            }
            clonedState.layouts[state.selectedLayout][action.payload.cellId].widgets.push(action.payload.widgetName);
            return clonedState;

        default:
            return state;
    }
}

export default mainReducer;