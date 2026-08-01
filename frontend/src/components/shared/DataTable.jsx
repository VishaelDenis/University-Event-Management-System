import React from "react";

function DataTable({ columns, data, emptyMessage = "No data available." }) {
    if (!data || data.length === 0) {
        return <div className="table-empty">{emptyMessage}</div>;
    }

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        {columns.map((c) => (
                            <th key={c}>{c}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={i}>
                            {columns.map((c) => (
                                <td key={c}>{row[c]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;
