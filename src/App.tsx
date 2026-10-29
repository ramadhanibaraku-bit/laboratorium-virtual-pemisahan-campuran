import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { MethodSelection } from './components/MethodSelection';
import { Lab3D } from './components/Lab3D';
import { LkpdDigital } from './components/LkpdDigital';
import { EvaluasiSiswa } from './components/EvaluasiSiswa';
import { DashboardGuru } from './components/DashboardGuru';
import { SeparationMethodId } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [selectedMethod, setSelectedMethod] = useState<SeparationMethodId>('filtrasi');

  const handleSelectMethod = (id: SeparationMethodId) => {
    setSelectedMethod(id);
    setActiveTab('lab');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1">
        {activeTab === 'beranda' && (
          <Home
            onStart={() => setActiveTab('metode')}
            onSelectLKPD={() => setActiveTab('lkpd')}
          />
        )}

        {activeTab === 'metode' && (
          <MethodSelection onSelectMethod={handleSelectMethod} />
        )}

        {activeTab === 'lab' && (
          <Lab3D
            selectedMethod={selectedMethod}
            onOpenLkpd={() => setActiveTab('lkpd')}
          />
        )}

        {activeTab === 'lkpd' && (
          <LkpdDigital defaultMethod={selectedMethod} />
        )}

        {activeTab === 'evaluasi' && <EvaluasiSiswa />}

        {activeTab === 'guru' && <DashboardGuru />}
      </main>
    </div>
  );
};
export default App;
