'use client';

import { useState } from 'react';

// --- LÓGICA DE CÁLCULO FRAMINGHAM ---
const getPointsFromRanges = (value: number, ranges: number[][]) => {
  for (const range of ranges) {
    if (value >= range[0] && value <= range[1]) return range[2];
  }
  return 0;
};

const maleAgePoints = [[20, 34, -9], [35, 39, -4], [40, 44, 0], [45, 49, 3], [50, 54, 6], [55, 59, 8], [60, 64, 10], [65, 69, 11], [70, 74, 12], [75, 79, 13]];
const maleCholPoints = (age: number, totalCholesterol: number) => {
  const ranges = age <= 39 ? [[160, 199, 4], [200, 239, 7], [240, 279, 9], [280, Infinity, 11]] :
                 age <= 49 ? [[160, 199, 3], [200, 239, 5], [240, 279, 6], [280, Infinity, 8]] :
                 age <= 59 ? [[160, 199, 2], [200, 239, 3], [240, 279, 4], [280, Infinity, 5]] :
                 age <= 69 ? [[160, 199, 1], [200, 239, 1], [240, 279, 2], [280, Infinity, 3]] :
                             [[160, 199, 0], [200, 239, 0], [240, 279, 1], [280, Infinity, 1]];
  return getPointsFromRanges(totalCholesterol, ranges as number[][]);
};
const maleSmokerPoints = (age: number) => getPointsFromRanges(age, [[20, 39, 8], [40, 49, 5], [50, 59, 3], [60, 69, 1], [70, 79, 1]]);
const maleHdlPoints = [[60, Infinity, -1], [50, 59, 0], [40, 49, 1], [0, 39, 2]];
const maleSbpPoints = (treated: boolean, sbp: number) => {
  if (sbp < 120) return 0;
  const ranges = treated ? [[120, 129, 1], [130, 139, 2], [140, 159, 2], [160, Infinity, 3]] : [[120, 129, 0], [130, 139, 1], [140, 159, 1], [160, Infinity, 2]];
  return getPointsFromRanges(sbp, ranges as number[][]);
};
const maleRiskPercentages = new Map([[-100, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 2], [6, 2], [7, 3], [8, 4], [9, 5], [10, 6], [11, 8], [12, 10], [13, 12], [14, 16], [15, 20], [16, 25], [17, 30]]);

const femaleAgePoints = [[20, 34, -7], [35, 39, -3], [40, 44, 0], [45, 49, 3], [50, 54, 6], [55, 59, 8], [60, 64, 10], [65, 69, 12], [70, 74, 14], [75, 79, 16]];
const femaleCholPoints = (age: number, totalCholesterol: number) => {
  const ranges = age <= 39 ? [[160, 199, 4], [200, 239, 8], [240, 279, 11], [280, Infinity, 13]] :
                   age <= 49 ? [[160, 199, 3], [200, 239, 6], [240, 279, 8], [280, Infinity, 10]] :
                   age <= 59 ? [[160, 199, 2], [200, 239, 4], [240, 279, 5], [280, Infinity, 7]] :
                   age <= 69 ? [[160, 199, 1], [200, 239, 2], [240, 279, 3], [280, Infinity, 4]] :
                               [[160, 199, 1], [200, 239, 1], [240, 279, 2], [280, Infinity, 2]];
  return getPointsFromRanges(totalCholesterol, ranges as number[][]);
};
const femaleSmokerPoints = (age: number) => getPointsFromRanges(age, [[20, 39, 9], [40, 49, 7], [50, 59, 4], [60, 69, 2], [70, 79, 1]]);
const femaleHdlPoints = [[60, Infinity, -1], [50, 59, 0], [40, 49, 1], [0, 39, 2]];
const femaleSbpPoints = (treated: boolean, sbp: number) => {
  if (sbp < 120) return 0;
  const ranges = treated ? [[120, 129, 3], [130, 139, 4], [140, 159, 5], [160, Infinity, 6]] : [[120, 129, 1], [130, 139, 2], [140, 159, 3], [160, Infinity, 4]];
  return getPointsFromRanges(sbp, ranges as number[][]);
};
const femaleRiskPercentages = new Map([[-100, 0], [9, 1], [10, 1], [11, 1], [12, 1], [13, 2], [14, 2], [15, 3], [16, 4], [17, 5], [18, 6], [19, 8], [20, 11], [21, 14], [22, 17], [23, 22], [24, 27], [25, 30]]);

