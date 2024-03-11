This is my first `react-native` app ever.

Shortcuts and technical debt

- `storageHelper.ts` would in the future talk to a database that is shared with my girlfriend.
- Haven't looked into best-practices for async-storage or SQLite. Right now everything is just
  JSON stringified "per table
- Some components now determine their own margin to space them out a little. In the real world, would
  probably let the container determine spacing (eg. `Flex spaceBetween='large'`). This necessitates a
  library for stylesheets, like `react-native-extended-stylesheet`
- I'm ignoring some type error on `useNavigation`. Looks like this can be typed to expect the correct
  screen parameters for each screen, but the typing for it seems a bit cumbersome. I would either
  pre-bake a type alias, or bake a typed alias of the `useNavigation` hook outright.
- Adding a wishlist item would probably be easier if you didn't have to leave the list.
  If you are looking at a list filtered for one or more particular shops there may be some edge
  cases that a very simple form cannot handle. Nevertheles, with more time this should be implemented
