import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { FileText, Search, Users, TrendingUp, MapPin, Clock } from "lucide-react";
import heroImage from "@/assets/civic-hero.jpg";

// Mock data for recent issues
const recentIssues = [
  {
    id: "ISS-001",
    title: "Pothole on Main Street",
    location: "Main St & 5th Ave",
    status: "in-progress" as const,
    reportedAt: "2 hours ago",
    description: "Large pothole causing traffic issues"
  },
  {
    id: "ISS-002", 
    title: "Broken Street Light",
    location: "Park Avenue",
    status: "pending" as const,
    reportedAt: "4 hours ago",
    description: "Street light not working, safety concern"
  },
  {
    id: "ISS-003",
    title: "Garbage Collection Missed",
    location: "Residential Area Block 5",
    status: "resolved" as const,
    reportedAt: "1 day ago",
    description: "Weekly garbage collection was missed"
  },
];

const stats = [
  { label: "Total Reports", value: "1,247", icon: FileText },
  { label: "Resolved Issues", value: "892", icon: TrendingUp },
  { label: "Active Citizens", value: "3,456", icon: Users },
  { label: "Avg Response Time", value: "2.3 days", icon: Clock },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Your City, Your Voice
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Report, Track, Resolve. An efficient platform connecting citizens with local authorities to improve our community together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/report" className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Report Issue Now</span>
                  </Link>
                </Button>
                <Button variant="civic" size="lg" asChild>
                  <Link to="/tracker" className="flex items-center space-x-2">
                    <Search className="w-5 h-5" />
                    <span>Track Your Issue</span>
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img
                src={heroImage}
                alt="Modern civic technology connecting citizens with local government"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center p-6 hover:shadow-md transition-shadow">
                  <CardContent className="space-y-3 p-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Issues Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Recent Issue Reports</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest community issues and their resolution progress
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {recentIssues.map((issue) => (
              <Card key={issue.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold">{issue.title}</CardTitle>
                    <StatusBadge status={issue.status} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {issue.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    {issue.reportedAt}
                  </div>
                  <p className="text-sm text-foreground">{issue.description}</p>
                  <div className="pt-2">
                    <span className="text-xs text-muted-foreground font-medium">
                      Issue ID: {issue.id}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/tracker">View All Issues</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-primary-hover text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join thousands of citizens working together to improve our community
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link to="/report">Start Reporting Issues</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}