import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Lock,
  Unlock,
  UserCheck,
  UserX,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Users,
  Shield,
  Key,
  Settings,
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  ChevronRight,
  FileText,
  Download,
  Upload,
  RotateCcw,
  CheckCheck,
  AlertCircle,
  Ban,
  UserPlus,
  RefreshCw,
  ExternalLink
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner@2.0.3";

interface AccessRightsProps {
  userRole: string;
  onApprovalsCountChange?: (count: number) => void;
}

interface PendingApproval {
  id: string;
  type: string;
  requestedBy: string;
  requestedFor: string;
  action: string;
  priority: "low" | "medium" | "high" | "urgent";
  submittedAt: string;
  department: string;
  details: string;
  status: "pending" | "approved" | "rejected";
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "active" | "inactive" | "suspended";
  lastLogin?: string;
}

interface Role {
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  isSystem: boolean;
}

export function AccessRights({ userRole, onApprovalsCountChange }: AccessRightsProps) {
  const [activeTab, setActiveTab] = useState("pending-approvals");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateUserDialog, setShowCreateUserDialog] = useState(false);

  // Pending Approvals State
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>([
    {
      id: "REQ-001",
      type: "Role Assignment",
      requestedBy: "John Admin",
      requestedFor: "Sarah Johnson",
      action: "Assign Campaign Manager role",
      priority: "high",
      submittedAt: "2024-12-08T10:30:00Z",
      department: "Marketing",
      details: "Sarah needs Campaign Manager role to manage upcoming holiday campaigns",
      status: "pending"
    },
    {
      id: "REQ-002",
      type: "Permission Change",
      requestedBy: "Lisa Wang",
      requestedFor: "Mike Chen",
      action: "Grant E-Store admin permissions",
      priority: "medium",
      submittedAt: "2024-12-08T09:15:00Z",
      department: "E-Commerce",
      details: "Mike needs admin access to manage product catalog and orders",
      status: "pending"
    },
    {
      id: "REQ-003",
      type: "Account Creation",
      requestedBy: "HR System",
      requestedFor: "Jennifer Lee",
      action: "Create new user account",
      priority: "urgent",
      submittedAt: "2024-12-08T08:45:00Z",
      department: "Support",
      details: "New hire starting today, needs immediate access to support systems",
      status: "pending"
    },
    {
      id: "REQ-004",
      type: "Role Removal",
      requestedBy: "John Admin",
      requestedFor: "Tom Wilson",
      action: "Remove Admin role",
      priority: "low",
      submittedAt: "2024-12-07T16:20:00Z",
      department: "IT",
      details: "Tom is transferring to a different department and no longer needs admin access",
      status: "pending"
    },
    {
      id: "REQ-005",
      type: "Account Suspension",
      requestedBy: "Security System",
      requestedFor: "Alex Turner",
      action: "Suspend user account",
      priority: "urgent",
      submittedAt: "2024-12-08T07:30:00Z",
      department: "Finance",
      details: "Suspicious login activity detected, account needs immediate suspension",
      status: "pending"
    }
  ]);

  // Users State
  const [users, setUsers] = useState<User[]>([
    {
      id: "user-001",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "Campaign Manager",
      department: "Marketing",
      status: "active",
      lastLogin: "2024-12-08T09:30:00Z"
    },
    {
      id: "user-002",
      name: "Mike Chen",
      email: "mike.chen@company.com",
      role: "E-Store Manager",
      department: "E-Commerce",
      status: "active",
      lastLogin: "2024-12-08T08:15:00Z"
    },
    {
      id: "user-003",
      name: "Lisa Wang",
      email: "lisa.wang@company.com",
      role: "Support Lead",
      department: "Support",
      status: "active",
      lastLogin: "2024-12-08T10:00:00Z"
    },
    {
      id: "user-004",
      name: "Tom Wilson",
      email: "tom.wilson@company.com",
      role: "System Admin",
      department: "IT",
      status: "inactive",
      lastLogin: "2024-12-07T17:45:00Z"
    }
  ]);

  // Roles State
  const [roles] = useState<Role[]>([
    {
      name: "Super Admin",
      description: "Full system access with all permissions",
      permissions: ["all_access", "user_management", "system_config", "audit_logs"],
      userCount: 2,
      isSystem: true
    },
    {
      name: "Campaign Manager",
      description: "Manage campaigns and rewards programs",
      permissions: ["campaign_create", "campaign_edit", "rewards_view", "analytics_view"],
      userCount: 5,
      isSystem: false
    },
    {
      name: "E-Store Manager",
      description: "Manage e-store products and orders",
      permissions: ["estore_manage", "products_crud", "orders_view", "analytics_view"],
      userCount: 3,
      isSystem: false
    },
    {
      name: "Support Lead",
      description: "Handle customer support and complaints",
      permissions: ["support_manage", "complaints_view", "customer_view", "reports_view"],
      userCount: 8,
      isSystem: false
    },
    {
      name: "Analytics Viewer",
      description: "View reports and analytics only",
      permissions: ["analytics_view", "reports_view"],
      userCount: 12,
      isSystem: false
    }
  ]);

  // Update approvals count when component mounts or when pendingApprovals changes
  useEffect(() => {
    if (onApprovalsCountChange) {
      onApprovalsCountChange(pendingApprovals.length);
    }
  }, [pendingApprovals.length, onApprovalsCountChange]);

  // Utility Functions
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "destructive";
      case "high":
        return "secondary";
      case "medium":
        return "outline";
      case "low":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "inactive":
        return "secondary";
      case "suspended":
        return "destructive";
      default:
        return "outline";
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handler Functions
  const handleApprove = (requestId: string) => {
    setPendingApprovals(prev => prev.filter(request => request.id !== requestId));
    toast.success("Request approved successfully");
  };

  const handleReject = (requestId: string) => {
    setPendingApprovals(prev => prev.filter(request => request.id !== requestId));
    toast.success("Request rejected");
  };

  const handleCreateUser = (userData: any) => {
    // Create new approval request for user creation
    const newRequest: PendingApproval = {
      id: `REQ-${String(pendingApprovals.length + 1).padStart(3, '0')}`,
      type: "Account Creation",
      requestedBy: "Admin User",
      requestedFor: userData.name,
      action: `Create ${userData.role} account`,
      priority: "medium",
      submittedAt: new Date().toISOString(),
      department: userData.department,
      details: `Create new user account for ${userData.name} with ${userData.role} role in ${userData.department} department`,
      status: "pending"
    };

    setPendingApprovals(prev => [...prev, newRequest]);
    setShowCreateUserDialog(false);
    toast.success("User creation request submitted for approval");
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Access Rights Management</h1>
          <p className="text-muted-foreground">
            Manage user access, roles, and approval workflows
          </p>
        </div>
        <div className="flex gap-2">
          {(userRole === "admin" || userRole === "maker") && (
            <Button onClick={() => setShowCreateUserDialog(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Create User
            </Button>
          )}
          {userRole === "admin" && (
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Audit Log
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="pending-approvals" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Pending Approvals
            <Badge variant="destructive" className="ml-1">{pendingApprovals.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Roles & Permissions
          </TabsTrigger>
          <TabsTrigger value="audit-log" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Audit Log
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Pending Approvals Tab */}
        <TabsContent value="pending-approvals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Pending Approval Requests
              </CardTitle>
              <CardDescription>
                Review and approve access right changes requiring authorization
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingApprovals.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No Pending Approvals</h3>
                  <p className="text-muted-foreground">All access requests have been processed.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Requested By</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingApprovals.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.id}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{request.type}</Badge>
                        </TableCell>
                        <TableCell>{request.requestedBy}</TableCell>
                        <TableCell>{request.action}</TableCell>
                        <TableCell>
                          <Badge variant={getPriorityColor(request.priority)}>
                            {request.priority.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDateTime(request.submittedAt)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Request Details - {request.id}</DialogTitle>
                                  <DialogDescription>
                                    Review the access rights change request
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Request Type</Label>
                                      <p className="text-sm">{request.type}</p>
                                    </div>
                                    <div>
                                      <Label>Priority</Label>
                                      <Badge variant={getPriorityColor(request.priority)} className="mt-1">
                                        {request.priority.toUpperCase()}
                                      </Badge>
                                    </div>
                                    <div>
                                      <Label>Requested By</Label>
                                      <p className="text-sm">{request.requestedBy}</p>
                                    </div>
                                    <div>
                                      <Label>Requested For</Label>
                                      <p className="text-sm">{request.requestedFor}</p>
                                    </div>
                                    <div>
                                      <Label>Department</Label>
                                      <p className="text-sm">{request.department}</p>
                                    </div>
                                    <div>
                                      <Label>Submitted At</Label>
                                      <p className="text-sm">{formatDateTime(request.submittedAt)}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <Label>Action Required</Label>
                                    <p className="text-sm">{request.action}</p>
                                  </div>
                                  <div>
                                    <Label>Details</Label>
                                    <p className="text-sm text-muted-foreground">{request.details}</p>
                                  </div>
                                  <div className="flex justify-end gap-2 pt-4">
                                    <Button 
                                      variant="outline" 
                                      onClick={() => handleReject(request.id)}
                                    >
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Reject
                                    </Button>
                                    <Button onClick={() => handleApprove(request.id)}>
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Approve
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleApprove(request.id)}
                            >
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleReject(request.id)}
                            >
                              <XCircle className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>
                Manage user accounts, roles, and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/placeholder-avatar-${user.id}.jpg`} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.lastLogin ? formatDateTime(user.lastLogin) : 'Never'}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Key className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles & Permissions Tab */}
        <TabsContent value="roles" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {roles.map((role) => (
              <Card key={role.name}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      {role.name}
                    </CardTitle>
                    <Badge variant="secondary">{role.userCount} users</Badge>
                  </div>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <Label>Permissions</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {role.permissions.map((permission, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-muted-foreground">
                        {role.isSystem ? 'System Role' : 'Custom Role'}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {!role.isSystem && (
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Audit Log Tab */}
        <TabsContent value="audit-log" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Access Rights Audit Log
              </CardTitle>
              <CardDescription>
                Track all access rights changes and administrative actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "LOG-001",
                    action: "Role Assignment",
                    description: "Assigned Campaign Manager role to Sarah Johnson",
                    performer: "Admin User",
                    timestamp: "2024-12-08T10:45:00Z",
                    type: "role_assignment",
                    status: "completed"
                  },
                  {
                    id: "LOG-002",
                    action: "Permission Change",
                    description: "Granted E-Store admin permissions to Lisa Wang",
                    performer: "John Admin",
                    timestamp: "2024-12-08T09:30:00Z",
                    type: "permission_change",
                    status: "completed"
                  },
                  {
                    id: "LOG-003",
                    action: "Account Disabled",
                    description: "Disabled account for John Smith",
                    performer: "HR System",
                    timestamp: "2024-12-08T08:15:00Z",
                    type: "account_disabled",
                    status: "completed"
                  }
                ].map((log) => (
                  <div key={log.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{log.action}</span>
                        <Badge variant="outline" className="text-xs">{log.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{log.description}</p>
                      <p className="text-xs text-muted-foreground">
                        by {log.performer} • {formatDateTime(log.timestamp)}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Approval Workflow</CardTitle>
                <CardDescription>
                  Configure maker/checker approval requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require approval for role changes</Label>
                    <p className="text-sm text-muted-foreground">All role assignments need approval</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require approval for permission changes</Label>
                    <p className="text-sm text-muted-foreground">Permission modifications need approval</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require approval for account creation</Label>
                    <p className="text-sm text-muted-foreground">New accounts need approval</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure security and authentication settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable 2FA requirement</Label>
                    <p className="text-sm text-muted-foreground">Require two-factor authentication</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Session timeout</Label>
                    <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15m</SelectItem>
                      <SelectItem value="30">30m</SelectItem>
                      <SelectItem value="60">1h</SelectItem>
                      <SelectItem value="120">2h</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Password complexity</Label>
                    <p className="text-sm text-muted-foreground">Enforce strong passwords</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create User Dialog */}
      <Dialog open={showCreateUserDialog} onOpenChange={setShowCreateUserDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Request creation of a new user account
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            handleCreateUser({
              name: formData.get('name'),
              email: formData.get('email'),
              role: formData.get('role'),
              department: formData.get('department')
            });
          }}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input name="name" required />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input name="email" type="email" required />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select name="role" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.filter(role => !role.isSystem).map((role) => (
                      <SelectItem key={role.name} value={role.name}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Select name="department" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Support">Support</SelectItem>
                    <SelectItem value="E-Commerce">E-Commerce</SelectItem>
                    <SelectItem value="Analytics">Analytics</SelectItem>
                    <SelectItem value="Human Resources">Human Resources</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowCreateUserDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Submit Request
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}