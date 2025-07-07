# MaterialFlow

MaterialFlow is a basic application developed with SAP CAP and Fiori Elements for managing materials, purchase orders, categories, suppliers, and inventory movements.

## Features

- **Material Management:** Create, update, delete, and view materials.
- **Purchase Orders:** Create, edit, approve, and view orders and their items.
- **Suppliers & Categories:** Manage related catalogs.
- **Inventory Movements:** Automatic registration when approving orders.
- **Virtual Assistant:** Integrated chatbot for contextual help.
- **Fiori Elements Applications** for each main entity.

## Project Structure

```
.
├── app/                # Fiori applications (UI)
│   ├── accessmenu/
│   ├── categories/
│   ├── inventorymovement/
│   ├── materials/
│   ├── purchaseorder/
│   └── suppliers/
├── db/                 # Data model and sample data
│   ├── schema.cds
│   └── data/
├── srv/                # CAP services and business logic
│   ├── service.cds
│   ├── service.ts
│   └── handlers/
├── gen/                # Generated files (do not edit)
├── resources/          # Static resources (images, etc.)
├── package.json
├── mta.yaml
├── Dockerfile
└── README.md
```

## Installation

1. **Prerequisites:**
   - Node.js LTS (recommended v16+)
   - npm
   - [@sap/cds-dk](https://cap.cloud.sap/docs/get-started/) (optional, for CAP commands)

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Load sample data (optional):**
   ```sh
   cds deploy --to sqlite:db.sqlite
   ```

## Running the Application

1. **Start the CAP backend:**
   ```sh
   cds watch
   ```
   or
   ```sh
   npm start
   ```

2. **Access the Fiori applications:**
   - [Materials](http://localhost:4004/materials/webapp/index.html)
   - [Purchase Orders](http://localhost:4004/purchaseorder/webapp/index.html)
   - [Suppliers](http://localhost:4004/suppliers/webapp/index.html)
   - [Categories](http://localhost:4004/categories/webapp/index.html)
   - [Inventory Movements](http://localhost:4004/inventorymovement/webapp/index.html)
   - [Main Menu](http://localhost:4004/accessmenu/webapp/index.html)

## API

The backend exposes OData endpoints and several custom actions for operations such as adjusting stock, approving orders, changing suppliers, etc.  
See the **API** section in this README for usage examples.

## Docker Deployment

You can run the application in a Docker container:

```sh
docker build -t materialflow .
docker run -p 4004:4004 materialflow
```

## Contributions

Contributions are welcome! Open an issue or pull request for suggestions or improvements.