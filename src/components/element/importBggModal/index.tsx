import React from "react";
import Modal from "@/components/modal";
import I18N from "@/i18n";
import Icon from "@/components/icon";
import Thumbnail from "@/components/thumbnail";
import BadgeType from "@/components/badgeType";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";
import useImportBgg from "./useImportBgg";

const ImportBggModal = ({
  isOpen = false,
  onClose = () => {},
  onSuccess = () => {},
}) => {
  const {
    bggCollection,
    loadingBgg,
    errorBgg,
    selectedGames,
    toggleGame,
    handleImport,
    loadingPost,
    errorPost,
  } = useImportBgg({ onClose, onSuccess });

  const isProcessing = loadingBgg && bggCollection === null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md2" className="p-0">
      <div className="flex flex-col h-[80vh] sm:h-[600px]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Icon type="bgg" className="text-secondary text-2xl" />
            Importar colección de BGG
          </h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-white relative">
          <LoadingBox loading={isProcessing} min zIndex={10} />
          
          <div className={isProcessing ? "opacity-50 pointer-events-none" : ""}>
            <p className="text-gray-500 mb-6">
              Seleccioná los juegos que querés agregar a tu ludoteca. Se cargarán con <strong>falta de información</strong> para que luego puedas completar el tamaño de caja, edición e idioma.
            </p>

            <ErrorAlert error={errorBgg || errorPost} />

            {bggCollection && bggCollection.length === 0 && (
              <div className="text-center text-gray-500 py-10">
                No encontramos juegos en tu colección de BGG.
              </div>
            )}

            {bggCollection && bggCollection.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {bggCollection.map((game: any) => {
                  const isSelected = selectedGames.has(game.bgg_id);
                  return (
                    <div
                      key={game.bgg_id}
                      onClick={() => toggleGame(game.bgg_id)}
                      className={`flex items-center gap-4 p-3 border rounded-xl cursor-pointer transition-colors ${
                        isSelected
                          ? "border-primary bg-sky-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex-shrink-0 w-16 h-16">
                        <Thumbnail
                          elements={[{ thumbnail: game.thumbnail, name: game.primary_name }]}
                          className="rounded-lg w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <BadgeType size="compact" type="item" subtype={game.type} />
                        </div>
                        <h3 className="text-sm font-bold text-gray-800 truncate" title={game.primary_name}>
                          {game.primary_name}
                        </h3>
                        <div className="text-xs mt-1">
                          {game.version_name ? (
                            <span className="text-gray-500">
                              {game.version_name}
                              {game.version_language ? ` (${game.version_language})` : ""}
                              {game.version_publisher ? ` • ${game.version_publisher}` : ""}
                              {game.version_year ? ` • ${game.version_year}` : ""}
                            </span>
                          ) : (
                            <span className="text-red-500 font-medium">sin edición cargada</span>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0 pr-2">
                        <div
                          className={`w-6 h-6 rounded border flex items-center justify-center ${
                            isSelected ? "bg-primary border-primary text-white" : "border-gray-300"
                          }`}
                        >
                          {isSelected && <Icon type="check" className="text-sm" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
          <button
            type="button"
            className="border border-gray-400 text-gray-600 font-bold px-6 py-2 rounded-full hover:bg-gray-200 transition-colors"
            onClick={onClose}
            disabled={loadingPost}
          >
            <I18N id="btn.Cancel" />
          </button>
          <button
            type="button"
            className={`bg-primary text-white font-bold px-7 py-2 rounded-full hover:bg-sky-700 transition-colors flex items-center gap-2 ${
              selectedGames.size === 0 || loadingPost ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleImport}
            disabled={selectedGames.size === 0 || loadingPost}
          >
            {loadingPost ? <Icon type="loading" className="animate-spin" /> : null}
            Agregar {selectedGames.size} juego{selectedGames.size !== 1 ? "s" : ""}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ImportBggModal;
