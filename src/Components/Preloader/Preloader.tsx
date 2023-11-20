import React from 'react';

interface Props {
  display: boolean
}

const Preloader:React.FC<Props> = ({display}) => {
  const styleContainer = {
    display: display ? 'block' : 'none',
    width: '5rem', height: '5rem',
    position: 'absolute', top: '50%', left: '50%'
  }

  return (
    <div className="d-flex justify-content-center ">
      <div className="spinner-border text-success" role="status" style={styleContainer}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Preloader;