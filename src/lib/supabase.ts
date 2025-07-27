import { createClient } from '@supabase/supabase-js';

// Configurações do Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para o banco de dados
export interface MemoriaDB {
  id: string;
  data: string;
  titulo: string;
  descricao: string;
  local?: string;
  categoria: 'marco' | 'cotidiano' | 'especial' | 'saude' | 'brincadeira';
  idade_anos: number;
  idade_meses: number;
  idade_dias: number;
  created_at: string;
  updated_at: string;
}

export interface FotoDB {
  id: string;
  memoria_id: string;
  url: string;
  nome_arquivo?: string;
  tamanho?: number;
  tipo_mime?: string;
  created_at: string;
}

export interface VideoDB {
  id: string;
  memoria_id: string;
  url: string;
  nome_arquivo?: string;
  tamanho?: number;
  duracao?: number;
  tipo_mime?: string;
  created_at: string;
}

export interface ItemMarcanteDB {
  id: string;
  memoria_id: string;
  nome: string;
  created_at: string;
}