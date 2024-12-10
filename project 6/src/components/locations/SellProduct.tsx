import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, AlertCircle } from 'lucide-react';
import { getInventoryItems, recordTransaction } from '../../lib/db';
import type { InventoryItem } from '../../lib/types';

interface SellProductProps {
  location: string;
  employeeId: number;
  onSuccess: () => void;
}

export function SellProduct({ location, employeeId, onSuccess }: SellProductProps) {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<number | ''>('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const inventoryItems = await getInventoryItems(location);
      setItems(inventoryItems);
    } catch (err) {
      setError('Failed to load inventory');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    setLoading(true);
    setError('');

    try {
      await recordTransaction({
        type: 'sell',
        itemId: Number(selectedItem),
        quantity,
        employeeId,
        location,
        notes,
      });
      onSuccess();
      setSelectedItem('');
      setQuantity(1);
      setNotes('');
      await loadInventory();
    } catch (err: any) {
      setError(err.message || 'Failed to record sale');
    } finally {
      setLoading(false);
    }
  };

  const selectedItemData = items.find(item => item.id === selectedItem);

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <div className="flex items-center mb-6">
          <ShoppingCart className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold">Sell Product</h2>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="item" className="block text-sm font-medium text-gray-700">
              Select Product
            </label>
            <select
              id="item"
              value={selectedItem}
              onChange={(e) => setSelectedItem(Number(e.target.value))}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Choose a product...</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.quantity} available)
                </option>
              ))}
            </select>
          </div>

          {selectedItemData && (
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium text-gray-900">{selectedItemData.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{selectedItemData.description}</p>
              <p className="text-sm text-gray-600 mt-2">
                Available: <span className="font-medium">{selectedItemData.quantity}</span>
              </p>
            </div>
          )}

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              required
              min="1"
              max={selectedItemData?.quantity || 1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || !selectedItem}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                (loading || !selectedItem) ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Processing Sale...' : 'Complete Sale'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}