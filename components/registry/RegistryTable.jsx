import InfiniteScroll from 'react-infinite-scroll-component'
import { useEffect, useState } from 'react'
import { Table } from '../common'
import styled from 'styled-components'
import _ from 'lodash'

const BLOCK_SIZE = 20
let fetchLimit

const RegistryTable = ({
  show,
  model,
  filters,
  sizes,
  isRead,
  onCellClick,
  data,
  limit,
  loadData,
  loadDataCount,
  onChange,
}) => {
  useEffect(() => {
    loadDataCount()
  }, [filters])

  const fetchData = () => {
    const page = Math.floor(data.length / BLOCK_SIZE) + 1
    loadData(page, BLOCK_SIZE)
  }
  if (!show) return
  return (
    <Table
      model={model}
      data={data}
      sizes={sizes}
      isRead={isRead}
      onCellClick={onCellClick}
      onChange={onChange}
      renderContent={(children) => (
        <InfiniteScroll
          height="500px"
          style={{ marginRight: '-10px' }}
          dataLength={data.length} //This is important field to render the next data
          next={fetchData}
          hasMore={data.length < limit}
          loader={<h4>Loading...</h4>}
          // endMessage={<EndMessage>Yay! You have seen it all</EndMessage>}
        >
          {children}
        </InfiniteScroll>
      )}
    />
  )
}

export default RegistryTable

const EndMessage = styled.b`
  margin: 16px 0;
`
