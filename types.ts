import { StaticImageData } from "next/image";

export type Anomaly = {
    id: number;
    type: string;
    description: string;
    severity: "high" | "medium" | "low";
    x: number;
    y: number;
  };
  
  export type HistoricalData = {
    date: string;
    similarityScore: number;
    anomalyCount: number;
  };
  
  export type DocumentImage = {
    title: string;
    imgUrl: string | StaticImageData;
    aiAnomalies: Anomaly[];
  };
  
  export type CustomDocument = {
    id: string;
    name: string;
    type: string;
    dateSubmitted: string;
    status: "pending" | "verified" | "failed";
    details: {
      documentNumber: string;
      expirationDate: string;
      issuingCountry: string;
    };
    confidenceScore: number;
    keyFindings: string[];
    detailedAnalysis: string;
    documents: DocumentImage[];
    historicalData: HistoricalData[];
  };