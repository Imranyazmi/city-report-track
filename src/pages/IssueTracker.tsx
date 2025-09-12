import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { Search, Filter, MapPin, Clock, User, FileText } from "lucide-react";

// Mock data for issues
const allIssues = [
  {
    id: "ISS-001",
    title: "Pothole on Main Street",
    description: "Large pothole causing traffic issues and potential vehicle damage",
    location: "Main St & 5th Ave",
    status: "in-progress" as const,
    reportedAt: "2024-01-15T10:30:00Z",
    reportedBy: "John Smith",
    priority: "High",
    assignedTo: "Road Maintenance Dept",
    updates: [
      { date: "2024-01-16T09:00:00Z", message: "Issue assigned to road maintenance team", status: "in-progress" },
      { date: "2024-01-15T10:30:00Z", message: "Issue reported and under review", status: "pending" }
    ]
  },
  {
    id: "ISS-002",
    title: "Broken Street Light",
    description: "Street light not working, creating safety concerns during nighttime",
    location: "Park Avenue near Central Park",
    status: "pending" as const,
    reportedAt: "2024-01-14T16:45:00Z",
    reportedBy: "Sarah Johnson",
    priority: "Medium",
    assignedTo: "Electrical Services",
    updates: [
      { date: "2024-01-14T16:45:00Z", message: "Issue reported and awaiting assignment", status: "pending" }
    ]
  },
  {
    id: "ISS-003",
    title: "Garbage Collection Missed",
    description: "Weekly garbage collection was missed in residential area, causing overflow",
    location: "Residential Area Block 5, Elm Street",
    status: "resolved" as const,
    reportedAt: "2024-01-13T08:20:00Z",
    reportedBy: "Mike Chen",
    priority: "Medium",
    assignedTo: "Waste Management",
    updates: [
      { date: "2024-01-14T15:00:00Z", message: "Garbage collected, issue resolved", status: "resolved" },
      { date: "2024-01-13T12:00:00Z", message: "Scheduled for priority collection", status: "in-progress" },
      { date: "2024-01-13T08:20:00Z", message: "Issue reported", status: "pending" }
    ]
  },
  {
    id: "ISS-004",
    title: "Water Leakage in City Park",
    description: "Broken water pipe causing flooding in the park playground area",
    location: "Central Park - Playground Section",
    status: "in-progress" as const,
    reportedAt: "2024-01-12T14:10:00Z",
    reportedBy: "Lisa Rodriguez",
    priority: "High",
    assignedTo: "Water Utilities Dept",
    updates: [
      { date: "2024-01-13T08:00:00Z", message: "Repair crew dispatched to location", status: "in-progress" },
      { date: "2024-01-12T14:10:00Z", message: "Emergency water issue reported", status: "pending" }
    ]
  },
  {
    id: "ISS-005",
    title: "Damaged Stop Sign",
    description: "Stop sign knocked down after storm, needs immediate replacement",
    location: "Oak St & Maple Ave Intersection",
    status: "pending" as const,
    reportedAt: "2024-01-11T09:30:00Z",
    reportedBy: "Tom Wilson",
    priority: "High",
    assignedTo: "Traffic Safety Dept",
    updates: [
      { date: "2024-01-11T09:30:00Z", message: "Traffic safety issue reported", status: "pending" }
    ]
  }
];

export default function IssueTracker() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedIssue, setSelectedIssue] = useState<typeof allIssues[0] | null>(null);

  const filteredIssues = allIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Issue Tracker</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Search and track the status of reported civic issues in your community
          </p>
        </div>

        {/* Search and Filter Bar */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by issue ID, title, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-3">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Issues List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              Showing {filteredIssues.length} of {allIssues.length} issues
            </div>
            
            {filteredIssues.map((issue) => (
              <Card 
                key={issue.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedIssue?.id === issue.id ? "ring-2 ring-primary bg-primary/5" : ""
                }`}
                onClick={() => setSelectedIssue(issue)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground">{issue.title}</h3>
                        <StatusBadge status={issue.status} />
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{issue.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <FileText className="w-4 h-4 mr-2" />
                      <span className="font-medium">ID:</span>
                      <span className="ml-1">{issue.id}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      {formatRelativeTime(issue.reportedAt)}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      {issue.location}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <User className="w-4 h-4 mr-2" />
                      {issue.reportedBy}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredIssues.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">No issues found</h3>
                  <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Issue Details Sidebar */}
          <div className="space-y-4">
            {selectedIssue ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Issue Details</span>
                      <StatusBadge status={selectedIssue.status} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground">{selectedIssue.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{selectedIssue.description}</p>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Issue ID:</span>
                        <span className="font-medium">{selectedIssue.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Priority:</span>
                        <span className="font-medium">{selectedIssue.priority}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Reported By:</span>
                        <span className="font-medium">{selectedIssue.reportedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Assigned To:</span>
                        <span className="font-medium">{selectedIssue.assignedTo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium text-right">{selectedIssue.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Reported:</span>
                        <span className="font-medium">{formatDate(selectedIssue.reportedAt)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Status Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedIssue.updates.map((update, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-sm text-foreground">{update.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatDate(update.date)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Select an Issue</h3>
                  <p className="text-muted-foreground text-sm">
                    Click on an issue from the list to view detailed information and status updates
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}