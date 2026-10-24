// Execution Tracing Engine for Zecode
// Generates synchronized step-by-step state snapshots for algorithm animations

// Helper for deep clone
const clone = (obj) => JSON.parse(JSON.stringify(obj));

// 1. Two Sum Trace Generator
export function generateTwoSumTrace(nums = [2, 7, 11, 15], target = 9) {
  const steps = [];
  const seen = {};
  const arr = [...nums];

  steps.push({
    stepIndex: 0,
    action: 'init',
    description: `Initialize empty hash map 'seen = {}'. Searching for two indices summing to target = ${target}.`,
    codeLine: 2,
    highlightedIndices: [],
    pointers: {},
    variables: { target, seen: '{}' },
    data: [...arr],
    visualizerType: 'array-hashmap',
    status: 'active'
  });

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    const complement = target - num;

    steps.push({
      stepIndex: steps.length,
      action: 'check',
      description: `Index i = ${i}, num = ${num}. Calculate complement = target - num (${target} - ${num} = ${complement}). Check if ${complement} is in seen.`,
      codeLine: 4,
      highlightedIndices: [i],
      pointers: { i },
      variables: { i, num, complement, target, seen: JSON.stringify(seen) },
      data: [...arr],
      visualizerType: 'array-hashmap',
      status: 'active'
    });

    if (complement in seen) {
      const matchIndex = seen[complement];
      steps.push({
        stepIndex: steps.length,
        action: 'found',
        description: `Complement ${complement} found in seen at index ${matchIndex}! Returning [${matchIndex}, ${i}].`,
        codeLine: 6,
        highlightedIndices: [matchIndex, i],
        matchedIndices: [matchIndex, i],
        pointers: { match: matchIndex, i },
        variables: { result: `[${matchIndex}, ${i}]`, 'nums[match]': arr[matchIndex], 'nums[i]': num, sum: arr[matchIndex] + num },
        data: [...arr],
        visualizerType: 'array-hashmap',
        status: 'success'
      });
      return steps;
    }

    seen[num] = i;
    steps.push({
      stepIndex: steps.length,
      action: 'insert',
      description: `Complement ${complement} not in seen. Insert seen[${num}] = ${i}. Move to next element.`,
      codeLine: 5,
      highlightedIndices: [i],
      pointers: { i },
      variables: { i, num, seen: JSON.stringify(seen) },
      data: [...arr],
      visualizerType: 'array-hashmap',
      status: 'active'
    });
  }

  steps.push({
    stepIndex: steps.length,
    action: 'not-found',
    description: `Completed search. No pair summed to ${target}. Return [].`,
    codeLine: 7,
    highlightedIndices: [],
    pointers: {},
    variables: { result: '[]' },
    data: [...arr],
    visualizerType: 'array-hashmap',
    status: 'complete'
  });

  return steps;
}

// 2. Sort Colors Trace Generator (Dutch National Flag)
export function generateSortColorsTrace(initialNums = [2, 0, 2, 1, 1, 0]) {
  const steps = [];
  const nums = [...initialNums];
  let low = 0;
  let mid = 0;
  let high = nums.length - 1;

  steps.push({
    stepIndex: 0,
    action: 'init',
    description: `Initialize pointers: low = 0 (for 0s), mid = 0 (current scanner), high = ${high} (for 2s).`,
    codeLine: 2,
    highlightedIndices: [mid],
    pointers: { low, mid, high },
    variables: { low, mid, high, 'nums[mid]': nums[mid] },
    data: [...nums],
    visualizerType: 'array-three-pointer',
    status: 'active'
  });

  while (mid <= high) {
    const val = nums[mid];

    steps.push({
      stepIndex: steps.length,
      action: 'inspect',
      description: `Inspect nums[mid = ${mid}] = ${val}.`,
      codeLine: 4,
      highlightedIndices: [mid],
      pointers: { low, mid, high },
      variables: { low, mid, high, currentVal: val },
      data: [...nums],
      visualizerType: 'array-three-pointer',
      status: 'active'
    });

    if (val === 0) {
      steps.push({
        stepIndex: steps.length,
        action: 'swap_low',
        description: `nums[mid] is 0: Swap nums[low = ${low}] (${nums[low]}) with nums[mid = ${mid}] (${nums[mid]}). Increment low and mid.`,
        codeLine: 6,
        highlightedIndices: [low, mid],
        swapIndices: [low, mid],
        pointers: { low, mid, high },
        variables: { low, mid, high, action: 'Swap 0 to the left' },
        data: [...nums],
        visualizerType: 'array-three-pointer',
        status: 'active'
      });

      const temp = nums[low];
      nums[low] = nums[mid];
      nums[mid] = temp;
      low++;
      mid++;
    } else if (val === 1) {
      steps.push({
        stepIndex: steps.length,
        action: 'advance_mid',
        description: `nums[mid] is 1: Already in the middle section. Increment mid to ${mid + 1}.`,
        codeLine: 9,
        highlightedIndices: [mid],
        pointers: { low, mid, high },
        variables: { low, mid, high, action: 'Skip 1' },
        data: [...nums],
        visualizerType: 'array-three-pointer',
        status: 'active'
      });
      mid++;
    } else {
      steps.push({
        stepIndex: steps.length,
        action: 'swap_high',
        description: `nums[mid] is 2: Swap nums[mid = ${mid}] (${nums[mid]}) with nums[high = ${high}] (${nums[high]}). Decrement high to ${high - 1}. (Keep mid same to re-examine swapped value).`,
        codeLine: 11,
        highlightedIndices: [mid, high],
        swapIndices: [mid, high],
        pointers: { low, mid, high },
        variables: { low, mid, high, action: 'Swap 2 to the right' },
        data: [...nums],
        visualizerType: 'array-three-pointer',
        status: 'active'
      });

      const temp = nums[mid];
      nums[mid] = nums[high];
      nums[high] = temp;
      high--;
    }
  }

  steps.push({
    stepIndex: steps.length,
    action: 'finish',
    description: `mid (${mid}) has crossed high (${high}). Array is sorted into [0s, 1s, 2s] in-place!`,
    codeLine: 13,
    highlightedIndices: [],
    sortedIndices: nums.map((_, i) => i),
    pointers: {},
    variables: { status: 'Sorted' },
    data: [...nums],
    visualizerType: 'array-three-pointer',
    status: 'success'
  });

  return steps;
}

// 3. Bubble Sort Trace Generator
export function generateBubbleSortTrace(initialNums = [5, 1, 4, 2, 8]) {
  const steps = [];
  const arr = [...initialNums];
  const n = arr.length;
  const sorted = [];

  steps.push({
    stepIndex: 0,
    action: 'init',
    description: `Begin Bubble Sort on array of size ${n}. Adjacent elements will be compared and swapped if inverted.`,
    codeLine: 2,
    highlightedIndices: [],
    sortedIndices: [],
    pointers: {},
    variables: { n, i: 0 },
    data: [...arr],
    visualizerType: 'sorting',
    status: 'active'
  });

  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        stepIndex: steps.length,
        action: 'compare',
        description: `Comparing arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]}).`,
        codeLine: 5,
        highlightedIndices: [j, j + 1],
        sortedIndices: [...sorted],
        pointers: { j, 'j+1': j + 1 },
        variables: { i, j, 'arr[j]': arr[j], 'arr[j+1]': arr[j + 1] },
        data: [...arr],
        visualizerType: 'sorting',
        status: 'active'
      });

      if (arr[j] > arr[j + 1]) {
        steps.push({
          stepIndex: steps.length,
          action: 'swap',
          description: `arr[${j}] (${arr[j]}) > arr[${j + 1}] (${arr[j + 1]}): Swapping elements.`,
          codeLine: 6,
          highlightedIndices: [j, j + 1],
          swapIndices: [j, j + 1],
          sortedIndices: [...sorted],
          pointers: { j, 'j+1': j + 1 },
          variables: { i, j, action: 'Swap' },
          data: [...arr],
          visualizerType: 'sorting',
          status: 'active'
        });

        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }

    sorted.unshift(n - i - 1);
    steps.push({
      stepIndex: steps.length,
      action: 'pass_complete',
      description: `Pass ${i + 1} complete. Largest remaining element (${arr[n - i - 1]}) bubbled to final index ${n - i - 1}.`,
      codeLine: 7,
      highlightedIndices: [n - i - 1],
      sortedIndices: [...sorted],
      pointers: {},
      variables: { completedPass: i + 1, placedElement: arr[n - i - 1] },
      data: [...arr],
      visualizerType: 'sorting',
      status: 'active'
    });

    if (!swapped) {
      steps.push({
        stepIndex: steps.length,
        action: 'early_exit',
        description: 'No swaps occurred during this pass. Array is already sorted early!',
        codeLine: 8,
        highlightedIndices: [],
        sortedIndices: arr.map((_, idx) => idx),
        pointers: {},
        variables: { earlyExit: true },
        data: [...arr],
        visualizerType: 'sorting',
        status: 'success'
      });
      break;
    }
  }

  steps.push({
    stepIndex: steps.length,
    action: 'finish',
    description: 'Bubble Sort finished successfully. All elements in non-decreasing order.',
    codeLine: 9,
    highlightedIndices: [],
    sortedIndices: arr.map((_, idx) => idx),
    pointers: {},
    variables: { status: 'Sorted' },
    data: [...arr],
    visualizerType: 'sorting',
    status: 'success'
  });

  return steps;
}

