'use client';

import { useState } from 'react';

export default function CalculadoraCalorias() {
  const [formData, setFormData] = useState({
    age: 25,
    weight: 160,
    heightFt: 5,
    heightIn: 9,
    gender: 'male',
    activityLevel: 1.55,
    targetWeight: 155,
    targetTimeframe: 8,
  });

  const [results, setResults] = useState<{ tdee: number; targetCalories: number; showWarning: boolean } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'gender' || name === 'activityLevel' ? value : parseFloat(value) || 0,
    }));
  };

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const { age, weight, heightFt, heightIn, gender, activityLevel, targetWeight, targetTimeframe } = formData;

    const weightInKg = weight * 0.453592;
    const heightInCm = (heightFt * 30.48) + (heightIn * 2.54);

    let bmr = 0;
    if (gender === 'male') {
      bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) + 5;
    } else {
      bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) - 161;
    }

    const tdee = bmr * activityLevel;
    const weightDifferenceInLbs = targetWeight - weight;
    const totalCalorieDifference = weightDifferenceInLbs * 3500;
    const totalDays = targetTimeframe * 7;
    const dailyCalorieAdjustment = totalDays > 0 ? totalCalorieDifference / totalDays : 0;
    const targetCalories = tdee + dailyCalorieAdjustment;

    setResults({
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories),
      showWarning: targetCalories < 1200,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 font-sans py-8 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Columna del Formulario */}
        <div className="lg:sticky lg:top-12">
          <div className="bg-gray-800/40 backdrop-blur-sm border border-white/10 shadow-2xl shadow-black/20 rounded-xl p-6 md:p-8">
            <form onSubmit={calculate} className="space-y-6">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-indigo-400"><path d="M9.93 2.65a2.5 2.5 0 0 0-3.36 3.36l-2.02 2.02a2.5 2.5 0 0 0 3.36 3.36l2.02-2.02a2.5 2.5 0 0 0 3.36-3.36z"></path><path d="m14 14 2.12-2.12"></path><path d="M2.65 14.07a2.5 2.5 0 0 0 3.36-3.36l2.02-2.02a2.5 2.5 0 0 0-3.36-3.36z"></path><path d="M18.88 18.88 17 17"></path><path d="m22 2-1.5 1.5"></path><path d="M14 8.5 12.5 7"></path><path d="M19.5 14 18 12.5"></path><path d="m2 22 1.5-1.5"></path></svg>
                </div>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">Calculadora de Calorías</h2>
                <p className="mt-2 text-sm text-gray-400">Ingresa tus datos para estimar tus necesidades calóricas.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-300">Edad</label>
                  <input id="age" name="age" type="number" required min="1" value={formData.age} onChange={handleChange} className="mt-1.5 block w-full px-3 py-2 bg-white/5 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white transition" />
                </div>
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-300">Peso Actual (libras)</label>
                  <input id="weight" name="weight" type="number" required min="1" value={formData.weight} onChange={handleChange} className="mt-1.5 block w-full px-3 py-2 bg-white/5 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Altura</label>
                  <div className="grid grid-cols-2 gap-3 mt-1.5">
                    <input id="heightFt" name="heightFt" type="number" required min="1" value={formData.heightFt} onChange={handleChange} placeholder="Pies" className="block w-full px-3 py-2 bg-white/5 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white transition" />
                    <input id="heightIn" name="heightIn" type="number" required min="0" max="11" value={formData.heightIn} onChange={handleChange} placeholder="Pulgadas" className="block w-full px-3 py-2 bg-white/5 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Género</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setFormData(prev => ({ ...prev, gender: 'male' }))} className={`px-4 py-2 text-sm rounded-md transition-colors ${formData.gender === 'male' ? 'bg-indigo-600 text-white font-semibold' : 'bg-white/10 text-gray-200 hover:bg-white/20'}`}>Hombre</button>
                    <button type="button" onClick={() => setFormData(prev => ({ ...prev, gender: 'female' }))} className={`px-4 py-2 text-sm rounded-md transition-colors ${formData.gender === 'female' ? 'bg-indigo-600 text-white font-semibold' : 'bg-white/10 text-gray-200 hover:bg-white/20'}`}>Mujer</button>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-300">Nivel de Actividad</label>
                <select id="activityLevel" name="activityLevel" value={formData.activityLevel} onChange={handleChange} required className="mt-1.5 block w-full pl-3 pr-10 py-2 text-base bg-white/5 border border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-white transition">
                  <option value="1.2" className="bg-gray-800 text-white">Sedentario (poco o ningún ejercicio)</option>
                  <option value="1.375" className="bg-gray-800 text-white">Ligero (ejercicio 1-3 días/semana)</option>
                  <option value="1.55" className="bg-gray-800 text-white">Moderado (ejercicio 3-5 días/semana)</option>
                  <option value="1.725" className="bg-gray-800 text-white">Activo (ejercicio 6-7 días/semana)</option>
                  <option value="1.9" className="bg-gray-800 text-white">Muy Activo (trabajo físico o ejercicio intenso)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300">Define tu Meta</label>
                <div className="grid grid-cols-2 gap-3 mt-1.5">
                  <input id="targetWeight" name="targetWeight" type="number" required min="1" value={formData.targetWeight} onChange={handleChange} placeholder="Peso Objetivo (lbs)" className="block w-full px-3 py-2 bg-white/5 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white transition" />
                  <input id="targetTimeframe" name="targetTimeframe" type="number" required min="1" value={formData.targetTimeframe} onChange={handleChange} placeholder="Semanas" className="block w-full px-3 py-2 bg-white/5 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white transition" />
                </div>
              </div>

              <button type="submit" className="w-full justify-center !mt-8 text-base flex items-center bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:from-indigo-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-100">
                Calcular
              </button>
            </form>
          </div>
        </div>

        {/* Columna de Resultados */}
        <div className="min-h-[400px]">
          {!results ? (
            <div className="bg-gray-800/40 backdrop-blur-sm border border-white/10 shadow-2xl shadow-black/20 rounded-xl p-6 md:p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-indigo-400"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">Tus Resultados</h3>
              <p className="mt-2 text-gray-400">Completa el formulario para calcular tus necesidades calóricas.</p>
            </div>
          ) : (
            <div className="bg-gray-800/40 backdrop-blur-sm border border-white/10 shadow-2xl shadow-black/20 rounded-xl p-6 md:p-8 space-y-6 animate-fade-in">
              <div>
                <h3 className="text-2xl font-bold text-white">Tus Resultados Calculados</h3>
                <p className="mt-1 text-gray-400">Estos son los números clave para tu objetivo.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-500/20 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-orange-400"><path d="M12 22c-1.66 0-3-1.34-3-3 0-1.33 1.85-3.08 2.5-3.66.42-.37.42-.98 0-1.35-.65-.58-2.5-2.33-2.5-3.66 0-1.66 1.34-3 3-3s3 1.34 3 3c0 1.33-1.85 3.08-2.5 3.66-.42.37-.42.98 0 1.35.65.58 2.5 2.33 2.5 3.66 0 1.66-1.34 3-3 3z"></path><path d="M12 2a2.5 2.5 0 0 1 2.5 2.5c0 1.5-1.5 2.5-2.5 2.5S9.5 6 9.5 4.5A2.5 2.5 0 0 1 12 2z"></path></svg>
                    </div>
                    <p className="text-sm text-gray-300">Calorías de Mantenimiento</p>
                  </div>
                  <p className="mt-2 text-3xl font-bold text-white"><span>{results.tdee}</span> <span className="text-base font-normal text-gray-400">kcal/día</span></p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500/20 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-400"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                    </div>
                    <p className="text-sm text-gray-300">Calorías Objetivo</p>
                  </div>
                  <p className="mt-2 text-3xl font-bold text-white"><span>{results.targetCalories}</span> <span className="text-base font-normal text-gray-400">kcal/día</span></p>
                  {results.showWarning && (
                    <p className="mt-2 text-sm text-red-400">
                      Advertencia: Un plan de menos de 1200 calorías puede ser peligroso para la salud.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <footer className="text-center py-6 mt-8">
        <p className="text-sm text-gray-400">
          Solo para fines informativos. Consulta a un profesional de la salud.
        </p>
      </footer>
    </div>
  );
}