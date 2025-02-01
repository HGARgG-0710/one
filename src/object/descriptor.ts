/**
 * Returns a get-set `PropertyDescriptor`
 */
export const GetSetDescriptor = (
	get: () => any,
	set: (v: any) => any
): PropertyDescriptor => ({
	get,
	set
})

/**
 * Returns a non-configurable, non-writable, non-enumerable constant property descriptor
 */
export const ConstDescriptor = (value: any): PropertyDescriptor => ({ value })

/**
 * Returns a new property descriptor using corresponding flags
 */
export const Descriptor = (
	value: any,
	configurable = false,
	writable = false,
	enumerable = false
): PropertyDescriptor => ({ value, configurable, writable, enumerable })

/**
 * Returns an enumerable property descriptor, otherwise defined by corresponding flags
 */
export const EnumerableDescriptor = (
	value: any,
	configurable?: boolean,
	writable?: boolean
) => Descriptor(value, configurable, writable, true)

/**
 * Returns a configurable property descriptor, otherwise defined by corresponding flags
 */
export const ConfigurableDescriptor = (
	value: any,
	writable?: boolean,
	enumerable?: boolean
) => Descriptor(value, true, writable, enumerable)

/**
 * Returns a writable property descriptor, otherwise defined by the given flags.
 */
export const WritableDescriptor = (
	value: any,
	configurable?: boolean,
	enumerable?: boolean
) => Descriptor(value, configurable, true, enumerable)
