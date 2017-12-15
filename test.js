"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
// const test = require('tape');
var test = require("tape");
var ActionType;
(function (ActionType) {
    ActionType["UPDATE_DESCRIPTION"] = "UPDATE_DESCRIPTION";
    ActionType["UPDATE_TEST"] = "UPDATE_TEST";
    ActionType["UPDATE_TEST1"] = "UPDATE_TEST1";
    ActionType["UPDATE_TEST2"] = "UPDATE_TEST2";
    ActionType["UPDATE_TEST3"] = "UPDATE_TEST3";
})(ActionType = exports.ActionType || (exports.ActionType = {}));
var initialState = Object.freeze({
    description: 'HelloWorld',
    test: 'Multi-line text field',
    test1: true,
    test2: '1',
    test3: true
});
var reducer = function (state, action) {
    switch (action.type) {
        case ActionType.UPDATE_DESCRIPTION:
            return __assign({}, state, { description: action.value });
        case ActionType.UPDATE_TEST:
            return __assign({}, state, { test: action.value });
        case ActionType.UPDATE_TEST1:
            return __assign({}, state, { test1: action.value });
        case ActionType.UPDATE_TEST2:
            return __assign({}, state, { test2: action.value });
        case ActionType.UPDATE_TEST3:
            return __assign({}, state, { test3: action.value });
        default:
            return state;
    }
};
// const testUpdateProperty = (): void => {
// const stateBefore: State = initialState; 
var action = Object.freeze({
    type: ActionType.UPDATE_DESCRIPTION,
    value: 'updated description'
});
var stateAfter = {
    description: 'updated description',
    test: 'Multi-line text field',
    test1: true,
    test2: '1',
    test3: true
};
// };
test('redux test', function (t) {
    t.deepEqual(reducer(initialState, action), stateAfter);
    t.end();
});
