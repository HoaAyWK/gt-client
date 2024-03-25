import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';

import { getBanners, selectAllBanners } from './banners/bannerSlice';
import { selectProductsByCategoryName, getProductsPerCategory } from '../common/productDetailsSlice';
import Banners from './banners/Banners';
import ProductListSection from './ProductListSection';
import ACTION_STATUS from '../../constants/actionStatus';
import { BannersSkeleton } from './banners/components';
import ProductListSectionSkeleton from './components/ProductListSectionSkeleton';
import { SomethingWentWrong } from '../common/components';
import { getMyFavorites, selectAllFavorites } from '../common/productFavoriteSlice';
import { Button } from '@mui/material';
import { useHits } from 'react-instantsearch-hooks-web';


const Home = () => {
  const dispatch = useDispatch();
  const [laptopPage, setLaptopPage] = useState(1);
  const [smartphonePage, setSmartphonePage] = useState(1);
  const [laptopPerPage, setLaptopPerPage] = useState(8);
  const [smartphonePerPage, setSmartphonePerPage] = useState(8);
  const banners = useSelector(selectAllBanners);
  const laptops = useSelector((state) => selectProductsByCategoryName(state, 'Laptop'));
  const smartphones = useSelector((state) => selectProductsByCategoryName(state, 'Smartphone'));
  const { getBannersStatus } = useSelector((state) => state.banners);
  const { getProductsPerCategoryStatus } = useSelector((state) => state.productDetails);
  const { user } = useSelector((state) => state.auth);
  const favorites = useSelector(selectAllFavorites);
  const { getFavoritesStatus } = useSelector((state) => state.favorites);
  const { sendEvent } = useHits();

  const canShowMoreLaptop = useMemo(() => {
    if (laptops?.products) {
      if (laptopPage * laptopPerPage < laptops.products.length) {
        return true;
      }
    }

    return false;
  }, [laptopPage, laptopPerPage, laptops]);

  const laptopsToShow = useMemo(() => {
    if (laptops?.products) {
      return laptops.products.slice(0, laptopPerPage * laptopPage);
    }
  }, [laptops, laptopPage, laptopPerPage]);

  const canShowMoreSmartphone = useMemo(() => {
    if (smartphones?.products) {
      if (smartphonePage * smartphonePerPage < smartphones.products.length) {
        return true;
      }
    }

    return false;
  }, [smartphonePage, smartphonePerPage, smartphones]);

  const smartphonesToShow = useMemo(() => {
    if (smartphones?.products) {
      return smartphones.products.slice(0, smartphonePage * smartphonePerPage);
    }
  }, [smartphonePage, smartphonePerPage, smartphones]);

  useEffect(() => {
    if (getBannersStatus === ACTION_STATUS.IDLE) {
      dispatch(getBanners());
    }

    if (getProductsPerCategoryStatus === ACTION_STATUS.IDLE) {
      dispatch(getProductsPerCategory());
    }

  }, []);

  useEffect(() => {
    if (getFavoritesStatus === ACTION_STATUS.IDLE && user) {
      dispatch(getMyFavorites());
    }
  }, [user]);

  const handleClickShowMoreLaptop = () => {
    setLaptopPage(prev => prev + 1);
  };

  const handleClickShowMoreSmartphone = () => {
    setSmartphonePage(prev => prev + 1);
  };

  if (getBannersStatus === ACTION_STATUS.IDLE ||
      getBannersStatus === ACTION_STATUS.LOADING ||
      getProductsPerCategoryStatus === ACTION_STATUS.IDLE ||
      getProductsPerCategoryStatus === ACTION_STATUS.LOADING) {
    return (
      <>
        <BannersSkeleton />
        <ProductListSectionSkeleton />
      </>
    );
  }

  if (getBannersStatus === ACTION_STATUS.FAILED ||
    getProductsPerCategoryStatus === ACTION_STATUS.FAILED) {
    return <SomethingWentWrong />;
  }

  return (
    <>
      <Banners banners={banners} />
      <ProductListSection
        title='Laptops'
        products={laptopsToShow}
        favorites={favorites}
        value='Laptop'
        sendEvent={sendEvent}
        path='/laptops'
      />
      {canShowMoreLaptop && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 1,
            mb: 3
          }}
        >
          <Button variant='outlined' onClick={handleClickShowMoreLaptop}>Show more</Button>
        </Box>
      )}

      {smartphones?.products.length > 0 && (
        <>
          <ProductListSection
            title='Smartphones'
            products={smartphonesToShow}
            favorites={favorites}
            value='Smartphone'
            sendEvent={sendEvent}
            path='/smartphones'
          />
          {canShowMoreSmartphone && (
            <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 1,
              mb: 3
            }}
          >
            <Button variant='outlined' onClick={handleClickShowMoreSmartphone}>Show more</Button>
          </Box>
          )}
        </>
      )}
    </>
  );
};

export default Home;
