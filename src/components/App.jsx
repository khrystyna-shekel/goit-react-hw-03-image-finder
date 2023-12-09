import React, { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { fetchGallary } from 'services/api';

export class App extends Component {
  state = {
    searchQuery: '',
    searchResult: [],
    page: 1,
    isLoading: false,
    isModalOpen: false,
  };

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });

      const allGallery = await fetchGallary();
      this.setState({ searchResult: allGallery.hits });
    } catch (error) {
      console.log(error.message);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  onSubmit = e => {
    e.preventDefault();
  };

  openModal = e => {
    console.log('bun');
  };

  closeModal = e => {};

  handleLoadBtn = e => {
    console.log('no');
  };

  render() {
    const { searchResult, isModalOpen, isLoading } = this.state;
    return (
      <div>
        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery images={searchResult} openModal={this.openModal} />
        <Button handleLoadBtn={this.handleLoadBtn} />
        {isLoading && <Loader />}
        {isModalOpen && <Modal closeModal={this.closeModal} />}
      </div>
    );
  }
}
