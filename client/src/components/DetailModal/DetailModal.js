// /* eslint react/no-multi-comp: 0, react/prop-types: 0 */

// import React, { Component } from 'react';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// class ModalExample extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       modal: false,
//       nestedModal: false,
//       closeAll: false
//     };

//     this.toggle = this.toggle.bind(this);
//     this.toggleNested = this.toggleNested.bind(this);
//     this.toggleAll = this.toggleAll.bind(this);
//   }

//   toggle() {
//     this.setState({
//       modal: !this.state.modal
//     });
//   }

//   toggleNested() {
//     this.setState({
//       nestedModal: !this.state.nestedModal,
//       closeAll: false
//     });
//   }

//   toggleAll() {
//     this.setState({
//       nestedModal: !this.state.nestedModal,
//       closeAll: true
//     });
//   }


//   export default ModalExample;