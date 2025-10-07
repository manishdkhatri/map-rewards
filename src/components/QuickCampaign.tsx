import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { 
  ArrowLeft, 
  Zap, 
  Calendar as CalendarIcon,
  Target,
  Gift,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Rocket,
  Award,
  Settings,
  Info
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner@2.0.3";
import { useCurrency } from "../hooks/useCurrency";

interface QuickCampaignProps {
  onBack: () => void;
  onSave: (campaignData: any) => void;
}

export function QuickCampaign({ onBack, onSave }: QuickCampaignProps) {
  const { formatCurrency } = useCurrency();
  const [hasChanges, setHasChanges] = useState(false);
  
  // Simplified form data for quick campaign
  const [formData, setFormData] = useState({
    name: '',
    type: 'loyalty',
    objective: '',
    rewardType: 'points',
    rewardAmount: '100',
    targetAudience: 'all',
    startDate: new Date(),
    endDate: null,
    autoLaunch: true,
    description: ''
  });

  // Quick campaign templates
  const quickTemplates = [
    {
      id: 'welcome-bonus',
      name: 'Welcome Bonus',
      description: 'Reward new customers with instant points',
      type: 'acquisition',
      rewardType: 'points',
      rewardAmount: '500',
      objective: 'Welcome new customers with bonus points',
      icon: Gift,
      color: 'bg-green-500'
    },
    {
      id: 'referral-reward',
      name: 'Referral Reward',
      description: 'Incentivize customer referrals',
      type: 'referral',
      rewardType: 'cashback',
      rewardAmount: '50',
      objective: 'Encourage customers to refer friends',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      id: 'weekend-boost',
      name: 'Weekend Boost',
      description: '2x points for weekend transactions',
      type: 'engagement',
      rewardType: 'multiplier',
      rewardAmount: '2',
      objective: 'Boost weekend transaction activity',
      icon: Zap,
      color: 'bg-purple-500'
    },
    {
      id: 'milestone-celebration',
      name: 'Milestone Celebration',
      description: 'Celebrate customer milestones',
      type: 'retention',
      rewardType: 'points',
      rewardAmount: '1000',
      objective: 'Reward customers for reaching milestones',
      icon: Award,
      color: 'bg-yellow-500'
    }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleTemplateSelect = (template: any) => {
    setFormData(prev => ({
      ...prev,
      name: template.name,
      type: template.type,
      rewardType: template.rewardType,
      rewardAmount: template.rewardAmount,
      objective: template.objective,
      description: template.description
    }));
    setHasChanges(true);
    toast.success(`Applied ${template.name} template`);
  };

  const handleLaunchNow = () => {
    if (!formData.name || !formData.objective) {
      toast.error('Please fill in campaign name and objective');
      return;
    }

    const campaignData = {
      ...formData,
      id: `QC-${Date.now()}`,
      status: 'Active',
      createdAt: new Date().toISOString(),
      createdBy: 'Admin User',
      isQuickCampaign: true
    };

    onSave(campaignData);
    toast.success('Quick campaign launched successfully!');
  };

  const handleSaveDraft = () => {
    if (!formData.name || !formData.objective) {
      toast.error('Please fill in campaign name and objective');
      return;
    }

    const campaignData = {
      ...formData,
      id: `QC-${Date.now()}`,
      status: 'Draft',
      createdAt: new Date().toISOString(),
      createdBy: 'Admin User',
      isQuickCampaign: true
    };

    onSave(campaignData);
    toast.success('Quick campaign saved as draft!');
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

  const getEndDateSuggestion = () => {
    if (formData.startDate) {
      const endDate = new Date(formData.startDate);
      endDate.setDate(endDate.getDate() + 30); // 30 days from start
      return endDate;
    }
    return null;
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
            Back to Dashboard
          </Button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-6 w-6 text-yellow-500" />
              <h1 className="text-3xl font-medium">Quick Campaign</h1>
            </div>
            <p className="text-muted-foreground">
              Launch a campaign in minutes with pre-configured templates
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSaveDraft} disabled={!hasChanges}>
            Save as Draft
          </Button>
          <Button onClick={handleLaunchNow} disabled={!hasChanges} className="bg-green-600 hover:bg-green-700">
            <Rocket className="h-4 w-4 mr-2" />
            Launch Now
          </Button>
        </div>
      </div>

      {/* Changes Indicator */}
      {hasChanges && (
        <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <span className="text-sm text-yellow-800">You have unsaved changes</span>
        </div>
      )}

      {/* Quick Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Quick Start Templates
          </CardTitle>
          <CardDescription>
            Choose a pre-configured template to get started quickly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickTemplates.map((template) => {
              const IconComponent = template.icon;
              return (
                <Card 
                  key={template.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primary/20"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${template.color} text-white`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="text-sm font-medium">{template.name}</div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{template.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {template.rewardType}
                      </Badge>
                      <span className="text-xs font-medium text-primary">
                        {template.rewardType === 'multiplier' ? `${template.rewardAmount}x` : `${template.rewardAmount} pts`}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Campaign Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Campaign Details
              </CardTitle>
              <CardDescription>
                Essential information for your campaign
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <Label htmlFor="objective">Campaign Objective *</Label>
                <Textarea
                  id="objective"
                  value={formData.objective}
                  onChange={(e) => handleInputChange('objective', e.target.value)}
                  placeholder="What do you want to achieve with this campaign?"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Campaign Type</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
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
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Select value={formData.targetAudience} onValueChange={(value) => handleInputChange('targetAudience', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Customers</SelectItem>
                      <SelectItem value="new">New Customers</SelectItem>
                      <SelectItem value="existing">Existing Customers</SelectItem>
                      <SelectItem value="premium">Premium Customers</SelectItem>
                      <SelectItem value="inactive">Inactive Customers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description of the campaign"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Schedule & Timing
              </CardTitle>
              <CardDescription>
                When should your campaign run?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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

              {!formData.endDate && getEndDateSuggestion() && (
                <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Info className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-800">
                    Suggested end date: {format(getEndDateSuggestion()!, "PPP")}
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="ml-auto"
                    onClick={() => handleInputChange('endDate', getEndDateSuggestion())}
                  >
                    Use Suggestion
                  </Button>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="autoLaunch"
                  checked={formData.autoLaunch}
                  onCheckedChange={(checked) => handleInputChange('autoLaunch', checked)}
                />
                <Label htmlFor="autoLaunch">Auto-launch at start date</Label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rewards Configuration */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Reward Setup
              </CardTitle>
              <CardDescription>
                Configure rewards and incentives
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rewardType">Reward Type</Label>
                <Select value={formData.rewardType} onValueChange={(value) => handleInputChange('rewardType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reward" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="points">Loyalty Points</SelectItem>
                    <SelectItem value="cashback">Cashback</SelectItem>
                    <SelectItem value="discount">Discount</SelectItem>
                    <SelectItem value="multiplier">Points Multiplier</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rewardAmount">
                  {formData.rewardType === 'multiplier' ? 'Multiplier' : 
                   formData.rewardType === 'discount' ? 'Discount %' : 
                   formData.rewardType === 'cashback' ? 'Cashback Amount' : 'Points Amount'}
                </Label>
                <Input
                  id="rewardAmount"
                  type="number"
                  value={formData.rewardAmount}
                  onChange={(e) => handleInputChange('rewardAmount', e.target.value)}
                  placeholder={formData.rewardType === 'multiplier' ? '2.0' : '100'}
                />
              </div>

              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="flex items-center gap-2 font-medium text-green-900 mb-2">
                  <CheckCircle className="h-4 w-4" />
                  Reward Preview
                </h4>
                <p className="text-sm text-green-800">
                  Customers will receive: 
                  {formData.rewardType === 'points' && ` ${formData.rewardAmount} loyalty points`}
                  {formData.rewardType === 'cashback' && ` ${formatCurrency(parseFloat(formData.rewardAmount || '0'))} cashback`}
                  {formData.rewardType === 'discount' && ` ${formData.rewardAmount}% discount`}
                  {formData.rewardType === 'multiplier' && ` ${formData.rewardAmount}x points multiplier`}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Target Customers</span>
                  <span className="font-medium">
                    {formData.targetAudience === 'all' ? '24,567' :
                     formData.targetAudience === 'new' ? '3,245' :
                     formData.targetAudience === 'existing' ? '21,322' :
                     formData.targetAudience === 'premium' ? '4,567' :
                     formData.targetAudience === 'inactive' ? '2,890' : 'N/A'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Expected Participation</span>
                  <span className="font-medium">~45%</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Campaign Duration</span>
                  <span className="font-medium">
                    {formData.startDate && formData.endDate ? 
                      `${Math.ceil((formData.endDate.getTime() - formData.startDate.getTime()) / (1000 * 60 * 60 * 24))} days` : 
                      '30 days (suggested)'}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Est. Budget Impact</span>
                  <span className="font-medium text-primary">
                    {formatCurrency(parseFloat(formData.rewardAmount || '0') * 11000)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-900">Ready to Launch?</span>
              </div>
              <p className="text-sm text-green-800 mb-3">
                Your quick campaign is configured and ready to go live. Click "Launch Now" to start immediately.
              </p>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleLaunchNow} disabled={!hasChanges} className="bg-green-600 hover:bg-green-700 flex-1">
                  <Rocket className="h-3 w-3 mr-1" />
                  Launch Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}