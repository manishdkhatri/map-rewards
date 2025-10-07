import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Checkbox } from "./ui/checkbox";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { 
  Plus, 
  Eye, 
  Edit, 
  Play, 
  Pause, 
  TrendingUp,
  Calendar as CalendarIcon,
  Target,
  Users,
  Award,
  BarChart3,
  Download,
  Filter,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Info,
  Gift,
  Mail,
  Smartphone,
  Globe,
  DollarSign,
  Percent
} from "lucide-react";
import { format } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";
import { toast } from "sonner@2.0.3";

interface CampaignManagementProps {
  onCreateCampaign?: () => void;
}

export function CampaignManagement({ onCreateCampaign }: CampaignManagementProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isNewCampaignOpen, setIsNewCampaignOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [newCampaignData, setNewCampaignData] = useState({
    // Campaign Basics
    name: "",
    description: "",
    type: "",
    objective: "",
    category: "",
    
    // Target Audience
    targetCustomers: "",
    customerTiers: [],
    ageRange: { min: "", max: "" },
    location: "",
    spendThreshold: "",
    includeNewCustomers: false,
    includeExistingCustomers: true,
    
    // Campaign Setup
    offerType: "",
    rewardValue: "",
    rewardUnit: "",
    conditions: "",
    channels: [],
    maxRedemptions: "",
    maxRedemptionsPerCustomer: "",
    
    // Schedule & Budget
    startDate: "",
    endDate: "",
    budget: "",
    budgetType: "total",
    autoActivate: true,
    priority: "medium",
    
    // Advanced Settings
    stackable: false,
    requiresApproval: false,
    notificationSettings: {
      email: true,
      sms: false,
      push: true,
      web: false
    },
    trackingEnabled: true,
    notes: ""
  });

  const totalSteps = 5;

  // Template data with complete campaign configurations
  const campaignTemplates = [
    {
      id: "welcome-bonus",
      name: "Welcome Bonus",
      description: "New customer onboarding campaign with signup bonus",
      type: "Onboarding",
      duration: "90 days",
      engagement: "High",
      config: {
        name: "Welcome Bonus Campaign",
        type: "onboarding",
        objective: "acquisition",
        category: "general",
        description: "Welcome new customers with an attractive signup bonus to encourage engagement and build loyalty from day one.",
        targetCustomers: "new",
        customerTiers: [],
        includeNewCustomers: true,
        includeExistingCustomers: false,
        offerType: "points",
        rewardValue: "500",
        rewardUnit: "fixed-amount",
        conditions: "Valid for first 30 days after account opening. Minimum spend of $50 required.",
        channels: ["email", "push", "web"],
        maxRedemptions: "10000",
        maxRedemptionsPerCustomer: "1",
        budgetType: "total",
        budget: "5000000",
        priority: "high",
        autoActivate: true,
        stackable: false,
        requiresApproval: false,
        trackingEnabled: true
      }
    },
    {
      id: "seasonal-cashback",
      name: "Seasonal Cashback",
      description: "Holiday shopping rewards with category bonuses",
      type: "Seasonal",
      duration: "60 days",
      engagement: "Medium",
      config: {
        name: "Holiday Shopping Cashback",
        type: "seasonal",
        objective: "spend",
        category: "shopping",
        description: "Boost holiday spending with enhanced cashback rewards across popular shopping categories.",
        targetCustomers: "all",
        customerTiers: ["Silver", "Gold", "Platinum"],
        includeNewCustomers: true,
        includeExistingCustomers: true,
        offerType: "cashback",
        rewardValue: "5",
        rewardUnit: "percentage",
        conditions: "Enhanced cashback on shopping, dining, and entertainment. Valid through holiday season.",
        channels: ["email", "sms", "push", "web"],
        maxRedemptions: "",
        maxRedemptionsPerCustomer: "",
        budgetType: "monthly",
        budget: "2000000",
        priority: "medium",
        autoActivate: true,
        stackable: true,
        requiresApproval: false,
        trackingEnabled: true
      }
    },
    {
      id: "tier-upgrade",
      name: "Tier Upgrade Challenge",
      description: "Encourage customers to reach next tier level",
      type: "Tier Promotion",
      duration: "120 days",
      engagement: "High",
      config: {
        name: "Tier Upgrade Challenge",
        type: "tier",
        objective: "tier-upgrade",
        category: "general",
        description: "Motivate customers to reach the next tier level with bonus points and exclusive benefits.",
        targetCustomers: "existing",
        customerTiers: ["Bronze", "Silver", "Gold"],
        includeNewCustomers: false,
        includeExistingCustomers: true,
        offerType: "multiplier",
        rewardValue: "2",
        rewardUnit: "multiplier",
        conditions: "Earn 2x points towards tier qualification. Tier upgrade must be achieved within campaign period.",
        channels: ["email", "push", "web", "mobile"],
        maxRedemptions: "",
        maxRedemptionsPerCustomer: "1",
        budgetType: "total",
        budget: "3000000",
        priority: "high",
        autoActivate: true,
        stackable: false,
        requiresApproval: true,
        trackingEnabled: true
      }
    },
    {
      id: "retention-campaign",
      name: "Retention Campaign",
      description: "Re-engage dormant customers with special offers",
      type: "Retention",
      duration: "45 days",
      engagement: "Medium",
      config: {
        name: "Win-Back Retention Campaign",
        type: "retention",
        objective: "retention",
        category: "general",
        description: "Re-engage inactive customers with compelling offers to bring them back to active usage.",
        targetCustomers: "inactive",
        customerTiers: [],
        includeNewCustomers: false,
        includeExistingCustomers: true,
        offerType: "points",
        rewardValue: "200",
        rewardUnit: "points-per-transaction",
        conditions: "For customers inactive for 90+ days. Bonus points for first 3 transactions after reactivation.",
        channels: ["email", "sms", "push"],
        maxRedemptions: "5000",
        maxRedemptionsPerCustomer: "3",
        budgetType: "total",
        budget: "1500000",
        priority: "medium",
        autoActivate: false,
        stackable: true,
        requiresApproval: true,
        trackingEnabled: true
      }
    },
    {
      id: "cross-sell",
      name: "Cross-sell Promotion",
      description: "Promote additional banking products",
      type: "Cross-sell",
      duration: "30 days",
      engagement: "Low",
      config: {
        name: "Banking Products Cross-sell",
        type: "cross-sell",
        objective: "cross-sell",
        category: "general",
        description: "Introduce customers to additional banking products with attractive incentives.",
        targetCustomers: "existing",
        customerTiers: ["Gold", "Platinum"],
        includeNewCustomers: false,
        includeExistingCustomers: true,
        offerType: "fixed-reward",
        rewardValue: "1000",
        rewardUnit: "fixed-amount",
        conditions: "Reward for opening new banking product. Limited to one reward per product type.",
        channels: ["email", "web", "branch"],
        maxRedemptions: "2000",
        maxRedemptionsPerCustomer: "3",
        budgetType: "total",
        budget: "2000000",
        priority: "low",
        autoActivate: false,
        stackable: false,
        requiresApproval: true,
        trackingEnabled: true
      }
    },
    {
      id: "referral-rewards",
      name: "Referral Rewards",
      description: "Customer referral program with bonus points",
      type: "Referral",
      duration: "Ongoing",
      engagement: "High",
      config: {
        name: "Refer-a-Friend Rewards",
        type: "referral",
        objective: "acquisition",
        category: "general",
        description: "Reward customers for successful referrals with bonus points for both referrer and referee.",
        targetCustomers: "all",
        customerTiers: [],
        includeNewCustomers: true,
        includeExistingCustomers: true,
        offerType: "points",
        rewardValue: "1000",
        rewardUnit: "fixed-amount",
        conditions: "Both referrer and referee receive bonus. Referee must remain active for 60 days to qualify.",
        channels: ["email", "push", "web", "mobile"],
        maxRedemptions: "",
        maxRedemptionsPerCustomer: "12",
        budgetType: "monthly",
        budget: "1000000",
        priority: "medium",
        autoActivate: true,
        stackable: true,
        requiresApproval: false,
        trackingEnabled: true
      }
    }
  ];

  const handleUseTemplate = (customizations = {}) => {
    const templateConfig = { ...selectedTemplate.config, ...customizations };
    
    // Pre-populate the new campaign form with template data
    setNewCampaignData({
      ...newCampaignData,
      ...templateConfig,
      // Add template-specific defaults
      startDate: customizations.startDate || "",
      endDate: customizations.endDate || "",
      notes: customizations.notes || `Campaign created from ${selectedTemplate.name} template`
    });
    
    // Close template dialog and open campaign creation
    setIsTemplateDialogOpen(false);
    setSelectedTemplate(null);
    setTempCustomizations({
      name: "",
      startDate: "",
      endDate: "",
      budget: "",
      notes: ""
    });
    setCurrentStep(1);
    setIsNewCampaignOpen(true);
    
    toast.success(`Template loaded successfully!`, {
      description: `${selectedTemplate.name} template has been loaded into the campaign builder.`
    });
  };

  const handleDirectCreateFromTemplate = (customizations = {}) => {
    const templateConfig = { ...selectedTemplate.config, ...customizations };
    
    // Validate required fields
    if (!customizations.startDate || !customizations.name) {
      toast.error("Please provide campaign name and start date");
      return;
    }
    
    const campaignData = {
      ...templateConfig,
      ...customizations,
      notes: customizations.notes || `Campaign created from ${selectedTemplate.name} template`
    };
    
    // In a real app, this would make an API call
    console.log("Creating campaign from template:", campaignData);
    
    // Close dialogs and show success
    setIsTemplateDialogOpen(false);
    setSelectedTemplate(null);
    setTempCustomizations({
      name: "",
      startDate: "",
      endDate: "",
      budget: "",
      notes: ""
    });
    
    toast.success(`Campaign "${campaignData.name}" created successfully!`, {
      description: `Using ${selectedTemplate.name} template with your customizations.`
    });
  };

  const handleNewCampaignSubmit = () => {
    // Validate form data
    if (!newCampaignData.name || !newCampaignData.type || !newCampaignData.startDate) {
      alert("Please fill in all required fields");
      return;
    }
    
    // In a real app, this would make an API call
    console.log("Creating new campaign:", newCampaignData);
    
    // Reset form and close dialog
    setNewCampaignData({
      name: "",
      description: "",
      type: "",
      objective: "",
      category: "",
      targetCustomers: "",
      customerTiers: [],
      ageRange: { min: "", max: "" },
      location: "",
      spendThreshold: "",
      includeNewCustomers: false,
      includeExistingCustomers: true,
      offerType: "",
      rewardValue: "",
      rewardUnit: "",
      conditions: "",
      channels: [],
      maxRedemptions: "",
      maxRedemptionsPerCustomer: "",
      startDate: "",
      endDate: "",
      budget: "",
      budgetType: "total",
      autoActivate: true,
      priority: "medium",
      stackable: false,
      requiresApproval: false,
      notificationSettings: {
        email: true,
        sms: false,
        push: true,
        web: false
      },
      trackingEnabled: true,
      notes: ""
    });
    setCurrentStep(1);
    setIsNewCampaignOpen(false);
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

  const handleChannelChange = (channel, checked) => {
    if (checked) {
      setNewCampaignData(prev => ({
        ...prev,
        channels: [...prev.channels, channel]
      }));
    } else {
      setNewCampaignData(prev => ({
        ...prev,
        channels: prev.channels.filter(c => c !== channel)
      }));
    }
  };

  const handleTierChange = (tier, checked) => {
    if (checked) {
      setNewCampaignData(prev => ({
        ...prev,
        customerTiers: [...prev.customerTiers, tier]
      }));
    } else {
      setNewCampaignData(prev => ({
        ...prev,
        customerTiers: prev.customerTiers.filter(t => t !== tier)
      }));
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Campaign Basics</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="campaignName">Campaign Name *</Label>
                  <Input
                    id="campaignName"
                    placeholder="Enter campaign name"
                    value={newCampaignData.name}
                    onChange={(e) => setNewCampaignData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="campaignType">Campaign Type *</Label>
                  <Select 
                    value={newCampaignData.type} 
                    onValueChange={(value) => setNewCampaignData(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select campaign type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cashback">Cashback Promotion</SelectItem>
                      <SelectItem value="tier">Tier Promotion</SelectItem>
                      <SelectItem value="seasonal">Seasonal Campaign</SelectItem>
                      <SelectItem value="onboarding">Customer Onboarding</SelectItem>
                      <SelectItem value="retention">Retention Campaign</SelectItem>
                      <SelectItem value="cross-sell">Cross-sell Campaign</SelectItem>
                      <SelectItem value="referral">Referral Program</SelectItem>
                      <SelectItem value="birthday">Birthday Special</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="objective">Campaign Objective</Label>
                  <Select 
                    value={newCampaignData.objective} 
                    onValueChange={(value) => setNewCampaignData(prev => ({ ...prev, objective: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select objective" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acquisition">Customer Acquisition</SelectItem>
                      <SelectItem value="retention">Customer Retention</SelectItem>
                      <SelectItem value="engagement">Increase Engagement</SelectItem>
                      <SelectItem value="spend">Increase Spend</SelectItem>
                      <SelectItem value="frequency">Increase Frequency</SelectItem>
                      <SelectItem value="tier-upgrade">Tier Upgrades</SelectItem>
                      <SelectItem value="cross-sell">Cross-sell Products</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={newCampaignData.category} 
                    onValueChange={(value) => setNewCampaignData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="dining">Dining & Entertainment</SelectItem>
                      <SelectItem value="shopping">Shopping & Retail</SelectItem>
                      <SelectItem value="travel">Travel & Transport</SelectItem>
                      <SelectItem value="bills">Bills & Utilities</SelectItem>
                      <SelectItem value="fuel">Fuel & Gas</SelectItem>
                      <SelectItem value="groceries">Groceries</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="campaignDescription">Campaign Description</Label>
                <Textarea
                  id="campaignDescription"
                  placeholder="Describe the campaign objectives, mechanics, and key benefits"
                  rows={4}
                  value={newCampaignData.description}
                  onChange={(e) => setNewCampaignData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Target Audience</h3>
              
              <div className="space-y-2">
                <Label htmlFor="targetCustomers">Target Customer Base</Label>
                <Select 
                  value={newCampaignData.targetCustomers} 
                  onValueChange={(value) => setNewCampaignData(prev => ({ ...prev, targetCustomers: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select target base" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="new">New Customers (&lt; 6 months)</SelectItem>
                    <SelectItem value="existing">Existing Customers</SelectItem>
                    <SelectItem value="high-value">High Value Customers</SelectItem>
                    <SelectItem value="inactive">Inactive Customers (&gt; 3 months)</SelectItem>
                    <SelectItem value="frequent">Frequent Users</SelectItem>
                    <SelectItem value="custom">Custom Segment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Customer Tiers (Select multiple)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {["Bronze", "Silver", "Gold", "Platinum"].map((tier) => (
                    <div key={tier} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`tier-${tier}`}
                        checked={newCampaignData.customerTiers.includes(tier)}
                        onCheckedChange={(checked) => handleTierChange(tier, checked)}
                      />
                      <Label htmlFor={`tier-${tier}`}>{tier} Tier</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ageMin">Age Range (Optional)</Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      id="ageMin"
                      type="number"
                      placeholder="Min age"
                      value={newCampaignData.ageRange.min}
                      onChange={(e) => setNewCampaignData(prev => ({ 
                        ...prev, 
                        ageRange: { ...prev.ageRange, min: e.target.value } 
                      }))}
                    />
                    <span>to</span>
                    <Input
                      type="number"
                      placeholder="Max age"
                      value={newCampaignData.ageRange.max}
                      onChange={(e) => setNewCampaignData(prev => ({ 
                        ...prev, 
                        ageRange: { ...prev.ageRange, max: e.target.value } 
                      }))}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location Filter</Label>
                  <Select 
                    value={newCampaignData.location} 
                    onValueChange={(value) => setNewCampaignData(prev => ({ ...prev, location: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="urban">Urban Areas</SelectItem>
                      <SelectItem value="suburban">Suburban Areas</SelectItem>
                      <SelectItem value="specific-cities">Specific Cities</SelectItem>
                      <SelectItem value="regions">Regional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="spendThreshold">Minimum Spend Threshold (Optional)</Label>
                <Input
                  id="spendThreshold"
                  type="number"
                  placeholder="Enter minimum spend amount"
                  value={newCampaignData.spendThreshold}
                  onChange={(e) => setNewCampaignData(prev => ({ ...prev, spendThreshold: e.target.value }))}
                />
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>Customer Type Inclusion</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Include New Customers</Label>
                      <p className="text-sm text-muted-foreground">Customers registered within last 6 months</p>
                    </div>
                    <Switch 
                      checked={newCampaignData.includeNewCustomers}
                      onCheckedChange={(checked) => setNewCampaignData(prev => ({ ...prev, includeNewCustomers: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Include Existing Customers</Label>
                      <p className="text-sm text-muted-foreground">Customers registered more than 6 months ago</p>
                    </div>
                    <Switch 
                      checked={newCampaignData.includeExistingCustomers}
                      onCheckedChange={(checked) => setNewCampaignData(prev => ({ ...prev, includeExistingCustomers: checked }))}
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
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Campaign Setup</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="offerType">Offer Type *</Label>
                  <Select 
                    value={newCampaignData.offerType} 
                    onValueChange={(value) => setNewCampaignData(prev => ({ ...prev, offerType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select offer type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="points">Bonus Points</SelectItem>
                      <SelectItem value="cashback">Cashback</SelectItem>
                      <SelectItem value="discount">Discount Percentage</SelectItem>
                      <SelectItem value="multiplier">Points Multiplier</SelectItem>
                      <SelectItem value="fixed-reward">Fixed Reward</SelectItem>
                      <SelectItem value="tier-bonus">Tier Bonus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rewardValue">Reward Value *</Label>
                  <Input
                    id="rewardValue"
                    type="number"
                    placeholder="Enter reward value"
                    value={newCampaignData.rewardValue}
                    onChange={(e) => setNewCampaignData(prev => ({ ...prev, rewardValue: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rewardUnit">Reward Unit</Label>
                <Select 
                  value={newCampaignData.rewardUnit} 
                  onValueChange={(value) => setNewCampaignData(prev => ({ ...prev, rewardUnit: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select reward unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="points-per-dollar">Points per $1 spent</SelectItem>
                    <SelectItem value="points-per-transaction">Points per transaction</SelectItem>
                    <SelectItem value="percentage">Percentage of spend</SelectItem>
                    <SelectItem value="fixed-amount">Fixed amount</SelectItem>
                    <SelectItem value="multiplier">Multiplier (e.g., 2x, 3x)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="conditions">Campaign Conditions</Label>
                <Textarea
                  id="conditions"
                  placeholder="Describe any specific conditions, restrictions, or eligibility criteria"
                  rows={3}
                  value={newCampaignData.conditions}
                  onChange={(e) => setNewCampaignData(prev => ({ ...prev, conditions: e.target.value }))}
                />
              </div>

              <div className="space-y-3">
                <Label>Communication Channels</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: "email", label: "Email", icon: Mail },
                    { id: "sms", label: "SMS", icon: Smartphone },
                    { id: "push", label: "Push Notifications", icon: Smartphone },
                    { id: "web", label: "Website Banners", icon: Globe },
                    { id: "mobile", label: "Mobile App", icon: Smartphone },
                    { id: "branch", label: "Branch Display", icon: Info }
                  ].map((channel) => (
                    <div key={channel.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`channel-${channel.id}`}
                        checked={newCampaignData.channels.includes(channel.id)}
                        onCheckedChange={(checked) => handleChannelChange(channel.id, checked)}
                      />
                      <Label htmlFor={`channel-${channel.id}`} className="flex items-center gap-2 text-sm">
                        <channel.icon className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{channel.label}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxRedemptions">Max Total Redemptions</Label>
                  <Input
                    id="maxRedemptions"
                    type="number"
                    placeholder="No limit"
                    value={newCampaignData.maxRedemptions}
                    onChange={(e) => setNewCampaignData(prev => ({ ...prev, maxRedemptions: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxRedemptionsPerCustomer">Max Redemptions Per Customer</Label>
                  <Input
                    id="maxRedemptionsPerCustomer"
                    type="number"
                    placeholder="No limit"
                    value={newCampaignData.maxRedemptionsPerCustomer}
                    onChange={(e) => setNewCampaignData(prev => ({ ...prev, maxRedemptionsPerCustomer: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Schedule & Budget</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newCampaignData.startDate}
                    onChange={(e) => setNewCampaignData(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newCampaignData.endDate}
                    onChange={(e) => setNewCampaignData(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Campaign Budget</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="Enter budget amount"
                    value={newCampaignData.budget}
                    onChange={(e) => setNewCampaignData(prev => ({ ...prev, budget: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="budgetType">Budget Type</Label>
                  <Select 
                    value={newCampaignData.budgetType} 
                    onValueChange={(value) => setNewCampaignData(prev => ({ ...prev, budgetType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="total">Total Budget (Points)</SelectItem>
                      <SelectItem value="daily">Daily Budget</SelectItem>
                      <SelectItem value="weekly">Weekly Budget</SelectItem>
                      <SelectItem value="monthly">Monthly Budget</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Campaign Priority</Label>
                <Select 
                  value={newCampaignData.priority} 
                  onValueChange={(value) => setNewCampaignData(prev => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium">Campaign Settings</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-Activate Campaign</Label>
                      <p className="text-sm text-muted-foreground">Automatically start campaign on start date</p>
                    </div>
                    <Switch 
                      checked={newCampaignData.autoActivate}
                      onCheckedChange={(checked) => setNewCampaignData(prev => ({ ...prev, autoActivate: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Stackable with Other Campaigns</Label>
                      <p className="text-sm text-muted-foreground">Allow combining with other active campaigns</p>
                    </div>
                    <Switch 
                      checked={newCampaignData.stackable}
                      onCheckedChange={(checked) => setNewCampaignData(prev => ({ ...prev, stackable: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Requires Approval</Label>
                      <p className="text-sm text-muted-foreground">Campaign needs manual approval before activation</p>
                    </div>
                    <Switch 
                      checked={newCampaignData.requiresApproval}
                      onCheckedChange={(checked) => setNewCampaignData(prev => ({ ...prev, requiresApproval: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Tracking & Analytics</Label>
                      <p className="text-sm text-muted-foreground">Track campaign performance and customer engagement</p>
                    </div>
                    <Switch 
                      checked={newCampaignData.trackingEnabled}
                      onCheckedChange={(checked) => setNewCampaignData(prev => ({ ...prev, trackingEnabled: checked }))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Review & Additional Settings</h3>
              
              <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                <h4 className="font-medium">Campaign Summary</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Campaign Name:</span>
                      <span className="font-medium">{newCampaignData.name || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="font-medium">{newCampaignData.type || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Objective:</span>
                      <span className="font-medium">{newCampaignData.objective || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Target Audience:</span>
                      <span className="font-medium">{newCampaignData.targetCustomers || "Not specified"}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Offer Type:</span>
                      <span className="font-medium">{newCampaignData.offerType || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reward Value:</span>
                      <span className="font-medium">{newCampaignData.rewardValue || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Start Date:</span>
                      <span className="font-medium">{newCampaignData.startDate || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Budget:</span>
                      <span className="font-medium">{newCampaignData.budget || "Not specified"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Notification Settings</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send campaign updates via email</p>
                    </div>
                    <Switch 
                      checked={newCampaignData.notificationSettings.email}
                      onCheckedChange={(checked) => setNewCampaignData(prev => ({ 
                        ...prev, 
                        notificationSettings: { ...prev.notificationSettings, email: checked }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send campaign alerts via SMS</p>
                    </div>
                    <Switch 
                      checked={newCampaignData.notificationSettings.sms}
                      onCheckedChange={(checked) => setNewCampaignData(prev => ({ 
                        ...prev, 
                        notificationSettings: { ...prev.notificationSettings, sms: checked }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send app push notifications</p>
                    </div>
                    <Switch 
                      checked={newCampaignData.notificationSettings.push}
                      onCheckedChange={(checked) => setNewCampaignData(prev => ({ 
                        ...prev, 
                        notificationSettings: { ...prev.notificationSettings, push: checked }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Web Notifications</Label>
                      <p className="text-sm text-muted-foreground">Display web banners and alerts</p>
                    </div>
                    <Switch 
                      checked={newCampaignData.notificationSettings.web}
                      onCheckedChange={(checked) => setNewCampaignData(prev => ({ 
                        ...prev, 
                        notificationSettings: { ...prev.notificationSettings, web: checked }
                      }))}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Enter any additional notes, special instructions, or comments about this campaign"
                  rows={4}
                  value={newCampaignData.notes}
                  onChange={(e) => setNewCampaignData(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Template customization state
  const [tempCustomizations, setTempCustomizations] = useState({
    name: "",
    startDate: "",
    endDate: "",
    budget: "",
    notes: ""
  });

  // Update temp customizations when template is selected
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setTempCustomizations({
      name: template.config.name,
      startDate: "",
      endDate: "",
      budget: template.config.budget,
      notes: ""
    });
    setIsTemplateDialogOpen(true);
  };

  const renderTemplateDialog = () => {
    if (!selectedTemplate) return null;

    return (
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 pr-8">
            <Gift className="h-5 w-5 flex-shrink-0" />
            <span className="break-words">Use Template: {selectedTemplate.name}</span>
          </DialogTitle>
          <DialogDescription className="break-words">
            Customize this template and create your campaign. You can modify key settings or use the template as-is.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Template Preview */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-3">Template Overview</h3>
              <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium break-words flex-1">{selectedTemplate.name}</span>
                  <Badge variant="outline" className="flex-shrink-0">{selectedTemplate.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground break-words leading-relaxed">{selectedTemplate.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="min-w-0">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="ml-2 font-medium break-words">{selectedTemplate.duration}</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-muted-foreground">Engagement:</span>
                    <span className="ml-2 font-medium break-words">{selectedTemplate.engagement}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Template Configuration</h4>
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 bg-background rounded border min-w-0">
                    <span className="text-muted-foreground text-xs">Campaign Type:</span>
                    <p className="font-medium mt-1 break-words">{selectedTemplate.config.type}</p>
                  </div>
                  <div className="p-3 bg-background rounded border min-w-0">
                    <span className="text-muted-foreground text-xs">Objective:</span>
                    <p className="font-medium mt-1 break-words">{selectedTemplate.config.objective}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 bg-background rounded border min-w-0">
                    <span className="text-muted-foreground text-xs">Offer Type:</span>
                    <p className="font-medium mt-1 break-words">{selectedTemplate.config.offerType}</p>
                  </div>
                  <div className="p-3 bg-background rounded border min-w-0">
                    <span className="text-muted-foreground text-xs">Reward Value:</span>
                    <p className="font-medium mt-1 break-words">{selectedTemplate.config.rewardValue}</p>
                  </div>
                </div>
                
                <div className="p-3 bg-background rounded border min-w-0">
                  <span className="text-muted-foreground text-xs">Target Audience:</span>
                  <p className="font-medium mt-1 break-words">{selectedTemplate.config.targetCustomers}</p>
                  {selectedTemplate.config.customerTiers.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs text-muted-foreground">Tiers: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedTemplate.config.customerTiers.map(tier => (
                          <Badge key={tier} variant="outline" className="text-xs">
                            {tier}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-3 bg-background rounded border min-w-0">
                  <span className="text-muted-foreground text-xs">Campaign Conditions:</span>
                  <p className="text-sm mt-1 break-words leading-relaxed">{selectedTemplate.config.conditions}</p>
                </div>
                
                <div className="p-3 bg-background rounded border min-w-0">
                  <span className="text-muted-foreground text-xs">Communication Channels:</span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedTemplate.config.channels.map(channel => (
                      <Badge key={channel} variant="secondary" className="text-xs">
                        {channel}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 bg-background rounded border min-w-0">
                    <span className="text-muted-foreground text-xs">Budget Type:</span>
                    <p className="font-medium mt-1 break-words">{selectedTemplate.config.budgetType}</p>
                  </div>
                  <div className="p-3 bg-background rounded border min-w-0">
                    <span className="text-muted-foreground text-xs">Priority:</span>
                    <p className="font-medium mt-1 break-words">{selectedTemplate.config.priority}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customization Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Customize Template</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="templateCampaignName">Campaign Name *</Label>
                <Input
                  id="templateCampaignName"
                  value={tempCustomizations.name}
                  onChange={(e) => setTempCustomizations(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter campaign name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 min-w-0">
                  <Label htmlFor="templateStartDate">Start Date *</Label>
                  <Input
                    id="templateStartDate"
                    type="date"
                    value={tempCustomizations.startDate}
                    onChange={(e) => setTempCustomizations(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2 min-w-0">
                  <Label htmlFor="templateEndDate">End Date</Label>
                  <Input
                    id="templateEndDate"
                    type="date"
                    value={tempCustomizations.endDate}
                    onChange={(e) => setTempCustomizations(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="templateBudget">Campaign Budget</Label>
                <Input
                  id="templateBudget"
                  type="number"
                  value={tempCustomizations.budget}
                  onChange={(e) => setTempCustomizations(prev => ({ ...prev, budget: e.target.value }))}
                  placeholder="Enter budget amount"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="templateNotes">Additional Notes</Label>
                <Textarea
                  id="templateNotes"
                  value={tempCustomizations.notes}
                  onChange={(e) => setTempCustomizations(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Add any specific notes or modifications for this campaign"
                  rows={3}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-medium">Quick Actions</h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => handleDirectCreateFromTemplate(tempCustomizations)}
                  className="flex-1"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Create Campaign Now
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleUseTemplate(tempCustomizations)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Customize Further
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                "Create Now" will create the campaign immediately. "Customize Further" opens the full campaign builder with template data pre-filled.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-0">
            <Info className="h-4 w-4 flex-shrink-0" />
            <span className="break-words">Template settings can be modified after creation</span>
          </div>
          <Button variant="outline" onClick={() => setIsTemplateDialogOpen(false)} className="flex-shrink-0">
            Cancel
          </Button>
        </div>
      </DialogContent>
    );
  };

  const campaigns = [
    {
      id: "CAM001",
      name: "Summer Cashback Bonanza",
      type: "Cashback",
      status: "Active",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      targetCustomers: 150000,
      enrolled: 89500,
      pointsBudget: 5000000,
      pointsIssued: 2850000,
      performance: 68,
      conversionRate: 12.5,
      engagement: "High"
    },
    {
      id: "CAM002",
      name: "Tier Upgrade Challenge",
      type: "Tier Promotion",
      status: "Active",
      startDate: "2024-07-15",
      endDate: "2024-09-15",
      targetCustomers: 75000,
      enrolled: 42300,
      pointsBudget: 2500000,
      pointsIssued: 1200000,
      performance: 56,
      conversionRate: 8.9,
      engagement: "Medium"
    },
    {
      id: "CAM003",
      name: "Holiday Shopping Rewards",
      type: "Seasonal",
      status: "Scheduled",
      startDate: "2024-11-01",
      endDate: "2024-12-31",
      targetCustomers: 200000,
      enrolled: 0,
      pointsBudget: 8000000,
      pointsIssued: 0,
      performance: 0,
      conversionRate: 0,
      engagement: "N/A"
    },
    {
      id: "CAM004",
      name: "New Customer Welcome",
      type: "Onboarding",
      status: "Completed",
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      targetCustomers: 50000,
      enrolled: 48200,
      pointsBudget: 1500000,
      pointsIssued: 1480000,
      performance: 96,
      conversionRate: 18.7,
      engagement: "High"
    }
  ];

  const campaignPerformanceData = [
    { week: "Week 1", enrollment: 12000, engagement: 8500, redemption: 3200 },
    { week: "Week 2", enrollment: 18000, engagement: 14200, redemption: 5800 },
    { week: "Week 3", enrollment: 25000, engagement: 19800, redemption: 8900 },
    { week: "Week 4", enrollment: 31000, engagement: 24500, redemption: 12100 },
    { week: "Week 5", enrollment: 35000, engagement: 28200, redemption: 15300 },
    { week: "Week 6", enrollment: 38000, engagement: 31000, redemption: 18600 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "default";
      case "Scheduled":
        return "secondary";
      case "Completed":
        return "outline";
      case "Paused":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getEngagementColor = (engagement) => {
    switch (engagement) {
      case "High":
        return "text-green-600";
      case "Medium":
        return "text-yellow-600";
      case "Low":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium">Campaign Management</h1>
          <p className="text-muted-foreground">
            Create and manage data-driven promotional campaigns
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Dialog open={isNewCampaignOpen} onOpenChange={setIsNewCampaignOpen}>
            <DialogTrigger asChild>
              <Button onClick={onCreateCampaign}>
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-none w-[95vw] max-h-[90vh] overflow-y-auto overflow-x-hidden">
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
                <DialogDescription>
                  Design and launch a comprehensive marketing campaign with advanced targeting and analytics
                </DialogDescription>
              </DialogHeader>
              
              {/* Progress Indicator */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalSteps }, (_, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          index + 1 <= currentStep 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {index + 1}
                      </div>
                      {index < totalSteps - 1 && (
                        <div 
                          className={`w-12 h-0.5 mx-2 ${
                            index + 1 < currentStep ? 'bg-primary' : 'bg-muted'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  Step {currentStep} of {totalSteps}
                </div>
              </div>

              {/* Step Labels */}
              <div className="hidden lg:flex justify-between mb-6 text-sm">
                <span className={currentStep === 1 ? 'font-medium' : 'text-muted-foreground'}>
                  Campaign Basics
                </span>
                <span className={currentStep === 2 ? 'font-medium' : 'text-muted-foreground'}>
                  Target Audience
                </span>
                <span className={currentStep === 3 ? 'font-medium' : 'text-muted-foreground'}>
                  Campaign Setup
                </span>
                <span className={currentStep === 4 ? 'font-medium' : 'text-muted-foreground'}>
                  Schedule & Budget
                </span>
                <span className={currentStep === 5 ? 'font-medium' : 'text-muted-foreground'}>
                  Review & Launch
                </span>
              </div>

              {/* Mobile Step Label */}
              <div className="lg:hidden mb-6 text-center">
                <span className="text-sm font-medium">
                  {currentStep === 1 && "Campaign Basics"}
                  {currentStep === 2 && "Target Audience"}
                  {currentStep === 3 && "Campaign Setup"}
                  {currentStep === 4 && "Schedule & Budget"}
                  {currentStep === 5 && "Review & Launch"}
                </span>
              </div>

              {/* Form Content */}
              <div className="min-h-[500px]">
                {renderStepContent()}
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Info className="h-4 w-4 flex-shrink-0" />
                  <span>Fields marked with * are required</span>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsNewCampaignOpen(false)}
                    disabled={false}
                  >
                    Cancel
                  </Button>
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
                    <Button onClick={handleNewCampaignSubmit}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Create Campaign
                    </Button>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="campaigns">Active Campaigns</TabsTrigger>
          <TabsTrigger value="create">Create Campaign</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        {/* Active Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Overview</CardTitle>
              <CardDescription>
                Monitor and manage all promotional campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search campaigns..." 
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="font-medium">{campaign.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {campaign.id} • {campaign.type}
                          </p>
                        </div>
                        <Badge variant={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>{campaign.name} - Performance Dashboard</DialogTitle>
                              <DialogDescription>
                                Detailed campaign metrics and customer engagement
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <Card>
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-sm">Campaign Performance</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <ResponsiveContainer width="100%" height={200}>
                                      <LineChart data={campaignPerformanceData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="week" />
                                        <YAxis />
                                        <Line type="monotone" dataKey="enrollment" stroke="hsl(var(--primary))" />
                                        <Line type="monotone" dataKey="engagement" stroke="hsl(var(--secondary))" />
                                        <Line type="monotone" dataKey="redemption" stroke="hsl(var(--accent))" />
                                      </LineChart>
                                    </ResponsiveContainer>
                                  </CardContent>
                                </Card>
                                <div className="grid grid-cols-2 gap-4">
                                  <Card>
                                    <CardContent className="p-4">
                                      <div className="text-2xl font-medium">{campaign.enrolled.toLocaleString()}</div>
                                      <p className="text-sm text-muted-foreground">Enrolled Customers</p>
                                    </CardContent>
                                  </Card>
                                  <Card>
                                    <CardContent className="p-4">
                                      <div className="text-2xl font-medium">{campaign.conversionRate}%</div>
                                      <p className="text-sm text-muted-foreground">Conversion Rate</p>
                                    </CardContent>
                                  </Card>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium mb-3">Campaign Details</h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span>Campaign ID:</span>
                                      <span>{campaign.id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Type:</span>
                                      <span>{campaign.type}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Duration:</span>
                                      <span>{campaign.startDate} to {campaign.endDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Target Customers:</span>
                                      <span>{campaign.targetCustomers.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Points Budget:</span>
                                      <span>{campaign.pointsBudget.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Points Issued:</span>
                                      <span>{campaign.pointsIssued.toLocaleString()}</span>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-3">Performance Metrics</h4>
                                  <div className="space-y-3">
                                    <div>
                                      <div className="flex justify-between text-sm mb-1">
                                        <span>Enrollment Progress</span>
                                        <span>{Math.round((campaign.enrolled / campaign.targetCustomers) * 100)}%</span>
                                      </div>
                                      <Progress value={(campaign.enrolled / campaign.targetCustomers) * 100} />
                                    </div>
                                    <div>
                                      <div className="flex justify-between text-sm mb-1">
                                        <span>Budget Utilization</span>
                                        <span>{Math.round((campaign.pointsIssued / campaign.pointsBudget) * 100)}%</span>
                                      </div>
                                      <Progress value={(campaign.pointsIssued / campaign.pointsBudget) * 100} />
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span>Engagement Level:</span>
                                      <span className={getEngagementColor(campaign.engagement)}>
                                        {campaign.engagement}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {campaign.status === "Active" ? (
                          <Button variant="ghost" size="sm">
                            <Pause className="h-4 w-4" />
                          </Button>
                        ) : campaign.status === "Scheduled" ? (
                          <Button variant="ghost" size="sm">
                            <Play className="h-4 w-4" />
                          </Button>
                        ) : null}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-medium">{campaign.enrolled.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Enrolled</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-medium">{campaign.performance}%</div>
                        <div className="text-sm text-muted-foreground">Performance</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-medium">{campaign.conversionRate}%</div>
                        <div className="text-sm text-muted-foreground">Conversion</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-medium">
                          <span className={getEngagementColor(campaign.engagement)}>
                            {campaign.engagement}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">Engagement</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{campaign.startDate} - {campaign.endDate}</span>
                      <div className="flex items-center gap-4">
                        <span>Budget: {campaign.pointsBudget.toLocaleString()} pts</span>
                        <span>Issued: {campaign.pointsIssued.toLocaleString()} pts</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Create Campaign Tab */}
        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Campaign</CardTitle>
              <CardDescription>
                Design data-driven campaigns based on customer behavior analytics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Campaign Name</Label>
                    <Input placeholder="Enter campaign name" />
                  </div>

                  <div className="space-y-2">
                    <Label>Campaign Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select campaign type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cashback">Cashback Promotion</SelectItem>
                        <SelectItem value="tier">Tier Promotion</SelectItem>
                        <SelectItem value="seasonal">Seasonal Campaign</SelectItem>
                        <SelectItem value="onboarding">Customer Onboarding</SelectItem>
                        <SelectItem value="retention">Retention Campaign</SelectItem>
                        <SelectItem value="cross-sell">Cross-sell Campaign</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Target Customer Segment</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select target segment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Customers</SelectItem>
                        <SelectItem value="bronze">Bronze Tier</SelectItem>
                        <SelectItem value="silver">Silver Tier</SelectItem>
                        <SelectItem value="gold">Gold Tier</SelectItem>
                        <SelectItem value="platinum">Platinum Tier</SelectItem>
                        <SelectItem value="high-spenders">High Spenders</SelectItem>
                        <SelectItem value="inactive">Inactive Customers</SelectItem>
                        <SelectItem value="new">New Customers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            Pick a date
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Campaign Description</Label>
                    <Textarea 
                      placeholder="Describe the campaign objectives and mechanics"
                      rows={4}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Reward Structure</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reward type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">Fixed Points per Transaction</SelectItem>
                        <SelectItem value="percentage">Percentage Bonus</SelectItem>
                        <SelectItem value="tier-multiplier">Tier-based Multiplier</SelectItem>
                        <SelectItem value="spend-threshold">Spend Threshold Rewards</SelectItem>
                        <SelectItem value="category-bonus">Category-specific Bonus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Points Budget</Label>
                      <Input type="number" placeholder="Total points allocation" />
                    </div>
                    <div className="space-y-2">
                      <Label>Target Customers</Label>
                      <Input type="number" placeholder="Expected participants" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Eligibility Criteria</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="active-cards" />
                        <Label htmlFor="active-cards">Active card holders only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="min-spend" />
                        <Label htmlFor="min-spend">Minimum spend requirement</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="channel-specific" />
                        <Label htmlFor="channel-specific">Channel-specific (Mobile/Web/POS)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="new-customers" />
                        <Label htmlFor="new-customers">New customers only</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Communication Channels</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="email" defaultChecked />
                        <Label htmlFor="email">Email notification</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="sms" />
                        <Label htmlFor="sms">SMS notification</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="push" defaultChecked />
                        <Label htmlFor="push">Mobile push notification</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="in-app" defaultChecked />
                        <Label htmlFor="in-app">In-app banner</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t">
                <Button variant="outline" className="flex-1">Save as Draft</Button>
                <Button className="flex-1">Create Campaign</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Overall Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-medium">78.5%</div>
                <p className="text-sm text-muted-foreground">Average success rate</p>
                <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+12.3% from last quarter</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Total Customer Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-medium">2.4M</div>
                <p className="text-sm text-muted-foreground">Customers reached</p>
                <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+8.7% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Points Distributed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-medium">45.2M</div>
                <p className="text-sm text-muted-foreground">Total points issued</p>
                <div className="flex items-center gap-1 text-sm text-blue-600 mt-1">
                  <Award className="h-3 w-3" />
                  <span>$2.26M equivalent value</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance Trends</CardTitle>
              <CardDescription>Monthly campaign effectiveness over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={campaignPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Bar dataKey="enrollment" fill="hsl(var(--primary))" name="Enrollment" />
                  <Bar dataKey="engagement" fill="hsl(var(--secondary))" name="Engagement" />
                  <Bar dataKey="redemption" fill="hsl(var(--accent))" name="Redemption" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Templates</CardTitle>
              <CardDescription>
                Pre-built campaign templates for quick deployment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {campaignTemplates.map((template) => (
                  <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <Badge variant="outline">{template.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        {template.description}
                      </p>
                      <div className="flex items-center justify-between text-sm mb-3">
                        <span>Duration: {template.duration}</span>
                        <span className={getEngagementColor(template.engagement)}>
                          {template.engagement} Engagement
                        </span>
                      </div>
                      
                      {/* Template Quick Info */}
                      <div className="space-y-2 text-xs text-muted-foreground mb-3">
                        <div className="flex justify-between">
                          <span>Offer:</span>
                          <span className="font-medium">{template.config.offerType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Target:</span>
                          <span className="font-medium">{template.config.targetCustomers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Budget:</span>
                          <span className="font-medium">{parseInt(template.config.budget).toLocaleString()} pts</span>
                        </div>
                      </div>

                      <Dialog open={isTemplateDialogOpen && selectedTemplate?.id === template.id} onOpenChange={(open) => {
                        if (!open) {
                          setIsTemplateDialogOpen(false);
                          setSelectedTemplate(null);
                        }
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => handleTemplateSelect(template)}
                          >
                            <Gift className="h-4 w-4 mr-2" />
                            Use Template
                          </Button>
                        </DialogTrigger>
                        {renderTemplateDialog()}
                      </Dialog>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}