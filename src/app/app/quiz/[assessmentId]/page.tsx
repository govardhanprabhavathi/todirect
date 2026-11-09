'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { CURRICULUM_DATA } from '@/lib/data';
import { useAppState } from '@/lib/store';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Bot
} from 'lucide-react';

export default function ConceptQuizPage() {
  const params = useParams();
  const router = useRouter();
  const { state, recordQuizPass, recordMisconception } = useAppState();

  const assessmentId = params?.assessmentId as string;
  const currentModule = CURRICULUM_DATA.find((m) => m.id === assessmentId) || CURRICULUM_DATA[0];
  const question = currentModule.questions[0] || CURRICULUM_DATA[0].questions[0];

  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const selectedOpt = question.options.find((o) => o.id === selectedOptId);

  const handleSelect = (optId: string) => {
    if (hasSubmitted) return;
    setSelectedOptId(optId);
  };

  const handleSubmit = () => {
    if (!selectedOptId || hasSubmitted) return;
    setHasSubmitted(true);
    const chosen = question.options.find((o) => o.id === selectedOptId);
    if (chosen?.isCorrect) {
      recordQuizPass(question.id);
    } else if (chosen?.misconception) {
      recordMisconception(question.id, chosen.misconception, currentModule.id);
    }
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Navigation Back */}
        <Link
          href={`/app/learn/${currentModule.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to {currentModule.title}
        </Link>

        {/* Quiz Container */}
        <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-[11px] font-mono font-medium border border-blue-200/60 dark:border-blue-900/50">
                Topic 0{currentModule.order} Concept Check
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">Misconception detection active</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight">
              Scenario Assessment
            </h1>
          </div>

          {/* Scenario Text */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
            {question.scenario}
          </div>

          {/* Selectable Options */}
          <div className="space-y-2.5">
            {question.options.map((opt) => {
              const isSelected = selectedOptId === opt.id;
              let style = 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200';

              if (hasSubmitted) {
                if (opt.isCorrect) {
                  style = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 ring-1 ring-emerald-500/20';
                } else if (isSelected) {
                  style = 'border-rose-400 bg-rose-50/80 dark:bg-rose-950/40 text-rose-900 dark:text-rose-300 ring-1 ring-rose-400/20';
                } else {
                  style = 'opacity-40 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] text-slate-500';
                }
              } else if (isSelected) {
                style = 'border-blue-600 dark:border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 text-slate-900 dark:text-slate-100 ring-1 ring-blue-600/20';
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={hasSubmitted}
                  onClick={() => handleSelect(opt.id)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-colors flex items-start justify-between gap-3 cursor-pointer ${style}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-semibold flex items-center justify-center uppercase shrink-0 mt-0.5">
                      {opt.id}
                    </span>
                    <span className="text-xs sm:text-sm font-medium leading-relaxed">{opt.text}</span>
                  </div>

                  {hasSubmitted && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {hasSubmitted && isSelected && !opt.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-500 dark:text-rose-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Misconception Analysis */}
          {hasSubmitted && selectedOpt && (
            <div
              className={`p-4 rounded-xl border animate-slideUp space-y-2 ${
                selectedOpt.isCorrect
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-300'
                  : 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/80 text-rose-900 dark:text-rose-300'
              }`}
            >
              <div className="flex items-center gap-2 font-medium text-xs">
                {selectedOpt.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Demonstrated understanding validated</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span>Cognitive bias detected: {selectedOpt.misconception}</span>
                  </>
                )}
              </div>

              <p className="text-xs leading-relaxed">{selectedOpt.explanation}</p>

              {!selectedOpt.isCorrect && (
                <div className="mt-2 pt-2 border-t border-rose-200/60 dark:border-rose-800/60 text-xs text-rose-800 dark:text-rose-300 flex items-center gap-1.5 font-medium">
                  <Bot className="w-3.5 h-3.5 text-rose-700 dark:text-rose-400" />
                  This misconception has been saved to your understanding tracker for targeted refresher drills.
                </div>
              )}
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
            {!hasSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedOptId}
                className="px-6 py-2.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-xs disabled:opacity-50"
              >
                Submit answer &rarr;
              </button>
            ) : (
              <div className="flex items-center gap-3 w-full justify-between">
                <Link href="/app/progress">
                  <button className="px-4 py-2 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                    View tracker
                  </button>
                </Link>
                <Link href="/app">
                  <button className="px-5 py-2 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-xs">
                    Return to dashboard &rarr;
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
