export const createNavigationHandlers = (
  setActiveSection: (section: string) => void,
  setSelectedProduct: (product: any) => void,
  setProducts: (products: any) => void,
  setUserProfile?: (profile: any) => void
) => {
  return {
    // Product handlers
    handleAddProduct: () => {
      setActiveSection("product-create");
    },

    handleSaveProduct: (productData: any) => {
      console.log("Saving product:", productData);
      setProducts((prev: any) => [...prev, productData]);
      setActiveSection("estore");
    },

    handleBackToEStore: () => {
      setActiveSection("estore");
      setSelectedProduct(null);
    },

    handleViewProduct: (product: any) => {
      setSelectedProduct(product);
    },

    handleEditProduct: (product: any) => {
      setSelectedProduct(product);
      setActiveSection("product-edit");
    },

    handleUpdateProduct: (updatedProduct: any) => {
      setProducts((prev: any) => prev.map((product: any) => 
        product.id === updatedProduct.id ? updatedProduct : product
      ));
      setActiveSection("estore");
      setSelectedProduct(null);
    },

    handleDeleteProduct: (productId: string) => {
      setProducts((prev: any) => prev.filter((product: any) => product.id !== productId));
    },

    // Profile handlers
    handleEditProfile: () => {
      setActiveSection("profile-edit");
    },

    handleBackToProfile: () => {
      setActiveSection("profile");
    },

    handleSaveProfile: (updatedProfile: any) => {
      console.log("Saving profile:", updatedProfile);
      setUserProfile?.(updatedProfile);
      setActiveSection("profile");
    }
  };
};