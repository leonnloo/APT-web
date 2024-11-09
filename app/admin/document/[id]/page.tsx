"use client";
import { useState } from "react";
import { CheckCircle, FileText, ZoomIn, User, XCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";
import { useDocument } from "@/context/document-context";
import { Anomaly } from "@/types";
import { useRouter } from "next/navigation";
import { genuineSampleImgUrls } from "@/mock-data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import LoggingCard from "@/components/logging";

interface ConfidenceScoreProps {
  score: number;
}

const EnhancedAdminDashboard: React.FC = () => {
  const { document } = useDocument();
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const router = useRouter();

  if (!document) {
    router.push("/admin");
    return null;
  }

  const renderAnomalyMarkers = (anomalies: Anomaly[]) => {
    return anomalies.map((anomaly) => (
      <div
        key={anomaly.id}
        className={`absolute w-6 h-6 rounded-full border-2 cursor-pointer ${
          anomaly.severity === "high" ? "border-red-500" : "border-yellow-500"
        }`}
        style={{ left: `${anomaly.x}%`, top: `${anomaly.y}%` }}
        title={`${anomaly.type}: ${anomaly.description}`}
      ></div>
    ));
  };

  const ConfidenceScore: React.FC<ConfidenceScoreProps> = ({ score }) => {
    let message = "";
    let action = "";

    if (score < 50) {
      message = "Confidence score is too low. Document should be rejected.";
      action = "Reject";
    } else if (score < 80) {
      message = "Confidence score is moderate. Manual review is required.";
      action = "Manual Review";
    } else {
      message = "Confidence score is high. Document is approved.";
      action = "Unapprove";
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Confidence Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl font-bold">{score}%</div>
            <Progress value={score} className="w-2/3" />
          </div>
          <Alert
            variant={
              score < 50 ? "destructive" : score < 80 ? "default" : "default"
            }
          >
            <AlertTitle>Action Required</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
          <div className="mt-4 flex justify-end">
            <Button
              variant={
                score < 50
                  ? "destructive"
                  : score < 80
                  ? "secondary"
                  : "default"
              }
            >
              {action}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-6 my-24">
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Advanced Document Comparison Tool</CardTitle>
          <CardDescription>
            Compare submitted documents with genuine samples and historical data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {/* Submitted Document Section */}
            <div>
              <h3 className="font-semibold mb-2">Submitted Documents</h3>
              {document.documents.map((docImage, index) => (
                <div key={index} className="mb-6">
                  <div className="flex flex-col items-center">
                    <h4 className="text-lg font-medium mb-1">
                      {docImage.title}
                    </h4>
                    <div className="bg-gray-200 w-full h-96 rounded relative overflow-hidden flex items-center justify-center">
                      <FileText className="w-12 h-12 text-gray-400" />
                      <Image
                        src={
                          docImage.imgUrl ||
                          "/placeholder.svg?height=256&width=256"
                        }
                        alt={`${docImage.title} Image`}
                        layout="fill"
                        objectFit="contain"
                        style={{
                          transform: `scale(${zoomLevel / 100})`,
                        }}
                      />
                      {renderAnomalyMarkers(docImage.aiAnomalies || [])}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Genuine Sample Section */}
            <div>
              <h3 className="font-semibold mb-2">Genuine Samples</h3>
              {document.documents.map((docImage, index) => (
                <div key={index} className="mb-6">
                  <div className="flex flex-col items-center">
                    <h4 className="text-lg font-medium mb-1">{`Genuine Sample for ${docImage.title}`}</h4>
                    <div className="bg-gray-200 w-full h-96 rounded relative overflow-hidden flex items-center justify-center">
                      <FileText className="w-12 h-12 text-gray-400" />
                      <Image
                        src={
                          genuineSampleImgUrls[
                            docImage.title as keyof typeof genuineSampleImgUrls
                          ] || "/placeholder.svg?height=256&width=256"
                        }
                        alt={`Genuine Sample for ${docImage.title}`}
                        layout="fill"
                        objectFit="contain"
                        style={{
                          transform: `scale(${zoomLevel / 100})`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-2">
            <ZoomIn className="w-4 h-4" />
            <Slider
              value={[zoomLevel]}
              onValueChange={(value) => setZoomLevel(value[0])}
              min={100}
              max={400}
              step={10}
              className="w-[200px]"
            />
            <span className="text-sm">{zoomLevel}%</span>
          </div>

          <Tabs defaultValue="overview" className="mt-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Detailed Comparison</TabsTrigger>
              <TabsTrigger value="anomalies">AI Anomaly Detection</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-2 gap-4">
                <ConfidenceScore score={document.confidenceScore} />
                <Card>
                  <CardHeader>
                    <CardTitle>Key Findings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {document.keyFindings.map((finding, index) => (
                        <li key={index} className="flex items-center">
                          {document.confidenceScore < 80 ? (
                            <XCircle className="w-5 h-5 text-red-500 mr-2" />
                          ) : (
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          )}
                          {finding}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Detailed Comparison Tab */}
            <TabsContent value="details">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Text Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left">Field</th>
                          <th className="text-left">Submitted</th>
                          <th className="text-left">Match</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Name</td>
                          <td>{document.name}</td>
                          <td>
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </td>
                        </tr>
                        <tr>
                          <td>Date of Birth</td>
                          <td>15/04/1985</td>
                          <td>
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </td>
                        </tr>
                        <tr>
                          <td>Document Number</td>
                          <td>{document.details.documentNumber}</td>
                          <td>
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Security Feature Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <span>Hologram Integrity</span>
                        <Progress value={98} className="w-1/2" />
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Microprint Quality</span>
                        <Progress value={95} className="w-1/2" />
                      </li>
                      <li className="flex items-center justify-between">
                        <span>UV Feature Matching</span>
                        <Progress value={100} className="w-1/2" />
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Anomalies Tab */}
            <TabsContent value="anomalies">
              <Card>
                <CardHeader>
                  <CardTitle>AI-Detected Anomalies</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {document.documents.flatMap((docImage) =>
                      docImage.aiAnomalies.map((anomaly) => (
                        <li
                          key={anomaly.id}
                          className="flex items-start space-x-3"
                        >
                          <div
                            className={`mt-1 w-2 h-2 rounded-full ${
                              anomaly.severity === "high"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                            }`}
                          />
                          <div>
                            <p className="font-semibold">{anomaly.type}</p>
                            <p className="text-sm text-gray-500">
                              {anomaly.description}
                            </p>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      {/* User Submitted Selfie Section */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">User Submitted Selfie with ID</h3>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Selfie with ID</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 w-full h-[500px] rounded relative overflow-hidden flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
                <Image
                  src={
                    document.documents[0].imgUrl ||
                    "/placeholder.svg?height=256&width=256"
                  }
                  alt="Selfie with ID"
                  layout="fill"
                  objectFit="contain"
                  style={{
                    transform: `scale(${zoomLevel / 100})`,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights Section */}
        <div>
          <h3 className="font-semibold mb-2">Selfie Validation Insights</h3>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-semibold">Face Match with ID</p>
                    <p className="text-sm text-gray-500">
                      The face in the selfie matches the photo on the ID with a
                      confidence level of <strong>98%</strong>.
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-semibold">Liveness Detection</p>
                    <p className="text-sm text-gray-500">
                      The liveness check confirms that the person is not a fake
                      or spoofed image, with a real confidence score of{" "}
                      <strong>0.95</strong>.
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-semibold">ID Document Consistency</p>
                    <p className="text-sm text-gray-500">
                      Key details on the ID (e.g., name, date of birth) align
                      with the information provided, supporting successful KYC
                      validation.
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-semibold">Overall Verification Status</p>
                    <p className="text-sm text-gray-500">
                      The submitted selfie and ID have passed all KYC checks,
                      indicating a{" "}
                      <strong>high likelihood of authenticity</strong>.
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <LoggingCard />
    </div>
  );
};

export default EnhancedAdminDashboard;
