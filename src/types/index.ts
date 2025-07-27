export interface Memoria {
  id: string;
  data: string; // formato: aaaa-mm-dd
  titulo: string;
  descricao: string;
  local?: string;
  fotos: string[];
  videos: string[];
  itensMarkantes: string[];
  categoria: 'marco' | 'cotidiano' | 'especial' | 'saude' | 'brincadeira';
  capa?: string; // URL da foto de capa
  idade: {
    anos: number;
    meses: number;
    dias: number;
  };
}

export interface FiltroMemoria {
  dataInicio?: string;
  dataFim?: string;
  categoria?: string;
  busca?: string;
}