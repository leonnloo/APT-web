import { CustomDocument } from "@/types";
import drivingfront from "@/public/driving_license_front.jpg";
import drivingback from "@/public/driving_license_backjpg.jpg";
import utilbil from "@/public/utility-bill.png";
import icf from "@/public/ic-front.png";
import icb from "@/public/ic-back.png";
import ic1 from "@/public/ic1.jpg";

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
        aiAnomalies: [],
      },
      {
        title: "Utility Bill",
        imgUrl: utilbil,
        aiAnomalies: [],
      },
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
  },
  {
    id: "3",
    name: "Rowan Sebastian Atkinson",
    type: "Proof of Identity",
    dateSubmitted: "2023-06-03",
    status: "failed",
    details: {
      documentNumber: "ID1122334",
      expirationDate: "2028-06-30",
      issuingCountry: "United Kingdom",
    },
    confidenceScore: 20,
    keyFindings: [
      "Name on document does not match database records",
      "Date of birth on document does not match database records",
    ],
    detailedAnalysis:
      "The document failed multiple security checks. UV features are absent, and there are inconsistencies in the font used for various fields. This suggests a possible forgery.",
    documents: [
      {
        title: "National ID Front",
        imgUrl: ic1,
        aiAnomalies: [
          {
            id: 4,
            type: "Data Mismatch",
            description:
              "Name on the document does not match the database record",
            severity: "high",
            x: 20,
            y: 70,
          },
          {
            id: 5,
            type: "Data Mismatch",
            description:
              "Date of birth on the document does not match the database record",
            severity: "high",
            x: 10,
            y: 220,
          },
        ],
      },
    ],
  },
];

export const genuineSampleImgUrls = {
  Passport:
    "https://westvancouverschools.ca/international/wp-content/uploads/sites/3/2020/06/Passport-sample-e1593209150690.jpg",
  "Driver's License Front": drivingfront,
  "Driver's License Back": drivingback,
  "National ID Front": icf,
  "National ID Back": icb,
  "Utility Bill": utilbil,
  // Add more mappings as needed
};

