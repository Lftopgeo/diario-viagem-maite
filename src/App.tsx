import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">
            📸 Memórias da Maitê
          </h1>
          <p className="text-gray-600">
            Registrando momentos especiais do crescimento da nossa pequena
          </p>
        </header>
        
        <main className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Bem-vindos ao Diário da Maitê! 🌟
            </h2>
            <p className="text-gray-600 mb-4">
              Este é um espaço especial para guardar todas as memórias preciosas 
              do crescimento da Maitê. Aqui você pode registrar marcos importantes, 
              momentos cotidianos especiais e acompanhar o desenvolvimento da nossa pequena.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-pink-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🎂</div>
                <h3 className="font-semibold text-pink-800">Marcos</h3>
                <p className="text-sm text-pink-600">Primeiras vezes e conquistas</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">📅</div>
                <h3 className="font-semibold text-purple-800">Cotidiano</h3>
                <p className="text-sm text-purple-600">Momentos do dia a dia</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🎉</div>
                <h3 className="font-semibold text-yellow-800">Especiais</h3>
                <p className="text-sm text-yellow-600">Celebrações e eventos</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;