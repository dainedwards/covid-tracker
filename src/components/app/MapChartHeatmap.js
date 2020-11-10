import React, {Component, memo, useEffect, useState} from "react";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";
import {scaleQuantize} from "d3-scale";





const rounded = num => {
    if (num > 1000000000) {
        return Math.round(num / 100000000) / 10 + "Bn";
    } else if (num > 1000000) {
        return Math.round(num / 100000) / 10 + "M";
    } else {
        return Math.round(num / 100) / 10 + "K";
    }
};

let dateFormat = require('dateformat');

const colorScale = scaleQuantize()
    .domain([0, 10])
    .range([
        "#ffedea",
        "#ffcec5",
        "#ffad9f",
        "#ff8a75",
        "#ff5533",
        "#e2492d",
        "#be3d26",
        "#9a311f",
        "#782618"
    ]);

class MapChartHeatmap extends Component {



    constructor(props) {
        super(props);



        this.state = {
            // activeZipCodes: [],
            // zipCodeMap: new Map(),
            finalZipCountByDate: new Map(),
            dateRangeArray: new Map()
        }

        // this.props.updateZipCodesAllowed([])

        // const [activeZip, setCount] = useState("");
        // let [zipCodeMap, setData] = useState(new Map());
        // let [finalZipCountByDate, setZipCountData] = useState(new Map());
        // let [dateRangeArray, setDateRange] = useState([]);


        // setData(props.zipCodeMap)
    }







    handleClick(zipCode){

    };





    componentDidMount() {

        // console.log(this.state)

    }

    render() {
        console.log(this.props.zipCodeMap)
        let count = 0
        return (
            <>
                <ComposableMap data-tip="" projection="geoAlbersUsa" projectionConfig={{scale: 80000}}
                               width={980}
                               height={551}
                               style={{
                                   width: "100%",
                                   height: "auto",
                               }}>
                    <ZoomableGroup center={[-117.192289, 32.769148]} zoom={1} minZoom={1} maxZoom={1} disablePanning>

                        <Geographies geography="./zipcodes.geojson">
                            {


                                ({geographies}) =>


                                    geographies.map((geo) => {

                                        let geoZip = geo.properties.zip
                                        // if(this.props.associatedPopulationsObj[geoZip]) {


                                            let cur = null

                                            if (this.props.zipCodeMap.has(geoZip)) {
                                                let caseCount = this.props.zipCodeMap.get(geoZip)
                                                let numDays = this.props.dateRangeArray.length
                                                count += caseCount

                                                // TODO:  Add this functionality
                                                // let cityName = geo.properties.name

                                                let caseCountPerCapita100k = ((caseCount / this.props.associatedPopulationsObj[geoZip]) * 100000) / numDays

                                                cur = {
                                                    id: geoZip,
                                                    caseCount: Math.round(caseCountPerCapita100k),
                                                    cases: caseCount
                                                }

                                             }


                                            if (cur) {
                                                console.log(count)
                                                return (
                                                    <>
                                                        <Geography
                                                            key={geo.rsmKey}
                                                            geography={geo}
                                                            fill={colorScale(cur ? cur.caseCount : "#EEE")}

                                                            onClick={() => {
                                                                // this.handleClick(cur.id)
                                                                this.props.setTooltipContent("" + cur.cases + " cases per 100k")
                                                            }}

                                                            // onMouseEnter={() => {
                                                            //     this.props.setTooltipContent("" + cur.cases + " cases per 100k")
                                                            // }}
                                                            // onMouseLeave={() => {
                                                            //     this.props.setTooltipContent("");
                                                            // }}


                                                        />
                                                    </>
                                                );
                                            }
                                        // }
                                    })
                            }

                            {/*let cellStyle = geo.rsmKey == activeZip ? { fill: "#ff0000", stroke: "#ff0000", strokeWidth: 0.5, outline: 'none' } : { fill: "#666", stroke: "#FFF", strokeWidth: 0.5, outline: 'none' };*/}

                            {/*let cellStyleHover = { fill: "lightgray", stroke: "lightgray", strokeWidth: 0.5, outline: 'none' }*/}

                            {/*        return(*/}
                            {/*            <>*/}
                            {/*                <Geography*/}
                            {/*                    onClick={this.handleClick(geo)}*/}

                            {/*                    key={geo.rsmKey}*/}
                            {/*                    geography={geo}*/}
                            {/*                    onMouseEnter={() => {*/}
                            {/*                        const {NAME, POP_EST} = geo.properties;*/}
                            {/*                        setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);*/}
                            {/*                    }}*/}
                            {/*                    onMouseLeave={() => {*/}
                            {/*                        setTooltipContent("");*/}
                            {/*                    }}*/}


                            {/*                    style={{*/}
                            {/*                        default: cellStyle,*/}
                            {/*                        hover: cellStyleHover,*/}
                            {/*                        pressed: cellStyle*/}
                            {/*                    }}*/}
                            {/*                />*/}

                            {/*            </>*/}

                            {/*        )*/}
                            {/*    })*/}
                            {/*}*/}

                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
            </>
        );

    }
};

export default MapChartHeatmap
