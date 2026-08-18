---
id: EA-0117
title: Module Dependency Map
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Module Dependency Map

## Purpose
Visualizes the rule that Business Modules must never depend directly on one another. It illustrates how the Platform Foundation acts as the central nervous system connecting all domains.

## Architectural Visualization

```mermaid
graph TD
    %% Modules
    subgraph "Academic Domain"
        A1[Admission]
        A2[Enrollment]
    end
    
    subgraph "Enterprise Domain"
        E1[Finance]
        E2[HR]
    end
    
    %% The Platform
    subgraph "Platform Foundation (Kernel)"
        EB((Event Bus))
        WR((Workflow Runtime))
        GW((API Gateway))
    end
    
    %% Connections
    A1 -.-x |Forbidden| A2
    A1 -.-x |Forbidden| E1
    
    A1 ==> |Publishes Event| EB
    EB ==> |Subscribes| E1
    
    WR ==> |Commands| A2
    WR ==> |Commands| E1
    
    Client[Web/Mobile Client] ==> GW
    GW ==> A1
    GW ==> A2
    GW ==> E1
```

## Explanation
- The red dashed lines (Forbidden) represent direct HTTP/RPC calls or Database joins between modules.
- The solid lines represent authorized traffic. Modules only talk to the Kernel (Event Bus, Workflow Runtime, or API Gateway).
- By routing everything through the Kernel, Campus OS achieves true modularity, allowing the `Finance` module to be entirely rewritten or replaced without the `Admission` module ever knowing.
