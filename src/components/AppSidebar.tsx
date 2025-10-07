import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "./ui/sidebar";
import {
  LayoutDashboard,
  BarChart3,
  Store,
  ClipboardList,
  User,
  Settings,
  CreditCard,
  Shield,
  Bell,
  LogOut,
  Clock,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { toast } from "sonner@2.0.3";

interface AppSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  userRole: string;
  onLogout: () => void;
  merchantData?: {
    name: string;
    ownerName: string;
    role: string;
    lastLogin: string;
    email: string;
  } | null;
}

export function AppSidebar({ activeSection, setActiveSection, userRole, onLogout, merchantData }: AppSidebarProps) {
  const { setOpenMobile } = useSidebar();

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      key: "dashboard",
      badge: null,
    },
    {
      title: "Reports & Analytics",
      icon: BarChart3,
      key: "reports",
      badge: null,
    },
    {
      title: "E-Store Management",
      icon: Store,
      key: "estore",
      badge: null,
    },
    {
      title: "Order Management",
      icon: ClipboardList,
      key: "orders",
      badge: null,
    },
    {
      title: "Settings",
      icon: Settings,
      key: "settings",
      badge: null,
    },
  ];

  const bottomMenuItems = [
    {
      title: "Profile",
      icon: User,
      key: "profile",
    },
    {
      title: "Logout",
      icon: LogOut,
      key: "logout",
    },
  ];

  const handleLogout = () => {
    // Show confirmation toast
    toast.success("Logged out successfully", {
      description: "You have been logged out of the Merchant Portal.",
    });
    
    // Call the logout handler from parent component
    setTimeout(() => {
      onLogout();
    }, 1000); // Small delay to show the toast
  };

  const handleNavigation = (key: string) => {
    if (key === "logout") {
      handleLogout();
      return;
    }
    
    setActiveSection(key);
    // Close mobile sidebar when navigating
    setOpenMobile(false);
  };

  // Generate initials from merchant owner name
  const getInitials = (name: string) => {
    return name.split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <div className="flex h-10 w-10 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 items-center justify-center rounded-lg bg-primary">
            <CreditCard className="h-6 w-6 group-data-[collapsible=icon]:h-4 group-data-[collapsible=icon]:w-4 text-primary-foreground" />
          </div>
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <h1 className="text-lg text-foreground font-medium truncate">
              {merchantData?.name || "Merchant Portal"}
            </h1>
            <p className="text-sm text-muted-foreground truncate">E-Commerce Platform</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2 group-data-[collapsible=icon]:hidden">
          {userRole === "admin" && (
            <Badge variant="secondary" className="w-fit">
              <Shield className="h-3 w-3 mr-1" />
              Admin Access
            </Badge>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.key} className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
              <SidebarMenuButton
                onClick={() => handleNavigation(item.key)}
                isActive={activeSection === item.key}
                className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-auto"
                tooltip={item.title}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{item.title}</span>
                {item.badge && (
                  <Badge 
                    variant={item.badge === "New" ? "default" : "secondary"} 
                    className="ml-auto text-xs flex-shrink-0"
                  >
                    {item.badge}
                  </Badge>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        {/* Merchant Profile Section */}
        <div className="mb-4 group-data-[collapsible=icon]:mb-2">
          <button 
            onClick={() => handleNavigation("profile")}
            className="flex items-center gap-3 rounded-md hover:bg-sidebar-accent transition-colors w-full p-2 -m-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-1 group-data-[collapsible=icon]:-m-1"
          >
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback>
                {merchantData ? getInitials(merchantData.ownerName) : "PS"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden text-left">
              <p className="text-sm truncate">
                {merchantData?.ownerName || "Priya Sharma"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {merchantData?.role || "Store Administrator"}
              </p>
            </div>
          </button>
          
          {/* Last Login Information */}
          {merchantData?.lastLogin && (
            <div className="flex items-center gap-2 mt-2 px-2 group-data-[collapsible=icon]:hidden">
              <Clock className="h-3 w-3 text-muted-foreground flex-shrink-0" />
              <p className="text-xs text-muted-foreground truncate">
                Last login: {merchantData.lastLogin}
              </p>
            </div>
          )}
        </div>
        
        <SidebarMenu>
          {bottomMenuItems.map((item) => (
            <SidebarMenuItem key={item.key} className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
              <SidebarMenuButton
                onClick={() => handleNavigation(item.key)}
                isActive={activeSection === item.key}
                className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-auto"
                tooltip={item.title}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}