const calculatePoints = (data: any) => {
  let points = 0;
  const { gender, age, totalCholesterol, hdlCholesterol, systolicBP, isSmoker, isTreatedForHypertension } = data;
  if (gender === 'male') {
    points += getPointsFromRanges(age, maleAgePoints);
    points += maleCholPoints(age, totalCholesterol);
    points += getPointsFromRanges(hdlCholesterol, maleHdlPoints);
    points += maleSbpPoints(isTreatedForHypertension, systolicBP);
    if (isSmoker) points += maleSmokerPoints(age);
  } else {
    points += getPointsFromRanges(age, femaleAgePoints);
    points += femaleCholPoints(age, totalCholesterol);
    points += getPointsFromRanges(hdlCholesterol, femaleHdlPoints);
    points += femaleSbpPoints(isTreatedForHypertension, systolicBP);
    if (isSmoker) points += femaleSmokerPoints(age);
  }
  return points;
};

const getRiskInfo = (points: number, gender: string) => {
  const map = gender === 'male' ? maleRiskPercentages : femaleRiskPercentages;
  const riskPoints = Array.from(map.keys()).sort((a, b) => a - b);
  let percentage = 0;
  if (points < riskPoints[0]) {
    percentage = map.get(riskPoints[0]) ?? 0;
  } else if (points > riskPoints[riskPoints.length - 1]) {
    percentage = map.get(riskPoints[riskPoints.length - 1]) ?? 30;
  } else {
    percentage = map.get(points) ?? 0;
    if (percentage === 0) {
      const lowerBound = Math.max(...riskPoints.filter(p => p < points));
      percentage = map.get(lowerBound) ?? 0;
    }
  }
  percentage = Math.max(0, percentage);
  let category = (percentage >= 20) ? 'Alto' : (percentage >= 5) ? 'Intermedio' : 'Bajo';
  return { percentage, category };
};

const getRecommendations = (data: any, percentage: number, category: string) => {
  if (category === 'Bajo') {
    return `¡Buenas noticias! Tu riesgo cardiovascular a 10 años del **${percentage}%** se considera **Bajo**. Este es un excelente punto de partida. ¡Sigue así!\n\n**Recomendaciones de Estilo de Vida:**\n* **Dieta y Nutrición:** Continúa con una dieta rica en frutas, verduras y granos integrales.\n* **Actividad Física:** Mantén tu rutina de ejercicio regular (al menos 150 minutos de actividad moderada por semana).\n* **Manejo del Estrés:** Incorpora técnicas de relajación como la meditación o pasatiempos que disfrutes.`;
  }
  if (category === 'Intermedio') {
    return `Tu resultado del **${percentage}%** te sitúa en la categoría de riesgo **Intermedio**. Esto es una oportunidad para tomar el control de tu salud cardíaca.${data.isSmoker ? ' **Dejar de fumar es el cambio más impactante que puedes hacer.**' : ''}\n\n**Recomendaciones Accionables:**\n* **Dieta y Nutrición:** Aumenta la ingesta de fibra (avena, frutas) y grasas saludables (aguacate, nueces). Reduce el consumo de sal.\n* **Actividad Física:** Intenta realizar al menos 150 minutos de ejercicio moderado a la semana.\n* **Manejo de la Presión Arterial:** Reduce la sal y practica técnicas de manejo del estrés.`;
  }
  if (category === 'Alto') {
    return `Tu resultado del **${percentage}%** está en la categoría de riesgo **Alto**. Es muy importante que **consultes a un médico** para discutir estos resultados y crear un plan de salud personalizado.${data.isSmoker ? ' **Dejar de fumar inmediatamente es la acción más poderosa que puedes tomar.**' : ''}\n\n**Recomendaciones Accionables:**\n* **Consulta Médica:** Programa una cita con tu médico. Es el paso más importante.\n* **Dieta y Nutrición:** Adopta una dieta cardiosaludable como la dieta DASH o Mediterránea.\n* **Actividad Física:** Bajo supervisión médica, comienza un programa de ejercicio regular, empezando poco a poco.`;
  }
  return "No pudimos generar recomendaciones. Céntrate en una dieta equilibrada, ejercicio regular y evitar fumar.";
};