// 4. Insertion Sort Trace Generator
export function generateInsertionSortTrace(initialNums = [12, 11, 13, 5, 6]) {
  const steps = [];
  const arr = [...initialNums];
  const n = arr.length;

  steps.push({
    stepIndex: 0,
    action: 'init',
    description: `Begin Insertion Sort. Element at index 0 (${arr[0]}) is trivially sorted. Starting from index 1.`,
    codeLine: 2,
    highlightedIndices: [0],
    sortedIndices: [0],
    pointers: {},
    variables: { i: 1 },
    data: [...arr],
    visualizerType: 'sorting',
    status: 'active'
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      stepIndex: steps.length,
      action: 'pick_key',
      description: `Selected key = arr[${i}] (${key}). Will find its insertion position in sorted prefix [0..${i - 1}].`,
      codeLine: 3,
      highlightedIndices: [i],
      sortedIndices: Array.from({ length: i }, (_, k) => k),
      pointers: { keyIdx: i, j },
      variables: { key, i, j },
      data: [...arr],
      visualizerType: 'sorting',
      status: 'active'
    });

    while (j >= 0 && arr[j] > key) {
      steps.push({
        stepIndex: steps.length,
        action: 'shift',
        description: `arr[${j}] (${arr[j]}) > key (${key}): Shifting arr[${j}] to index ${j + 1}.`,
        codeLine: 6,
        highlightedIndices: [j, j + 1],
        pointers: { j, 'j+1': j + 1 },
        variables: { key, shiftedVal: arr[j], targetSlot: j + 1 },
        data: [...arr],
        visualizerType: 'sorting',
        status: 'active'
      });

      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = key;
    steps.push({
      stepIndex: steps.length,
      action: 'insert',
      description: `Inserted key (${key}) into slot ${j + 1}. Sorted prefix now spans [0..${i}].`,
      codeLine: 8,
      highlightedIndices: [j + 1],
      sortedIndices: Array.from({ length: i + 1 }, (_, k) => k),
      pointers: { insertedAt: j + 1 },
      variables: { key, insertedIndex: j + 1 },
      data: [...arr],
      visualizerType: 'sorting',
      status: 'active'
    });
  }

  steps.push({
    stepIndex: steps.length,
    action: 'finish',
    description: 'Insertion Sort completed. Entire array is ordered.',
    codeLine: 9,
    highlightedIndices: [],
    sortedIndices: arr.map((_, idx) => idx),
    pointers: {},
    variables: { status: 'Complete' },
    data: [...arr],
    visualizerType: 'sorting',
    status: 'success'
  });

  return steps;
}

// 5. Selection Sort Trace Generator
export function generateSelectionSortTrace(initialNums = [64, 25, 12, 22, 11]) {
  const steps = [];
  const arr = [...initialNums];
  const n = arr.length;
  const sorted = [];

  steps.push({
    stepIndex: 0,
    action: 'init',
    description: `Begin Selection Sort. In each pass, we find the minimum element in unsorted subarray and swap to front.`,
    codeLine: 2,
    highlightedIndices: [],
    sortedIndices: [],
    pointers: {},
    variables: { n },
    data: [...arr],
    visualizerType: 'sorting',
    status: 'active'
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    steps.push({
      stepIndex: steps.length,
      action: 'start_pass',
      description: `Pass ${i + 1}: Assume current element arr[${i}] (${arr[i]}) is minimum. Scanning [${i + 1}..${n - 1}].`,
      codeLine: 4,
      highlightedIndices: [i],
      sortedIndices: [...sorted],
      pointers: { i, minIdx },
      variables: { i, minIdx, currentMin: arr[minIdx] },
      data: [...arr],
      visualizerType: 'sorting',
      status: 'active'
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        stepIndex: steps.length,
        action: 'compare',
        description: `Compare arr[${j}] (${arr[j]}) with current minimum arr[${minIdx}] (${arr[minIdx]}).`,
        codeLine: 6,
        highlightedIndices: [j, minIdx],
        sortedIndices: [...sorted],
        pointers: { i, minIdx, j },
        variables: { i, j, minIdx, 'arr[j]': arr[j], 'arr[min]': arr[minIdx] },
        data: [...arr],
        visualizerType: 'sorting',
        status: 'active'
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          stepIndex: steps.length,
          action: 'new_min',
          description: `Found new minimum: arr[${minIdx}] = ${arr[minIdx]}.`,
          codeLine: 7,
          highlightedIndices: [minIdx],
          sortedIndices: [...sorted],
          pointers: { i, minIdx },
          variables: { newMin: arr[minIdx], minIdx },
          data: [...arr],
          visualizerType: 'sorting',
          status: 'active'
        });
      }
    }

    if (minIdx !== i) {
      steps.push({
        stepIndex: steps.length,
        action: 'swap',
        description: `Swap minimum element (${arr[minIdx]}) at index ${minIdx} with arr[${i}] (${arr[i]}).`,
        codeLine: 9,
        highlightedIndices: [i, minIdx],
        swapIndices: [i, minIdx],
        sortedIndices: [...sorted],
        pointers: { i, minIdx },
        variables: { swap: `arr[${i}] <-> arr[${minIdx}]` },
        data: [...arr],
        visualizerType: 'sorting',
        status: 'active'
      });

      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
    }

    sorted.push(i);
  }
  sorted.push(n - 1);

  steps.push({
    stepIndex: steps.length,
    action: 'finish',
    description: 'Selection Sort completed! Array is fully sorted.',
    codeLine: 10,
    highlightedIndices: [],
    sortedIndices: arr.map((_, idx) => idx),
    pointers: {},
    variables: { status: 'Sorted' },
    data: [...arr],
    visualizerType: 'sorting',
    status: 'success'
  });

  return steps;
}

// 6. Binary Search Trace Generator
export function generateBinarySearchTrace(nums = [-1, 0, 3, 5, 9, 12], target = 9) {
  const steps = [];
  const arr = [...nums];
  let low = 0;
  let high = arr.length - 1;

  steps.push({
    stepIndex: 0,
    action: 'init',
    description: `Binary Search initialized with target = ${target}. Search space: [0..${high}].`,
    codeLine: 2,
    highlightedIndices: [],
    pointers: { low, high },
    variables: { low, high, target },
    data: [...arr],
    visualizerType: 'binary-search',
    status: 'active'
  });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midVal = arr[mid];

    steps.push({
      stepIndex: steps.length,
      action: 'calc_mid',
      description: `Calculated mid = (${low} + ${high}) // 2 = ${mid}. Inspecting arr[${mid}] = ${midVal}.`,
      codeLine: 4,
      highlightedIndices: [mid],
      searchRange: [low, high],
      pointers: { low, mid, high },
      variables: { low, mid, high, midVal, target },
      data: [...arr],
      visualizerType: 'binary-search',
      status: 'active'
    });

    if (midVal === target) {
      steps.push({
        stepIndex: steps.length,
        action: 'found',
        description: `Target ${target} found at index ${mid}! Returning ${mid}.`,
        codeLine: 5,
        highlightedIndices: [mid],
        matchedIndices: [mid],
        pointers: { found: mid },
        variables: { resultIndex: mid, target },
        data: [...arr],
        visualizerType: 'binary-search',
        status: 'success'
      });
      return steps;
    } else if (midVal < target) {
      steps.push({
        stepIndex: steps.length,
        action: 'move_right',
        description: `arr[${mid}] (${midVal}) < target (${target}). Target lies in right half. Setting low = mid + 1 (${mid + 1}).`,
        codeLine: 7,
        highlightedIndices: [mid],
        searchRange: [low, high],
        pointers: { low: mid + 1, high },
        variables: { low: mid + 1, high, target },
        data: [...arr],
        visualizerType: 'binary-search',
        status: 'active'
      });
      low = mid + 1;
    } else {
      steps.push({
        stepIndex: steps.length,
        action: 'move_left',
        description: `arr[${mid}] (${midVal}) > target (${target}). Target lies in left half. Setting high = mid - 1 (${mid - 1}).`,
        codeLine: 9,
        highlightedIndices: [mid],
        searchRange: [low, high],
        pointers: { low, high: mid - 1 },
        variables: { low, high: mid - 1, target },
        data: [...arr],
        visualizerType: 'binary-search',
        status: 'active'
      });
      high = mid - 1;
    }
  }

  steps.push({
    stepIndex: steps.length,
    action: 'not_found',
    description: `low (${low}) has exceeded high (${high}). Target ${target} does not exist in array. Returning -1.`,
    codeLine: 11,
    highlightedIndices: [],
    pointers: {},
    variables: { result: -1 },
    data: [...arr],
    visualizerType: 'binary-search',
    status: 'complete'
  });

  return steps;
}

