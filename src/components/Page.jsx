import React, { forwardRef } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

const Page = forwardRef(({ children, title = '', meta, ...other }, ref) => (
    <>
        <Helmet>
            <title>{`${title} | EStore`}</title>
            {meta}
        </Helmet>
        <Box sx={{ mb: 32 }}>
          <Box ref={ref} {...other}>
              {children}
          </Box>
        </Box>
    </>
));

Page.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    meta: PropTypes.node,
};

export default Page;
