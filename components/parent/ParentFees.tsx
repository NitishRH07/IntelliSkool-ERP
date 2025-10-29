import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface FeeRecord {
    id: string;
    month: string;
    amount: number;
    dueDate: string;
    status: 'paid' | 'pending' | 'overdue';
    paymentDate?: string;
    receiptId?: string;
}

const ParentFees: React.FC = () => {
    // Mock data - in a real app, this would come from an API
    const [feeRecords] = useState<FeeRecord[]>([
        { id: 'F001', month: 'March 2024', amount: 5000, dueDate: '2024-03-10', status: 'paid', paymentDate: '2024-03-05', receiptId: 'RCPT001' },
        { id: 'F002', month: 'April 2024', amount: 5000, dueDate: '2024-04-10', status: 'paid', paymentDate: '2024-04-08', receiptId: 'RCPT002' },
        { id: 'F003', month: 'May 2024', amount: 5000, dueDate: '2024-05-10', status: 'paid', paymentDate: '2024-05-07', receiptId: 'RCPT003' },
        { id: 'F004', month: 'June 2024', amount: 5000, dueDate: '2024-06-10', status: 'pending' },
        { id: 'F005', month: 'July 2024', amount: 5000, dueDate: '2024-07-10', status: 'pending' },
        { id: 'F006', month: 'August 2024', amount: 5000, dueDate: '2024-08-10', status: 'pending' },
    ]);

    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedFee, setSelectedFee] = useState<FeeRecord | null>(null);

    const calculateSummary = () => {
        const totalAmount = feeRecords.reduce((sum, record) => sum + record.amount, 0);
        const paidAmount = feeRecords.filter(record => record.status === 'paid').reduce((sum, record) => sum + record.amount, 0);
        const pendingAmount = feeRecords.filter(record => record.status === 'pending').reduce((sum, record) => sum + record.amount, 0);
        const overdueAmount = feeRecords.filter(record => record.status === 'overdue').reduce((sum, record) => sum + record.amount, 0);
        
        return { totalAmount, paidAmount, pendingAmount, overdueAmount };
    };

    const summary = calculateSummary();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'overdue': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handlePayNow = (fee: FeeRecord) => {
        setSelectedFee(fee);
        setShowPaymentModal(true);
    };

    const handlePaymentSubmit = () => {
        // In a real app, this would process the payment
        alert(`Payment of ₹${selectedFee?.amount} processed successfully!`);
        setShowPaymentModal(false);
        setSelectedFee(null);
    };

    return (
        <div className="space-y-6">
            <Card title="Fee Management" icon="fa-solid fa-money-bill-wave">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="text-2xl font-bold text-blue-800">₹{summary.totalAmount.toLocaleString()}</div>
                        <div className="text-sm text-blue-700">Total Fees</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <div className="text-2xl font-bold text-green-800">₹{summary.paidAmount.toLocaleString()}</div>
                        <div className="text-sm text-green-700">Paid</div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                        <div className="text-2xl font-bold text-yellow-800">₹{summary.pendingAmount.toLocaleString()}</div>
                        <div className="text-sm text-yellow-700">Pending</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                        <div className="text-2xl font-bold text-red-800">₹{summary.overdueAmount.toLocaleString()}</div>
                        <div className="text-sm text-red-700">Overdue</div>
                    </div>
                </div>

                <div className="mb-6">
                    <Card title="Payment History">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {feeRecords.map((record) => (
                                        <tr key={record.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.month}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{record.amount.toLocaleString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.dueDate}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.status)}`}>
                                                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                {record.status === 'paid' ? (
                                                    <Button variant="secondary" size="sm" onClick={() => alert(`Receipt ID: ${record.receiptId}`)}>
                                                        <i className="fa-solid fa-receipt mr-1"></i> Receipt
                                                    </Button>
                                                ) : (
                                                    <Button size="sm" onClick={() => handlePayNow(record)}>
                                                        <i className="fa-solid fa-credit-card mr-1"></i> Pay Now
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                <div>
                    <Card title="Payment Methods">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                                <div className="flex items-center">
                                    <i className="fa-brands fa-google-pay text-2xl text-red-500 mr-3"></i>
                                    <div>
                                        <h4 className="font-medium">Google Pay</h4>
                                        <p className="text-sm text-gray-500">Fast and secure</p>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                                <div className="flex items-center">
                                    <i className="fa-brands fa-paypal text-2xl text-blue-500 mr-3"></i>
                                    <div>
                                        <h4 className="font-medium">PayPal</h4>
                                        <p className="text-sm text-gray-500">International payments</p>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                                <div className="flex items-center">
                                    <i className="fa-solid fa-credit-card text-2xl text-gray-500 mr-3"></i>
                                    <div>
                                        <h4 className="font-medium">Credit/Debit Card</h4>
                                        <p className="text-sm text-gray-500">All major cards accepted</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </Card>

            {/* Payment Modal */}
            {showPaymentModal && selectedFee && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold">Fee Payment</h3>
                                <button 
                                    onClick={() => setShowPaymentModal(false)}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            
                            <div className="mb-6">
                                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Month:</span>
                                        <span className="font-medium">{selectedFee.month}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Amount:</span>
                                        <span className="font-medium">₹{selectedFee.amount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Due Date:</span>
                                        <span className="font-medium">{selectedFee.dueDate}</span>
                                    </div>
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                                    <select
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                    >
                                        <option value="upi">UPI</option>
                                        <option value="card">Credit/Debit Card</option>
                                        <option value="netbanking">Net Banking</option>
                                        <option value="paypal">PayPal</option>
                                    </select>
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID / Card Number</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                        placeholder={paymentMethod === 'upi' ? 'user@upi' : '1234 5678 9012 3456'}
                                    />
                                </div>
                            </div>
                            
                            <div className="flex justify-end space-x-3">
                                <Button variant="secondary" onClick={() => setShowPaymentModal(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handlePaymentSubmit}>
                                    Pay ₹{selectedFee.amount.toLocaleString()}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ParentFees;