import InfiniteScroll from 'react-infinite-scroll-component'
import { useEffect, useState } from 'react'
import { Table } from '../common'
import styled from 'styled-components'
import _ from 'lodash'

const BLOCK_SIZE = 20
let fetchLimit

const RegistryTable = ({
  model,
  load,
  loadCount,
  filters,
  sizes,
  isRead,
  formatData = (el) => el,
  onCellClick,
}) => {
  const [data, setData] = useState([])
  const [limit, setLimit] = useState(0)

  useEffect(() => {
    fetchLimit = _.debounce(() => {
      loadCount()
        .then((res) => {
          setLimit(res)
          setData([])
          fetchData()
        })
        .catch((error) => console.log(error.message))
    }, 200)
  }, [loadCount])

  useEffect(() => {
    if (loadCount && fetchLimit) fetchLimit()
    return () => {
      setLimit(0)
    }
  }, [loadCount, filters])

  const fetchData = () => {
    const page = Math.floor(data.length / BLOCK_SIZE) + 1
    load(page, BLOCK_SIZE)
      .then((res) => {
        setData([...data, ...res.map(formatData)])
      })
      .catch((error) => console.log(error.message))
  }
  return (
    <Table
      model={model}
      data={data}
      sizes={sizes}
      isRead={isRead}
      onCellClick={onCellClick}
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
