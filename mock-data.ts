import { CustomDocument } from "@/types";
import drivingfront from '@/public/driving_license_front.jpg'
import drivingback from '@/public/driving_license_backjpg.jpg'
export const mockDocuments: CustomDocument[] = [
  {
    id: "1",
    name: "John Doe",
    type: "Proof of Identity",
    dateSubmitted: "2023-06-01",
    status: "verified",
    details: {
      documentNumber: "AB1234567",
      expirationDate: "2030-01-01",
      issuingCountry: "United States",
    },
    confidenceScore: 95,
    keyFindings: [
      "All security features present",
      "Photo matches database record",
    ],
    detailedAnalysis:
      "The document passed all security checks. The microprint, hologram, and UV features are all present and valid. The personal information matches our records.",
    documents: [
      {
        title: "Passport",
        imgUrl:
          "https://westvancouverschools.ca/international/wp-content/uploads/sites/3/2020/06/Passport-sample-e1593209150690.jpg",
        aiAnomalies: [
          {
            id: 1,
            type: "Text Mismatch",
            description: "Inconsistent font in address field",
            severity: "high",
            x: 20,
            y: 60,
          },
        ],
      },
      {
        title: "Utility Bill",
        imgUrl: "/passport_back.jpg",
        aiAnomalies: [
          {
            id: 2,
            type: "Color Discrepancy",
            description: "Unusual background color in top-right corner",
            severity: "medium",
            x: 80,
            y: 10,
          },
        ],
      },
    ],
    historicalData: [
      { date: "2023-01-01", similarityScore: 95, anomalyCount: 1 },
      { date: "2023-02-01", similarityScore: 97, anomalyCount: 0 },
      { date: "2023-03-01", similarityScore: 94, anomalyCount: 2 },
    ],
  },
  {
    id: "2",
    name: "Jane Smith",
    type: "Proof of Address",
    dateSubmitted: "2023-06-02",
    status: "pending",
    details: {
      documentNumber: "DL9876543",
      expirationDate: "2025-12-31",
      issuingCountry: "Canada",
    },
    confidenceScore: 60,
    keyFindings: ["Awaiting manual review", "Hologram partially obscured"],
    detailedAnalysis:
      "The document requires manual review due to a partially obscured hologram. Other security features appear to be in order, but final verification is pending.",
    documents: [
      {
        title: "Driver's License Front",
        imgUrl: drivingfront,
        aiAnomalies: [
          {
            id: 3,
            type: "Wear Pattern",
            description: "Unusual wear pattern on the bottom right corner",
            severity: "medium",
            x: 50,
            y: 40,
          },
        ],
      },
      {
        title: "Driver's License Back",
        imgUrl: drivingback,
        aiAnomalies: [
          {
            id: 3,
            type: "Wear Pattern",
            description: "Unusual wear pattern on the bottom right corner",
            severity: "medium",
            x: 50,
            y: 40,
          },
        ],
      },
    ],
    historicalData: [
      { date: "2023-04-01", similarityScore: 92, anomalyCount: 3 },
      { date: "2023-05-01", similarityScore: 96, anomalyCount: 1 },
      { date: "2023-06-01", similarityScore: 90, anomalyCount: 2 },
    ],
  },
  {
    id: "3",
    name: "Alice Johnson",
    type: "Proof of Identity",
    dateSubmitted: "2023-06-03",
    status: "failed",
    details: {
      documentNumber: "ID1122334",
      expirationDate: "2028-06-30",
      issuingCountry: "United Kingdom",
    },
    confidenceScore: 20,
    keyFindings: ["Missing UV security features", "Inconsistent font usage"],
    detailedAnalysis:
      "The document failed multiple security checks. UV features are absent, and there are inconsistencies in the font used for various fields. This suggests a possible forgery.",
    documents: [
      {
        title: "National ID Front",
        imgUrl:
          "https://as2.ftcdn.net/v2/jpg/02/32/92/21/1000_F_232922178_YCAxIU0vlGoGY2H76ZsATswNrOVbWlUv.jpg",
        aiAnomalies: [
          {
            id: 4,
            type: "Missing UV Feature",
            description: "UV security feature missing",
            severity: "high",
            x: 30,
            y: 70,
          },
          {
            id: 5,
            type: "Inconsistent Font",
            description: "Inconsistent font usage in document",
            severity: "high",
            x: 60,
            y: 20,
          },
        ],
      },
    ],
    historicalData: [
      { date: "2023-02-01", similarityScore: 85, anomalyCount: 4 },
      { date: "2023-03-01", similarityScore: 78, anomalyCount: 5 },
      { date: "2023-04-01", similarityScore: 80, anomalyCount: 3 },
    ],
  },
];



export const genuineSampleImgUrls = {
  "Passport": "https://westvancouverschools.ca/international/wp-content/uploads/sites/3/2020/06/Passport-sample-e1593209150690.jpg",
  "Driver's License Front": drivingfront,
  "Driver's License Back": drivingback,
  "National ID Front": drivingback,
  // Add more mappings as needed
};
