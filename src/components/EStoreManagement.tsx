import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Package,
  AlertTriangle,
  Tag,
  Filter,
  X,
  ShoppingCart,
  Clock,
  Calendar,
  Award,
  CheckCircle,
  Star
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface EStoreManagementProps {
  onAddProduct?: () => void;
  products?: any[];
  onViewProduct?: (product: any) => void;
  onEditProduct?: (product: any) => void;
  onDeleteProduct?: (productId: string) => void;
  selectedProduct?: any;
  onCloseProductView?: () => void;
}

export function EStoreManagement({ 
  onAddProduct, 
  products: newProducts = [],
  onViewProduct,
  onEditProduct,
  onDeleteProduct,
  selectedProduct,
  onCloseProductView
}: EStoreManagementProps) {

  // Filter states - removed rating
  const [productFilters, setProductFilters] = useState({
    categories: [],
    statuses: [],
    pointRange: { min: "", max: "" },
    stockRange: { min: "", max: "" }
  });

  const [isProductFilterOpen, setIsProductFilterOpen] = useState(false);

  const mockProducts = [
    {
      id: "PROD-001",
      name: "iPhone 15 Pro Max",
      category: "mobiles-accessories",
      pointsRequired: 12500,
      stock: 45,
      status: "Active",
      orders: 324,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      lastUpdated: "2024-12-28"
    },
    {
      id: "PROD-002",
      name: "MacBook Air M3",
      category: "computers-accessories",
      pointsRequired: 25000,
      stock: 23,
      status: "Active",
      orders: 156,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop",
      lastUpdated: "2024-12-27"
    },
    {
      id: "PROD-003",
      name: "Canon EOS R5",
      category: "cameras-photography",
      pointsRequired: 35000,
      stock: 8,
      status: "Low Stock",
      orders: 89,
      image: "https://images.unsplash.com/photo-1606983340079-59bd573863ba?w=200&h=200&fit=crop",
      lastUpdated: "2024-12-27"
    },
    {
      id: "PROD-004",
      name: "Sony WH-1000XM5",
      category: "home-audio",
      pointsRequired: 2500,
      stock: 67,
      status: "Active",
      orders: 445,
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&h=200&fit=crop",
      lastUpdated: "2024-12-26"
    },
    {
      id: "PROD-005",
      name: "Samsung 55\" QLED TV",
      category: "home-theater-tv",
      pointsRequired: 18000,
      stock: 12,
      status: "Active",
      orders: 234,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop",
      lastUpdated: "2024-12-26"
    },
    {
      id: "PROD-006",
      name: "Premium Wireless Headphones",
      category: "home-audio",
      pointsRequired: 15000,
      stock: 150,
      status: "Active",
      orders: 678,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      lastUpdated: "2024-12-25"
    },
    {
      id: "PROD-007",
      name: "Gaming Laptop Pro",
      category: "computers-accessories",
      pointsRequired: 45000,
      stock: 15,
      status: "Active",
      orders: 123,
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=200&h=200&fit=crop",
      lastUpdated: "2024-12-25"
    },
    {
      id: "PROD-008",
      name: "Smart Watch Series 9",
      category: "mobiles-accessories",
      pointsRequired: 8500,
      stock: 89,
      status: "Active",
      orders: 567,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&h=200&fit=crop",
      lastUpdated: "2024-12-24"
    }
  ];

  // Combine mock products with newly added products
  const allProducts = [...mockProducts, ...newProducts.map(product => ({
    id: product.id,
    name: product.name,
    category: product.category,
    pointsRequired: parseFloat(product.pointsPerPurchase) * 100 || 1000,
    stock: product.trackQuantity ? parseInt(product.quantity) || 0 : 999,
    status: product.status === 'active' ? 'Active' : product.status,
    orders: 0,
    image: product.images?.[0]?.url || "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=200&h=200&fit=crop"
  }))];

  // Filter products based on current filters - removed rating filter
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Category filter
      if (productFilters.categories.length > 0 && !productFilters.categories.includes(product.category)) {
        return false;
      }

      // Status filter
      if (productFilters.statuses.length > 0 && !productFilters.statuses.includes(product.status)) {
        return false;
      }

      // Point range filter
      if (productFilters.pointRange.min && product.pointsRequired < parseFloat(productFilters.pointRange.min)) {
        return false;
      }
      if (productFilters.pointRange.max && product.pointsRequired > parseFloat(productFilters.pointRange.max)) {
        return false;
      }

      // Stock range filter
      if (productFilters.stockRange.min && product.stock < parseFloat(productFilters.stockRange.min)) {
        return false;
      }
      if (productFilters.stockRange.max && product.stock > parseFloat(productFilters.stockRange.max)) {
        return false;
      }

      return true;
    });
  }, [allProducts, productFilters]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "default";
      case "Out of Stock":
        return "destructive";
      default:
        return "secondary";
    }
  };

  // Helper functions for filter management
  const handleProductCategoryFilter = (category, checked) => {
    setProductFilters(prev => ({
      ...prev,
      categories: checked 
        ? [...prev.categories, category]
        : prev.categories.filter(c => c !== category)
    }));
  };

  const handleProductStatusFilter = (status, checked) => {
    setProductFilters(prev => ({
      ...prev,
      statuses: checked 
        ? [...prev.statuses, status]
        : prev.statuses.filter(s => s !== status)
    }));
  };

  const clearProductFilters = () => {
    setProductFilters({
      categories: [],
      statuses: [],
      pointRange: { min: "", max: "" },
      stockRange: { min: "", max: "" }
    });
  };

  const hasActiveProductFilters = productFilters.categories.length > 0 || 
    productFilters.statuses.length > 0 || 
    productFilters.pointRange.min || productFilters.pointRange.max ||
    productFilters.stockRange.min || productFilters.stockRange.max;

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">E-Store Management</h1>
            <p className="text-muted-foreground">
              Manage products, points, and inventory
            </p>
          </div>
        </div>

        {/* Product Statistics - Dashboard Data Consistency */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-muted-foreground">In Stock</span>
              </div>
              <div className="text-xl font-semibold">1,089</div>
              <div className="text-xs text-muted-foreground">88.2% of products</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <span className="text-sm text-muted-foreground">Low Stock</span>
              </div>
              <div className="text-xl font-semibold">145</div>
              <div className="text-xs text-muted-foreground">11.8% of products</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm text-muted-foreground">Categories</span>
              </div>
              <div className="text-xl font-semibold">8</div>
              <div className="text-xs text-muted-foreground">Active categories</div>
            </CardContent>
          </Card>
        </div>

        {/* Product Management */}
        <div className="space-y-6">
          {/* Current Product Stats and Filters */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4">
              <Card className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{filteredProducts.length} Current Products</span>
                </div>
              </Card>
              <Card className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{filteredProducts.filter(p => p.status === 'Active').length} Active</span>
                </div>
              </Card>
              <Card className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">{filteredProducts.filter(p => p.stock < 50).length} Low Stock</span>
                </div>
              </Card>
            </div>
            <div className="flex gap-2">
              <Popover open={isProductFilterOpen} onOpenChange={setIsProductFilterOpen}>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={hasActiveProductFilters ? "border-primary bg-primary/5" : ""}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                    {hasActiveProductFilters && (
                      <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                        {[
                          ...productFilters.categories,
                          ...productFilters.statuses,
                          productFilters.pointRange.min && "points",
                          productFilters.stockRange.min && "stock"
                        ].filter(Boolean).length}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4>Filter Products</h4>
                      {hasActiveProductFilters && (
                        <Button variant="ghost" size="sm" onClick={clearProductFilters}>
                          <X className="h-4 w-4 mr-1" />
                          Clear
                        </Button>
                      )}
                    </div>

                    {/* Category Filter */}
                    <div className="space-y-2">
                      <Label className="text-sm">Category</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {["mobiles-accessories", "computers-accessories", "cameras-photography", "home-audio", "home-theater-tv"].map(category => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              id={`category-${category}`}
                              checked={productFilters.categories.includes(category)}
                              onCheckedChange={(checked) => handleProductCategoryFilter(category, checked)}
                            />
                            <Label htmlFor={`category-${category}`} className="text-sm capitalize">
                              {category.replace('-', ' ')}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Status Filter */}
                    <div className="space-y-2">
                      <Label className="text-sm">Status</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Active", "Low Stock", "Out of Stock"].map(status => (
                          <div key={status} className="flex items-center space-x-2">
                            <Checkbox
                              id={`status-${status}`}
                              checked={productFilters.statuses.includes(status)}
                              onCheckedChange={(checked) => handleProductStatusFilter(status, checked)}
                            />
                            <Label htmlFor={`status-${status}`} className="text-sm">
                              {status}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Point Range */}
                    <div className="space-y-2">
                      <Label className="text-sm">Point Range</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Min Points"
                          type="number"
                          value={productFilters.pointRange.min}
                          onChange={(e) => setProductFilters(prev => ({
                            ...prev,
                            pointRange: { ...prev.pointRange, min: e.target.value }
                          }))}
                        />
                        <Input
                          placeholder="Max Points"
                          type="number"
                          value={productFilters.pointRange.max}
                          onChange={(e) => setProductFilters(prev => ({
                            ...prev,
                            pointRange: { ...prev.pointRange, max: e.target.value }
                          }))}
                        />
                      </div>
                    </div>

                    {/* Stock Range */}
                    <div className="space-y-2">
                      <Label className="text-sm">Stock Level</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Min"
                          type="number"
                          value={productFilters.stockRange.min}
                          onChange={(e) => setProductFilters(prev => ({
                            ...prev,
                            stockRange: { ...prev.stockRange, min: e.target.value }
                          }))}
                        />
                        <Input
                          placeholder="Max"
                          type="number"
                          value={productFilters.stockRange.max}
                          onChange={(e) => setProductFilters(prev => ({
                            ...prev,
                            stockRange: { ...prev.stockRange, max: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Button onClick={onAddProduct}>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Product Inventory</CardTitle>
              <CardDescription>
                Manage products, points, and availability in your e-store
                {hasActiveProductFilters && (
                  <span className="text-primary"> • {filteredProducts.length} of {allProducts.length} products shown</span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Points Required</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                          <div>
                            <p>{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">{product.category.replace('-', ' ')}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4 text-muted-foreground" />
                          <span>{product.pointsRequired.toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={product.stock < 50 ? "text-orange-600" : ""}>{product.stock}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(product.status)}>
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <ShoppingCart className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{product.orders}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => onViewProduct?.(product)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => onEditProduct?.(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Product</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{product.name}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    onDeleteProduct?.(product.id);
                                    toast.success("Product deleted successfully");
                                  }}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredProducts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No products match the current filters.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product View Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && onCloseProductView?.()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <ImageWithFallback
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                  {selectedProduct.name}
                </DialogTitle>
                <DialogDescription>
                  Product ID: {selectedProduct.id} • Detailed product information and analytics
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Product Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Product Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm text-muted-foreground">Product Name</Label>
                            <p>{selectedProduct.name}</p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Product ID</Label>
                            <p className="font-mono text-sm">{selectedProduct.id}</p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Category</Label>
                            <Badge variant="outline" className="capitalize">
                              {selectedProduct.category.replace('-', ' ')}
                            </Badge>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Status</Label>
                            <Badge variant={getStatusColor(selectedProduct.status)}>
                              {selectedProduct.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Points & Redemption</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label className="text-sm text-muted-foreground">Points Required</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Award className="h-4 w-4 text-muted-foreground" />
                            <span className="text-lg">{selectedProduct.pointsRequired.toLocaleString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Product Image</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ImageWithFallback
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          className="w-full h-64 rounded-lg object-cover border"
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Inventory & Stock</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm text-muted-foreground">Current Stock</Label>
                            <p className={`text-2xl ${selectedProduct.stock < 50 ? "text-orange-600" : ""}`}>
                              {selectedProduct.stock}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm text-muted-foreground">Stock Status</Label>
                            <div className="mt-1">
                              {selectedProduct.stock > 100 ? (
                                <Badge className="bg-green-100 text-green-700">High Stock</Badge>
                              ) : selectedProduct.stock > 50 ? (
                                <Badge className="bg-yellow-100 text-yellow-700">Medium Stock</Badge>
                              ) : selectedProduct.stock > 0 ? (
                                <Badge className="bg-orange-100 text-orange-700">Low Stock</Badge>
                              ) : (
                                <Badge className="bg-red-100 text-red-700">Out of Stock</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Order Analytics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Order Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                          <Label className="text-sm text-muted-foreground">Total Orders</Label>
                        </div>
                        <p className="text-2xl">{selectedProduct.orders}</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Award className="h-5 w-5 text-muted-foreground" />
                          <Label className="text-sm text-muted-foreground">Points Redeemed</Label>
                        </div>
                        <p className="text-2xl">{(selectedProduct.orders * selectedProduct.pointsRequired).toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Additional Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm text-muted-foreground">Last Updated</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedProduct.lastUpdated || "Today, 3:45 PM"}</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Created</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>2 weeks ago</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}