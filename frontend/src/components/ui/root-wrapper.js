import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import { ApolloWrapper } from '../../Apollo/ApolloWrapper'
import theme from './theme'

export default ({ element }) => {
    return (
        <ThemeProvider theme={theme}>
            <ApolloWrapper>
                {element}
            </ApolloWrapper>
        </ThemeProvider>

    )
}