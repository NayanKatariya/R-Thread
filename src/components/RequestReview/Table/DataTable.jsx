import React from 'react'

const DataTableUI = ({ data, toggleAutomation, updateDelay }) => {
    return (
      <div className="overflow-x-auto border rounded-lg shadow-sm bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#f3fef4] text-sm font-semibold text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Automated</th>
              <th className="px-4 py-3 text-left">Product Name</th>
              <th className="px-4 py-3 text-left">ASIN</th>
              <th className="px-4 py-3 text-left">When to Send</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {/* Automated Switch */}
                <td className="px-4 py-3">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.enabled}
                      onChange={() => toggleAutomation(item.id)}
                      className="sr-only"
                    />
                    <div className={`relative w-11 h-6 bg-${item.enabled ? 'green-500' : 'gray-300'} rounded-full transition`}>
                      <div
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition ${
                          item.enabled ? 'translate-x-5' : ''
                        }`}
                      ></div>
                    </div>
                  </label>
                </td>
  
                {/* Product Name */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <img src={item.img} alt="Product" className="w-10 h-10 object-cover rounded" />
                    <span className="text-gray-800">{item.name}</span>
                  </div>
                </td>
  
                {/* ASIN */}
                <td className="px-4 py-3">{item.asin}</td>
  
                {/* When to Send */}
                <td className="px-4 py-3">
                  <select
                    value={item.delay}
                    onChange={(e) => updateDelay(item.id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option>None</option>
                    <option>After 1 day</option>
                    <option>After 3 days</option>
                    <option>After 5 days</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
export default DataTableUI