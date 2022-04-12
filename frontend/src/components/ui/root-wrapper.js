import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import theme from './theme'

export default ({ element }) => {
    return (
        <ThemeProvider theme={theme}>
            {element}
        </ThemeProvider>
    )
}