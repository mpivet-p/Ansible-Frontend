import React from 'react';

function LogtimeDisplay({activeYear, logTimeData}) {
    const badAttendance = 20;
    const normalAttendance = 40;

    const attendanceScore = (h) => {
        if (h < badAttendance) {
            return ("bad-attendance");
        }
        else if (h < normalAttendance) {
            return ("normal-attendance");
        }
        return ("good-attendance");
    }

    const drawRow = (j) => {
        const cells = [];
        for (let i = 0; i < 8; i++)
        {
            if ((7 * j + i) in logTimeData[activeYear]) {
                cells.push(
                    <td className={attendanceScore(logTimeData[activeYear][7 * j + i])} key={"cell-" + i + j}>
                        {/* { logTimeData[activeYear][7 * j + i] } */}
                    </td>)
            }
        }
        return (cells);
    }

    const drawTable = () => {
        const rows = [];
        for (let j = 0; j < 8; j++) {
            rows.push(<tr className="row" key={"row-" + j}>{drawRow(j)}</tr>);
        }
        return (rows);
    }

    return (
        <div className="logtime-data">
            <table>
                <tbody>
                    {drawTable()}
                </tbody>
            </table>
        </div>
    )
}

export default LogtimeDisplay;