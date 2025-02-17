## New expansion

### Added: 

1. array: 
	1. substitute
	2. sort
	3. keys
	4. numbers
2. functional: 
	1. argFiller
	2. copy
	3. argWaster
	4. has
	5. negate
3. object: 
	1. prop
	2. classes [module]: 
		1. classWrapper
		2. withoutConstructor
		3. mixin
		4. delegateMethod
		5. delegateProperty
		6. calledDelegate
	3. propDefine
	4. Constructor
	5. protoProp	
	6. descriptor [module]: 
		1. GetSetDescriptor
		2. ConstDescriptor
		3. Descriptor
		4. EnumerableDescriptor
		5. ConfigurableDescriptor
		6. WritableDescriptor	
	7. extendPrototype
	8. propsDefine
4. string: 
	1. charCodeAt
	2. multiSplit
5. number: 
	1. difference
		
### Removed [breaking]: 

1. object: 
	1. FullKey

### Changed [breaking]: 

1. object: 
	[signature change - removal of 'Set' parameters in favour of spread/array]
	1. withoutProperties
	2. propPreserve