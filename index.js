'use strict'
const {useState, useEffect} = require('react')



function createStorageMethods(storage, key) {
  return {

    set: (value) => {
      const stringified = JSON.stringify(value)
      storage.setItem(key, stringified)
    },
    
    get: () => {
      const stringified = storage.getItem(key)
      return JSON.parse(stringified)
    },

  }
}

function createLocalStorageMethods(key) {
  return createStorageMethods(window.localStorage, key)
}

function createSessionStorageMethods(key) {
  return createStorageMethods(window.sessionStorage, key)
}

function createCookieMethods(key, options={}) {

  let { days } = options // deprecated: This is temporary while we still allow options to be passed in the 'useHook' function

  return {

    set: (value, options={}) => {
      const stringified = JSON.stringify(value)
      let expiration = null
      days = options.days || days // deprecated: This is temporary while we still allow options to be passed in the 'useHook' function
      if (days) {
        const currentDate = new Date()
        const expirationTime = currentDate.getTime() + (days * 24 * 60 * 60 * 1000)
        const expirationString = new Date(expirationTime).toUTCString()
        expiration = `; expires=${ expirationString }`
      } else {
        expiration = ''
      }
      document.cookie = `${ key }=${ stringified }${ expiration }; path=/`
    },

    get: () => {
      const cookies = document.cookie ? document.cookie.split('; ') : []
      for (let i = 0; i < cookies.length; i++) {
        const parts = cookies[i].split('=')
        if (parts[0] === key) {
          return JSON.parse(parts[1])
        }
      }
    },

  }
}



function useStateAndPersistence(createMethods, initial, key, options) {
  if( typeof options !== 'undefined' ) {
    console.warn("The use of the 'options' argument in the 'useHook' function has been deprecated. Please pass 'options' when using the 'set' function instead.")
  }

  const {get, set} = createMethods(key, options)

  const [value, setValue] = useState(() => {
    const persistedValue = get()
    return persistedValue
      ? persistedValue
      : initial
  })

  return [
    value,
    (getNextValue, callback) => {
      const nextValue = typeof getNextValue === 'function'
        ? getNextValue(value)
        : getNextValue
      set(nextValue)
      setValue(nextValue)
      callback && callback()
    },
  ]
}



function useStateAndLocalStorage(initial, key) {
  return useStateAndPersistence(createLocalStorageMethods, initial, key)
}

function useStateAndSessionStorage(initial, key) {
  return useStateAndPersistence(createSessionStorageMethods, initial, key)
}

function useStateAndCookie(initial, key, options) {
  return useStateAndPersistence(createCookieMethods, initial, key, options)
}

function useStateAndAsyncStorage(initial, key) {
  const { AsyncStorage } = require("react-native")
  const [value, setValue] = useState(initial)
  useEffect(readItemValue, [])
  function readItemValue() {
    AsyncStorage.getItem(key).then(itemValue=>setValue(itemValue))
  }
  function writeItemValue(putValue) {
    AsyncStorage.setItem(key, putValue)
    setValue(putValue)
  }
  return [value, writeItemValue]
}



module.exports = {
  useStateAndLocalStorage,
  useStateAndSessionStorage,
  useStateAndCookie,
  useStateAndAsyncStorage
}
