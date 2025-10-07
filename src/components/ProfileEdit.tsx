import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User, Shield, ArrowLeft, Save, Upload, X, Camera } from "lucide-react";
import { userInfo } from "./data/userProfileData";
import { toast } from "sonner@2.0.3";

interface ProfileEditProps {
  onBack?: () => void;
  onSave?: (data: any) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  employeeId: string;
  department: string;
  designation: string;
  location: string;
  bio: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const departmentOptions = [
  { value: "Marketing", label: "Marketing" },
  { value: "Sales", label: "Sales" },
  { value: "IT", label: "Information Technology" },
  { value: "HR", label: "Human Resources" },
  { value: "Finance", label: "Finance" },
  { value: "Operations", label: "Operations" }
];

const locationOptions = [
  { value: "New York", label: "New York" },
  { value: "London", label: "London" },
  { value: "Singapore", label: "Singapore" },
  { value: "Mumbai", label: "Mumbai" },
  { value: "Dubai", label: "Dubai" }
];

export function ProfileEdit({ onBack, onSave }: ProfileEditProps) {
  const [activeTab, setActiveTab] = useState("personal");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Initialize form data from user info
  const [formData, setFormData] = useState<FormData>({
    firstName: userInfo.name.split(' ')[0],
    lastName: userInfo.name.split(' ').slice(1).join(' '),
    email: userInfo.email,
    phone: userInfo.phone,
    employeeId: userInfo.employeeId,
    department: userInfo.department,
    designation: userInfo.designation,
    location: userInfo.location,
    bio: userInfo.bio || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Please fill in all required fields");
      return false;
    }

    if (formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        toast.error("Please enter your current password to change it");
        return false;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        toast.error("New passwords do not match");
        return false;
      }
      if (formData.newPassword.length < 8) {
        toast.error("New password must be at least 8 characters long");
        return false;
      }
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    let avatarUrl = userInfo.avatar;
    
    // Upload avatar if one was selected
    if (selectedFile) {
      try {
        avatarUrl = await uploadAvatarToServer(selectedFile);
        toast.success("Avatar uploaded successfully");
      } catch (error) {
        toast.error("Failed to upload avatar");
        setIsLoading(false);
        return;
      }
    }
    
    // Simulate API call for profile update
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const updatedUserInfo = {
      ...userInfo,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      department: formData.department,
      designation: formData.designation,
      location: formData.location,
      bio: formData.bio,
      avatar: avatarUrl
    };

    onSave?.(updatedUserInfo);
    setHasUnsavedChanges(false);
    setIsLoading(false);
    setAvatarPreview(null);
    setSelectedFile(null);
    toast.success("Profile updated successfully");
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      setShowUnsavedDialog(true);
    } else {
      onBack?.();
    }
  };

  const handleDiscardChanges = () => {
    setHasUnsavedChanges(false);
    setShowUnsavedDialog(false);
    onBack?.();
  };

  const handleUploadAvatar = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarPreview(e.target?.result as string);
      setSelectedFile(file);
      setHasUnsavedChanges(true);
    };
    reader.readAsDataURL(file);
  };

  const removeAvatar = () => {
    setAvatarPreview(null);
    setSelectedFile(null);
    setHasUnsavedChanges(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadAvatarToServer = async (file: File): Promise<string> => {
    setIsUploadingAvatar(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, you would upload to your server/cloud storage
    // For now, we'll return the preview URL
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = (e) => {
        setIsUploadingAvatar(false);
        resolve(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={handleCancel}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl">Edit Profile</h1>
            <p className="text-muted-foreground">
              Update your personal information and security settings
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {hasUnsavedChanges && (
            <span className="text-sm text-muted-foreground flex items-center">
              Unsaved changes
            </span>
          )}
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Picture Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Update your avatar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  <Avatar className="h-24 w-24">
                    <AvatarImage 
                      src={avatarPreview || userInfo.avatar} 
                      alt={userInfo.name} 
                    />
                    <AvatarFallback className="text-lg">
                      {formData.firstName[0]}{formData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Upload overlay */}
                  <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                       onClick={handleUploadAvatar}>
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                  
                  {/* Remove avatar button - only show if there's a preview */}
                  {avatarPreview && (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                      onClick={removeAvatar}
                      type="button"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleUploadAvatar}
                    disabled={isUploadingAvatar}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {isUploadingAvatar ? "Uploading..." : "Upload New"}
                  </Button>
                  
                  {avatarPreview && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={removeAvatar}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  )}
                </div>
                
                {/* File input - hidden */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                {/* Upload status */}
                {selectedFile && (
                  <div className="text-sm text-muted-foreground text-center">
                    <p>Selected: {selectedFile.name}</p>
                    <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    <p className="text-amber-600">Save changes to upload</p>
                  </div>
                )}
                
                {/* Upload guidelines */}
                <div className="text-xs text-muted-foreground text-center space-y-1">
                  <p>Recommended: Square image, at least 200x200px</p>
                  <p>Supported formats: JPG, PNG, GIF (max 5MB)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Edit Forms */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Personal Details</TabsTrigger>
              <TabsTrigger value="security">Change Password</TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>Update your basic information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="employeeId">Employee ID</Label>
                      <Input
                        id="employeeId"
                        value={formData.employeeId}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {departmentOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="designation">Designation</Label>
                      <Input
                        id="designation"
                        value={formData.designation}
                        onChange={(e) => handleInputChange('designation', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {locationOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell us about yourself..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Change Password
                  </CardTitle>
                  <CardDescription>Update your account password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                        placeholder="Enter your current password"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={(e) => handleInputChange('newPassword', e.target.value)}
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p>Password requirements:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>At least 8 characters long</li>
                      <li>Include both uppercase and lowercase letters</li>
                      <li>Include at least one number</li>
                      <li>Include at least one special character</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Unsaved Changes Dialog */}
      <AlertDialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to leave without saving?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowUnsavedDialog(false)}>
              Continue Editing
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDiscardChanges}>
              Discard Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}