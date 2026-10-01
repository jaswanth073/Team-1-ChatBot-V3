
import React from 'react';
import { HealthAssessment, RiskLevel } from '../types';
import { AlertCircle, SparklesIcon } from './Icons';

interface SummaryCardProps {
  assessment: HealthAssessment;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ assessment }) => {
  const getRiskStyles = (level: string) => {
    switch (level) {
      case RiskLevel.HIGH: return {
        bg: 'bg-red-50/80',
        text: 'text-red-900',
        border: 'border-red-200',
        badge: 'bg-red-600'
      };
      case RiskLevel.MODERATE: return {
        bg: 'bg-amber-50/80',
        text: 'text-amber-900',
        border: 'border-amber-200',
        badge: 'bg-amber-500'
      };
      case RiskLevel.LOW: return {
        bg: 'bg-emerald-50/80',
        text: 'text-emerald-900',
        border: 'border-emerald-200',
        badge: 'bg-emerald-500'
      };
      default: return {
        bg: 'bg-white/80',
        text: 'text-slate-900',
        border: 'border-slate-200',
        badge: 'bg-slate-500'
      };
    }
  };

  const styles = getRiskStyles(assessment.riskLevel);

  return (
    <div className={`mt-8 p-8 rounded-[32px] border ${styles.border} ${styles.bg} backdrop-blur-xl shadow-xl transition-all animate-in zoom-in-95 duration-700`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-xl shadow-sm">
            <SparklesIcon />
          </div>
          <h3 className="font-extrabold text-2xl tracking-tight text-slate-900">
            Assessment Results
          </h3>
        </div>
        <span className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-black/5 ${styles.badge}`}>
          {assessment.riskLevel}
        </span>
      </div>

      <div className="space-y-8 text-[15px] leading-relaxed">
        <div className="bg-white/40 p-6 rounded-2xl border border-white/50">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Our Clinical Understanding</p>
          <p className="text-slate-800 font-medium">{assessment.understanding}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Possible Conditions</p>
            <ul className="space-y-3">
              {assessment.possibleCauses.map((cause, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  {cause}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="bg-white/60 p-5 rounded-2xl border border-white">
              <p className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3">Next Steps</p>
              <ul className="space-y-2">
                {assessment.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                    <span className="text-purple-400">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200/50">
          <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-4">When to seek urgent care</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {assessment.whenToSeeDoctor.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-500 bg-white/30 p-3 rounded-xl border border-white/20">
                <div className="w-1 h-1 rounded-full bg-red-400" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {assessment.isEmergency && (
          <div className="mt-8 p-6 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-3xl flex items-start gap-4 shadow-xl shadow-red-200">
            <div className="p-3 bg-white/20 rounded-2xl">
              <AlertCircle />
            </div>
            <div>
              <p className="font-extrabold text-lg mb-1 tracking-tight">Critical Warning</p>
              <p className="text-sm opacity-90 leading-snug">Based on the symptoms described, please visit the emergency room or contact local emergency services (108) immediately.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
