import React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, Toggle, Text, Flex, NotificationDot } from '@pancakeswap-libs/uikit'
import { useTranslation } from 'contexts/Localization'

const PoolTabButtons = ({ stakedOnly, setStakedOnly, hasStakeInFinishedPools }) => {
  const { url, isExact } = useRouteMatch()
  const { t } = useTranslation()

  return (
    <Flex alignItems="center" justifyContent="center" mb="32px">
      <ButtonMenu activeIndex={isExact ? 0 : 1} scale="sm" variant="subtle">
        <ButtonMenuItem as={Link} to={`${url}`}>
          {t('Live')}
        </ButtonMenuItem>
        <NotificationDot show={hasStakeInFinishedPools}>
          <ButtonMenuItem as={Link} to={`${url}/history`}>
            {t('Finished')}
          </ButtonMenuItem>
        </NotificationDot>
      </ButtonMenu>
      <Flex ml="24px" justifyContent="center" alignItems="center">
        <Toggle scale="sm" checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} />
        <Text ml="8px" color={`${stakedOnly ? 'body' : 'textDisabled'}`}>
          {t('Staked only')}
        </Text>
      </Flex>
    </Flex>
  )
}

export default PoolTabButtons
