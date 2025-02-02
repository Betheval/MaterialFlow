# MaterialFlow
MaterialFlow is a really basic Fiori + CAP application that allows managing materials, categories, and suppliers. 
## Features

### Materials

- **Adjust Stock**: Allows adjusting the stock quantity of a material.
- **Calculate Total Value**: Calculates the total value of a material based on its quantity and unit price.
- **Add Material**: Allows adding a new material.
- **Update Material Price**: Allows updating the unit price of a material.
- **Delete Material**: Allows deleting a material.
- **Get Supplier Materials**: Retrieves all materials associated with a supplier.
- **Change Supplier**: Allows changing the supplier of a material.

### Categories

- **Add Category**: Allows adding a new category.

### Suppliers

- **Add Supplier**: Allows adding a new supplier.

## API

### Materials

- **Adjust Stock**
    ```http
    POST /odata/v4/mflow/adjustStock
    Content-Type: application/json

    {
      "materialID": "UUID_OF_MATERIAL",
      "adjustment": 7
    }
    ```

- **Calculate Total Value**
    ```http
    POST /odata/v4/mflow/calculateTotalValue
    Content-Type: application/json

    {
      "materialID": "UUID_OF_MATERIAL"
    }
    ```

- **Add Material**
    ```http
    POST /odata/v4/mflow/addMaterial
    Content-Type: application/json

    {
      "name": "New Material",
      "description": "Description of the new material",
      "quantity": 100,
      "unitPrice": 50.00,
      "categoryID": "UUID_OF_CATEGORY",
      "supplierID": "UUID_OF_SUPPLIER"
    }
    ```

- **Update Material Price**
    ```http
    POST /odata/v4/mflow/updateMaterialPrice
    Content-Type: application/json

    {
      "materialID": "UUID_OF_MATERIAL",
      "newPrice": 1600.00
    }
    ```

- **Delete Material**
    ```http
    POST /odata/v4/mflow/deleteMaterial
    Content-Type: application/json

    {
      "materialID": "UUID_OF_MATERIAL"
    }
    ```

- **Get Supplier Materials**
    ```http
    POST /odata/v4/mflow/getSupplierMaterials
    Content-Type: application/json

    {
      "supplierID": "UUID_OF_SUPPLIER"
    }
    ```

- **Change Supplier**
    ```http
    POST /odata/v4/mflow/changeSupplier
    Content-Type: application/json

    {
      "materialID": "UUID_OF_MATERIAL",
      "supplierID": "UUID_OF_NEW_SUPPLIER"
    }
    ```

### Categories

- **Add Category**
    ```http
    POST /odata/v4/mflow/addCategory
    Content-Type: application/json

    {
      "name": "New Category"
    }
    ```

### Suppliers

- **Add Supplier**
    ```http
    POST /odata/v4/mflow/addSupplier
    Content-Type: application/json

    {
      "name": "New Supplier",
      "email": "supplier@example.com"
    }
    ```

## Contributions

Contributions are welcome. Please open an issue or a pull request to discuss any changes you would like to make.
