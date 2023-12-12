import React, { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

import { fetchGallary, fetchGallaryByQuery } from 'services/api';
import { StyledWrapper } from './App.Styled';

export class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    isLoading: false,
    isModalOpen: false,
    showLoadMore: true,
    modalImgUrl: '',
  };

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });

      const { hits } = await fetchGallary();
      this.setState({ images: hits });
    } catch (error) {
      console.log(error.message);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    this.setState({ page: 1 });

    const search = e.currentTarget.elements.search.value;
    this.setState({ search });
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.search !== this.state.search
    ) {
      try {
        this.setState({ isLoading: true });
        const { hits } = await fetchGallaryByQuery(
          this.state.search,
          this.state.page
        );

        if (prevState.search !== this.state.search) {
          this.setState({ images: hits });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
          }));
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleLoadBtn = async () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      showLoadMore: true,
    }));
  };

  openModal = targetImgUrl => {
    this.setState(prevState => ({
      modalImgUrl: targetImgUrl,
      isModalOpen: true,
    }));
  };

  closeModal = e => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { images, isModalOpen, modalImgUrl, isLoading, showLoadMore } =
      this.state;
    return (
      <StyledWrapper>
        {isModalOpen && (
          <Modal closeModal={this.closeModal} modalImgUrl={modalImgUrl} />
        )}
        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery images={images} openModal={this.openModal} />
        {showLoadMore && <Button handleLoadBtn={this.handleLoadBtn} />}
        {isLoading && <Loader wrapperStyle={{ margin: '0 auto' }} />}
      </StyledWrapper>
    );
  }
}
