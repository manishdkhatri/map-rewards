import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Mail,
  Phone,
  Calendar,
  Filter,
  Search,
  Send,
  Paperclip,
  Eye,
  Edit,
  Archive,
  RotateCcw,
  Star,
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  X
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useCurrency } from "../hooks/useCurrency";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ComplaintManagementProps {
  onViewComplaint: (complaint: any) => void;
}

export function ComplaintManagement({ onViewComplaint }: ComplaintManagementProps) {
  const { formatCurrency, convertCurrency } = useCurrency();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isResolutionDialogOpen, setIsResolutionDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock complaints data
  const complaints = [
    {
      id: "CMP-2024-001",
      customer: {
        id: "CUST-001",
        name: "Priya Sharma",
        email: "priya.sharma@email.com",
        phone: "+1 (555) 123-4567",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612e7ab?w=150&h=150&fit=crop&crop=face"
      },
      title: "Points not credited after purchase",
      category: "Points & Rewards",
      priority: "high",
      status: "open",
      description: "I made a purchase of $299 for headphones 3 days ago but haven't received my loyalty points yet. Order ID: ORD-2024-001",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z",
      assignedTo: "John Smith",
      tags: ["points", "purchase", "delay"],
      attachments: ["receipt.pdf"],
      communications: [
        {
          id: 1,
          type: "customer",
          message: "I made a purchase 3 days ago but still haven't received my points.",
          timestamp: "2024-01-15T10:30:00Z",
          author: "Priya Sharma"
        }
      ],
      orderDetails: {
        orderId: "ORD-2024-001",
        amount: 299,
        expectedPoints: 2990
      }
    },
    {
      id: "CMP-2024-002",
      customer: {
        id: "CUST-002",
        name: "Arjun Patel",
        email: "arjun.patel@email.com",
        phone: "+1 (555) 234-5678",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      title: "Unable to redeem gift card",
      category: "Redemption Issues",
      priority: "medium",
      status: "in-progress",
      description: "Gift card code is showing as invalid when trying to redeem. Code: GC-50-2024-001",
      createdAt: "2024-01-14T14:15:00Z",
      updatedAt: "2024-01-15T09:22:00Z",
      assignedTo: "Emily Davis",
      tags: ["gift-card", "redemption", "technical"],
      attachments: ["screenshot.png"],
      communications: [
        {
          id: 1,
          type: "customer",
          message: "My gift card code isn't working. Can you help?",
          timestamp: "2024-01-14T14:15:00Z",
          author: "Arjun Patel"
        },
        {
          id: 2,
          type: "agent",
          message: "Hi Mike, I'm looking into this issue. Can you provide the exact error message you're seeing?",
          timestamp: "2024-01-14T16:20:00Z",
          author: "Emily Davis"
        },
        {
          id: 3,
          type: "customer",
          message: "It says 'Invalid gift card code. Please check and try again.'",
          timestamp: "2024-01-14T16:45:00Z",
          author: "Arjun Patel"
        }
      ]
    },
    {
      id: "CMP-2024-003",
      customer: {
        id: "CUST-003",
        name: "Kavya Reddy",
        email: "kavya.reddy@email.com",
        phone: "+1 (555) 345-6789",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      title: "Account locked after multiple login attempts",
      category: "Account Issues",
      priority: "urgent",
      status: "resolved",
      description: "My account got locked and I can't access my rewards dashboard.",
      createdAt: "2024-01-13T09:45:00Z",
      updatedAt: "2024-01-13T11:30:00Z",
      assignedTo: "David Wilson",
      tags: ["account", "security", "locked"],
      attachments: [],
      communications: [
        {
          id: 1,
          type: "customer",
          message: "I can't log into my account. It says it's locked.",
          timestamp: "2024-01-13T09:45:00Z",
          author: "Kavya Reddy"
        },
        {
          id: 2,
          type: "agent",
          message: "I've unlocked your account and sent you a password reset link.",
          timestamp: "2024-01-13T11:30:00Z",
          author: "David Wilson"
        }
      ],
      resolution: {
        resolvedAt: "2024-01-13T11:30:00Z",
        resolvedBy: "David Wilson",
        resolution: "Account unlocked and password reset link provided. Customer confirmed access restored.",
        satisfaction: 5
      }
    },
    {
      id: "CMP-2024-004",
      customer: {
        id: "CUST-004",
        name: "Rohit Kumar",
        email: "rohit.kumar@email.com",
        phone: "+1 (555) 456-7890",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      title: "Shipping delay for spa voucher",
      category: "Shipping & Delivery",
      priority: "low",
      status: "closed",
      description: "Spa voucher was supposed to arrive yesterday but hasn't been delivered yet.",
      createdAt: "2024-01-12T16:20:00Z",
      updatedAt: "2024-01-14T10:15:00Z",
      assignedTo: "Sarah Thompson",
      tags: ["shipping", "voucher", "delay"],
      attachments: [],
      communications: [
        {
          id: 1,
          type: "customer",
          message: "My spa voucher hasn't arrived yet. Tracking shows it should have been delivered yesterday.",
          timestamp: "2024-01-12T16:20:00Z",
          author: "Rohit Kumar"
        },
        {
          id: 2,
          type: "agent",
          message: "I've contacted the shipping provider. Your voucher will be delivered today with expedited shipping at no cost.",
          timestamp: "2024-01-13T10:00:00Z",
          author: "Sarah Thompson"
        },
        {
          id: 3,
          type: "customer",
          message: "Perfect! Just received it. Thank you for the quick resolution.",
          timestamp: "2024-01-14T10:15:00Z",
          author: "Rohit Kumar"
        }
      ],
      resolution: {
        resolvedAt: "2024-01-14T10:15:00Z",
        resolvedBy: "Sarah Thompson",
        resolution: "Coordinated with shipping provider for expedited delivery. Customer received voucher successfully.",
        satisfaction: 4
      }
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "open": return "destructive";
      case "in-progress": return "secondary";
      case "resolved": return "default";
      case "closed": return "outline";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "urgent": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "high": return <ArrowUpRight className="h-4 w-4 text-orange-600" />;
      case "medium": return <ArrowDownRight className="h-4 w-4 text-yellow-600" />;
      case "low": return <TrendingDown className="h-4 w-4 text-green-600" />;
      default: return null;
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesStatus = filterStatus === "all" || complaint.status === filterStatus;
    const matchesPriority = filterPriority === "all" || complaint.priority === filterPriority;
    const matchesSearch = searchQuery === "" || 
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const handleViewComplaintInternal = (complaint) => {
    onViewComplaint(complaint);
  };

  const handleResolveComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setIsResolutionDialogOpen(true);
  };

  const handleSendMessage = (complaintId, message) => {
    toast.success("Message sent to customer");
    // In a real app, this would send the message
  };

  const complaintStats = {
    total: complaints.length,
    open: complaints.filter(c => c.status === "open").length,
    inProgress: complaints.filter(c => c.status === "in-progress").length,
    resolved: complaints.filter(c => c.status === "resolved").length,
    avgResolutionTime: "2.3 hours",
    satisfactionRate: "94%"
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium">Support & Complaints</h1>
          <p className="text-muted-foreground">
            Manage customer complaints and provide exceptional support
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="complaints" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            All Complaints
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{complaintStats.total}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+2 from yesterday</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{complaintStats.open}</div>
                <p className="text-xs text-muted-foreground">
                  Requires attention
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <Clock className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{complaintStats.inProgress}</div>
                <p className="text-xs text-muted-foreground">
                  Being resolved
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{complaintStats.resolved}</div>
                <p className="text-xs text-muted-foreground">
                  This week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Resolution</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{complaintStats.avgResolutionTime}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">-15min from last week</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
                <Star className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{complaintStats.satisfactionRate}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+2% this month</span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Complaints */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Complaints Requiring Attention</CardTitle>
              <CardDescription>
                Complaints that need immediate action
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complaints.filter(c => c.status === "open" || c.status === "in-progress").slice(0, 3).map((complaint) => (
                  <div key={complaint.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={complaint.customer.avatar} />
                        <AvatarFallback>{complaint.customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{complaint.title}</h4>
                          <Badge className={getPriorityColor(complaint.priority)} variant="secondary">
                            {complaint.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{complaint.customer.name}</span>
                          <span>•</span>
                          <span>{complaint.id}</span>
                          <span>•</span>
                          <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(complaint.status)}>
                        {complaint.status}
                      </Badge>
                      <Button variant="outline" size="sm" onClick={() => handleViewComplaintInternal(complaint)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* All Complaints Tab */}
        <TabsContent value="complaints" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search complaints by title, customer, or ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Complaints Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Complaints ({filteredComplaints.length})</CardTitle>
              <CardDescription>
                Manage and track all customer complaints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Complaint</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredComplaints.map((complaint) => (
                    <TableRow key={complaint.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{complaint.title}</div>
                          <div className="text-sm text-muted-foreground">{complaint.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={complaint.customer.avatar} />
                            <AvatarFallback>{complaint.customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{complaint.customer.name}</div>
                            <div className="text-sm text-muted-foreground">{complaint.customer.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{complaint.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getPriorityIcon(complaint.priority)}
                          <Badge className={getPriorityColor(complaint.priority)} variant="secondary">
                            {complaint.priority}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(complaint.status)}>
                          {complaint.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-sm">
                        {complaint.assignedTo}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewComplaintInternal(complaint)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          {(complaint.status === "open" || complaint.status === "in-progress") && (
                            <Button variant="outline" size="sm" onClick={() => handleResolveComplaint(complaint)}>
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Complaint Categories</CardTitle>
                <CardDescription>Distribution of complaint types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "Points & Rewards", count: 15, percentage: 35 },
                    { category: "Redemption Issues", count: 12, percentage: 28 },
                    { category: "Account Issues", count: 8, percentage: 19 },
                    { category: "Shipping & Delivery", count: 5, percentage: 12 },
                    { category: "Technical Issues", count: 3, percentage: 6 }
                  ].map((item) => (
                    <div key={item.category} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{item.category}</span>
                          <span className="text-sm text-muted-foreground">{item.count}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resolution Performance</CardTitle>
                <CardDescription>Support team performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Resolution Time</span>
                    <span className="font-medium">2.3 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">First Response Time</span>
                    <span className="font-medium">24 minutes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Customer Satisfaction</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Resolution Rate</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">This Month vs Last Month</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Complaints</span>
                    <span className="text-sm text-green-600">-12%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Resolution Speed</span>
                    <span className="text-sm text-green-600">+18%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>



      {/* Resolve Complaint Dialog */}
      <Dialog open={isResolutionDialogOpen} onOpenChange={setIsResolutionDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Resolve Complaint</DialogTitle>
            <DialogDescription>
              Mark this complaint as resolved and provide resolution details
            </DialogDescription>
          </DialogHeader>
          
          {selectedComplaint && (
            <div className="space-y-4">
              <div className="p-3 bg-muted/50 rounded-lg">
                <h4 className="font-medium">{selectedComplaint.title}</h4>
                <p className="text-sm text-muted-foreground">{selectedComplaint.customer.name} • {selectedComplaint.id}</p>
              </div>
              
              <div className="space-y-2">
                <Label>Resolution Summary</Label>
                <Textarea 
                  placeholder="Describe how the complaint was resolved..."
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Follow-up Action Required</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select follow-up action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No follow-up needed</SelectItem>
                    <SelectItem value="monitor">Monitor for 48 hours</SelectItem>
                    <SelectItem value="callback">Schedule callback</SelectItem>
                    <SelectItem value="survey">Send satisfaction survey</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsResolutionDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  toast.success("Complaint marked as resolved");
                  setIsResolutionDialogOpen(false);
                }}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Resolve Complaint
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}