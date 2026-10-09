'use client';

import { useState } from 'react';

type Gender = 'male' | 'female';
type RiskLevel = 'Bajo' | 'Moderado' | 'Alto' | 'Ninguno';

const RISK_THRESHOLDS = {
  male: { moderate: 0.9, high: 1.0 },
  female: { moderate: 0.8, high: 0.85 },
};

const RISK_DESCRIPTIONS: Record<RiskLevel, string> = {
  Bajo: 'Su riesgo de desarrollar problemas de salud cardiovascular es bajo.',
  Moderado: 'Su riesgo de desarrollar problemas de salud cardiovascular es moderado.',
  Alto: 'Su riesgo de desarrollar problemas de salud cardiovascular es alto. Se recomienda consultar a un profesional de la salud.',
  Ninguno: '',
};

const RISK_COLORS: Record<RiskLevel, string[]> = {
  Bajo: ['bg-green-100', 'text-green-800', 'border-green-500'],
  Moderado: ['bg-yellow-100', 'text-yellow-800', 'border-yellow-500'],
  Alto: ['bg-red-100', 'text-red-800', 'border-red-500'],
  Ninguno: ['hidden'],
};

export default function CalculadoraICC() {
  const [waist, setWaist] = useState<string>('');
  const [hip, setHip] = useState<string>('');
  const [gender, setGender] = useState<Gender>('female');
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<{ whr: number; risk: RiskLevel } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    const waistCm = parseFloat(waist);
    const hipCm = parseFloat(hip);

    if (isNaN(waistCm) || isNaN(hipCm) || waistCm <= 0 || hipCm <= 0) {
      setError('Por favor, ingrese valores válidos y positivos para cintura y cadera.');
      return;
    }

    if (waistCm >= hipCm) {
      setError('La medida de la cintura no debe ser mayor o igual a la de la cadera para un cálculo de riesgo estándar.');
      return;
    }

    const whr = waistCm / hipCm;
    let risk: RiskLevel = 'Ninguno';
    const thresholds = RISK_THRESHOLDS[gender];

    if (whr >= thresholds.high) risk = 'Alto';
    else if (whr >= thresholds.moderate) risk = 'Moderado';
    else risk = 'Bajo';

    setResult({ whr, risk });
  };

  const handleReset = () => {
    setWaist('');
    setHip('');
    setGender('female');
    setError('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-sans p-4">
      <main className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 transition-all">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Calculadora de ICC</h1>
          <p className="text-gray-600 mt-2">Índice Cintura/Cadera para Riesgo Metabólico</p>
        </div>

        <form onSubmit={handleCalculate} className="my-8 space-y-6">
          <div>
            <label htmlFor="waist" className="block text-sm font-medium text-gray-700 mb-1">Cintura (cm)</label>
            <input
              id="waist"
              type="number"
              step="0.1"
              min="0"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              placeholder="Ej: 80"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label htmlFor="hip" className="block text-sm font-medium text-gray-700 mb-1">Cadera (cm)</label>
            <input
              id="hip"
              type="number"
              step="0.1"
              min="0"
              value={hip}
              onChange={(e) => setHip(e.target.value)}
              placeholder="Ej: 95"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <fieldset>
            <legend className="block text-sm font-medium text-gray-700 mb-2">Género</legend>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`flex-1 p-3 border rounded-lg cursor-pointer text-center transition ${
                  gender === 'female' ? 'bg-blue-500 text-white border-blue-500 shadow' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                Mujer
              </button>
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`flex-1 p-3 border rounded-lg cursor-pointer text-center transition ${
                  gender === 'male' ? 'bg-blue-500 text-white border-blue-500 shadow' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                Hombre
              </button>
            </div>
          </fieldset>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
            >
              Calcular ICC
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition"
            >
              Limpiar
            </button>
          </div>
        </form>

        {error && (
          <div className="text-center p-3 my-6 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {result && (
          <div className="animate-fade-in mt-8">
            <div className={`p-5 border-l-4 rounded-r-lg ${RISK_COLORS[result.risk].join(' ')}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Su Índice Cintura/Cadera es:</p>
                  <p className="text-3xl font-bold">{result.whr.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">Nivel de Riesgo:</p>
                  <p className="text-xl font-bold">{result.risk}</p>
                </div>
              </div>
              <p className="mt-4 text-sm">{RISK_DESCRIPTIONS[result.risk]}</p>
            </div>
          </div>
        )}
      </main>

      <footer className="text-center mt-8 text-gray-500 text-sm max-w-md">
        <p>Descargo de responsabilidad: Esta calculadora es una herramienta informativa y no reemplaza el consejo médico profesional.</p>
      </footer>
    </div>
  );
}