export function validateFeatures(features) {
  const requiredFields = ['sales', 'season', 'price', 'stock'];
  
  // Check if all required fields are present
  for (const field of requiredFields) {
    if (!(field in features)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  // Validate data types and ranges
  if (typeof features.sales !== 'number' || features.sales < 0) {
    throw new Error('Sales must be a non-negative number');
  }

  if (typeof features.season !== 'number' || features.season < 1 || features.season > 4) {
    throw new Error('Season must be a number between 1 and 4');
  }

  if (typeof features.price !== 'number' || features.price <= 0) {
    throw new Error('Price must be a positive number');
  }

  if (typeof features.stock !== 'number' || features.stock < 0) {
    throw new Error('Stock must be a non-negative number');
  }

  return true;
}