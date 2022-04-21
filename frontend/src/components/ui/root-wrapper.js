import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import { ApolloWrapper } from '../../Apollo/ApolloWrapper'
import { UserWrapper, FeedbackWrapper } from '../../contexts'
import theme from './theme'

export default ({ element }) => {
    return (
        <ThemeProvider theme={theme}>
            <ApolloWrapper>
                <UserWrapper>
                    <FeedbackWrapper>
                        {element}
                    </FeedbackWrapper>
                </UserWrapper>
            </ApolloWrapper>
        </ThemeProvider>

    )
}