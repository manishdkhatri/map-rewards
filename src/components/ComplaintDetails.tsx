import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Label } from "./ui/label";
import { 
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Mail,
  Phone,
  Calendar,
  Send,
  Edit,
  Archive,
  Star,
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  TrendingDown
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useCurrency } from "../hooks/useCurrency";

interface ComplaintDetailsProps {
  complaint: any;
  onBack: () => void;
}

export function ComplaintDetails({ complaint, onBack }: ComplaintDetailsProps) {
  const { formatCurrency, convertCurrency } = useCurrency();
  const [isResolutionDialogOpen, setIsResolutionDialogOpen] = useState(false);

  if (!complaint) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">No complaint selected</h3>
          <p className="text-muted-foreground">Please select a complaint to view details.</p>
        </div>
      </div>
    );
  }

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

  const handleSendMessage = (message) => {
    toast.success("Message sent to customer");
    // In a real app, this would send the message
  };

  const handleResolveComplaint = () => {
    setIsResolutionDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Complaints
          </Button>
          <div>
            <h1 className="text-3xl font-medium">Complaint Details</h1>
            <p className="text-muted-foreground">
              {complaint.id} • Created {new Date(complaint.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {(complaint.status === "open" || complaint.status === "in-progress") && (
            <Button onClick={handleResolveComplaint}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Resolve Complaint
            </Button>
          )}
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit Details
          </Button>
          <Button variant="outline">
            <Archive className="h-4 w-4 mr-2" />
            Archive
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Complaint Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Complaint Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{complaint.title}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(complaint.status)}>
                      {complaint.status}
                    </Badge>
                    <div className="flex items-center gap-2">
                      {getPriorityIcon(complaint.priority)}
                      <Badge className={getPriorityColor(complaint.priority)} variant="secondary">
                        {complaint.priority}
                      </Badge>
                    </div>
                    <Badge variant="outline">{complaint.category}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm">{complaint.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Communications */}
          <Card>
            <CardHeader>
              <CardTitle>Communication History</CardTitle>
              <CardDescription>
                All interactions between customer and support team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="h-[400px] border rounded-lg p-4">
                <div className="space-y-4">
                  {complaint.communications.map((comm) => (
                    <div key={comm.id} className={`flex ${comm.type === 'agent' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        comm.type === 'agent' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">{comm.author}</span>
                          <span className="text-xs opacity-70">
                            {new Date(comm.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm">{comm.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Message Input */}
              <div className="flex gap-2">
                <Textarea 
                  placeholder="Type your response..." 
                  className="flex-1" 
                  rows={3}
                />
                <Button onClick={() => handleSendMessage("message")}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Customer & Details */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={complaint.customer.avatar} />
                  <AvatarFallback>{complaint.customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{complaint.customer.name}</div>
                  <div className="text-sm text-muted-foreground">{complaint.customer.id}</div>
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{complaint.customer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{complaint.customer.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Complaint Details */}
          <Card>
            <CardHeader>
              <CardTitle>Complaint Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Created:</span>
                <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Updated:</span>
                <span>{new Date(complaint.updatedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Assigned To:</span>
                <span>{complaint.assignedTo}</span>
              </div>
              {complaint.tags && (
                <div>
                  <span className="text-sm text-muted-foreground">Tags:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {complaint.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Details (if applicable) */}
          {complaint.orderDetails && (
            <Card>
              <CardHeader>
                <CardTitle>Related Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span className="font-medium">{complaint.orderDetails.orderId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount:</span>
                  <span>{formatCurrency(convertCurrency(complaint.orderDetails.amount))}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Expected Points:</span>
                  <span>{complaint.orderDetails.expectedPoints?.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Resolution (if resolved) */}
          {complaint.resolution && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Resolution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="mb-2">{complaint.resolution.resolution}</p>
                  <div className="text-muted-foreground">
                    Resolved by {complaint.resolution.resolvedBy} on {new Date(complaint.resolution.resolvedAt).toLocaleDateString()}
                  </div>
                </div>
                {complaint.resolution.satisfaction && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Customer Rating:</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < complaint.resolution.satisfaction ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Resolve Complaint Dialog */}
      <Dialog open={isResolutionDialogOpen} onOpenChange={setIsResolutionDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Resolve Complaint</DialogTitle>
            <DialogDescription>
              Mark this complaint as resolved and provide resolution details
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-3 bg-muted/50 rounded-lg">
              <h4 className="font-medium">{complaint.title}</h4>
              <p className="text-sm text-muted-foreground">{complaint.customer.name} • {complaint.id}</p>
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
        </DialogContent>
      </Dialog>
    </div>
  );
}