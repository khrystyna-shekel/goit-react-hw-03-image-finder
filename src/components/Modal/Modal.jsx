import React, { Component } from 'react';
import styled from 'styled-components';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => {
    if (e.key === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    const { modalImgUrl, closeModal } = this.props;
    return (
      <StyledOverlay onClick={closeModal}>
        <div>
          <img src={modalImgUrl} alt="img" />
        </div>
      </StyledOverlay>
    );
  }
}

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;

  & div {
    background-color: white;
    max-width: calc(100vw - 48px);
    max-height: calc(100vh - 24px);
  }
`;
