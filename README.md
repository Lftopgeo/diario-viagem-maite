# 📸 Memórias da Maitê

Um aplicativo web para registrar e organizar momentos especiais do crescimento da Maitê, organizados cronologicamente por datas.

## 🎯 Funcionalidades

### ✅ Implementadas
- **Organização por Data**: Cada memória é organizada cronologicamente
- **Informações Completas**: Data, título, descrição, local, categoria
- **Cálculo de Idade**: Mostra a idade da Maitê no momento de cada evento
- **Categorização**: Marco, Cotidiano, Especial, Saúde, Brincadeira
- **Itens Marcantes**: Tags para objetos e elementos importantes
- **Busca e Filtros**: Busca por texto e filtros por categoria
- **Interface Responsiva**: Funciona em desktop e mobile
- **Estatísticas**: Contadores de memórias, fotos e vídeos

## 🚀 Como Usar

### Instalação
```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 🔧 Tecnologias

- **React 18** com TypeScript
- **Vite** para build e desenvolvimento
- **Tailwind CSS** para estilização
- **Supabase** para banco de dados
- **Lucide React** para ícones
- **Date-fns** para manipulação de datas

## 🌐 Deploy

Este projeto está configurado para deploy automático no Netlify.

## 📝 Estrutura do Projeto

```
src/
├── components/     # Componentes React
├── data/          # Dados e configurações
├── lib/           # Utilitários e configurações
├── services/      # Serviços (Supabase)
├── types/         # Definições TypeScript
└── utils/         # Funções utilitárias
```