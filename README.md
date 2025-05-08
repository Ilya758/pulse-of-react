# What is that?

This repository includes **React Design Patterns**, structured in **folders**, where each module refers to the LinkedIn article.

## How to start-up?
1. **Clone** the repository
2. **Each article's code** is written in **notation** `{part}-{description}` inside `src` folder.
3. **Also**, there's an `App.tsx` module
4. **Import** the module from the article's folder as:

```tsx
import { Counter } from '@/1-state-management';

export const App = () => {
  return <Counter />;
};
```

5. **Run** `yarn dev` and observe the nature of patterns!
