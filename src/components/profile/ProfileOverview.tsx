import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Mail, Phone, MapPin, User, Shield } from "lucide-react";

interface ProfileOverviewProps {
  userInfo: {
    name: string;
    email: string;
    phone: string;
    role: string;
    department: string;
    location: string;
    joinDate: string;
    lastLogin: string;
    permissions: string[];
  };
}

export function ProfileOverview({ userInfo }: ProfileOverviewProps) {
  return (
    <Card className="lg:col-span-1">
      <CardHeader className="text-center">
        <Avatar className="h-24 w-24 mx-auto mb-4">
          <AvatarImage src="/placeholder-avatar.jpg" />
          <AvatarFallback className="text-xl">PS</AvatarFallback>
        </Avatar>
        <CardTitle>{userInfo.name}</CardTitle>
        <CardDescription>{userInfo.role}</CardDescription>
        <Badge variant="secondary" className="mx-auto">
          <Shield className="h-3 w-3 mr-1" />
          Administrator
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{userInfo.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{userInfo.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{userInfo.location}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{userInfo.department}</span>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Member Since:</span>
              <span>{userInfo.joinDate}</span>
            </div>
            <div className="flex justify-between">
              <span>Last Login:</span>
              <span>{userInfo.lastLogin}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Permissions</h4>
          <div className="space-y-1">
            {userInfo.permissions.map((permission, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {permission}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}