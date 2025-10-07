import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { Progress } from "./ui/progress";
import { 
  ArrowLeft, 
  ArrowRight,
  Save, 
  Package,
  Tag,
  Award,
  Image,
  Truck,
  Globe,
  Settings,
  Upload,
  X,
  Plus,
  AlertCircle,
  CheckCircle,
  Eye,
  Star,
  Zap,
  Shield,
  Info,
  Check
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useCurrency } from "../hooks/useCurrency";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCreateProps {
  onBack: () => void;
  onSave: (productData: any) => void;
  initialData?: any;
  isEdit?: boolean;
}

export function ProductCreate({ onBack, onSave, initialData, isEdit = false }: ProductCreateProps) {
  const { formatCurrency, currentCurrency } = useCurrency();
  const [currentStep, setCurrentStep] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState({
    // Basic Information
    name: initialData?.name || '',
    description: initialData?.description || '',
    shortDescription: initialData?.shortDescription || '',
    category: initialData?.category || 'electronics',
    subcategory: initialData?.subcategory || '',
    brand: initialData?.brand || '',
    
    // Points & Inventory
    pointPrice: initialData?.pointPrice || '',
    trackQuantity: initialData?.trackQuantity !== undefined ? initialData.trackQuantity : true,
    quantity: initialData?.quantity || '',
    lowStockThreshold: initialData?.lowStockThreshold || '10',
    allowBackorders: initialData?.allowBackorders || false,
    
    // Product Images
    images: initialData?.images || [],
    featuredImage: initialData?.featuredImage || '',
    
    // SEO & Marketing
    seoTitle: initialData?.seoTitle || '',
    seoDescription: initialData?.seoDescription || '',
    tags: initialData?.tags || [],
    newTag: '',

    
    // Advanced Settings
    status: initialData?.status || 'draft',
    visibility: initialData?.visibility || 'public',
    featured: initialData?.featured || false,
    allowReviews: initialData?.allowReviews !== undefined ? initialData.allowReviews : true,
    taxable: initialData?.taxable !== undefined ? initialData.taxable : true,
    taxClass: initialData?.taxClass || 'standard',
    weight: initialData?.weight || '',
    dimensions: {
      length: initialData?.dimensions?.length || '',
      width: initialData?.dimensions?.width || '',
      height: initialData?.dimensions?.height || ''
    },
    requiresShipping: initialData?.requiresShipping !== undefined ? initialData.requiresShipping : true,
    shippingClass: initialData?.shippingClass || 'standard'
  });

  const steps = [
    {
      id: 'basic',
      title: 'Basic Information',
      description: 'Product name, description, and category',
      icon: Package,
      required: ['name', 'category', 'subcategory']
    },
    {
      id: 'points',
      title: 'Points & Inventory',
      description: 'Set points required and manage stock levels',
      icon: Award,
      required: ['pointPrice']
    },
    {
      id: 'media',
      title: 'Media & Details',
      description: 'Upload images and add marketing details',
      icon: Image,
      required: []
    },
    {
      id: 'review',
      title: 'Review & Submit',
      description: 'Review your product and publish',
      icon: CheckCircle,
      required: []
    }
  ];

  const electronicsSubcategories = [
    'Smartphones & Accessories',
    'Laptops & Computers',
    'Audio & Headphones',
    'Cameras & Photography',
    'Gaming & Consoles',
    'Tablets & E-readers',
    'Smart Home & IoT',
    'Wearable Technology',
    'TV & Home Entertainment',
    'Computer Components',
    'Network & Connectivity',
    'Portable Electronics',
    'Power & Charging',
    'Electronic Accessories'
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    setHasChanges(true);
  };

  const handleAddTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: ''
      }));
      setHasChanges(true);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
    setHasChanges(true);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newImages = files.map(file => ({
      id: `img-${Date.now()}-${Math.random()}`,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size
    }));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages],
      featuredImage: prev.featuredImage || newImages[0]?.id || ''
    }));
    setHasChanges(true);
    toast.success(`${files.length} image(s) uploaded successfully`);
  };

  const handleRemoveImage = (imageId: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId),
      featuredImage: prev.featuredImage === imageId ? '' : prev.featuredImage
    }));
    setHasChanges(true);
  };



  const validateStep = (stepIndex: number) => {
    const step = steps[stepIndex];
    return step.required.every(field => formData[field] && formData[field].trim() !== '');
  };

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'upcoming';
  };

  const canProceedToNext = () => {
    return validateStep(currentStep);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1 && canProceedToNext()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = (status: 'draft' | 'active') => {
    // Validate required fields for all completed steps
    const requiredFields = steps.slice(0, currentStep + 1).flatMap(step => step.required);
    const missingFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    const productData = {
      ...formData,
      id: initialData?.id || `PROD-${Date.now()}`,
      status,
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: isEdit ? new Date().toISOString() : undefined,
      createdBy: initialData?.createdBy || 'Admin User',
      updatedBy: isEdit ? 'Admin User' : undefined,
      slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    };

    onSave(productData);
    toast.success(`Product ${isEdit ? 'updated' : (status === 'draft' ? 'saved as draft' : 'published')} successfully!`);
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
        onBack();
      }
    } else {
      onBack();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter product name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Product Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Detailed description of the product"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Textarea
                  id="shortDescription"
                  value={formData.shortDescription}
                  onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                  placeholder="Brief product summary for listings"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)} disabled>
                    <SelectTrigger>
                      <SelectValue placeholder="Electronics" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Category is set to Electronics for this store
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subcategory">Subcategory *</Label>
                  <Select value={formData.subcategory} onValueChange={(value) => handleInputChange('subcategory', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {electronicsSubcategories.map(subcategory => (
                        <SelectItem key={subcategory} value={subcategory.toLowerCase().replace(/\s+/g, '-')}>
                          {subcategory}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  placeholder="Product brand"
                />
              </div>


            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Points
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pointPrice">Point Price *</Label>
                    <Input
                      id="pointPrice"
                      type="number"
                      step="1"
                      value={formData.pointPrice}
                      onChange={(e) => handleInputChange('pointPrice', e.target.value)}
                      placeholder="0"
                    />
                    <p className="text-xs text-muted-foreground">
                      Number of points required to purchase this product
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Inventory
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="trackQuantity"
                      checked={formData.trackQuantity}
                      onCheckedChange={(checked) => handleInputChange('trackQuantity', checked)}
                    />
                    <Label htmlFor="trackQuantity">Track quantity</Label>
                  </div>

                  {formData.trackQuantity && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Stock Quantity</Label>
                        <Input
                          id="quantity"
                          type="number"
                          value={formData.quantity}
                          onChange={(e) => handleInputChange('quantity', e.target.value)}
                          placeholder="Available quantity"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                        <Input
                          id="lowStockThreshold"
                          type="number"
                          value={formData.lowStockThreshold}
                          onChange={(e) => handleInputChange('lowStockThreshold', e.target.value)}
                          placeholder="10"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="allowBackorders"
                          checked={formData.allowBackorders}
                          onCheckedChange={(checked) => handleInputChange('allowBackorders', checked)}
                        />
                        <Label htmlFor="allowBackorders">Allow backorders</Label>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Product Images
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="image-upload"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      Click to upload images or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF up to 10MB each
                    </p>
                  </Label>
                </div>

                {formData.images.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Uploaded Images</h4>
                      <Badge variant="secondary">{formData.images.length} image(s)</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.images.map((image) => (
                        <div key={image.id} className="relative group border rounded-lg overflow-hidden">
                          <ImageWithFallback
                            src={image.url}
                            alt={image.name}
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute top-2 right-2 flex gap-1">
                            {formData.featuredImage === image.id && (
                              <Badge className="text-xs bg-green-600">Featured</Badge>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRemoveImage(image.id)}
                              className="h-6 w-6 p-0"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                            <p className="text-xs truncate">{image.name}</p>
                            {formData.featuredImage !== image.id && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleInputChange('featuredImage', image.id)}
                                className="text-xs mt-1 h-6"
                              >
                                Set as Featured
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>


          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Product Preview
                </CardTitle>
                <CardDescription>
                  Review your product details before publishing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-lg">{formData.name || 'Product Name'}</h3>
                      <p className="text-muted-foreground">{formData.shortDescription}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-semibold flex items-center gap-2">
                        <Award className="h-6 w-6 text-amber-500" />
                        {formData.pointPrice || 0} Points
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Category:</span>
                        <p className="capitalize">{formData.category?.replace('-', ' ')}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Subcategory:</span>
                        <p className="capitalize">{formData.subcategory?.replace('-', ' ') || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Brand:</span>
                        <p>{formData.brand || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Stock:</span>
                        <p>{formData.trackQuantity ? `${formData.quantity || 0} units` : 'Unlimited'}</p>
                      </div>
                    </div>

                    {formData.tags.length > 0 && (
                      <div>
                        <span className="text-muted-foreground text-sm">Tags:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {formData.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    {formData.images.length > 0 ? (
                      <div className="space-y-2">
                        <div className="aspect-square border rounded-lg overflow-hidden">
                          <ImageWithFallback
                            src={formData.images.find(img => img.id === formData.featuredImage)?.url || formData.images[0]?.url}
                            alt={formData.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {formData.images.length > 1 && (
                          <div className="grid grid-cols-4 gap-2">
                            {formData.images.slice(0, 4).map((image) => (
                              <div key={image.id} className="aspect-square border rounded overflow-hidden">
                                <ImageWithFallback
                                  src={image.url}
                                  alt={image.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <Image className="h-12 w-12 mx-auto mb-2" />
                          <p>No images uploaded</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Product Description</h4>
                  <p className="text-muted-foreground">
                    {formData.description || 'No description provided'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepProgress = () => {
    return ((currentStep + 1) / steps.length) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to E-Store
          </Button>
          <div>
            <h1 className="text-3xl font-medium">{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
            <p className="text-muted-foreground">
              {isEdit ? 'Update product information and settings' : 'Create a new product for your e-store marketplace'}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => handleSave('draft')} disabled={!hasChanges}>
            Save as Draft
          </Button>
          {currentStep === steps.length - 1 && (
            <Button onClick={() => handleSave('active')} disabled={!hasChanges}>
              <Save className="h-4 w-4 mr-2" />
              {isEdit ? 'Update Product' : 'Publish Product'}
            </Button>
          )}
        </div>
      </div>

      {/* Progress Indicator */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Step {currentStep + 1} of {steps.length}</h3>
              <span className="text-sm text-muted-foreground">{Math.round(getStepProgress())}% Complete</span>
            </div>
            <Progress value={getStepProgress()} className="h-2" />
            
            <div className="grid grid-cols-4 gap-4">
              {steps.map((step, index) => {
                const status = getStepStatus(index);
                const Icon = step.icon;
                
                return (
                  <div key={step.id} className="flex items-center gap-3">
                    <div className={`
                      flex items-center justify-center w-8 h-8 rounded-full border-2 
                      ${status === 'completed' ? 'bg-green-600 border-green-600 text-white' : ''}
                      ${status === 'current' ? 'border-primary text-primary' : ''}
                      ${status === 'upcoming' ? 'border-gray-300 text-gray-400' : ''}
                    `}>
                      {status === 'completed' ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${status === 'current' ? 'text-primary' : status === 'completed' ? 'text-green-600' : 'text-gray-400'}`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Changes Indicator */}
      {hasChanges && (
        <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <span className="text-sm text-yellow-800">You have unsaved changes</span>
        </div>
      )}

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {React.createElement(steps[currentStep].icon, { className: "h-5 w-5" })}
            {steps[currentStep].title}
          </CardTitle>
          <CardDescription>
            {steps[currentStep].description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <div className="flex gap-2">
          {currentStep < steps.length - 1 && (
            <Button 
              onClick={handleNext}
              disabled={!canProceedToNext()}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>

      {!canProceedToNext() && currentStep < steps.length - 1 && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <span className="text-sm text-red-800">
            Please fill in all required fields to continue: {steps[currentStep].required.filter(field => !formData[field] || formData[field].trim() === '').join(', ')}
          </span>
        </div>
      )}
    </div>
  );
}