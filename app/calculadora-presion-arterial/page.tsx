'use client';

import { useState } from 'react';

// --- CONSTANTES Y LÓGICA ---
const BP_CATEGORIES = [
  { name: 'Crisis Hipertensiva', systolicMin: 180, diastolicMin: 120, colorClass: 'bg-red-700 text-white border-red-900', message: '¡Emergencia! Su presión arterial está peligrosamente alta. Busque atención médica de emergencia inmediatamente.' },
  { name: 'Hipertensión Etapa 2', systolicMin: 140, diastolicMin: 90, colorClass: 'bg-red-500 text-white border-red-700', message: 'Hipertensión Etapa 2. Se requiere tratamiento médico inmediato. Consulte a su médico.' },
  { name: 'Hipertensión Etapa 1', systolicMin: 130, systolicMax: 140, diastolicMin: 80, diastolicMax: 90, colorClass: 'bg-orange-500 text-white border-orange-700', message: 'Hipertensión Etapa 1. Es importante consultar a un médico para un plan de tratamiento y cambios en el estilo de vida.' },
  { name: 'Elevada', systolicMin: 120, systolicMax: 130, diastolicMax: 80, colorClass: 'bg-yellow-500 text-gray-900 border-yellow-700', message: 'Presión arterial elevada. Considere cambios en su estilo de vida saludable y monitoree su presión. Consulte a un médico.' },
  { name: 'Baja', systolicMax: 90, diastolicMax: 60, colorClass: 'bg-blue-500 text-white border-blue-700', message: 'Presión arterial baja (Hipotensión). Si experimenta síntomas como mareos o desmayos, consulte a un médico.' },
  { name: 'Normal', systolicMax: 120, diastolicMax: 80, colorClass: 'bg-green-500 text-white border-green-700', message: '¡Felicitaciones! Su presión arterial es normal y saludable. Mantenga un estilo de vida equilibrado.' },
  { name: 'Indefinida', colorClass: 'bg-gray-300 text-gray-800 border-gray-500', message: 'No fue posible determinar una categoría clara con los valores proporcionados. Revise sus entradas.' },
];

const AGE_BASED_BP_RECOMMENDATIONS = [
  { ageRange: '18-39 años', minSystolic: 90, maxSystolic: 120, minDiastolic: 60, maxDiastolic: 80 },
  { ageRange: '40-59 años', minSystolic: 100, maxSystolic: 130, minDiastolic: 60, maxDiastolic: 85 },
  { ageRange: '60+ años', minSystolic: 110, maxSystolic: 140, minDiastolic: 60, maxDiastolic: 90 },
];

const BP_INFO_TEXT = {
  title: 'Entendiendo su Presión Arterial',
  introduction: 'La presión arterial es la fuerza que ejerce la sangre contra las paredes de las arterias. Se mide en dos números: sistólica (la presión cuando su corazón late) y diastólica (la presión cuando su corazón descansa entre latidos).',
  categoriesTitle: 'Categorías de Presión Arterial (Según AHA/ACC):',
  categories: [
    { name: 'Normal', description: 'Menos de 120/80 mmHg. Considerada ideal para la mayoría de los adultos.' },
    { name: 'Elevada', description: 'Sistólica entre 120-129 mmHg Y diastólica menos de 80 mmHg. Puede avanzar a hipertensión si no se controla.' },
    { name: 'Hipertensión Etapa 1', description: 'Sistólica entre 130-139 mmHg O diastólica entre 80-89 mmHg. Requiere monitoreo y posibles cambios en el estilo de vida o medicación.' },
    { name: 'Hipertensión Etapa 2', description: 'Sistólica de 140 mmHg o más O diastólica de 90 mmHg o más. Requiere atención médica y, generalmente, medicación.' },
    { name: 'Crisis Hipertensiva', description: 'Sistólica mayor a 180 mmHg Y/O diastólica mayor a 120 mmHg. Es una emergencia médica y requiere atención inmediata.' },
    { name: 'Baja (Hipotensión)', description: 'Generalmente menos de 90/60 mmHg. No siempre es un problema, pero si causa síntomas como mareos, consulte a un médico.' },
  ],
  ageRecommendationTitle: 'Recomendaciones Generales de Presión Arterial por Edad:',
  ageRecommendationsIntro: 'Las siguientes son pautas generales. Su médico es la mejor fuente de información para sus necesidades individuales.',
  disclaimer: 'Esta herramienta es solo para fines informativos y no sustituye el consejo, diagnóstico o tratamiento médico profesional. Siempre consulte a su médico.'
};

