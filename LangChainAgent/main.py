import openai
from fastapi import FastAPI
from langchain.agents import initialize_agent, AgentType
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv
from requests.auth import HTTPBasicAuth
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
load_dotenv()
BASE_URL = "http://localhost:4004/odata/v4/mflow"


class Question(BaseModel):
    question: str


# Materials
@tool
def get_material(material_name: str):
    """Get material details based on the material name"""
    url = f"{BASE_URL}/Materials?$filter=name eq '{material_name}'"
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    response = requests.get(url=url, headers=headers, auth=HTTPBasicAuth('admin', 'admin'))
    return response.json()


@tool
def create_new_material(material_name: str, description: str, quantity: int, unitPrice: float) -> str:
    """Create a new material and return the result of the operation"""
    new_material = {
        "name": material_name,
        "description": description,
        "quantity": quantity,
        "unitPrice": unitPrice,
        "category_ID": "036a2a10-34c5-4e13-861f-a77f848d3538",
        "supplier_ID": "5c7a22f3-1edb-48de-b805-995e27c97af5"
    }
    url = f"{BASE_URL}/Materials"
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    response = requests.post(url=url, json=new_material, headers=headers, auth=HTTPBasicAuth('admin', 'admin'))
    if response.status_code == 201:
        return f"✅ Material '{material_name}' created successfully."
    else:
        return f"❌ Failed to create material. Code: {response.status_code} - {response.text}"


@tool
def getMaterialStock(material_name: str) -> str:
    """Get the stock quantity of a material by its name"""
    url = f"{BASE_URL}/Materials?$filter=name eq '{material_name}'"
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    response = requests.get(url=url, headers=headers, auth=HTTPBasicAuth('admin', 'admin'))
    if response.status_code == 200:
        try:
            data = response.json()
            print(data["value"][0])
            return data["value"][0]["quantity"]
        except Exception as e:
            print(e)


@tool
def updateMaterialPrice(material_name: str, new_price: float) -> str:
    """Update the price of a material based on its name"""
    return ""


@tool
def update_material(material_id, **kwargs):
    """Update the information of a material by its ID"""
    url = f"{BASE_URL}/Materials({material_id})"
    response = requests.patch(url, json=kwargs)
    return response.json()


# Suppliers
@tool
def create_new_supplier(name: str, contactEmail: str) -> str:
    """Create a new supplier"""
    url = f"{BASE_URL}/Suppliers"
    payload = {
        "name": name,
        "contactEmail": contactEmail
    }
    response = requests.post(url=url, json=payload, auth=HTTPBasicAuth("admin", "admin"))
    return response.json()


# Categories
@tool
def create_new_category(name: str, description: str) -> str:
    """Create a new category"""
    url = f"{BASE_URL}/Categories"
    payload = {
        "name": name
    }
    response = requests.post(url=url, json=payload, auth=HTTPBasicAuth("admin", "admin"))
    return response.json()


# Purchase Orders
@tool
def get_purchase_orders():
    """Get all purchase order details"""
    url = f"{BASE_URL}/PurchaseOrder"
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    response = requests.get(url=url, headers=headers, auth=HTTPBasicAuth("admin", "admin"))
    return response.json()


@tool
def approve_order(order_id):
    """Approve a purchase order based on its order_id"""
    url = f"{BASE_URL}/PurchaseOrder({order_id})/MFlowService.approveOrder"
    response = requests.post(url)
    return response.json()


# Inventory Movements
@tool
def get_inventory_movements():
    """Get all inventory movements"""
    url = f"{BASE_URL}/InventoryMovement"
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    response = requests.get(url=url, headers=headers, auth=HTTPBasicAuth("admin", "admin"))
    return response.json()


# 🧠 Load model from OpenAI
llm = ChatOpenAI(
    model="gpt-4.1-nano",
    temperature=0,
    openai_api_key=os.getenv("OPENAI_API_KEY")
)

# 🧠 Initialize the agent
agent = initialize_agent(
    tools=[
        create_new_material, create_new_supplier, create_new_category,
        getMaterialStock, get_material, get_inventory_movements, get_purchase_orders
    ],
    llm=llm,
    agent=AgentType.OPENAI_FUNCTIONS,
    verbose=True
)


# 🌍 FastAPI Endpoints
@app.get("/")
async def root():
    return {"message": "Hello from Root!"}


@app.post("/ask")
async def ask_question(q: Question):
    print("❓ Incoming question:", q.question)
    response = agent.invoke(q.question)
    print("🧠 Agent response:", response)
    return {"answer": response}
