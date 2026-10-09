'use client';

import { useState } from 'react';

export default function CalculadoraMMSE() {
  const [scores, setScores] = useState({
    q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0,
  });
  const [result, setResult] = useState<{ total: number; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let numValue = parseInt(value) || 0;
    const max = parseInt(e.target.max);
    if (numValue > max) numValue = max;
    if (numValue < 0) numValue = 0;
    setScores(prev => ({ ...prev, [name]: numValue }));
  };

  const calculateResult = () => {
    const total = Object.values(scores).reduce((acc, curr) => acc + curr, 0);
    let text = "";
    if (total >= 27) text = "Estado normal";
    else if (total >= 24) text = "Posible deterioro leve";
    else if (total >= 18) text = "Deterioro moderado";
    else text = "Deterioro severo";
    
    setResult({ total, text });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-blue-900 text-center mb-4">Mini Mental State Examination (MMSE)</h1>
        
        <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500 mb-4">
          <p className="text-gray-800">
            El MMSE es una prueba breve y estandarizada que se utiliza para evaluar el estado cognitivo de una persona, midiendo áreas como la orientación, memoria, atención y lenguaje.
          </p>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400 mb-8 text-sm italic text-gray-700">
          <strong>Nota importante:</strong> Este test es una herramienta de cribado y no sustituye un diagnóstico médico profesional.
        </div>

        <div className="space-y-6">
          <QuestionBlock title="1. Orientación Temporal" instruction="Año, estación, mes, día y fecha." name="q1" max={5} value={scores.q1} onChange={handleChange} />
          <QuestionBlock title="2. Orientación Espacial" instruction="País, ciudad, lugar, etc." name="q2" max={5} value={scores.q2} onChange={handleChange} />
          <QuestionBlock title="3. Memoria" name="q3" max={3} value={scores.q3} onChange={handleChange} />
          <QuestionBlock title="4. Atención" name="q4" max={5} value={scores.q4} onChange={handleChange} />
          <QuestionBlock title="5. Recuerdo" name="q5" max={3} value={scores.q5} onChange={handleChange} />
          <QuestionBlock title="6. Lenguaje" name="q6" max={9} value={scores.q6} onChange={handleChange} />
        </div>

        <button 
          onClick={calculateResult}
          className="w-full mt-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold text-xl rounded-lg transition-colors duration-200"
        >
          Obtener Resultado
        </button>

        {result && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center animate-fade-in">
            <span className="text-3xl font-bold text-gray-900 block mb-4">
              Resultado: {result.total} / 30
            </span>
            <div className="text-xl font-semibold text-blue-800">
              {result.text}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function QuestionBlock({ title, instruction, name, max, value, onChange }: { title: string, instruction?: string, name: string, max: number, value: number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <p className="font-bold text-lg text-gray-800 mt-0 mb-2">{title}</p>
      {instruction && <p className="text-sm text-gray-600 mb-3 bg-gray-50 p-2 rounded">{instruction}</p>}
      <div className="flex items-center gap-4 font-bold">
        <span>Puntos (0-{max}):</span>
        <input 
          type="number" 
          name={name} 
          min="0" 
          max={max} 
          value={value} 
          onChange={onChange}
          className="w-20 p-2 border-2 border-gray-300 rounded-md text-lg focus:border-blue-500 focus:outline-none"
        />
      </div>
    </div>
  );
}