import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { Memoria } from '../types';

interface EditMemoryFormProps {
  memoria: Memoria;
  onSave: (memoria: Omit<Memoria, 'id' | 'idade'>) => void;
  onCancel: () => void;
}

const EditMemoryForm: React.FC<EditMemoryFormProps> = ({ memoria, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    data: memoria.data,
    titulo: memoria.titulo,
    descricao: memoria.descricao,
    local: memoria.local || '',
    categoria: memoria.categoria,
    fotos: memoria.fotos,
    videos: memoria.videos,
    itensMarkantes: memoria.itensMarkantes
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.data || !formData.titulo || !formData.descricao) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Editar Memória</h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data *
            </label>
            <input
              type="date"
              value={formData.data}
              onChange={(e) => setFormData(prev => ({ ...prev, data: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título *
            </label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) => setFormData(prev => ({ ...prev, titulo: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição *
            </label>
            <textarea
              value={formData.descricao}
              onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Local
            </label>
            <input
              type="text"
              value={formData.local}
              onChange={(e) => setFormData(prev => ({ ...prev, local: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria *
            </label>
            <select
              value={formData.categoria}
              onChange={(e) => setFormData(prev => ({ ...prev, categoria: e.target.value as any }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              required
            >
              <option value="marco">Marco</option>
              <option value="cotidiano">Cotidiano</option>
              <option value="especial">Especial</option>
              <option value="saude">Saúde</option>
              <option value="brincadeira">Brincadeira</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMemoryForm;