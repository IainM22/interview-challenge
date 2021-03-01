import { Box, Spinner, Flex } from 'theme-ui'
import { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { withApollo } from '../apollo/client'
import { EPOCHES_QUERY } from '../apollo/queries'
import Table from '../components/Table'
import Search from '../components/Search'

const Index = () => {
  const QUERY_CHUNK_SIZE = 3
  const [sortColumn, setSortColumn] = useState('startBlock')
  const [sortDirection, setSortDirection] = useState('asc')
  const [searchVal, setSearchVal] = useState('')
  const [numRows, setNumRows] = useState(QUERY_CHUNK_SIZE)

  /**
   * Fetch data from subgraph
   */
  const { loading, error, data } = useQuery(EPOCHES_QUERY, {
    variables: {
      first: numRows,
      orderBy: sortColumn,
      orderDirection: sortDirection,
      filter: searchVal.length > 0 ? { startBlock: Number(searchVal) } : {},
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
   * Fetch more rows
   */
  const loadMore = () => {
    setNumRows((prev) => prev + QUERY_CHUNK_SIZE)
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

  const LoadMoreButton = () => {
    // don't show while no data is displayed
    if (loading || error) {
      return null
    }

    // don't show if no data is left to query
    if (data.epoches.length < numRows) {
      return null
    }

    return (
      <Box
        onClick={loadMore}
        sx={{
          textAlign: 'center',
          padding: '15px',
          background: 'transparent',
          border: '1px solid rgba(147,106,255,0.5)',
          borderRadius: '5px',
          width: '150px',
          cursor: 'pointer',
          fontWeight: 600,
          ':hover': {
            boxShadow:
              'rgba(111,76,255,0.32) 0px 0px 8px 0px, rgba(111,76,255,0.32) 0px 0px 6px 0px, rgba(111,76,255,0.32) 0px 0px 6px 0px inset',
            borderColor: '#6F4CFF',
          },
        }}
      >
        Load More
      </Box>
    )
  }

  return (
    <Box sx={{ padding: '30px 100px' }}>
      <Search searchVal={searchVal} setSearchVal={setSearchVal} />
      <Box sx={{ marginTop: '50px' }}>
        <TableContent />
      </Box>
      <Flex sx={{ marginTop: '25px', justifyContent: 'center' }}>
        <LoadMoreButton />
      </Flex>
    </Box>
  )
}

export default withApollo(Index, { ssr: false })