type BPCategoryDefinition = typeof BP_CATEGORIES[number];
type AgeBasedBPRecommendation = typeof AGE_BASED_BP_RECOMMENDATIONS[number];

interface BPResult {
  systolic: number;
  diastolic: number;
  age: number;
  category: string;
  categoryDefinition: BPCategoryDefinition;
  idealRanges: AgeBasedBPRecommendation | null;
  comparisonMessage: string;
}

export default function CalculadoraPresionArterial() {
  const [systolic, setSystolic] = useState<string>('');
  const [diastolic, setDiastolic] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [errors, setErrors] = useState<{ systolic?: string; diastolic?: string; age?: string }>({});
  const [result, setResult] = useState<BPResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    const parsedSystolic = parseInt(systolic, 10);
    const parsedDiastolic = parseInt(diastolic, 10);
    const parsedAge = parseInt(age, 10);

    if (isNaN(parsedSystolic) || parsedSystolic <= 0 || parsedSystolic > 300) newErrors.systolic = 'Sistólica inválida (1-300 mmHg).';
    if (isNaN(parsedDiastolic) || parsedDiastolic <= 0 || parsedDiastolic > 200) newErrors.diastolic = 'Diastólica inválida (1-200 mmHg).';
    if (isNaN(parsedAge) || parsedAge < 1 || parsedAge > 120) newErrors.age = 'Edad inválida (1-120 años).';

    if (!newErrors.systolic && !newErrors.diastolic && parsedSystolic > 0 && parsedDiastolic > 0 && parsedSystolic <= parsedDiastolic) {
      newErrors.systolic = 'La sistólica debe ser mayor que la diastólica.';
      newErrors.diastolic = 'La diastólica debe ser menor que la sistólica.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getBpCategoryDefinition = (sys: number, dia: number): BPCategoryDefinition => {
    if (sys >= 180 || dia >= 120) return BP_CATEGORIES.find((cat) => cat.name === 'Crisis Hipertensiva')!;
    if (sys >= 140 || dia >= 90) return BP_CATEGORIES.find((cat) => cat.name === 'Hipertensión Etapa 2')!;
    if ((sys >= 130 && sys < 140) || (dia >= 80 && dia < 90)) return BP_CATEGORIES.find((cat) => cat.name === 'Hipertensión Etapa 1')!;
    if (sys >= 120 && sys < 130 && dia < 80) return BP_CATEGORIES.find((cat) => cat.name === 'Elevada')!;
    if (sys < 90 && dia < 60) return BP_CATEGORIES.find((cat) => cat.name === 'Baja')!;
    if (sys < 120 && dia < 80) return BP_CATEGORIES.find((cat) => cat.name === 'Normal')!;
    return BP_CATEGORIES.find((cat) => cat.name === 'Indefinida')!;
  };

  const getAgeBasedIdealRanges = (userAge: number): AgeBasedBPRecommendation | null => {
    if (userAge >= 18 && userAge <= 39) return AGE_BASED_BP_RECOMMENDATIONS[0];
    if (userAge >= 40 && userAge <= 59) return AGE_BASED_BP_RECOMMENDATIONS[1];
    if (userAge >= 60) return AGE_BASED_BP_RECOMMENDATIONS[2];
    return null;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      const parsedSys = parseInt(systolic, 10);
      const parsedDia = parseInt(diastolic, 10);
      const parsedAgeNum = parseInt(age, 10);

      const categoryDefinition = getBpCategoryDefinition(parsedSys, parsedDia);
      const idealRanges = getAgeBasedIdealRanges(parsedAgeNum);

      let comparisonMessage = 'Sus lecturas han sido procesadas.';
      if (idealRanges) {
        const sysWithin = parsedSys >= idealRanges.minSystolic && parsedSys <= idealRanges.maxSystolic;
        const diaWithin = parsedDia >= idealRanges.minDiastolic && parsedDia <= idealRanges.maxDiastolic;
        comparisonMessage = (sysWithin && diaWithin) 
          ? 'Sus lecturas están dentro del rango ideal para su edad.' 
          : 'Sus lecturas están fuera del rango ideal para su edad. Se recomienda monitoreo.';
      } else {
        comparisonMessage = 'No se encontraron recomendaciones de edad específicas para su edad.';
      }

      setResult({ systolic: parsedSys, diastolic: parsedDia, age: parsedAgeNum, category: categoryDefinition.name, categoryDefinition, idealRanges, comparisonMessage });
      setIsLoading(false);
    }, 800);
  };

  const handleClear = () => {
    setSystolic(''); setDiastolic(''); setAge(''); setErrors({}); setResult(null);
  };

  const toggleAccordion = (title: string) => {
    setOpenAccordion(openAccordion === title ? null : title);
  };

  const isFormValid = Object.keys(errors).length === 0 && systolic !== '' && diastolic !== '' && age !== '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="mb-10 text-center w-full max-w-7xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight drop-shadow-sm">Comparador de Presión Arterial</h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">Compare sus lecturas con los valores normales recomendados según su edad y reciba información útil.</p>
      </header>

      <main className="flex flex-col lg:flex-row items-start lg:items-stretch justify-center gap-8 w-full max-w-7xl mb-12">
        {/* Formulario */}
        <div className="flex-1 flex justify-center w-full lg:w-auto min-w-[320px]">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full border border-gray-200" aria-live="polite">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Ingrese sus Lecturas</h2>
            <form onSubmit={handleCalculate} className="space-y-4">
              <div>
                <label htmlFor="systolic" className="block text-sm font-medium text-gray-700">Presión Sistólica (mmHg)</label>
                <input type="number" id="systolic" value={systolic} onChange={(e) => setSystolic(e.target.value)} placeholder="Ej: 120" className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.systolic ? 'border-red-500' : 'border-gray-300'}`} min="1" max="300" />
                {errors.systolic && <p className="mt-1 text-red-500 text-xs italic">{errors.systolic}</p>}
              </div>
              <div>
                <label htmlFor="diastolic" className="block text-sm font-medium text-gray-700">Presión Diastólica (mmHg)</label>
                <input type="number" id="diastolic" value={diastolic} onChange={(e) => setDiastolic(e.target.value)} placeholder="Ej: 80" className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.diastolic ? 'border-red-500' : 'border-gray-300'}`} min="1" max="200" />
                {errors.diastolic && <p className="mt-1 text-red-500 text-xs italic">{errors.diastolic}</p>}
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Edad</label>
                <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Ej: 35" className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.age ? 'border-red-500' : 'border-gray-300'}`} min="1" max="120" />
                {errors.age && <p className="mt-1 text-red-500 text-xs italic">{errors.age}</p>}
              </div>
              <div className="flex gap-4">
                <button type="submit" disabled={!isFormValid || isLoading} className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200 ${!isFormValid || isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}>
                  {isLoading ? (
                    <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Calculando...</>
                  ) : 'Comparar Presión Arterial'}
                </button>
                <button type="button" onClick={handleClear} className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200">Limpiar</button>
              </div>
            </form>
          </div>
        </div>

        {/* Resultados */}
        <div className="flex-1 flex justify-center w-full lg:w-auto min-w-[320px]">
          {!result ? (
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full flex items-center justify-center text-gray-500 text-center text-lg italic border border-gray-200" style={{ minHeight: '300px' }}>Ingrese sus lecturas para ver el resultado aquí.</div>
          ) : (
            <div className={`relative p-6 rounded-lg shadow-xl w-full text-white transition-all duration-500 ease-in-out transform scale-100 ${result.categoryDefinition.colorClass}`} role="status" aria-live="assertive">
              <h2 className="text-2xl font-bold text-center mb-4 border-b pb-3 border-white border-opacity-30">Resultado de su Presión Arterial</h2>
              <div className="space-y-4">
                <p className="text-center text-3xl font-extrabold">{result.systolic}/{result.diastolic} <span className="text-lg font-normal">mmHg</span></p>
                <p className="text-center text-lg">Edad: <span className="font-semibold">{result.age}</span> años</p>
                <div className="text-center p-3 rounded-md bg-white bg-opacity-20 shadow-inner border border-white border-opacity-30">
                  <p className="text-xl font-bold">Categoría: {result.category}</p>
                  <p className="text-sm italic mt-1">{result.categoryDefinition.message}</p>
                </div>
                {result.idealRanges ? (
                  <div className="border-t pt-4 mt-4 border-white border-opacity-30">
                    <h3 className="text-xl font-semibold mb-2">Valores Ideales para su Edad ({result.idealRanges.ageRange})</h3>
                    <p className="text-lg">Sistólica: {result.idealRanges.minSystolic}-{result.idealRanges.maxSystolic} mmHg</p>
                    <p className="text-lg">Diastólica: {result.idealRanges.minDiastolic}-{result.idealRanges.maxDiastolic} mmHg</p>
                    <p className="mt-3 text-base italic leading-relaxed font-light">{result.comparisonMessage}</p>
                  </div>
                ) : (
                  <div className="border-t pt-4 mt-4 border-white border-opacity-30 text-center text-sm italic">
                    <p>No se encontraron recomendaciones de edad específicas para su edad. Consulte a un médico.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Sección Informativa */}
      <footer className="w-full max-w-4xl px-4 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full border border-gray-200 mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{BP_INFO_TEXT.title}</h2>
          <p className="mb-6 text-gray-700 leading-relaxed">{BP_INFO_TEXT.introduction}</p>
          
          <div className="border-b border-gray-200 last:border-b-0 mb-4">
            <h3 className="text-lg font-semibold">
              <button className="flex justify-between items-center w-full py-4 text-left text-gray-800 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={() => toggleAccordion(BP_INFO_TEXT.categoriesTitle)} aria-expanded={openAccordion === BP_INFO_TEXT.categoriesTitle}>
                {BP_INFO_TEXT.categoriesTitle}
                <svg className={`w-5 h-5 transition-transform duration-200 ${openAccordion === BP_INFO_TEXT.categoriesTitle ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
            </h3>
            {openAccordion === BP_INFO_TEXT.categoriesTitle && (
              <div className="overflow-hidden transition-all duration-300 ease-in-out max-h-screen opacity-100 py-2">
                <ul className="list-disc pl-5 space-y-2 text-gray-700 pb-4">
                  {BP_INFO_TEXT.categories.map((category, idx) => (<li key={idx}><span className="font-semibold">{category.name}:</span> {category.description}</li>))}
                </ul>
              </div>
            )}
          </div>

          <div className="border-b border-gray-200 last:border-b-0 mb-4">
            <h3 className="text-lg font-semibold">
              <button className="flex justify-between items-center w-full py-4 text-left text-gray-800 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={() => toggleAccordion(BP_INFO_TEXT.ageRecommendationTitle)} aria-expanded={openAccordion === BP_INFO_TEXT.ageRecommendationTitle}>
                {BP_INFO_TEXT.ageRecommendationTitle}
                <svg className={`w-5 h-5 transition-transform duration-200 ${openAccordion === BP_INFO_TEXT.ageRecommendationTitle ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
            </h3>
            {openAccordion === BP_INFO_TEXT.ageRecommendationTitle && (
              <div className="overflow-hidden transition-all duration-300 ease-in-out max-h-screen opacity-100 py-2">
                <p className="mb-4 text-gray-700 pb-2">{BP_INFO_TEXT.ageRecommendationsIntro}</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 pb-4">
                  {AGE_BASED_BP_RECOMMENDATIONS.map((rec, idx) => (<li key={idx}><span className="font-semibold">{rec.ageRange}:</span> Sistólica {rec.minSystolic}-{rec.maxSystolic} mmHg, Diastólica {rec.minDiastolic}-{rec.maxDiastolic} mmHg.</li>))}
                </ul>
              </div>
            )}
          </div>

          <p className="mt-8 text-sm text-gray-600 italic border-t pt-4 border-gray-200">{BP_INFO_TEXT.disclaimer}</p>
        </div>
      </footer>
    </div>
  );
}