// 7. Best Time to Buy and Sell Stock Trace Generator
export function generateStockProfitTrace(prices = [7, 1, 5, 3, 6, 4]) {
  const steps = [];
  let minPrice = Infinity;
  let maxProfit = 0;
  let buyDay = 0;
  let bestBuy = 0;
  let bestSell = 0;

  steps.push({
    stepIndex: 0,
    action: 'init',
    description: 'Initialize minPrice = Infinity, maxProfit = 0. We will scan prices day-by-day.',
    codeLine: 2,
    highlightedIndices: [],
    pointers: {},
    variables: { minPrice: 'Infinity', maxProfit: 0 },
    data: [...prices],
    visualizerType: 'stock',
    status: 'active'
  });

  for (let i = 0; i < prices.length; i++) {
    const price = prices[i];

    steps.push({
      stepIndex: steps.length,
      action: 'inspect_day',
      description: `Day ${i}: price = $${price}.`,
      codeLine: 4,
      highlightedIndices: [i],
      pointers: { currentDay: i, bestBuyDay: bestBuy },
      variables: { day: i, currentPrice: price, minPrice: minPrice === Infinity ? 'None' : minPrice, maxProfit },
      data: [...prices],
      visualizerType: 'stock',
      status: 'active'
    });

    if (price < minPrice) {
      minPrice = price;
      buyDay = i;
      steps.push({
        stepIndex: steps.length,
        action: 'new_min',
        description: `Found lower buy price $${price} on Day ${i}. Updating minPrice = $${price}.`,
        codeLine: 5,
        highlightedIndices: [i],
        pointers: { buyDay: i },
        variables: { minPrice, maxProfit, buyDay: i },
        data: [...prices],
        visualizerType: 'stock',
        status: 'active'
      });
    } else {
      const profit = price - minPrice;
      if (profit > maxProfit) {
        maxProfit = profit;
        bestBuy = buyDay;
        bestSell = i;
        steps.push({
          stepIndex: steps.length,
          action: 'new_max_profit',
          description: `Selling on Day ${i} ($${price}) with buy on Day ${buyDay} ($${minPrice}) gives profit = $${profit}. Updating maxProfit = $${maxProfit}!`,
          codeLine: 7,
          highlightedIndices: [bestBuy, i],
          pointers: { buy: bestBuy, sell: i },
          variables: { buyPrice: minPrice, sellPrice: price, profit, maxProfit },
          data: [...prices],
          visualizerType: 'stock',
          status: 'active'
        });
      }
    }
  }

  steps.push({
    stepIndex: steps.length,
    action: 'finish',
    description: `Completed stock analysis. Maximum achievable profit is $${maxProfit} (Buy Day ${bestBuy}, Sell Day ${bestSell}).`,
    codeLine: 9,
    highlightedIndices: maxProfit > 0 ? [bestBuy, bestSell] : [],
    pointers: maxProfit > 0 ? { buy: bestBuy, sell: bestSell } : {},
    variables: { maxProfit, buyDay: bestBuy, sellDay: bestSell },
    data: [...prices],
    visualizerType: 'stock',
    status: 'success'
  });

  return steps;
}

// 8. Maximum Subarray (Kadane's Algorithm)
export function generateMaxSubarrayTrace(nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]) {
  const steps = [];
  let currentSum = nums[0];
  let maxSum = nums[0];
  let startIdx = 0;
  let bestStart = 0;
  let bestEnd = 0;

  steps.push({
    stepIndex: 0,
    action: 'init',
    description: `Initialize Kadane's algorithm. currentSum = nums[0] (${nums[0]}), maxSum = ${nums[0]}.`,
    codeLine: 2,
    highlightedIndices: [0],
    pointers: { i: 0 },
    variables: { currentSum, maxSum },
    data: [...nums],
    visualizerType: 'subarray',
    status: 'active'
  });

  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];

    if (num > currentSum + num) {
      currentSum = num;
      startIdx = i;
      steps.push({
        stepIndex: steps.length,
        action: 'reset_subarray',
        description: `num (${num}) > currentSum + num (${currentSum - num + num}): Resetting subarray to start fresh at index ${i}. currentSum = ${currentSum}.`,
        codeLine: 5,
        highlightedIndices: [i],
        pointers: { i, start: startIdx },
        variables: { i, num, currentSum, maxSum },
        data: [...nums],
        visualizerType: 'subarray',
        status: 'active'
      });
    } else {
      currentSum += num;
      steps.push({
        stepIndex: steps.length,
        action: 'extend_subarray',
        description: `Extending running subarray to index ${i}. currentSum += ${num} -> ${currentSum}.`,
        codeLine: 5,
        highlightedIndices: Array.from({ length: i - startIdx + 1 }, (_, k) => startIdx + k),
        pointers: { start: startIdx, end: i },
        variables: { i, num, currentSum, maxSum },
        data: [...nums],
        visualizerType: 'subarray',
        status: 'active'
      });
    }

    if (currentSum > maxSum) {
      maxSum = currentSum;
      bestStart = startIdx;
      bestEnd = i;
      steps.push({
        stepIndex: steps.length,
        action: 'update_max',
        description: `currentSum (${currentSum}) > maxSum: New maximum sum recorded! maxSum = ${maxSum}.`,
        codeLine: 6,
        highlightedIndices: Array.from({ length: bestEnd - bestStart + 1 }, (_, k) => bestStart + k),
        pointers: { bestStart, bestEnd },
        variables: { currentSum, maxSum, subarray: `nums[${bestStart}..${bestEnd}]` },
        data: [...nums],
        visualizerType: 'subarray',
        status: 'active'
      });
    }
  }

  steps.push({
    stepIndex: steps.length,
    action: 'finish',
    description: `Kadane's algorithm complete. Maximum Subarray Sum is ${maxSum} (elements from index ${bestStart} to ${bestEnd}).`,
    codeLine: 7,
    highlightedIndices: Array.from({ length: bestEnd - bestStart + 1 }, (_, k) => bestStart + k),
    pointers: { bestStart, bestEnd },
    variables: { maxSum, bestStart, bestEnd },
    data: [...nums],
    visualizerType: 'subarray',
    status: 'success'
  });

  return steps;
}

// 9. Reverse Linked List Trace Generator
export function generateReverseLinkedListTrace(nodes = [1, 2, 3, 4, 5]) {
  const steps = [];
  const list = nodes.map((val, idx) => ({ id: idx, val, next: idx < nodes.length - 1 ? idx + 1 : null }));
  let prev = null;
  let curr = 0;

  steps.push({
    stepIndex: 0,
    action: 'init',
    description: 'Initialize prev = null, curr = head (Node 1). We will iteratively reverse pointers.',
    codeLine: 2,
    pointers: { prev: 'null', curr: 0 },
    variables: { prev: 'null', curr: `Node(${nodes[0]})` },
    data: clone(list),
    visualizerType: 'linked-list',
    status: 'active'
  });

  while (curr !== null && curr < list.length) {
    const nextNode = list[curr].next;

    steps.push({
      stepIndex: steps.length,
      action: 'save_next',
      description: `curr is Node(${list[curr].val}). Save reference to next node: nxt = ${nextNode !== null ? `Node(${list[nextNode].val})` : 'null'}.`,
      codeLine: 4,
      pointers: { prev: prev !== null ? prev : 'null', curr, nxt: nextNode !== null ? nextNode : 'null' },
      variables: { currVal: list[curr].val, nextVal: nextNode !== null ? list[nextNode].val : 'null' },
      data: clone(list),
      visualizerType: 'linked-list',
      status: 'active'
    });

    list[curr].next = prev;
    steps.push({
      stepIndex: steps.length,
      action: 'reverse_pointer',
      description: `Reverse link: Node(${list[curr].val}).next now points to prev (${prev !== null ? `Node(${list[prev].val})` : 'null'}).`,
      codeLine: 5,
      pointers: { prev: prev !== null ? prev : 'null', curr, nxt: nextNode !== null ? nextNode : 'null' },
      variables: { 'curr.next': prev !== null ? `Node(${list[prev].val})` : 'null' },
      data: clone(list),
      visualizerType: 'linked-list',
      status: 'active'
    });

    prev = curr;
    curr = nextNode;
    steps.push({
      stepIndex: steps.length,
      action: 'advance_pointers',
      description: `Advance pointers: prev moves to Node(${list[prev].val}), curr moves to ${curr !== null ? `Node(${list[curr].val})` : 'null'}.`,
      codeLine: 6,
      pointers: { prev, curr: curr !== null ? curr : 'null' },
      variables: { prev: `Node(${list[prev].val})`, curr: curr !== null ? `Node(${list[curr].val})` : 'null' },
      data: clone(list),
      visualizerType: 'linked-list',
      status: 'active'
    });
  }

  steps.push({
    stepIndex: steps.length,
    action: 'finish',
    description: `curr is null. Reversal complete! New head is Node(${list[prev].val}). Returning prev.`,
    codeLine: 8,
    pointers: { newHead: prev },
    variables: { newHead: `Node(${list[prev].val})` },
    data: clone(list),
    visualizerType: 'linked-list',
    status: 'success'
  });

  return steps;
}

