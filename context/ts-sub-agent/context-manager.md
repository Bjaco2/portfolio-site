# Context Manager Implementation

## Core Functions

### Session Startup Sequence (Context Management Focus)
```
1. Read /Users/bowenjacobs/claude agents/claude.md
2. Update last session timestamp
3. Check environment variables and working directory
4. Initialize context tracking systems
5. Set up context persistence monitoring
6. Report context status to Agent Manager
```

## Context Management Responsibilities
- **Context Persistence**: Maintain claude.md and all context files
- **Information Organization**: Structure and organize session information
- **Sub-agent Context Tracking**: Monitor and update sub-agent contexts
- **Discovery Archive**: Maintain important findings and solutions
- **Session Continuity**: Ensure information persists across conversations

### Context Update Workflows

#### New Sub-Agent Registration
When new sub-agents are created and added to context, use this standardized format:

```markdown
### [Agent Name]
- **Purpose**: [Primary function]
- **Location**: /Users/bowenjacobs/claude agents/[name]-sub-agent/
- **Status**: [Active/Inactive/Completed]
- **Context**: [Agent-specific information]
- **Created**: [Date]
- **Key Files**:
  - /Users/bowenjacobs/claude agents/[name]-sub-agent/README.md
  - [Additional files as needed]
```

#### Discovery Archive Entry
```markdown
## [Discovery Date] - [Topic]
- **Issue**: [Problem or question]
- **Solution**: [Resolution found]
- **Files**: [Relevant file paths]
- **Commands**: [Key commands used]
- **Notes**: [Additional context]
```

#### Command Library Entry
```markdown
### [Command Category]
- **Command**: `[actual command]`
- **Purpose**: [What it does]
- **Usage**: [When to use]
- **Examples**: [Specific examples]
```

## Context Maintenance Rules

1. **Information Priority**:
   - Critical: Environment, active sub-agents, current session state
   - Important: Recent discoveries, proven workflows, key file locations
   - Archival: Historical information, completed tasks, deprecated workflows

2. **Update Frequency**:
   - Real-time: Sub-agent status changes, critical discoveries
   - Session-end: Summary updates, cleanup of outdated information
   - Periodic: Archive old information, reorganize structure

3. **Organization Standards**:
   - Use consistent markdown formatting
   - Maintain chronological order where applicable
   - Keep related information grouped together
   - Use clear, descriptive headings

## Integration Points

- **TodoWrite Tool**: Track context management tasks
- **All Sub-Agents**: Coordinate with and track other agents
- **Session Management**: Maintain continuity between conversations
- **File Operations**: Monitor important file discoveries and changes