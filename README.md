# `persistence-hooks`

> React hook for saving & hydrating state from local storage, session storage, or cookies

> **Note:** This is using the new [React Hooks API Proposal](https://reactjs.org/docs/hooks-intro.html)
> which is subject to change until React 16.7 final.
>
> You'll need to install `react`, `react-dom`, etc at `^16.7.0-alpha.0`

## Install

```sh
yarn add persistence-hooks
```

## Usage

### Basic Example

Let's say you want a component to read from & store state in local storage:

```jsx
import { useStateAndLocalStorage } from 'persistence-hooks'

function MyComponent() {

  const INITIAL_VALUE = 'hello world'
  const STORAGE_KEY = 'myComponentLocalStorageKey'
  
  const [value, setValue] = useStateAndLocalStorage(
    INITIAL_VALUE,
    STORAGE_KEY,
  )
  
  // use value & setValue just as you would if returned from `useState`
  // ...
  
}
```

### Available Strategies

* `useStateAndLocalStorage`
* `useStateAndSessionStorage`
* `useStateAndCookie`

### Arguments

All 3 strategies take in the following arguments:

`initial`: the default value when no value has been persisted

`key`: the entry in the given persisted strategy to set and draw from

<br />

In `useStateAndCookie`, a 3rd argument can be passed to specify expiration. Here's the same example above, but using a 10-second cookie:

```jsx
import { useStateAndCookie } from 'persistence-hooks'

function MyComponent() {

  const INITIAL_VALUE = 'hello world'
  const STORAGE_KEY = 'myComponentLocalStorageKey'
  
  const [value, setValue] = useStateAndCookie(
    INITIAL_VALUE,
    STORAGE_KEY,
    { days: 1 / 24 / 60 / 60 * 10 },
  )
  
  // ...
  
}
```

For more examples, check out the source.

Cheers 🍻