// 10. Valid Parentheses Trace Generator
export function generateValidParenthesesTrace(str = '()[]{}') {
  const steps = [];
  const stack = [];
  const pairs = { ')': '(', '}': '{', ']': '[' };

  steps.push({
    stepIndex: 0,
    action: 'init',
    description: `Initialize empty stack: []. Validating parentheses in "${str}".`,
    codeLine: 2,
    pointers: {},
    variables: { stack: '[]', string: str },
    data: { string: str, currentIndex: -1, stack: [] },
    visualizerType: 'stack',
    status: 'active'
  });

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char in pairs) {
      const top = stack.length > 0 ? stack[stack.length - 1] : null;
      const expected = pairs[char];

      if (!top || top !== expected) {
        steps.push({
          stepIndex: steps.length,
          action: 'mismatch',
          description: `Encountered closing bracket '${char}', but stack top is '${top || 'empty'}' (expected '${expected}'). Mismatch!`,
          codeLine: 7,
          pointers: { i },
          variables: { char, top: top || 'empty', expected, valid: false },
          data: { string: str, currentIndex: i, stack: [...stack], error: true },
          visualizerType: 'stack',
          status: 'error'
        });
        return steps;
      }

      stack.pop();
      steps.push({
        stepIndex: steps.length,
        action: 'pop_match',
        description: `Encountered closing bracket '${char}'. Matched with opening '${top}' on stack top. Popped successfully!`,
        codeLine: 9,
        pointers: { i },
        variables: { char, popped: top, stackDepth: stack.length },
        data: { string: str, currentIndex: i, stack: [...stack] },
        visualizerType: 'stack',
        status: 'active'
      });
    } else {
      stack.push(char);
      steps.push({
        stepIndex: steps.length,
        action: 'push',
        description: `Encountered open bracket '${char}'. Pushed onto stack. Stack depth = ${stack.length}.`,
        codeLine: 11,
        pointers: { i },
        variables: { pushed: char, stack: JSON.stringify(stack) },
        data: { string: str, currentIndex: i, stack: [...stack] },
        visualizerType: 'stack',
        status: 'active'
      });
    }
  }

  const isValid = stack.length === 0;
  steps.push({
    stepIndex: steps.length,
    action: 'finish',
    description: isValid
      ? 'All brackets parsed and stack is empty. String is VALID!'
      : `Parsing complete but stack still contains unclosed brackets (${JSON.stringify(stack)}). String is INVALID.`,
    codeLine: 12,
    pointers: {},
    variables: { isValid, finalStack: JSON.stringify(stack) },
    data: { string: str, currentIndex: str.length - 1, stack: [...stack] },
    visualizerType: 'stack',
    status: isValid ? 'success' : 'error'
  });

  return steps;
}

// 11. Move Zeroes Trace Generator
export function generateMoveZeroesTrace(nums = [0, 1, 0, 3, 12]) {
  const steps = [];
  const arr = [...nums];
  let insertPos = 0;

  steps.push({
    stepIndex: 0,
    action: 'init',
    description: 'Initialize insertPos = 0. We will scan the array; whenever arr[i] != 0, swap it into insertPos and advance.',
    codeLine: 2,
    highlightedIndices: [],
    pointers: { insertPos, i: 0 },
    variables: { insertPos, i: 0 },
    data: [...arr],
    visualizerType: 'sorting',
    status: 'active'
  });

  for (let i = 0; i < arr.length; i++) {
    steps.push({
      stepIndex: steps.length,
      action: 'inspect',
      description: `Inspect arr[${i}] = ${arr[i]}.`,
      codeLine: 3,
      highlightedIndices: [i],
      pointers: { insertPos, i },
      variables: { i, insertPos, val: arr[i] },
      data: [...arr],
      visualizerType: 'sorting',
      status: 'active'
    });

    if (arr[i] !== 0) {
      if (i !== insertPos) {
        steps.push({
          stepIndex: steps.length,
          action: 'swap_non_zero',
          description: `arr[${i}] (${arr[i]}) is non-zero: Swap with arr[${insertPos}] (${arr[insertPos]}). Advance insertPos to ${insertPos + 1}.`,
          codeLine: 5,
          highlightedIndices: [insertPos, i],
          swapIndices: [insertPos, i],
          pointers: { insertPos, i },
          variables: { action: 'Swap non-zero to insertPos', nonZero: arr[i] },
          data: [...arr],
          visualizerType: 'sorting',
          status: 'active'
        });

        const temp = arr[insertPos];
        arr[insertPos] = arr[i];
        arr[i] = temp;
      }
      insertPos++;
    }
  }

  steps.push({
    stepIndex: steps.length,
    action: 'finish',
    description: 'All non-zero elements shifted forward in-place, and zeros preserved at the back!',
    codeLine: 7,
    highlightedIndices: [],
    sortedIndices: arr.map((_, idx) => idx),
    pointers: {},
    variables: { status: 'Complete' },
    data: [...arr],
    visualizerType: 'sorting',
    status: 'success'
  });

  return steps;
}

// 12. Remove Duplicates from Sorted Array
export function generateRemoveDuplicatesTrace(nums = [1, 1, 2, 2, 3, 4, 4]) {
  const steps = [];
  const arr = [...nums];
  let k = 0;

  steps.push({
    stepIndex: 0,
    action: 'init',
    description: `Initialize slow pointer k = 0. arr[0] (${arr[0]}) is the first unique element.`,
    codeLine: 3,
    highlightedIndices: [0],
    pointers: { k, i: 1 },
    variables: { k, uniqueCount: 1 },
    data: [...arr],
    visualizerType: 'sorting',
    status: 'active'
  });

  for (let i = 1; i < arr.length; i++) {
    steps.push({
      stepIndex: steps.length,
      action: 'compare',
      description: `Compare arr[${i}] (${arr[i]}) with last unique element arr[k = ${k}] (${arr[k]}).`,
      codeLine: 4,
      highlightedIndices: [k, i],
      pointers: { k, i },
      variables: { k, i, 'arr[k]': arr[k], 'arr[i]': arr[i] },
      data: [...arr],
      visualizerType: 'sorting',
      status: 'active'
    });

    if (arr[i] !== arr[k]) {
      k++;
      arr[k] = arr[i];
      steps.push({
        stepIndex: steps.length,
        action: 'write_unique',
        description: `Unique element discovered! Increment k to ${k} and write arr[${k}] = ${arr[i]}.`,
        codeLine: 6,
        highlightedIndices: [k],
        pointers: { k, i },
        variables: { k, uniqueElement: arr[k], uniqueCount: k + 1 },
        data: [...arr],
        visualizerType: 'sorting',
        status: 'active'
      });
    }
  }

  steps.push({
    stepIndex: steps.length,
    action: 'finish',
    description: `Finished scanning array. First ${k + 1} slots contain unique elements: [${arr.slice(0, k + 1).join(', ')}]. Return k = ${k + 1}.`,
    codeLine: 8,
    highlightedIndices: Array.from({ length: k + 1 }, (_, idx) => idx),
    sortedIndices: Array.from({ length: k + 1 }, (_, idx) => idx),
    pointers: { k },
    variables: { k: k + 1, uniqueSubarray: arr.slice(0, k + 1) },
    data: [...arr],
    visualizerType: 'sorting',
    status: 'success'
  });

  return steps;
}

// 13. Missing Number
export function generateMissingNumberTrace(nums = [3, 0, 1]) {
  const steps = [];
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  let runningSum = 0;

  steps.push({
    stepIndex: 0,
    action: 'init',
    description: `Array size n = ${n}. Expected sum of numbers [0..${n}] is n*(n+1)//2 = ${n}*${n + 1}//2 = ${expectedSum}.`,
    codeLine: 2,
    highlightedIndices: [],
    pointers: {},
    variables: { n, expectedSum, runningSum: 0 },
    data: [...nums],
    visualizerType: 'sorting',
    status: 'active'
  });

  for (let i = 0; i < nums.length; i++) {
    runningSum += nums[i];
    steps.push({
      stepIndex: steps.length,
      action: 'add_num',
      description: `Index ${i}: Add nums[${i}] (${nums[i]}) to runningSum. runningSum = ${runningSum}.`,
      codeLine: 3,
      highlightedIndices: [i],
      pointers: { i },
      variables: { i, num: nums[i], runningSum, expectedSum },
      data: [...nums],
      visualizerType: 'sorting',
      status: 'active'
    });
  }

  const missing = expectedSum - runningSum;
  steps.push({
    stepIndex: steps.length,
    action: 'calculate_missing',
    description: `Missing Number = expectedSum - actualSum (${expectedSum} - ${runningSum} = ${missing}). Returning ${missing}.`,
    codeLine: 4,
    highlightedIndices: [],
    pointers: {},
    variables: { expectedSum, actualSum: runningSum, missingNumber: missing },
    data: [...nums],
    visualizerType: 'sorting',
    status: 'success'
  });

  return steps;
}

