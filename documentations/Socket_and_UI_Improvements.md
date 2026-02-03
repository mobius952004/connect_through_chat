# Socket & UI Improvement Report

## 1. Critical Socket Errors & Fixes

### A. Missing Personal Room Join (The "Message Delivery" Issue)
**The Error:**
Your backend was trying to send messages to specific users using `io.to(userId)`. However, Socket.IO does not automatically join a user to a room named after their Database ID. It only creates a room for the `socket.id`.
**The Result:** Real-time delivery receipts and call notifications were failing because the `io.to(userId)` commands were sending messages to empty/non-existent rooms.
**The Fix:**
In `sockets/chat.socket.js`, we added:
```javascript
socket.join(userId); // Explicitly join the user to their own personal room
```
Now, `io.to(userId)` correctly routes data to all active devices for that user.

### B. Cross-Chat Message Leak (The "Naruto/Shyam" Issue)
**The Error:**
When a message arrived via the socket, `Chatbox.jsx` immediately pushed it into the `pastMessages` array. It did not check *who* the message was from.
**The Result:** If you had the chat with "Shyam" open, and "Naruto" sent you a message, Naruto's message would appear in Shyam's chat window.
**The Fix:**
Added a guard clause in `Chatbox.jsx`:
```javascript
if (recievedmessage.Chat !== selectedChat._id) return;
```
This ensures the active chat window only accepts messages that belong to it.

### C. Security Risk: Mass Assignment
**The Error:**
The code was passing the raw client input `newmessage` directly to `Message.create()`.
**The Result:** A hacker could manually send a socket event with a fake `_id`, `status: "Read"`, or `from` field to impersonate others or corrupt data.
**The Fix:**
We now destructure a "Clean Message" object on the server, ensuring the `from` field is forced to be the authenticated user's ID and only safe fields are saved.

### D. "Seen" Status Not Updating
**The Error:**
`Chatbox.jsx` only marked *incoming real-time* messages as read. It did not check the historical messages fetched from the database when you first opened the chat.
**The Result:** If you opened a chat with unread messages, they remained "Unread" (gray ticks) for the sender until you refreshed.
**The Fix:**
Added logic after fetching messages to iterate through them and emit `MESSAGE_READ` for any that were still unread.

---

## 2. Architecture Improvements

### Global Event Listeners (`socketContext.jsx`)
**Previous State:** You only listened for messages inside `Chatbox.jsx`. If the user was on the Home screen, they had no idea a message arrived.
**New State:** moved the listener to the global `Context`.
- **Benefit:** The app now tracks `unreadCounts` globally.
- **Benefit:** We can show notification badges on the Sidebar/Chat Cards even when the chat isn't open.

### Unread Badges
**Implementation:** `ChatCard.jsx` now consumes the global `unreadCounts` map and displays a green notification badge if you have unseen messages.

---

## 3. UI/UX Upgrades

### New Library: `emoji-picker-react`
We installed this library to provide a robust, commercial-grade emoji keyboard.
- **Features:** Searchable emojis, skin tone variations, and category navigation.
- **Integration:** Wrapped in a custom "popover" div controlled by the Smile icon.

### Modular `TextBox.jsx`
We completely rewrote the input component.
- **Old:** A simple HTML `<textarea>`.
- **New:**
    - **Pill-shaped Input:** Looks modern (like WhatsApp/Telegram).
    - **Attachment Menu:** A `+` button that toggles a floating menu for "Photos", "Documents", etc.
    - **Dark Mode Support:** Explicitly configured the Emoji Picker to use `Theme.DARK` and styled all menus with Tailwind's `dark:` classes.

### Chat Bubble Polish
**Fix:** The status indicators (ticks) were appearing on *received* messages instead of *sent* messages.
**Correction:** Swapped logic to `isUser && <StatusIndicator />`. Now ticks only appear on your own green bubbles, positioned correctly next to the timestamp.
