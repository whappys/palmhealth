'use client';

import { useState } from 'react';

export default function CalculadoraIMC() {
  const [peso, setPeso] = useState<string>('');
  const [altura, setAltura] = useState<string>('');
  const [imc, setImc] = useState<number | null>(null);
  const [evaluacion, setEvaluacion] = useState<string>('');

  const calcularIMC = () => {
    const pesoNum = parseFloat(peso);
    const alturaCm = parseFloat(altura);

    if (isNaN(pesoNum) || isNaN(alturaCm) || pesoNum <= 0 || alturaCm <= 0) {
      setEvaluacion('Por favor, ingresa valores válidos y mayores a 0.');
      setImc(null);
      return;
    }

    // Convertir altura de cm a metros para la fórmula
    const alturaM = alturaCm / 100;
    const imcCalculado = pesoNum / (alturaM * alturaM);
    const imcRedondeado = Math.round(imcCalculado * 10) / 10;

    setImc(imcRedondeado);

    // Clasificación según la OMS
    if (imcRedondeado < 18.5) {
      setEvaluacion('Bajo peso');
    } else if (imcRedondeado >= 18.5 && imcRedondeado <= 24.9) {
      setEvaluacion('Peso normal');
    } else if (imcRedondeado >= 25.0 && imcRedondeado <= 29.9) {
      setEvaluacion('Sobrepeso');
    } else {
      setEvaluacion('Obesidad');
    }
  };

  const limpiar = () => {
    setPeso('');
    setAltura('');
    setImc(null);
    setEvaluacion('');
  };

  const getColorClass = () => {
    if (evaluacion === 'Bajo peso') return 'bg-blue-100 text-blue-800 border-blue-500';
    if (evaluacion === 'Peso normal') return 'bg-green-100 text-green-800 border-green-500';
    if (evaluacion === 'Sobrepeso') return 'bg-yellow-100 text-yellow-800 border-yellow-500';
    if (evaluacion === 'Obesidad') return 'bg-red-100 text-red-800 border-red-500';
    return 'bg-gray-100 text-gray-800 border-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-sans p-4">
      <main className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 transition-all">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Calculadora de IMC</h1>
          <p className="text-gray-600 mt-2">Índice de Masa Corporal (Estándar OMS)</p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="peso" className="block text-sm font-medium text-gray-700 mb-1">Peso (en Kg)</label>
            <input
              id="peso"
              type="number"
              step="0.1"
              min="0"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              placeholder="Ej: 70"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label htmlFor="altura" className="block text-sm font-medium text-gray-700 mb-1">Altura (en Cm)</label>
            <input
              id="altura"
              type="number"
              step="0.1"
              min="0"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              placeholder="Ej: 170"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={calcularIMC}
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
            >
              Calcular IMC
            </button>
            <button
              onClick={limpiar}
              className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition"
            >
              Limpiar
            </button>
          </div>
        </div>

        {imc !== null && (
          <div className="mt-8 animate-fade-in">
            <div className={`p-5 border-l-4 rounded-r-lg ${getColorClass()}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Tu IMC es:</p>
                  <p className="text-3xl font-bold">{imc}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">Evaluación:</p>
                  <p className="text-xl font-bold">{evaluacion}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="text-center mt-8 text-gray-500 text-sm max-w-md">
        <p>Descargo de responsabilidad: Esta calculadora es una herramienta informativa basada en estándares de la OMS y no reemplaza el consejo médico profesional.</p>
      </footer>
    </div>
  );
}