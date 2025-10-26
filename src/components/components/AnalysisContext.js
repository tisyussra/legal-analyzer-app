// src/context/AnalysisContext.js
import React, { createContext, useContext } from 'react';
import { useAnalysis } from '../hooks/src/useAnalysis';

const AnalysisContext = createContext(null);

export const AnalysisProvider = ({ children }) => {
  const analysis = useAnalysis();
  return (
    <AnalysisContext.Provider value={analysis}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysisData = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error("useAnalysisData must be used within an AnalysisProvider");
  }
  return context;
};