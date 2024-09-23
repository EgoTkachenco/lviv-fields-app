import React, { Fragment, useMemo, useRef } from 'react'
import { useMapAreaHandlers, useMapFieldsHandlers } from './utils'
import Viewer from './Viewer'
import styled from 'styled-components'
import { Card } from '../../common'
import BackLink from '../BackLink'

import Field1 from './fields/Field1'
import Field2 from './fields/Field2'
import Field3 from './fields/Field3'
import Field4 from './fields/Field4'
import Field5 from './fields/Field5'
import Field6 from './fields/Field6'
import Field7 from './fields/Field7'
import Field8 from './fields/Field8'
import Field9 from './fields/Field9'
import Field10 from './fields/Field10'
import Field11 from './fields/Field11'
import Field12 from './fields/Field12'
import { FIELD_TYPES_COLORS } from '../../../store/help/constants'
import { useAPIVarieties } from '../../../hooks'

export default function Map({
  areaLabel,
  area,
  field,
  onOpenArea,
  onOpenField,
  onClose,
  summary,
  areas,
  filter,
  type = 'registry',
}) {
  const { varieties } = useAPIVarieties()
  const filterStyles = useMemo(() => {
    if (!summary?.fields) return ''
    const fields =
      areas?.reduce((acc, area) => [...acc, ...area.fields], []) || []

    if (fields.length === 0) return

    const isRegistryFilter = filter.cadastrs.length > 0

    let styles = summary.fields.map((id) => {
      const field = fields.find((field) => field.pathname === id)
      let color
      if (!isRegistryFilter && filter.type.includes(field.type))
        color = FIELD_TYPES_COLORS[field.type] || 'transparent'
      else if (!isRegistryFilter && filter.varieties.length > 0) {
        return ''
      } else color = '#407CFF'

      // let opacity
      // if (!isRegistryFilter && filter.category.length > 0)
      //   opacity = field.category === 'free' ? 0.5 : 1
      // else opacity = 1
      // return `${'path#' + id} {fill: ${color}; opacity: ${opacity};}`
      return `${'path#' + id} {fill: ${color};}`
    })

    // Plantations styles
    if (type === 'plantation' && filter.varieties.length > 0) {
      areas.forEach((area) => {
        if (!area.plantation_schema) return
        for (const areaSectionId in area.plantation_schema) {
          for (const rowId in area.plantation_schema[areaSectionId]) {
            const variety = area.plantation_schema[areaSectionId][rowId]
            if (filter.varieties.includes(variety)) {
              const varietyColor =
                varieties.find((el) => el.id === variety)?.color ||
                'transparent'

              styles.push(
                `g#plantation > g#plantation-${areaSectionId} :nth-child(${rowId}) {fill: ${varietyColor};}`
              )
            }
          }
        }
      })
    }

    styles = styles.join('\n')
    // console.log('filter styles', styles)
    return (
      <style id="map-style">
        {`
				g#plantation {
				 opacity: 0.75;
				}
				g#plantation > g  rect { 
					stroke: black;
					stroke-width: 0.3px;
				}	
			`}
        {styles}
      </style>
    )
  }, [summary, type, varieties])

  return (
    <MapCard isField={!!field}>
      <div className="expand-icon" />

      {filterStyles}
      {!area && (
        <AllMap
          onOpen={(v) => onOpenArea(v)}
          areas={areas || []}
          areaLabel={areaLabel}
          type={type}
        />
      )}

      {area && (
        <>
          <BackLink action={onClose} />{' '}
          <AreaMap
            area={area}
            areaLabel={areaLabel}
            field={field}
            onOpen={(v) => onOpenField(v)}
            onClose={onClose}
            summary={summary}
            type={type}
            // fields={summary?.fields || []}
          />
        </>
      )}
    </MapCard>
  )
}

const MapCard = styled(Card)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  /* max-height: ${({ isField }) => (isField ? 'unset' : 'unset')}; */
  padding: 20px 20px;
  border-radius: 18px;
  border: 1px solid #000;

  .expand-icon {
    position: absolute;
    top: 18px;
    right: 18px;
    width: 32px;
    height: 32px;
    background: url('/icons/expand.svg');
    background-size: cover;
  }

  svg {
    position: relative;
    margin: auto;
    display: block;

    & > g:not(#lakes) {
      position: relative;
      z-index: 100;
      transition: all 0.3s;
      clip-rule: evenodd;
      cursor: pointer;
    }
  }
