import React, { useState } from 'react';
import { useKinect } from '../../context/KinectContext';
import { 
  BookOpen, 
  Search, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { ProductCatalogueItem } from '../../types';

export const ProductCatalogueScreen: React.FC = () => {
  const { products } = useKinect();
  const [selectedProduct, setSelectedProduct] = useState<ProductCatalogueItem>(products[0]);
  const [ragQuery, setRagQuery] = useState('home loan salary increase preferential rate');
  const [ragResult, setRagResult] = useState<{ doc: string; score: number; excerpt: string } | null>({
    doc: 'ENBD-Catalogue-Mortgage-2026-Q3.pdf (Passage 14)',
    score: 0.942,
    excerpt: 'Priority Banking clients receiving verified payroll over AED 40k qualify for 4.24% p.a. fixed 3-year mortgage with zero processing fee and indicative pre-approval up to AED 1.2M.',
  });

  const handleTestRetrieval = () => {
    setRagResult({
      doc: `${selectedProduct.sourceDocument} (Passage 3)`,
      score: 0.958,
      excerpt: `Retrieved approved terms for ${selectedProduct.name}: ${selectedProduct.indicativeRateOrBenefit}. Mandatory Central Bank disclosure required.`,
    });
  };

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0b1e44] via-[#0d2757] to-[#0a1c3d] border border-blue-900/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              RAG Knowledge Base Active
            </span>
            <span className="text-xs text-slate-400">Synchronized with Compliance & Central Bank Standards</span>
          </div>
          <h2 className="text-base font-bold text-white tracking-tight mt-1">
            Approved Product Catalogue & RAG Corpus
          </h2>
          <p className="text-xs text-slate-300">
            Every AI recommendation draft is mathematically bounded by these approved terms, disclaimers, and prohibited claims.
          </p>
        </div>
      </div>

      {/* RAG Retrieval Simulator Tester */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-bold text-white flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Live Vector RAG Retrieval Probe
          </span>
          <span className="font-mono text-[10px] text-slate-400">Embedding: Text-Embedding-004</span>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={ragQuery}
            onChange={(e) => setRagQuery(e.target.value)}
            placeholder="Type query to test semantic retrieval..."
            className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white outline-none focus:border-blue-500"
          />
          <button
            onClick={handleTestRetrieval}
            className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shrink-0"
          >
            Probe Index
          </button>
        </div>

        {ragResult && (
          <div className="p-3 rounded-lg bg-slate-950 border border-blue-500/30 space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-mono text-emerald-400 font-semibold">{ragResult.doc}</span>
              <span className="font-mono text-blue-300 font-bold">Cosine Match: {(ragResult.score * 100).toFixed(1)}%</span>
            </div>
            <p className="text-slate-300 text-[11px] italic">"{ragResult.excerpt}"</p>
          </div>
        )}
      </div>

      {/* 2-Column: Product List (Left) vs Product Detail (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left List */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
            Approved Products ({products.length})
          </span>

          <div className="space-y-2">
            {products.map((p) => {
              const isSelected = selectedProduct.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-950/30'
                      : 'border-slate-800 bg-slate-900/70 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-blue-300 font-bold">{p.code}</span>
                    <span className="text-[10px] text-emerald-400 font-medium">{p.approvedVersion}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white mt-1">{p.name}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{p.category}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detail */}
        <div className="lg:col-span-8 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-[10px] text-blue-300 font-bold">{selectedProduct.code}</span>
              <h3 className="text-base font-bold text-white mt-0.5">{selectedProduct.name}</h3>
              <p className="text-xs text-emerald-400 font-semibold">{selectedProduct.indicativeRateOrBenefit}</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300">
                {selectedProduct.status}
              </span>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">
                Effective: {selectedProduct.effectiveDate}
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Key Product Benefits
            </span>
            <div className="space-y-1">
              {selectedProduct.keyBenefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility Matrix */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Eligibility Rules
            </span>
            <div className="space-y-1">
              {selectedProduct.eligibilitySummary.map((e, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>{e}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Required Disclaimers */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
              Mandatory Legal Disclaimers
            </span>
            <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
              {selectedProduct.requiredDisclaimers.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>

          {/* Prohibited Claims */}
          <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block">
              Strictly Prohibited Claims (LLM Guardrail)
            </span>
            <ul className="list-disc pl-4 space-y-1 text-rose-200 text-[11px]">
              {selectedProduct.prohibitedClaims.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          {/* Source Document File */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Source Corpus: {selectedProduct.sourceDocument}</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CBUAE Reg Compliant</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
