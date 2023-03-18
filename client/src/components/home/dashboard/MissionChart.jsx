import { ResponsiveTimeRange } from '@nivo/calendar'

const today = new Date();
const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());

const MissionChart = ({ dayMissionList }) => (
    <ResponsiveTimeRange
        data={dayMissionList}
        from={threeMonthsAgo}
        to={today}
        emptyColor="#eeeeee"
        colors={[ '#eeeeee', '#D5E7B8', '#A7D489', '#e8c1a0', '#F47560' ]}
        margin={{ top: 40, right: 40, bottom: 100, left: 40 }}
        dayBorderWidth={2}
        minValue={0}
        maxValue={4}
        dayBorderColor="#ffffff"
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                justify: false,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left',
                translateX: -60,
                translateY: -60,
                symbolSize: 20
            }
        ]}
    />
)
export default MissionChart;