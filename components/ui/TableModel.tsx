


interface Column {
    title: string;
    dataIndex: string;
    render?: (value: any, row: any) => React.ReactNode | string;
}

interface TableProps {
    columns: Column[];
    data: any[];
}


const TableModel: React.FC<TableProps> = ({ columns, data }) => {




    return (
        <div className="overflow-x-auto bg-white shadow-md w-full">
            <table className="table-auto w-full text-sm text-left text-gray-700 ">
                <thead className="bg-gray-300 text-sm text-gray-600 uppercase rounded-tl-lg rounded-tr-lg">
                    <tr>
                        {columns.map((column, index) => (
                            <th key={`${column.title}-${index}`} className="py-3 px-4 font-semibold text-left first:rounded-tl-lg last:rounded-tr-lg border-0">
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((linha, index) => (
                        <tr
                            key={`${linha.id}-${index}`}
                            className="hover:bg-blue-100 hover:cursor-pointer odd:bg-gray-100 transition duration-200 last:rounded-lg"
                        >
                            {columns.map((column, index) => (
                                <td key={`${column.dataIndex}-${index}`} className="py-3 px-4">
                                    {column.render ? column.render(linha[column.dataIndex], linha) : linha[column.dataIndex] || 'N/A'}
                                </td>
                            ))}

                        </tr>

                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableModel;
