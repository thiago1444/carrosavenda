'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DataContextType {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  ig: string;
  setIg: React.Dispatch<React.SetStateAction<string>>;
  ip: any;
  setIp: React.Dispatch<React.SetStateAction<string>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<any>(null);
  const [ig, setIg] = useState<string>('');
  const [ip, setIp] = useState<any>(null);

  return (
    <DataContext.Provider value={{ data, setData, ig, setIg, ip, setIp }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext deve ser usado dentro de um DataProvider');
  }
  return context;
};
