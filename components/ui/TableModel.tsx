interface Column {
    title: string; // Título da coluna
    dataIndex: string; // Chave do objeto de dados que será exibido na coluna
    render?: (value: any, row: any) => React.ReactNode | string; // Função opcional para customizar o conteúdo da célula
}

interface TableProps {
    columns: Column[]; // Colunas da tabela
    data: any[]; // Dados da tabela
}

const TableModel: React.FC<TableProps> = ({ columns, data }) => {

    console.log('data:')

    return (
        <div className="overflow-x-auto bg-white shadow-md">
            <table className="table-auto w-full text-sm text-left text-gray-700">
                <thead className="bg-blue-200 text-sm text-gray-600 uppercase border-gray-300">
                    <tr className="border-gray-300">
                        {columns.map((column) => (
                            <th key={column.title} className="py-3 px-4 font-semibold text-left border-b ">
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((linha) => (
                        <tr
                            key={linha.id}
                            className="hover:bg-green-300 hover:cursor-pointer odd:bg-blue-100 transition duration-200 border-b border-x border-gray-500 last:rounded-lg"
                        >
                            {columns.map((column) => (
                                <td key={column.dataIndex} className="py-3 px-4">
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
