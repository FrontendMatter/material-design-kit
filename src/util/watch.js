export const watch = (...args) => {
	const prop = args[1]

	if (isFunction(prop)) {
		watchAll.apply(this, args)
	}
	else if (isArray(prop)) {
		watchMany.apply(this, args)
	}
	else {
		watchOne.apply(this, args)
	}
}

const isArray = (obj) => {
	return {}.toString.call(obj) === '[object Array]'
}

const isObject = (obj) => {
	return {}.toString.call(obj) === '[object Object]'
}

const isFunction = (fn) => {
	return {}.toString.call(fn) === '[object Function]'
}

const defineProp = (obj, propName, value) => {
	Object.defineProperty(obj, propName, {
		enumerable: false,
		configurable: true,
		writable: false,
		value
	})
}

const defineGetAndSet = (obj, propName, getter, setter) => {
	Object.defineProperty(obj, propName, {
		get: getter,
		set: function (value) {
			setter.call(this, value)
		},
		enumerable: true,
		configurable: true
	})
}

const callWatchers = (obj, prop, newVal, oldVal) => {
	if (prop !== undefined) {
		let wl
		let watchList = obj['__watchers__'][prop]
		if ((wl = obj['__watchers__']['__watchall__'])) {
			watchList = watchList ? watchList.concat(wl) : wl
		}
		let length = watchList ? watchList.length : 0
		for (let wr = 0; wr < length; wr++) {
			watchList[wr].call(obj, newVal, oldVal)
		}
	}
	else {
		for (let prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				callWatchers(obj, prop, newVal, oldVal)
			}
		}
	}
}

const defineWatcher = (obj, prop, watcher, level) => {
	let newWatcher = false
	let isArr = isArray(obj)

	if (obj['__watchers__'] === undefined) {
		defineProp(obj, '__watchers__', {})
		// if (isArr) {}
	}

	if (obj['__proxy__'] === undefined) {
		defineProp(obj, '__proxy__', {})
	}

	if (obj['__watchers__'][prop] === undefined) {
		obj['__watchers__'][prop] = []
		if (!isArr) {
			newWatcher = true
		}
	}

	for (let i = 0; i < obj['__watchers__'][prop].length; i++) {
		if (obj['__watchers__'][prop][i] === watcher) {
			return
		}
	}

	obj['__watchers__'][prop].push(watcher)

	if (newWatcher) {
		let descriptor = Object.getOwnPropertyDescriptor(obj, prop)
		if (descriptor !== undefined) {
			Object.defineProperty(obj['__proxy__'], prop, descriptor)
		}
		else {
			obj['__proxy__'][prop] = obj[prop]
		}
		
		const getter = function () {
			return obj['__proxy__'][prop]
		}

		const setter = function (newVal) {
			const oldVal = obj['__proxy__'][prop]

			if (level !== 0 && 
				obj[prop] && (isObject(obj[prop]) || isArray(obj[prop])) &&
				!obj[prop]['__watchers__']
				) {
				for (let i = 0; i < obj['__watchers__'][prop].length; i++) {
					watchAll(obj[prop], obj['__watchers__'][prop][i], (level === undefined ? level : level - 1))
				}
			}

			if (oldVal !== newVal) {
				obj['__proxy__'][prop] = newVal
				callWatchers(obj, prop, newVal, oldVal)
			}
		}

		defineGetAndSet(obj, prop, getter, setter)
	}
}

const watchAll = (obj, watcher, level) => {
	if (typeof obj === 'string' || (!(obj instanceof Object) && !isArray(obj))) {
		return
	}

	if (isArray(obj)) {
		defineWatcher(obj, '__watchall__', watcher, level)
		if (level === undefined || level > 0) {
			for (let prop = 0; prop < obj.length; prop++) {
				watchAll(obj[prop], watcher, level)
			}
		}
	}
	else {
		let props = []
		for (let prop in obj) {
			if (prop === '$val') {
				continue
			}

			if ({}.hasOwnProperty.call(obj, prop)) {
				props.push(prop)
			}
		}
		watchMany(obj, props, watcher, level)
	}
}

const watchOne = (obj, prop, watcher, level) => {
	if (typeof obj === 'string' || (!(obj instanceof Object) && !isArray(obj))) {
		return
	}
	if (isFunction(obj[prop])) {
		return
	}

	if (obj[prop] !== null && (level === undefined || level > 0)) {
		watchAll(obj[prop], watcher, level !== undefined ? level - 1 : level)
	}
	defineWatcher(obj, prop, watcher, level)
}

const watchMany = (obj, props, watcher, level) => {
	if (typeof obj === 'string' || (!(obj instanceof Object) && !isArray(obj))) {
		return
	}

	for (let i = 0; i < props.length; i++) {
		let prop = props[i]
		watchOne(obj, prop, watcher, level)
	}
}