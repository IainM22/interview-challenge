import { gql } from 'apollo-boost'

export const EPOCHES_QUERY = gql`
  query epoches($first: Int!, $skip: Int!, $orderBy: String!, $orderDirection: String!) {
    epoches(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      startBlock
      endBlock
      queryFeeRebates
      totalRewards
    }
  }
`
