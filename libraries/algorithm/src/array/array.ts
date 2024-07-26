/**
 * @Author       : Chen Zhen
 * @Date         : 2024-03-28 01:21:51
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-26 20:31:02
 */

/* eslint-disable no-console, @typescript-eslint/no-extra-semi */

;(() => {
  // Declare arrays
  const array: Array<number> = []
  const array2: Array<number> = new Array(10).fill(0) // An array of length 10 with all elements as 0

  // Add elements
  array.push(1) // Add element to the end of the array
  array.unshift(0) // Add element to the beginning of the array
  array2.push(1) // Add element to the end of the array
  array2.unshift(0) // Add element to the beginning of the array

  // Remove elements
  array.pop() // Remove element from the end of the array
  array.shift() // Remove element from the beginning of the array
  array2.push(1) // Add element to the end of the array
  array2.unshift(0) // Add element to the beginning of the array

  // Iterate over elements
  for (let i = 0; i < array.length; i += 1) {
    const item = array[i]
    console.log(`Item: ${item}`)
  }

  array.forEach((item) => {
    console.log(`Item: ${item}`)
  })

  // Find
  array.find((n: number) => n === 0)

  array.find((n: number) => n === 1) // Find element

  // Expand array
  const arrayNew: Array<number> = array.concat([1, 2, 3])
  console.log(`ArrayNew: ${arrayNew}`)
})()
