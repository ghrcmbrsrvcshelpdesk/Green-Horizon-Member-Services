import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Modal } from '../components/Modal';
import { MOCK_PARTICIPANT_SERVICES, MOCK_BILLS } from '../constants';
import { Service } from '../types';
import { CareerIcon, FinanceIcon, LoadingIcon, ServiceIcon } from '../components/icons/Icons';
import { getFinancialAdvice } from '../services/geminiService';

const ServiceCategoryIcon = ({ category }: { category: string }) => {
    switch (category) {
        case 'Finance': return <FinanceIcon />;
        case 'Career': return <CareerIcon />;
        default: return <ServiceIcon />;
    }
};

export const ParticipantPortal: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [adviceQuery, setAdviceQuery] = useState('');
    const [adviceResponse, setAdviceResponse] = useState('');
    const [isAdviceLoading, setIsAdviceLoading] = useState(false);

    const handleServiceClick = (service: Service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };
    
    const handleGetAdvice = async () => {
        if (!adviceQuery.trim()) return;
        setIsAdviceLoading(true);
        setAdviceResponse('');
        const response = await getFinancialAdvice(adviceQuery);
        setAdviceResponse(response);
        setIsAdviceLoading(false);
    };

    return (
        <div className="space-y-8">
            <section>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400 mb-4">My Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_PARTICIPANT_SERVICES.map(service => (
                        <Card key={service.id} className="cursor-pointer" onClick={() => handleServiceClick(service)}>
                            <div className="flex items-center space-x-4 mb-3">
                                <div className="p-2 bg-slate-800 rounded-full text-emerald-400">
                                    <ServiceCategoryIcon category={service.category} />
                                </div>
                                <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                            </div>
                            <p className="text-slate-400 text-sm flex-grow">{service.description}</p>
                        </Card>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400 mb-4">My Bills</h2>
                <Card>
                    <ul className="divide-y divide-slate-800">
                        {MOCK_BILLS.map(bill => (
                            <li key={bill.id} className="py-3 flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-white">{bill.serviceName}</p>
                                    <p className="text-sm text-slate-400">Due: {bill.dueDate}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-white">${bill.amount.toFixed(2)}</p>
                                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                                        bill.status === 'Paid' ? 'bg-green-500/20 text-green-400' :
                                        bill.status === 'Due' ? 'bg-yellow-500/20 text-yellow-400' :
                                        'bg-red-500/20 text-red-400'
                                    }`}>
                                        {bill.status}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Card>
            </section>
            
            <section>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400 mb-4">Financial Wellness AI</h2>
                 <Card>
                    <h3 className="text-lg font-semibold text-white mb-2">Ask for Financial Advice</h3>
                    <p className="text-slate-400 text-sm mb-4">Have a question about budgeting or saving? Ask our AI assistant for a helpful tip.</p>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={adviceQuery}
                            onChange={(e) => setAdviceQuery(e.target.value)}
                            placeholder="e.g., How can I start saving money?"
                            className="flex-grow bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            disabled={isAdviceLoading}
                        />
                        <button
                            onClick={handleGetAdvice}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md transition-colors flex items-center justify-center disabled:bg-slate-600 disabled:cursor-not-allowed"
                            disabled={isAdviceLoading || !adviceQuery.trim()}
                        >
                            {isAdviceLoading ? <LoadingIcon /> : 'Ask'}
                        </button>
                    </div>
                    {adviceResponse && (
                        <div className="mt-4 p-4 bg-slate-800/50 border border-slate-700 rounded-md">
                            <p className="text-slate-300 whitespace-pre-wrap">{adviceResponse}</p>
                        </div>
                    )}
                </Card>
            </section>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedService?.name || ''}>
                {selectedService && (
                    <div className="text-slate-300">
                        <p className="mb-2">{selectedService.description}</p>
                        <p className="font-bold">Category: <span className="font-normal">{selectedService.category}</span></p>
                        <p className="font-bold">Price: <span className="font-normal">${selectedService.price.toFixed(2)}</span></p>
                    </div>
                )}
            </Modal>
        </div>
    );
};
