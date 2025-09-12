import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  BarChart3, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Search, 
  Filter,
  MapPin,
  User,
  Calendar,
  TrendingUp,
  Users,
  FileText
} from "lucide-react";

// Mock dashboard data
const dashboardStats = [
  { label: "Open Issues", value: 23, icon: AlertTriangle, trend: "+3 this week", color: "text-warning" },
  { label: "In Progress", value: 15, icon: Clock, trend: "+5 this week", color: "text-primary" },
  { label: "Resolved Today", value: 8, icon: CheckCircle, trend: "↑ 12% vs yesterday", color: "text-success" },
  { label: "Avg Response Time", value: "2.3 days", icon: TrendingUp, trend: "↓ 0.5 days", color: "text-primary" },
];

const priorityIssues = [
  {
    id: "ISS-001",
    title: "Pothole on Main Street",
    location: "Main St & 5th Ave", 
    priority: "High",
    status: "in-progress" as const,
    assignedTo: "Road Maintenance Team",
    reportedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "ISS-005", 
    title: "Damaged Stop Sign",
    location: "Oak St & Maple Ave",
    priority: "High", 
    status: "pending" as const,
    assignedTo: "Unassigned",
    reportedAt: "2024-01-11T09:30:00Z"
  },
  {
    id: "ISS-004",
    title: "Water Leakage in City Park", 
    location: "Central Park - Playground",
    priority: "High",
    status: "in-progress" as const,
    assignedTo: "Water Utilities Dept",
    reportedAt: "2024-01-12T14:10:00Z"
  }
];

const recentActivity = [
  { action: "Issue ISS-003 marked as resolved", user: "Mike Chen - Waste Mgmt", time: "2 hours ago" },
  { action: "New issue ISS-006 reported", user: "System", time: "3 hours ago" },
  { action: "Issue ISS-001 assigned to Road Team", user: "Admin", time: "5 hours ago" },
  { action: "Issue ISS-004 status updated", user: "Water Utilities", time: "8 hours ago" },
];

export default function AuthorityDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-danger/10 text-danger border-danger/20";
      case "Medium": return "bg-warning/10 text-warning border-warning/20";
      case "Low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              Authority Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">Municipal Issue Management System</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="default" size="sm">
              <Users className="w-4 h-4 mr-2" />
              Manage Team
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Priority Issues */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                    High Priority Issues
                  </CardTitle>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {priorityIssues.map((issue) => (
                  <div key={issue.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-foreground">{issue.title}</h4>
                          <Badge className={getPriorityColor(issue.priority)}>{issue.priority}</Badge>
                          <StatusBadge status={issue.status} />
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {issue.id}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {issue.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatRelativeTime(issue.reportedAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Assigned to: <span className="font-medium">{issue.assignedTo}</span>
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button variant="default" size="sm">Update Status</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Search and Filter */}
            <Card>
              <CardHeader>
                <CardTitle>All Issues Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search issues by ID, title, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending Review</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="text-center py-8 border border-dashed rounded-lg">
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Use filters above to manage issues</p>
                  <Button variant="link" className="mt-2">Advanced Search</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Feed & Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">{activity.action}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-muted-foreground truncate">{activity.user}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Create Manual Report
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Assign to Team Member
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Maintenance
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Analytics
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Response Rate</span>
                    <span className="text-success font-medium">98.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Resolution</span>
                    <span className="font-medium">2.3 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Citizen Satisfaction</span>
                    <span className="text-success font-medium">4.7/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}