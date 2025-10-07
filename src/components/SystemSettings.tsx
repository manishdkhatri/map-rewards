import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { 
  Settings,
  Globe,
  Clock
} from "lucide-react";
import { toast } from "sonner@2.0.3";

export function SystemSettings() {
  const [settings, setSettings] = useState({
    applicationName: "Merchant Portal",
    companyName: "Your Company",
    supportEmail: "support@yourcompany.com",
    sessionTimeout: "30",
    maxLoginAttempts: "5"
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          
          <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage application preferences and system configuration
          </p>
        </div>
        <Button onClick={handleSaveSettings}>
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Application Settings
            </CardTitle>
            <CardDescription>
              Configure basic application information and behavior
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="app-name">Application Name</Label>
              <Input
                id="app-name"
                value={settings.applicationName}
                onChange={(e) => handleSettingChange("applicationName", e.target.value)}
                placeholder="Enter application name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                value={settings.companyName}
                onChange={(e) => handleSettingChange("companyName", e.target.value)}
                placeholder="Enter company name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="support-email">Support Email</Label>
              <Input
                id="support-email"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => handleSettingChange("supportEmail", e.target.value)}
                placeholder="support@yourcompany.com"
              />
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Select
                  value={settings.sessionTimeout}
                  onValueChange={(value) => handleSettingChange("sessionTimeout", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-attempts">Max Login Attempts</Label>
                <Select
                  value={settings.maxLoginAttempts}
                  onValueChange={(value) => handleSettingChange("maxLoginAttempts", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 attempts</SelectItem>
                    <SelectItem value="5">5 attempts</SelectItem>
                    <SelectItem value="10">10 attempts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              System Information
            </CardTitle>
            <CardDescription>
              Current system information and version details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Label>Last Updated</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <Label>Version</Label>
                </div>
                <p className="text-sm text-muted-foreground">v1.0.0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}