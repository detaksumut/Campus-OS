---
id: EA-0058
title: Knowledge Runtime Contract
type: Runtime Contract
status: APPROVED
version: 1.0.0
---

# Knowledge Runtime Contract

## Purpose
Provides a semantic search and knowledge graph foundation for retrieving relevant context, policies, and master data across Campus OS.

## Responsibilities
- Ingesting, chunking, and embedding unstructured and structured data.
- Maintaining the enterprise Knowledge Graph (Ontology).
- Executing semantic searches and hybrid queries.

## Public API

### Commands
- `POST /knowledge/ingest` - Ingest a new document or data point into the knowledge base.
- `POST /knowledge/search` - Perform a semantic search query.

### Queries
- `GET /knowledge/entity/{id}` - Retrieve graph nodes connected to a specific entity.

## Published Events
- `KnowledgeIngested`
- `KnowledgeUpdated`

## Consumed Events
- Module data updates (e.g., `DocumentPublished`, `CourseCreated`) to keep vector indices fresh.

## Error Codes
- `KNW-400`: Invalid query format.
- `KNW-404`: Entity not found in graph.
- `KNW-500`: Vector database connection error.

## Security
- Data partitioning by tenant and visibility rules.

## Authorization
- Scoped access based on user role to ensure they only retrieve knowledge they are permitted to see.

## Database Mapping
Schema: `kernel_knowledge`

## Dependencies
- AI Runtime (For embedding generation)
- Document Runtime (For source files)

## Observability
- Search latency.
- Index size and growth rate.

## Performance Targets
- Semantic Search < 300ms
- Ingestion Processing < 5s

## Versioning
- API Version: `v1`

## Compatibility
- OpenAPI 3.1 compliant.

## Examples
*See `04_RUNTIME_CONTRACTS/examples/knowledge` for JSON examples.*

## Diagram

### Semantic Search Flow (Sequence Diagram)
```mermaid
sequenceDiagram
    participant Module
    participant Knowledge Runtime
    participant AI Runtime
    participant Vector DB
    
    Module->>Knowledge Runtime: POST /knowledge/search (Query)
    Knowledge Runtime->>AI Runtime: Request Embedding
    AI Runtime-->>Knowledge Runtime: Vector [0.1, -0.5, ...]
    Knowledge Runtime->>Vector DB: Cosine Similarity Search
    Vector DB-->>Knowledge Runtime: Top K Results
    Knowledge Runtime-->>Module: Search Results
```

### Knowledge Graph (C4 / Graph Interaction)
```mermaid
graph TD
    A(Student: John) -->|Enrolled In| B(Course: CS101)
    B -->|Taught By| C(Professor: Smith)
    B -->|Requires| D(Skill: Python)
    C -->|Has Expertise| D
    
    classDef node fill:#f9f,stroke:#333,stroke-width:2px;
    class A,B,C,D node;
```

### C4 Component Diagram
```mermaid
C4Component
    title Component Diagram for Knowledge Runtime

    Container_Boundary(knowledge_boundary, "Knowledge Runtime") {
        Component(search_controller, "Search Controller", "REST API", "Handles queries")
        Component(ingestion_worker, "Ingestion Worker", "Background", "Chunks and embeds data")
        Component(graph_engine, "Graph Engine", "Service", "Manages relationships")
    }
    
    ContainerDb(vector_db, "Vector Schema", "pgvector", "kernel_knowledge")
    
    Rel(search_controller, graph_engine, "Queries")
    Rel(ingestion_worker, vector_db, "Writes vectors")
    Rel(graph_engine, vector_db, "Reads vectors")
```

## Certification Checklist
- [x] Metadata Complete
- [x] API Documented
- [x] Events Documented
- [x] Database Mapped
- [x] Diagrams Rendered
- [x] Traceability Validated
