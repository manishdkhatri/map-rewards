import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { Eye, EyeOff, Key, Shield, Clock } from "lucide-react";

export function SecuritySettings() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Current Password</Label>
            <div className="relative">
              <Input 
                type={showPassword ? "text" : "password"}
                placeholder="Enter current password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>New Password</Label>
            <Input type="password" placeholder="Enter new password" />
          </div>

          <div className="space-y-2">
            <Label>Confirm New Password</Label>
            <Input type="password" placeholder="Confirm new password" />
          </div>

          <Button>Update Password</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Enhance your account security with 2FA</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="font-medium">SMS Authentication</span>
                <Badge variant="secondary">Enabled</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Receive verification codes via SMS
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Key className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Authenticator App</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Use Google Authenticator or similar apps
              </p>
            </div>
            <Switch />
          </div>

          <div className="pt-4 border-t">
            <Button variant="outline">
              <Key className="h-4 w-4 mr-2" />
              Setup Authenticator App
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Session Management</CardTitle>
          <CardDescription>Manage your active sessions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Current Session</p>
                <p className="text-sm text-muted-foreground">Chrome on Windows • 192.168.1.100</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Clock className="h-3 w-3" />
                  <span>Active now</span>
                </div>
              </div>
              <Badge variant="secondary">Current</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Mobile Session</p>
                <p className="text-sm text-muted-foreground">Safari on iOS • 192.168.1.105</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Clock className="h-3 w-3" />
                  <span>2 hours ago</span>
                </div>
              </div>
              <Button variant="outline" size="sm">Revoke</Button>
            </div>
          </div>

          <Button variant="destructive" className="w-full">
            Sign Out All Other Sessions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}