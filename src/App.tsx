import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { Dashboard } from "./components/Dashboard";
import { ProductCreate } from "./components/ProductCreate";
import { ReportsAnalytics } from "./components/ReportsAnalytics";
import { EStoreManagement } from "./components/EStoreManagement";
import { OrderManagement } from "./components/OrderManagement";
import { UserProfile } from "./components/UserProfile";
import { ProfileEdit } from "./components/ProfileEdit";
import { SystemSettings } from "./components/SystemSettings";
import { Notifications } from "./components/Notifications";
import { Login } from "./components/Login";
import { EmailOTPVerification } from "./components/EmailOTPVerification";
import { NewPasswordSetup } from "./components/NewPasswordSetup";

import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { CurrencyProvider } from "./hooks/useCurrency";
import { ThemeProvider } from "./hooks/useTheme";
import { Breadcrumb } from "./components/ui/breadcrumb";
import { Separator } from "./components/ui/separator";
import { getSectionTitle, getBreadcrumbs } from "./utils/navigation";
import { createNavigationHandlers } from "./utils/handlers";

type AuthStep = 'login' | 'email-otp' | 'new-password' | 'authenticated';

export default function App() {
  const [authStep, setAuthStep] = useState<AuthStep>('login');
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [userRole] = useState("admin");
  const [userProfile, setUserProfile] = useState(null);
  const [merchantData, setMerchantData] = useState(null);
  const [tempUserData, setTempUserData] = useState<{
    email: string;
    name: string;
  } | null>(null);

  const handlers = createNavigationHandlers(
    setActiveSection,
    setSelectedProduct,
    setProducts,
    setUserProfile
  );

  const handleTempLogin = (email: string, password: string) => {
    // Simulate temporary login - in real app, validate against API
    const tempUser = {
      email: email,
      name: email.split('@')[0] // Extract name from email for demo
    };
    
    setTempUserData(tempUser);
    setAuthStep('email-otp');
  };

  const handleEmailVerification = () => {
    setAuthStep('new-password');
  };

  const handlePasswordSetup = () => {
    // After password setup, redirect to login
    setAuthStep('login');
    setTempUserData(null);
  };

  const handleFinalLogin = () => {
    // Set merchant data with login information
    const loginTime = new Date();
    const merchantInfo = {
      name: "TechVibe Electronics",
      ownerName: "Priya Sharma",
      role: "Store Administrator",
      lastLogin: loginTime.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      email: "admin@merchant.com"
    };
    
    setMerchantData(merchantInfo);
    setAuthStep('authenticated');
  };

  const handleLogout = () => {
    setAuthStep('login');
    setActiveSection("dashboard");
    setSelectedProduct(null);
    setUserProfile(null);
    setMerchantData(null);
    setTempUserData(null);
  };

  const handleBackToLogin = () => {
    setAuthStep('login');
    setTempUserData(null);
  };

  // Show authentication flow if not authenticated
  if (authStep !== 'authenticated') {
    return (
      <ThemeProvider>
        <TooltipProvider>
          {authStep === 'login' && (
            <Login onLogin={handleFinalLogin} onTempLogin={handleTempLogin} />
          )}
          {authStep === 'email-otp' && tempUserData && (
            <EmailOTPVerification 
              onVerifySuccess={handleEmailVerification}
              onBack={handleBackToLogin}
              userEmail={tempUserData.email}
            />
          )}
          {authStep === 'new-password' && tempUserData && (
            <NewPasswordSetup 
              onPasswordSetSuccess={handlePasswordSetup}
              onBack={() => setAuthStep('email-otp')}
              userName={tempUserData.name}
            />
          )}
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    );
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard 
          onAddProduct={handlers.handleAddProduct}
          onViewReports={() => setActiveSection("reports")}
          onViewInventory={() => setActiveSection("estore")}
          onViewOrders={() => setActiveSection("orders")}
        />;
      case "reports":
        return <ReportsAnalytics />;
      case "estore":
        return <EStoreManagement 
          onAddProduct={handlers.handleAddProduct} 
          products={products}
          onViewProduct={handlers.handleViewProduct}
          onEditProduct={handlers.handleEditProduct} 
          onDeleteProduct={handlers.handleDeleteProduct}
          selectedProduct={selectedProduct}
          onCloseProductView={() => setSelectedProduct(null)}
        />;
      case "orders":
        return <OrderManagement />;
      case "product-create":
        return <ProductCreate onBack={handlers.handleBackToEStore} onSave={handlers.handleSaveProduct} />;
      case "product-edit":
        return <ProductCreate 
          onBack={handlers.handleBackToEStore} 
          onSave={handlers.handleUpdateProduct}
          initialData={selectedProduct}
          isEdit={true}
        />;
      case "profile":
        return <UserProfile onEditProfile={handlers.handleEditProfile} userProfile={userProfile} />;
      case "profile-edit":
        return <ProfileEdit onBack={handlers.handleBackToProfile} onSave={handlers.handleSaveProfile} />;
      case "settings":
        return <SystemSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <CurrencyProvider>
        <TooltipProvider>
          <SidebarProvider defaultOpen={true}>
            <AppSidebar 
              activeSection={activeSection} 
              setActiveSection={setActiveSection}
              userRole={userRole}
              onLogout={handleLogout}
              merchantData={merchantData}
            />
            <SidebarInset className="flex flex-col min-h-screen">
              {/* Responsive Header */}
              <header className="sticky top-0 z-10 flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b bg-background px-3 sm:px-4 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                
                {/* Responsive Breadcrumb */}
                <div className="flex-1 min-w-0">
                  <Breadcrumb>
                    {getBreadcrumbs(
                      activeSection, 
                      setActiveSection,
                      selectedProduct,
                      setSelectedProduct
                    )}
                  </Breadcrumb>
                </div>
                
                {/* Notifications - Hidden on very small screens */}
                <div className="flex-shrink-0">
                  <Notifications />
                </div>
              </header>

              {/* Full Width Background Container with Centered Content */}
              <main className="flex-1 overflow-auto w-full" style={{ backgroundColor: '#EDEDF1' }}>
                <div className="w-full">
                  <div className="container mx-auto max-w-none sm:max-w-full md:max-w-4xl lg:max-w-6xl xl:max-w-[120rem] px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
                    {renderActiveSection()}
                  </div>
                </div>
              </main>
            </SidebarInset>
            <Toaster />
          </SidebarProvider>
        </TooltipProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
}