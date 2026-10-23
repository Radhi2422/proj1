export const validateProduct = (data) => {
  const errors = {};

  // ==========================
  // Basic Information
  // ==========================
// console.log("Reached here",data);;
  if (!data.productName.trim()) {
    errors.productName = "Product name is required";
  } else if (data.productName.length < 3) {
    errors.productName = "Minimum 3 characters required";
  }

  if (!data.sku.trim()) {
    errors.sku = "SKU is required";
  }

  if (!data.brand.trim()) {
    errors.brand = "Brand is required";
  }

  if (!data.category.trim()) {
    errors.category = "Category is required";
  }

  if (!data.shortDescription.trim()) {
    errors.shortDescription = "Short description is required";
  }

  if (!data.description.trim()) {
    errors.description = "Description is required";
  }

  // ==========================
  // Pricing
  // ==========================

  if (!data.mrp) {
    errors.mrp = "MRP is required";
  } else if (Number(data.mrp) <= 0) {
    errors.mrp = "MRP must be greater than 0";
  }

  if (!data.sellingPrice) {
    errors.sellingPrice = "Selling Price is required";
  } else if (Number(data.sellingPrice) <= 0) {
    errors.sellingPrice = "Selling Price must be greater than 0";
  }

  if (!data.costPrice) {
    errors.costPrice = "Cost Price is required";
  } else if (Number(data.costPrice) <= 0) {
    errors.costPrice = "Cost Price must be greater than 0";
  }

  if (
    Number(data.sellingPrice) > Number(data.mrp) &&
    data.mrp &&
    data.sellingPrice
  ) {
    errors.sellingPrice = "Selling Price cannot exceed MRP";
  }

  if (data.discountValue && Number(data.discountValue) < 0) {
    errors.discountValue = "Discount cannot be negative";
  }
// if (
//   data.discountType &&
//   !["percentage", "fixed"].includes(data.discountType.toLowerCase())
// ) {
//   errors.discountValue = "Discount type must be either percentage or fixed";
// }
  if (
    data.tax &&
    (Number(data.tax) < 0 || Number(data.tax) > 100)
  ) {
    errors.tax = "Tax must be between 0 and 100";
  }

  // ==========================
  // Inventory
  // ==========================

  if (!data.stockQuantity) {
    errors.stockQuantity = "Stock Quantity is required";
  } else if (Number(data.stockQuantity) < 0) {
    errors.stockQuantity = "Invalid Stock Quantity";
  }

  if (
    data.minStock &&
    Number(data.minStock) < 0
  ) {
    errors.minStock = "Minimum Stock cannot be negative";
  }

  if (
    data.maxStock &&
    Number(data.maxStock) < Number(data.minStock)
  ) {
    errors.maxStock = "Max Stock must be greater than Min Stock";
  }

  if (
    data.reorderLevel &&
    Number(data.reorderLevel) < 0
  ) {
    errors.reorderLevel = "Invalid Reorder Level";
  }

  // ==========================
  // Shipping
  // ==========================

  ["weight", "length", "width", "height"].forEach((field) => {
    if (
      data[field] &&
      Number(data[field]) < 0
    ) {
      errors[field] = `${field} cannot be negative`;
    }
  });

  // ==========================
  // SEO
  // ==========================

  if (
    data.slug &&
    !/^[a-z0-9-]+$/.test(data.slug)
  ) {
    errors.slug =
      "Slug should contain lowercase letters, numbers and hyphens only";
  }

  if (
    data.metaTitle &&
    data.metaTitle.length > 60
  ) {
    errors.metaTitle =
      "Meta title should not exceed 60 characters";
  }

  if (
    data.metaDescription &&
    data.metaDescription.length > 160
  ) {
    errors.metaDescription =
      "Meta description should not exceed 160 characters";
  }

  // ==========================
  // Images
  // ==========================

  // if (!data.mainImage) {
  //   errors.mainImage = "Main Product Image is required";
  // }

  // ==========================
  // Variants
  // ==========================
console.log("Variants data:", data.variants);
  data.variants.forEach((variant, index) => {
    if (
      variant.color ||
      variant.size ||
       variant.sku||
      variant.price ||
      variant.stock
    ) {
      if (!variant.color.trim()) {
        errors[`variantColor${index}`] =
          "Variant color is required";
      }

      if (!variant.size.trim()) {
        errors[`variantSize${index}`] =
          "Variant size is required";
      }
      if (!variant.sku.trim()) {
        errors[`variantSku${index}`] =
          "Variant SKU is required";
      }

      if (
        !variant.price ||
        isNaN(variant.price)||
        Number(variant.price) < 0
      ) {
        errors[`variantPrice${index}`] =
          "Valid variant price is required";
      }

      if (
        variant.stock === "" ||
        isNaN(variant.stock) ||
        Number(variant.stock) < 0
      ) {
        errors[`variantStock${index}`] =
          "Valid stock is required";
      }
    }
  });

  // ==========================
  // Specifications
  // ==========================

  data.specifications.forEach((spec, index) => {
    if (spec.key || spec.value) {
      if (!spec.key.trim()) {
        errors[`specKey${index}`] =
          "Specification Key is required";
      }

      if (!spec.value.trim()) {
        errors[`specValue${index}`] =
          "Specification Value is required";
      }
    }
  });
// console.log("reached here also")
  return errors;
};


//discount type to be made dropdown with options percentage and flat: enum: ["percentage", "fixed", "none"],