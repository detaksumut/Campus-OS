# Service Certificate Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "certificateId": { "type": "string" },
    "certificateType": { "const": "SharedService" },
    "status": { "type": "string", "enum": ["Scaffolded", "Validated", "Tested", "Certified", "Production Ready", "Released"] },
    "sdkCompatibility": { "type": "string" },
    "kernelCompatibility": { "type": "string" }
  },
  "required": ["certificateId", "certificateType", "status"]
}
```
