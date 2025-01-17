// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from '@nivo/bar'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import PoseApi from '../../../apis/PoseApi';

let data = [
    {
      "date": "10-09",
      "바른 자세": 39,
      "거북목": 61,
    },
    {
      "date": "10-10",
      "바른 자세": 41,
      "거북목": 59,
    },
    {
      "date": "10-11",
      "바른 자세": 48,
      "거북목": 52,
    },
    {
      "date": "10-12",
      "바른 자세": 55,
      "거북목": 45,
    },
    {
      "date": "10-13",
      "바른 자세": 68,
      "거북목": 32,
    },
    {
      "date": "10-14",
      "바른 자세": 74,
      "거북목": 26,
    },
    {
      "date": "10-15",
      "바른 자세": 81,
      "거북목": 19,
    }
]

const PoseTimeStackChart = ({}) => {
    const auth = useSelector(state=>state.userData.auth);
    const poseApi = new PoseApi();
    const straightTime = useSelector(state=>state.pose.straightTime);
    const turtleTime = useSelector(state=>state.pose.turtleTime);
    const [poseWeekData, setPoseWeekData] = useState([]);

    useEffect(()=>{
        const td = new Date();
        const today = `${td.getFullYear()}-${String(td.getMonth()+1).padStart(2, '0')}-${String(td.getDate()).padStart(2, '0')}`;
        const newPoseWeekData = poseWeekData.filter(el=>el.date !== today);
        const todayPoseInfo = {
            date: today,
            "바른 자세": parseInt(straightTime / (straightTime + turtleTime) * 100),
            "거북목": parseInt(turtleTime / (straightTime + turtleTime) * 100),
        }
        setPoseWeekData([...newPoseWeekData, todayPoseInfo]);
    }, [straightTime, turtleTime])

    useEffect(()=>{
        const getPoseWeekData = async () => {
            const res = await poseApi.getWeekPose();
            let tempPoseWeekData = [];
            for (let poseInfo of res) {
                const dateInfo = poseInfo.regDtm.split('T')[0];
                const straightRatio = parseInt(poseInfo.straightTime / (poseInfo.straightTime + poseInfo.turtleTime) * 100);
                const turtleRatio = parseInt(poseInfo.turtleTime / (poseInfo.straightTime + poseInfo.turtleTime) * 100);
                tempPoseWeekData.push({
                    date: dateInfo,
                    "바른 자세": straightRatio,
                    "거북목": turtleRatio
                })
            }
            setPoseWeekData(tempPoseWeekData);
        }
        auth && getPoseWeekData();
    }, [auth])

    return (
    <ResponsiveBar
        data={poseWeekData}
        keys={[
            '바른 자세',
            '거북목',
        ]}
        indexBy="date"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        minValue={0}
        maxValue={100}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={['#C4DEA4', '#ECEBC9']}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderRadius={2}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '날짜',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '%',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in date: "+e.indexValue}}
    />
)}
export default PoseTimeStackChart;