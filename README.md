# MaterialFlow

MaterialFlow is a basic application developed with **SAP CAP** and **Fiori Elements** for managing materials, purchase orders, categories, suppliers, and inventory movements.  
The ecosystem is now extended with **MaterialFlowAgent**, a Python-based agent designed to interact with the CAP backend and enable new levels of automation, integrations, and AI-powered assistance.

---

## 📦 Features

### MaterialFlow (SAP CAP + Fiori)
- **Material Management:** Create, update, delete, and view materials.
- **Purchase Orders:** Create, edit, approve, and view orders and their items.
- **Suppliers & Categories:** Manage related catalogs.
- **Inventory Movements:** Automatic registration when approving orders.
- **Virtual Assistant:** Integrated chatbot for contextual help.
- **Fiori Elements Applications** for each main entity.

### MaterialFlowAgent (Python)
- **Backend Bridge:** Connects to MaterialFlow CAP OData services.
- **Automation:** Perform background tasks such as stock checks, data imports, or scheduled actions.
- **Integrations:** Future-ready for RabbitMQ, SAP Event Mesh, or other external systems.
- **AI/LLM Ready:** Can integrate with local or cloud LLMs to provide contextual insights and decision support.
- **Extensible:** Simple modular design in Python, easily adaptable to new requirements.

---

## 📂 Project Structure

### MaterialFlow (CAP Project)
```
materialflow/
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

### MaterialFlowAgent (Python Project)
```
materialflow-agent/
├── main.py          # Main script
├── .gitignore       # Ignored files (IDE, cache, etc.)
└── README.md        # Documentation for the agent
```

---

## ⚙️ Installation

### MaterialFlow
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

### MaterialFlowAgent
1. **Prerequisites:**
   - Python 3.9+
   - `pip` package manager

2. **Install dependencies:**
   (when `requirements.txt` is available)
   ```sh
   pip install -r requirements.txt
   ```

---

## ▶️ Running the Applications

### Start the CAP Backend
```sh
cd materialflow
cds watch
```
or
```sh
npm start
```

### Start the Python Agent
```sh
cd materialflow-agent
python main.py
```

---

## 🌐 Access the Fiori Applications

- [Materials](http://localhost:4004/materials/webapp/index.html)  
- [Purchase Orders](http://localhost:4004/purchaseorder/webapp/index.html)  
- [Suppliers](http://localhost:4004/suppliers/webapp/index.html)  
- [Categories](http://localhost:4004/categories/webapp/index.html)  
- [Inventory Movements](http://localhost:4004/inventorymovement/webapp/index.html)  
- [Main Menu](http://localhost:4004/accessmenu/webapp/index.html)  

---

## 🔮 Roadmap

- **MaterialFlow**
  - Extend with additional business processes.
  - Enhance analytics and reporting.
  - Deploy to SAP BTP (Cloud Foundry or Kyma).  

- **MaterialFlowAgent**
  - Connect to MaterialFlow CAP OData endpoints.
  - Add support for RabbitMQ / Event Mesh.
  - Integrate with local LLMs (Ollama, LLaMA) for decision-making.
  - Implement scheduling and background jobs.
  - Unit & integration tests.  

---

## 🐳 Docker Deployment

You can run the **MaterialFlow CAP backend** in Docker:

```sh
docker build -t materialflow .
docker run -p 4004:4004 materialflow
```

(Planned: Docker setup for **MaterialFlowAgent**.)

---

## 🤝 Contributions

Contributions are welcome!  
Fork the repository, create a feature branch, and open a **Pull Request**.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
