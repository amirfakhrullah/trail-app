import React, { useEffect, useState } from 'react';
import './donutChart.css';

import { ChartDonut } from '@patternfly/react-charts';

export default function DonutChart(props) {

    const [assignedCurrent, setAssignedCurrent] = useState(0);
    const [ongoingCurrent, setOngoingCurrent] = useState(0);
    const [stuckCurrent, setStuckCurrent] = useState(0);
    const [doneCurrent, setDoneCurrent] = useState(0);

    // count tickets based on status
    const countStatusAmount = status => {
        if (props.assignedTickets.result) {
            return props.assignedTickets.result.filter(ticks => ticks.status === status).length;
        } else {
            return 0;
        }
    }

    // count status percentage
    const countPercentStatus = status => {
        return Math.round(countStatusAmount(status) / props.assignedTickets.result.length * 100)
    }

    useEffect(() => {
        if (!props.assignedTickets.result) {
            window.location.reload();
        };

        // count max pixels
        const countMaxBarPixels = () => {
            const assignedTicks = countStatusAmount('Assigned');
            const ongoingTicks = countStatusAmount('Ongoing');
            const stuckTicks = countStatusAmount('Stuck');
            const doneTicks = countStatusAmount('Done');

            return (props.assignedTickets.result.length !== 0 ? props.assignedTickets.result.length / Math.max(assignedTicks, ongoingTicks, stuckTicks, doneTicks) * 200 : 0)
        }

        // status pixel
        const countStatusPixels = status => {
            if (props.assignedTickets.result) {
                return (props.assignedTickets.result.filter(ticks => ticks.status === status).length !== 0) ? ((props.assignedTickets.result.filter(ticks => ticks.status === status).length) / (props.assignedTickets.result.length) * countMaxBarPixels()) : 5;
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
            if ((x * countStatusAmount("Assigned") !== 0 ? x * countStatusAmount("Assigned") : 5) <= assigned) {
                setAssignedCurrent(x * countStatusAmount("Assigned") !== 0 ? x * countStatusAmount("Assigned") : 5)
            };

            if ((x * countStatusAmount("Ongoing") !== 0 ? x * countStatusAmount("Ongoing") : 5) <= ongoing) {
                setOngoingCurrent(x * countStatusAmount("Ongoing") !== 0 ? x * countStatusAmount("Ongoing") : 5);
            };

            if ((x * countStatusAmount("Stuck") !== 0 ? x * countStatusAmount("Stuck") : 5) <= stuck) {
                setStuckCurrent(x * countStatusAmount("Stuck") !== 0 ? x * countStatusAmount("Stuck") : 5);
            }

            if ((x * countStatusAmount("Done") !== 0 ? x * countStatusAmount("Done") : 5) <= done) {
                setDoneCurrent(x * countStatusAmount("Done") !== 0 ? x * countStatusAmount("Done") : 5)
            }

            if (props.assignedTickets.result.length > 10) {
                x += 1;
            } else {
                x += 2;
            }
        }, 20)
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
            {
                props.assignedTickets.result && (
                    <>
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

                                <div title={`${countPercentStatus("Assigned")}% Assigned`} style={{
                                    width: '5vw',
                                    margin: '5px',
                                    height: `${assignedCurrent}px`,
                                    backgroundColor: '#77cad9'
                                }}></div>

                                <div title={`${countPercentStatus("Ongoing")}% Ongoing`} style={{
                                    width: '5vw',
                                    margin: '5px',
                                    height: `${ongoingCurrent}px`,
                                    backgroundColor: '#2c5f88'
                                }}></div>

                                <div title={`${countPercentStatus("Stuck")}% Stuck`} style={{
                                    width: '5vw',
                                    margin: '5px',
                                    height: `${stuckCurrent}px`,
                                    backgroundColor: '#f87969'
                                }}></div>

                                <div title={`${countPercentStatus("Done")}% Done`} style={{
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
                    </>
                )
            }
        </div >
    )
}
