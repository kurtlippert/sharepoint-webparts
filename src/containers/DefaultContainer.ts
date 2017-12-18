// import * as React from 'react';
// import { connect } from 'react-redux';

// import { State } from '../store/IState'
// import Example from '../components/Example/Example.component';

// const mapStateToProps = (state: IState) => ({
//     description: state.webpart.properties.description,
//     test: state.webpart.properties.test,
//     test1: state.webpart.properties.test1,
//     test2: state.webpart.properties.test2,
//     test3: state.webpart.properties.test3,
//     context: state.webpart.context
// })

// const DefaultContainer = ({ description, test, context }): React.ReactElement<IState> => 
//     React.createElement(
//         Example,
//         {
//             description,
//             test,
//             context
//         })

// export default connect(mapStateToProps)(DefaultContainer)