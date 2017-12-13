import * as React from 'react'
import { ISPList } from './FetchHttpClientData'
import { listStyle, listItemStyle } from './WebList.style'
import { connect } from 'react-redux'

const r = React.createElement

export function renderList(items: ISPList[], selector: string): void {
  const html: string = 
    items.map(item => 
      r('ul', { className: listStyle }, [
        r('li', { className: listItemStyle }, [
          r('span', { className: 'ms-font-l' }, item.Title)
        ])
      ])
    ).join('')

  const listContainer: Element = this.domElement.querySelector(selector)
  listContainer.innerHTML = html
}

// const mapStateToProps = (state) => ({
//   ispItems = 
// })

const WebList = () =>
  r('div', {}, 'Web List will go here')
  // ispItems.map((ispItem: ISPList) =>
  //   r('ul', { className: listStyle }, [
  //     r('li', { className: listItemStyle }, [
  //       r('span', { className: 'ms-font-l' }, ispItem.Title)
  //     ])
  //   ]))
  // r('div', { id: 'spListContainer' })

export default WebList

// const HelloWorld = ({ description, test, context }: IHelloWorldWebPartProps) =>
//   r('div', { className: styles.helloWorld }, [
//     r('div', { className: styles.container }, [
//       r('div', { className: styles.row }, [
//         r('div', { className: styles.column }, [
//           r('span', { className: styles.title }, "Welcome to SharePoint!"),
//           r('p', { className: styles.subTitle }, "Customize SharePoint experiences using Web Parts."),
//           r('p', { className: styles.description }, escape(description)),
//           r('p', { className: styles.description }, escape(test)),
//           r('p', { className: styles.description }, `Loading from ${escape(context.pageContext.web.title)}`),
//           r('a', { href: "https://aka.ms/spfx", className: styles.button }, [
//             r('span', { className: styles.label }, "Learn more")
//           ])
//         ])
//       ]),
//       r('div', { id: 'spListContainer' })
//       // renderListAsync(context)
//       // response(context).subscribe((ispList: ISPList[]) => renderList(ispList))
//     ])
//   ])