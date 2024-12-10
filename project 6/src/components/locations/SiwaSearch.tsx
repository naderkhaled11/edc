import React, { useState, useCallback, useEffect } from 'react';
import { Search, Upload, FileSpreadsheet, Table, Filter } from 'lucide-react';
import { read } from 'xlsx';
import { saveExcelData, getSheetNames, getSheetData } from '../../lib/db';

interface ExcelData {
  [key: string]: string | number;
}

export function SiwaSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSheet, setSelectedSheet] = useState('');
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [excelData, setExcelData] = useState<ExcelData[]>([]);
  const [filteredData, setFilteredData] = useState<ExcelData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [columns, setColumns] = useState<string[]>([]);

  const loadSheetNames = useCallback(async () => {
    try {
      const names = await getSheetNames('siwa');
      setSheetNames(names);
    } catch (error) {
      console.error('Error loading sheet names:', error);
    }
  }, []);

  useEffect(() => {
    loadSheetNames();
  }, [loadSheetNames]);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const buffer = await file.arrayBuffer();
      await saveExcelData(buffer, 'siwa');
      await loadSheetNames();
      setSelectedSheet('');
      setExcelData([]);
      setFilteredData([]);
      setColumns([]);
    } catch (error) {
      console.error('Error processing Excel file:', error);
      alert('Error processing Excel file. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [loadSheetNames]);

  const handleSheetSelect = useCallback(async (sheetName: string) => {
    setLoading(true);
    try {
      const data = await getSheetData(sheetName, 'siwa');
      setExcelData(data);
      setFilteredData(data);
      setSelectedSheet(sheetName);
      if (data.length > 0) {
        setColumns(Object.keys(data[0]));
      }
    } catch (error) {
      console.error('Error loading sheet data:', error);
      alert('Error loading sheet data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(() => {
    if (!searchTerm.trim()) {
      setFilteredData(excelData);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const filtered = excelData.filter(row => {
      if (selectedColumn) {
        const value = row[selectedColumn];
        return String(value).toLowerCase().includes(searchTermLower);
      }
      return Object.values(row).some(value => 
        String(value).toLowerCase().includes(searchTermLower)
      );
    });
    setFilteredData(filtered);
  }, [searchTerm, excelData, selectedColumn]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, selectedColumn]);

  return (
    <div className="space-y-6">
      {/* File Upload */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileSpreadsheet className="w-6 h-6 text-green-600" />
          <span className="text-gray-700 font-medium">Excel File Upload</span>
        </div>
        <label className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2">
          <Upload className="w-4 h-4" />
          <span>Upload Excel</span>
          <input
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
      </div>

      {/* Sheet Selection */}
      {sheetNames.length > 0 && (
        <div className="flex items-center space-x-4">
          <Table className="w-5 h-5 text-gray-600" />
          <select
            value={selectedSheet}
            onChange={(e) => handleSheetSelect(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a sheet...</option>
            {sheetNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Search Bar with Column Filter */}
      {selectedSheet && (
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search in Excel data..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-64">
              <select
                value={selectedColumn}
                onChange={(e) => setSelectedColumn(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Search all columns</option>
                {columns.map((column) => (
                  <option key={column} value={column}>
                    {column}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {filteredData.length} results found
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Filter className="w-4 h-4" />
              <span>Filtering by: {selectedColumn || 'All columns'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Results Table */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading data...</p>
        </div>
      ) : selectedSheet && filteredData.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {Object.keys(filteredData[0]).map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {Object.values(row).map((value, i) => (
                    <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {String(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : selectedSheet ? (
        <div className="text-center py-8 text-gray-500">
          No matching results found
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          {sheetNames.length > 0 ? 'Select a sheet to view data' : 'Upload an Excel file to get started'}
        </div>
      )}
    </div>
  );
}