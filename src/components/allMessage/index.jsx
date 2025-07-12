const AllMessage = () => {
  return (
    <div className="text-center border border-gray-500 bg-white p-5 rounded-xl shadow-lg mb-7 max-w-[400px] mx-auto">
      <h2 className="font-bold text-red-600 text-4xl">Atención:</h2>
      <p className="text-sm">Cambio de horario.</p>
      <p className="text-2xl">
        El evento presencial comenzará a las <strong>12:00hs.</strong>
      </p>
      <p className="italic">(Debido a temas de organización.)</p>
    </div>
  );
};
export default AllMessage;
