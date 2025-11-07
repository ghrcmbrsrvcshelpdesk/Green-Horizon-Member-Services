import React, { useState } from 'react';
import { Card } from '../components/Card';
import { MOCK_INITIAL_REQUESTS } from '../constants';
import { ChangeRequest } from '../types';
import { summarizeRequestDetails } from '../services/geminiService';
import { LoadingIcon } from '../components/icons/Icons';

export const AdminPortal: React.FC = () => {
    const [requests, setRequests] = useState<ChangeRequest[]>(MOCK_INITIAL_REQUESTS);
    const [summaries, setSummaries] = useState<Record<string, string>>({});
    const [loadingSummaryId, setLoadingSummaryId] = useState<string | null>(null);

    const handleSummarize = async (request: ChangeRequest) => {
        if (summaries[request.id]) return; // Don't re-fetch if summary exists

        setLoadingSummaryId(request.id);
        const summary = await summarizeRequestDetails(request.details);
        setSummaries(prev => ({ ...prev, [request.id]: summary }));
        setLoadingSummaryId(null);
    };

    const handleRequestStatus = (id: string, status: 'approved' | 'rejected') => {
        setRequests(prev => prev.map(req => req.id === id ? { ...req, status } : req));
    };

    return (
        <div className="space-y-8">
            <section>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400 mb-4">Service Change Requests</h2>
                <div className="space-y-4">
                    {requests.map(request => (
                        <Card key={request.id}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-lg font-semibold text-white">{request.serviceName}</p>
                                    <p className="text-sm text-slate-400">Participant: {request.participantName}</p>
                                    <p className="text-sm text-slate-400">Type: <span className="capitalize">{request.requestType}</span></p>
                                </div>
                                <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                                    request.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                    request.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                                    'bg-red-500/20 text-red-400'
                                }`}>
                                    {request.status}
                                </span>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-800">
                                <p className="text-sm text-slate-300 font-medium mb-1">Details:</p>
                                <p className="text-sm text-slate-400 italic">"{request.details}"</p>
                            </div>
                            
                            {summaries[request.id] && (
                                <div className="mt-3 p-3 bg-slate-800/50 border border-slate-700 rounded-md">
                                    <p className="text-sm text-slate-300 font-medium mb-1">AI Summary:</p>
                                    <p className="text-sm text-sky-300">{summaries[request.id]}</p>
                                </div>
                            )}

                            {request.status === 'pending' && (
                                <div className="mt-4 pt-4 border-t border-slate-800 flex items-center space-x-2">
                                    <button onClick={() => handleRequestStatus(request.id, 'approved')} className="text-sm bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-md transition-colors">Approve</button>
                                    <button onClick={() => handleRequestStatus(request.id, 'rejected')} className="text-sm bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md transition-colors">Reject</button>
                                    <button 
                                        onClick={() => handleSummarize(request)}
                                        disabled={loadingSummaryId === request.id || !!summaries[request.id]}
                                        className="text-sm bg-sky-600 hover:bg-sky-700 text-white font-bold py-1 px-3 rounded-md transition-colors flex items-center disabled:bg-slate-600 disabled:cursor-not-allowed ml-auto"
                                    >
                                        {loadingSummaryId === request.id ? <LoadingIcon /> : (summaries[request.id] ? 'Summarized' : 'Summarize with AI')}
                                    </button>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
};
