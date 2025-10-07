import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function PersonalInfoForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your personal details and contact information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>First Name</Label>
            <Input defaultValue="Priya" />
          </div>
          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input defaultValue="Sharma" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Email Address</Label>
          <Input type="email" defaultValue="priya.sharma@bankofmumbai.in" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input defaultValue="+91 98765 43210" />
          </div>
          <div className="space-y-2">
            <Label>Department</Label>
            <Select defaultValue="digital-banking-solutions">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="digital-banking-solutions">Digital Banking Solutions</SelectItem>
                <SelectItem value="risk-management">Risk Management</SelectItem>
                <SelectItem value="customer-service">Customer Service</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="compliance">Compliance & Regulatory</SelectItem>
                <SelectItem value="treasury">Treasury & Capital Markets</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Office Location</Label>
          <Select defaultValue="mumbai">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mumbai">Mumbai, Maharashtra</SelectItem>
              <SelectItem value="delhi">New Delhi, Delhi</SelectItem>
              <SelectItem value="bangalore">Bangalore, Karnataka</SelectItem>
              <SelectItem value="hyderabad">Hyderabad, Telangana</SelectItem>
              <SelectItem value="chennai">Chennai, Tamil Nadu</SelectItem>
              <SelectItem value="pune">Pune, Maharashtra</SelectItem>
              <SelectItem value="kolkata">Kolkata, West Bengal</SelectItem>
              <SelectItem value="ahmedabad">Ahmedabad, Gujarat</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Employee ID</Label>
          <Input defaultValue="BOM2022015" disabled />
        </div>

        <div className="flex justify-end pt-4">
          <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}