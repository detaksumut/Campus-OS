---
id: EA-0056
title: Document Runtime Contract
type: Runtime Contract
status: APPROVED
version: 1.0.0
---

# Document Runtime Contract

## Purpose
Manages the lifecycle, storage, versioning, and retrieval of physical files and digital documents across Campus OS.

## Responsibilities
- Handling file uploads, downloads, and multipart transfers.
- Storing files securely in object storage (e.g., S3, GCS).
- Generating pre-signed URLs for direct access.

## Public API

### Commands
- `POST /document/upload` - Upload a new document.
- `DELETE /document/{id}` - Delete a document.

### Queries
- `GET /document/{id}/download` - Generate a secure download URL.

## Published Events
- `DocumentUploaded`
- `DocumentDeleted`

## Consumed Events
- None.

## Error Codes
- `DOC-400`: Invalid file format or size limit exceeded.
- `DOC-404`: Document not found.

## Security
- Files are scanned for malware upon upload.
- Pre-signed URLs have strict expiration times.

## Authorization
- Only document owners or authorized personnel can download.

## Database Mapping
Schema: `kernel_document` (Metadata only)

## Dependencies
- Storage Runtime (Abstracts underlying object storage)

## Observability
- Storage usage over time.
- Upload/Download bandwidth.

## Performance Targets
- URL Generation < 20ms

## Versioning
- API Version: `v1`

## Compatibility
- OpenAPI 3.1 compliant.

## Examples
*See `04_RUNTIME_CONTRACTS/examples/document` for JSON examples.*

## Diagram

### C4 Component Diagram
```mermaid
C4Component
    title Component Diagram for Document Runtime

    Container_Boundary(document_boundary, "Document Runtime") {
        Component(upload_api, "Upload API", "REST API", "Handles metadata & upload")
        Component(download_api, "Download API", "REST API", "Generates URLs")
        Component(storage_adapter, "Storage Adapter", "Service", "Talks to S3")
    }
    
    ContainerDb(database, "Document DB Schema", "PostgreSQL", "kernel_document")
    System_Ext(object_storage, "Object Storage", "S3 / GCS")
    
    Rel(upload_api, storage_adapter, "Uploads file stream")
    Rel(download_api, storage_adapter, "Requests signed URL")
    Rel(upload_api, database, "Saves metadata")
    Rel(storage_adapter, object_storage, "Reads/Writes blobs")
```

### Runtime Interaction Diagram
```mermaid
graph TD
    A[Client] -->|Uploads File| B(Document Runtime)
    B -->|Saves Blob| C[(Object Storage)]
    B -->|DocumentUploaded| D((Event Bus))
    D -->|Consume for processing| E(AI Runtime)
```

## Certification Checklist
- [x] Metadata Complete
- [x] API Documented
- [x] Events Documented
- [x] Database Mapped
- [x] Diagrams Rendered
- [x] Traceability Validated
