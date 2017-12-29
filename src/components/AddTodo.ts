import * as React from 'react';
import { createElement as r } from 'react';
import { DispatchProp, connect } from 'react-redux';
import { StoreState } from '../types';
import { addTodo } from '../actions';

const AddTodo: React.SFC<DispatchProp<StoreState>> = ({ dispatch }) => {
  let input: HTMLInputElement;

  return (
    r('div', {},
      [
        r('input', {
          ref: node => node === null ? '' : input = node as HTMLInputElement,
        }),
        r('button', {
          onClick(): void {
            if (!input.value.trim()) {
              return;
            }

            dispatch !== undefined
              ? dispatch(addTodo(input.value))
              // tslint:disable-next-line:no-console
              : console.error('dispatch is undefined');

            input.value = '';
          },
        }, 'Add Todo'),
      ])
  );
};

//
export default connect()(AddTodo);
