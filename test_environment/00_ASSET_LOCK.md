# Asset Lock - H.E.L.M Test Environment

This file defines the boundary for experimental local/API agents using the public H.E.L.M role-pack demonstration.

## Protected Source Assets

The main public source areas are read/copy-only unless a task explicitly authorizes edits:

- `council/`
- `executors/`
- `user/`

Experimental agents may read these areas and may copy required material into `test_environment/` or a task-specific workspace. They must not modify, delete, move, rename, reformat, regenerate, or overwrite protected source assets unless the current task gives a bounded exception.

## Reference Routing

Do not duplicate the whole repository into a role folder. Read shared assets from their source locations when needed:

- Council templates and public constitution: `council/`
- Executor charter, skills, MCP notes, and vault templates: `executors/`
- Public platform, tools, and review artifacts: `user/`

## Role Drift Lock

Runtime identity may change, but layer identity must not drift:

- Council remains the decision layer.
- Executors remain the execution layer.
- The human chair remains the routing and confirmation authority.
- Experimental agents do not become owners of H.E.L.M governance assets.
