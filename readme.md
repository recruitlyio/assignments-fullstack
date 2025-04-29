# Candidate Engagement bot

## Overview

This chatbot has the information of recruitly.io's full stack development role and will use it to engage with potential candidates, providing them information, clarifying their doubts while assessing their skills and creating their profile.

## Setup

This is a mono repo containing two directories

```
- client
- server
```

You can install the packages with npm in the root itself with

```
npm install
```

### Note

- Please make sure that you add a .env file in the root directory.
- env.example can be modified in place

## Run

Run both server and client simultaneously with the below command in the root directory. Then go to localhost:3000 to start chatting

```
npm run dev
```

### Ports

- Server: 5000
- Client: 3000

## Technical Deep Dive - Server

The application runs on express backend with state and llm (OpenAI) management is handled by Langraph.

### State Management

- **State Structure**:
  - `messages`: Conversation history
  - `profile`: Extracted profile data from conversations

### Workflow Architecture

- **Directed Graph**: Simple sequential flow using `StateGraph`:
  - `START → model → profileExtractor → END`
- **Node Functions**:
  - `model`: Invokes LLM to generate responses
  - `profileExtractor`: Extracts structured profile information

### Memory System

- `MemorySaver` maintains state across API calls in memory.
- Message thread persistence via UUID-based references

### LLM Integration

- OpenAI chat model (`ChatOpenAI`) serves as the core LLM
- Configurable via environment variables (`OPENAI_MODEL`)

### Structured Output

- Uses `StructuredOutputParser` with Zod schemas for profile extraction
- Profile schema captures: name, contact, experience, skills, education, title

## Working Principles

### Profile Extraction Process

1. Dedicated system prompt analyzes conversation
2. Extracts **only** explicitly stated candidate information
3. Incrementally builds profile across conversation turns
4. Structures data via Zod schema validation

### API Flow

1. Thread creation initializes LangGraph workflow
2. Message processing:
   - Sends message through model node
   - Extracts profile data
   - Returns response with updated profile

## Technical Deep Dive - Client

### Main Components

- **App**: Entry point that initializes the chat thread
- **Chat**: Primary component handling message state and API interactions
- **ProfileCard**: Dynamic display of extracted candidate information
- **MessageList**: Rendering of conversation history
- **MessageInput**: User input interface with loading states

### Data Flow

- Thread creation → Chat rendering → Message exchange → Profile updates

## Key Functionality

### Thread Management

- **useCreateThread Hook**:
  - Custom React Query hook for thread initialization
  - Creates conversation thread via API on application load
  - Returns thread_id and initial AI message

### Message Processing

- **State Management**:
  - Local state tracks messages and loading states
  - Profile data maintained in separate state object
  - Auto-scrolling to latest messages

### Profile Visualization

- **Dynamic Rendering**:
  - Empty state shown when no profile data exists
  - Progressive disclosure as candidate information is extracted
  - Organized sections for different profile attributes:
    - Basic info (name, contact)
    - Professional details (title, experience)
    - Skills (with badge visualization)
    - Education history

### UI Components

- Tailwind CSS for styling
- UI primitives (Card, Avatar, Badge, etc.) from ShadCN
- Lucide icons for visual elements

### State Management

- React useState for local component state
- React Query for API state management
- Effect hooks for DOM interactions (scrolling)

### User Experience

- Loading indicators for API operations
- Responsive message layout with role-based styling
- Error handling for failed API requests
