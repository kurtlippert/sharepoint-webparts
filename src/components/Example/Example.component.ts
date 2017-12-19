import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import WebPartContext from '@microsoft/sp-webpart-base/lib/core/WebPartContext';
import styles from './Example.module.scss';
// import WebList from '../WebList/WebList.component';

export interface ExampleProps {
  description: string;
  test: string;
  test1: boolean;
  test2: string;
  test3: boolean;
  context: WebPartContext;
}

const r = React.createElement;

const Example = ({ description, test, context }: ExampleProps) =>
  r('div', { className: styles.example }, [
    r('div', { className: styles.container }, [
      r('div', { className: styles.row }, [
        r('div', { className: styles.column }, [
          r('span', { className: styles.title, key: 'sp-title' }, 'Welcome to SharePoint!'),
          r('p', { className: styles.subTitle }, 'Customize SharePoint experiences using Web Parts.'),
          r('p', { className: styles.description }, escape(description)),
          r('p', { className: styles.description }, escape(test)),
          r('p', { className: styles.description }, `Loading from ${escape(context.pageContext.web.title)}`),
          r('a', { href: 'https://aka.ms/spfx', className: styles.button }, [
            r('span', { className: styles.label }, 'Learn more')
          ])
        ])
      ])
      // WebList()
    ])
  ]);

export default Example;