"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useDocument } from "@/context/document-context";
import { CustomDocument } from "@/types";

const mockDocuments: CustomDocument[] = [
  {
    id: "1",
    type: "Passport",
    name: "John Doe",
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
    aiAnomalies: [
      {
        id: 1,
        type: "Text Mismatch",
        description: "Inconsistent font in address field",
        severity: "high",
        x: 20,
        y: 60,
      },
      {
        id: 2,
        type: "Color Discrepancy",
        description: "Unusual background color in top-right corner",
        severity: "medium",
        x: 80,
        y: 10,
      },
    ],
    historicalData: [
      { date: "2023-01-01", similarityScore: 95, anomalyCount: 1 },
      { date: "2023-02-01", similarityScore: 97, anomalyCount: 0 },
      { date: "2023-03-01", similarityScore: 94, anomalyCount: 2 },
    ],
    imgUrl: "/passport.jpg",
  },
  {
    id: "2",
    type: "Driver's License",
    name: "Jane Smith",
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
    historicalData: [
      { date: "2023-04-01", similarityScore: 92, anomalyCount: 3 },
      { date: "2023-05-01", similarityScore: 96, anomalyCount: 1 },
      { date: "2023-06-01", similarityScore: 90, anomalyCount: 2 },
    ],
    imgUrl: "/passport.jpg",
  },
  {
    id: "3",
    type: "National ID",
    name: "Alice Johnson",
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
    historicalData: [
      { date: "2023-02-01", similarityScore: 85, anomalyCount: 4 },
      { date: "2023-03-01", similarityScore: 78, anomalyCount: 5 },
      { date: "2023-04-01", similarityScore: 80, anomalyCount: 3 },
    ],
    imgUrl: "/passport.jpg",
  },
];

const AdminPage = () => {
  const router = useRouter();
  const { setDocument } = useDocument();

  const handleDocumentClick = (docId: string) => {
    const selectedDocument = mockDocuments.find((doc) => doc.id === docId);
    if (selectedDocument) {
      setDocument(selectedDocument); // Set selected document in context
      router.push(`/admin/document/${docId}`);
    }
  };

  return (
    <div className="w-full max-w-6xl my-20 mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Document Verification Dashboard</CardTitle>
          <CardDescription>View and manage submitted documents</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Date Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDocuments.map((doc) => (
                <TableRow
                  key={doc.id}
                  onClick={() => handleDocumentClick(doc.id)}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{doc.name}</TableCell>
                  <TableCell>{doc.dateSubmitted}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="ml-2 capitalize">{doc.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <button onClick={() => handleDocumentClick(doc.id)}>
                      View Details
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
