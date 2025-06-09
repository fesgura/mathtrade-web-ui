const MobileWarning = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center p-4">
      <svg className="w-16 h-16 text-gray-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Visualización no disponible en móvil
      </h2>
      <p className="text-gray-600 max-w-md">
        Para una mejor experiencia, por favor accede a esta herramienta desde una pantalla más grande, como una tablet en modo horizontal o una computadora de escritorio.
      </p>
    </div>
  );
};

export default MobileWarning;