import React, { useState } from 'react';
import { X, Save, Plus, Trash2, Upload, Image, Video } from 'lucide-react';
import { Memoria } from '../types';

interface AddMemoryFormProps {
  onAdd: (memoria: Omit<Memoria, 'id' | 'idade'>) => void;
  onCancel: () => void;
}

const AddMemoryForm: React.FC<AddMemoryFormProps> = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    data: '',
    titulo: '',
    descricao: '',
    local: '',
    categoria: 'cotidiano' as const,
    fotos: [] as string[],
    videos: [] as string[],
    itensMarkantes: [] as string[]
  });

  const [novaFoto, setNovaFoto] = useState('');
  const [novoVideo, setNovoVideo] = useState('');
  const [novoItem, setNovoItem] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.data || !formData.titulo || !formData.descricao) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    onAdd(formData);
  };

  const adicionarFoto = () => {
    if (novaFoto.trim()) {
      setFormData(prev => ({
        ...prev,
        fotos: [...prev.fotos, novaFoto.trim()]
      }));
      setNovaFoto('');
    }
  };

  const removerFoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      fotos: prev.fotos.filter((_, i) => i !== index)
    }));
  };

  const adicionarVideo = () => {
    if (novoVideo.trim()) {
      setFormData(prev => ({
        ...prev,
        videos: [...prev.videos, novoVideo.trim()]
      }));
      setNovoVideo('');
    }
  };

  const removerVideo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }));
  };

  const adicionarItem = () => {
    if (novoItem.trim()) {
      setFormData(prev => ({
        ...prev,
        itensMarkantes: [...prev.itensMarkantes, novoItem.trim()]
      }));
      setNovoItem('');
    }
  };

  const removerItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      itensMarkantes: prev.itensMarkantes.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Nova Memória</h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coluna Esquerda - Informações Básicas */}
            <div className="space-y-4">
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
                  placeholder="Ex: Primeira palavra"
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
                  placeholder="Descreva este momento especial..."
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
                  placeholder="Ex: Casa da vovó"
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
            </div>

            {/* Coluna Direita - Mídia e Itens */}
            <div className="space-y-4">
              {/* Fotos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Image className="w-4 h-4 inline mr-1" />
                  Fotos
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={novaFoto}
                      onChange={(e) => setNovaFoto(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="URL da foto"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), adicionarFoto())}
                    />
                    <button
                      type="button"
                      onClick={adicionarFoto}
                      className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {formData.fotos.length > 0 && (
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {formData.fotos.map((foto, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <img
                            src={foto}
                            alt={`Foto ${index + 1}`}
                            className="w-10 h-10 object-cover rounded"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyNUMyMi43NjE0IDI1IDI1IDIyLjc2MTQgMjUgMjBDMjUgMTcuMjM4NiAyMi43NjE0IDE1IDIwIDE1QzE3LjIzODYgMTUgMTUgMTcuMjM4NiAxNSAyMEMxNSAyMi43NjE0IDE3LjIzODYgMjUgMjAgMjVaIiBmaWxsPSIjOUI5QkEwIi8+Cjwvc3ZnPgo=';
                            }}
                          />
                          <span className="flex-1 text-sm text-gray-600 truncate">{foto}</span>
                          <button
                            type="button"
                            onClick={() => removerFoto(index)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Vídeos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Video className="w-4 h-4 inline mr-1" />
                  Vídeos
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={novoVideo}
                      onChange={(e) => setNovoVideo(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="URL do vídeo"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), adicionarVideo())}
                    />
                    <button
                      type="button"
                      onClick={adicionarVideo}
                      className="px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {formData.videos.length > 0 && (
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {formData.videos.map((video, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <Video className="w-8 h-8 text-purple-500" />
                          <span className="flex-1 text-sm text-gray-600 truncate">{video}</span>
                          <button
                            type="button"
                            onClick={() => removerVideo(index)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Itens Marcantes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Itens Marcantes
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={novoItem}
                      onChange={(e) => setNovoItem(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Ex: Ursinho de pelúcia"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), adicionarItem())}
                    />
                    <button
                      type="button"
                      onClick={adicionarItem}
                      className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {formData.itensMarkantes.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.itensMarkantes.map((item, index) => (
                        <div key={index} className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          <span>{item}</span>
                          <button
                            type="button"
                            onClick={() => removerItem(index)}
                            className="p-0.5 text-green-600 hover:text-green-800"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-6 mt-6 border-t">
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
              Salvar Memória
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemoryForm;