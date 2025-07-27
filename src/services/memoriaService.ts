import { supabase } from '../lib/supabase';
import { Memoria } from '../types';
import { calcularIdade } from '../utils/dateUtils';

export class MemoriaService {
  // Buscar todas as memórias com filtros
  static async buscarMemorias(filtros?: {
    categoria?: string;
    dataInicio?: string;
    dataFim?: string;
    busca?: string;
  }): Promise<Memoria[]> {
    try {
      let query = supabase
        .from('memorias')
        .select(`
          *,
          fotos (*),
          videos (*),
          itens_marcantes (*)
        `);

      if (filtros?.categoria) {
        query = query.eq('categoria', filtros.categoria);
      }

      if (filtros?.dataInicio) {
        query = query.gte('data', filtros.dataInicio);
      }

      if (filtros?.dataFim) {
        query = query.lte('data', filtros.dataFim);
      }

      if (filtros?.busca) {
        query = query.or(`titulo.ilike.%${filtros.busca}%,descricao.ilike.%${filtros.busca}%`);
      }

      const { data, error } = await query.order('data', { ascending: false });

      if (error) throw error;

      return (data || []).map(this.mapearMemoriaCompleta);
    } catch (error) {
      console.error('Erro ao buscar memórias:', error);
      return [];
    }
  }

  // Buscar uma memória específica
  static async buscarMemoriaPorId(id: string): Promise<Memoria | null> {
    try {
      const { data, error } = await supabase
        .from('memorias')
        .select(`
          *,
          fotos (*),
          videos (*),
          itens_marcantes (*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) return null;

      return this.mapearMemoriaCompleta(data);
    } catch (error) {
      console.error('Erro ao buscar memória:', error);
      throw error;
    }
  }

  // Criar nova memória
  static async criarMemoria(memoria: Omit<Memoria, 'id' | 'idade'>): Promise<Memoria> {
    try {
      const idade = calcularIdade(memoria.data);
      
      const { data: memoriaData, error: memoriaError } = await supabase
        .from('memorias')
        .insert({
          data: memoria.data,
          titulo: memoria.titulo,
          descricao: memoria.descricao,
          local: memoria.local,
          categoria: memoria.categoria,
          idade_anos: idade.anos,
          idade_meses: idade.meses,
          idade_dias: idade.dias
        })
        .select()
        .single();

      if (memoriaError) throw memoriaError;

      // Inserir fotos
      if (memoria.fotos.length > 0) {
        const fotosData = memoria.fotos.map(url => ({
          memoria_id: memoriaData.id,
          url
        }));

        const { error: fotosError } = await supabase
          .from('fotos')
          .insert(fotosData);

        if (fotosError) throw fotosError;
      }

      // Inserir vídeos
      if (memoria.videos.length > 0) {
        const videosData = memoria.videos.map(url => ({
          memoria_id: memoriaData.id,
          url
        }));

        const { error: videosError } = await supabase
          .from('videos')
          .insert(videosData);

        if (videosError) throw videosError;
      }

      // Inserir itens marcantes
      if (memoria.itensMarkantes.length > 0) {
        const itensData = memoria.itensMarkantes.map(nome => ({
          memoria_id: memoriaData.id,
          nome
        }));

        const { error: itensError } = await supabase
          .from('itens_marcantes')
          .insert(itensData);

        if (itensError) throw itensError;
      }

      return await this.buscarMemoriaPorId(memoriaData.id) as Memoria;
    } catch (error) {
      console.error('Erro ao criar memória:', error);
      throw error;
    }
  }

  // Atualizar memória
  static async atualizarMemoria(id: string, memoria: Omit<Memoria, 'id' | 'idade'>): Promise<void> {
    try {
      const idade = calcularIdade(memoria.data);
      
      const { error: memoriaError } = await supabase
        .from('memorias')
        .update({
          data: memoria.data,
          titulo: memoria.titulo,
          descricao: memoria.descricao,
          local: memoria.local,
          categoria: memoria.categoria,
          idade_anos: idade.anos,
          idade_meses: idade.meses,
          idade_dias: idade.dias
        })
        .eq('id', id);

      if (memoriaError) throw memoriaError;

      // Atualizar fotos (remover todas e inserir novas)
      await supabase.from('fotos').delete().eq('memoria_id', id);
      
      if (memoria.fotos.length > 0) {
        const fotosData = memoria.fotos.map(url => ({
          memoria_id: id,
          url
        }));

        const { error: fotosError } = await supabase
          .from('fotos')
          .insert(fotosData);

        if (fotosError) throw fotosError;
      }

      // Atualizar vídeos
      await supabase.from('videos').delete().eq('memoria_id', id);
      
      if (memoria.videos.length > 0) {
        const videosData = memoria.videos.map(url => ({
          memoria_id: id,
          url
        }));

        const { error: videosError } = await supabase
          .from('videos')
          .insert(videosData);

        if (videosError) throw videosError;
      }

      // Atualizar itens marcantes
      await supabase.from('itens_marcantes').delete().eq('memoria_id', id);
      
      if (memoria.itensMarkantes.length > 0) {
        const itensData = memoria.itensMarkantes.map(nome => ({
          memoria_id: id,
          nome
        }));

        const { error: itensError } = await supabase
          .from('itens_marcantes')
          .insert(itensData);

        if (itensError) throw itensError;
      }
    } catch (error) {
      console.error('Erro ao atualizar memória:', error);
      throw error;
    }
  }

  // Excluir memória
  static async excluirMemoria(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('memorias')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Erro ao excluir memória:', error);
      throw error;
    }
  }

  // Obter estatísticas
  static async obterEstatisticas() {
    try {
      const { data: memorias, error: memoriasError } = await supabase
        .from('memorias')
        .select('categoria');

      const { data: fotos, error: fotosError } = await supabase
        .from('fotos')
        .select('id');

      const { data: videos, error: videosError } = await supabase
        .from('videos')
        .select('id');

      if (memoriasError) throw memoriasError;
      if (fotosError) throw fotosError;
      if (videosError) throw videosError;

      const totalMarcos = memorias?.filter(m => m.categoria === 'marco').length || 0;

      return {
        totalMemorias: memorias?.length || 0,
        totalMarcos,
        totalFotos: fotos?.length || 0,
        totalVideos: videos?.length || 0
      };
    } catch (error) {
      console.error('Erro ao obter estatísticas:', error);
      return {
        totalMemorias: 0,
        totalMarcos: 0,
        totalFotos: 0,
        totalVideos: 0
      };
    }
  }

  // Mapear dados do banco para o tipo Memoria
  private static mapearMemoriaCompleta(data: any): Memoria {
    return {
      id: data.id,
      data: data.data,
      titulo: data.titulo,
      descricao: data.descricao,
      local: data.local,
      categoria: data.categoria,
      fotos: data.fotos?.map((f: any) => f.url) || [],
      videos: data.videos?.map((v: any) => v.url) || [],
      itensMarkantes: data.itens_marcantes?.map((i: any) => i.nome) || [],
      capa: data.fotos?.[0]?.url,
      idade: {
        anos: data.idade_anos,
        meses: data.idade_meses,
        dias: data.idade_dias
      }
    };
  }
}