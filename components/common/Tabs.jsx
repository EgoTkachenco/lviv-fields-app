import { useState } from 'react'
import styled from 'styled-components'
import { Box, H5 } from './index'

export default function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <TabsWrapper>
      <Box>
        {tabs.map((tab, i) => (
          <TabsHeaderItem
            key={i}
            onClick={() => setActiveTab(i)}
            active={i === activeTab}
          >
            <H5 weight="500" color="primary">
              {tab.title}
            </H5>
          </TabsHeaderItem>
        ))}
      </Box>

      <TabsContent>{tabs[activeTab].content}</TabsContent>
    </TabsWrapper>
  )
}

const TabsWrapper = styled.div``

const TabsHeaderItem = styled.div`
  width: calc(100% / 3);
  padding: 0 16px 16px;
  text-align: center;
  position: relative;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 100%;
    max-height: 0;
    border-top: ${(props) => (props.active ? '6px solid #38009D;' : 'none')};
  }
`

const TabsContent = styled(Box)`
  margin-top: 32px;
`
