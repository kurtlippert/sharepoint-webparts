import * as React from 'react';
import { createElement as r } from 'react';
import { combineReducers, Reducer, Store } from 'redux';

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

const todos = (state: TodoState[] = [], action: TodoAction): TodoState[] => {
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

const visibilityFilter = (state: VisibilityType = VisibilityType.SHOW_ALL, action: TodoAction): VisibilityType => {
    switch (action.type) {
        case TodoActionType.SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
};

// reducer combin
export interface TodoReducerMap {
    todos: TodoState[];
    visibilityFilter: VisibilityType;
}

export const todosReducer: Reducer<TodoReducerMap> = combineReducers<TodoReducerMap>({
    todos: todos as Reducer<TodoState[]>,
    visibilityFilter: visibilityFilter as Reducer<VisibilityType>
});

// view
export interface TodoProps {
    todos: TodoState[];
    store: Store<TodoReducerMap>;
}

// export const todoStore = createStore(todosReducer);

let nextTodoId = 0;

// export const Todo = ({ })
export default class Todo extends React.Component<TodoProps, {}> {

    private todoInput: HTMLInputElement;

    // private store: Store<TodoState[]>;

    public render(): React.ReactHTMLElement<HTMLElement> {
        // tslint:disable-next-line:no-console
        console.log(this.props);
        // tslint:disable-next-line:no-console
        console.log(this.props.todos.map(_ => ({ id: 999, text: 'wad up?' })));

        // tslint:disable-next-line:no-console
        console.log(this.todoInput);

        return (
            r('div', {}, [
                r('input', {
                    ref: node => node === null ? '' : this.todoInput = node as HTMLInputElement
                }),
                r('button', {
                    onClick: () => {
                        // tslint:disable-next-line:no-console
                        console.log(`input: ${this.todoInput.value}`);

                        // tslint:disable-next-line:no-console
                        console.log('state before:');
                        // tslint:disable-next-line:no-console
                        console.log(this.props.store.getState());

                        this.props.store.dispatch({
                            type: TodoActionType.ADD_TODO,
                            text: this.todoInput.value === null ? '' : this.todoInput.value,
                            id: nextTodoId++
                        });
                        this.todoInput.value = '';

                        // tslint:disable-next-line:no-console
                        console.log('state after:');
                        // tslint:disable-next-line:no-console
                        console.log(this.props.store.getState());
                    }
                },
                'Add Todo'),
                r('ul', {}, 
                    this.props.todos.map(todoItem =>
                        r('li',
                            {
                                key: todoItem.id,
                                onClick: () => {
                                    this.props.store.dispatch({
                                        type: TodoActionType.TOGGLE_TODO,
                                        id: todoItem.id
                                    });
                                },
                                // style: `text-decoration: ${todoItem.completed ? 'line-through' : 'none'}`
                                style: { textDecoration: todoItem.completed ? 'line-through' : 'none' }
                            },
                            todoItem.text
                        )
                    )
                )
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