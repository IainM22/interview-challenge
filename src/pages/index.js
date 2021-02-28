import { Box, Spinner, Flex } from 'theme-ui'
import { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { withApollo } from '../apollo/client'
import { EPOCHES_QUERY } from '../apollo/queries'
import Table from '../components/Table'

const Index = () => {
  const QUERY_CHUNK_SIZE = 3
  const [sortColumn, setSortColumn] = useState('startBlock')
  const [sortDirection, setSortDirection] = useState('asc')
  const [skip, setSkip] = useState(0)

  /**
   * Fetch data from subgraph
   */
  const { loading, error, data } = useQuery(EPOCHES_QUERY, {
    variables: {
      first: QUERY_CHUNK_SIZE,
      skip,
      orderBy: sortColumn,
      orderDirection: sortDirection,
    },
  })

  /**
   * Click handler for table headers. Updates sorting
   */
  const handleHeaderClick = (column) => {
    if (column !== sortColumn) {
      // default to asc when switching columns
      setSortDirection('asc')
      setSortColumn(column)
    } else {
      setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'))
    }
  }

  /**
   * Render function for table cells with numbers
   */
  const renderNumber = (num) => {
    return `#${num}`
  }

  /**
   * Render function for table cells with token values
   */
  const renderTokenValue = (bigNum) => {
    const parsedNum = Math.round(Number(bigNum) / 10 ** 18)
    return `${parsedNum.toLocaleString()} GRT`
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'START BLOCK',
      dataIndex: 'startBlock',
      render: renderNumber,
    },
    {
      title: 'END BLOCK',
      dataIndex: 'endBlock',
      render: renderNumber,
    },
    {
      title: 'QUERY FEES',
      dataIndex: 'queryFeeRebates',
      render: renderTokenValue,
    },
    {
      title: 'TOTAL REWARDS',
      dataIndex: 'totalRewards',
      render: renderTokenValue,
    },
  ]

  /**
   * Render table content based on state
   */
  const TableContent = () => {
    if (loading) {
      return (
        <Flex sx={{ justifyContent: 'center' }}>
          <Spinner />
        </Flex>
      )
    }

    if (error) {
      console.error(error)
      return 'Something went wrong :('
    }

    return (
      <Table
        data={data.epoches}
        columns={columns}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onHeaderClick={handleHeaderClick}
      />
    )
  }

  return (
    <Box sx={{ padding: '30px 100px' }}>
      <TableContent />
    </Box>
  )
}

export default withApollo(Index, { ssr: false })
