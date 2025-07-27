import React, { useState, useEffect } from 'react';
import { Heart, Plus, Search, Loader } from 'lucide-react';
import { MemoriaService } from './services/memoriaService';
import { Memoria, FiltroMemoria } from './types';
import MemoryCard from './components/MemoryCard';
import MemoryModal from './components/MemoryModal';
import AddMemoryForm from './components/AddMemoryForm';
import EditMemoryForm from './components/EditMemoryForm';
import DeleteConfirmModal from './components/DeleteConfirmModal';

function App() {
  const [memoriasState, setMemoriasState] = useState<Memoria[]>([]);
  const [memoriasSelecionada, setMemoriaSelecionada] = useState<Memoria | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [memoriaEditando, setMemoriaEditando] = useState<Memoria | null>(null);
  const [memoriaDeletando, setMemoriaDeletando] = useState<Memoria | null>(null);
  const [deletando, setDeletando] = useState(false);
  const [filtros, setFiltros] = useState<FiltroMemoria>({});
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [estatisticas, setEstatisticas] = useState({
    totalMemorias: 0,
    totalMarcos: 0,
    totalFotos: 0,
    totalVideos: 0
  });

  // Carregar memórias do Supabase
  useEffect(() => {
    carregarMemorias();
    carregarEstatisticas();
  }, []);

  // Recarregar quando filtros mudarem
  useEffect(() => {
    carregarMemorias();
  }, [filtros, busca]);

  const carregarMemorias = async () => {
    try {
      setCarregando(true);
      const memorias = await MemoriaService.buscarMemorias({
        categoria: filtros.categoria,
        dataInicio: filtros.dataInicio,
        dataFim: filtros.dataFim,
        busca: busca || undefined
      });
      setMemoriasState(memorias);
    } catch (error) {
      console.error('Erro ao carregar memórias:', error);
    } finally {
      setCarregando(false);
    }
  };

  const carregarEstatisticas = async () => {
    try {
      const stats = await MemoriaService.obterEstatisticas();
      setEstatisticas(stats);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  const handleAdicionarMemoria = async (novaMemoria: Omit<Memoria, 'id' | 'idade'>) => {
    try {
      await MemoriaService.criarMemoria(novaMemoria);
      setMostrarFormulario(false);
      await carregarMemorias();
      await carregarEstatisticas();
    } catch (error) {
      console.error('Erro ao adicionar memória:', error);
      alert('Erro ao salvar memória. Tente novamente.');
    }
  };

  const handleEditarMemoria = async (memoriaAtualizada: Omit<Memoria, 'id' | 'idade'>) => {
    if (!memoriaEditando) return;

    try {
      await MemoriaService.atualizarMemoria(memoriaEditando.id, memoriaAtualizada);
      setMemoriaEditando(null);
      await carregarMemorias();
      await carregarEstatisticas();
      alert('Memória atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao editar memória:', error);
      alert('Erro ao atualizar memória. Tente novamente.');
    }
  };

  const handleDeletarMemoria = async () => {
    if (!memoriaDeletando) return;

    try {
      setDeletando(true);
      await MemoriaService.excluirMemoria(memoriaDeletando.id);
      setMemoriaDeletando(null);
      await carregarMemorias();
      await carregarEstatisticas();
      alert('Memória excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar memória:', error);
      alert('Erro ao excluir memória. Tente novamente.');
    } finally {
      setDeletando(false);
    }
  };

  const memoriasFiltradasEOrdenadas = memoriasState;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-pink-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Memórias da Maitê</h1>
            <Heart className="w-8 h-8 text-pink-500 ml-3" />
          </div>
          <p className="text-gray-600 text-lg">
            Registrando cada momento especial do crescimento da nossa princesa
          </p>
        </div>

        {/* Controles */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-8">
          <div className="flex flex-col gap-4">
            {/* Busca */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar memórias..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            {/* Filtros */}
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={filtros.categoria || ''}
                onChange={(e) => setFiltros(prev => ({ ...prev, categoria: e.target.value || undefined }))}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                title="Filtrar por categoria"
              >
                <option value="">Todas as categorias</option>
                <option value="marco">Marco</option>
                <option value="cotidiano">Cotidiano</option>
                <option value="especial">Especial</option>
                <option value="saude">Saúde</option>
                <option value="brincadeira">Brincadeira</option>
              </select>

              <button
                type="button"
                onClick={() => setMostrarFormulario(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Nova Memória</span>
                <span className="sm:hidden">Nova</span>
              </button>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 text-center">
            <div className="text-2xl md:text-3xl font-bold text-pink-500 mb-2">
              {estatisticas.totalMemorias}
            </div>
            <div className="text-gray-600 text-sm md:text-base">Total de Memórias</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 text-center">
            <div className="text-2xl md:text-3xl font-bold text-purple-500 mb-2">
              {estatisticas.totalMarcos}
            </div>
            <div className="text-gray-600 text-sm md:text-base">Marcos Importantes</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 text-center">
            <div className="text-2xl md:text-3xl font-bold text-blue-500 mb-2">
              {estatisticas.totalFotos}
            </div>
            <div className="text-gray-600 text-sm md:text-base">Fotos</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 text-center">
            <div className="text-2xl md:text-3xl font-bold text-green-500 mb-2">
              {estatisticas.totalVideos}
            </div>
            <div className="text-gray-600 text-sm md:text-base">Vídeos</div>
          </div>
        </div>

        {/* Lista de Memórias */}
        {carregando ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="w-8 h-8 animate-spin text-pink-500 mr-3" />
            <span className="text-gray-600">Carregando memórias...</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {memoriasFiltradasEOrdenadas.map(memoria => (
                <MemoryCard
                  key={memoria.id}
                  memoria={memoria}
                  onClick={() => setMemoriaSelecionada(memoria)}
                  onEdit={() => setMemoriaEditando(memoria)}
                  onDelete={() => setMemoriaDeletando(memoria)}
                />
              ))}
            </div>

            {memoriasFiltradasEOrdenadas.length === 0 && !carregando && (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Nenhuma memória encontrada
                </h3>
                <p className="text-gray-500">
                  Tente ajustar os filtros ou adicione uma nova memória
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modais */}
      {memoriasSelecionada && (
        <MemoryModal
          memoria={memoriasSelecionada}
          isOpen={!!memoriasSelecionada}
          onClose={() => setMemoriaSelecionada(null)}
          onUpdate={async () => {
            await carregarMemorias();
            await carregarEstatisticas();
            // Atualizar a memória selecionada com os novos dados
            if (memoriasSelecionada) {
              const memoriaAtualizada = await MemoriaService.buscarMemoriaPorId(memoriasSelecionada.id);
              if (memoriaAtualizada) {
                setMemoriaSelecionada(memoriaAtualizada);
              }
            }
          }}
        />
      )}

      {mostrarFormulario && (
        <AddMemoryForm
          onAdd={handleAdicionarMemoria}
          onCancel={() => setMostrarFormulario(false)}
        />
      )}

      {memoriaEditando && (
        <EditMemoryForm
          memoria={memoriaEditando}
          onSave={handleEditarMemoria}
          onCancel={() => setMemoriaEditando(null)}
        />
      )}

      {memoriaDeletando && (
        <DeleteConfirmModal
          memoria={memoriaDeletando}
          isOpen={!!memoriaDeletando}
          onConfirm={handleDeletarMemoria}
          onCancel={() => setMemoriaDeletando(null)}
          isDeleting={deletando}
        />
      )}
    </div>
  );
}

export default App;