import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import WebPartContext from '@microsoft/sp-webpart-base/lib/core/WebPartContext';
import styles from './Example.module.scss';

export interface ExampleProps {
  description: string;
  test: string;
  test1: boolean;
  test2: string;
  test3: boolean;
  context: WebPartContext;
}

const { div, span, p, a } = React.DOM;

const Example = ({ description, test, context }: ExampleProps) =>
  div({ className: styles.example },
    div({ className: styles.container },
      div({ className: styles.row },
        div({ className: styles.column },
          span({ className: styles.title }, 'Welcome to SharePoint!'),
          p({ className: styles.subTitle }, 'Customize SharePoint experiences using Web Parts.'),
          p({ className: styles.description }, escape(description)),
          p({ className: styles.description }, escape(test)),
          p({ className: styles.description }, `Loading from ${escape(context.pageContext.web.title)}`),
          a({ href: 'https://aka.ms/spfx', className: styles.button },
            span({ className: styles.label }, 'Learn more'),
          ),
        ),
      ),
    ),
  );

export default Example;
