import React from 'react'
import styled from 'styled-components'
import { Box, Flex } from '@pancakeswap-libs/uikit'
import { useGetPredictionsStatus, useIsChartPaneOpen, useIsHistoryPaneOpen } from 'state/hooks'
import { PredictionStatus } from 'state/types'
import MobileMenu from './components/MobileMenu'
import History from './History'
import Positions from './Positions'
import Chart from './Chart'
import { ErrorNotification } from './components/Notification'

enum PageView {
  POSITIONS = 'positions',
  HISTORY = 'history',
  CHART = 'chart',
}

const StyledMobile = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`

const getView = (isHistoryPaneOpen: boolean, isChartPaneOpen: boolean): PageView => {
  if (isHistoryPaneOpen) {
    return PageView.HISTORY
  }

  if (isChartPaneOpen) {
    return PageView.CHART
  }

  return PageView.POSITIONS
}

const Mobile: React.FC = () => {
  const isHistoryPaneOpen = useIsHistoryPaneOpen()
  const isChartPaneOpen = useIsChartPaneOpen()
  const view = getView(isHistoryPaneOpen, isChartPaneOpen)
  const status = useGetPredictionsStatus()

  return (
    <StyledMobile>
      <Box height="100%">
        {view === PageView.POSITIONS && (
          <Flex alignItems="center" height="100%">
            {status === PredictionStatus.LIVE ? <Positions /> : <ErrorNotification />}
          </Flex>
        )}
        {view === PageView.CHART && <Chart />}
        {view === PageView.HISTORY && <History />}
      </Box>
      <MobileMenu />
    </StyledMobile>
  )
}

export default Mobile
