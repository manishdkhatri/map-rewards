import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  CreditCard,
  Award,
  Activity,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Plus,
  ArrowLeft,
  ArrowRight,
  Info,
  DollarSign
} from "lucide-react";
import { useCurrency } from "../hooks/useCurrency";

interface CustomerManagementProps {
  onViewCustomer?: (customer: any) => void;
  onEditCustomer?: (customer: any) => void;
}

export function CustomerManagement({ onViewCustomer, onEditCustomer }: CustomerManagementProps) {
  const { formatCurrency, convertCurrency } = useCurrency();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [newCustomerData, setNewCustomerData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    idType: "",
    idNumber: "",
    
    // Contact Information
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    preferredLanguage: "",
    
    // Banking Details
    accountType: "",
    branchCode: "",
    accountNumber: "",
    iban: "",
    routingNumber: "",
    
    // Account Settings
    customerTier: "bronze",
    status: "active",
    marketingConsent: false,
    smsNotifications: true,
    emailNotifications: true,
    pushNotifications: false,
    
    // Preferences
    preferredChannel: "",
    referralCode: "",
    notes: ""
  });

  const totalSteps = 4;

  const handleAddCustomerSubmit = () => {
    // Validate form data
    if (!newCustomerData.firstName || !newCustomerData.lastName || !newCustomerData.email) {
      alert("Please fill in all required fields");
      return;
    }
    
    // In a real app, this would make an API call
    console.log("Creating new customer:", newCustomerData);
    
    // Reset form and close dialog
    setNewCustomerData({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      nationality: "",
      idType: "",
      idNumber: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      preferredLanguage: "",
      accountType: "",
      branchCode: "",
      accountNumber: "",
      iban: "",
      routingNumber: "",
      customerTier: "bronze",
      status: "active",
      marketingConsent: false,
      smsNotifications: true,
      emailNotifications: true,
      pushNotifications: false,
      preferredChannel: "",
      referralCode: "",
      notes: ""
    });
    setCurrentStep(1);
    setIsAddCustomerOpen(false);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    placeholder="Enter first name"
                    value={newCustomerData.firstName}
                    onChange={(e) => setNewCustomerData(prev => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter last name"
                    value={newCustomerData.lastName}
                    onChange={(e) => setNewCustomerData(prev => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={newCustomerData.dateOfBirth}
                    onChange={(e) => setNewCustomerData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select 
                    value={newCustomerData.gender} 
                    onValueChange={(value) => setNewCustomerData(prev => ({ ...prev, gender: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    placeholder="Enter nationality"
                    value={newCustomerData.nationality}
                    onChange={(e) => setNewCustomerData(prev => ({ ...prev, nationality: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="preferredLanguage">Preferred Language</Label>
                  <Select 
                    value={newCustomerData.preferredLanguage} 
                    onValueChange={(value) => setNewCustomerData(prev => ({ ...prev, preferredLanguage: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="marathi">Marathi</SelectItem>
                      <SelectItem value="gujarati">Gujarati</SelectItem>
                      <SelectItem value="tamil">Tamil</SelectItem>
                      <SelectItem value="telugu">Telugu</SelectItem>
                      <SelectItem value="bengali">Bengali</SelectItem>
                      <SelectItem value="kannada">Kannada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="idType">ID Type</Label>
                  <Select 
                    value={newCustomerData.idType} 
                    onValueChange={(value) => setNewCustomerData(prev => ({ ...prev, idType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                      <SelectItem value="pan">PAN Card</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="driving-license">Driving License</SelectItem>
                      <SelectItem value="voter-id">Voter ID Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="idNumber">ID Number</Label>
                  <Input
                    id="idNumber"
                    placeholder="Enter ID number"
                    value={newCustomerData.idNumber}
                    onChange={(e) => setNewCustomerData(prev => ({ ...prev, idNumber: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={newCustomerData.email}
                    onChange={(e) => setNewCustomerData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={newCustomerData.phone}
                    onChange={(e) => setNewCustomerData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  placeholder="Enter full address"
                  rows={2}
                  value={newCustomerData.address}
                  onChange={(e) => setNewCustomerData(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Enter city"
                    value={newCustomerData.city}
                    onChange={(e) => setNewCustomerData(prev => ({ ...prev, city: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select 
                    value={newCustomerData.state} 
                    onValueChange={(value) => setNewCustomerData(prev => ({ ...prev, state: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="karnataka">Karnataka</SelectItem>
                      <SelectItem value="gujarat">Gujarat</SelectItem>
                      <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                      <SelectItem value="telangana">Telangana</SelectItem>
                      <SelectItem value="west-bengal">West Bengal</SelectItem>
                      <SelectItem value="rajasthan">Rajasthan</SelectItem>
                      <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                      <SelectItem value="haryana">Haryana</SelectItem>
                      <SelectItem value="punjab">Punjab</SelectItem>
                      <SelectItem value="kerala">Kerala</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="postalCode">PIN Code</Label>
                  <Input
                    id="postalCode"
                    placeholder="Enter PIN code"
                    value={newCustomerData.postalCode}
                    onChange={(e) => setNewCustomerData(prev => ({ ...prev, postalCode: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value="India"
                  disabled
                />
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Banking Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountType">Account Type</Label>
                  <Select 
                    value={newCustomerData.accountType} 
                    onValueChange={(value) => setNewCustomerData(prev => ({ ...prev, accountType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="savings">Savings Account</SelectItem>
                      <SelectItem value="current">Current Account</SelectItem>
                      <SelectItem value="salary">Salary Account</SelectItem>
                      <SelectItem value="premium">Premium Account</SelectItem>
                      <SelectItem value="business">Business Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="branchCode">Branch Code (IFSC)</Label>
                  <Input
                    id="branchCode"
                    placeholder="e.g., BOMB0001234"
                    value={newCustomerData.branchCode}
                    onChange={(e) => setNewCustomerData(prev => ({ ...prev, branchCode: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    placeholder="Enter account number"
                    value={newCustomerData.accountNumber}
                    onChange={(e) => setNewCustomerData(prev => ({ ...prev, accountNumber: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="iban">UPI ID (Optional)</Label>
                  <Input
                    id="iban"
                    placeholder="name@bankofmumbai"
                    value={newCustomerData.iban}
                    onChange={(e) => setNewCustomerData(prev => ({ ...prev, iban: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="routingNumber">MICR Code</Label>
                <Input
                  id="routingNumber"
                  placeholder="Enter MICR code"
                  value={newCustomerData.routingNumber}
                  onChange={(e) => setNewCustomerData(prev => ({ ...prev, routingNumber: e.target.value }))}
                />
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Account Settings & Preferences</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerTier">Customer Tier</Label>
                  <Select 
                    value={newCustomerData.customerTier} 
                    onValueChange={(value) => setNewCustomerData(prev => ({ ...prev, customerTier: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bronze">Bronze</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="platinum">Platinum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Account Status</Label>
                  <Select 
                    value={newCustomerData.status} 
                    onValueChange={(value) => setNewCustomerData(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredChannel">Preferred Communication Channel</Label>
                <Select 
                  value={newCustomerData.preferredChannel} 
                  onValueChange={(value) => setNewCustomerData(prev => ({ ...prev, preferredChannel: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="mobile-app">Mobile App</SelectItem>
                    <SelectItem value="web-portal">Web Portal</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="referralCode">Referral Code (Optional)</Label>
                <Input
                  id="referralCode"
                  placeholder="Enter referral code"
                  value={newCustomerData.referralCode}
                  onChange={(e) => setNewCustomerData(prev => ({ ...prev, referralCode: e.target.value }))}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Notification Preferences</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive account updates via email</p>
                    </div>
                    <Switch 
                      checked={newCustomerData.emailNotifications}
                      onCheckedChange={(checked) => setNewCustomerData(prev => ({ ...prev, emailNotifications: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive alerts via SMS</p>
                    </div>
                    <Switch 
                      checked={newCustomerData.smsNotifications}
                      onCheckedChange={(checked) => setNewCustomerData(prev => ({ ...prev, smsNotifications: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive app notifications</p>
                    </div>
                    <Switch 
                      checked={newCustomerData.pushNotifications}
                      onCheckedChange={(checked) => setNewCustomerData(prev => ({ ...prev, pushNotifications: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Marketing Communications</Label>
                      <p className="text-sm text-muted-foreground">Receive promotional offers and updates</p>
                    </div>
                    <Switch 
                      checked={newCustomerData.marketingConsent}
                      onCheckedChange={(checked) => setNewCustomerData(prev => ({ ...prev, marketingConsent: checked }))}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Enter any additional notes about the customer"
                  rows={3}
                  value={newCustomerData.notes}
                  onChange={(e) => setNewCustomerData(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const customers = [
    {
      id: "C001234567",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "+91 98765 43210",
      tier: "Gold",
      status: "Active",
      joinDate: "2022-03-15",
      totalSpendUSD: 45230,
      pointsBalance: 8450,
      lastActivity: "2024-01-25",
      riskLevel: "Low",
      cards: 2,
      location: "Mumbai, Maharashtra"
    },
    {
      id: "C001234568",
      name: "Anita Patel",
      email: "anita.patel@email.com",
      phone: "+91 87654 32109",
      tier: "Silver",
      status: "Active",
      joinDate: "2021-11-08",
      totalSpendUSD: 23100,
      pointsBalance: 3200,
      lastActivity: "2024-01-28",
      riskLevel: "Low",
      cards: 1,
      location: "Pune, Maharashtra"
    },
    {
      id: "C001234569",
      name: "Vikram Singh",
      email: "vikram.singh@email.com",
      phone: "+91 76543 21098",
      tier: "Platinum",
      status: "Blocked",
      joinDate: "2020-07-22",
      totalSpendUSD: 78900,
      pointsBalance: 12800,
      lastActivity: "2024-01-20",
      riskLevel: "High",
      cards: 3,
      location: "Delhi, Delhi"
    },
    {
      id: "C001234570",
      name: "Meera Sharma",
      email: "meera.sharma@email.com",
      phone: "+91 65432 10987",
      tier: "Bronze",
      status: "Dormant",
      joinDate: "2023-01-10",
      totalSpendUSD: 2450,
      pointsBalance: 580,
      lastActivity: "2023-09-15",
      riskLevel: "Low",
      cards: 1,
      location: "Bangalore, Karnataka"
    }
  ];

  const accountChanges = [
    {
      id: 1,
      customerId: "C001234567",
      customerName: "Rajesh Kumar",
      changeType: "Tier Upgrade",
      description: "Promoted from Silver to Gold tier",
      timestamp: "2024-01-28 14:30:00",
      status: "Completed",
      initiatedBy: "System"
    },
    {
      id: 2,
      customerId: "C001234569",
      customerName: "Vikram Singh",
      changeType: "Account Block",
      description: "Account blocked due to suspicious activity",
      timestamp: "2024-01-27 09:15:00",
      status: "Active",
      initiatedBy: "Risk Team"
    },
    {
      id: 3,
      customerId: "C001234570",
      customerName: "Meera Sharma",
      changeType: "Dormancy Status",
      description: "Account marked as dormant - no activity for 120 days",
      timestamp: "2024-01-26 02:00:00",
      status: "Completed",
      initiatedBy: "System"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "default";
      case "Blocked":
        return "destructive";
      case "Dormant":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "Low":
        return "text-green-600";
      case "Medium":
        return "text-yellow-600";
      case "High":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const handleViewCustomer = (customer) => {
    if (onViewCustomer) {
      onViewCustomer(customer);
    }
  };

  const handleEditCustomer = (customer) => {
    if (onEditCustomer) {
      onEditCustomer(customer);
    }
  };

  return (
    <div className="space-y-6 -mx-6 px-6 w-[calc(100%+3rem)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium">Customer Management</h1>
          <p className="text-muted-foreground">
            Manage customer profiles, security, and account lifecycle
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Shield className="h-4 w-4 mr-2" />
            Security Review
          </Button>
          <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
            <DialogTrigger asChild>
              <Button>
                <User className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-none w-[98vw] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogDescription>
                  Create a new customer account with complete profile information
                </DialogDescription>
              </DialogHeader>
              
              {/* Progress Indicator */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalSteps }, (_, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                        index + 1 <= currentStep
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-background border-muted-foreground text-muted-foreground"
                      }`}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
                <Badge variant="secondary">
                  Step {currentStep} of {totalSteps}
                </Badge>
              </div>

              {/* Step Content */}
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Info className="h-4 w-4" />
                  <span>Fields marked with * are required</span>
                </div>
                <div className="flex gap-3">
                  {currentStep > 1 && (
                    <Button variant="outline" onClick={prevStep}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                  )}
                  {currentStep < totalSteps ? (
                    <Button onClick={nextStep}>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={handleAddCustomerSubmit}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Create Customer
                    </Button>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>


        </div>
      </div>

      <Tabs defaultValue="customers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="customers">Customer Directory</TabsTrigger>
          <TabsTrigger value="profiles">Profile Management</TabsTrigger>
          <TabsTrigger value="security">Security & Compliance</TabsTrigger>
          <TabsTrigger value="changes">Account Changes</TabsTrigger>
        </TabsList>

        {/* Customer Directory Tab */}
        <TabsContent value="customers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Directory</CardTitle>
              <CardDescription>
                Search, filter, and manage customer accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search customers by name, email, or ID..." 
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tiers</SelectItem>
                    <SelectItem value="bronze">Bronze</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="platinum">Platinum</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                    <SelectItem value="dormant">Dormant</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total Spend</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/placeholder-avatar-${customer.id}.jpg`} />
                            <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-sm text-muted-foreground">{customer.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{customer.email}</p>
                          <p className="text-sm text-muted-foreground">{customer.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{customer.tier}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(customer.status)}>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatCurrency(convertCurrency(customer.totalSpendUSD))}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4 text-yellow-500" />
                          <span>{customer.pointsBalance.toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={getRiskColor(customer.riskLevel)}>
                          {customer.riskLevel}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewCustomer(customer)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditCustomer(customer)}
                          >
                            <Edit className="h-4 w-4" />
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

        {/* Profile Management Tab */}
        <TabsContent value="profiles" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Customer Profile Overview</CardTitle>
                <CardDescription>Detailed customer information and account history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback>RK</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-medium">Rajesh Kumar</h3>
                      <p className="text-muted-foreground">Premium Banking Customer</p>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge>Gold Tier</Badge>
                        <Badge variant="outline">Active</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Contact Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>rajesh.kumar@email.com</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>+91 98765 43210</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>Mumbai, Maharashtra</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Account Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Total Spend:</span>
                          <span>{formatCurrency(convertCurrency(45230))}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Points Balance:</span>
                          <span>8,450 points</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Member Since:</span>
                          <span>March 15, 2022</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Last Activity:</span>
                          <span>January 25, 2024</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common customer management tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  View Cards
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award className="h-4 w-4 mr-2" />
                  Points History
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="h-4 w-4 mr-2" />
                  Transaction Log
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Review
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security & Compliance Tab */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Monitoring</CardTitle>
                <CardDescription>Monitor customer account security and compliance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">2FA Enabled</p>
                      <p className="text-sm text-muted-foreground">Two-factor authentication active</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium">KYC Verification</p>
                      <p className="text-sm text-muted-foreground">Documents pending review</p>
                    </div>
                  </div>
                  <Badge variant="outline">Pending</Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">AML Screening</p>
                      <p className="text-sm text-muted-foreground">Anti-money laundering cleared</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Cleared</Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Last Login</p>
                      <p className="text-sm text-muted-foreground">Today, 2:30 PM from Mumbai</p>
                    </div>
                  </div>
                  <Badge variant="outline">Recent</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
                <CardDescription>Regulatory compliance and documentation status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Identity Verification</span>
                    <Badge variant="secondary">Complete</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Address Verification</span>
                    <Badge variant="secondary">Complete</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Income Verification</span>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">PEP Screening</span>
                    <Badge variant="secondary">Cleared</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">FATCA Declaration</span>
                    <Badge variant="secondary">Complete</Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium">Risk Assessment</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Overall Risk Score</span>
                    <Badge variant="secondary">Low Risk</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Last Updated</span>
                    <span className="text-muted-foreground">Jan 15, 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Account Changes Tab */}
        <TabsContent value="changes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Account Changes</CardTitle>
              <CardDescription>
                Track all customer account modifications and status changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Change Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Initiated By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accountChanges.map((change) => (
                    <TableRow key={change.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{change.customerName}</p>
                          <p className="text-sm text-muted-foreground">{change.customerId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{change.changeType}</Badge>
                      </TableCell>
                      <TableCell>{change.description}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{new Date(change.timestamp).toLocaleDateString()}</p>
                          <p className="text-muted-foreground">{new Date(change.timestamp).toLocaleTimeString()}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={change.status === "Completed" ? "secondary" : "default"}>
                          {change.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{change.initiatedBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}