`

export function AreaMap({
  area,
  onOpen,
  field,
  onClose,
  summary,
  areaLabel,
  type,
}) {
  const ref = useRef()
  useMapFieldsHandlers(
    ref,
    (e) => onOpen(e.currentTarget.id),
    field,
    field ? [] : summary?.fields || [],
    type
  )
  const renderField = () => {
    switch (area) {
      case '1':
        return <Field1 ref={ref} />
      case '2':
        return <Field2 ref={ref} />
      case '3':
        return <Field3 ref={ref} />
      case '4':
        return <Field4 ref={ref} />
      case '5':
        return <Field5 ref={ref} />
      case '6':
        return <Field6 ref={ref} />
      case '7':
        return <Field7 ref={ref} />
      case '8':
        return <Field8 ref={ref} />
      case '9':
        return <Field9 ref={ref} />
      case '10':
        return <Field10 ref={ref} />
      case '11':
        return <Field11 ref={ref} />
      case '12':
        return <Field12 ref={ref} />
      default:
        return ''
    }
  }

  return (
    <>
      {areaLabel && <AreaLabel>Поле № {areaLabel.name}</AreaLabel>}
      <Viewer small={false}>{renderField()}</Viewer>
    </>
  )
}

export function AllMap({ onOpen, areaLabel, type, areas }) {
  const ref = useRef()
  useMapAreaHandlers(ref, (e) => onOpen(e.currentTarget.id), type)

  return (
    <Viewer>
      {areaLabel && <AreaLabel>Поле № {areaLabel.name}</AreaLabel>}
      {/* <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: 'calc(100% - 40px)',
          height: 'calc(100% - 40px)',
          opacity: '50%',
        }}
      >
        <MapIcon ref={ref} />
      </div> */}
      <AllFieldsMap ref={ref} areas={areas} />
    </Viewer>
  )
}

const AllFieldsMap = React.forwardRef(({ areas }, ref) => {
  const areasConfigs = [
    {
      area: 10,
      cmp: Field1,
      x: 3850,
      y: 450,
      width: 1259,
      height: 995,
      labelXOffset: -200,
    },
    {
      area: 6,
      cmp: Field2,
      x: 2450,
      y: 300,
      width: 1384,
      height: 1031,
    },
    // { cmp: Field3, x: 2150, y: 300, width: 352, height: 1028 },
    {
      area: 5,
      cmp: Field4,
      x: 1400,
      y: 130,
      width: 1234,
      height: 1597,
      labelXOffset: -100,
    },
    {
      area: 9,
      cmp: Field5,
      x: 975,
      y: 100,
      width: 1027,
      height: 1774,
      labelXOffset: -200,
    },
    { area: 7, cmp: Field6, x: 0, y: 300, width: 1120, height: 1863 },
    {
      area: 8,
      cmp: Field7,
      x: 1050,
      y: 0,
      width: 638,
      height: 579,
    },
    // { area: 8, cmp: Field8, x: 0, y: 0, width: 124, height: 246 },
    {
      area: 2,
      cmp: Field9,
      x: 1550,
      y: 2300,
      width: 1632,
      height: 913,
      labelXOffset: -400,
      labelYOffset: -100,
    },
    {
      area: 4,
      cmp: Field10,
      x: 2600,
      y: 2800,
      width: 772,
      height: 405,
      labelXOffset: 100,
    },
    {
      area: 3,
      cmp: Field11,
      x: 2250,
      y: 2700,
      width: 625,
      height: 405,
      labelXOffset: -100,
      labelYOffset: 50,
    },
    {
      area: 1,
      cmp: Field12,
      x: 2350,
      y: 1530,
      width: 1093,
      height: 1434,
      labelXOffset: -100,
      labelYOffset: 100,
    },
  ]

  const labelWidth = 700
  const labelHeight = 150

  const getAreaLabel = (areaConfig) => {
    const area = areas.find((area) => area.name == areaConfig.area)
    if (!area) return null
    // const areaSize = area.fields
    //   .reduce((sum, field) => sum + (field.size || 0), 0)
    //   .toFixed(2)
    const areaSize = area.size

    const areaWidth = areaConfig.width || 0
    const areaHeight = areaConfig.height || 0

    const x =
      areaConfig.x +
      areaWidth / 2 -
      labelWidth / 2 +
      (areaConfig.labelXOffset || 0)
    const y =
      areaConfig.y +
      areaHeight / 2 -
      labelHeight / 2 +
      (areaConfig.labelYOffset || 0)

    return (
      <svg
        width={labelWidth}
        height={labelHeight}
        viewBox="0 0 100 40"
        x={x}
        y={y}
        fill="none"
        style={{ zIndex: 10, position: 'relative' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="100%"
          height="100%"
          x="0"
          y="0"
          rx="10"
          fill="white"
          stroke="#313536"
          strokeWidth="1"
        />
        <text
          x="50%"
          y="25%"
          dominantBaseline="central"
          textAnchor="middle"
          fill="black"
          fontSize="16"
        >
          Поле № {areaConfig.area}
        </text>
        <text
          x="50%"
          y="75%"
          dominantBaseline="central"
          textAnchor="middle"
          fill="black"
          fontSize="16"
        >
          {areaSize} Га
        </text>
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 5094 3224"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
    >
      {areasConfigs.map((area, i) => {
        const { cmp: Area, x, y, width, height } = area
        const props = {}
        if (width) props.width = width
        if (height) props.height = height

        return (
          <Fragment key={i}>
            <Area x={x} y={y} {...props} />
            {getAreaLabel(area)}
          </Fragment>
        )
      })}
    </svg>
  )
})

AllFieldsMap.displayName = 'AllFieldsMap'

const AreaLabel = styled.div`
  position: absolute;
  z-index: 99;
  top: 16px;
  left: 32px;
  font-weight: 500;
  font-size: 24px;
  line-height: 120%;
  color: #313536;
`
