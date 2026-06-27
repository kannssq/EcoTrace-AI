from typing import List, Dict, Any, Optional
from typing_extensions import TypedDict
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langgraph.graph import StateGraph, START, END

# Define Pydantic request model
class AuditRequest(BaseModel):
    documents: List[str]

# Define LangGraph workflow state
class AgentState(TypedDict):
    documents: List[str]
    parsed_data: Optional[Dict[str, Any]]
    emissions: Optional[Dict[str, Any]]
    routes: Optional[List[Dict[str, Any]]]

# Node 1: parse_documents
def parse_documents(state: AgentState) -> Dict[str, Any]:
    docs = state.get("documents", [])
    return {
        "parsed_data": {
            "status": "success",
            "document_count": len(docs),
            "details": f"Parsed {len(docs)} documents successfully."
        }
    }

# Node 2: calculate_emissions
def calculate_emissions(state: AgentState) -> Dict[str, Any]:
    # Mock calculation of emissions based on standard parsed documents
    return {
        "emissions": {
            "co2_tons": 12.4,
            "offset_options": ["reforestation", "solar_credits"],
            "efficiency_score": 78
        }
    }

# Node 3: route_navigator
def route_navigator(state: AgentState) -> Dict[str, Any]:
    # Return two routes:
    # 1. Standard Route (High Congestion) colored red (#e53e3e)
    # 2. Eco-Safe Bypass colored green (#38a169)
    return {
        "routes": [
            {
                "name": "Standard Route (High Congestion)",
                "distance_km": 15.2,
                "estimated_time_mins": 45,
                "congestion_level": "high",
                "color": "#e53e3e",
                "description": "Shortest physical route but heavily congested, leading to higher idling emissions."
            },
            {
                "name": "Eco-Safe Bypass",
                "distance_km": 18.5,
                "estimated_time_mins": 30,
                "congestion_level": "low",
                "color": "#38a169",
                "description": "Slightly longer distance, but clear traffic and optimized for steady speed and lower emissions."
            }
        ]
    }

# Build the graph
workflow = StateGraph(AgentState)

# Add nodes
workflow.add_node("parse_documents", parse_documents)
workflow.add_node("calculate_emissions", calculate_emissions)
workflow.add_node("route_navigator", route_navigator)

# Add edges defining the execution path
workflow.add_edge(START, "parse_documents")
workflow.add_edge("parse_documents", "calculate_emissions")
workflow.add_edge("calculate_emissions", "route_navigator")
workflow.add_edge("route_navigator", END)

# Compile graph
app_graph = workflow.compile()

# Initialize FastAPI App
app = FastAPI(
    title="EcoTrace AI Backend API",
    description="FastAPI service serving a LangGraph route audit workflow."
)

# Enable CORS for frontend connectivity
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/audit")
async def run_audit(request: AuditRequest):
    initial_state = {
        "documents": request.documents,
        "parsed_data": None,
        "emissions": None,
        "routes": None
    }
    # Invoke the LangGraph workflow asynchronously
    final_state = await app_graph.ainvoke(initial_state)
    return final_state
