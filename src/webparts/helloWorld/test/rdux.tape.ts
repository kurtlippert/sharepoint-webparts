import * as test from 'tape';

type Test = test.Test;
const freeze = Object.freeze;

export enum ActionType {
  UPDATE_DESCRIPTION,
  UPDATE_TEST,
  UPDATE_TEST1,
  UPDATE_TEST2,
  UPDATE_TEST3
}

interface Action {
  type: ActionType;
  value: string | boolean;
}

interface State {
  description: string;
  test: string;
  test1: boolean;
  test2: string;
  test3: boolean;
}

const initialState: State = freeze({
  description: 'HelloWorld',
  test: 'Multi-line text field',
  test1: true,
  test2: '1',
  test3: true
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.UPDATE_DESCRIPTION:
      return {
        ...state,
        description: action.value as string
      };
    case ActionType.UPDATE_TEST:
      return {
        ...state,
        test: action.value as string
      };
    case ActionType.UPDATE_TEST1:
      return {
        ...state,
        test1: action.value as boolean
      };
    case ActionType.UPDATE_TEST2:
      return {
        ...state,
        test2: action.value as string
      };
    case ActionType.UPDATE_TEST3:
      return {
        ...state,
        test3: action.value as boolean
      };
    default:
      return state;
  }
};

test('basic action', (t: Test): void => {
  const stateBefore = initialState;

  const actionToDispatch: Action = freeze({
    type: ActionType.UPDATE_DESCRIPTION,
    value: 'updated description' 
  });

  const stateAfter: State = {
    description: 'updated description',
    test: 'Multi-line text field',
    test1: true,
    test2: '1',
    test3: true  
  };

  t.deepEqual(reducer(stateBefore, actionToDispatch), stateAfter);
  t.end();
});

// test('another action', (t: Test): void => {
//   const stateBefore = initialState; 

//   const actionToDispatch: Action = freeze({
//     type: ActionType
//   })
// })