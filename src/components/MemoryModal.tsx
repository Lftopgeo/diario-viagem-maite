import React from 'react';
import { X } from 'lucide-react';
import { Memoria } from '../types';

interface MemoryModalProps {
  memoria: Memoria;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const MemoryModal: React.FC<MemoryModalProps> = ({ memoria, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{memoria.titulo}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4">
          <p className="text-gray-600 mb-4">{memoria.descricao}</p>
          
          {memoria.fotos.length > 0 && (
            <div className="mb-4">
              <h3 className="font-medium mb-2">Fotos</h3>
              <div className="grid grid-cols-2 gap-2">
                {memoria.fotos.map((foto, index) => (
                  <img
                    key={index}
                    src={foto}
                    alt={`Foto ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          )}
          
          {memoria.itensMarkantes.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Itens Marcantes</h3>
              <div className="flex flex-wrap gap-2">
                {memoria.itensMarkantes.map((item, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemoryModal;