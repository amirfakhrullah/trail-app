import React from 'react';
import './donutChart.css';

import { ChartDonut } from '@patternfly/react-charts';

export default function DonutChart(props) {

    const countPriority = type => {
        if (props.assignedTickets.result) {
            return props.assignedTickets.result.filter(ticks => ticks.priority === type).length;
        } else {
            return 0;
        }
    }

    const dataText = (color, priority, number) => {
        return (
            <div>
                <div className="priority-circle" style={{ backgroundColor: color }}></div>
                <h3>{number} {priority} Tickets </h3>
            </div>
        )
    }


    const chartData = [
        {
            x: 'High',
            y: countPriority('High')
        },
        {
            x: 'Medium',
            y: countPriority('Medium')
        },
        {
            x: 'Low',
            y: countPriority('Low')
        },
        {
            x: 'Priority Not Assigned',
            y: countPriority('No-Priority')
        }
        // {
        //     x: 'Done',
        //     y: countPriority('Done')
        // }
    ]

    return (
        <div className="donutChart">
            {/* Donut chart */}
            <div style={{ height: '375px', width: '400px' }}>
                <ChartDonut
                    constrainToVisibleArea={true}
                    data={chartData}
                    donutOrientation="top"
                    height={275}
                    labels={({ datum }) => `${datum.x}: ${datum.y}%`}
                    padding={{
                        bottom: 65, // Adjusted to accommodate legend
                        left: 20,
                        right: 20,
                        top: 20
                    }}
                    width={300}
                    colorScale={['rgba(214, 69, 65, 1)', '#FDDA0D', '#0E26B1', 'green']}
                />
            </div>
            <div className="dataText">
                {dataText('rgba(214, 69, 65, 1)', chartData[0].x, chartData[0].y)}
                {dataText('#FDDA0D', chartData[1].x, chartData[1].y)}
                {dataText('#0E26B1', chartData[2].x, chartData[2].y)}
                {dataText('green', chartData[3].x, chartData[3].y)}
            </div>
        </div >
    )
}