// 14. Binary Tree Traversal & Tree Depth Traces
export function generateTreeDepthTrace() {
  const steps = [];
  const nodes = [
    { id: '1', val: 3, left: '2', right: '3', depth: 1 },
    { id: '2', val: 9, left: null, right: null, depth: 2 },
    { id: '3', val: 20, left: '4', right: '5', depth: 2 },
    { id: '4', val: 15, left: null, right: null, depth: 3 },
    { id: '5', val: 7, left: null, right: null, depth: 3 }
  ];

  steps.push({
    stepIndex: 0,
    action: 'init',
    description: 'Begin recursive depth calculation from root Node(3).',
    codeLine: 1,
    activeNodeId: '1',
    callStack: ['maxDepth(3)'],
    variables: { root: 'Node(3)', currentMax: 0 },
    data: nodes,
    visualizerType: 'tree',
    status: 'active'
  });

  steps.push({
    stepIndex: 1,
    action: 'visit_left',
    description: 'Recurse left child: maxDepth(9).',
    codeLine: 4,
    activeNodeId: '2',
    callStack: ['maxDepth(3)', 'maxDepth(9)'],
    variables: { currentNode: 'Node(9)', isLeaf: true },
    data: nodes,
    visualizerType: 'tree',
    status: 'active'
  });

  steps.push({
    stepIndex: 2,
    action: 'return_leaf',
    description: 'Node(9) has no children. Base cases return 0. Depth of Node(9) = 1 + max(0, 0) = 1.',
    codeLine: 6,
    activeNodeId: '2',
    callStack: ['maxDepth(3)'],
    variables: { 'leftDepth(3)': 1 },
    data: nodes,
    visualizerType: 'tree',
    status: 'active'
  });

  steps.push({
    stepIndex: 3,
    action: 'visit_right',
    description: 'Recurse right child: maxDepth(20).',
    codeLine: 5,
    activeNodeId: '3',
    callStack: ['maxDepth(3)', 'maxDepth(20)'],
    variables: { currentNode: 'Node(20)' },
    data: nodes,
    visualizerType: 'tree',
    status: 'active'
  });

  steps.push({
    stepIndex: 4,
    action: 'visit_leaf_left',
    description: 'Recurse Node(20).left: maxDepth(15). Leaf node returns depth = 1.',
    codeLine: 4,
    activeNodeId: '4',
    callStack: ['maxDepth(3)', 'maxDepth(20)', 'maxDepth(15)'],
    variables: { 'depth(15)': 1 },
    data: nodes,
    visualizerType: 'tree',
    status: 'active'
  });

  steps.push({
    stepIndex: 5,
    action: 'visit_leaf_right',
    description: 'Recurse Node(20).right: maxDepth(7). Leaf node returns depth = 1.',
    codeLine: 5,
    activeNodeId: '5',
    callStack: ['maxDepth(3)', 'maxDepth(20)', 'maxDepth(7)'],
    variables: { 'depth(7)': 1 },
    data: nodes,
    visualizerType: 'tree',
    status: 'active'
  });

  steps.push({
    stepIndex: 6,
    action: 'return_subtree',
    description: 'Node(20) combines: 1 + max(depth(15), depth(7)) = 1 + max(1, 1) = 2.',
    codeLine: 6,
    activeNodeId: '3',
    callStack: ['maxDepth(3)'],
    variables: { 'rightDepth(3)': 2 },
    data: nodes,
    visualizerType: 'tree',
    status: 'active'
  });

  steps.push({
    stepIndex: 7,
    action: 'finish',
    description: 'Root Node(3) calculates: 1 + max(leftDepth=1, rightDepth=2) = 3. Maximum depth of binary tree is 3.',
    codeLine: 6,
    activeNodeId: '1',
    callStack: [],
    variables: { maxDepth: 3 },
    data: nodes,
    visualizerType: 'tree',
    status: 'success'
  });

  return steps;
}

// 15. Inorder Traversal Trace
export function generateInorderTraversalTrace() {
  const steps = [];
  const nodes = [
    { id: '1', val: 1, left: null, right: '2' },
    { id: '2', val: 2, left: '3', right: null },
    { id: '3', val: 3, left: null, right: null }
  ];
  const traversal = [];

  steps.push({
    stepIndex: 0,
    action: 'init',
    description: 'Start Inorder Traversal (Left -> Root -> Right) from root Node(1).',
    codeLine: 2,
    activeNodeId: '1',
    traversalResult: [...traversal],
    data: nodes,
    visualizerType: 'tree',
    status: 'active'
  });

  steps.push({
    stepIndex: 1,
    action: 'visit_node',
    description: 'Node(1) left child is null. Record root value 1 into traversal list.',
    codeLine: 5,
    activeNodeId: '1',
    traversalResult: [1],
    data: nodes,
    visualizerType: 'tree',
    status: 'active'
  });

  steps.push({
    stepIndex: 2,
    action: 'move_right',
    description: 'Traverse to right subtree: Node(2).',
    codeLine: 6,
    activeNodeId: '2',
    traversalResult: [1],
    data: nodes,
    visualizerType: 'tree',
    status: 'active'
  });

  steps.push({
    stepIndex: 3,
    action: 'move_left_subtree',
    description: 'Node(2) has left child: Recurse to Node(3).',
    codeLine: 4,
    activeNodeId: '3',
    traversalResult: [1],
    data: nodes,
    visualizerType: 'tree',
    status: 'active'
  });

  steps.push({
    stepIndex: 4,
    action: 'visit_node',
    description: 'Node(3) left is null. Record value 3 into traversal list.',
    codeLine: 5,
    activeNodeId: '3',
    traversalResult: [1, 3],
    data: nodes,
    visualizerType: 'tree',
    status: 'active'
  });

  steps.push({
    stepIndex: 5,
    action: 'backtrack_visit',
    description: 'Return to Node(2). Left subtree finished. Record Node(2) value into traversal list.',
    codeLine: 5,
    activeNodeId: '2',
    traversalResult: [1, 3, 2],
    data: nodes,
    visualizerType: 'tree',
    status: 'active'
  });

  steps.push({
    stepIndex: 6,
    action: 'finish',
    description: 'Inorder Traversal complete! Final sequence: [1, 3, 2].',
    codeLine: 7,
    activeNodeId: null,
    traversalResult: [1, 3, 2],
    data: nodes,
    visualizerType: 'tree',
    status: 'success'
  });

  return steps;
}

// 16. Flood Fill Trace Generator (Matrix / Graph)
export function generateFloodFillTrace(
  initialGrid = [
    [1, 1, 1],
    [1, 1, 0],
    [1, 0, 1]
  ],
  sr = 1,
  sc = 1,
  newColor = 2
) {
  const steps = [];
  const grid = clone(initialGrid);
  const R = grid.length;
  const C = grid[0].length;
  const origColor = grid[sr][sc];

  steps.push({
    stepIndex: 0,
    action: 'init',
    description: `Start Flood Fill at (sr=${sr}, sc=${sc}). Original pixel color = ${origColor}, new replacement color = ${newColor}.`,
    codeLine: 2,
    activeCell: { r: sr, c: sc },
    visitedCells: [],
    variables: { sr, sc, origColor, newColor },
    data: clone(grid),
    visualizerType: 'grid',
    status: 'active'
  });

  const queue = [{ r: sr, c: sc }];
  const visited = new Set();
  visited.add(`${sr},${sc}`);
  grid[sr][sc] = newColor;

  steps.push({
    stepIndex: 1,
    action: 'fill_start',
    description: `Color starting pixel (${sr}, ${sc}) with color ${newColor}.`,
    codeLine: 7,
    activeCell: { r: sr, c: sc },
    visitedCells: Array.from(visited).map(s => {
      const [r, c] = s.split(',').map(Number);
      return { r, c };
    }),
    variables: { filled: `(${sr}, ${sc})` },
    data: clone(grid),
    visualizerType: 'grid',
    status: 'active'
  });

  const dirs = [
    [-1, 0, 'UP'],
    [1, 0, 'DOWN'],
    [0, -1, 'LEFT'],
    [0, 1, 'RIGHT']
  ];

  while (queue.length > 0) {
    const { r, c } = queue.shift();

    for (const [dr, dc, dirName] of dirs) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr >= 0 && nr < R && nc >= 0 && nc < C) {
        if (!visited.has(`${nr},${nc}`) && grid[nr][nc] === origColor) {
          visited.add(`${nr},${nc}`);
          grid[nr][nc] = newColor;
          queue.push({ r: nr, c: nc });

          steps.push({
            stepIndex: steps.length,
            action: 'expand_cell',
            description: `Expand ${dirName} to neighbor (${nr}, ${nc}): Has original color ${origColor}. Filled with ${newColor}.`,
            codeLine: 8,
            activeCell: { r: nr, c: nc },
            visitedCells: Array.from(visited).map(s => {
              const [row, col] = s.split(',').map(Number);
              return { r: row, c: col };
            }),
            variables: { current: `(${r}, ${c})`, expandedTo: `(${nr}, ${nc})`, direction: dirName },
            data: clone(grid),
            visualizerType: 'grid',
            status: 'active'
          });
        }
      }
    }
  }

  steps.push({
    stepIndex: steps.length,
    action: 'finish',
    description: `Flood Fill complete! All 4-directionally connected pixels with color ${origColor} have been transformed to ${newColor}.`,
    codeLine: 9,
    activeCell: null,
    visitedCells: Array.from(visited).map(s => {
      const [r, c] = s.split(',').map(Number);
      return { r, c };
    }),
    variables: { totalFilled: visited.size },
    data: clone(grid),
    visualizerType: 'grid',
    status: 'success'
  });

  return steps;
}