export const transactions = [
  // October 2024
  { date: "01/10/24", type: "FPX PAYMENT FR A", risk_score: 0 },
  { date: "01/10/24", type: "SALE DEBIT", risk_score: 1 },
  { date: "02/10/24", type: "FPX PAYMENT FR A", risk_score: 0 },
  { date: "03/10/24", type: "SALE DEBIT", risk_score: 0 },
  { date: "03/10/24", type: "CASH DEPOSIT", risk_score: 2 },
  { date: "04/10/24", type: "CASH WITHDRAWAL", risk_score: 3 },
  { date: "04/10/24", type: "CRYPTOCURRENCY PURCHASE", risk_score: 2 },
  { date: "05/10/24", type: "FPX PAYMENT FR A", risk_score: 0 },
  { date: "05/10/24", type: "SALE DEBIT", risk_score: 0 },
  { date: "06/10/24", type: "SALE DEBIT", risk_score: 0 },
  { date: "06/10/24", type: "WIRE TRANSFER", risk_score: 4 },
  { date: "07/10/24", type: "WIRE TRANSFER", risk_score: 5 },
  { date: "07/10/24", type: "GAMING PAYMENT", risk_score: 3 },
  { date: "08/10/24", type: "FPX PAYMENT FR A", risk_score: 0 },
  { date: "09/10/24", type: "SALE DEBIT", risk_score: 0 },
  { date: "09/10/24", type: "CASH WITHDRAWAL", risk_score: 2 },
  { date: "10/10/24", type: "CRYPTOCURRENCY PURCHASE", risk_score: 2 },
  { date: "11/10/24", type: "FPX PAYMENT FR A", risk_score: 0 },
  { date: "12/10/24", type: "GAMING PAYMENT", risk_score: 5 },
  { date: "13/10/24", type: "FPX PAYMENT FR A", risk_score: 0 },
  { date: "14/10/24", type: "SALE DEBIT", risk_score: 0 },
  { date: "14/10/24", type: "LARGE CASH DEPOSIT", risk_score: 3 },
  { date: "15/10/24", type: "OFFSHORE TRANSFER", risk_score: 4 },
  { date: "16/10/24", type: "FPX PAYMENT FR A", risk_score: 0 },
  { date: "17/10/24", type: "SALE DEBIT", risk_score: 0 },
  { date: "17/10/24", type: "ANONYMOUS DIGITAL WALLET", risk_score: 3 },
  { date: "18/10/24", type: "ANONYMOUS DIGITAL WALLET", risk_score: 3 },
  { date: "19/10/24", type: "FPX PAYMENT FR A", risk_score: 0 },
  { date: "20/10/24", type: "SALE DEBIT", risk_score: 0 },
  { date: "20/10/24", type: "CASH WITHDRAWAL", risk_score: 2 },
  { date: "21/10/24", type: "LARGE CASH DEPOSIT", risk_score: 4 },
  { date: "22/10/24", type: "FPX PAYMENT FR A", risk_score: 0 },
  { date: "23/10/24", type: "SALE DEBIT", risk_score: 0 },
  { date: "23/10/24", type: "GAMBLING PAYMENT", risk_score: 5 },
  { date: "24/10/24", type: "GAMBLING PAYMENT", risk_score: 5 },
  { date: "25/10/24", type: "FPX PAYMENT FR A", risk_score: 0 },
  { date: "26/10/24", type: "SALE DEBIT", risk_score: 0 },
  { date: "27/10/24", type: "INTERNATIONAL TRANSFER", risk_score: 3 },
  { date: "28/10/24", type: "FPX PAYMENT FR A", risk_score: 0 },
  { date: "29/10/24", type: "SALE DEBIT", risk_score: 0 },
  { date: "29/10/24", type: "CASH WITHDRAWAL", risk_score: 2 },
  { date: "30/10/24", type: "CASH WITHDRAWAL", risk_score: 2 },
  { date: "31/10/24", type: "FPX PAYMENT FR A", risk_score: 0 },

  // November 2024
  { date: "01/11/24", type: "SALE DEBIT", risk_score: 0 },
  { date: "02/11/24", type: "WIRE TRANSFER", risk_score: 5 },
  { date: "02/11/24", type: "GAMBLING PAYMENT", risk_score: 4 },
  { date: "03/11/24", type: "FPX PAYMENT FR A", risk_score: 0 },
  { date: "04/11/24", type: "SALE DEBIT", risk_score: 0 },
  { date: "04/11/24", type: "OFFSHORE TRANSFER", risk_score: 4 },
  { date: "05/11/24", type: "LARGE CASH DEPOSIT", risk_score: 4 },
  { date: "05/11/24", type: "CASH WITHDRAWAL", risk_score: 2 },
  { date: "06/11/24", type: "FPX PAYMENT FR A", risk_score: 0 },
  { date: "07/11/24", type: "SALE DEBIT", risk_score: 0 },
  { date: "07/11/24", type: "GAMBLING PAYMENT", risk_score: 5 },
  { date: "08/11/24", type: "GAMBLING PAYMENT", risk_score: 5 },
  { date: "09/11/24", type: "FPX PAYMENT FR A", risk_score: 0 },
  { date: "10/11/24", type: "SALE DEBIT", risk_score: 0 },
  { date: "10/11/24", type: "CASH WITHDRAWAL", risk_score: 2 },
  { date: "11/11/24", type: "OFFSHORE TRANSFER", risk_score: 4 },
  { date: "12/11/24", type: "FPX PAYMENT FR A", risk_score: 0 },
  { date: "13/11/24", type: "SALE DEBIT", risk_score: 0 },
  { date: "14/11/24", type: "ANONYMOUS DIGITAL WALLET", risk_score: 3 },
  { date: "14/11/24", type: "CASH DEPOSIT", risk_score: 2 },
  { date: "15/11/24", type: "FPX PAYMENT FR A", risk_score: 0 },
  { date: "16/11/24", type: "SALE DEBIT", risk_score: 0 },
  { date: "17/11/24", type: "WIRE TRANSFER", risk_score: 5 },
  { date: "17/11/24", type: "INTERNATIONAL TRANSFER", risk_score: 3 },
  { date: "18/11/24", type: "FPX PAYMENT FR A", risk_score: 0 },
  { date: "19/11/24", type: "SALE DEBIT", risk_score: 0 },
  { date: "19/11/24", type: "CASH WITHDRAWAL", risk_score: 2 },
];
