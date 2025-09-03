# Timer App in React

## 
Built a simple timer app with start, pause, reset, and editable time functionality.

---



### 1. **State Management**
   - Used `useState` to track:
     - `time` (in seconds)
     - `isRunning` (timer status)
     - `editState` (for tracking the field being edited and its value)

### 2. **Countdown Logic**
   - Implemented a `useEffect` that updates the `time` every second when the timer is active.

### 3. **Editable Time**
   - Allows users to click on hours, minutes, or seconds to edit that specific part of the time.

### 4. **Input Handling**
   - Ensured that inputs are limited to two digits (hours, minutes, seconds).

### 5. **Controls**
   - Provided buttons for:
     - Starting/pausing the timer.
     - Resetting the timer.

---
