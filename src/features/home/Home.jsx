import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import { useHits } from "react-instantsearch-hooks-web";

import Banners from "./banners";
import ProductListSection from "./ProductListSection";
import ACTION_STATUS from "../../constants/actionStatus";
import { BannersSkeleton } from "./banners/components";
import ProductListSectionSkeleton from "./components/ProductListSectionSkeleton";
import { SomethingWentWrong } from "../common/components";
import {
  selectAllFavorites,
} from "../common/productFavoriteSlice";

import { selectAllCategories, getCategoryTree } from "../common/categorySlice";
import { getBanners, selectAllBanners } from "./banners/bannerSlice";
import { Brands } from "./brands";

const LAPTOP = 'Laptop';
const SMARTPHONE = 'Smartphone';

const Home = () => {
  const dispatch = useDispatch();
  const [laptopPage, setLaptopPage] = useState(1);
  const [smartphonePage, setSmartphonePage] = useState(1);
  const [laptopPerPage, setLaptopPerPage] = useState(8);
  const [smartphonePerPage, setSmartphonePerPage] = useState(8);
  const { getCategoryTreeStatus } = useSelector((state) => state.categories);
  const favorites = useSelector(selectAllFavorites);
  const { getBannersStatus } = useSelector((state) => state.banners);
  const banners = useSelector(selectAllBanners);
  const { sendEvent, hits } = useHits();

  const laptops = useMemo(() => {
    if (hits) {
      return hits.filter((hit) => hit.isActive === true &&
        hit.categories.lvl0 === LAPTOP);
    }

    return [];
  }, [hits]);

  const smartphones = useMemo(() => {
    if (hits) {
      return hits.filter((hit) => hit.isActive === true &&
        hit.categories.lvl0 === SMARTPHONE);
    }

    return [];
  }, [hits]);

  const laptopsToShow = useMemo(() => {
    if (laptops) {
      return laptops.slice(0, laptopPerPage * laptopPage);
    }
  }, [laptops, laptopPage, laptopPerPage]);

  const smartphonesToShow = useMemo(() => {
    if (smartphones) {
      return smartphones.slice(0, smartphonePerPage * smartphonePage);
    }
  }, [smartphones, smartphonePage, smartphonePerPage]);

  const canShowMoreLaptop = useMemo(() => {
    if (laptops) {
      if (laptopPage * laptopPerPage < laptops.length) {
        return true;
      }
    }

    return false;
  }, [laptopPage, laptopPerPage, laptops]);

  const canShowMoreSmartphone = useMemo(() => {
    if (smartphones) {
      if (smartphonePage * smartphonePerPage < smartphones.length) {
        return true;
      }
    }

    return false;
  }, [smartphonePage, smartphonePerPage, smartphones]);

  useEffect(() => {
    if (getCategoryTreeStatus === ACTION_STATUS.IDLE) {
      dispatch(getCategoryTree());
    }

    if (getBannersStatus === ACTION_STATUS.IDLE) {
      dispatch(getBanners({ page: 0, pageSize: 0, order: 'asc', orderBy: 'displayOrder' }));
    }
  }, []);

  const handleClickShowMoreLaptop = () => {
    setLaptopPage((prev) => prev + 1);
  };

  if (
    getCategoryTreeStatus === ACTION_STATUS.IDLE ||
    getCategoryTreeStatus === ACTION_STATUS.LOADING ||
    getBannersStatus === ACTION_STATUS.IDLE ||
    getBannersStatus === ACTION_STATUS.LOADING ||
    hits.length === 0
  ) {
    return (
      <>
        <BannersSkeleton />
        <ProductListSectionSkeleton />
      </>
    );
  }

  if (getCategoryTreeStatus === ACTION_STATUS.FAILED) {
    return <SomethingWentWrong />;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Banners banners={banners} />
      <ProductListSection
        title="Laptops"
        products={laptopsToShow}
        favorites={favorites}
        value="Laptop"
        sendEvent={sendEvent}
        path="/laptops"
      />
      {canShowMoreLaptop && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 1,
            mb: 3,
          }}
        >
          <Button variant="outlined" onClick={handleClickShowMoreLaptop}>
            Show more
          </Button>
        </Box>
      )}

      {smartphones?.length > 0 && (
        <>
          <ProductListSection
            title="Smartphones"
            products={smartphonesToShow}
            favorites={favorites}
            value="Smartphone"
            sendEvent={sendEvent}
            path="/smartphones"
          />
          {canShowMoreSmartphone && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 1,
                mb: 3,
              }}
            >
              <Button
                variant="outlined"
                onClick={handleClickShowMoreSmartphone}
              >
                Show more
              </Button>
            </Box>
          )}
        </>
      )}
      <Brands />
    </Box>
  );
};

export default Home;
