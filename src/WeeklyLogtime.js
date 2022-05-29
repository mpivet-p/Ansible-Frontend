import React, { useState } from 'react';
import LogtimeDisplay from './LogtimeDisplay';
import './WeeklyLogtime.css';

function WeeklyLogtime() {
    const years = [2020, 2021, 2022];
    const logTimeData = {
        2020: [101, 0, 0, 0, 5, 5, 5, 12, 45, 42, 42, 42, 42 , 42, 42, 0, 0, 0, 0, 0, 0, 0, 12, 45, 42, 35, 0, 0 ,0 , 0, 0, 0, 0, 0, 0, 0, 0, 12, 45, 42, 35, 0, 0 ,0 ,0, 46, 47, 48, 49, 50, 51, 52, 53],
        2021: [0, 0, 0, 0, 0, 0, 0, 12, 45, 42, 35, 0, 0 ,0 , 0, 0, 0, 0, 0, 0, 0, 0, 12, 45, 42, 35, 0, 0 ,0 , 0, 0, 0, 0, 0, 0, 0, 0, 12, 45, 42, 35, 0, 0 ,0 ,0, 46, 47, 48, 49, 50, 51, 52, 53],
        2022: [0, 0, 0, 0, 0, 0, 0, 12, 45, 42, 35, 0, 0 ,0 , 0, 0, 0]
    };
    const [activeYear, setActiveYear] = useState(years.at(-1))

    const btn_click  = (year) => {
        if (activeYear !== year) {
            setActiveYear(year);
        }
    }

    return (
        <div className="weekly-logtime">
            <div className="container">
            <h2>Weekly Logtime</h2>
            <table>
                <tbody>
                    <tr className="year-menu">
                        {years.map(year => {return (
                            <td key={year + " -btn"}>
                                <button className={activeYear === year ? "active" : null} onClick={ () => btn_click(year)}>{year}</button>
                            </td>
                        )})}
                    </tr>
                </tbody>
            </table>
            <LogtimeDisplay activeYear={activeYear} logTimeData={logTimeData}/>
            </div>
        </div>
    )
}

export default WeeklyLogtime;