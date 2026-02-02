# Connect App Documentation

This document serves as the primary reference for the "Connect" chat application. It includes a specific guide for utilizing Tailwind CSS within the project's design system, followed by a general architectural overview.

---

## 🎨 Tailwind CSS Design System

The application uses a specific Dark Mode theme inspired by WhatsApp Web. Below are the key "recipes" and class combinations used to maintain consistency.

### Color Palette (Dark Theme)

| Color Name | Hex Code | Tailwind / Custom Pattern | Usage |
| :--- | :--- | :--- | :--- |
| **Main Background** | `#111b21` | `bg-[#111b21]` | Main content areas, panels, chat background. |
| **Darker Background** | `#0b141a` | `bg-[#0b141a]` | Application frame, behind panels, sidebars. |
| **Surface / Hover** | `#202c33` | `bg-[#202c33]` | Inputs, search bars, hover states for list items. |
| **Accent Green** | `#00a884` | `text-[#00a884]` or `bg-[#00a884]` | Primary buttons, active icons, links. |
| **Primary Text** | `#e9edef` | `text-gray-200` or `text-gray-100` | Main headings, names, messages. |
| **Secondary Text** | `#8696a0` | `text-gray-400` or `text-gray-500` | Subtitles, timestamps, muted icons. |
| **Borders** | `#222d34` | `border-gray-800` or `border-[#222d34]` | Dividers between list items or panels. |

### Component Recipes

#### 1. Standard List Item (Chat/Call Row)
Used for listing users, chats, or call history.
```jsx
<div className="flex items-center justify-between p-3 hover:bg-[#202c33] cursor-pointer transition-colors rounded-lg">
  {/* Left: Avatar + Info */}
  <div className="flex items-center gap-3">
    <img src="..." className="w-12 h-12 rounded-full object-cover" />
    <div>
      <h3 className="text-gray-100 font-medium">Title</h3>
      <p className="text-gray-500 text-sm">Subtitle</p>
    </div>
  </div>
  {/* Right: Meta/Action */}
  <div className="text-gray-500 text-xs">Action</div>
</div>
```

#### 2. Search Bar
Standard input field style.
```jsx
<div className="bg-[#202c33] rounded-lg flex items-center px-4 py-2">
  <Icon className="text-gray-500" />
  <input 
    className="bg-transparent border-none focus:outline-none text-gray-200 ml-4 placeholder-gray-500 w-full"
    placeholder="Search..."
  />
</div>
```

#### 3. Panel Header
Top section of sidebars or main views.
```jsx
<div className="h-[60px] bg-[#202c33] flex items-center justify-between px-4 border-b border-gray-800">
  <h1 className="text-gray-200 font-medium">Title</h1>
  <div className="flex gap-4 text-gray-400">
    {/* Icons */}
  </div>
</div>
```

#### 4. Circle Button (Icons)
Used for floating actions or header icons.
```jsx
<button className="p-2 text-gray-500 hover:bg-white/10 rounded-full transition-colors">
  <Icon size={20} />
</button>
```

#### 5. Scrollable Container (Hidden Scrollbar)
```jsx
<div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
  {/* Content */}
</div>
```

---

## 🏗️ Project Overview

**Connect** is a modern, real-time chat application built with a focus on a responsive, dark-themed user interface and seamless communication features.

### Technology Stack
- **Frontend**: React.js (Vite)
- **Styling**: Tailwind CSS
- **State Management**: React Context (`ChatContext`, `SocketContext`)
- **Icons**: `react-icons` (Ionicons library `io5`)
- **Navigation**: React Router

### Directory Structure

```
src/
├── Call/                 # Call Feature Module
│   ├── components/       # Call-specific UI components (CallHistoryItem, etc.)
│   ├── pages/            # Page-level components (CallPage)
│   └── Calls_entry_point.jsx # Main entry for Calls
├── Chat/                 # Chat Feature Module
│   ├── components/       # Chat-specific components (ChatBox, ChatList, etc.)
│   └── pages/            # Page-level components (UserChat)
├── store/                # Global State
│   └── socketContext.jsx # Core application state (User, Socket, Data)
├── api/                  # API Integration
├── components/           # Shared/Common Components
└── App.jsx               # Main Application Layout & Routing
```

### Key Features

1.  **Real-time Messaging**: Socket-based communication.
2.  **User Info Panel**: Detailed profile view with media galleries and options.
3.  **Call Interface**:
    -   **Split View**: Dedicates space for history and quick actions on desktop.
    -   **Responsive**: Adapts to mobile with focused views.
    -   **Quick Actions**: Start voice/video calls or create links.
4.  **Global Search**: Filter users and chats instantly.

### Component Architecture

-   **`UserChat.jsx`**: The central hub. It manages the main layout (Sidebar + Chat Area + Info Panel).
-   **`ChatContext`**: Provides global access to `chatlist`, `currentUser`, `socket`, and UI state like `sidepanel`.
-   **`UserInfoPanel`**: A pure UI component that conditionally renders detailed contact info.
-   **`CallPage`**: A distinct page for managing calls, utilizing a modern split-panel design for efficiency.

### Installation & Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
3.  **Build**:
    ```bash
    npm run build
    ```

---
*Documentation generated by Antigravity AI.*
