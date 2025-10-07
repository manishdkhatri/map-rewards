import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Camera, Mail, Phone, MapPin } from "lucide-react";
import { FormData } from "../../utils/profileValidation";

interface ProfileEditSidebarProps {
  formData: FormData;
  onUploadAvatar: () => void;
}

export function ProfileEditSidebar({ formData, onUploadAvatar }: ProfileEditSidebarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Photo</CardTitle>
        <CardDescription>Update your profile picture</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="text-xl">
                {formData.firstName[0]}{formData.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <Button 
              size="sm" 
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
              onClick={onUploadAvatar}
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-center">
            <p className="font-medium">{formData.firstName} {formData.lastName}</p>
            <p className="text-sm text-muted-foreground">{formData.designation}</p>
            <Badge variant="secondary" className="mt-1">{formData.department}</Badge>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{formData.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{formData.phone || 'Not provided'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{formData.location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}