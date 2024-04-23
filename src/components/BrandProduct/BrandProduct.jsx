import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WrapperBrand } from './style';

const BrandProduct = ({ name }) => {
  const navigate = useNavigate();

  const handleNavigateBrand = (brand) => {
    navigate(`/brand/${brand.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, { state: brand });
  };

  return (
    <WrapperBrand onClick={() => handleNavigateBrand(name)}>{name}</WrapperBrand>
  );
};

export default BrandProduct;
