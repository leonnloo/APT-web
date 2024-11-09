'use client'

import { ChangeEvent, useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Camera, FileText, Upload, AlertCircle } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { X } from 'lucide-react' // For close button
import { Header } from "@/components/header"




export default function Home() {

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal details
    firstName: '',
    lastName: '',
    dob: '',
    // Employment details
    employmentStatus: '',
    hasTaxId: false,
    taxCountry: '',
    taxId: '',
    // Address details
    address: '',
    townCity: '',
    stateProvince: '',
    postalCode: '',
    // Documents
    selfieWithId: null as File | null,
    proofOfAddress: null as File | null,
    // FATCA and PEP
    fatcaStatus: 'no',
    isPep: false,
    agreeToTerms: false
  })

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: string | boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }))
  }

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    if (file) {
      // Check file type
      if (type === 'selfieWithId') {
        if (!file.type.startsWith('image/')) {
          alert('Please upload an image file for the selfie with ID')
          return
        }
      } else if (type === 'proofOfAddress') {
        if (file.type !== 'application/pdf') {
          alert('Please upload a PDF file for proof of address')
          return
        }
      }
      setFormData(prev => ({ ...prev, [type]: file }))
    }
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setStep(6) // Move to confirmation step
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        // Personal Details step (unchanged)
        return (
          <>
            <CardHeader>
              <CardTitle>Personal Details</CardTitle>
              <CardDescription>Enter your name and date of birth exactly as it appears on your identity document.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First (and middle) name</Label>
                <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of birth</Label>
                <Input id="dob" name="dob" type="date" value={formData.dob} onChange={handleInputChange} required />
              </div>
            </CardContent>
          </>
        )
      case 2:
        // Employment Details step (unchanged)
        return (
          <>
            <CardHeader>
              <CardTitle>Employment Details</CardTitle>
              <CardDescription>Please provide your employment information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employmentStatus">Employment status</Label>
                <Select name="employmentStatus" onValueChange={(value) => setFormData(prev => ({ ...prev, employmentStatus: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="employed">Employed</SelectItem>
                    <SelectItem value="self-employed">Self-employed</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasTaxId"
                  checked={formData.hasTaxId}
                  onCheckedChange={(checked) => handleCheckboxChange('hasTaxId', checked)}
                />
                <Label htmlFor="hasTaxId">I don't have tax identification number</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxCountry">Country of tax residence</Label>
                <Select name="taxCountry" onValueChange={(value) => setFormData(prev => ({ ...prev, taxCountry: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="af">Afghanistan</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {!formData.hasTaxId && (
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax identification number</Label>
                  <Input id="taxId" name="taxId" value={formData.taxId} onChange={handleInputChange} placeholder="Enter your tax identification number" />
                </div>
              )}
            </CardContent>
          </>
        )
      case 3:
        // Address Details step (unchanged)
        return (
          <>
            <CardHeader>
              <CardTitle>Address Details</CardTitle>
              <CardDescription>Please provide your current residential address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="townCity">Town/City</Label>
                <Input id="townCity" name="townCity" value={formData.townCity} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stateProvince">State/Province</Label>
                <Select name="stateProvince" onValueChange={(value) => setFormData(prev => ({ ...prev, stateProvince: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your state/province" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ca">California</SelectItem>
                    <SelectItem value="ny">New York</SelectItem>
                    <SelectItem value="tx">Texas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal/ZIP code</Label>
                <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required />
              </div>
            </CardContent>
          </>
        )
      case 4:
        // New Document Upload step
        return (
          <>
            <CardHeader>
              <CardTitle>Document Upload</CardTitle>
              <CardDescription>Please provide the required verification documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please ensure all documents are clear, in focus, and show all corners. Maximum file size: 5MB
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Selfie with ID</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center space-y-2">
                    <Camera className="mx-auto h-8 w-8 text-gray-400" />
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Upload a photo of yourself holding your ID card</p>
                      <p className="text-xs text-gray-500">Accepted formats: JPG, PNG</p>
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      className="mx-auto"
                      onChange={(e) => handleFileUpload(e, 'selfieWithId')}
                    />
                    {formData.selfieWithId && (
                      <ImagePreview
                        file={formData.selfieWithId}
                        onRemove={() => setFormData(prev => ({ ...prev, selfieWithId: null }))}
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Proof of Address</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center space-y-2">
                    <FileText className="mx-auto h-8 w-8 text-gray-400" />
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Upload a bank statement or utility bill</p>
                      <p className="text-xs text-gray-500">Must be less than 3 months old. PDF format only.</p>
                    </div>
                    <Input
                      type="file"
                      accept=".pdf"
                      className="mx-auto"
                      onChange={(e) => handleFileUpload(e, 'proofOfAddress')}
                    />
                    {formData.proofOfAddress && (
                      <PdfPreview
                        file={formData.proofOfAddress}
                        onRemove={() => setFormData(prev => ({ ...prev, proofOfAddress: null }))}
                      />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </>
        )
      case 5:
        // Declarations step (previously case 4)
        return (
          <>
            <CardHeader>
              <CardTitle>Declarations</CardTitle>
              <CardDescription>FATCA Declaration and PEP Status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>FATCA Declaration</Label>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Do any of the following apply to you?</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>US citizenship or lawful permanent resident (green card) status</li>
                    <li>A US birthplace</li>
                    <li>A US residence address or US correspondence address</li>
                    <li>Standing instructions to transfer funds to an account maintained in the United States</li>
                    <li>An "in care of" address or "hold mail" address that is the sole address</li>
                    <li>A power of attorney or signatory authority granted to a person with a US address</li>
                  </ul>
                </div>
                <RadioGroup
                  value={formData.fatcaStatus}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, fatcaStatus: value }))}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="fatca-yes" />
                    <Label htmlFor="fatca-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="fatca-no" />
                    <Label htmlFor="fatca-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isPep"
                    checked={formData.isPep}
                    onCheckedChange={(checked) => handleCheckboxChange('isPep', checked)}
                  />
                  <Label htmlFor="isPep">I am not a PEP and have never been a PEP</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleCheckboxChange('agreeToTerms', checked)}
                  />
                  <Label htmlFor="agreeToTerms">I agree to the terms and conditions</Label>
                </div>
              </div>
            </CardContent>
          </>
        )
      case 6:
        // Confirmation step (previously case 5)
        return (
          <>
            <CardHeader>
              <CardTitle>Submission Confirmed</CardTitle>
              <CardDescription>Your information has been submitted for verification</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-green-600">
                <FileText className="inline-block mr-2 h-6 w-6" />
                Thank you for your submission. We will review your information and get back to you shortly.
              </p>
            </CardContent>
          </>
        )
    }
  }

  // Add this type for document preview
  type PreviewProps = {
    file: File;
    onRemove: () => void;
  }


  // Add these preview components
  const ImagePreview = ({ file, onRemove }: PreviewProps) => {
    const [preview, setPreview] = useState<string>('')

    useEffect(() => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }, [file])

    return (
      <div className="relative mt-2">
        <img
          src={preview}
          alt="Preview"
          className="w-full max-h-48 object-contain rounded-lg"
        />
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  const PdfPreview = ({ file, onRemove }: PreviewProps) => {
    return (
      <div className="relative mt-2 p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-red-500" />
          <span className="text-sm truncate">{file.name}</span>
        </div>
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-gray-100"> {/* Remove flex from here */}
      <Header />
      <div className="pt-20 pb-8 px-4"> {/* Add padding top to account for fixed header */}
        <div className="max-w-lg mx-auto"> {/* Center the card */}
          <Card>
            <form onSubmit={handleSubmit}>
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`w-1/5 h-2 rounded-full ${i <= step ? 'bg-red-600' : 'bg-gray-200'}`} />
                  ))}
                </div>
              </div>
              {renderStep()}
              <Separator className="my-4" />
              <CardFooter className="flex justify-between">
                {step > 1 && step < 6 && (
                  <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                    Previous
                  </Button>
                )}
                {step < 5 && (
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    type="button"
                    onClick={() => setStep(step + 1)}
                    disabled={
                      (step === 4 && (!formData.selfieWithId || !formData.proofOfAddress)) ||
                      (step === 1 && (!formData.firstName || !formData.lastName || !formData.dob)) ||
                      (step === 2 && (!formData.employmentStatus || (!formData.hasTaxId && !formData.taxId) || !formData.taxCountry)) ||
                      (step === 3 && (!formData.address || !formData.townCity || !formData.stateProvince || !formData.postalCode))
                    }
                  >
                    Next
                  </Button>
                )}
                {step === 5 && (
                  <Button
                    type="submit"
                    disabled={!formData.agreeToTerms}
                    className="ml-auto bg-red-600 hover:bg-red-700"
                  >
                    Submit
                  </Button>
                )}
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
