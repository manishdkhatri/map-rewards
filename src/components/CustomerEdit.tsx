import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { 
  ArrowLeft, 
  Save, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  User,
  CreditCard,
  Shield,
  Settings,
  AlertCircle
} from "lucide-react";
import { useCurrency } from "../hooks/useCurrency";

interface CustomerEditProps {
  customer: any;
  onBack: () => void;
  onSave: (updatedCustomer: any) => void;
}

export function CustomerEdit({ customer, onBack, onSave }: CustomerEditProps) {
  const { formatCurrency, convertCurrency } = useCurrency();
  
  // Initialize form data with customer information
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: customer?.name?.split(' ')[0] || '',
    lastName: customer?.name?.split(' ').slice(1).join(' ') || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    dateOfBirth: '1985-03-15', // Mock data
    gender: 'male',
    nationality: 'Indian',
    
    // Address Information
    address: 'A-301, Sunshine Apartments',
    city: customer?.location?.split(',')[0] || '',
    state: customer?.location?.split(',')[1]?.trim() || '',
    postalCode: '400050',
    country: 'India',
    
    // Banking Information
    accountType: 'Premium Savings',
    accountNumber: '****-****-1234',
    ifscCode: 'BOMB0001234',
    upiId: 'rajesh@bankofmumbai',
    micrCode: '400002001',
    
    // Account Settings
    customerTier: customer?.tier?.toLowerCase() || 'bronze',
    status: customer?.status?.toLowerCase() || 'active',
    
    // Preferences
    preferredLanguage: 'english',
    preferredChannel: 'email',
    
    // Notifications
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    marketingConsent: true,
    
    // Additional Information
    notes: 'Premium customer with excellent payment history.',
    referralCode: ''
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [hasChanges, setHasChanges] = useState(false);

  if (!customer) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Customer not found</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "blocked":
        return "destructive";
      case "dormant":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    // Create updated customer object
    const updatedCustomer = {
      ...customer,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      tier: formData.customerTier.charAt(0).toUpperCase() + formData.customerTier.slice(1),
      status: formData.status.charAt(0).toUpperCase() + formData.status.slice(1),
      location: `${formData.city}, ${formData.state}`
    };

    // Call save callback
    onSave(updatedCustomer);
    setHasChanges(false);
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
        onBack();
      }
    } else {
      onBack();
    }
  };

  return (
    <div className="space-y-6 -mx-6 px-6 w-[calc(100%+3rem)]">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Customers
          </Button>
          <div>
            <h1 className="text-3xl font-medium">Edit Customer</h1>
            <p className="text-muted-foreground">
              Update customer profile and account information
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Customer Header */}
      <div className="flex items-center gap-4 p-6 bg-muted rounded-lg">
        <Avatar className="h-20 w-20">
          <AvatarImage src={`/placeholder-avatar-${customer.id}.jpg`} />
          <AvatarFallback className="text-xl">
            {customer.name.split(' ').map((n: string) => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-medium">{customer.name}</h2>
            <Badge variant={getStatusColor(customer.status.toLowerCase())}>
              {customer.status}
            </Badge>
            <Badge variant="outline">{customer.tier} Tier</Badge>
          </div>
          <p className="text-muted-foreground text-lg">{customer.id}</p>
          <p className="text-sm text-muted-foreground">
            Member since {new Date(customer.joinDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-2xl font-medium mb-1">
            <Award className="h-6 w-6 text-yellow-500" />
            <span>{customer.pointsBalance.toLocaleString()} pts</span>
          </div>
          <p className="text-sm text-muted-foreground">Points Balance</p>
        </div>
      </div>

      {/* Changes Indicator */}
      {hasChanges && (
        <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <span className="text-sm text-yellow-800">You have unsaved changes</span>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="contact">Contact & Address</TabsTrigger>
          <TabsTrigger value="banking">Banking Details</TabsTrigger>
          <TabsTrigger value="account">Account Settings</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Basic personal details and identification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
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

              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  placeholder="Enter nationality"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact & Address Tab */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
              <CardDescription>Email, phone, and address details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter full address"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Enter city"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="Delhi">Delhi</SelectItem>
                      <SelectItem value="Karnataka">Karnataka</SelectItem>
                      <SelectItem value="Gujarat">Gujarat</SelectItem>
                      <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                      <SelectItem value="Telangana">Telangana</SelectItem>
                      <SelectItem value="West Bengal">West Bengal</SelectItem>
                      <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">PIN Code</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    placeholder="Enter PIN code"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  disabled
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Banking Details Tab */}
        <TabsContent value="banking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Banking Information
              </CardTitle>
              <CardDescription>Account and banking details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountType">Account Type</Label>
                  <Select value={formData.accountType} onValueChange={(value) => handleInputChange('accountType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Premium Savings">Premium Savings</SelectItem>
                      <SelectItem value="Current Account">Current Account</SelectItem>
                      <SelectItem value="Salary Account">Salary Account</SelectItem>
                      <SelectItem value="Business Account">Business Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                    placeholder="Enter account number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ifscCode">IFSC Code</Label>
                  <Input
                    id="ifscCode"
                    value={formData.ifscCode}
                    onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                    placeholder="e.g., BOMB0001234"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    value={formData.upiId}
                    onChange={(e) => handleInputChange('upiId', e.target.value)}
                    placeholder="name@bankofmumbai"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="micrCode">MICR Code</Label>
                <Input
                  id="micrCode"
                  value={formData.micrCode}
                  onChange={(e) => handleInputChange('micrCode', e.target.value)}
                  placeholder="Enter MICR code"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Settings Tab */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Account Settings
              </CardTitle>
              <CardDescription>Customer tier, status, and account configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerTier">Customer Tier</Label>
                  <Select value={formData.customerTier} onValueChange={(value) => handleInputChange('customerTier', value)}>
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
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="dormant">Dormant</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="referralCode">Referral Code</Label>
                <Input
                  id="referralCode"
                  value={formData.referralCode}
                  onChange={(e) => handleInputChange('referralCode', e.target.value)}
                  placeholder="Enter referral code (optional)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Enter any additional notes about the customer"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Preferences & Notifications
              </CardTitle>
              <CardDescription>Communication preferences and notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preferredLanguage">Preferred Language</Label>
                  <Select value={formData.preferredLanguage} onValueChange={(value) => handleInputChange('preferredLanguage', value)}>
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
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredChannel">Preferred Communication Channel</Label>
                  <Select value={formData.preferredChannel} onValueChange={(value) => handleInputChange('preferredChannel', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select channel" />
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
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Notification Preferences</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive account updates via email</p>
                    </div>
                    <Switch 
                      checked={formData.emailNotifications}
                      onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive alerts via SMS</p>
                    </div>
                    <Switch 
                      checked={formData.smsNotifications}
                      onCheckedChange={(checked) => handleInputChange('smsNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive app notifications</p>
                    </div>
                    <Switch 
                      checked={formData.pushNotifications}
                      onCheckedChange={(checked) => handleInputChange('pushNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Marketing Communications</Label>
                      <p className="text-sm text-muted-foreground">Receive promotional offers and updates</p>
                    </div>
                    <Switch 
                      checked={formData.marketingConsent}
                      onCheckedChange={(checked) => handleInputChange('marketingConsent', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}