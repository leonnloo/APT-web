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
  
  export type CustomDocument = {
    id: string;
    type: string;
    name: string;
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
    imgUrl: string;
    aiAnomalies: Anomaly[];
    historicalData: HistoricalData[];
  };
  