import * as React from 'react';
import { createElement as r } from 'react';
import { DispatchProp, connect } from 'react-redux';
import { StoreState } from '../types';
import { addTodo } from '../actions';

// Stateless-Functional component with no container component (aside from the root).
// So the pattern here (that I just created), is to name our SFC: '_<name_of_component>'
// then the 'container' connection function: '<name_of_component>'
const AddTodo: React.SFC<DispatchProp<StoreState>> = ({ dispatch }) => {
  let input: HTMLInputElement;

  return (
    r('form', {
      onSubmit(): void {
        if (!input.value.trim()) {
          return;
        }

        dispatch !== undefined
          ? dispatch(addTodo(input.value))
          // tslint:disable-next-line:no-console
          : console.error('dispatch is undefined');

        input.value = '';
      }
    },
      [
        r('input', {
          ref: node => node === null ? '' : input = node as HTMLInputElement
        }),
        r('button', {
          itemType: 'submit'
        },
          'Add Todo')
      ])
  );
};

export default connect()(AddTodo);
