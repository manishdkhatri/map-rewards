import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Checkbox } from "./ui/checkbox";
import { Switch } from "./ui/switch";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  ArrowLeft, 
  Save, 
  Calendar as CalendarIcon,
  Target,
  Users,
  Gift,
  Mail,
  Smartphone,
  Globe,
  DollarSign,
  Percent,
  Award,
  Settings,
  Eye,
  AlertCircle,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner@2.0.3";

interface CampaignCreateProps {
  onBack: () => void;
  onSave: (campaignData: any) => void;
}

export function CampaignCreate({ onBack, onSave }: CampaignCreateProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [hasChanges, setHasChanges] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    description: '',
    type: '',
    category: '',
    priority: 'medium',
    
    // Target & Goals
    objective: '',
    targetAudience: '',
    expectedParticipants: '',
    budgetAmount: '',
    
    // Timing & Schedule
    startDate: null,
    endDate: null,
    timezone: 'IST',
    launchTime: '09:00',
    
    // Rewards & Incentives
    rewardType: '',
    pointsPerAction: '',
    bonusMultiplier: '',
    maxRewardPerUser: '',
    totalBudget: '',
    
    // Channels & Communication
    channels: {
      email: false,
      sms: false,
      pushNotification: false,
      inApp: false,
      whatsapp: false
    },
    
    // Advanced Settings
    autoStart: true,
    requireApproval: false,
    enableTracking: true,
    allowOptOut: true,
    
    // Terms & Conditions
    termsConditions: '',
    privacyPolicy: '',
    eligibilityCriteria: ''
  });

  const totalSteps = 5;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleChannelChange = (channel: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      channels: { ...prev.channels, [channel]: checked }
    }));
    setHasChanges(true);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    // Validate required fields
    if (!formData.name || !formData.type || !formData.objective) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Create campaign object
    const campaignData = {
      ...formData,
      id: `CAM-${Date.now()}`,
      status: 'Draft',
      createdAt: new Date().toISOString(),
      createdBy: 'Admin User'
    };

    onSave(campaignData);
    toast.success('Campaign created successfully!');
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

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Basic Information';
      case 2: return 'Target & Goals';
      case 3: return 'Timing & Schedule';
      case 4: return 'Rewards & Incentives';
      case 5: return 'Channels & Settings';
      default: return 'Campaign Setup';
    }
  };

  return (
    <div className="space-y-6 -mx-6 px-6 w-[calc(100%+3rem)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Campaigns
          </Button>
          <div>
            <h1 className="text-3xl font-medium">Create New Campaign</h1>
            <p className="text-muted-foreground">
              Set up a new marketing campaign with rewards and incentives
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges}>
            <Save className="h-4 w-4 mr-2" />
            Save as Draft
          </Button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">{getStepTitle()}</span>
          <span className="text-muted-foreground">Step {currentStep} of {totalSteps}</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {/* Changes Indicator */}
      {hasChanges && (
        <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <span className="text-sm text-yellow-800">You have unsaved changes</span>
        </div>
      )}

      {/* Step Content */}
      <div className="min-h-[600px]">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Basic Campaign Information
              </CardTitle>
              <CardDescription>
                Provide the fundamental details about your campaign
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter campaign name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your campaign objectives and benefits"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Campaign Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select campaign type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="loyalty">Loyalty Program</SelectItem>
                      <SelectItem value="acquisition">Customer Acquisition</SelectItem>
                      <SelectItem value="retention">Customer Retention</SelectItem>
                      <SelectItem value="engagement">Engagement Boost</SelectItem>
                      <SelectItem value="referral">Referral Program</SelectItem>
                      <SelectItem value="seasonal">Seasonal Campaign</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rewards">Rewards & Points</SelectItem>
                      <SelectItem value="cashback">Cashback</SelectItem>
                      <SelectItem value="discount">Discounts & Offers</SelectItem>
                      <SelectItem value="contest">Contest & Giveaway</SelectItem>
                      <SelectItem value="survey">Survey & Feedback</SelectItem>
                      <SelectItem value="milestone">Milestone Achievement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Target & Goals */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Target Audience & Goals
              </CardTitle>
              <CardDescription>
                Define your target audience and campaign objectives
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="objective">Campaign Objective *</Label>
                <Textarea
                  id="objective"
                  value={formData.objective}
                  onChange={(e) => handleInputChange('objective', e.target.value)}
                  placeholder="What do you want to achieve with this campaign?"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Select value={formData.targetAudience} onValueChange={(value) => handleInputChange('targetAudience', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="new">New Customers</SelectItem>
                    <SelectItem value="existing">Existing Customers</SelectItem>
                    <SelectItem value="premium">Premium Customers</SelectItem>
                    <SelectItem value="inactive">Inactive Customers</SelectItem>
                    <SelectItem value="high-value">High-Value Customers</SelectItem>
                    <SelectItem value="segment">Custom Segment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expectedParticipants">Expected Participants</Label>
                  <Input
                    id="expectedParticipants"
                    type="number"
                    value={formData.expectedParticipants}
                    onChange={(e) => handleInputChange('expectedParticipants', e.target.value)}
                    placeholder="Number of expected participants"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budgetAmount">Budget Amount</Label>
                  <Input
                    id="budgetAmount"
                    type="number"
                    value={formData.budgetAmount}
                    onChange={(e) => handleInputChange('budgetAmount', e.target.value)}
                    placeholder="Campaign budget in INR"
                  />
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="flex items-center gap-2 font-medium text-blue-900 mb-2">
                  <Users className="h-4 w-4" />
                  Audience Insights
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-blue-600 font-medium">Total Customers</p>
                    <p className="text-2xl font-bold text-blue-900">24,567</p>
                  </div>
                  <div>
                    <p className="text-blue-600 font-medium">Active Users</p>
                    <p className="text-2xl font-bold text-blue-900">18,432</p>
                  </div>
                  <div>
                    <p className="text-blue-600 font-medium">Avg. Engagement</p>
                    <p className="text-2xl font-bold text-blue-900">67%</p>
                  </div>
                  <div>
                    <p className="text-blue-600 font-medium">Potential Reach</p>
                    <p className="text-2xl font-bold text-blue-900">15,200</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Timing & Schedule */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Campaign Schedule
              </CardTitle>
              <CardDescription>
                Set the timing and duration for your campaign
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.startDate ? format(formData.startDate, "PPP") : "Select start date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.startDate}
                        onSelect={(date) => handleInputChange('startDate', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.endDate ? format(formData.endDate, "PPP") : "Select end date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.endDate}
                        onSelect={(date) => handleInputChange('endDate', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={formData.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IST">IST (UTC+5:30)</SelectItem>
                      <SelectItem value="UTC">UTC (UTC+0:00)</SelectItem>
                      <SelectItem value="EST">EST (UTC-5:00)</SelectItem>
                      <SelectItem value="PST">PST (UTC-8:00)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="launchTime">Launch Time</Label>
                  <Input
                    id="launchTime"
                    type="time"
                    value={formData.launchTime}
                    onChange={(e) => handleInputChange('launchTime', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="autoStart"
                  checked={formData.autoStart}
                  onCheckedChange={(checked) => handleInputChange('autoStart', checked)}
                />
                <Label htmlFor="autoStart">Auto-start campaign at scheduled time</Label>
              </div>

              {formData.startDate && formData.endDate && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="flex items-center gap-2 font-medium text-green-900 mb-2">
                    <CheckCircle className="h-4 w-4" />
                    Campaign Duration
                  </h4>
                  <p className="text-green-800">
                    Campaign will run for {Math.ceil((formData.endDate - formData.startDate) / (1000 * 60 * 60 * 24))} days
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 4: Rewards & Incentives */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Rewards & Incentives
              </CardTitle>
              <CardDescription>
                Configure rewards and incentive structure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="rewardType">Reward Type</Label>
                <Select value={formData.rewardType} onValueChange={(value) => handleInputChange('rewardType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reward type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="points">Loyalty Points</SelectItem>
                    <SelectItem value="cashback">Cashback</SelectItem>
                    <SelectItem value="discount">Discount Coupon</SelectItem>
                    <SelectItem value="gift">Gift Voucher</SelectItem>
                    <SelectItem value="product">Free Product</SelectItem>
                    <SelectItem value="upgrade">Service Upgrade</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pointsPerAction">Points/Reward per Action</Label>
                  <Input
                    id="pointsPerAction"
                    type="number"
                    value={formData.pointsPerAction}
                    onChange={(e) => handleInputChange('pointsPerAction', e.target.value)}
                    placeholder="e.g., 100 points"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bonusMultiplier">Bonus Multiplier</Label>
                  <Input
                    id="bonusMultiplier"
                    type="number"
                    step="0.1"
                    value={formData.bonusMultiplier}
                    onChange={(e) => handleInputChange('bonusMultiplier', e.target.value)}
                    placeholder="e.g., 1.5x"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxRewardPerUser">Max Reward per User</Label>
                  <Input
                    id="maxRewardPerUser"
                    type="number"
                    value={formData.maxRewardPerUser}
                    onChange={(e) => handleInputChange('maxRewardPerUser', e.target.value)}
                    placeholder="Maximum reward limit"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalBudget">Total Reward Budget</Label>
                  <Input
                    id="totalBudget"
                    type="number"
                    value={formData.totalBudget}
                    onChange={(e) => handleInputChange('totalBudget', e.target.value)}
                    placeholder="Total budget allocation"
                  />
                </div>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="flex items-center gap-2 font-medium text-purple-900 mb-3">
                  <DollarSign className="h-4 w-4" />
                  Reward Calculator
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-purple-600 font-medium">Cost per User</p>
                    <p className="text-lg font-bold text-purple-900">₹{formData.pointsPerAction || '0'}</p>
                  </div>
                  <div>
                    <p className="text-purple-600 font-medium">Projected Cost</p>
                    <p className="text-lg font-bold text-purple-900">₹{(parseFloat(formData.pointsPerAction || '0') * parseFloat(formData.expectedParticipants || '0')).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-purple-600 font-medium">Budget Utilization</p>
                    <p className="text-lg font-bold text-purple-900">{formData.totalBudget ? Math.round(((parseFloat(formData.pointsPerAction || '0') * parseFloat(formData.expectedParticipants || '0')) / parseFloat(formData.totalBudget)) * 100) : 0}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Channels & Settings */}
        {currentStep === 5 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Communication Channels & Settings
              </CardTitle>
              <CardDescription>
                Select communication channels and configure advanced settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Communication Channels</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="email"
                      checked={formData.channels.email}
                      onCheckedChange={(checked) => handleChannelChange('email', checked)}
                    />
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sms"
                      checked={formData.channels.sms}
                      onCheckedChange={(checked) => handleChannelChange('sms', checked)}
                    />
                    <Label htmlFor="sms" className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      SMS
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pushNotification"
                      checked={formData.channels.pushNotification}
                      onCheckedChange={(checked) => handleChannelChange('pushNotification', checked)}
                    />
                    <Label htmlFor="pushNotification" className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      Push Notifications
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="inApp"
                      checked={formData.channels.inApp}
                      onCheckedChange={(checked) => handleChannelChange('inApp', checked)}
                    />
                    <Label htmlFor="inApp" className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      In-App
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="whatsapp"
                      checked={formData.channels.whatsapp}
                      onCheckedChange={(checked) => handleChannelChange('whatsapp', checked)}
                    />
                    <Label htmlFor="whatsapp" className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      WhatsApp
                    </Label>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Advanced Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require Approval</Label>
                      <p className="text-sm text-muted-foreground">Campaign requires manual approval before launch</p>
                    </div>
                    <Switch
                      checked={formData.requireApproval}
                      onCheckedChange={(checked) => handleInputChange('requireApproval', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Tracking</Label>
                      <p className="text-sm text-muted-foreground">Track campaign performance and analytics</p>
                    </div>
                    <Switch
                      checked={formData.enableTracking}
                      onCheckedChange={(checked) => handleInputChange('enableTracking', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow Opt-out</Label>
                      <p className="text-sm text-muted-foreground">Allow users to opt-out of the campaign</p>
                    </div>
                    <Switch
                      checked={formData.allowOptOut}
                      onCheckedChange={(checked) => handleInputChange('allowOptOut', checked)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Terms & Conditions</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="termsConditions">Terms & Conditions</Label>
                    <Textarea
                      id="termsConditions"
                      value={formData.termsConditions}
                      onChange={(e) => handleInputChange('termsConditions', e.target.value)}
                      placeholder="Enter campaign terms and conditions"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eligibilityCriteria">Eligibility Criteria</Label>
                    <Textarea
                      id="eligibilityCriteria"
                      value={formData.eligibilityCriteria}
                      onChange={(e) => handleInputChange('eligibilityCriteria', e.target.value)}
                      placeholder="Define who is eligible for this campaign"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <div className="flex gap-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i + 1 <= currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {currentStep < totalSteps ? (
          <Button onClick={handleNext}>
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSave}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        )}
      </div>
    </div>
  );
}