// 17. Majority Element Trace Generator (Boyer-Moore Voting)
export function generateMajorityElementTrace(initialNums = [2, 2, 1, 1, 1, 2, 2]) {
  const steps = [];
  const nums = [...initialNums];
  let candidate = null;
  let count = 0;

  steps.push({
    stepIndex: 0,
    action: 'init',
    description: 'Boyer-Moore Voting Algorithm: Initialize candidate = None, count = 0.',
    codeLine: 2,
    highlightedIndices: [],
    pointers: {},
    variables: { candidate: 'None', count: 0 },
    data: [...nums],
    visualizerType: 'array',
    status: 'active'
  });

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    if (count === 0) {
      candidate = num;
      steps.push({
        stepIndex: steps.length,
        action: 'new_candidate',
        description: `Count is 0! Set new candidate = nums[i = ${i}] (${num}).`,
        codeLine: 6,
        highlightedIndices: [i],
        pointers: { i },
        variables: { i, num, candidate, count },
        data: [...nums],
        visualizerType: 'array',
        status: 'active'
      });
    }

    const matched = num === candidate;
    count += matched ? 1 : -1;

    steps.push({
      stepIndex: steps.length,
      action: matched ? 'vote_up' : 'vote_down',
      description: matched
        ? `nums[${i}] = ${num} matches candidate (${candidate}). Increment count to ${count}.`
        : `nums[${i}] = ${num} differs from candidate (${candidate}). Cancel out vote: count decreases to ${count}.`,
      codeLine: 7,
      highlightedIndices: [i],
      pointers: { i },
      variables: { i, num, candidate, count, status: matched ? 'Match (+1)' : 'Diff (-1)' },
      data: [...nums],
      visualizerType: 'array',
      status: 'active'
    });
  }

  steps.push({
    stepIndex: steps.length,
    action: 'finish',
    description: `Linear scan complete! Majority element confirmed: ${candidate} (count: ${count}).`,
    codeLine: 8,
    highlightedIndices: nums.map((v, idx) => (v === candidate ? idx : null)).filter((v) => v !== null),
    pointers: {},
    variables: { majorityElement: candidate },
    data: [...nums],
    visualizerType: 'array',
    status: 'success'
  });

  return steps;
}

// 18. Leaders in an Array Trace Generator
export function generateLeadersTrace(initialNums = [16, 17, 4, 3, 5, 2]) {
  const steps = [];
  const nums = [...initialNums];
  const leaders = [];
  let maxRight = -Infinity;

  steps.push({
    stepIndex: 0,
    action: 'init',
    description: 'Scanning from right to left. Rightmost element is always a leader. Initial maxRight = -Infinity.',
    codeLine: 3,
    highlightedIndices: [],
    pointers: {},
    variables: { maxRight: '-Infinity', leaders: '[]' },
    data: [...nums],
    visualizerType: 'array',
    status: 'active'
  });

  for (let i = nums.length - 1; i >= 0; i--) {
    const val = nums[i];
    const isLeader = val > maxRight;

    steps.push({
      stepIndex: steps.length,
      action: 'inspect',
      description: `Checking index ${i} (value ${val}) against current maxRight (${maxRight === -Infinity ? 'None' : maxRight}).`,
      codeLine: 5,
      highlightedIndices: [i],
      pointers: { current: i },
      variables: { i, val, maxRight: maxRight === -Infinity ? 'None' : maxRight },
      data: [...nums],
      visualizerType: 'array',
      status: 'active'
    });

    if (isLeader) {
      leaders.push(val);
      maxRight = val;
      steps.push({
        stepIndex: steps.length,
        action: 'found_leader',
        description: `Found leader! ${val} > previous maxRight. Updated maxRight = ${maxRight}.`,
        codeLine: 6,
        highlightedIndices: [i],
        pointers: { leader: i },
        variables: { leader: val, maxRight, leadersCount: leaders.length },
        data: [...nums],
        visualizerType: 'array',
        status: 'success'
      });
    }
  }

  steps.push({
    stepIndex: steps.length,
    action: 'finish',
    description: `Scan complete! All leaders found (reversed order): [${leaders.reverse().join(', ')}].`,
    codeLine: 8,
    highlightedIndices: nums.map((v, idx) => (leaders.includes(v) ? idx : null)).filter((v) => v !== null),
    pointers: {},
    variables: { leaders: `[${leaders.join(', ')}]` },
    data: [...nums],
    visualizerType: 'array',
    status: 'success'
  });

  return steps;
}

// 19. Rearrange Array Elements by Sign Trace Generator
export function generateRearrangeBySignTrace(initialNums = [3, 1, -2, -5, 2, -4]) {
  const steps = [];
  const nums = [...initialNums];
  const ans = new Array(nums.length).fill(0);
  let pos = 0;
  let neg = 1;

  steps.push({
    stepIndex: 0,
    action: 'init',
    description: 'Initialize pos pointer at even index 0, neg pointer at odd index 1.',
    codeLine: 3,
    highlightedIndices: [],
    pointers: { pos: 0, neg: 1 },
    variables: { pos: 0, neg: 1 },
    data: [...nums],
    visualizerType: 'array',
    status: 'active'
  });

  for (let i = 0; i < nums.length; i++) {
    const val = nums[i];
    const isPos = val > 0;
    const targetIdx = isPos ? pos : neg;
    ans[targetIdx] = val;

    steps.push({
      stepIndex: steps.length,
      action: isPos ? 'place_pos' : 'place_neg',
      description: isPos
        ? `Element ${val} > 0: place at ans[pos = ${pos}]. Increment pos by 2.`
        : `Element ${val} < 0: place at ans[neg = ${neg}]. Increment neg by 2.`,
      codeLine: isPos ? 6 : 9,
      highlightedIndices: [i],
      pointers: { current: i, target: targetIdx },
      variables: { currentVal: val, targetSlot: targetIdx, nextPos: isPos ? pos + 2 : pos, nextNeg: isPos ? neg : neg + 2 },
      data: [...ans],
      visualizerType: 'array',
      status: 'active'
    });

    if (isPos) pos += 2;
    else neg += 2;
  }

  steps.push({
    stepIndex: steps.length,
    action: 'finish',
    description: `Rearranged complete! Alternating positive and negative array: [${ans.join(', ')}].`,
    codeLine: 11,
    highlightedIndices: [],
    pointers: {},
    variables: { result: `[${ans.join(', ')}]` },
    data: [...ans],
    visualizerType: 'array',
    status: 'success'
  });

  return steps;
}

