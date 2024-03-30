import React, { useEffect, useMemo } from "react";
import { Box, Grid, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { usePagination, useHits } from "react-instantsearch-hooks-web";

import { SearchHit } from "./components";
import ACTION_STATUS from "../../constants/actionStatus";
import {
  selectAllFavorites,
  getMyFavorites,
} from "../common/productFavoriteSlice";

const SearchResult = () => {
  const { hits, sendEvent } = useHits();
  const { nbPages, refine } = usePagination();
  const dispatch = useDispatch();
  const favorites = useSelector(selectAllFavorites);
  const user = useSelector((state) => state.auth);
  const { getFavoritesStatus } = useSelector((state) => state.favorites);
  const availableHits = useMemo(() => {
    if (hits) {
      return hits.filter((hit) => hit.isActive === true);
    }

    return [];
  }, [hits]);

  useEffect(() => {
    if (getFavoritesStatus === ACTION_STATUS.IDLE && user) {
      dispatch(getMyFavorites());
    }
  }, [user]);

  const handlePageChange = (e, page) => {
    refine(page - 1);
  };

  return (
    <Box sx={{ height: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={2}>
          {availableHits.map((hit) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={hit.objectID}>
              <SearchHit
                hit={hit}
                sendEvent={sendEvent}
                favorites={favorites}
              />
            </Grid>
          ))}
        </Grid>
        {nbPages > 1 && (
          <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
            <Pagination
              count={nbPages}
              color="primary"
              onChange={handlePageChange}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SearchResult;
