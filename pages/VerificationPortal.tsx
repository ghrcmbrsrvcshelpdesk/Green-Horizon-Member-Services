import React, { useState } from 'react';
import { Card } from '../components/Card';
import { MOCK_PARTICIPANT_RECORDS } from '../constants';
import { ParticipantRecord } from '../types';
import { checkEligibility } from '../services/geminiService';
import { LoadingIcon } from '../components/icons/Icons';

export const VerificationPortal: React.FC = () => {
    const [records] = useState<ParticipantRecord[]>(MOCK_PARTICIPANT_RECORDS);
    const [eligibilityStatus, setEligibilityStatus] = useState<Record<string, string>>({});
    const [loadingRecordId, setLoadingRecordId] = useState<string | null>(null);

    const handleCheckEligibility = async (record: ParticipantRecord) => {
        if (eligibilityStatus[record.id]) return;

        setLoadingRecordId(record.id);
        const status = await checkEligibility(record);
        setEligibilityStatus(prev => ({ ...prev, [record.id]: status }));
        setLoadingRecordId(null);
    };
    
    const getStatusColor = (status: string) => {
        if (status === 'Eligible') return 'bg-green-500/20 text-green-400';
        if (status === 'Ineligible') return 'bg-red-500/20 text-red-400';
        if (status.includes('Review')) return 'bg-yellow-500/20 text-yellow-400';
        return 'bg-slate-500/20 text-slate-400';
    };


    return (
        <div className="space-y-8">
            <section>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400 mb-4">Participant Eligibility Verification</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {records.map(record => (
                        <Card key={record.id}>
                            <h3 className="text-lg font-semibold text-white">{record.participantName}</h3>
                            <p className="text-sm text-slate-400 mb-3">{record.programName}</p>
                            <div className="text-sm space-y-1 text-slate-300">
                                <p><span className="font-medium">Score:</span> {record.eligibilityScore}</p>
                                <p><span className="font-medium">Enrolled:</span> {record.enrollmentDate}</p>
                                <p><span className="font-medium">Expires:</span> {record.expirationDate}</p>
                                <p><span className="font-medium">Next Review:</span> {record.nextReviewDate}</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
                                <button
                                    onClick={() => handleCheckEligibility(record)}
                                    disabled={loadingRecordId === record.id || !!eligibilityStatus[record.id]}
                                    className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md transition-colors flex items-center justify-center text-sm disabled:bg-slate-600 disabled:cursor-not-allowed"
                                >
                                    {loadingRecordId === record.id ? <LoadingIcon /> : 'Check Eligibility with AI'}
                                </button>
                                {eligibilityStatus[record.id] && (
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-slate-300">AI Status:</p>
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusColor(eligibilityStatus[record.id])}`}>
                                            {eligibilityStatus[record.id]}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
};