// 20. Spiral Matrix Trace Generator
export function generateSpiralMatrixTrace(initialGrid = null) {
  const grid = initialGrid || [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
  ];
  const steps = [];
  const m = grid.length;
  const n = grid[0].length;
  let top = 0, bottom = m - 1;
  let left = 0, right = n - 1;
  const visited = [];
  const res = [];

  steps.push({
    stepIndex: 0,
    action: 'init',
    description: `Spiral Matrix: Boundaries initialized - top = ${top}, bottom = ${bottom}, left = ${left}, right = ${right}.`,
    codeLine: 4,
    activeCell: { r: 0, c: 0 },
    visitedCells: [],
    gridTitle: 'Spiral Matrix (Clockwise Traversal)',
    variables: { top, bottom, left, right, collected: 0 },
    data: clone(grid),
    visualizerType: 'grid',
    status: 'active'
  });

  while (top <= bottom && left <= right) {
    // 1. Move Right: top row from left to right
    for (let c = left; c <= right; c++) {
      res.push(grid[top][c]);
      visited.push({ r: top, c });
      steps.push({
        stepIndex: steps.length,
        action: 'move_right',
        description: `Traverse Right across top row ${top}: cell (${top}, ${c}) = ${grid[top][c]}.`,
        codeLine: 7,
        activeCell: { r: top, c },
        visitedCells: [...visited],
        gridTitle: 'Spiral Matrix (Right Traversal)',
        variables: { r: top, c, value: grid[top][c], count: res.length },
        data: clone(grid),
        visualizerType: 'grid',
        status: 'active'
      });
    }
    top++;

    // 2. Move Down: right col from top to bottom
    for (let r = top; r <= bottom; r++) {
      res.push(grid[r][right]);
      visited.push({ r, c: right });
      steps.push({
        stepIndex: steps.length,
        action: 'move_down',
        description: `Traverse Down along right column ${right}: cell (${r}, ${right}) = ${grid[r][right]}.`,
        codeLine: 10,
        activeCell: { r, c: right },
        visitedCells: [...visited],
        gridTitle: 'Spiral Matrix (Down Traversal)',
        variables: { r, c: right, value: grid[r][right], count: res.length },
        data: clone(grid),
        visualizerType: 'grid',
        status: 'active'
      });
    }
    right--;

    // 3. Move Left: bottom row from right to left
    if (top <= bottom) {
      for (let c = right; c >= left; c--) {
        res.push(grid[bottom][c]);
        visited.push({ r: bottom, c });
        steps.push({
          stepIndex: steps.length,
          action: 'move_left',
          description: `Traverse Left across bottom row ${bottom}: cell (${bottom}, ${c}) = ${grid[bottom][c]}.`,
          codeLine: 14,
          activeCell: { r: bottom, c },
          visitedCells: [...visited],
          gridTitle: 'Spiral Matrix (Left Traversal)',
          variables: { r: bottom, c, value: grid[bottom][c], count: res.length },
          data: clone(grid),
          visualizerType: 'grid',
          status: 'active'
        });
      }
      bottom--;
    }

    // 4. Move Up: left col from bottom to top
    if (left <= right) {
      for (let r = bottom; r >= top; r--) {
        res.push(grid[r][left]);
        visited.push({ r, c: left });
        steps.push({
          stepIndex: steps.length,
          action: 'move_up',
          description: `Traverse Up along left column ${left}: cell (${r}, ${left}) = ${grid[r][left]}.`,
          codeLine: 18,
          activeCell: { r, c: left },
          visitedCells: [...visited],
          gridTitle: 'Spiral Matrix (Up Traversal)',
          variables: { r, c: left, value: grid[r][left], count: res.length },
          data: clone(grid),
          visualizerType: 'grid',
          status: 'active'
        });
      }
      left++;
    }
  }

  steps.push({
    stepIndex: steps.length,
    action: 'finish',
    description: `Spiral traversal complete! Output sequence: [${res.join(', ')}].`,
    codeLine: 20,
    activeCell: null,
    visitedCells: [...visited],
    gridTitle: 'Spiral Matrix Complete',
    variables: { totalVisited: res.length, result: `[${res.join(', ')}]` },
    data: clone(grid),
    visualizerType: 'grid',
    status: 'success'
  });

  return steps;
}

// 21. Rotate Matrix 90 Degrees Trace Generator
export function generateRotateMatrixTrace(initialGrid = null) {
  const grid = clone(initialGrid || [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]);
  const steps = [];
  const n = grid.length;

  steps.push({
    stepIndex: 0,
    action: 'init',
    description: 'Rotate Image by 90° Clockwise in-place: Step 1 is Transpose (swap grid[i][j] with grid[j][i]).',
    codeLine: 2,
    activeCell: { r: 0, c: 0 },
    visitedCells: [],
    gridTitle: 'Step 1: Matrix Transposition',
    variables: { stage: 'Transpose', n },
    data: clone(grid),
    visualizerType: 'grid',
    status: 'active'
  });

  // Step 1: Transpose
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const temp = grid[i][j];
      grid[i][j] = grid[j][i];
      grid[j][i] = temp;

      steps.push({
        stepIndex: steps.length,
        action: 'transpose_swap',
        description: `Swap cell (${i}, ${j}) [${temp}] with cell (${j}, ${i}) [${grid[i][j]}].`,
        codeLine: 5,
        activeCell: { r: i, c: j },
        visitedCells: [{ r: i, c: j }, { r: j, c: i }],
        gridTitle: 'Transposing Matrix Elements',
        variables: { swapA: `(${i},${j})`, swapB: `(${j},${i})`, valueA: grid[i][j], valueB: grid[j][i] },
        data: clone(grid),
        visualizerType: 'grid',
        status: 'active'
      });
    }
  }

  // Step 2: Reverse each row
  for (let i = 0; i < n; i++) {
    grid[i].reverse();
    steps.push({
      stepIndex: steps.length,
      action: 'reverse_row',
      description: `Reversing row ${i} to complete 90° clockwise rotation: [${grid[i].join(', ')}].`,
      codeLine: 7,
      activeCell: { r: i, c: 0 },
      visitedCells: grid[i].map((_, c) => ({ r: i, c })),
      gridTitle: 'Step 2: Reversing Rows',
      variables: { reversedRow: i, rowContent: `[${grid[i].join(', ')}]` },
      data: clone(grid),
      visualizerType: 'grid',
      status: 'active'
    });
  }

  steps.push({
    stepIndex: steps.length,
    action: 'finish',
    description: 'Matrix rotated 90° clockwise in-place successfully!',
    codeLine: 8,
    activeCell: null,
    visitedCells: [],
    gridTitle: 'Rotated 90° Matrix Complete',
    variables: { status: 'Rotated' },
    data: clone(grid),
    visualizerType: 'grid',
    status: 'success'
  });

  return steps;
}

// 22. Set Matrix Zeroes Trace Generator
export function generateSetMatrixZeroesTrace(initialGrid = null) {
  const grid = clone(initialGrid || [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
  ]);
  const steps = [];
  const m = grid.length;
  const n = grid[0].length;
  const zeroRows = new Set();
  const zeroCols = new Set();

  steps.push({
    stepIndex: 0,
    action: 'init',
    description: 'Scan matrix to find all cells with value 0.',
    codeLine: 4,
    activeCell: { r: 0, c: 0 },
    visitedCells: [],
    gridTitle: 'Scanning for Zeroes',
    variables: { m, n },
    data: clone(grid),
    visualizerType: 'grid',
    status: 'active'
  });

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) {
        zeroRows.add(i);
        zeroCols.add(j);
        steps.push({
          stepIndex: steps.length,
          action: 'found_zero',
          description: `Found 0 at cell (${i}, ${j}). Flag row ${i} and column ${j} to be zeroed.`,
          codeLine: 6,
          activeCell: { r: i, c: j },
          visitedCells: [{ r: i, c: j }],
          gridTitle: 'Found Zero at Cell',
          variables: { zeroRow: i, zeroCol: j },
          data: clone(grid),
          visualizerType: 'grid',
          status: 'active'
        });
      }
    }
  }

  // Set rows to zero
  for (const r of zeroRows) {
    for (let c = 0; c < n; c++) grid[r][c] = 0;
    steps.push({
      stepIndex: steps.length,
      action: 'zero_row',
      description: `Zero out entire row ${r}.`,
      codeLine: 12,
      activeCell: { r, c: 0 },
      visitedCells: Array.from({ length: n }, (_, c) => ({ r, c })),
      gridTitle: `Zeroing Row ${r}`,
      variables: { zeroedRow: r },
      data: clone(grid),
      visualizerType: 'grid',
      status: 'active'
    });
  }

  // Set cols to zero
  for (const c of zeroCols) {
    for (let r = 0; r < m; r++) grid[r][c] = 0;
    steps.push({
      stepIndex: steps.length,
      action: 'zero_col',
      description: `Zero out entire column ${c}.`,
      codeLine: 16,
      activeCell: { r: 0, c },
      visitedCells: Array.from({ length: m }, (_, r) => ({ r, c })),
      gridTitle: `Zeroing Column ${c}`,
      variables: { zeroedCol: c },
      data: clone(grid),
      visualizerType: 'grid',
      status: 'active'
    });
  }

  steps.push({
    stepIndex: steps.length,
    action: 'finish',
    description: 'Set Matrix Zeroes complete!',
    codeLine: 18,
    activeCell: null,
    visitedCells: [],
    gridTitle: 'Matrix Zeroing Complete',
    variables: { zeroRowsCount: zeroRows.size, zeroColsCount: zeroCols.size },
    data: clone(grid),
    visualizerType: 'grid',
    status: 'success'
  });

  return steps;
}

