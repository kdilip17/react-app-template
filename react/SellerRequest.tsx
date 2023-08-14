import React, { FC, Fragment } from 'react';
import SellerRequests from './components/SellerRequests';
import { compose, graphql } from 'react-apollo';
import { injectIntl } from 'react-intl'


import QUERY_CONFIG from './queries/config.gql'

const SellerRequestComponent: FC = () => {
  return (
    <Fragment>
      <SellerRequests />
    </Fragment>
  )
}

export default injectIntl(
  compose(
    graphql(QUERY_CONFIG, {
      options: { ssr: false },
    })
  )(SellerRequestComponent)
)
// export default SellerRequestComponent
