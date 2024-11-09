"use client";
import { useState } from "react";
import {
  Bell,
  Settings,
  FileText,
  CheckCircle,
  PieChart,
  ZoomIn,
  Search,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import { useDocument } from "@/context/document-context";
import { useRouter } from "next/navigation";
import { Anomaly } from "@/types";

interface ConfidenceScoreProps {
  score: number;
}

interface AnomalyMarkerProps {
  anomaly: Anomaly;
}

const EnhancedAdminDashboard: React.FC = () => {
  const { document } = useDocument();
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const router = useRouter();

  if (document === null) {
    router.push("/admin");
    return null;
  }

  // Assuming `document` has properties `aiAnomalies` and `historicalData`
  const anomalies = document.aiAnomalies || [];
  const historicalData = document.historicalData || [];

  const AnomalyMarker: React.FC<AnomalyMarkerProps> = ({ anomaly }) => {
    return (
      <TooltipProvider key={anomaly.id}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`absolute w-6 h-6 rounded-full border-2 cursor-pointer ${
                anomaly.severity === "high"
                  ? "border-red-500"
                  : "border-yellow-500"
              }`}
              style={{ left: `${anomaly.x}%`, top: `${anomaly.y}%` }}
            >
              <Search
                className={`w-5 h-5 ${
                  anomaly.severity === "high"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-semibold">{anomaly.type}</p>
            <p>{anomaly.description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  const renderAnomalyMarkers = () => {
    return anomalies.map((anomaly) => (
      <AnomalyMarker key={anomaly.id} anomaly={anomaly} />
    ));
  };

  const renderHistoricalChart = () => {
    if (historicalData.length === 0) return null; // Check for data presence

    const maxScore = Math.max(...historicalData.map((d) => d.similarityScore));
    const minScore = Math.min(...historicalData.map((d) => d.similarityScore));

    return (
      <div className="h-64 flex items-end justify-between">
        {historicalData.map((data, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-xs mb-1">{data.anomalyCount}</div>
            <div
              className="w-8 bg-blue-500 rounded-t"
              style={{
                height: `${
                  ((data.similarityScore - minScore) / (maxScore - minScore)) *
                  100
                }%`,
              }}
            ></div>
            <div className="text-xs mt-1">
              {new Date(data.date).toLocaleDateString("en-US", {
                month: "short",
              })}
            </div>
          </div>
        ))}
      </div>
    );
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
      message = "Confidence score is high. Document can be approved.";
      action = "Approve";
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

  const renderDocumentComparison = () => {
    return (
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Advanced Document Comparison Tool</CardTitle>
          <CardDescription>
            Compare submitted documents with genuine samples and historical data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Submitted Document</h3>
              <div className="bg-gray-200 w-full h-64 rounded flex items-center justify-center relative overflow-hidden">
                <FileText className="w-12 h-12 text-gray-400" />
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${
                      document.imgUrl ||
                      "/placeholder.svg?height=256&width=256"
                    })`,
                    transform: `scale(${zoomLevel / 100})`,
                  }}
                ></div>
                {renderAnomalyMarkers()}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Genuine Sample</h3>
              <div className="bg-gray-200 w-full h-64 rounded flex items-center justify-center relative overflow-hidden">
                <FileText className="w-12 h-12 text-gray-400" />
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('/placeholder.svg?height=256&width=256')",
                    transform: `scale(${zoomLevel / 100})`,
                  }}
                ></div>
              </div>
              <Select>
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder="Select a sample" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="driver_license">
                    Driver&apos;s License
                  </SelectItem>
                  <SelectItem value="utility_bill">Utility Bill</SelectItem>
                </SelectContent>
              </Select>
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
              <TabsTrigger value="historical">
                Historical Comparison
              </TabsTrigger>
              <TabsTrigger value="visualizations">Visualizations</TabsTrigger>
            </TabsList>

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
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          {finding}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

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
                          <th className="text-left">Genuine Sample</th>
                          <th className="text-left">Match</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Name</td>
                          <td>{document.name}</td>
                          <td>{document.name}</td>
                          <td>
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </td>
                        </tr>
                        <tr>
                          <td>Date of Birth</td>
                          <td>15/04/1985</td>
                          <td>15/04/1985</td>
                          <td>
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </td>
                        </tr>
                        <tr>
                          <td>Document Number</td>
                          <td>X123456</td>
                          <td>X123456</td>
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

            <TabsContent value="anomalies">
              <Card>
                <CardHeader>
                  <CardTitle>AI-Detected Anomalies</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {document.aiAnomalies.map((anomaly, index) => (
                      <li key={index} className="flex items-start space-x-3">
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
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="historical">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Historical Comparison</CardTitle>
                    <CardDescription>
                      Similarity scores and anomaly counts over the past 6
                      months
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderHistoricalChart()}
                    <div className="mt-4 text-sm text-gray-500 flex justify-between">
                      <span>Blue bars: Similarity Score</span>
                      <span>Numbers above bars: Anomaly Count</span>
                    </div>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Trend Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                          Similarity scores improving over time
                        </li>
                        <li className="flex items-center">
                          <TrendingDown className="w-5 h-5 text-red-500 mr-2" />
                          Anomaly count decreased in recent months
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Historical Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li>Average Similarity: 95.3%</li>
                        <li>Total Anomalies: 7</li>
                        <li>Highest Score: 98% (Apr 2023)</li>
                        <li>Lowest Score: 92% (Jun 2023)</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="visualizations">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Color Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-center justify-center">
                      <PieChart className="w-32 h-32 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Edge Detection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 flex items-center justify-center">
                      <Image
                        src="/api/placeholder/200/150"
                        alt="Edge Detection Visualization"
                        className="max-w-full h-auto"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Document Verification Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Avatar>
            <AvatarImage src="/api/placeholder/32/32" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderDocumentComparison()}
      </div>
    </div>
  );
};

export default EnhancedAdminDashboard;