// 23. 3 Sum Trace Generator
export function generateThreeSumTrace(initialNums = [-1, 0, 1, 2, -1, -4]) {
  const steps = [];
  const nums = [...initialNums].sort((a, b) => a - b);
  const triplets = [];
  const n = nums.length;

  steps.push({
    stepIndex: 0,
    action: 'sort',
    description: `Sort the array in ascending order: [${nums.join(', ')}].`,
    codeLine: 2,
    highlightedIndices: [],
    pointers: {},
    variables: { sortedArray: `[${nums.join(', ')}]` },
    data: [...nums],
    visualizerType: 'array',
    status: 'active'
  });

  for (let i = 0; i < n - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1;
    let right = n - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      steps.push({
        stepIndex: steps.length,
        action: 'check',
        description: `Fix i=${i} (${nums[i]}), test left=${left} (${nums[left]}), right=${right} (${nums[right]}): Sum = ${sum}.`,
        codeLine: 9,
        highlightedIndices: [i, left, right],
        pointers: { i, left, right },
        variables: { i, left, right, sum, target: 0 },
        data: [...nums],
        visualizerType: 'array',
        status: 'active'
      });

      if (sum < 0) {
        left++;
      } else if (sum > 0) {
        right--;
      } else {
        triplets.push([nums[i], nums[left], nums[right]]);
        steps.push({
          stepIndex: steps.length,
          action: 'found',
          description: `Found triplet summing to 0: [${nums[i]}, ${nums[left]}, ${nums[right]}]!`,
          codeLine: 14,
          highlightedIndices: [i, left, right],
          matchedIndices: [i, left, right],
          pointers: { i, left, right },
          variables: { foundTriplet: `[${nums[i]}, ${nums[left]}, ${nums[right]}]`, totalTriplets: triplets.length },
          data: [...nums],
          visualizerType: 'array',
          status: 'success'
        });
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      }
    }
  }

  steps.push({
    stepIndex: steps.length,
    action: 'finish',
    description: `3 Sum search complete. Found ${triplets.length} unique triplets: ${JSON.stringify(triplets)}.`,
    codeLine: 20,
    highlightedIndices: [],
    pointers: {},
    variables: { triplets: JSON.stringify(triplets) },
    data: [...nums],
    visualizerType: 'array',
    status: 'success'
  });

  return steps;
}

// 24. 4 Sum Trace Generator
export function generateFourSumTrace(initialNums = [1, 0, -1, 0, -2, 2], target = 0) {
  const steps = [];
  const nums = [...initialNums].sort((a, b) => a - b);
  const quads = [];
  const n = nums.length;

  steps.push({
    stepIndex: 0,
    action: 'sort',
    description: `Sort array: [${nums.join(', ')}]. Searching for quadruplets summing to target = ${target}.`,
    codeLine: 2,
    highlightedIndices: [],
    pointers: {},
    variables: { target, sorted: `[${nums.join(', ')}]` },
    data: [...nums],
    visualizerType: 'array',
    status: 'active'
  });

  for (let i = 0; i < n - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    for (let j = i + 1; j < n - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      let left = j + 1;
      let right = n - 1;

      while (left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right];

        steps.push({
          stepIndex: steps.length,
          action: 'check',
          description: `Fix i=${i} (${nums[i]}), j=${j} (${nums[j]}), left=${left} (${nums[left]}), right=${right} (${nums[right]}): Sum = ${sum}.`,
          codeLine: 12,
          highlightedIndices: [i, j, left, right],
          pointers: { i, j, left, right },
          variables: { i, j, left, right, sum, target },
          data: [...nums],
          visualizerType: 'array',
          status: 'active'
        });

        if (sum < target) {
          left++;
        } else if (sum > target) {
          right--;
        } else {
          quads.push([nums[i], nums[j], nums[left], nums[right]]);
          steps.push({
            stepIndex: steps.length,
            action: 'found',
            description: `Found quadruplet summing to ${target}: [${nums[i]}, ${nums[j]}, ${nums[left]}, ${nums[right]}]!`,
            codeLine: 18,
            highlightedIndices: [i, j, left, right],
            matchedIndices: [i, j, left, right],
            pointers: { i, j, left, right },
            variables: { quadruplet: `[${nums[i]}, ${nums[j]}, ${nums[left]}, ${nums[right]}]`, totalFound: quads.length },
            data: [...nums],
            visualizerType: 'array',
            status: 'success'
          });
          while (left < right && nums[left] === nums[left + 1]) left++;
          while (left < right && nums[right] === nums[right - 1]) right--;
          left++;
          right--;
        }
      }
    }
  }

  steps.push({
    stepIndex: steps.length,
    action: 'finish',
    description: `4 Sum complete. Found ${quads.length} unique quadruplets.`,
    codeLine: 24,
    highlightedIndices: [],
    pointers: {},
    variables: { quadruplets: JSON.stringify(quads) },
    data: [...nums],
    visualizerType: 'array',
    status: 'success'
  });

  return steps;
}

// Master Dispatcher for Algorithm Traces
export function getAlgorithmTrace(questionId, customInput = null) {
  switch (questionId) {
    case 'two-sum': {
      const arr = customInput?.array || [2, 7, 11, 15];
      const target = customInput?.target !== undefined ? customInput.target : 9;
      return generateTwoSumTrace(arr, target);
    }
    case 'majority-element-1': {
      const arr = customInput?.array || [2, 2, 1, 1, 1, 2, 2];
      return generateMajorityElementTrace(arr);
    }
    case 'leaders-in-an-array': {
      const arr = customInput?.array || [16, 17, 4, 3, 5, 2];
      return generateLeadersTrace(arr);
    }
    case 'rearrange-array-by-sign': {
      const arr = customInput?.array || [3, 1, -2, -5, 2, -4];
      return generateRearrangeBySignTrace(arr);
    }
    case 'spiral-matrix': {
      const grid = customInput?.grid || [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16]
      ];
      return generateSpiralMatrixTrace(grid);
    }
    case 'pascals-triangle-1':
    case 'pascals-triangle-2':
    case 'pascals-triangle-3': {
      const arr = customInput?.array || [1, 4, 6, 4, 1];
      return generateBubbleSortTrace(arr);
    }
    case 'rotate-matrix-90': {
      const grid = customInput?.grid || [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ];
      return generateRotateMatrixTrace(grid);
    }
    case 'set-matrix-zeroes': {
      const grid = customInput?.grid || [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
      ];
      return generateSetMatrixZeroesTrace(grid);
    }
    case 'three-sum': {
      const arr = customInput?.array || [-1, 0, 1, 2, -1, -4];
      return generateThreeSumTrace(arr);
    }
    case 'four-sum': {
      const arr = customInput?.array || [1, 0, -1, 0, -2, 2];
      const target = customInput?.target !== undefined ? customInput.target : 0;
      return generateFourSumTrace(arr, target);
    }
    case 'sort-colors': {
      const arr = customInput?.array || [2, 0, 2, 1, 1, 0];
      return generateSortColorsTrace(arr);
    }
    case 'bubble-sort': {
      const arr = customInput?.array || [5, 1, 4, 2, 8];
      return generateBubbleSortTrace(arr);
    }
    case 'insertion-sort': {
      const arr = customInput?.array || [12, 11, 13, 5, 6];
      return generateInsertionSortTrace(arr);
    }
    case 'selection-sort': {
      const arr = customInput?.array || [64, 25, 12, 22, 11];
      return generateSelectionSortTrace(arr);
    }
    case 'binary-search': {
      const arr = customInput?.array || [-1, 0, 3, 5, 9, 12];
      const target = customInput?.target !== undefined ? customInput.target : 9;
      return generateBinarySearchTrace(arr, target);
    }
    case 'best-time-to-buy-and-sell-stock': {
      const arr = customInput?.array || [7, 1, 5, 3, 6, 4];
      return generateStockProfitTrace(arr);
    }
    case 'maximum-subarray': {
      const arr = customInput?.array || [-2, 1, -3, 4, -1, 2, 1, -5, 4];
      return generateMaxSubarrayTrace(arr);
    }
    case 'reverse-linked-list': {
      const arr = customInput?.array || [1, 2, 3, 4, 5];
      return generateReverseLinkedListTrace(arr);
    }
    case 'valid-parentheses': {
      const str = customInput?.string || '()[]{}';
      return generateValidParenthesesTrace(str);
    }
    case 'move-zeroes': {
      const arr = customInput?.array || [0, 1, 0, 3, 12];
      return generateMoveZeroesTrace(arr);
    }
    case 'remove-duplicates': {
      const arr = customInput?.array || [1, 1, 2, 2, 3, 4, 4];
      return generateRemoveDuplicatesTrace(arr);
    }
    case 'missing-number': {
      const arr = customInput?.array || [3, 0, 1];
      return generateMissingNumberTrace(arr);
    }
    case 'max-depth-binary-tree': {
      return generateTreeDepthTrace();
    }
    case 'inorder-traversal': {
      return generateInorderTraversalTrace();
    }
    case 'flood-fill': {
      const grid = customInput?.grid || [
        [1, 1, 1],
        [1, 1, 0],
        [1, 0, 1]
      ];
      return generateFloodFillTrace(grid, 1, 1, 2);
    }
    default: {
      if (customInput?.array && Array.isArray(customInput.array)) {
        return generateBubbleSortTrace(customInput.array);
      }
      return generateTwoSumTrace();
    }
  }
}

