import { TodoState } from './components/Todo';
import { WebListState } from './components/WebList';

export interface State {
    todos: TodoState[];
    webList: WebListState;
}