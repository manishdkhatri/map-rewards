import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Label } from "./ui/label";
import { 
  ArrowLeft, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  DollarSign, 
  Activity, 
  CreditCard, 
  Shield, 
  CheckCircle, 
  Clock, 
  Info,
  AlertTriangle
} from "lucide-react";
import { useCurrency } from "../hooks/useCurrency";

interface CustomerDetailsProps {
  customer: any;
  onBack: () => void;
}

export function CustomerDetails({ customer, onBack }: CustomerDetailsProps) {
  const { formatCurrency, convertCurrency } = useCurrency();

  if (!customer) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Customer not found</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
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

  return (
    <div className="space-y-6 -mx-6 px-6 w-[calc(100%+3rem)]">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Customers
        </Button>
        <div>
          <h1 className="text-3xl font-medium">Customer Details</h1>
          <p className="text-muted-foreground">
            Comprehensive view of customer profile and account information
          </p>
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
            <Badge variant={getStatusColor(customer.status)}>
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

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Spend</p>
                    <p className="text-2xl font-medium">
                      {formatCurrency(convertCurrency(customer.totalSpendUSD))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Activity className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Activity</p>
                    <p className="text-2xl font-medium">
                      {new Date(customer.lastActivity).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <CreditCard className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Cards</p>
                    <p className="text-2xl font-medium">{customer.cards}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-lg">{customer.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium text-lg">{customer.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium text-lg">{customer.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Risk Level</span>
                  <Badge variant={customer.riskLevel === 'Low' ? 'secondary' : 
                    customer.riskLevel === 'Medium' ? 'default' : 'destructive'}>
                    {customer.riskLevel} Risk
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Account Status</span>
                  <Badge variant={getStatusColor(customer.status)}>
                    {customer.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Customer Tier</span>
                  <Badge variant="outline">{customer.tier}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Join Date</span>
                  <span className="text-sm">{new Date(customer.joinDate).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                    <p className="font-medium text-lg mt-1">{customer.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Customer ID</Label>
                    <p className="font-medium text-lg mt-1">{customer.id}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Date of Birth</Label>
                    <p className="font-medium text-lg mt-1">March 15, 1985</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Gender</Label>
                    <p className="font-medium text-lg mt-1">Male</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                  <p className="font-medium text-lg mt-1">
                    A-301, Sunshine Apartments<br />
                    Bandra West, Mumbai - 400050<br />
                    Maharashtra, India
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Banking Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Account Type</Label>
                    <p className="font-medium text-lg mt-1">Premium Savings</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Account Number</Label>
                    <p className="font-medium text-lg mt-1">****-****-1234</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">IFSC Code</Label>
                    <p className="font-medium text-lg mt-1">BOMB0001234</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">UPI ID</Label>
                    <p className="font-medium text-lg mt-1">rajesh@bankofmumbai</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Linked Cards</Label>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline">Premium Credit</Badge>
                    <Badge variant="outline">Debit Card</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Last 10 transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { date: "2024-01-25", desc: "Online Shopping - Amazon", amount: 2500, points: 125, status: "Completed" },
                    { date: "2024-01-23", desc: "Grocery Store - Big Bazaar", amount: 1200, points: 60, status: "Completed" },
                    { date: "2024-01-20", desc: "Fuel Payment - HP Petrol", amount: 3000, points: 150, status: "Completed" },
                    { date: "2024-01-18", desc: "Restaurant - The Table", amount: 1800, points: 90, status: "Completed" },
                    { date: "2024-01-15", desc: "Bill Payment - Electricity", amount: 850, points: 25, status: "Completed" }
                  ].map((txn, index) => (
                    <TableRow key={index}>
                      <TableCell>{new Date(txn.date).toLocaleDateString()}</TableCell>
                      <TableCell>{txn.desc}</TableCell>
                      <TableCell>{formatCurrency(convertCurrency(txn.amount))}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Award className="h-3 w-3 text-yellow-500" />
                          <span>{txn.points}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{txn.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rewards Tab */}
        <TabsContent value="rewards" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Points Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Current Balance</span>
                    <span className="font-medium text-lg">{customer.pointsBalance.toLocaleString()} pts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Points Earned (YTD)</span>
                    <span className="font-medium text-lg">12,450 pts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Points Redeemed (YTD)</span>
                    <span className="font-medium text-lg">4,000 pts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Points Expired</span>
                    <span className="font-medium text-lg">0 pts</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tier Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>2x Points on Dining</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Priority Customer Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Free Airport Lounge Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Exclusive Offers & Deals</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Rewards Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "2024-01-25", action: "Points Earned", amount: "+125 pts", desc: "Online Shopping Transaction" },
                  { date: "2024-01-23", action: "Points Earned", amount: "+60 pts", desc: "Grocery Purchase" },
                  { date: "2024-01-20", action: "Points Redeemed", amount: "-500 pts", desc: "Gift Card Redemption" },
                  { date: "2024-01-18", action: "Bonus Points", amount: "+200 pts", desc: "Monthly Spending Milestone" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.desc}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${activity.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {activity.amount}
                      </p>
                      <p className="text-sm text-muted-foreground">{new Date(activity.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">2FA Enabled</p>
                      <p className="text-sm text-muted-foreground">SMS + Email verification</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">KYC Completed</p>
                      <p className="text-sm text-muted-foreground">All documents verified</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Verified</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
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
                <CardTitle>Account Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Password Updated</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Password changed successfully on Jan 20, 2024</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">New Device Login</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Login from new device detected on Jan 18, 2024</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium">Unusual Activity</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Large transaction flagged for review on Jan 15, 2024</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}