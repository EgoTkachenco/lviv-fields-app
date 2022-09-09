import Field1 from '../components/map/fields/Field1'
import Field2 from '../components/map/fields/Field2'
import Field3 from '../components/map/fields/Field3'
import Field4 from '../components/map/fields/Field4'
import Field5 from '../components/map/fields/Field5'
import Field6 from '../components/map/fields/Field6'
import Field7 from '../components/map/fields/Field7'
import Field8 from '../components/map/fields/Field8'
import Field9 from '../components/map/fields/Field9'
import Field10 from '../components/map/fields/Field10'
import Field11 from '../components/map/fields/Field11'
import Field12 from '../components/map/fields/Field12'
import Map, { AllMap } from '../components/map/Map'

import Viewer from '../components/map/Viewer'

export default function Test() {
  return (
    <div
      style={{
        width: '750px',
        height: '500px',
        margin: '64px',
        border: '1px solid black',
      }}
    >
      <Map />

      {/* <Viewer>
        <AllMap />
      </Viewer> */}
    </div>
  )
}

// const Viewer = ({ children }) => {
//   return (
//     <ScrollContainer
//       nativeMobileScroll={false}
//       onStartScroll={(event) => {
//         console.log('onStartScroll', event)
//       }}
//       onScroll={(event) => {
//         debugger
//         console.log('onScroll', event)
//       }}
//       onClick={(event) => {
//         console.log('onClick', event)
//       }}
//       onEndScroll={(event) => {
//         console.log('onEndScroll', event)
//       }}
//       style={{ width: '100%', height: '100%' }}
//     >
//       {children}
//     </ScrollContainer>
//   )
// }
