import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import {
  getOutput, getVerdict, getAIReview,
  getParticularProblem, getParticularTestCase,
} from '../../service/api';

const DEFAULT_CODE = `#include <bits/stdc++.h>
using namespace std;

int main() {
    // read input, print each answer on its own line

    return 0;
}`;

const Submit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [sample, setSample] = useState(null);
  const [code, setCode] = useState(DEFAULT_CODE);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [review, setReview] = useState('');
  const [verdict, setVerdict] = useState(null);   // { verdict, failedCase?, detail? }
  const [loading, setLoading] = useState('');     // 'run' | 'submit' | 'ai' | ''

  useEffect(() => {
    (async () => {
      const p = await getParticularProblem(id, navigate);
      const t = await getParticularTestCase(id);
      if (p) setProblem(p);
      if (t) setSample(t);
    })();
  }, [id]);

  const handleRun = async () => {
    setLoading('run'); setReview(''); setVerdict(null);
    const res = await getOutput({ language: 'cpp', code, input }, navigate);
    setOutput(res?.output ?? 'No output');
    setLoading('');
  };

  const handleSubmit = async () => {
    setLoading('submit'); setReview(''); setOutput('');
    const res = await getVerdict({ code, id }, navigate);
    setVerdict(res);
    setLoading('');
  };

  const handleAIReview = async () => {
    setLoading('ai'); setVerdict(null);
    const res = await getAIReview({ code }, navigate);
    setReview(res?.output ?? 'Could not get a review.');
    setLoading('');
  };

  const verdictStyle = (v) => {
    if (v === 'Accepted') return 'bg-green-500/15 border-green-500 text-green-300';
    if (v === 'Wrong Answer') return 'bg-red-500/15 border-red-500 text-red-300';
    if (v === 'Time Limit Exceeded') return 'bg-amber-500/15 border-amber-500 text-amber-300';
    return 'bg-orange-500/15 border-orange-500 text-orange-300';
  };

  const btn = 'rounded-md px-4 py-2 font-semibold text-white transition disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <div className="w-full h-[80vh] flex gap-3 text-slate-200">
      {/* LEFT: problem statement */}
      <div className="w-1/2 h-full overflow-y-auto rounded-lg border border-slate-700 bg-slate-900 p-5">
        <h1 className="text-2xl font-bold text-slate-100 mb-1">{problem?.name || 'Loading…'}</h1>
        {problem?.difficulty && (
          <span className="inline-block text-sm mb-4 px-2 py-0.5 rounded bg-slate-700 text-slate-200">
            {problem.difficulty}
          </span>
        )}
        <p className="whitespace-pre-wrap leading-relaxed text-slate-300">{problem?.statement}</p>

        {sample && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-slate-100 mb-2">Sample Test Cases</h2>
            <div className="space-y-2">
              {sample.input.map((inp, i) => (
                <div key={i} className="rounded-md bg-slate-800 border border-slate-700 p-3 text-sm">
                  <div><span className="text-slate-400">Input:</span> <code className="text-slate-200">{inp}</code></div>
                  <div><span className="text-slate-400">Output:</span> <code className="text-slate-200">{sample.output[i]}</code></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT: editor + controls */}
      <div className="w-1/2 h-full flex flex-col gap-3">
        <div className="flex-1 rounded-lg overflow-hidden border border-slate-700">
          <Editor
            height="100%"
            theme="vs-dark"
            defaultLanguage="cpp"
            value={code}
            onChange={(v) => setCode(v ?? '')}
            options={{ fontSize: 15, minimap: { enabled: false }, scrollBeyondLastLine: false }}
          />
        </div>

        <div className="flex gap-2 items-center">
          <button onClick={handleRun} disabled={!!loading} className={`${btn} bg-slate-600 hover:bg-slate-500`}>
            {loading === 'run' ? 'Running…' : 'Run'}
          </button>
          <button onClick={handleSubmit} disabled={!!loading} className={`${btn} bg-indigo-600 hover:bg-indigo-500`}>
            {loading === 'submit' ? 'Submitting…' : 'Submit'}
          </button>
          <button onClick={handleAIReview} disabled={!!loading} className={`${btn} bg-purple-600 hover:bg-purple-500`}>
            {loading === 'ai' ? 'Reviewing…' : 'AI Review'}
          </button>
          <Link to="/Submissions" className={`${btn} bg-slate-700 hover:bg-slate-600 ml-auto`}>My Submissions</Link>
        </div>

        {verdict && (
          <div className={`rounded-md border px-4 py-3 font-semibold ${verdictStyle(verdict.verdict)}`}>
            {verdict.verdict}{verdict.failedCase ? ` — failed on test case ${verdict.failedCase}` : ''}
            {verdict.detail && (
              <pre className="mt-2 text-xs font-mono whitespace-pre-wrap text-slate-300">{verdict.detail}</pre>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 h-44">
          <div className="rounded-md border border-slate-700 bg-slate-900 p-2 flex flex-col">
            <span className="text-xs text-slate-400 mb-1">Custom Input</span>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter input…"
              className="flex-1 resize-none bg-slate-950 text-slate-200 rounded p-2 text-sm font-mono outline-none"
            />
          </div>
          <div className="rounded-md border border-slate-700 bg-slate-900 p-2 overflow-y-auto">
            <span className="text-xs text-slate-400">{review ? 'AI Review' : 'Output'}</span>
            {review ? (
              <div className="md text-sm text-slate-200 mt-1"><Markdown>{review}</Markdown></div>
            ) : (
              <pre className="text-sm font-mono whitespace-pre-wrap text-slate-200 mt-1">{output || '// output will appear here'}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submit;