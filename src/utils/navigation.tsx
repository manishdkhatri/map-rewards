import { BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../components/ui/breadcrumb";

export const getSectionTitle = (activeSection: string, selectedProduct?: any) => {
  switch (activeSection) {
    case "dashboard":
      return "Dashboard";
    case "product-create":
      return "Add New Product";
    case "product-edit":
      return selectedProduct ? `Edit ${selectedProduct.name}` : "Edit Product";
    case "reports":
      return "Reports & Analytics";
    case "estore":
      return "E-Store Management";
    case "orders":
      return "Order Management";
    case "profile":
      return "User Profile";
    case "profile-edit":
      return "Edit Profile";
    case "settings":
      return "Settings";
    default:
      return "Dashboard";
  }
};

export const getBreadcrumbs = (
  activeSection: string, 
  setActiveSection: (section: string) => void,
  selectedProduct?: any,
  setSelectedProduct?: (product: any) => void
) => {
  switch (activeSection) {
    case "product-create":
      return (
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setActiveSection("estore");
              }}
            >
              E-Store Management
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Add Product</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      );
    case "product-edit":
      return (
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setActiveSection("estore");
                setSelectedProduct?.(null);
              }}
            >
              E-Store Management
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit {selectedProduct ? selectedProduct.name : "Product"}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      );
    case "profile-edit":
      return (
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setActiveSection("profile");
              }}
            >
              User Profile
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit Profile</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      );
    default:
      return (
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="#" onClick={(e) => e.preventDefault()}>
              Merchant Portal
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>{getSectionTitle(activeSection, selectedProduct)}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      );
  }
};