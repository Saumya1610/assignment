import React from "react";

const Table = ({ data, className }) => {
    if (data.length === 0) return [];
    const keys = Object.keys(data[0]).filter(key => key !== 'id' && key !== 'created');

    return (
        <table className={className}>
            <thead>
                <tr>
                    {keys.map((key) => (
                        <th key={key}>{key}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {keys.map((key) => (
                            <td key={key}>{row[key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default Table;