import { Button } from "../ui/button";
import { Save, X, AlertTriangle } from "lucide-react";

interface ProfileEditHeaderProps {
  hasUnsavedChanges: boolean;
  isLoading: boolean;
  onCancel: () => void;
  onSave: () => void;
}

export function ProfileEditHeader({ hasUnsavedChanges, isLoading, onCancel, onSave }: ProfileEditHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Edit Profile</h1>
          <p className="text-muted-foreground">
            Update your personal information and preferences
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={onSave} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {hasUnsavedChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <p className="text-yellow-800">You have unsaved changes. Don't forget to save your updates.</p>
        </div>
      )}
    </>
  );
}