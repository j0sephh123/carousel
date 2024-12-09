# Horizontal Carousel Component

An infinite horizontal image carousel component.  
Navigation within the carousel is triggered exclusively by **scroll** or **drag**

[Deployed manually on netlify](https://sunny-cajeta-c24ceb.netlify.app/)

![Scroll with limit 50](./scroll_with_limit_50.gif)
![Config](./config.gif)

---

## Summary

The horizontal carousel is designed to showcase a scrolling gallery of images. It supports:

- infinite looping for continuous scrolling.
- uses an image api to get images from

### Tree explanation

```
├── App.module.css
├── App.tsx
├── components
│   ├── HorizontalCarousel
│   │   ├── HorizontalCarousel.module.css
│   │   ├── HorizontalCarousel.tsx - uses FixedSizeList from react-window and handles loading of next page
│   │   ├── ConfigForm
│   │   │   └── ConfigForm.tsx
│   │   ├── hooks
│   │   │   ├── useDrag.ts - logic for drag and scroll
│   │   │   └── useScrollable.ts - prevents global scroll when scrolling over the carousel
│   │   ├── Image.module.css
│   │   ├── Image.tsx - tiny wrapper for `<img/>
│   │   ├── ScrollableContainer.module.css
│   │   ├── ScrollableContainer.tsx - handles drag and scroll
│   │   ├── types.ts
│   │   └── utils - only a small function to generate random string
│   │   ├── animate.ts - animate with requestAnimationFrame
│   │   └── handleScroll.ts - logic for scroll
│   └── ConfigForm
│      ├── ConfigForm.module.css
│      ├── ConfigForm.tsx - a basic component to update context with how many images to show on screen and which api
│      ├── Input.module.css
│      ├── Input.tsx - tiny generic for config, not related to the carousel
│      └── Select.tsx - tiny generic for config, not related to the carousel
├── constants.ts
├── context
│   ├── apiMapper.ts
│   ├── CarouselContext.tsx - this needs to be in its own file to allow fast refresh by vite
│   ├── CarouselProvider.tsx - abstraction
│   ├── types.ts
│   ├── useCarouselContext.ts - create a hook to use more easily
│   ├── useCarouselProvider.ts - logic for the context
│   └── utils.ts
├── hooks
│   └── useSyncedState.ts - a thin abstraction so we can sync with local storage
├── main.tsx - entry point
├── services
│   ├── catsService.ts - service for cataas api
│   └── picsumService.ts - service for picsum api
├── styles
│   └── index.css - global styling, currently only the default from vite setup

### Configurations

- number of items displayed
- currently supporting switching between picsum and cats apis
- ... want to add more stuff, but currently none other
```

---

## How to run locally

1. Clone the repository:
   ```bash
   git clone https://github.com/j0sephh123/carousel
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

## Tools Used

- [Vite](https://vite.dev/) – For project setup and fast development. I think that Vite is so far ahead of every other tool right now that there is no need for justification :)
- [react-window](https://react-window.vercel.app/#/examples/list/fixed-size) – For efficient virtualization and performance optimization. Reason is because I have experience with this library from before and good memories and wanted to use it again. Also I've tried to use https://tanstack.com/virtual/latest, but didn't end up sticking with it, because it is kinda newer and there are few good resources and explanations

## Author's comments
Not proud of this implementation and how it works