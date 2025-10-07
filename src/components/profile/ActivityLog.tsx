import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

interface Activity {
  action: string;
  timestamp: string;
  ip: string;
  status: string;
}

interface ActivityLogProps {
  activities: Activity[];
}

export function ActivityLog({ activities }: ActivityLogProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your recent account activity and login history</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
              <div className="mt-1">
                {activity.status === "Success" ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium">{activity.action}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <span>{activity.timestamp}</span>
                  <span>IP: {activity.ip}</span>
                  <Badge 
                    variant={activity.status === "Success" ? "secondary" : "destructive"}
                    className="text-xs"
                  >
                    {activity.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}