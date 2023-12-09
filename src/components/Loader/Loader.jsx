import React from 'react';
import { Audio } from 'react-loader-spinner';

export const Loader = ({ wrapperStyle }) => {
  return (
    <div style={wrapperStyle}>
      <Audio
        height="80"
        width="80"
        radius="9"
        color="#3f51b5"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
};

export default Loader;
