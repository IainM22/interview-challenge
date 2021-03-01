import { useState } from 'react'
import { Grid, Box, Image } from 'theme-ui'

const Table = ({ data, columns, sortColumn, sortDirection, onHeaderClick }) => {
  const TableHeader = ({ column }) => {
    const [isHovered, setIsHovered] = useState(false)

    /**
     * Render sort direction arrow if applicable
     */
    const SortArrow = ({ hovered, selected }) => {
      if (!hovered && !selected) {
        return null
      }

      let imgLocation = ''

      // always show ascending arrow on hover
      if (hovered || sortDirection === 'asc') {
        imgLocation = '/images/Direction-Down.svg'
      } else {
        imgLocation = '/images/Direction-Up.svg'
      }

      return (
        <Image width="10px" height="10px" src={imgLocation} sx={{ marginLeft: '5px' }} />
      )
    }

    return (
      <Box
        onClick={() => {
          onHeaderClick(column.dataIndex)
        }}
        sx={{
          borderBottom: '2px solid #d8d8d8',
          padding: '20px 10px',
          opacity: sortColumn === column.dataIndex ? '1' : '0.6',
          fontSize: '12px',
          ':hover': {
            opacity: '1',
          },
        }}
        onMouseEnter={() => {
          setIsHovered(true)
        }}
        onMouseLeave={() => {
          setIsHovered(false)
        }}
      >
        {column.title}
        <SortArrow hovered={isHovered} selected={column.dataIndex === sortColumn} />
      </Box>
    )
  }

  const TableRow = ({ row }) => {
    return (
      <>
        {columns.map((column) => {
          return (
            <Box
              key={`${row.id}_${column.dataIndex}`}
              sx={{
                padding: '20px 10px',
                fontSize: '18px',
                opacity: sortColumn === column.dataIndex ? '1' : '0.6',
              }}
            >
              {column.render
                ? column.render(row[column.dataIndex])
                : row[column.dataIndex]}
            </Box>
          )
        })}
      </>
    )
  }

  return (
    <Grid gap={0} columns={columns.length} sx={{ cursor: 'pointer' }}>
      {columns.map((column) => {
        return <TableHeader key={column.dataIndex} column={column} />
      })}
      {data.map((row) => {
        return <TableRow key={row.id} row={row} />
      })}
    </Grid>
  )
}

export default Table
