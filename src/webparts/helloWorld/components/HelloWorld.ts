import * as React from 'react'
import styles from './HelloWorld.module.scss'
import IHelloWorldWebPartProps from './IHelloWorldWebPartProps'
import { escape } from '@microsoft/sp-lodash-subset'

const r = React.createElement;

const HelloWorld = ({ description, test, pageContext }: IHelloWorldWebPartProps) =>
  r('div', { className: styles.helloWorld }, [
    r('div', { className: styles.container }, [
      r('div', { className: styles.row }, [
        r('div', { className: styles.column }, [
          r('span', { className: styles.title }, "Welcome to SharePoint!"),
          r('p', { className: styles.subTitle }, "Customize SharePoint experiences using Web Parts."),
          r('p', { className: styles.description }, escape(description)),
          r('p', { className: styles.description }, escape(test)),
          r('p', { className: styles.description }, `Loading from ${escape(pageContext.web.title)}`),
          r('a', { href: "https://aka.ms/spfx", className: styles.button }, [
            r('span', { className: styles.label }, "Learn more")
          ])
        ])
      ])
    ])
  ])

export default HelloWorld