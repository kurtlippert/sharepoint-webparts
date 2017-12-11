import * as React from 'react'
import styles from './HelloWorld.module.scss'
import IHelloWorldWebPartProps from './IHelloWorldWebPartProps'
import { escape } from '@microsoft/sp-lodash-subset'

import { style } from 'typestyle'
import { padding, margin } from 'csstips'

const r = React.createElement;

// const helloWorldContainer = style({
//   maxWidth: '700px',
//   margin: '0px auto',
//   boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)'
// })

// const helloWorldRow = style({

// })

const listStyle = style(
  padding(10),
  margin(10),
  {
    color: '#333333',
    fontFamily: `'Segoe UI Regular WestEuropean', 'Segoe UI', Tahoma, Arial, sans-serif`,
    fontSize: '14px',
    fontWeight: 'normal',
    boxSizing: 'border-box',
    lineHeight: '50px',
    listStyleType: 'none',
    boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)'
})

const listItemStyle = style(
  margin(0),
  padding(0),
  padding(9, 28, 3, 28),
  {
    color: '#333333',
    verticalAlign: 'center',
    fontFamily: `'Segoe UI Regular WestEuropean', 'Segoe UI', Tahoma, Arial, sans-serif`,
    fontSize: '14px',
    fontWeight: 'normal',
    boxSizing: 'border-box',
    boxShadow: 'none',
    zoom: 1,
    position: 'relative'
  }
)

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