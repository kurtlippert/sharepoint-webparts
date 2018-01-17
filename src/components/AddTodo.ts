import * as React from 'react';
import { DispatchProp, connect } from 'react-redux';
import { State } from '../types';
import { addTodo } from '../actions';

const { div, input, button } = React.DOM;

const AddTodo: React.SFC<DispatchProp<State>> = ({ dispatch }) => {
  let inputElement: HTMLInputElement;

  return (
    div({},
      input({
          ref: node => node === null ? '' : inputElement = node as HTMLInputElement,
        }),
      button({
          onClick(): void {
            if (!inputElement.value.trim()) {
              return;
            }

            dispatch !== undefined
              ? dispatch(addTodo(inputElement.value))
              // tslint:disable-next-line:no-console
              : console.error('dispatch is undefined');

            inputElement.value = '';
          },
        }, 'Add Todo'),
      )
  );
};

export default connect()(AddTodo);
