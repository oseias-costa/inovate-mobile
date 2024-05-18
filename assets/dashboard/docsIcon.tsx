import * as React from "react"
import Svg, { Mask, Path, G, Defs, Pattern, Use, Image } from "react-native-svg"
const DocsIcon = ({color}:{color: string}) => (
  <Svg
    width={32}
    height={32}
    fill="#fff"
  >
    <Mask
      id="b"
      width={32}
      height={32}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
    >
      <Path fill="url(#a)" d="M0 0h32v32H0z" />
    </Mask>
    <G mask="url(#b)">
      <Path fill='#fff' d="M-5.5-3h34v39h-34V-3Z" />
    </G>
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#c" transform="scale(.01042)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABzElEQVR4nO3dMU5bURSE4WmctRC8QFrKSAlJkFcTsow4Cwmmc6Q/svQKRAExYM+5d84n/QvwGT9D96TWWmuttdZae7u1pG+StpIeJGHuOmXUD5I2kv4WODppIxyO/7PAoUkdYVPgwKSOsC76s0PKCN8LHJUj+6SJ/C74DSfpSdgVODqPOrhKehIoOEDUCFUHiBmh8gARI1QfYPoRRhhg6hFGGWDaEUYaYMoRRhtguhFGHGCqEUYdYJoRRh5gihFGH2D4EWYYYOgRZhlg2BFmGmDIEWYbYLgRZhzgmBHs3AfnhAf5nxHs3AfnxAd5aQQ798E5w0GeG8GO8OwIz47w7AjPjvDsCM+O8OwIz47w7AjPjvDsCM+O8OwIz47w7AjPjvDsCM+O8OwIz47w7AjPjvDsCM+O8OwIz47w7AjPjvDsCM+O8OwIz47w7AjPjvDsCM+O8OwIz47w7AjPjvDsCM+O8OwIz+6+wBEw9UcFbAscAlO/VMDXAofA1GcVcDnYa6x4p/aSLlTEbYGDcOYOT34ZK0l3BY7CmfqxfOZSVstL3fYFDsSJ2i/f/HLHf/o34Wb5D6HaO8Z4Rbvls3yR9NF93NZaa6211pqG9w/CrbLJTe4JFAAAAABJRU5ErkJggg=="
        id="c"
        width={96}
        height={96}
      />
    </Defs>
  </Svg>
)
export default DocsIcon
