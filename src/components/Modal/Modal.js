import React from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

const modal = document.getElementById('modal');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modal.appendChild(this.el);
  }

  componentWillUnmount() {
    modal.removeChild(this.el);
  }

  render() {
    return createPortal(
      this.props.children,
      this.el,
    );
  }
}

export default Modal;