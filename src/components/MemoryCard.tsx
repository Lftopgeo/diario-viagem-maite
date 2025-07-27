import React from 'react';
import { Calendar, MapPin, Edit, Trash2, Heart } from 'lucide-react';
import { Memoria } from '../types';
import { formatarData, formatarIdade } from '../utils/dateUtils';

interface MemoryCardProps {
  memoria: Memoria;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memoria, onClick, onEdit, onDelete }) => {
  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'marco': return 'bg-red-100 text-red-800';
      case 'cotidiano': return 'bg-blue-100 text-blue-800';
      case 'especial': return 'bg-purple-100 text-purple-800';
      case 'saude': return 'bg-green-100 text-green-800';
      case 'brincadeira': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoriaLabel = (categoria: string) => {
    switch (categoria) {
      case 'marco': return 'Marco';
      case 'cotidiano': return 'Cotidiano';
      case 'especial': return 'Especial';
      case 'saude': return 'Saúde';
      case 'brincadeira': return 'Brincadeira';
      default: return categoria;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      {/* Imagem de capa */}
      <div className="relative h-48 bg-gradient-to-br from-pink-100 to-purple-100">
        {memoria.capa ? (
          <img
            src={memoria.capa}
            alt={memoria.titulo}
            className="w-full h-full object-cover"
            onClick={onClick}
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center"
            onClick={onClick}
          >
            <Heart className="w-12 h-12 text-pink-300" />
          </div>
        )}
        
        {/* Categoria badge */}
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoriaColor(memoria.categoria)}`}>
            {getCategoriaLabel(memoria.categoria)}
          </span>
        </div>

        {/* Botões de ação */}
        <div className="absolute top-2 right-2 flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="p-1.5 bg-white/80 hover:bg-white rounded-full transition-colors"
            title="Editar memória"
          >
            <Edit className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1.5 bg-white/80 hover:bg-white rounded-full transition-colors"
            title="Excluir memória"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-4" onClick={onClick}>
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
          {memoria.titulo}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {memoria.descricao}
        </p>

        {/* Informações */}
        <div className="space-y-2 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{formatarData(memoria.data)}</span>
          </div>
          
          {memoria.local && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{memoria.local}</span>
            </div>
          )}
          
          <div className="flex items-center gap-1">
            <Heart className="w-3 h-3" />
            <span>{formatarIdade(memoria.idade)}</span>
          </div>
        </div>

        {/* Contadores */}
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
          <div className="flex gap-3 text-xs text-gray-500">
            {memoria.fotos.length > 0 && (
              <span>{memoria.fotos.length} foto{memoria.fotos.length > 1 ? 's' : ''}</span>
            )}
            {memoria.videos.length > 0 && (
              <span>{memoria.videos.length} vídeo{memoria.videos.length > 1 ? 's' : ''}</span>
            )}
          </div>
          
          {memoria.itensMarkantes.length > 0 && (
            <div className="text-xs text-gray-500">
              {memoria.itensMarkantes.length} item{memoria.itensMarkantes.length > 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;