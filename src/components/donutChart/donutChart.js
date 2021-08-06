import React, { useEffect, useState } from 'react';
import './donutChart.css';

import { ChartDonut } from '@patternfly/react-charts';

export default function DonutChart(props) {

    const [assignedCurrent, setAssignedCurrent] = useState(0);
    const [ongoingCurrent, setOngoingCurrent] = useState(0);
    const [stuckCurrent, setStuckCurrent] = useState(0);
    const [doneCurrent, setDoneCurrent] = useState(0);

    useEffect(() => {
        // status pixel
        const countStatusPixels = status => {
            if (props.assignedTickets.result) {
                return (props.assignedTickets.result.filter(ticks => ticks.status === status).length !== 0) ? ((props.assignedTickets.result.filter(ticks => ticks.status === status).length) / (props.assignedTickets.result.length) * 300) : 5
            } else {
                return 0;
            }
        }

        const assigned = countStatusPixels('Assigned');
        const ongoing = countStatusPixels('Ongoing');
        const stuck = countStatusPixels('Stuck');
        const done = countStatusPixels('Done');

        // bar chart animation algo
        var x = 0;
        setInterval(function () {
            if (x <= assigned) {
                setAssignedCurrent(x)
            };

            if (x <= ongoing) {
                setOngoingCurrent(x);
            };

            if (x <= stuck) {
                setStuckCurrent(x);
            }

            if (x <= done) {
                setDoneCurrent(x)
            }
            x++;
        }, 10)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const countPriority = priority => {
        if (props.assignedTickets.result) {
            return props.assignedTickets.result.filter(ticks => ticks.priority === priority).length;
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

    const countStatusAmount = status => {
        if (props.assignedTickets.result) {
            return props.assignedTickets.result.filter(ticks => ticks.status === status).length;
        } else {
            return 0;
        }
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
    ]

    return (
        <div className="donutChart">
            {/* Donut chart */}
            <div style={{ width: '400px' }}>
                <ChartDonut
                    constrainToVisibleArea={true}
                    data={chartData}
                    donutOrientation="top"
                    height={240}
                    labels={({ datum }) => `${datum.x}: ${datum.y}%`}
                    padding={{
                        bottom: 20, // Adjusted to accommodate legend
                        left: 20,
                        right: 20,
                        top: 20
                    }}
                    width={300}
                    colorScale={['rgba(214, 69, 65, 1)', '#FDDA0D', '#0E26B1', 'green']}
                />
                <div className="dataText">
                    <h2 style={{ textDecoration: 'underline' }}>Task Priorities :</h2>
                    {dataText('rgba(214, 69, 65, 1)', chartData[0].x, chartData[0].y)}
                    {dataText('#FDDA0D', chartData[1].x, chartData[1].y)}
                    {dataText('#0E26B1', chartData[2].x, chartData[2].y)}
                    {dataText('green', chartData[3].x, chartData[3].y)}
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div style={{
                    display: 'flex',
                    height: '300px',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    marginBottom: '20px'
                }}>

                    <div style={{
                        width: '5vw',
                        margin: '5px',
                        height: `${assignedCurrent}px`,
                        backgroundColor: '#77cad9'
                    }}></div>

                    <div style={{
                        width: '5vw',
                        margin: '5px',
                        height: `${ongoingCurrent}px`,
                        backgroundColor: '#2c5f88'
                    }}></div>

                    <div style={{
                        width: '5vw',
                        margin: '5px',
                        height: `${stuckCurrent}px`,
                        backgroundColor: '#f87969'
                    }}></div>

                    <div style={{
                        width: '5vw',
                        margin: '5px',
                        height: `${doneCurrent}px`,
                        backgroundColor: '#ced645'
                    }}></div>
                </div>
                <div className="dataText" style={{
                    alignItems: 'flex-end'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <h2 style={{ textDecoration: 'underline' }}>Current Progress :</h2>
                    </div>
                    <div>
                        <div className="priority-circle" style={{ backgroundColor: '#77cad9' }}></div>
                        <h3>{countStatusAmount('Assigned')} Assigned</h3>
                    </div>

                    <div>
                        <div className="priority-circle" style={{ backgroundColor: '#2c5f88' }}></div>
                        <h3>{countStatusAmount('Ongoing')} Ongoing</h3>
                    </div>

                    <div>
                        <div className="priority-circle" style={{ backgroundColor: '#f87969' }}></div>
                        <h3>{countStatusAmount('Stuck')} Stuck</h3>
                    </div>

                    <div>
                        <div className="priority-circle" style={{ backgroundColor: '#ced645' }}></div>
                        <h3>{countStatusAmount('Done')} Done</h3>
                    </div>
                </div>
            </div>
        </div >
    )
}
