# Horizontal Carousel Component

An infinite horizontal image carousel component.  
Navigation within the carousel is triggered exclusively by **scroll** or **drag**

---

## Summary

The horizontal carousel is designed to showcase a scrolling gallery of images. It supports:

- infinite looping for continuous scrolling.
- uses an image api to get images from

### Configurations
- number of items displayed
- ... want to add more stuff, but currently none other

---

## How to Run

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## How to Test

_TODO_: Add tests to verify component functionality.

---

## Tools Used

- [Vite](https://vite.dev/) – For project setup and fast development. I think that Vite is so far ahead of every other tool right now that there is no need for justification :)
- [react-window](https://react-window.vercel.app/#/examples/list/fixed-size) – For efficient virtualization and performance optimization. Reason is because I have experience with this library from before and good memories and wanted to use it again. Also I've tried to use https://tanstack.com/virtual/latest, but didn't end up sticking with it, because it is kinda newer and there are few good resources and explanations
