import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Camera, FileText, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const issueTypes = [
  "Pothole/Road Damage",
  "Street Light Issues",
  "Garbage Collection",
  "Water Leakage",
  "Illegal Parking",
  "Damaged Signage",
  "Park Maintenance",
  "Public Safety",
  "Other"
];

export default function ReportIssue() {
  const [formData, setFormData] = useState({
    issueType: "",
    title: "",
    description: "",
    location: "",
    contactPhone: "",
    contactEmail: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      toast({
        title: "Issue Reported Successfully",
        description: "Your issue has been submitted. Issue ID: ISS-" + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
      });
    }, 500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="text-center py-12">
            <CardContent className="space-y-6">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Issue Reported Successfully!</h2>
              <p className="text-muted-foreground">
                Thank you for helping improve our community. You'll receive updates on the resolution progress.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" onClick={() => setIsSubmitted(false)}>
                  Report Another Issue
                </Button>
                <Button variant="outline" asChild>
                  <a href="/tracker">Track Your Issues</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Report a Civic Issue</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Help us improve our community by reporting issues that need attention. Provide as much detail as possible for faster resolution.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Issue Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="issueType">Issue Type *</Label>
                    <Select value={formData.issueType} onValueChange={(value) => handleInputChange("issueType", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                      <SelectContent>
                        {issueTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="title">Issue Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Brief description of the issue"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Detailed Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Provide detailed information about the issue, including when you first noticed it"
                      className="min-h-32"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>Location Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="location">Location/Address *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Street address, intersection, or landmark"
                      required
                    />
                  </div>
                  
                  <div className="bg-muted/30 border border-dashed border-border rounded-lg p-8 text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">Interactive map integration</p>
                    <p className="text-xs text-muted-foreground">Click to pin exact location on map (Feature coming soon)</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Camera className="w-5 h-5" />
                    <span>Photo Upload</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/30 border border-dashed border-border rounded-lg p-8 text-center">
                    <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">Upload photos of the issue</p>
                    <p className="text-xs text-muted-foreground">Drag and drop files here or click to browse (Max 5MB each)</p>
                    <Button variant="outline" className="mt-4" type="button">
                      Select Photos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Optional: Provide contact info to receive updates on your report
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-2">What happens next?</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Your report gets a unique tracking ID</li>
                    <li>• Authorities review within 24 hours</li>
                    <li>• You receive status updates via email</li>
                    <li>• Resolution timeline depends on issue type</li>
                  </ul>
                </CardContent>
              </Card>

              <Button type="submit" className="w-full" size="lg">
                Submit Issue Report
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}