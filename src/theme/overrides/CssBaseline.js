export default function CssBaseline(theme) {
    return {
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    margin: 0,
                    padding: 0,
                    boxSizing: 'border-box',
                },
                html: {
                    width: '100%',
                    height: '100%',
                    WebkitOverflowScrolling: 'touch',
                },
                body: {
                    width: '100%',
                    height: '100%',
                },
                '#root': {
                    width: '100%',
                    height: '100%',
                },
                input: {
                    '&[type=number]': {
                        MozAppearance: 'textfield',
                        '&::-webkit-outer-spin-button': {
                            margin: 0,
                            WebkitAppearance: 'none',
                        },
                        '&::-webkit-inner-spin-button': {
                            margin: 0,
                            WebkitAppearance: 'none',
                        },
                    },
                },
                img: {
                    display: 'block',
                    maxWidth: '100%',
                },
                '.aa-Autocomplete': {
                  [theme.breakpoints.up('xs')]: {
                    width: 160
                  },
                  [theme.breakpoints.up('md')]: {
                    width: 280
                  },
                },
                '.aa-DetachedSearchButton': {
                  border: `1px solid ${theme.palette.grey[500_24]} !important`
                  // border: `1px solid #fff`
                }
            },
        },
    }
}
