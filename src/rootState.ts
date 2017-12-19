import { TodoState } from './components/Todo';
// import { Store } from 'redux';
// import { WebListState } from './components/WebList';

export interface State {
    // todoStore: Store<TodoState>;
    todos: TodoState[];
    // webList: WebListState;
}