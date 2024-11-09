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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockDocuments } from "@/mock-data";

const StatCard = ({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

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

  const renderStatusBadge = (status: string) => {
    let colorClass = "";
    switch (status) {
      case "verified":
        colorClass = "bg-green-500"; // Verified - Green
        break;
      case "pending":
        colorClass = "bg-yellow-500"; // Pending - Yellow
        break;
      case "failed":
        colorClass = "bg-red-500"; // Failed - Red
        break;
      default:
        colorClass = "bg-gray-500"; // Default/Other - Gray
    }
    return (
      <Badge
        className={`w-3 h-3 ${colorClass} rounded-full inline-block mr-2`}
      ></Badge>
    );
  };

  // Calculate statistics
  const totalDocuments = mockDocuments.length;
  const verifiedDocuments = mockDocuments.filter(
    (doc) => doc.status === "verified"
  ).length;
  const failedDocuments = mockDocuments.filter(
    (doc) => doc.status === "failed"
  ).length;
  const pendingDocuments = mockDocuments.filter(
    (doc) => doc.status === "pending"
  ).length;

  const approvalRate = ((verifiedDocuments / totalDocuments) * 100).toFixed(1);
  const rejectionRate = ((failedDocuments / totalDocuments) * 100).toFixed(1);
  const averageConfidenceScore =
    mockDocuments.reduce((sum, doc) => sum + doc.confidenceScore, 0) /
    totalDocuments;
  const documentsFlaggedForForgery = mockDocuments.filter((doc) =>
    doc.keyFindings.includes("potential forgery")).length

  // Additional Statistics Calculations
  const forgeryDetectionRate = (
    (documentsFlaggedForForgery / totalDocuments) *
    100
  ).toFixed(1);


  
  const manualReviewDocuments = mockDocuments.filter(
    (doc) =>
      doc.confidenceScore < 60 || // Threshold confidenceScore for manual review
      doc.keyFindings.includes("requires manual review")
  ).length;
  const manualReviewRate = ((manualReviewDocuments / mockDocuments.length) * 100).toFixed(1);
  

  return (
    <div className="w-full max-w-6xl mt-24 my-20 mx-auto space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Approval Rate"
          value={`${approvalRate}%`}
          description="Documents verified successfully"
        />
        <StatCard
          title="Rejection Rate"
          value={`${rejectionRate}%`}
          description="Documents failed verification"
        />
        <StatCard
          title="Pending Review"
          value={pendingDocuments.toString()}
          description="Documents awaiting verification"
        />
        <StatCard
          title="Avg. Confidence Score"
          value={averageConfidenceScore.toFixed(2)}
          description="Average AI confidence score"
        />

        {/* New Stats */}
        <StatCard
          title="Forgery Detection Rate"
          value={`${forgeryDetectionRate}%`}
          description="Flagged for potential forgery"
        />
        <StatCard
          title="Manual Review Rate"
          value={`${manualReviewRate}%`}
          description="Documents requiring manual review"
        />
      </div>

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
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleDocumentClick(doc.id)}
                >
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{doc.name}</TableCell>
                  <TableCell>{doc.dateSubmitted}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {renderStatusBadge(doc.status)}
                      <span className="capitalize">{doc.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() => handleDocumentClick(doc.id)}
                      className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                    >
                      View Details
                    </Button>
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
