import { format, differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const DATA_NASCIMENTO = import.meta.env.VITE_DATA_NASCIMENTO || '2022-11-11';

export const formatarData = (data: string): string => {
  return format(new Date(data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
};

export const calcularIdade = (dataEvento: string) => {
  const nascimento = new Date(DATA_NASCIMENTO);
  const evento = new Date(dataEvento);
  
  const anos = differenceInYears(evento, nascimento);
  const meses = differenceInMonths(evento, nascimento) % 12;
  const dias = differenceInDays(evento, new Date(nascimento.getFullYear() + anos, nascimento.getMonth() + meses, nascimento.getDate()));
  
  return { anos, meses, dias };
};

export const formatarIdade = (idade: { anos: number; meses: number; dias: number }): string => {
  const partes = [];
  
  if (idade.anos > 0) {
    partes.push(`${idade.anos} ano${idade.anos > 1 ? 's' : ''}`);
  }
  
  if (idade.meses > 0) {
    partes.push(`${idade.meses} mês${idade.meses > 1 ? 'es' : ''}`);
  }
  
  if (idade.dias > 0 && idade.anos === 0) {
    partes.push(`${idade.dias} dia${idade.dias > 1 ? 's' : ''}`);
  }
  
  return partes.join(' e ') || '0 dias';
};