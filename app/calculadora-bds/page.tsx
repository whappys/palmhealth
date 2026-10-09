'use client';

import { useState } from 'react';

const questions = [
  { id: 'q1', label: '1. Realizar tareas domésticas:', options: ['Normal', 'Leve dificultad', 'Moderada', 'Severa'] },
  { id: 'q2', label: '2. Manejo del dinero:', options: ['Normal', 'Errores ocasionales', 'Necesita ayuda', 'Incapaz'] },
  { id: 'q3', label: '3. Recordar listas cortas (compras, tareas):', options: ['Normal', 'Olvidos leves', 'Olvidos frecuentes', 'No puede recordar'] },
  { id: 'q4', label: '4. Orientación en lugares conocidos:', options: ['Normal', 'Desorientación ocasional', 'Frecuente', 'Constante'] },
  { id: 'q5', label: '5. Olvido de eventos recientes:', options: ['No', 'Leve', 'Moderado', 'Severo'] },
  { id: 'q6', label: '6. Cambios en personalidad o conducta:', options: ['No', 'Leve', 'Moderado', 'Severo'] },
  { id: 'q7', label: '7. Interés en actividades habituales:', options: ['Normal', 'Menor interés', 'Muy reducido', 'Nulo'] },
  { id: 'q8', label: '8. Cuidado personal (higiene, vestimenta):', options: ['Independiente', 'Algo descuidado', 'Necesita ayuda', 'Dependiente'] },
];

export default function CalculadoraBDS() {
  const [scores, setScores] = useState<Record<string, number>>({
    q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0,
  });
  const [result, setResult] = useState<{ total: number; nivel: string; colorClass: string } | null>(null);

  const handleChange = (id: string, value: number) => {
    setScores(prev => ({ ...prev, [id]: value }));
  };

  const calcularBDS = () => {
    const total = Object.values(scores).reduce((acc, curr) => acc + curr, 0);
    let nivel = '';
    let colorClass = '';

    if (total <= 3) {
      nivel = 'Normal';
      colorClass = 'text-green-700 bg-green-50 border-green-200';
    } else if (total <= 9) {
      nivel = 'Deterioro leve';
      colorClass = 'text-yellow-700 bg-yellow-50 border-yellow-200';
    } else if (total <= 15) {
      nivel = 'Deterioro moderado';
      colorClass = 'text-orange-700 bg-orange-50 border-orange-200';
    } else {
      nivel = 'Deterioro grave';
      colorClass = 'text-red-700 bg-red-50 border-red-200';
    }

    setResult({ total, nivel, colorClass });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Escala de Demencia de Blessed (BDS)</h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Evaluación orientativa del deterioro cognitivo basada en la funcionalidad diaria.
        </p>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">🧩 Actividades de la vida diaria</h3>
          {questions.slice(0, 4).map((q) => (
            <QuestionBlock key={q.id} question={q} value={scores[q.id]} onChange={handleChange} />
          ))}

          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2 mt-8">🧠 Memoria y comportamiento</h3>
          {questions.slice(4).map((q) => (
            <QuestionBlock key={q.id} question={q} value={scores[q.id]} onChange={handleChange} />
          ))}
        </div>

        <button
          onClick={calcularBDS}
          className="w-full mt-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-lg transition-colors duration-200"
        >
          Calcular Resultado
        </button>

        {result && (
          <div className={`mt-6 p-6 rounded-lg border-2 text-center animate-fade-in ${result.colorClass}`}>
            <h3 className="text-2xl font-bold mb-2">Puntuación: {result.total} / 24</h3>
            <p className="text-lg font-semibold">Interpretación: {result.nivel}</p>
          </div>
        )}

        <p className="text-xs text-gray-500 mt-8 text-center italic border-t pt-4">
          ⚠️ Esta herramienta es orientativa y no sustituye una evaluación médica profesional.
        </p>
      </div>
    </div>
  );
}

function QuestionBlock({ question, value, onChange }: { question: any, value: number, onChange: (id: string, val: number) => void }) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      <label className="block font-medium text-gray-800 mb-2">{question.label}</label>
      <select
        value={value}
        onChange={(e) => onChange(question.id, parseInt(e.target.value))}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
      >
        {question.options.map((opt: string, idx: number) => (
          <option key={idx} value={idx}>{opt}</option>
        ))}
      </select>
    </div>
  );
}