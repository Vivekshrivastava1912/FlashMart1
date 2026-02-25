import React, { useMemo } from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const DisplayTable = ({ data, column }) => {
  // useMemo ka use karne se React ko pata chalta hai ki jab data ya column 
  // change ho, tabhi table ko re-calculate karna hai.
  const tableData = useMemo(() => data, [data])
  const tableColumns = useMemo(() => column, [column])

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  const renderCellContent = (cell, columnDef) => {
    const value = cell.getValue();
    
    if (React.isValidElement(value)) {
        return value;
    }

    if (typeof value === 'string' && (value.startsWith('http') || columnDef.header?.toLowerCase().includes('image'))) {
      return (
        <div className="flex justify-start">
          <img 
            src={value} 
            alt="Preview" 
            className="w-12 h-12 object-contain pt-0.5 rounded-lg border border-slate-200 shadow-sm bg-white"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/48?text=No+Img' }}
          />
        </div>
      );
    }

    return flexRender(columnDef.cell, cell.getContext());
  };

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden mt-5 shadow-sm border border-slate-100">
      <div className="overflow-x-auto overflow-y-auto lg:max-h-[55vh] max-h-[70vh] scrollbar-hide" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        <style dangerouslySetInnerHTML={{__html: `
          .scrollbar-hide::-webkit-scrollbar { display: none; }
        `}} />
        
        <table className="w-full text-left border-separate border-spacing-0">
          <thead className="sticky top-0 z-10 bg-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th 
                    key={header.id} 
                    className=" px-6 py-4 text-[16px] font-bold text-purple-100 bg-purple-500 uppercase tracking-wider border-b border-purple-200"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="bg-white">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr 
                  key={row.id} 
                  className="hover:bg-purple-50 transition-all duration-150 ease-in-out group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td 
                      key={cell.id} 
                      className="px-6 py-4 text-sm text-slate-600 border-b border-slate-00 group-last:border-none"
                    >
                      {renderCellContent(cell, cell.column.columnDef)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
                <tr>
                    <td colSpan={column.length} className="text-center py-10 text-slate-400">
                        No data found
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DisplayTable