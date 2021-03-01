import { gql } from 'apollo-boost'

export const EPOCHES_QUERY = gql`
  query epoches(
    $first: Int!
    $orderBy: String!
    $orderDirection: String!
    $filter: Epoch_filter
  ) {
    epoches(
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $filter
    ) {
      id
      startBlock
      endBlock
      queryFeeRebates
      totalRewards
    }
  }
`
