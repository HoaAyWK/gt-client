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

const Home = () => {
  const dispatch = useDispatch();
  const [laptopPage, setLaptopPage] = useState(1);
  const [laptopPerPage, setLaptopPerPage] = useState(8);
  const { getCategoryTreeStatus } = useSelector((state) => state.categories);
  const categories = useSelector(selectAllCategories);
  const { user } = useSelector((state) => state.auth);
  const favorites = useSelector(selectAllFavorites);
  const { getFavoritesStatus } = useSelector((state) => state.favorites);
  const { getBannersStatus } = useSelector((state) => state.banners);
  const banners = useSelector(selectAllBanners);
  const { sendEvent, hits } = useHits();

  const laptops = [];

  const availableHits = useMemo(() => {
    if (hits) {
      return hits.filter((hit) => hit.isActive === true);
    }

    return [];
  }, [hits]);

  const canShowMoreLaptop = useMemo(() => {
    if (laptops?.products) {
      if (laptopPage * laptopPerPage < laptops.products.length) {
        return true;
      }
    }

    return false;
  }, [laptopPage, laptopPerPage, laptops]);

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
        // products={laptopsToShow}
        products={availableHits}
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

      {/* {smartphones?.products?.length > 0 && (
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
      )} */}
    </Box>
  );
};

export default Home;
