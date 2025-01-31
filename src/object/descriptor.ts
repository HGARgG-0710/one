export const GetSetDescriptor = (
	get: () => any,
	set: (v: any) => any
): PropertyDescriptor => ({
	get,
	set
})

export const ConstDescriptor = (value: any): PropertyDescriptor => ({ value })

export const Descriptor = (
	value: any,
	configurable = false,
	writable = false,
	enumerable = false
): PropertyDescriptor => ({ value, configurable, writable, enumerable })

export const EnumerableDescriptor = (
	value: any,
	configurable?: boolean,
	writable?: boolean
) => Descriptor(value, configurable, writable, true)

export const ConfigurableDescriptor = (
	value: any,
	writable?: boolean,
	enumerable?: boolean
) => Descriptor(value, true, writable, enumerable)

export const WritableDescriptor = (
	value: any,
	configurable?: boolean,
	enumerable?: boolean
) => Descriptor(value, configurable, enumerable)
