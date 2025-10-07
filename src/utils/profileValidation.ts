import { toast } from "sonner@2.0.3";

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  employeeId: string;
  department: string;
  designation: string;
  joiningDate: string;
  reportingManager: string;
  location: string;
  timeZone: string;
  bio: string;
  alternateEmail: string;
  emergencyContact: string;
  emergencyPhone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  twoFactorEnabled: boolean;
  emailNotifications: boolean;
  systemAlerts: boolean;
  campaignUpdates: boolean;
  securityAlerts: boolean;
  weeklyReports: boolean;
  monthlyDigest: boolean;
  language: string;
  currency: string;
  dateFormat: string;
  profileVisibility: string;
  showOnlineStatus: boolean;
}

export const validateForm = (formData: FormData): boolean => {
  // Validate required fields
  if (!formData.firstName || !formData.lastName || !formData.email) {
    toast.error("Please fill in all required fields");
    return false;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    toast.error("Please enter a valid email address");
    return false;
  }

  // Validate alternate email if provided
  if (formData.alternateEmail && !emailRegex.test(formData.alternateEmail)) {
    toast.error("Please enter a valid alternate email address");
    return false;
  }

  // Validate password if changing
  if (formData.newPassword) {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match");
      return false;
    }
    if (formData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }
    if (!formData.currentPassword) {
      toast.error("Current password is required to change password");
      return false;
    }
  }

  return true;
};

export const getInitialFormData = (userInfo: any): FormData => {
  return {
    firstName: userInfo.name.split(' ')[0] || '',
    lastName: userInfo.name.split(' ')[1] || '',
    email: userInfo.email || '',
    phone: userInfo.phone || '',
    employeeId: userInfo.employeeId || '',
    department: userInfo.department || '',
    designation: userInfo.designation || '',
    joiningDate: userInfo.joiningDate || '',
    reportingManager: userInfo.reportingManager || '',
    location: userInfo.location || '',
    timeZone: userInfo.timeZone || '',
    bio: userInfo.bio || '',
    alternateEmail: '',
    emergencyContact: '',
    emergencyPhone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
    emailNotifications: true,
    systemAlerts: true,
    campaignUpdates: false,
    securityAlerts: true,
    weeklyReports: true,
    monthlyDigest: false,
    language: 'English',
    currency: 'INR',
    dateFormat: 'DD/MM/YYYY',
    profileVisibility: 'Organization',
    showOnlineStatus: true
  };
};