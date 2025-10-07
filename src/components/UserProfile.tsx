import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Settings, Mail, Phone, MapPin, Calendar, User2, Lock } from "lucide-react";
import { userInfo } from "./data/userProfileData";

interface UserProfileProps {
  onEditProfile?: () => void;
  userProfile?: any;
}

export function UserProfile({ onEditProfile, userProfile }: UserProfileProps) {
  // Use updated profile data if available, otherwise fallback to default userInfo
  const currentUserInfo = userProfile || userInfo;
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          
          <h1 className="text-3xl font-semibold tracking-tight">User Profile</h1>
          <p className="text-muted-foreground">
            View and manage your account information
          </p>
        </div>
        <Button onClick={onEditProfile}>
          <Settings className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={currentUserInfo.avatar} alt={currentUserInfo.name} />
                <AvatarFallback className="text-lg">
                  {currentUserInfo.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h3 className="font-semibold text-lg">{currentUserInfo.name}</h3>
                <p className="text-muted-foreground">{currentUserInfo.designation}</p>
                <Badge variant="secondary" className="mt-1">
                  {currentUserInfo.department}
                </Badge>
              </div>

              <div className="w-full pt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <User2 className="h-4 w-4 text-muted-foreground" />
                  <span>ID: {currentUserInfo.employeeId}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {currentUserInfo.joiningDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{currentUserInfo.location}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User2 className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>Your personal and professional details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Full Name</label>
                  <p className="font-medium">{currentUserInfo.name}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Employee ID</label>
                  <p className="font-medium">{currentUserInfo.employeeId}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Department</label>
                  <p className="font-medium">{currentUserInfo.department}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Role</label>
                  <p className="font-medium">{currentUserInfo.designation}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Location</label>
                  <p className="font-medium">{currentUserInfo.location}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Joining Date</label>
                  <p className="font-medium">{currentUserInfo.joiningDate}</p>
                </div>
              </div>

              {currentUserInfo.bio && (
                <>
                  
                  
                </>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
              <CardDescription>How to reach you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Email Address</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{currentUserInfo.email}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Phone Number</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{currentUserInfo.phone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Security
              </CardTitle>
              <CardDescription>Account security information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Password</p>
                  <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                </div>
                <Button variant="outline" size="sm" onClick={onEditProfile}>
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}