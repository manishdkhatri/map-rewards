import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Award, 
  Settings, 
  Upload,
  Download,
  Filter,
  Search,
  TrendingUp,
  Calendar,
  CreditCard,
  Info,
  CheckCircle,
  AlertCircle,
  Save,
  ArrowRight,
  ArrowLeft,
  Gift,
  Wallet,
  Store,
  Heart,
  Smartphone,
  Globe,
  Phone,
  Building,
  ShieldCheck,
  Clock,
  Users
} from "lucide-react";
import { useCurrency } from "../hooks/useCurrency";

export function RewardsManagement() {
  const { formatCurrency, convertCurrency, getCurrencySymbol } = useCurrency();
  const [selectedRule, setSelectedRule] = useState(null);
  const [isNewRuleOpen, setIsNewRuleOpen] = useState(false);
  const [isEditRuleOpen, setIsEditRuleOpen] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [isRedemptionConfigOpen, setIsRedemptionConfigOpen] = useState(false);
  const [redemptionStep, setRedemptionStep] = useState(0);
  
  const [redemptionConfig, setRedemptionConfig] = useState({
    // Redemption Methods
    enabledMethods: [],
    cashRedemption: { enabled: true, minAmount: "", maxAmount: "", processingFee: "" },
    giftCards: { enabled: false, availableCards: [], processingFee: "" },
    merchandise: { enabled: false, catalog: [], shippingFee: "" },
    charity: { enabled: false, organizations: [], minAmount: "" },
    
    // Limits & Thresholds
    globalLimits: { 
      minRedemption: "", 
      maxDailyRedemption: "", 
      maxMonthlyRedemption: "",
      cooldownPeriod: ""
    },
    tierLimits: {
      bronze: { dailyLimit: "", monthlyLimit: "" },
      silver: { dailyLimit: "", monthlyLimit: "" },
      gold: { dailyLimit: "", monthlyLimit: "" },
      platinum: { dailyLimit: "", monthlyLimit: "" }
    },
    
    // Processing Settings
    approvalWorkflow: {
      autoApprove: true,
      approvalThreshold: "",
      requireManagerApproval: false,
      processingTime: "1-3",
      businessDaysOnly: true
    },
    verification: {
      requireOTP: false,
      requireBiometric: false,
      documentVerification: false,
      manualReview: false
    },
    
    // Channel Settings
    channels: {
      mobileApp: { enabled: true, restrictions: [] },
      webPortal: { enabled: true, restrictions: [] },
      callCenter: { enabled: false, restrictions: [] },
      branch: { enabled: false, restrictions: [] }
    },
    notifications: {
      emailConfirmation: true,
      smsAlerts: false,
      pushNotifications: true,
      statusUpdates: true
    }
  });

  const [newRuleData, setNewRuleData] = useState({
    name: "",
    description: "",
    basis: "",
    rateType: "",
    rateValue: "",
    rateUnit: "",
    eligibility: "",
    minSpend: "",
    maxSpend: "",
    startDate: "",
    endDate: "",
    expiryDays: "365",
    channels: [],
    cardTypes: [],
    categories: [],
    status: "active",
    autoActivation: true,
    stackable: false,
    maxPointsPerTransaction: "",
    maxPointsPerDay: "",
    maxPointsPerMonth: ""
  });

  const [editRuleData, setEditRuleData] = useState({
    name: "",
    description: "",
    basis: "",
    rateType: "",
    rateValue: "",
    rateUnit: "",
    eligibility: "",
    minSpend: "",
    maxSpend: "",
    startDate: "",
    endDate: "",
    expiryDays: "365",
    channels: [],
    cardTypes: [],
    categories: [],
    status: "active",
    autoActivation: true,
    stackable: false,
    maxPointsPerTransaction: "",
    maxPointsPerDay: "",
    maxPointsPerMonth: ""
  });

  const [rewardRules, setRewardRules] = useState([
    {
      id: 1,
      name: "Credit Card Purchases",
      description: "Earn points on all credit card transactions",
      basis: "transaction-amount",
      rate: "2 points per ₹1",
      rateType: "fixed",
      rateValue: "2",
      rateUnit: "per-dollar",
      eligibility: "all-customers",
      status: "Active",
      expiry: "365 days",
      expiryDays: "365",
      channels: ["Mobile App", "Web Portal", "POS Terminal"],
      cardTypes: ["Premium Cards", "Standard Cards"],
      minSpend: "100",
      maxSpend: "50000",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      autoActivation: true,
      stackable: false,
      maxPointsPerTransaction: "1000",
      maxPointsPerDay: "5000",
      maxPointsPerMonth: "50000"
    },
    {
      id: 2,
      name: "Online Shopping Bonus",
      description: "Enhanced rewards for online shopping categories",
      basis: "category-spend",
      rate: "5 points per ₹1",
      rateType: "fixed",
      rateValue: "5",
      rateUnit: "per-dollar",
      eligibility: "silver-tier",
      status: "Active",
      expiry: "180 days",
      expiryDays: "180",
      channels: ["Mobile App", "Web Portal"],
      cardTypes: ["Premium Cards"],
      minSpend: "500",
      maxSpend: "25000",
      startDate: "2024-01-15",
      endDate: "2024-06-15",
      autoActivation: true,
      stackable: true,
      maxPointsPerTransaction: "2500",
      maxPointsPerDay: "10000",
      maxPointsPerMonth: "100000"
    },
    {
      id: 3,
      name: "Bill Payment Rewards",
      description: "Fixed points for utility bill payments",
      basis: "transaction-count",
      rate: "50 points per transaction",
      rateType: "fixed",
      rateValue: "50",
      rateUnit: "per-transaction",
      eligibility: "all-customers",
      status: "Inactive",
      expiry: "90 days",
      expiryDays: "90",
      channels: ["Mobile App"],
      cardTypes: ["Standard Cards", "Premium Cards"],
      minSpend: "50",
      maxSpend: "10000",
      startDate: "2024-02-01",
      endDate: "2024-12-31",
      autoActivation: false,
      stackable: true,
      maxPointsPerTransaction: "200",
      maxPointsPerDay: "1000",
      maxPointsPerMonth: "5000"
    }
  ]);

  const customerTiers = [
    {
      id: 1,
      name: "Bronze",
      minSpendUSD: 0,
      maxSpendUSD: 5000,
      customers: 1280000,
      pointsMultiplier: "1x",
      benefits: ["Basic rewards", "Standard support"],
      autoPromotion: true
    },
    {
      id: 2,
      name: "Silver",
      minSpendUSD: 5001,
      maxSpendUSD: 15000,
      customers: 850000,
      pointsMultiplier: "1.5x",
      benefits: ["Enhanced rewards", "Priority support", "Bonus campaigns"],
      autoPromotion: true
    },
    {
      id: 3,
      name: "Gold",
      minSpendUSD: 15001,
      maxSpendUSD: 50000,
      customers: 420000,
      pointsMultiplier: "2x",
      benefits: ["Premium rewards", "Concierge service", "Exclusive offers"],
      autoPromotion: true
    },
    {
      id: 4,
      name: "Platinum",
      minSpendUSD: 50001,
      maxSpendUSD: null, // Unlimited
      customers: 140000,
      pointsMultiplier: "3x",
      benefits: ["Maximum rewards", "Personal banker", "VIP experiences"],
      autoPromotion: false
    }
  ];

  const redemptionSteps = [
    { title: "Redemption Methods", icon: Gift, description: "Configure available redemption options" },
    { title: "Limits & Thresholds", icon: ShieldCheck, description: "Set redemption limits and controls" },
    { title: "Processing Settings", icon: Settings, description: "Configure approval workflows" },
    { title: "Channels & Notifications", icon: Globe, description: "Set up channels and alerts" }
  ];

  const handleRedemptionSubmit = () => {
    console.log("Redemption configuration saved:", redemptionConfig);
    alert("Redemption configuration saved successfully!");
    setIsRedemptionConfigOpen(false);
    setRedemptionStep(0);
  };

  const nextRedemptionStep = () => {
    setRedemptionStep(prev => Math.min(prev + 1, redemptionSteps.length - 1));
  };

  const prevRedemptionStep = () => {
    setRedemptionStep(prev => Math.max(prev - 1, 0));
  };

  const handleMethodChange = (method, checked) => {
    if (checked) {
      setRedemptionConfig(prev => ({
        ...prev,
        enabledMethods: [...prev.enabledMethods, method]
      }));
    } else {
      setRedemptionConfig(prev => ({
        ...prev,
        enabledMethods: prev.enabledMethods.filter(m => m !== method)
      }));
    }
  };

  const renderRedemptionStep = () => {
    switch (redemptionStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Cash & Bank Transfer</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Wallet className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Direct Bank Transfer</p>
                        <p className="text-sm text-muted-foreground">Transfer points value directly to bank account</p>
                      </div>
                    </div>
                    <Switch 
                      checked={redemptionConfig.cashRedemption.enabled}
                      onCheckedChange={(checked) => setRedemptionConfig(prev => ({
                        ...prev,
                        cashRedemption: { ...prev.cashRedemption, enabled: checked }
                      }))}
                    />
                  </div>

                  {redemptionConfig.cashRedemption.enabled && (
                    <div className="ml-8 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label>Minimum Amount</Label>
                          <Input
                            type="number"
                            placeholder="1000"
                            value={redemptionConfig.cashRedemption.minAmount}
                            onChange={(e) => setRedemptionConfig(prev => ({
                              ...prev,
                              cashRedemption: { ...prev.cashRedemption, minAmount: e.target.value }
                            }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Maximum Amount</Label>
                          <Input
                            type="number"
                            placeholder="50000"
                            value={redemptionConfig.cashRedemption.maxAmount}
                            onChange={(e) => setRedemptionConfig(prev => ({
                              ...prev,
                              cashRedemption: { ...prev.cashRedemption, maxAmount: e.target.value }
                            }))}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Processing Fee (%)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="2.5"
                          value={redemptionConfig.cashRedemption.processingFee}
                          onChange={(e) => setRedemptionConfig(prev => ({
                            ...prev,
                            cashRedemption: { ...prev.cashRedemption, processingFee: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Gift className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Gift Cards</p>
                        <p className="text-sm text-muted-foreground">Redeem for partner gift cards and vouchers</p>
                      </div>
                    </div>
                    <Switch 
                      checked={redemptionConfig.giftCards.enabled}
                      onCheckedChange={(checked) => setRedemptionConfig(prev => ({
                        ...prev,
                        giftCards: { ...prev.giftCards, enabled: checked }
                      }))}
                    />
                  </div>

                  {redemptionConfig.giftCards.enabled && (
                    <div className="ml-8 space-y-3">
                      <div className="space-y-2">
                        <Label>Available Gift Cards</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {["Amazon", "Flipkart", "Myntra", "Swiggy", "Zomato", "BookMyShow"].map((card) => (
                            <div key={card} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`gift-${card}`}
                                checked={redemptionConfig.giftCards.availableCards.includes(card)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setRedemptionConfig(prev => ({
                                      ...prev,
                                      giftCards: { 
                                        ...prev.giftCards, 
                                        availableCards: [...prev.giftCards.availableCards, card] 
                                      }
                                    }));
                                  } else {
                                    setRedemptionConfig(prev => ({
                                      ...prev,
                                      giftCards: { 
                                        ...prev.giftCards, 
                                        availableCards: prev.giftCards.availableCards.filter(c => c !== card) 
                                      }
                                    }));
                                  }
                                }}
                              />
                              <Label htmlFor={`gift-${card}`} className="text-sm">{card}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Merchandise & Charity</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Store className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium">Merchandise Catalog</p>
                        <p className="text-sm text-muted-foreground">Physical products and branded items</p>
                      </div>
                    </div>
                    <Switch 
                      checked={redemptionConfig.merchandise.enabled}
                      onCheckedChange={(checked) => setRedemptionConfig(prev => ({
                        ...prev,
                        merchandise: { ...prev.merchandise, enabled: checked }
                      }))}
                    />
                  </div>

                  {redemptionConfig.merchandise.enabled && (
                    <div className="ml-8 space-y-3">
                      <div className="space-y-2">
                        <Label>Product Categories</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {["Electronics", "Apparel", "Home & Garden", "Sports", "Books", "Gadgets"].map((category) => (
                            <div key={category} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`merch-${category}`}
                                checked={redemptionConfig.merchandise.catalog.includes(category)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setRedemptionConfig(prev => ({
                                      ...prev,
                                      merchandise: { 
                                        ...prev.merchandise, 
                                        catalog: [...prev.merchandise.catalog, category] 
                                      }
                                    }));
                                  } else {
                                    setRedemptionConfig(prev => ({
                                      ...prev,
                                      merchandise: { 
                                        ...prev.merchandise, 
                                        catalog: prev.merchandise.catalog.filter(c => c !== category) 
                                      }
                                    }));
                                  }
                                }}
                              />
                              <Label htmlFor={`merch-${category}`} className="text-sm">{category}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Shipping Fee</Label>
                        <Input
                          type="number"
                          placeholder="50"
                          value={redemptionConfig.merchandise.shippingFee}
                          onChange={(e) => setRedemptionConfig(prev => ({
                            ...prev,
                            merchandise: { ...prev.merchandise, shippingFee: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Heart className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium">Charity Donations</p>
                        <p className="text-sm text-muted-foreground">Convert points to charitable donations</p>
                      </div>
                    </div>
                    <Switch 
                      checked={redemptionConfig.charity.enabled}
                      onCheckedChange={(checked) => setRedemptionConfig(prev => ({
                        ...prev,
                        charity: { ...prev.charity, enabled: checked }
                      }))}
                    />
                  </div>

                  {redemptionConfig.charity.enabled && (
                    <div className="ml-8 space-y-3">
                      <div className="space-y-2">
                        <Label>Partner Organizations</Label>
                        <div className="grid grid-cols-1 gap-2">
                          {["UNICEF India", "Akshaya Patra", "CRY - Child Rights", "Teach for India", "Helpage India", "WWF India"].map((org) => (
                            <div key={org} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`charity-${org}`}
                                checked={redemptionConfig.charity.organizations.includes(org)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setRedemptionConfig(prev => ({
                                      ...prev,
                                      charity: { 
                                        ...prev.charity, 
                                        organizations: [...prev.charity.organizations, org] 
                                      }
                                    }));
                                  } else {
                                    setRedemptionConfig(prev => ({
                                      ...prev,
                                      charity: { 
                                        ...prev.charity, 
                                        organizations: prev.charity.organizations.filter(o => o !== org) 
                                      }
                                    }));
                                  }
                                }}
                              />
                              <Label htmlFor={`charity-${org}`} className="text-sm">{org}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Global Limits</h3>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Minimum Redemption (Points)</Label>
                    <Input
                      type="number"
                      placeholder="100"
                      value={redemptionConfig.globalLimits.minRedemption}
                      onChange={(e) => setRedemptionConfig(prev => ({
                        ...prev,
                        globalLimits: { ...prev.globalLimits, minRedemption: e.target.value }
                      }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Maximum Daily Redemption</Label>
                    <Input
                      type="number"
                      placeholder="10000"
                      value={redemptionConfig.globalLimits.maxDailyRedemption}
                      onChange={(e) => setRedemptionConfig(prev => ({
                        ...prev,
                        globalLimits: { ...prev.globalLimits, maxDailyRedemption: e.target.value }
                      }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Maximum Monthly Redemption</Label>
                    <Input
                      type="number"
                      placeholder="50000"
                      value={redemptionConfig.globalLimits.maxMonthlyRedemption}
                      onChange={(e) => setRedemptionConfig(prev => ({
                        ...prev,
                        globalLimits: { ...prev.globalLimits, maxMonthlyRedemption: e.target.value }
                      }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Cooldown Period (Hours)</Label>
                    <Select 
                      value={redemptionConfig.globalLimits.cooldownPeriod}
                      onValueChange={(value) => setRedemptionConfig(prev => ({
                        ...prev,
                        globalLimits: { ...prev.globalLimits, cooldownPeriod: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select cooldown period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">No Cooldown</SelectItem>
                        <SelectItem value="1">1 Hour</SelectItem>
                        <SelectItem value="6">6 Hours</SelectItem>
                        <SelectItem value="12">12 Hours</SelectItem>
                        <SelectItem value="24">24 Hours</SelectItem>
                        <SelectItem value="72">72 Hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tier-Based Limits</h3>
                
                <div className="space-y-4">
                  {["bronze", "silver", "gold", "platinum"].map((tier) => (
                    <Card key={tier} className="p-4">
                      <div className="space-y-3">
                        <h4 className="font-medium capitalize">{tier} Tier</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label className="text-sm">Daily Limit</Label>
                            <Input
                              type="number"
                              placeholder="5000"
                              value={redemptionConfig.tierLimits[tier].dailyLimit}
                              onChange={(e) => setRedemptionConfig(prev => ({
                                ...prev,
                                tierLimits: {
                                  ...prev.tierLimits,
                                  [tier]: { ...prev.tierLimits[tier], dailyLimit: e.target.value }
                                }
                              }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm">Monthly Limit</Label>
                            <Input
                              type="number"
                              placeholder="25000"
                              value={redemptionConfig.tierLimits[tier].monthlyLimit}
                              onChange={(e) => setRedemptionConfig(prev => ({
                                ...prev,
                                tierLimits: {
                                  ...prev.tierLimits,
                                  [tier]: { ...prev.tierLimits[tier], monthlyLimit: e.target.value }
                                }
                              }))}
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Approval Workflow</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-Approval</Label>
                      <p className="text-sm text-muted-foreground">Automatically approve redemptions</p>
                    </div>
                    <Switch 
                      checked={redemptionConfig.approvalWorkflow.autoApprove}
                      onCheckedChange={(checked) => setRedemptionConfig(prev => ({
                        ...prev,
                        approvalWorkflow: { ...prev.approvalWorkflow, autoApprove: checked }
                      }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Manual Approval Threshold</Label>
                    <Input
                      type="number"
                      placeholder="10000"
                      value={redemptionConfig.approvalWorkflow.approvalThreshold}
                      onChange={(e) => setRedemptionConfig(prev => ({
                        ...prev,
                        approvalWorkflow: { ...prev.approvalWorkflow, approvalThreshold: e.target.value }
                      }))}
                    />
                    <p className="text-xs text-muted-foreground">Points above this amount require manual approval</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require Manager Approval</Label>
                      <p className="text-sm text-muted-foreground">High-value redemptions need manager approval</p>
                    </div>
                    <Switch 
                      checked={redemptionConfig.approvalWorkflow.requireManagerApproval}
                      onCheckedChange={(checked) => setRedemptionConfig(prev => ({
                        ...prev,
                        approvalWorkflow: { ...prev.approvalWorkflow, requireManagerApproval: checked }
                      }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Processing Time</Label>
                    <Select 
                      value={redemptionConfig.approvalWorkflow.processingTime}
                      onValueChange={(value) => setRedemptionConfig(prev => ({
                        ...prev,
                        approvalWorkflow: { ...prev.approvalWorkflow, processingTime: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instant">Instant</SelectItem>
                        <SelectItem value="1-3">1-3 Business Days</SelectItem>
                        <SelectItem value="3-5">3-5 Business Days</SelectItem>
                        <SelectItem value="5-7">5-7 Business Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Business Days Only</Label>
                      <p className="text-sm text-muted-foreground">Process redemptions only on business days</p>
                    </div>
                    <Switch 
                      checked={redemptionConfig.approvalWorkflow.businessDaysOnly}
                      onCheckedChange={(checked) => setRedemptionConfig(prev => ({
                        ...prev,
                        approvalWorkflow: { ...prev.approvalWorkflow, businessDaysOnly: checked }
                      }))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Verification Requirements</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require OTP</Label>
                      <p className="text-sm text-muted-foreground">SMS/Email OTP for redemption</p>
                    </div>
                    <Switch 
                      checked={redemptionConfig.verification.requireOTP}
                      onCheckedChange={(checked) => setRedemptionConfig(prev => ({
                        ...prev,
                        verification: { ...prev.verification, requireOTP: checked }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require Biometric</Label>
                      <p className="text-sm text-muted-foreground">Fingerprint/Face ID verification</p>
                    </div>
                    <Switch 
                      checked={redemptionConfig.verification.requireBiometric}
                      onCheckedChange={(checked) => setRedemptionConfig(prev => ({
                        ...prev,
                        verification: { ...prev.verification, requireBiometric: checked }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Document Verification</Label>
                      <p className="text-sm text-muted-foreground">Additional document verification for high amounts</p>
                    </div>
                    <Switch 
                      checked={redemptionConfig.verification.documentVerification}
                      onCheckedChange={(checked) => setRedemptionConfig(prev => ({
                        ...prev,
                        verification: { ...prev.verification, documentVerification: checked }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Manual Review</Label>
                      <p className="text-sm text-muted-foreground">Human review for suspicious transactions</p>
                    </div>
                    <Switch 
                      checked={redemptionConfig.verification.manualReview}
                      onCheckedChange={(checked) => setRedemptionConfig(prev => ({
                        ...prev,
                        verification: { ...prev.verification, manualReview: checked }
                      }))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Redemption Channels</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Mobile App</p>
                        <p className="text-sm text-muted-foreground">iOS and Android applications</p>
                      </div>
                    </div>
                    <Switch 
                      checked={redemptionConfig.channels.mobileApp.enabled}
                      onCheckedChange={(checked) => setRedemptionConfig(prev => ({
                        ...prev,
                        channels: { ...prev.channels, mobileApp: { ...prev.channels.mobileApp, enabled: checked } }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Web Portal</p>
                        <p className="text-sm text-muted-foreground">Desktop and mobile web interface</p>
                      </div>
                    </div>
                    <Switch 
                      checked={redemptionConfig.channels.webPortal.enabled}
                      onCheckedChange={(checked) => setRedemptionConfig(prev => ({
                        ...prev,
                        channels: { ...prev.channels, webPortal: { ...prev.channels.webPortal, enabled: checked } }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="font-medium">Call Center</p>
                        <p className="text-sm text-muted-foreground">Phone-based redemption assistance</p>
                      </div>
                    </div>
                    <Switch 
                      checked={redemptionConfig.channels.callCenter.enabled}
                      onCheckedChange={(checked) => setRedemptionConfig(prev => ({
                        ...prev,
                        channels: { ...prev.channels, callCenter: { ...prev.channels.callCenter, enabled: checked } }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Building className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium">Branch Locations</p>
                        <p className="text-sm text-muted-foreground">In-person redemption at branches</p>
                      </div>
                    </div>
                    <Switch 
                      checked={redemptionConfig.channels.branch.enabled}
                      onCheckedChange={(checked) => setRedemptionConfig(prev => ({
                        ...prev,
                        channels: { ...prev.channels, branch: { ...prev.channels.branch, enabled: checked } }
                      }))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Settings</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Confirmation</Label>
                      <p className="text-sm text-muted-foreground">Send email confirmation for redemptions</p>
                    </div>
                    <Switch 
                      checked={redemptionConfig.notifications.emailConfirmation}
                      onCheckedChange={(checked) => setRedemptionConfig(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, emailConfirmation: checked }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Alerts</Label>
                      <p className="text-sm text-muted-foreground">SMS notifications for redemption updates</p>
                    </div>
                    <Switch 
                      checked={redemptionConfig.notifications.smsAlerts}
                      onCheckedChange={(checked) => setRedemptionConfig(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, smsAlerts: checked }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Mobile app push notifications</p>
                    </div>
                    <Switch 
                      checked={redemptionConfig.notifications.pushNotifications}
                      onCheckedChange={(checked) => setRedemptionConfig(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, pushNotifications: checked }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Status Updates</Label>
                      <p className="text-sm text-muted-foreground">Real-time status change notifications</p>
                    </div>
                    <Switch 
                      checked={redemptionConfig.notifications.statusUpdates}
                      onCheckedChange={(checked) => setRedemptionConfig(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, statusUpdates: checked }
                      }))}
                    />
                  </div>
                </div>

                <Separator />

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Configuration Summary</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Enabled Methods:</strong> {redemptionConfig.enabledMethods.length || "None selected"}</p>
                    <p><strong>Auto-Approval:</strong> {redemptionConfig.approvalWorkflow.autoApprove ? "Enabled" : "Disabled"}</p>
                    <p><strong>Processing Time:</strong> {redemptionConfig.approvalWorkflow.processingTime || "Not set"}</p>
                    <p><strong>Active Channels:</strong> {Object.values(redemptionConfig.channels).filter(c => c.enabled).length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleNewRuleSubmit = () => {
    // Validate form data
    if (!newRuleData.name || !newRuleData.basis || !newRuleData.rateValue) {
      alert("Please fill in all required fields");
      return;
    }
    
    // Create new rule with generated ID
    const newRule = {
      id: Math.max(...rewardRules.map(r => r.id)) + 1,
      ...newRuleData,
      rate: `${newRuleData.rateValue} ${newRuleData.rateUnit === 'per-dollar' ? `points per ${getCurrencySymbol()}1` : newRuleData.rateUnit === 'per-transaction' ? 'points per transaction' : 'points'}`,
      expiry: `${newRuleData.expiryDays} days`,
      status: newRuleData.autoActivation ? "Active" : "Inactive"
    };
    
    setRewardRules(prev => [...prev, newRule]);
    
    // Reset form and close dialog
    setNewRuleData({
      name: "",
      description: "",
      basis: "",
      rateType: "",
      rateValue: "",
      rateUnit: "",
      eligibility: "",
      minSpend: "",
      maxSpend: "",
      startDate: "",
      endDate: "",
      expiryDays: "365",
      channels: [],
      cardTypes: [],
      categories: [],
      status: "active",
      autoActivation: true,
      stackable: false,
      maxPointsPerTransaction: "",
      maxPointsPerDay: "",
      maxPointsPerMonth: ""
    });
    setIsNewRuleOpen(false);
  };

  const handleEditRule = (rule) => {
    setEditingRule(rule);
    setEditRuleData({
      name: rule.name,
      description: rule.description || "",
      basis: rule.basis,
      rateType: rule.rateType,
      rateValue: rule.rateValue,
      rateUnit: rule.rateUnit,
      eligibility: rule.eligibility,
      minSpend: rule.minSpend || "",
      maxSpend: rule.maxSpend || "",
      startDate: rule.startDate || "",
      endDate: rule.endDate || "",
      expiryDays: rule.expiryDays,
      channels: rule.channels || [],
      cardTypes: rule.cardTypes || [],
      categories: rule.categories || [],
      status: rule.status.toLowerCase(),
      autoActivation: rule.status === "Active",
      stackable: rule.stackable || false,
      maxPointsPerTransaction: rule.maxPointsPerTransaction || "",
      maxPointsPerDay: rule.maxPointsPerDay || "",
      maxPointsPerMonth: rule.maxPointsPerMonth || ""
    });
    setIsEditRuleOpen(true);
  };

  const handleEditRuleSubmit = () => {
    // Validate form data
    if (!editRuleData.name || !editRuleData.basis || !editRuleData.rateValue) {
      alert("Please fill in all required fields");
      return;
    }
    
    // Update the rule in the rules array
    const updatedRule = {
      ...editingRule,
      ...editRuleData,
      rate: `${editRuleData.rateValue} ${editRuleData.rateUnit === 'per-dollar' ? `points per ${getCurrencySymbol()}1` : editRuleData.rateUnit === 'per-transaction' ? 'points per transaction' : 'points'}`,
      expiry: `${editRuleData.expiryDays} days`,
      status: editRuleData.autoActivation ? "Active" : "Inactive"
    };
    
    setRewardRules(prev => prev.map(rule => 
      rule.id === editingRule.id ? updatedRule : rule
    ));
    
    // Reset and close
    setEditingRule(null);
    setEditRuleData({
      name: "",
      description: "",
      basis: "",
      rateType: "",
      rateValue: "",
      rateUnit: "",
      eligibility: "",
      minSpend: "",
      maxSpend: "",
      startDate: "",
      endDate: "",
      expiryDays: "365",
      channels: [],
      cardTypes: [],
      categories: [],
      status: "active",
      autoActivation: true,
      stackable: false,
      maxPointsPerTransaction: "",
      maxPointsPerDay: "",
      maxPointsPerMonth: ""
    });
    setIsEditRuleOpen(false);
  };

  const handleChannelChange = (channel, checked, isEdit = false) => {
    const setData = isEdit ? setEditRuleData : setNewRuleData;
    
    if (checked) {
      setData(prev => ({
        ...prev,
        channels: [...prev.channels, channel]
      }));
    } else {
      setData(prev => ({
        ...prev,
        channels: prev.channels.filter(c => c !== channel)
      }));
    }
  };

  const handleCardTypeChange = (cardType, checked, isEdit = false) => {
    const setData = isEdit ? setEditRuleData : setNewRuleData;
    
    if (checked) {
      setData(prev => ({
        ...prev,
        cardTypes: [...prev.cardTypes, cardType]
      }));
    } else {
      setData(prev => ({
        ...prev,
        cardTypes: prev.cardTypes.filter(c => c !== cardType)
      }));
    }
  };

  const renderRuleForm = (data, setData, isEdit = false) => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Basic Information */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor={isEdit ? "editRuleName" : "ruleName"}>Rule Name *</Label>
              <Input
                id={isEdit ? "editRuleName" : "ruleName"}
                placeholder="e.g., Credit Card Purchase Rewards"
                value={data.name}
                onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={isEdit ? "editRuleDescription" : "ruleDescription"}>Description</Label>
              <Textarea
                id={isEdit ? "editRuleDescription" : "ruleDescription"}
                placeholder="Describe the purpose and mechanics of this rule"
                rows={3}
                value={data.description}
                onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={isEdit ? "editRuleBasis" : "ruleBasis"}>Reward Basis *</Label>
              <Select 
                value={data.basis} 
                onValueChange={(value) => setData(prev => ({ ...prev, basis: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select reward basis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transaction-amount">Transaction Amount</SelectItem>
                  <SelectItem value="transaction-count">Transaction Count</SelectItem>
                  <SelectItem value="category-spend">Category Spend</SelectItem>
                  <SelectItem value="monthly-spend">Monthly Spend Threshold</SelectItem>
                  <SelectItem value="signup-bonus">Signup Bonus</SelectItem>
                  <SelectItem value="referral">Referral Bonus</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Reward Rate Configuration</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={isEdit ? "editRateType" : "rateType"}>Rate Type *</Label>
                <Select 
                  value={data.rateType} 
                  onValueChange={(value) => setData(prev => ({ ...prev, rateType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Points</SelectItem>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="multiplier">Multiplier</SelectItem>
                    <SelectItem value="tiered">Tiered Rate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor={isEdit ? "editRateValue" : "rateValue"}>Rate Value *</Label>
                <Input
                  id={isEdit ? "editRateValue" : "rateValue"}
                  type="number"
                  placeholder="e.g., 2"
                  value={data.rateValue}
                  onChange={(e) => setData(prev => ({ ...prev, rateValue: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={isEdit ? "editRateUnit" : "rateUnit"}>Rate Unit</Label>
              <Select 
                value={data.rateUnit} 
                onValueChange={(value) => setData(prev => ({ ...prev, rateUnit: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="per-dollar">Points per {getCurrencySymbol()}1</SelectItem>
                  <SelectItem value="per-transaction">Points per transaction</SelectItem>
                  <SelectItem value="per-category">Points per category purchase</SelectItem>
                  <SelectItem value="lump-sum">Lump sum points</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Limits & Controls</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={isEdit ? "editMaxPerTransaction" : "maxPerTransaction"}>Max Points Per Transaction</Label>
                <Input
                  id={isEdit ? "editMaxPerTransaction" : "maxPerTransaction"}
                  type="number"
                  placeholder="No limit"
                  value={data.maxPointsPerTransaction}
                  onChange={(e) => setData(prev => ({ ...prev, maxPointsPerTransaction: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={isEdit ? "editMaxPerDay" : "maxPerDay"}>Max Points Per Day</Label>
                <Input
                  id={isEdit ? "editMaxPerDay" : "maxPerDay"}
                  type="number"
                  placeholder="No limit"
                  value={data.maxPointsPerDay}
                  onChange={(e) => setData(prev => ({ ...prev, maxPointsPerDay: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={isEdit ? "editMaxPerMonth" : "maxPerMonth"}>Max Points Per Month</Label>
              <Input
                id={isEdit ? "editMaxPerMonth" : "maxPerMonth"}
                type="number"
                placeholder="No limit"
                value={data.maxPointsPerMonth}
                onChange={(e) => setData(prev => ({ ...prev, maxPointsPerMonth: e.target.value }))}
              />
            </div>
          </div>
        </div>

        {/* Right Column - Eligibility & Settings */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Eligibility Criteria</h3>
            
            <div className="space-y-2">
              <Label htmlFor={isEdit ? "editEligibility" : "eligibility"}>Customer Eligibility</Label>
              <Select 
                value={data.eligibility} 
                onValueChange={(value) => setData(prev => ({ ...prev, eligibility: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select eligibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-customers">All Customers</SelectItem>
                  <SelectItem value="new-customers">New Customers Only</SelectItem>
                  <SelectItem value="existing-customers">Existing Customers Only</SelectItem>
                  <SelectItem value="bronze-tier">Bronze Tier</SelectItem>
                  <SelectItem value="silver-tier">Silver Tier</SelectItem>
                  <SelectItem value="gold-tier">Gold Tier</SelectItem>
                  <SelectItem value="platinum-tier">Platinum Tier</SelectItem>
                  <SelectItem value="high-value">High Value Customers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={isEdit ? "editMinSpend" : "minSpend"}>Minimum Spend</Label>
                <Input
                  id={isEdit ? "editMinSpend" : "minSpend"}
                  type="number"
                  placeholder={`${getCurrencySymbol()}0`}
                  value={data.minSpend}
                  onChange={(e) => setData(prev => ({ ...prev, minSpend: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={isEdit ? "editMaxSpend" : "maxSpend"}>Maximum Spend</Label>
                <Input
                  id={isEdit ? "editMaxSpend" : "maxSpend"}
                  type="number"
                  placeholder="No limit"
                  value={data.maxSpend}
                  onChange={(e) => setData(prev => ({ ...prev, maxSpend: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Channels & Card Types</h3>
            
            <div className="space-y-3">
              <Label>Applicable Channels</Label>
              <div className="grid grid-cols-2 gap-3">
                {["Mobile App", "Web Portal", "POS Terminal", "ATM", "Phone Banking", "Branch"].map((channel) => (
                  <div key={channel} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`${isEdit ? 'edit-' : ''}channel-${channel}`}
                      checked={data.channels.includes(channel)}
                      onCheckedChange={(checked) => handleChannelChange(channel, checked, isEdit)}
                    />
                    <Label htmlFor={`${isEdit ? 'edit-' : ''}channel-${channel}`} className="text-sm">{channel}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Applicable Card Types</Label>
              <div className="grid grid-cols-2 gap-3">
                {["Premium Cards", "Standard Cards", "Debit Cards", "Credit Cards", "Business Cards", "Student Cards"].map((cardType) => (
                  <div key={cardType} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`${isEdit ? 'edit-' : ''}card-${cardType}`}
                      checked={data.cardTypes.includes(cardType)}
                      onCheckedChange={(checked) => handleCardTypeChange(cardType, checked, isEdit)}
                    />
                    <Label htmlFor={`${isEdit ? 'edit-' : ''}card-${cardType}`} className="text-sm">{cardType}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Rule Settings</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={isEdit ? "editStartDate" : "startDate"}>Start Date</Label>
                <Input
                  id={isEdit ? "editStartDate" : "startDate"}
                  type="date"
                  value={data.startDate}
                  onChange={(e) => setData(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={isEdit ? "editEndDate" : "endDate"}>End Date</Label>
                <Input
                  id={isEdit ? "editEndDate" : "endDate"}
                  type="date"
                  value={data.endDate}
                  onChange={(e) => setData(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={isEdit ? "editExpiryDays" : "expiryDays"}>Points Expiry (Days)</Label>
              <Select 
                value={data.expiryDays} 
                onValueChange={(value) => setData(prev => ({ ...prev, expiryDays: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                  <SelectItem value="365">365 days</SelectItem>
                  <SelectItem value="730">2 years</SelectItem>
                  <SelectItem value="never">Never expire</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-Activation</Label>
                  <p className="text-sm text-muted-foreground">Automatically activate this rule when {isEdit ? 'updated' : 'created'}</p>
                </div>
                <Switch 
                  checked={data.autoActivation}
                  onCheckedChange={(checked) => setData(prev => ({ ...prev, autoActivation: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Stackable</Label>
                  <p className="text-sm text-muted-foreground">Can be combined with other rules</p>
                </div>
                <Switch 
                  checked={data.stackable}
                  onCheckedChange={(checked) => setData(prev => ({ ...prev, stackable: checked }))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 -mx-6 px-6 w-[calc(100%+3rem)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium">Rewards & Loyalty Management</h1>
          <p className="text-muted-foreground">
            Configure reward rules, customer tiers, and point management
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Bulk Upload
          </Button>
          
          {/* New Rule Dialog */}
          <Dialog open={isNewRuleOpen} onOpenChange={setIsNewRuleOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Rule
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-none w-[95vw] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Reward Rule</DialogTitle>
                <DialogDescription>
                  Configure a new reward rule with earning rates, eligibility criteria, and conditions
                </DialogDescription>
              </DialogHeader>
              
              {renderRuleForm(newRuleData, setNewRuleData, false)}

              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Info className="h-4 w-4" />
                  <span>All fields marked with * are required</span>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setIsNewRuleOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleNewRuleSubmit}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Create Rule
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Edit Rule Dialog */}
          <Dialog open={isEditRuleOpen} onOpenChange={setIsEditRuleOpen}>
            <DialogContent className="max-w-none w-[95vw] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Reward Rule</DialogTitle>
                <DialogDescription>
                  Modify the reward rule settings, rates, and eligibility criteria
                </DialogDescription>
              </DialogHeader>
              
              {renderRuleForm(editRuleData, setEditRuleData, true)}

              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Info className="h-4 w-4" />
                  <span>All fields marked with * are required</span>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setIsEditRuleOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleEditRuleSubmit}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Configure Redemption Dialog */}
          <Dialog open={isRedemptionConfigOpen} onOpenChange={setIsRedemptionConfigOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Configure Redemption
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-none w-[95vw] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl">Configure Redemption Options</DialogTitle>
                <DialogDescription>
                  Set up comprehensive redemption methods, limits, and processing workflows
                </DialogDescription>
              </DialogHeader>
              
              {/* Step Progress Indicator */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  {redemptionSteps.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                          index <= redemptionStep
                            ? "bg-primary border-primary text-primary-foreground"
                            : "bg-background border-muted-foreground text-muted-foreground"
                        }`}
                      >
                        {index + 1}
                      </div>
                      {index < redemptionSteps.length - 1 && (
                        <div className={`w-12 h-0.5 mx-2 ${
                          index < redemptionStep ? "bg-primary" : "bg-muted-foreground"
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                <Badge variant="secondary">
                  Step {redemptionStep + 1} of {redemptionSteps.length}
                </Badge>
              </div>

              {/* Step Content */}
              {renderRedemptionStep()}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Info className="h-4 w-4" />
                  <span>Configure redemption options and processing rules</span>
                </div>
                <div className="flex gap-3">
                  {redemptionStep > 0 && (
                    <Button variant="outline" onClick={prevRedemptionStep}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                  )}
                  {redemptionStep < redemptionSteps.length - 1 ? (
                    <Button onClick={nextRedemptionStep}>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={handleRedemptionSubmit}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Save Configuration
                    </Button>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="rules" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="rules">Reward Rules</TabsTrigger>
          <TabsTrigger value="tiers">Customer Tiers</TabsTrigger>
          <TabsTrigger value="redemption">Redemption</TabsTrigger>
          <TabsTrigger value="manual">Manual Points</TabsTrigger>
        </TabsList>

        {/* Reward Rules Tab */}
        <TabsContent value="rules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dynamic Reward Rules</CardTitle>
              <CardDescription>
                Configure point earning rules based on transactions, channels, and card types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1">
                  <Input placeholder="Search reward rules..." className="max-w-sm" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rule Name</TableHead>
                    <TableHead>Basis</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Eligibility</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rewardRules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{rule.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {rule.channels.join(", ")} • {rule.cardTypes.join(", ")}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{rule.basis}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{rule.rate}</Badge>
                      </TableCell>
                      <TableCell>{rule.eligibility}</TableCell>
                      <TableCell>
                        <Badge variant={rule.status === "Active" ? "default" : "secondary"}>
                          {rule.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{rule.expiry}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditRule(rule)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
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

        {/* Customer Tiers Tab */}
        <TabsContent value="tiers" className="space-y-6 w-full">
          <div className="w-full space-y-6">
            {/* Header Section */}
            <div className="space-y-2">
              <h2 className="text-2xl font-medium">Customer Tier Management</h2>
              <p className="text-muted-foreground">
                Configure tier structures, benefits, and auto-promotion rules
              </p>
            </div>
            
            {/* Tier Cards */}
            <div className="w-full space-y-6">
              {customerTiers.map((tier) => (
                <Card key={tier.id} className="w-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <CardTitle className="text-2xl">{tier.name} Tier</CardTitle>
                        <Badge variant="outline" className="px-3 py-1">
                          {tier.customers.toLocaleString()} customers
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={tier.autoPromotion ? "default" : "secondary"}>
                          {tier.autoPromotion ? "Auto-Promotion" : "Manual"}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">Spend Range</Label>
                        <div className="text-lg">
                          {formatCurrency(convertCurrency(tier.minSpendUSD))} - {tier.maxSpendUSD ? formatCurrency(convertCurrency(tier.maxSpendUSD)) : "Unlimited"}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">Points Multiplier</Label>
                        <div className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-yellow-500" />
                          <span className="text-lg">{tier.pointsMultiplier}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">Customer Count</Label>
                        <div className="text-lg">
                          {tier.customers.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">Key Benefits</Label>
                        <div className="space-y-1">
                          {tier.benefits.slice(0, 2).map((benefit, index) => (
                            <div key={index} className="text-sm text-muted-foreground">• {benefit}</div>
                          ))}
                          {tier.benefits.length > 2 && (
                            <div className="text-sm text-muted-foreground">+{tier.benefits.length - 2} more</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Redemption Tab */}
        <TabsContent value="redemption" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Point Redemption Management</CardTitle>
              <CardDescription>
                Configure redemption options, rates, and partner integrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Redemption Configuration</h3>
                <p className="text-muted-foreground mb-4">
                  Set up redemption options, partner rewards, and conversion rates
                </p>
                <Dialog open={isRedemptionConfigOpen} onOpenChange={setIsRedemptionConfigOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Configure Redemption
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manual Points Tab */}
        <TabsContent value="manual" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Manual Points Management</CardTitle>
              <CardDescription>
                Add, remove, or adjust customer points manually with audit trails
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Manual Points Operations</h3>
                <p className="text-muted-foreground mb-4">
                  Manually adjust customer point balances with proper documentation
                </p>
                <div className="flex gap-3 justify-center">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Points
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Bulk Upload
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}