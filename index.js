const { useState } = require('react')

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

function createCookieMethods(key, { days }) {
	return {
		set: (value) => {
			const new_value = value?.value || value
			const expiration_days = value?.days || days
			const stringified = JSON.stringify(new_value)
			let expiration = null

			if (days) {
				const currentDate = new Date()
				const expirationTime = currentDate.getTime() + expiration_days * 24 * 60 * 60 * 1000
				const expirationString = new Date(expirationTime).toUTCString()

				expiration = `; expires=${expirationString}`
			} else {
				expiration = ''
			}

			document.cookie = `${key}=${stringified}${expiration}; path=/`
		},

		get: () => {
			const cookies = document.cookie ? document.cookie.split('; ') : []
			for (let i = 0; i < cookies.length; i += 1) {
				const parts = cookies[i].split('=')
				if (parts[0] === key) {
					return JSON.parse(parts[1])
				}
			}
			return null
		},
	}
}

function useStateAndPersistence(createMethods, initial = null, key, options) {
	const { get, set } = createMethods(key, options)

	const [value, setValue] = useState(() => {
		const persistedValue = get()

		return persistedValue ? persistedValue : initial !== null ? initial : {}
	})

	return [
		value,
		(getNextValue, callback) => {
			const nextValue = typeof getNextValue === 'function' ? getNextValue(value) : getNextValue
			set(nextValue)
			setValue(nextValue)
			if (callback) callback()
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

module.exports = {
	useStateAndLocalStorage,
	useStateAndSessionStorage,
	useStateAndCookie,
}
