import * as React from 'react';
import { createElement as r } from 'react';
import { combineReducers, createStore, Reducer, Store } from 'redux';

// state
export interface TodoState {
    id: number;
    text: string;
    completed: boolean;
    filter: VisibilityType;
}

export enum VisibilityType {
    SHOW_ALL
}

// actions
export enum TodoActionType {
    ADD_TODO,
    TOGGLE_TODO,
    SET_VISIBILITY_FILTER
}

export interface TodoAction {
    id: number;
    text: string;
    type: TodoActionType;
    filter: VisibilityType;
}

// initial state
const initialState: TodoState = {
    id: -1,
    text: '',
    completed: false,
    filter: VisibilityType.SHOW_ALL
};

// reducer
const todo = (state: TodoState, action: TodoAction): TodoState => {
    switch (action.type) {
        case TodoActionType.ADD_TODO:
            return {
                ...state,
                id: action.id,
                text: action.text,
                completed: false
            };
        case TodoActionType.TOGGLE_TODO:
            if (state.id !== action.id) {
                return state;
            }

            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
};

const todos = (state: TodoState[], action: TodoAction): TodoState[] => {
    switch (action.type) {
        case TodoActionType.ADD_TODO:
            return [
                ...state,
                todo(initialState, action)
            ];
        case TodoActionType.TOGGLE_TODO:
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

const visibilityFilter = (state: VisibilityType, action: TodoAction): VisibilityType => {
    switch (action.type) {
        case TodoActionType.SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
};

// reducer combine
export interface TodoReducerMap {
    todos: TodoState[];
    visibilityFilter: VisibilityType;
}

export const todoComponent: Reducer<TodoReducerMap> = combineReducers<TodoReducerMap>({
    todos: todos as Reducer<TodoState[]>,
    visibilityFilter: visibilityFilter as Reducer<VisibilityType>
});

// view
// export interface TodoProps {
//     store: Store<;
// }

const store = createStore(todoComponent);

let nextTodoId = 0;

// export const Todo = ({ })
class Todo extends React.Component<{}, {}> {
    private todoInput: HTMLInputElement;

    public render() {
        return (
            r('div', {}, [
                r('input', {
                    ref: node => node === null ? '' : this.todoInput = node as HTMLInputElement
                }),
                r('button', {
                    onClick: () => {
                        store.dispatch({
                            type: TodoActionType.ADD_TODO,
                            text: this.todoInput.value === null ? '' : this.todoInput.value,
                            id: nextTodoId++
                        });
                        this.todoInput.value = '';
                    }
                }),
                r('ul', {}, [
                    
                ])
            ])
        );
    }
}

// export const Todo = () =>
//     r('div', {}, [
//         r('input', {
//             ref: node => this.input = node
//         })
//     ])