import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';

const r = React.createElement;

const HelloWorld = ({ description }: IHelloWorldProps) =>
  r('div', { className: styles.helloWorld }, [
    r('div', { className: styles.container }, [
      r('div', { className: styles.row }, [
        r('div', { className: styles.column }, [
          r('span', { className: styles.title }, "Welcome to SharePoint!"),
          r('p', { className: styles.subTitle }, "Customize SharePoint experiences using Web Parts."),
          r('p', { className: styles.description }, escape(description)),
          r('a', { href: "https://aka.ms/spfx", className: styles.button }, [
            r('span', { className: styles.label }, "Learn more")
          ])
        ])
      ])
    ])
  ])
  // div({}, )
  // <div className={ styles.helloWorld }>
  //   <div className={ styles.container }>
  //     <div className={ styles.row }>
  //       <div className={ styles.column }>
  //         <span className={ styles.title }>Welcome to SharePoint!</span>
  //         <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
  //         <p className={ styles.description }>{escape(description)}</p>
  //         <a href="https://aka.ms/spfx" className={ styles.button }>
  //           <span className={ styles.label }>Learn more</span>
  //         </a>
  //       </div>
  //     </div>
  //   </div>
  // </div>;


// const HelloWorld = ({ description }: IHelloWorldProps) =>
//   <div className={ styles.helloWorld }>
//     <div className={ styles.container }>
//       <div className={ styles.row }>
//         <div className={ styles.column }>
//           <span className={ styles.title }>Welcome to SharePoint!</span>
//           <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
//           <p className={ styles.description }>{escape(description)}</p>
//           <a href="https://aka.ms/spfx" className={ styles.button }>
//             <span className={ styles.label }>Learn more</span>
//           </a>
//         </div>
//       </div>
//     </div>
//   </div>;

export default HelloWorld;

//export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {
//  public render(): React.ReactElement<IHelloWorldProps> {
//    return (
//      <div className={ styles.helloWorld }>
//        <div className={ styles.container }>
//          <div className={ styles.row }>
//            <div className={ styles.column }>
//              <span className={ styles.title }>Welcome to SharePoint!</span>
//              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
//              <p className={ styles.description }>{escape(this.props.description)}</p>
//              <a href="https://aka.ms/spfx" className={ styles.button }>
//                <span className={ styles.label }>Learn more</span>
//              </a>
//            </div>
//          </div>
//        </div>
//      </div>
//    );
//  }
//}
//