const renderMarkdown = (text: string) => {
  const lines = text.split('\n');
  let html = '';
  let inList = false;
  lines.forEach(line => {
    line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    if (line.trim().startsWith('* ')) {
      if (!inList) {
        html += '<ul class="list-disc pl-5 space-y-1">';
        inList = true;
      }
      html += `<li>${line.trim().substring(2)}</li>`;
    } else {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      if (line.trim()) {
        html += `<p class="mb-2">${line}</p>`;
      }
    }
  });
  if (inList) html += '</ul>';
  return html;
};

export default function CalculadoraRiesgo() {
  const [formData, setFormData] = useState({
    age: 40,
    gender: 'female' as 'male' | 'female',
    totalCholesterol: 200,
    hdlCholesterol: 50,
    systolicBP: 120,
    isSmoker: false,
    isTreatedForHypertension: false,
  });

  const [result, setResult] = useState<{ points: number; percentage: number; category: string; recommendations: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = () => {
    setIsLoading(true);
    setTimeout(() => {
      const points = calculatePoints(formData);
      const { percentage, category } = getRiskInfo(points, formData.gender);
      const recommendations = getRecommendations(formData, percentage, category);
      setResult({ points, percentage, category, recommendations });
      setIsLoading(false);
    }, 500);
  };

  const handleReset = () => {
    setResult(null);
  };

  const styles = result ? {
    'Bajo': { textColor: 'text-green-600', bgColor: 'bg-green-100', borderColor: 'border-green-500', progressColor: 'bg-green-500' },
    'Intermedio': { textColor: 'text-yellow-600', bgColor: 'bg-yellow-100', borderColor: 'border-yellow-500', progressColor: 'bg-yellow-500' },
    'Alto': { textColor: 'text-red-600', bgColor: 'bg-red-100', borderColor: 'border-red-500', progressColor: 'bg-red-500' }
  }[result.category] : null;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <svg className="w-10 h-10 text-red-500" fill="currentColor" strokeWidth="1.5" stroke="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h1 className="text-3xl font-bold text-gray-900">Calculadora de Riesgo Cardiovascular</h1>
          </div>
          <p className="text-md text-gray-600 max-w-2xl mx-auto">
            Estima tu riesgo de enfermedad cardíaca a 10 años y obtén consejos personalizados para mejorar tu salud.
          </p>
        </header>

        <main className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          {!result ? (
            <div className="animate-fade-in">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Tu Perfil de Salud</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                
                <div className="py-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Género</label>
                  <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                    <button onClick={() => setFormData({...formData, gender: 'female'})} className={`flex-1 py-2 px-4 text-sm font-semibold focus:outline-none transition-colors duration-200 ${formData.gender === 'female' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>Mujer</button>
                    <button onClick={() => setFormData({...formData, gender: 'male'})} className={`flex-1 py-2 px-4 text-sm font-semibold focus:outline-none transition-colors duration-200 ${formData.gender === 'male' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>Hombre</button>
                  </div>
                </div>

                <div className="py-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Edad</label>
                  <div className="flex items-center gap-4">
                    <input type="range" min="20" max="79" step="1" value={formData.age} onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                    <input type="number" min="20" max="79" value={formData.age} onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 20})} className="w-20 p-2 border border-gray-300 rounded-md text-center" />
                  </div>
                </div>

                <div className="py-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Colesterol Total <span className="text-gray-500">(mg/dL)</span></label>
                  <div className="flex items-center gap-4">
                    <input type="range" min="100" max="400" step="1" value={formData.totalCholesterol} onChange={(e) => setFormData({...formData, totalCholesterol: parseInt(e.target.value)})} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                    <input type="number" min="100" max="400" value={formData.totalCholesterol} onChange={(e) => setFormData({...formData, totalCholesterol: parseInt(e.target.value) || 100})} className="w-20 p-2 border border-gray-300 rounded-md text-center" />
                  </div>
                </div>

                <div className="py-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Colesterol HDL <span className="text-gray-500">(mg/dL)</span></label>
                  <div className="flex items-center gap-4">
                    <input type="range" min="20" max="100" step="1" value={formData.hdlCholesterol} onChange={(e) => setFormData({...formData, hdlCholesterol: parseInt(e.target.value)})} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                    <input type="number" min="20" max="100" value={formData.hdlCholesterol} onChange={(e) => setFormData({...formData, hdlCholesterol: parseInt(e.target.value) || 20})} className="w-20 p-2 border border-gray-300 rounded-md text-center" />
                  </div>
                </div>

                <div className="py-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Presión Arterial Sistólica <span className="text-gray-500">(mmHg)</span></label>
                  <div className="flex items-center gap-4">
                    <input type="range" min="80" max="200" step="1" value={formData.systolicBP} onChange={(e) => setFormData({...formData, systolicBP: parseInt(e.target.value)})} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                    <input type="number" min="80" max="200" value={formData.systolicBP} onChange={(e) => setFormData({...formData, systolicBP: parseInt(e.target.value) || 80})} className="w-20 p-2 border border-gray-300 rounded-md text-center" />
                  </div>
                </div>

                <div className="py-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">¿Toma medicación para la presión?</label>
                  <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                    <button onClick={() => setFormData({...formData, isTreatedForHypertension: false})} className={`flex-1 py-2 px-4 text-sm font-semibold focus:outline-none transition-colors duration-200 ${!formData.isTreatedForHypertension ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>No</button>
                    <button onClick={() => setFormData({...formData, isTreatedForHypertension: true})} className={`flex-1 py-2 px-4 text-sm font-semibold focus:outline-none transition-colors duration-200 ${formData.isTreatedForHypertension ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>Sí</button>
                  </div>
                </div>

                <div className="py-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">¿Fumas?</label>
                  <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                    <button onClick={() => setFormData({...formData, isSmoker: false})} className={`flex-1 py-2 px-4 text-sm font-semibold focus:outline-none transition-colors duration-200 ${!formData.isSmoker ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>No</button>
                    <button onClick={() => setFormData({...formData, isSmoker: true})} className={`flex-1 py-2 px-4 text-sm font-semibold focus:outline-none transition-colors duration-200 ${formData.isSmoker ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>Sí</button>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t">
                <button onClick={handleCalculate} disabled={isLoading} className="w-full flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" stroke="currentColor"></circle>
                        <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
                      </svg>
                      Calculando...
                    </>
                  ) : 'Calcular Mi Riesgo'}
                </button>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Tu Riesgo Cardiovascular a 10 Años</h2>
              <div className={`p-6 rounded-xl border-2 text-center ${styles?.borderColor} ${styles?.bgColor}`}>
                <div className={`text-5xl font-bold ${styles?.textColor}`}>{result.percentage}%</div>
                <div className={`mt-2 text-lg font-semibold ${styles?.textColor}`}>Riesgo {result.category}</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                  <div className={`h-2.5 rounded-full ${styles?.progressColor}`} style={{ width: `${Math.min(result.percentage, 100)}%` }}></div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6 text-yellow-500" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-11.628 6.01 6.01 0 00-1.5-11.628 6.01 6.01 0 00-1.5 11.628m1.5 11.628L9 18.75m3-5.25L15 18.75m-3-5.25V5.25m0 0a3 3 0 100 6 3 3 0 000-6z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Recomendaciones Personalizadas
                </h3>
                <div className="prose prose-sm max-w-none text-gray-700 bg-gray-50 p-4 rounded-lg" dangerouslySetInnerHTML={{ __html: renderMarkdown(result.recommendations) }} />
              </div>

              <div className="mt-8 pt-6 border-t text-center">
                <button onClick={handleReset} className="bg-gray-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200">
                  Calcular de Nuevo
                </button>
              </div>
            </div>
          )}

          <footer className="mt-8 text-center text-xs text-gray-500">
            <p className="font-semibold">Descargo de responsabilidad:</p>
            <p>Esta herramienta proporciona una estimación solo con fines informativos y no sustituye el consejo, diagnóstico o tratamiento médico profesional. Consulta a un proveedor de atención médica para cualquier problema de salud.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}