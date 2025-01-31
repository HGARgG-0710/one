import {
	Prototypal,
	extendPrototype,
	propertyDescriptors,
	withoutProperties
} from "./main.js"

export const classWrapper =
	<T = any, Signature extends any[] = any[]>(X: new (...args: Signature) => T) =>
	(...args: Signature) =>
		new X(...args)

export const delegateMethod =
	(delegatePropName: string) => (delegateMethodName: string) =>
		function (...delegateArgs: any[]) {
			return this[delegatePropName][delegateMethodName](...delegateArgs)
		}

export const delegateProperty = (delegatePropName: string) => (propName: string) =>
	function () {
		return this[delegatePropName][propName]
	}

export const mixin = (Extended: Prototypal, ...classes: Prototypal[]) =>
	classes.forEach((ParentClass) =>
		extendPrototype(
			Extended,
			withoutConstructor(
				propertyDescriptors(ParentClass.prototype)
			) as PropertyDescriptorMap
		)
	)

export const withoutConstructor = withoutProperties(new Set(["constructor"]))

export const calledDelegate =
	(delegatePropName: string) =>
	(delegateMethodName: string) =>
	(called: any, ...delegateArgs: any[]) =>
		called[delegatePropName][delegateMethodName].call(called, ...delegateArgs)