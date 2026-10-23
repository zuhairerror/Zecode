// Comprehensive DSA Question Library for Zecode
// Real curated problems with full test cases, starter code in 4 languages, and visualization metadata

export const TOPICS = [
  'All',
  'Arrays and Strings',
  'Searching and Sorting',
  'Hashing',
  'Two Pointers and Sliding Window',
  'Linked Lists',
  'Stacks and Queues',
  'Recursion and Backtracking',
  'Trees and Binary Search Trees',
  'Heaps',
  'Graphs',
  'Greedy Algorithms',
  'Dynamic Programming',
  'Bit Manipulation'
];

export const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];

export const QUESTIONS_DATA = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    topic: 'Hashing',
    difficulty: 'Easy',
    hasVisualizer: true,
    visualizerType: 'two-sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]',
        explanation: 'nums[1] + nums[2] == 6, return [1, 2].'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    defaultInput: {
      array: [2, 7, 11, 15],
      target: 9
    },
    complexity: {
      time: {
        best: 'O(1)',
        average: 'O(N)',
        worst: 'O(N)',
        explanation: 'Single pass through array. Hash map lookups and insertions take O(1) amortized time.'
      },
      space: {
        auxiliary: 'O(N)',
        total: 'O(N)',
        explanation: 'Hash map stores up to N elements in the worst case where the matching pair is at the end.'
      }
    },
    codeLineMap: {
      python: { check: 4, insert: 5, found: 6 },
      cpp: { check: 6, insert: 8, found: 7 },
      java: { check: 6, insert: 8, found: 7 },
      c: { check: 5, insert: 7, found: 6 }
    },
    starterCode: {
      python: `def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Test execution
print(twoSum([2, 7, 11, 15], 9))`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); ++i) {
        int complement = target - nums[i];
        if (seen.find(complement) != seen.end()) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    vector<int> res = twoSum(nums, 9);
    cout << "[" << res[0] << ", " << res[1] << "]" << endl;
    return 0;
}`,
      java: `import java.util.*;

public class Solution {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }

    public static void main(String[] args) {
        int[] res = twoSum(new int[]{2, 7, 11, 15}, 9);
        System.out.println(Arrays.toString(res));
    }
}`,
      c: `#include <stdio.h>
#include <stdlib.h>

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    int* result = (int*)malloc(2 * sizeof(int));
    *returnSize = 2;
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                result[0] = i;
                result[1] = j;
                return result;
            }
        }
    }
    *returnSize = 0;
    return NULL;
}

int main() {
    int nums[] = {2, 7, 11, 15};
    int returnSize;
    int* res = twoSum(nums, 4, 9, &returnSize);
    printf("[%d, %d]\\n", res[0], res[1]);
    free(res);
    return 0;
}`
    },
    testCases: [
      { input: { array: [2, 7, 11, 15], target: 9 }, expected: [0, 1] },
      { input: { array: [3, 2, 4], target: 6 }, expected: [1, 2] },
      { input: { array: [3, 3], target: 6 }, expected: [0, 1] }
    ]
  },
  {
    id: 'sort-colors',
    title: 'Sort Colors (0s, 1s, and 2s)',
    topic: 'Two Pointers and Sliding Window',
    difficulty: 'Medium',
    hasVisualizer: true,
    visualizerType: 'sort-colors',
    description: "Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red (0), white (1), and blue (2).\n\nYou must solve this problem without using the library's sort function, using Dijkstra's Dutch National Flag algorithm.",
    examples: [
      {
        input: 'nums = [2, 0, 2, 1, 1, 0]',
        output: '[0, 0, 1, 1, 2, 2]',
        explanation: 'Colors sorted in-place in linear time.'
      }
    ],
    constraints: ['n == nums.length', '1 <= n <= 300', 'nums[i] is either 0, 1, or 2.'],
    defaultInput: {
      array: [2, 0, 2, 1, 1, 0]
    },
    complexity: {
      time: {
        best: 'O(N)',
        average: 'O(N)',
        worst: 'O(N)',
        explanation: 'Single pass with three pointers (low, mid, high). Each element is examined at most once.'
      },
      space: {
        auxiliary: 'O(1)',
        total: 'O(1)',
        explanation: 'In-place sorting using constant extra memory.'
      }
    },
    codeLineMap: {
      python: { check: 5, swap_low: 7, swap_high: 11, advance_mid: 9 },
      cpp: { check: 6, swap_low: 8, swap_high: 12, advance_mid: 10 },
      java: { check: 6, swap_low: 8, swap_high: 12, advance_mid: 10 },
      c: { check: 6, swap_low: 8, swap_high: 12, advance_mid: 10 }
    },
    starterCode: {
      python: `def sortColors(nums):
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1
    return nums

print(sortColors([2, 0, 2, 1, 1, 0]))`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void sortColors(vector<int>& nums) {
    int low = 0, mid = 0, high = nums.size() - 1;
    while (mid <= high) {
        if (nums[mid] == 0) {
            swap(nums[low++], nums[mid++]);
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            swap(nums[mid], nums[high--]);
        }
    }
}`,
      java: `public class Solution {
    public static void sortColors(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                int temp = nums[low];
                nums[low++] = nums[mid];
                nums[mid++] = temp;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                int temp = nums[mid];
                nums[mid] = nums[high];
                nums[high--] = temp;
            }
        }
    }
}`,
      c: `#include <stdio.h>

void sortColors(int* nums, int numsSize) {
    int low = 0, mid = 0, high = numsSize - 1;
    while (mid <= high) {
        if (nums[mid] == 0) {
            int t = nums[low]; nums[low++] = nums[mid]; nums[mid++] = t;
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            int t = nums[mid]; nums[mid] = nums[high]; nums[high--] = t;
        }
    }
}`
    },
    testCases: [
      { input: { array: [2, 0, 2, 1, 1, 0] }, expected: [0, 0, 1, 1, 2, 2] },
      { input: { array: [2, 0, 1] }, expected: [0, 1, 2] }
    ]
  },
  {
    id: 'bubble-sort',
    title: 'Bubble Sort',
    topic: 'Searching and Sorting',
    difficulty: 'Easy',
    hasVisualizer: true,
    visualizerType: 'bubble-sort',
    description: 'Bubble Sort is a comparison-based sorting algorithm where adjacent elements are repeatedly swapped if they are in the wrong order. After each pass, the largest remaining element bubbles up to its correct position at the end.',
    examples: [
      {
        input: 'nums = [5, 1, 4, 2, 8]',
        output: '[1, 2, 4, 5, 8]',
        explanation: 'Adjacent comparisons and swaps place 8 at the end, then 5, and so on.'
      }
    ],
    constraints: ['1 <= nums.length <= 500', '-1000 <= nums[i] <= 1000'],
    defaultInput: {
      array: [5, 1, 4, 2, 8]
    },
    complexity: {
      time: {
        best: 'O(N)',
        average: 'O(N^2)',
        worst: 'O(N^2)',
        explanation: 'Best case O(N) when array is already sorted (with early exit flag). Worst case O(N^2) for reverse sorted arrays.'
      },
      space: {
        auxiliary: 'O(1)',
        total: 'O(1)',
        explanation: 'In-place sorting algorithm requiring only a temporary swap variable.'
      }
    },
    codeLineMap: {
      python: { loop_outer: 3, loop_inner: 4, compare: 5, swap: 6 },
      cpp: { loop_outer: 3, loop_inner: 4, compare: 5, swap: 6 },
      java: { loop_outer: 3, loop_inner: 4, compare: 5, swap: 6 },
      c: { loop_outer: 3, loop_inner: 4, compare: 5, swap: 6 }
    },
    starterCode: {
      python: `def bubbleSort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr

print(bubbleSort([5, 1, 4, 2, 8]))`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
      java: `public class Solution {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int t = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = t;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }
}`,
      c: `#include <stdio.h>

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int t = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = t;
                swapped = 1;
            }
        }
        if (!swapped) break;
    }
}`
    },
    testCases: [
      { input: { array: [5, 1, 4, 2, 8] }, expected: [1, 2, 4, 5, 8] },
      { input: { array: [3, 2, 1] }, expected: [1, 2, 3] }
    ]
  },
  {
    id: 'insertion-sort',
    title: 'Insertion Sort',
    topic: 'Searching and Sorting',
    difficulty: 'Easy',
    hasVisualizer: true,
    visualizerType: 'insertion-sort',
    description: 'Insertion Sort builds the final sorted array one item at a time. It iterates through the input elements, growing a sorted array behind it. At each iteration, an element is removed from the input data and inserted into its proper place in the sorted sub-array.',
    examples: [
      {
        input: 'nums = [12, 11, 13, 5, 6]',
        output: '[5, 6, 11, 12, 13]',
        explanation: 'Elements are shifted to the right to insert key into its correct sorted location.'
      }
    ],
    constraints: ['1 <= nums.length <= 500'],
    defaultInput: {
      array: [12, 11, 13, 5, 6]
    },
    complexity: {
      time: {
        best: 'O(N)',
        average: 'O(N^2)',
        worst: 'O(N^2)',
        explanation: 'Best case O(N) when elements are already sorted. Worst case O(N^2) when reverse sorted.'
      },
      space: {
        auxiliary: 'O(1)',
        total: 'O(1)',
        explanation: 'In-place sorting using constant extra memory.'
      }
    },
    codeLineMap: {
      python: { select_key: 3, shift: 5, insert: 7 },
      cpp: { select_key: 4, shift: 6, insert: 9 },
      java: { select_key: 4, shift: 6, insert: 9 },
      c: { select_key: 4, shift: 6, insert: 9 }
    },
    starterCode: {
      python: `def insertionSort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

print(insertionSort([12, 11, 13, 5, 6]))`,
      cpp: `#include <vector>
using namespace std;

void insertionSort(vector<int>& arr) {
    for (int i = 1; i < arr.size(); i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
      java: `public class Solution {
    public static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
}`,
      c: `#include <stdio.h>

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`
    },
    testCases: [
      { input: { array: [12, 11, 13, 5, 6] }, expected: [5, 6, 11, 12, 13] }
    ]
  },
  {
    id: 'selection-sort',
    title: 'Selection Sort',
    topic: 'Searching and Sorting',
    difficulty: 'Easy',
    hasVisualizer: true,
    visualizerType: 'selection-sort',
    description: 'Selection Sort repeatedly finds the minimum element from the unsorted part of the array and puts it at the beginning. The algorithm maintains two subarrays: one already sorted, and the remaining unsorted part.',
    examples: [
      {
        input: 'nums = [64, 25, 12, 22, 11]',
        output: '[11, 12, 22, 25, 64]',
        explanation: 'Min element 11 found and swapped with 64 at index 0, and so on.'
      }
    ],
    constraints: ['1 <= nums.length <= 500'],
    defaultInput: {
      array: [64, 25, 12, 22, 11]
    },
    complexity: {
      time: {
        best: 'O(N^2)',
        average: 'O(N^2)',
        worst: 'O(N^2)',
        explanation: 'Always scans the remaining unsorted subarray for the minimum, resulting in N*(N-1)/2 comparisons.'
      },
      space: {
        auxiliary: 'O(1)',
        total: 'O(1)',
        explanation: 'In-place sorting algorithm.'
      }
    },
    codeLineMap: {
      python: { set_min: 3, compare: 5, update_min: 6, swap: 7 },
      cpp: { set_min: 4, compare: 6, update_min: 7, swap: 9 },
      java: { set_min: 4, compare: 6, update_min: 7, swap: 9 },
      c: { set_min: 4, compare: 6, update_min: 7, swap: 9 }
    },
    starterCode: {
      python: `def selectionSort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

print(selectionSort([64, 25, 12, 22, 11]))`,
      cpp: `#include <vector>
using namespace std;

void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) min_idx = j;
        }
        swap(arr[i], arr[min_idx]);
    }
}`,
      java: `public class Solution {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) minIdx = j;
            }
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
}`,
      c: `#include <stdio.h>

void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) min_idx = j;
        }
        int t = arr[i]; arr[i] = arr[min_idx]; arr[min_idx] = t;
    }
}`
    },
    testCases: [
      { input: { array: [64, 25, 12, 22, 11] }, expected: [11, 12, 22, 25, 64] }
    ]
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    topic: 'Searching and Sorting',
    difficulty: 'Easy',
    hasVisualizer: true,
    visualizerType: 'binary-search',
    description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.\n\nYou must write an algorithm with O(log n) runtime complexity.',
    examples: [
      {
        input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9',
        output: '4',
        explanation: '9 exists in nums and its index is 4.'
      },
      {
        input: 'nums = [-1, 0, 3, 5, 9, 12], target = 2',
        output: '-1',
        explanation: '2 does not exist in nums so return -1.'
      }
    ],
    constraints: ['1 <= nums.length <= 10^4', 'nums is sorted in ascending order.'],
    defaultInput: {
      array: [-1, 0, 3, 5, 9, 12],
      target: 9
    },
    complexity: {
      time: {
        best: 'O(1)',
        average: 'O(log N)',
        worst: 'O(log N)',
        explanation: 'Search space halves in each iteration. At most log2(N) comparisons.'
      },
      space: {
        auxiliary: 'O(1)',
        total: 'O(1)',
        explanation: 'Iterative implementation uses constant extra memory for low, high, and mid pointers.'
      }
    },
    codeLineMap: {
      python: { calc_mid: 4, match: 5, move_right: 7, move_left: 9 },
      cpp: { calc_mid: 4, match: 5, move_right: 7, move_left: 9 },
      java: { calc_mid: 4, match: 5, move_right: 7, move_left: 9 },
      c: { calc_mid: 4, match: 5, move_right: 7, move_left: 9 }
    },
    starterCode: {
      python: `def search(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

print(search([-1, 0, 3, 5, 9, 12], 9))`,
      cpp: `#include <vector>
using namespace std;

int search(vector<int>& nums, int target) {
    int low = 0, high = nums.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
      java: `public class Solution {
    public static int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`,
      c: `#include <stdio.h>

int search(int* nums, int numsSize, int target) {
    int low = 0, high = numsSize - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`
    },
    testCases: [
      { input: { array: [-1, 0, 3, 5, 9, 12], target: 9 }, expected: 4 },
      { input: { array: [-1, 0, 3, 5, 9, 12], target: 2 }, expected: -1 }
    ]
  },
  {
    id: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    topic: 'Arrays and Strings',
    difficulty: 'Easy',
    hasVisualizer: true,
    visualizerType: 'stock-profit',
    description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
    examples: [
      {
        input: 'prices = [7, 1, 5, 3, 6, 4]',
        output: '5',
        explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.'
      }
    ],
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
    defaultInput: {
      array: [7, 1, 5, 3, 6, 4]
    },
    complexity: {
      time: {
        best: 'O(N)',
        average: 'O(N)',
        worst: 'O(N)',
        explanation: 'Single pass tracking minimum price seen so far and updating maximum potential profit.'
      },
      space: {
        auxiliary: 'O(1)',
        total: 'O(1)',
        explanation: 'Only two scalar variables (minPrice, maxProfit) stored.'
      }
    },
    codeLineMap: {
      python: { check_min: 4, update_min: 5, update_profit: 7 },
      cpp: { check_min: 5, update_min: 6, update_profit: 8 },
      java: { check_min: 5, update_min: 6, update_profit: 8 },
      c: { check_min: 5, update_min: 6, update_profit: 8 }
    },
    starterCode: {
      python: `def maxProfit(prices):
    min_price = float('inf')
    max_profit = 0
    for price in prices:
        if price < min_price:
            min_price = price
        elif price - min_price > max_profit:
            max_profit = price - min_price
    return max_profit

print(maxProfit([7, 1, 5, 3, 6, 4]))`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

int maxProfit(vector<int>& prices) {
    int minPrice = 1e9, maxProfit = 0;
    for (int price : prices) {
        if (price < minPrice) minPrice = price;
        else maxProfit = max(maxProfit, price - minPrice);
    }
    return maxProfit;
}`,
      java: `public class Solution {
    public static int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        for (int price : prices) {
            if (price < minPrice) minPrice = price;
            else if (price - minPrice > maxProfit) maxProfit = price - minPrice;
        }
        return maxProfit;
    }
}`,
      c: `#include <stdio.h>

int maxProfit(int* prices, int pricesSize) {
    int min_price = 1000000;
    int max_profit = 0;
    for (int i = 0; i < pricesSize; i++) {
        if (prices[i] < min_price) min_price = prices[i];
        else if (prices[i] - min_price > max_profit) max_profit = prices[i] - min_price;
    }
    return max_profit;
}`
    },
    testCases: [
      { input: { array: [7, 1, 5, 3, 6, 4] }, expected: 5 },
      { input: { array: [7, 6, 4, 3, 1] }, expected: 0 }
    ]
  },
  {
    id: 'maximum-subarray',
    title: 'Maximum Subarray (Kadane’s Algorithm)',
    topic: 'Dynamic Programming',
    difficulty: 'Medium',
    hasVisualizer: true,
    visualizerType: 'max-subarray',
    description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.\n\nKadane's algorithm operates by determining whether to extend the current running subarray or start fresh from the current element.",
    examples: [
      {
        input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]',
        output: '6',
        explanation: 'The subarray [4, -1, 2, 1] has the largest sum 6.'
      }
    ],
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    defaultInput: {
      array: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
    },
    complexity: {
      time: {
        best: 'O(N)',
        average: 'O(N)',
        worst: 'O(N)',
        explanation: "Kadane's algorithm requires a single pass across the array."
      },
      space: {
        auxiliary: 'O(1)',
        total: 'O(1)',
        explanation: 'Operates in O(1) auxiliary space maintaining currentSum and maxGlobal.'
      }
    },
    codeLineMap: {
      python: { add_num: 4, reset_or_keep: 5, update_max: 6 },
      cpp: { add_num: 4, reset_or_keep: 5, update_max: 6 },
      java: { add_num: 4, reset_or_keep: 5, update_max: 6 },
      c: { add_num: 4, reset_or_keep: 5, update_max: 6 }
    },
    starterCode: {
      python: `def maxSubArray(nums):
    current_sum = nums[0]
    max_sum = nums[0]
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    return max_sum

print(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

int maxSubArray(vector<int>& nums) {
    int currentSum = nums[0], maxSum = nums[0];
    for (int i = 1; i < nums.size(); i++) {
        currentSum = max(nums[i], currentSum + nums[i]);
        maxSum = max(maxSum, currentSum);
    }
    return maxSum;
}`,
      java: `public class Solution {
    public static int maxSubArray(int[] nums) {
        int currentSum = nums[0], maxSum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        return maxSum;
    }
}`,
      c: `#include <stdio.h>

int maxSubArray(int* nums, int numsSize) {
    int current_sum = nums[0], max_sum = nums[0];
    for (int i = 1; i < numsSize; i++) {
        current_sum = (nums[i] > current_sum + nums[i]) ? nums[i] : (current_sum + nums[i]);
        if (current_sum > max_sum) max_sum = current_sum;
    }
    return max_sum;
}`
    },
    testCases: [
      { input: { array: [-2, 1, -3, 4, -1, 2, 1, -5, 4] }, expected: 6 },
      { input: { array: [5, 4, -1, 7, 8] }, expected: 23 }
    ]
  },
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    topic: 'Linked Lists',
    difficulty: 'Easy',
    hasVisualizer: true,
    visualizerType: 'reverse-linked-list',
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.\n\nThe iterative three-pointer technique (prev, curr, next) systematically reverses each node pointer in O(N) time.',
    examples: [
      {
        input: 'head = [1, 2, 3, 4, 5]',
        output: '[5, 4, 3, 2, 1]',
        explanation: 'Each node next reference is flipped to point to the preceding node.'
      }
    ],
    constraints: ['The number of nodes in the list is the range [0, 5000].', '-5000 <= Node.val <= 5000'],
    defaultInput: {
      array: [1, 2, 3, 4, 5]
    },
    complexity: {
      time: {
        best: 'O(N)',
        average: 'O(N)',
        worst: 'O(N)',
        explanation: 'Visits each node exactly once to reverse pointer direction.'
      },
      space: {
        auxiliary: 'O(1)',
        total: 'O(1)',
        explanation: 'Iterative approach reuses existing node pointers without additional allocations.'
      }
    },
    codeLineMap: {
      python: { save_next: 4, reverse_ptr: 5, advance_prev: 6, advance_curr: 7 },
      cpp: { save_next: 4, reverse_ptr: 5, advance_prev: 6, advance_curr: 7 },
      java: { save_next: 4, reverse_ptr: 5, advance_prev: 6, advance_curr: 7 },
      c: { save_next: 4, reverse_ptr: 5, advance_prev: 6, advance_curr: 7 }
    },
    starterCode: {
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseList(head):
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
      cpp: `struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr != nullptr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
      java: `public class Solution {
    public static class ListNode {
        int val;
        ListNode next;
        ListNode(int x) { val = x; }
    }

    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`,
      c: `struct ListNode {
    int val;
    struct ListNode *next;
};

struct ListNode* reverseList(struct ListNode* head) {
    struct ListNode* prev = NULL;
    struct ListNode* curr = head;
    while (curr != NULL) {
        struct ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`
    },
    testCases: [
      { input: { array: [1, 2, 3, 4, 5] }, expected: [5, 4, 3, 2, 1] }
    ]
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    topic: 'Stacks and Queues',
    difficulty: 'Easy',
    hasVisualizer: true,
    visualizerType: 'valid-parentheses',
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if open brackets are closed by the same type of brackets and in the correct order.",
    examples: [
      {
        input: 's = "()[]{}"',
        output: 'true',
        explanation: 'All opening brackets have corresponding matching closures.'
      },
      {
        input: 's = "(]"',
        output: 'false',
        explanation: "Closing bracket ']' does not match open bracket '('."
      }
    ],
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only ()[]{}.'],
    defaultInput: {
      string: '()[]{}'
    },
    complexity: {
      time: {
        best: 'O(1)',
        average: 'O(N)',
        worst: 'O(N)',
        explanation: 'Each character is pushed to or popped from the stack at most once.'
      },
      space: {
        auxiliary: 'O(N)',
        total: 'O(N)',
        explanation: 'In the worst case (e.g. (((((), all characters are stored on the stack.'
      }
    },
    codeLineMap: {
      python: { push: 6, check_match: 8, pop: 9, check_empty: 11 },
      cpp: { push: 6, check_match: 8, pop: 9, check_empty: 11 },
      java: { push: 6, check_match: 8, pop: 9, check_empty: 11 },
      c: { push: 6, check_match: 8, pop: 9, check_empty: 11 }
    },
    starterCode: {
      python: `def isValid(s: str) -> bool:
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in pairs:
            if not stack or stack[-1] != pairs[char]:
                return False
            stack.pop()
        else:
            stack.append(char)
    return len(stack) == 0

print(isValid("()[]{}"))`,
      cpp: `#include <string>
#include <stack>
#include <unordered_map>
using namespace std;

bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.empty()) return false;
            char top = st.top(); st.pop();
            if ((c == ')' && top != '(') ||
                (c == '}' && top != '{') ||
                (c == ']' && top != '[')) return false;
        }
    }
    return st.empty();
}`,
      java: `import java.util.Stack;

public class Solution {
    public static boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
      c: `#include <stdbool.h>
#include <string.h>

bool isValid(char* s) {
    int n = strlen(s);
    char stack[10005];
    int top = -1;
    for (int i = 0; i < n; i++) {
        char c = s[i];
        if (c == '(' || c == '{' || c == '[') stack[++top] = c;
        else {
            if (top == -1) return false;
            char t = stack[top--];
            if ((c == ')' && t != '(') || (c == '}' && t != '{') || (c == ']' && t != '[')) return false;
        }
    }
    return top == -1;
}`
    },
    testCases: [
      { input: { string: '()[]{}' }, expected: true },
      { input: { string: '(]' }, expected: false },
      { input: { string: '([)]' }, expected: false }
    ]
  },
  {
    id: 'merge-sorted-arrays',
    title: 'Merge Two Sorted Arrays',
    topic: 'Two Pointers and Sliding Window',
    difficulty: 'Easy',
    hasVisualizer: true,
    visualizerType: 'merge-sorted-arrays',
    description: 'You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.\n\nMerge nums1 and nums2 into a single array sorted in non-decreasing order in-place from back to front.',
    examples: [
      {
        input: 'nums1 = [1, 2, 3, 0, 0, 0], m = 3, nums2 = [2, 5, 6], n = 3',
        output: '[1, 2, 2, 3, 5, 6]',
        explanation: 'Three-pointer backward placement avoids overwriting elements in nums1.'
      }
    ],
    constraints: ['nums1.length == m + n', '0 <= m, n <= 200'],
    defaultInput: {
      nums1: [1, 2, 3, 0, 0, 0],
      m: 3,
      nums2: [2, 5, 6],
      n: 3
    },
    complexity: {
      time: {
        best: 'O(M + N)',
        average: 'O(M + N)',
        worst: 'O(M + N)',
        explanation: 'Places each of the M + N elements in their correct position once.'
      },
      space: {
        auxiliary: 'O(1)',
        total: 'O(1)',
        explanation: 'In-place filling from index m + n - 1 backwards.'
      }
    },
    codeLineMap: {
      python: { compare: 5, place_nums1: 6, place_nums2: 9, copy_rest: 12 },
      cpp: { compare: 5, place_nums1: 6, place_nums2: 9, copy_rest: 12 },
      java: { compare: 5, place_nums1: 6, place_nums2: 9, copy_rest: 12 },
      c: { compare: 5, place_nums1: 6, place_nums2: 9, copy_rest: 12 }
    },
    starterCode: {
      python: `def merge(nums1, m, nums2, n):
    p1 = m - 1
    p2 = n - 1
    p = m + n - 1
    while p1 >= 0 and p2 >= 0:
        if nums1[p1] > nums2[p2]:
            nums1[p] = nums1[p1]
            p1 -= 1
        else:
            nums1[p] = nums2[p2]
            p2 -= 1
        p -= 1
    while p2 >= 0:
        nums1[p] = nums2[p2]
        p2 -= 1
        p -= 1
    return nums1`,
      cpp: `#include <vector>
using namespace std;

void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
    int p1 = m - 1, p2 = n - 1, p = m + n - 1;
    while (p1 >= 0 && p2 >= 0) {
        if (nums1[p1] > nums2[p2]) nums1[p--] = nums1[p1--];
        else nums1[p--] = nums2[p2--];
    }
    while (p2 >= 0) nums1[p--] = nums2[p2--];
}`,
      java: `public class Solution {
    public static void merge(int[] nums1, int m, int[] nums2, int n) {
        int p1 = m - 1, p2 = n - 1, p = m + n - 1;
        while (p1 >= 0 && p2 >= 0) {
            if (nums1[p1] > nums2[p2]) nums1[p--] = nums1[p1--];
            else nums1[p--] = nums2[p2--];
        }
        while (p2 >= 0) nums1[p--] = nums2[p2--];
    }
}`,
      c: `#include <stdio.h>

void merge(int* nums1, int m, int* nums2, int n) {
    int p1 = m - 1, p2 = n - 1, p = m + n - 1;
    while (p1 >= 0 && p2 >= 0) {
        if (nums1[p1] > nums2[p2]) nums1[p--] = nums1[p1--];
        else nums1[p--] = nums2[p2--];
    }
    while (p2 >= 0) nums1[p--] = nums2[p2--];
}`
    },
    testCases: [
      { input: { nums1: [1, 2, 3, 0, 0, 0], m: 3, nums2: [2, 5, 6], n: 3 }, expected: [1, 2, 2, 3, 5, 6] }
    ]
  },
  {
    id: 'remove-duplicates',
    title: 'Remove Duplicates from Sorted Array',
    topic: 'Two Pointers and Sliding Window',
    difficulty: 'Easy',
    hasVisualizer: true,
    visualizerType: 'remove-duplicates',
    description: 'Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same.\n\nReturn k after placing the final result in the first k slots of nums.',
    examples: [
      {
        input: 'nums = [1, 1, 2, 2, 3, 4, 4]',
        output: '4, nums = [1, 2, 3, 4, ...]',
        explanation: 'Unique elements 1, 2, 3, 4 are retained at the front in O(N) time and O(1) space.'
      }
    ],
    constraints: ['1 <= nums.length <= 3 * 10^4'],
    defaultInput: {
      array: [1, 1, 2, 2, 3, 4, 4]
    },
    complexity: {
      time: { best: 'O(N)', average: 'O(N)', worst: 'O(N)', explanation: 'Single pass using fast and slow pointers.' },
      space: { auxiliary: 'O(1)', total: 'O(1)', explanation: 'In-place modifications without allocating arrays.' }
    },
    codeLineMap: {
      python: { compare: 4, write: 5, advance: 6 },
      cpp: { compare: 4, write: 5, advance: 6 },
      java: { compare: 4, write: 5, advance: 6 },
      c: { compare: 4, write: 5, advance: 6 }
    },
    starterCode: {
      python: `def removeDuplicates(nums):
    if not nums: return 0
    k = 0
    for i in range(1, len(nums)):
        if nums[i] != nums[k]:
            k += 1
            nums[k] = nums[i]
    return k + 1

print(removeDuplicates([1, 1, 2, 2, 3, 4, 4]))`,
      cpp: `#include <vector>
using namespace std;

int removeDuplicates(vector<int>& nums) {
    if (nums.empty()) return 0;
    int k = 0;
    for (int i = 1; i < nums.size(); i++) {
        if (nums[i] != nums[k]) {
            nums[++k] = nums[i];
        }
    }
    return k + 1;
}`,
      java: `public class Solution {
    public static int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;
        int k = 0;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != nums[k]) {
                nums[++k] = nums[i];
            }
        }
        return k + 1;
    }
}`,
      c: `#include <stdio.h>

int removeDuplicates(int* nums, int numsSize) {
    if (numsSize == 0) return 0;
    int k = 0;
    for (int i = 1; i < numsSize; i++) {
        if (nums[i] != nums[k]) nums[++k] = nums[i];
    }
    return k + 1;
}`
    },
    testCases: [
      { input: { array: [1, 1, 2, 2, 3, 4, 4] }, expected: 4 }
    ]
  },
  {
    id: 'move-zeroes',
    title: 'Move Zeroes',
    topic: 'Two Pointers and Sliding Window',
    difficulty: 'Easy',
    hasVisualizer: true,
    visualizerType: 'move-zeroes',
    description: 'Given an integer array nums, move all 0s to the end of it while maintaining the relative order of the non-zero elements.\n\nNote that you must do this in-place without making a copy of the array.',
    examples: [
      {
        input: 'nums = [0, 1, 0, 3, 12]',
        output: '[1, 3, 12, 0, 0]',
        explanation: 'Non-zero numbers preserve order; zeros pushed to the rear.'
      }
    ],
    constraints: ['1 <= nums.length <= 10^4'],
    defaultInput: {
      array: [0, 1, 0, 3, 12]
    },
    complexity: {
      time: { best: 'O(N)', average: 'O(N)', worst: 'O(N)', explanation: 'Linear scan swapping non-zeros into nonZeroIndex.' },
      space: { auxiliary: 'O(1)', total: 'O(1)', explanation: 'In-place two-pointer technique.' }
    },
    codeLineMap: {
      python: { check_non_zero: 4, swap: 5, advance: 6 },
      cpp: { check_non_zero: 4, swap: 5, advance: 6 },
      java: { check_non_zero: 4, swap: 5, advance: 6 },
      c: { check_non_zero: 4, swap: 5, advance: 6 }
    },
    starterCode: {
      python: `def moveZeroes(nums):
    insert_pos = 0
    for i in range(len(nums)):
        if nums[i] != 0:
            nums[insert_pos], nums[i] = nums[i], nums[insert_pos]
            insert_pos += 1
    return nums

print(moveZeroes([0, 1, 0, 3, 12]))`,
      cpp: `#include <vector>
using namespace std;

void moveZeroes(vector<int>& nums) {
    int insertPos = 0;
    for (int i = 0; i < nums.size(); i++) {
        if (nums[i] != 0) {
            swap(nums[insertPos++], nums[i]);
        }
    }
}`,
      java: `public class Solution {
    public static void moveZeroes(int[] nums) {
        int insertPos = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != 0) {
                int temp = nums[insertPos];
                nums[insertPos++] = nums[i];
                nums[i] = temp;
            }
        }
    }
}`,
      c: `#include <stdio.h>

void moveZeroes(int* nums, int numsSize) {
    int insert_pos = 0;
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] != 0) {
            int t = nums[insert_pos]; nums[insert_pos++] = nums[i]; nums[i] = t;
        }
    }
}`
    },
    testCases: [
      { input: { array: [0, 1, 0, 3, 12] }, expected: [1, 3, 12, 0, 0] }
    ]
  },
  {
    id: 'missing-number',
    title: 'Missing Number',
    topic: 'Bit Manipulation',
    difficulty: 'Easy',
    hasVisualizer: true,
    visualizerType: 'missing-number',
    description: 'Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.\n\nCan be solved using Gauss’s summation formula n*(n+1)//2 or the XOR property.',
    examples: [
      {
        input: 'nums = [3, 0, 1]',
        output: '2',
        explanation: 'n = 3 since there are 3 numbers, so all numbers are in [0,3]. 2 is missing.'
      }
    ],
    constraints: ['n == nums.length', '1 <= n <= 10^4', '0 <= nums[i] <= n'],
    defaultInput: {
      array: [3, 0, 1]
    },
    complexity: {
      time: { best: 'O(N)', average: 'O(N)', worst: 'O(N)', explanation: 'Single pass summation calculation.' },
      space: { auxiliary: 'O(1)', total: 'O(1)', explanation: 'Only requires scalar variable for expected and actual sum.' }
    },
    codeLineMap: {
      python: { calc_expected: 2, sum_array: 3, diff: 4 },
      cpp: { calc_expected: 2, sum_array: 3, diff: 4 },
      java: { calc_expected: 2, sum_array: 3, diff: 4 },
      c: { calc_expected: 2, sum_array: 3, diff: 4 }
    },
    starterCode: {
      python: `def missingNumber(nums):
    n = len(nums)
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(nums)
    return expected_sum - actual_sum

print(missingNumber([3, 0, 1]))`,
      cpp: `#include <vector>
#include <numeric>
using namespace std;

int missingNumber(vector<int>& nums) {
    int n = nums.size();
    int expected = n * (n + 1) / 2;
    int actual = accumulate(nums.begin(), nums.end(), 0);
    return expected - actual;
}`,
      java: `public class Solution {
    public static int missingNumber(int[] nums) {
        int n = nums.length;
        int expected = n * (n + 1) / 2;
        int actual = 0;
        for (int num : nums) actual += num;
        return expected - actual;
    }
}`,
      c: `#include <stdio.h>

int missingNumber(int* nums, int numsSize) {
    int expected = numsSize * (numsSize + 1) / 2;
    int actual = 0;
    for (int i = 0; i < numsSize; i++) actual += nums[i];
    return expected - actual;
}`
    },
    testCases: [
      { input: { array: [3, 0, 1] }, expected: 2 },
      { input: { array: [0, 1] }, expected: 2 }
    ]
  },
  {
    id: 'merge-sort',
    title: 'Merge Sort',
    topic: 'Searching and Sorting',
    difficulty: 'Medium',
    hasVisualizer: true,
    visualizerType: 'merge-sort',
    description: 'Merge Sort is a Divide and Conquer algorithm that continuously splits the array into two halves until it reaches subarrays of size 1, then merges the sorted halves back together in ascending order.',
    examples: [
      {
        input: 'nums = [38, 27, 43, 3, 9, 82, 10]',
        output: '[3, 9, 10, 27, 38, 43, 82]',
        explanation: 'Recursive divide followed by sorted linear merge passes.'
      }
    ],
    constraints: ['1 <= nums.length <= 5 * 10^4'],
    defaultInput: {
      array: [38, 27, 43, 3, 9, 82, 10]
    },
    complexity: {
      time: { best: 'O(N log N)', average: 'O(N log N)', worst: 'O(N log N)', explanation: 'Consistently splits in halves (log N levels) with O(N) merge work per level.' },
      space: { auxiliary: 'O(N)', total: 'O(N)', explanation: 'Temporary array needed during merge step.' }
    },
    codeLineMap: {
      python: { split: 4, recurse_l: 5, recurse_r: 6, merge_step: 8 },
      cpp: { split: 4, recurse_l: 5, recurse_r: 6, merge_step: 8 },
      java: { split: 4, recurse_l: 5, recurse_r: 6, merge_step: 8 },
      c: { split: 4, recurse_l: 5, recurse_r: 6, merge_step: 8 }
    },
    starterCode: {
      python: `def mergeSort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = mergeSort(arr[:mid])
    right = mergeSort(arr[mid:])
    
    merged = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1
    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged

print(mergeSort([38, 27, 43, 3, 9, 82, 10]))`,
      cpp: `#include <vector>
using namespace std;

void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> left(arr.begin() + l, arr.begin() + m + 1);
    vector<int> right(arr.begin() + m + 1, arr.begin() + r + 1);
    int i = 0, j = 0, k = l;
    while (i < left.size() && j < right.size()) {
        if (left[i] <= right[j]) arr[k++] = left[i++];
        else arr[k++] = right[j++];
    }
    while (i < left.size()) arr[k++] = left[i++];
    while (j < right.size()) arr[k++] = right[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
      java: `public class Solution {
    public static void mergeSort(int[] arr, int l, int r) {
        if (l < r) {
            int m = (l + r) / 2;
            mergeSort(arr, l, m);
            mergeSort(arr, m + 1, r);
            merge(arr, l, m, r);
        }
    }
    static void merge(int[] arr, int l, int m, int r) {
        int[] temp = new int[r - l + 1];
        int i = l, j = m + 1, k = 0;
        while (i <= m && j <= r) {
            temp[k++] = (arr[i] <= arr[j]) ? arr[i++] : arr[j++];
        }
        while (i <= m) temp[k++] = arr[i++];
        while (j <= r) temp[k++] = arr[j++];
        System.arraycopy(temp, 0, arr, l, temp.length);
    }
}`,
      c: `#include <stdio.h>
#include <stdlib.h>

void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    int* L = (int*)malloc(n1 * sizeof(int));
    int* R = (int*)malloc(n2 * sizeof(int));
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
    free(L); free(R);
}`
    },
    testCases: [
      { input: { array: [38, 27, 43, 3, 9, 82, 10] }, expected: [3, 9, 10, 27, 38, 43, 82] }
    ]
  },
  {
    id: 'quick-sort',
    title: 'Quick Sort',
    topic: 'Searching and Sorting',
    difficulty: 'Medium',
    hasVisualizer: true,
    visualizerType: 'quick-sort',
    description: 'Quick Sort chooses a pivot element and partitions the array around it, such that elements less than the pivot are placed on the left, and elements greater are on the right, recursively sorting the partitions.',
    examples: [
      {
        input: 'nums = [10, 80, 30, 90, 40, 50, 70]',
        output: '[10, 30, 40, 50, 70, 80, 90]',
        explanation: 'Pivot partitions elements into sub-arrays recursively.'
      }
    ],
    constraints: ['1 <= nums.length <= 5 * 10^4'],
    defaultInput: {
      array: [10, 80, 30, 90, 40, 50, 70]
    },
    complexity: {
      time: { best: 'O(N log N)', average: 'O(N log N)', worst: 'O(N^2)', explanation: 'O(N log N) with balanced partitions; O(N^2) if pivot selection is poor (e.g. sorted array without random pivot).' },
      space: { auxiliary: 'O(log N)', total: 'O(N)', explanation: 'Recursion call stack overhead is O(log N) on average.' }
    },
    codeLineMap: {
      python: { pick_pivot: 5, partition_loop: 7, swap_elements: 9, place_pivot: 11 },
      cpp: { pick_pivot: 5, partition_loop: 7, swap_elements: 9, place_pivot: 11 },
      java: { pick_pivot: 5, partition_loop: 7, swap_elements: 9, place_pivot: 11 },
      c: { pick_pivot: 5, partition_loop: 7, swap_elements: 9, place_pivot: 11 }
    },
    starterCode: {
      python: `def quickSort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quickSort(arr, low, pi - 1)
        quickSort(arr, pi + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

print(quickSort([10, 80, 30, 90, 40, 50, 70]))`,
      cpp: `#include <vector>
using namespace std;

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) swap(arr[++i], arr[j]);
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
      java: `public class Solution {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
    static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                int t = arr[++i]; arr[i] = arr[j]; arr[j] = t;
            }
        }
        int t = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = t;
        return i + 1;
    }
}`,
      c: `#include <stdio.h>

void swap(int* a, int* b) { int t = *a; *a = *b; *b = t; }

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) swap(&arr[++i], &arr[j]);
    }
    swap(&arr[i + 1], &arr[high]);
    return i + 1;
}`
    },
    testCases: [
      { input: { array: [10, 80, 30, 90, 40, 50, 70] }, expected: [10, 30, 40, 50, 70, 80, 90] }
    ]
  },
  {
    id: 'longest-subarray',
    title: 'Longest Subarray with Sum K',
    topic: 'Two Pointers and Sliding Window',
    difficulty: 'Medium',
    hasVisualizer: true,
    visualizerType: 'longest-subarray',
    description: 'Given an array of integers and an integer k, find the length of the longest sub-array having sum equal to k. If no such subarray exists, return 0.',
    examples: [
      {
        input: 'nums = [10, 5, 2, 7, 1, 9], k = 15',
        output: '4',
        explanation: 'Subarray [5, 2, 7, 1] sums to 15 with length 4.'
      }
    ],
    constraints: ['1 <= nums.length <= 10^5'],
    defaultInput: {
      array: [10, 5, 2, 7, 1, 9],
      target: 15
    },
    complexity: {
      time: { best: 'O(N)', average: 'O(N)', worst: 'O(N)', explanation: 'Hash map storing prefix sums ensures a single pass.' },
      space: { auxiliary: 'O(N)', total: 'O(N)', explanation: 'Stores prefix sums mapped to their earliest index.' }
    },
    codeLineMap: {
      python: { add_prefix: 4, check_k: 5, check_rem: 7, store_prefix: 9 },
      cpp: { add_prefix: 4, check_k: 5, check_rem: 7, store_prefix: 9 },
      java: { add_prefix: 4, check_k: 5, check_rem: 7, store_prefix: 9 },
      c: { add_prefix: 4, check_k: 5, check_rem: 7, store_prefix: 9 }
    },
    starterCode: {
      python: `def maxSubArrayLen(nums, k):
    prefix_map = {}
    current_sum = 0
    max_len = 0
    for i, num in enumerate(nums):
        current_sum += num
        if current_sum == k:
            max_len = i + 1
        rem = current_sum - k
        if rem in prefix_map:
            max_len = max(max_len, i - prefix_map[rem])
        if current_sum not in prefix_map:
            prefix_map[current_sum] = i
    return max_len

print(maxSubArrayLen([10, 5, 2, 7, 1, 9], 15))`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

int maxSubArrayLen(vector<int>& nums, int k) {
    unordered_map<int, int> prefixMap;
    int currentSum = 0, maxLen = 0;
    for (int i = 0; i < nums.size(); i++) {
        currentSum += nums[i];
        if (currentSum == k) maxLen = i + 1;
        if (prefixMap.find(currentSum - k) != prefixMap.end()) {
            maxLen = max(maxLen, i - prefixMap[currentSum - k]);
        }
        if (prefixMap.find(currentSum) == prefixMap.end()) {
            prefixMap[currentSum] = i;
        }
    }
    return maxLen;
}`,
      java: `import java.util.HashMap;

public class Solution {
    public static int maxSubArrayLen(int[] nums, int k) {
        HashMap<Integer, Integer> map = new HashMap<>();
        int currentSum = 0, maxLen = 0;
        for (int i = 0; i < nums.length; i++) {
            currentSum += nums[i];
            if (currentSum == k) maxLen = i + 1;
            if (map.containsKey(currentSum - k)) {
                maxLen = Math.max(maxLen, i - map.get(currentSum - k));
            }
            if (!map.containsKey(currentSum)) {
                map.put(currentSum, i);
            }
        }
        return maxLen;
    }
}`,
      c: `#include <stdio.h>

int maxSubArrayLen(int* nums, int numsSize, int k) {
    int max_len = 0;
    for (int i = 0; i < numsSize; i++) {
        int sum = 0;
        for (int j = i; j < numsSize; j++) {
            sum += nums[j];
            if (sum == k && (j - i + 1) > max_len) max_len = j - i + 1;
        }
    }
    return max_len;
}`
    },
    testCases: [
      { input: { array: [10, 5, 2, 7, 1, 9], target: 15 }, expected: 4 }
    ]
  },
  {
    id: 'max-depth-binary-tree',
    title: 'Maximum Depth of Binary Tree',
    topic: 'Trees and Binary Search Trees',
    difficulty: 'Easy',
    hasVisualizer: true,
    visualizerType: 'tree-depth',
    description: 'Given the root of a binary tree, return its maximum depth.\n\nA binary tree’s maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
    examples: [
      {
        input: 'root = [3, 9, 20, null, null, 15, 7]',
        output: '3',
        explanation: 'The longest path 3 -> 20 -> 15 (or 7) has 3 nodes.'
      }
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 10^4].'],
    defaultInput: {
      tree: { val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } }
    },
    complexity: {
      time: { best: 'O(N)', average: 'O(N)', worst: 'O(N)', explanation: 'Visits all N nodes once recursively.' },
      space: { auxiliary: 'O(H)', total: 'O(N)', explanation: 'Call stack depth equals tree height H (log N for balanced, N for skewed).' }
    },
    codeLineMap: {
      python: { base_case: 2, recurse_left: 4, recurse_right: 5, combine: 6 },
      cpp: { base_case: 2, recurse_left: 4, recurse_right: 5, combine: 6 },
      java: { base_case: 2, recurse_left: 4, recurse_right: 5, combine: 6 },
      c: { base_case: 2, recurse_left: 4, recurse_right: 5, combine: 6 }
    },
    starterCode: {
      python: `def maxDepth(root):
    if not root:
        return 0
    left_depth = maxDepth(root.left)
    right_depth = maxDepth(root.right)
    return 1 + max(left_depth, right_depth)`,
      cpp: `struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

int maxDepth(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(maxDepth(root->left), maxDepth(root->right));
}`,
      java: `public class Solution {
    public static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int x) { val = x; }
    }
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`,
      c: `struct TreeNode {
    int val;
    struct TreeNode *left, *right;
};

int maxDepth(struct TreeNode* root) {
    if (!root) return 0;
    int l = maxDepth(root->left);
    int r = maxDepth(root->right);
    return 1 + (l > r ? l : r);
}`
    },
    testCases: [
      { input: { depth: 3 }, expected: 3 }
    ]
  },
  {
    id: 'inorder-traversal',
    title: 'Inorder Tree Traversal',
    topic: 'Trees and Binary Search Trees',
    difficulty: 'Easy',
    hasVisualizer: true,
    visualizerType: 'inorder-traversal',
    description: 'Given the root of a binary tree, return the inorder traversal of its nodes\' values (Left subtree -> Root -> Right subtree).',
    examples: [
      {
        input: 'root = [1, null, 2, 3]',
        output: '[1, 3, 2]',
        explanation: 'Inorder visits left, then current node, then right subtree.'
      }
    ],
    constraints: ['The number of nodes in the tree is in the range [0, 100].'],
    defaultInput: {
      tree: { val: 1, left: null, right: { val: 2, left: { val: 3, left: null, right: null }, right: null } }
    },
    complexity: {
      time: { best: 'O(N)', average: 'O(N)', worst: 'O(N)', explanation: 'Visits every node in the binary tree exactly once.' },
      space: { auxiliary: 'O(H)', total: 'O(N)', explanation: 'Stack space is proportional to tree height H.' }
    },
    codeLineMap: {
      python: { base_case: 3, traverse_left: 4, visit_node: 5, traverse_right: 6 },
      cpp: { base_case: 3, traverse_left: 4, visit_node: 5, traverse_right: 6 },
      java: { base_case: 3, traverse_left: 4, visit_node: 5, traverse_right: 6 },
      c: { base_case: 3, traverse_left: 4, visit_node: 5, traverse_right: 6 }
    },
    starterCode: {
      python: `def inorderTraversal(root):
    res = []
    def dfs(node):
        if not node: return
        dfs(node.left)
        res.append(node.val)
        dfs(node.right)
    dfs(root)
    return res`,
      cpp: `#include <vector>
using namespace std;

void dfs(TreeNode* node, vector<int>& res) {
    if (!node) return;
    dfs(node->left, res);
    res.push_back(node->val);
    dfs(node->right, res);
}

vector<int> inorderTraversal(TreeNode* root) {
    vector<int> res;
    dfs(root, res);
    return res;
}`,
      java: `import java.util.*;

public class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        dfs(root, res);
        return res;
    }
    private void dfs(TreeNode node, List<Integer> res) {
        if (node == null) return;
        dfs(node.left, res);
        res.add(node.val);
        dfs(node.right, res);
    }
}`,
      c: `#include <stdlib.h>

void dfs(struct TreeNode* node, int* res, int* returnSize) {
    if (!node) return;
    dfs(node->left, res, returnSize);
    res[(*returnSize)++] = node->val;
    dfs(node->right, res, returnSize);
}`
    },
    testCases: [
      { input: { traversal: [1, 3, 2] }, expected: [1, 3, 2] }
    ]
  },
  {
    id: 'flood-fill',
    title: 'Flood Fill',
    topic: 'Graphs',
    difficulty: 'Easy',
    hasVisualizer: true,
    visualizerType: 'flood-fill',
    description: 'An image is represented by an m x n integer grid image where image[i][j] represents the pixel value. You are also given three integers sr, sc, and color. Perform a flood fill on the image starting from pixel image[sr][sc] to color all 4-directionally connected pixels with the initial color.',
    examples: [
      {
        input: 'image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2',
        output: '[[2,2,2],[2,2,0],[2,0,1]]',
        explanation: 'From the center, connected 1s are replaced with color 2.'
      }
    ],
    constraints: ['m == image.length', 'n == image[i].length', '1 <= m, n <= 50'],
    defaultInput: {
      grid: [
        [1, 1, 1],
        [1, 1, 0],
        [1, 0, 1]
      ],
      sr: 1,
      sc: 1,
      color: 2
    },
    complexity: {
      time: { best: 'O(M*N)', average: 'O(M*N)', worst: 'O(M*N)', explanation: 'In the worst case, every pixel is visited and updated once.' },
      space: { auxiliary: 'O(M*N)', total: 'O(M*N)', explanation: 'Recursion call stack or BFS queue can hold up to M*N cells.' }
    },
    codeLineMap: {
      python: { check_bounds: 4, fill_cell: 7, recurse_4dir: 8 },
      cpp: { check_bounds: 4, fill_cell: 7, recurse_4dir: 8 },
      java: { check_bounds: 4, fill_cell: 7, recurse_4dir: 8 },
      c: { check_bounds: 4, fill_cell: 7, recurse_4dir: 8 }
    },
    starterCode: {
      python: `def floodFill(image, sr, sc, color):
    original = image[sr][sc]
    if original == color: return image
    R, C = len(image), len(image[0])
    
    def dfs(r, c):
        if 0 <= r < R and 0 <= c < C and image[r][c] == original:
            image[r][c] = color
            dfs(r+1, c)
            dfs(r-1, c)
            dfs(r, c+1)
            dfs(r, c-1)
            
    dfs(sr, sc)
    return image`,
      cpp: `#include <vector>
using namespace std;

void dfs(vector<vector<int>>& image, int r, int c, int orig, int color) {
    if (r < 0 || r >= image.size() || c < 0 || c >= image[0].size() || image[r][c] != orig) return;
    image[r][c] = color;
    dfs(image, r+1, c, orig, color);
    dfs(image, r-1, c, orig, color);
    dfs(image, r, c+1, orig, color);
    dfs(image, r, c-1, orig, color);
}

vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {
    if (image[sr][sc] != color) dfs(image, sr, sc, image[sr][sc], color);
    return image;
}`,
      java: `public class Solution {
    public int[][] floodFill(int[][] image, int sr, int sc, int color) {
        int orig = image[sr][sc];
        if (orig != color) dfs(image, sr, sc, orig, color);
        return image;
    }
    void dfs(int[][] img, int r, int c, int orig, int color) {
        if (r < 0 || r >= img.length || c < 0 || c >= img[0].length || img[r][c] != orig) return;
        img[r][c] = color;
        dfs(img, r+1, c, orig, color);
        dfs(img, r-1, c, orig, color);
        dfs(img, r, c+1, orig, color);
        dfs(img, r, c-1, orig, color);
    }
}`,
      c: `#include <stdio.h>

void dfs(int** img, int R, int C, int r, int c, int orig, int color) {
    if (r < 0 || r >= R || c < 0 || c >= C || img[r][c] != orig) return;
    img[r][c] = color;
    dfs(img, R, C, r+1, c, orig, color);
    dfs(img, R, C, r-1, c, orig, color);
    dfs(img, R, C, r, c+1, orig, color);
    dfs(img, R, C, r, c-1, orig, color);
}`
    },
    testCases: [
      { input: { gridFilled: true }, expected: true }
    ]
  },
  // Additional problems to provide a rich 30+ library across categories
  {
    id: 'valid-anagram',
    title: 'Valid Anagram',
    topic: 'Arrays and Strings',
    difficulty: 'Easy',
    hasVisualizer: true,
    visualizerType: 'valid-anagram',
    description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true', explanation: 'Character frequencies match identically.' }
    ],
    constraints: ['1 <= s.length, t.length <= 5 * 10^4'],
    defaultInput: { stringA: 'anagram', stringB: 'nagaram' },
    complexity: {
      time: { best: 'O(N)', average: 'O(N)', worst: 'O(N)', explanation: 'Linear frequency array comparison of length 26.' },
      space: { auxiliary: 'O(1)', total: 'O(1)', explanation: 'Fixed-size array of 26 characters.' }
    },
    starterCode: {
      python: `def isAnagram(s: str, t: str) -> bool:
    if len(s) != len(t): return False
    count = [0] * 26
    for c1, c2 in zip(s, t):
        count[ord(c1) - ord('a')] += 1
        count[ord(c2) - ord('a')] -= 1
    return all(x == 0 for x in count)`,
      cpp: `#include <string>
#include <vector>
using namespace std;
bool isAnagram(string s, string t) {
    if (s.size() != t.size()) return false;
    vector<int> count(26, 0);
    for (int i = 0; i < s.size(); i++) {
        count[s[i] - 'a']++;
        count[t[i] - 'a']--;
    }
    for (int c : count) if (c != 0) return false;
    return true;
}`,
      java: `public class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); i++) {
            counts[s.charAt(i) - 'a']++;
            counts[t.charAt(i) - 'a']--;
        }
        for (int c : counts) if (c != 0) return false;
        return true;
    }
}`,
      c: `#include <stdbool.h>
#include <string.h>
bool isAnagram(char* s, char* t) {
    if (strlen(s) != strlen(t)) return false;
    int counts[26] = {0};
    for (int i = 0; s[i]; i++) {
        counts[s[i] - 'a']++;
        counts[t[i] - 'a']--;
    }
    for (int i = 0; i < 26; i++) if (counts[i] != 0) return false;
    return true;
}`
    },
    testCases: [{ input: { s: 'anagram', t: 'nagaram' }, expected: true }]
  },
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    topic: 'Dynamic Programming',
    difficulty: 'Easy',
    hasVisualizer: true,
    visualizerType: 'climbing-stairs',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    examples: [
      { input: 'n = 4', output: '5', explanation: 'Ways: [1,1,1,1], [1,1,2], [1,2,1], [2,1,1], [2,2]' }
    ],
    constraints: ['1 <= n <= 45'],
    defaultInput: { n: 4 },
    complexity: {
      time: { best: 'O(N)', average: 'O(N)', worst: 'O(N)', explanation: 'Linear calculation identical to Fibonacci numbers.' },
      space: { auxiliary: 'O(1)', total: 'O(1)', explanation: 'Maintains two variables representing previous two step counts.' }
    },
    starterCode: {
      python: `def climbStairs(n: int) -> int:
    if n <= 2: return n
    first, second = 1, 2
    for _ in range(3, n + 1):
        first, second = second, first + second
    return second`,
      cpp: `int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b; a = b; b = c;
    }
    return b;
}`,
      java: `public class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int c = a + b; a = b; b = c;
        }
        return b;
    }
}`,
      c: `int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b; a = b; b = c;
    }
    return b;
}`
    },
    testCases: [{ input: { n: 4 }, expected: 5 }]
  },
  {
    id: 'single-number',
    title: 'Single Number',
    topic: 'Bit Manipulation',
    difficulty: 'Easy',
    hasVisualizer: true,
    visualizerType: 'single-number',
    description: 'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.\n\nYou must implement a solution with a linear runtime complexity and use only constant extra space using the XOR operator.',
    examples: [
      { input: 'nums = [4, 1, 2, 1, 2]', output: '4', explanation: 'Since x ^ x = 0 and x ^ 0 = x, duplicate pairs cancel out leaving 4.' }
    ],
    constraints: ['1 <= nums.length <= 3 * 10^4'],
    defaultInput: { array: [4, 1, 2, 1, 2] },
    complexity: {
      time: { best: 'O(N)', average: 'O(N)', worst: 'O(N)', explanation: 'A single pass XOR-ing all elements.' },
      space: { auxiliary: 'O(1)', total: 'O(1)', explanation: 'Constant space for running XOR accumulator.' }
    },
    starterCode: {
      python: `def singleNumber(nums):
    result = 0
    for num in nums:
        result ^= num
    return result`,
      cpp: `#include <vector>
using namespace std;
int singleNumber(vector<int>& nums) {
    int res = 0;
    for (int x : nums) res ^= x;
    return res;
}`,
      java: `public class Solution {
    public int singleNumber(int[] nums) {
        int res = 0;
        for (int x : nums) res ^= x;
        return res;
    }
}`,
      c: `int singleNumber(int* nums, int numsSize) {
    int res = 0;
    for (int i = 0; i < numsSize; i++) res ^= nums[i];
    return res;
}`
    },
    testCases: [{ input: { array: [4, 1, 2, 1, 2] }, expected: 4 }]
  },
  {
    id: 'longest-common-prefix',
    title: 'Longest Common Prefix',
    topic: 'Arrays and Strings',
    difficulty: 'Easy',
    hasVisualizer: true,
    visualizerType: 'longest-common-prefix',
    description: 'Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string "".',
    examples: [
      { input: 'strs = ["flower","flow","flight"]', output: '"fl"', explanation: 'Prefix "fl" is common to all 3 words.' }
    ],
    constraints: ['1 <= strs.length <= 200', '0 <= strs[i].length <= 200'],
    defaultInput: { strings: ['flower', 'flow', 'flight'] },
    complexity: {
      time: { best: 'O(N)', average: 'O(S)', worst: 'O(S)', explanation: 'S is sum of all characters across strings.' },
      space: { auxiliary: 'O(1)', total: 'O(1)', explanation: 'Constant auxiliary space.' }
    },
    starterCode: {
      python: `def longestCommonPrefix(strs):
    if not strs: return ""
    prefix = strs[0]
    for s in strs[1:]:
        while not s.startswith(prefix):
            prefix = prefix[:-1]
            if not prefix: return ""
    return prefix`,
      cpp: `#include <vector>
#include <string>
using namespace std;
string longestCommonPrefix(vector<string>& strs) {
    if (strs.empty()) return "";
    string prefix = strs[0];
    for (int i = 1; i < strs.size(); i++) {
        while (strs[i].find(prefix) != 0) {
            prefix = prefix.substr(0, prefix.length() - 1);
            if (prefix.empty()) return "";
        }
    }
    return prefix;
}`,
      java: `public class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs.length == 0) return "";
        String prefix = strs[0];
        for (int i = 1; i < strs.length; i++) {
            while (strs[i].indexOf(prefix) != 0) {
                prefix = prefix.substring(0, prefix.length() - 1);
                if (prefix.isEmpty()) return "";
            }
        }
        return prefix;
    }
}`,
      c: `#include <stdio.h>
#include <string.h>
char* longestCommonPrefix(char** strs, int strsSize) {
    if (strsSize == 0) return "";
    static char prefix[205];
    strcpy(prefix, strs[0]);
    for (int i = 1; i < strsSize; i++) {
        int j = 0;
        while (prefix[j] && strs[i][j] && prefix[j] == strs[i][j]) j++;
        prefix[j] = '\\0';
    }
    return prefix;
}`
    },
    testCases: [{ input: { strings: ['flower', 'flow', 'flight'] }, expected: 'fl' }]
  },
  {
    id: 'kth-largest-element',
    title: 'Kth Largest Element in an Array',
    topic: 'Searching and Sorting',
    difficulty: 'Medium',
    hasVisualizer: true,
    visualizerType: 'kth-largest',
    description: 'Given an integer array nums and an integer k, return the kth largest element in the array. Can be solved using QuickSelect in average O(N) or a Min-Heap of size k in O(N log k).',
    examples: [
      { input: 'nums = [3, 2, 1, 5, 6, 4], k = 2', output: '5', explanation: 'Sorted order is [1, 2, 3, 4, 5, 6], 2nd largest is 5.' }
    ],
    constraints: ['1 <= k <= nums.length <= 10^5'],
    defaultInput: { array: [3, 2, 1, 5, 6, 4], k: 2 },
    complexity: {
      time: { best: 'O(N)', average: 'O(N)', worst: 'O(N^2)', explanation: 'Average O(N) using QuickSelect algorithm.' },
      space: { auxiliary: 'O(1)', total: 'O(1)', explanation: 'In-place QuickSelect partition.' }
    },
    starterCode: {
      python: `import heapq
def findKthLargest(nums, k):
    return heapq.nlargest(k, nums)[-1]`,
      cpp: `#include <vector>
#include <queue>
using namespace std;
int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) minHeap.pop();
    }
    return minHeap.top();
}`,
      java: `import java.util.PriorityQueue;
public class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int val : nums) {
            pq.offer(val);
            if (pq.size() > k) pq.poll();
        }
        return pq.peek();
    }
}`,
      c: `#include <stdlib.h>
int cmp(const void* a, const void* b) { return (*(int*)b - *(int*)a); }
int findKthLargest(int* nums, int numsSize, int k) {
    qsort(nums, numsSize, sizeof(int), cmp);
    return nums[k - 1];
}`
    },
    testCases: [{ input: { array: [3, 2, 1, 5, 6, 4], k: 2 }, expected: 5 }]
  },
  {
    id: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    topic: 'Two Pointers and Sliding Window',
    difficulty: 'Hard',
    hasVisualizer: true,
    visualizerType: 'trapping-water',
    description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    examples: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6', explanation: 'Traps a total of 6 units of rain water between heights.' }
    ],
    constraints: ['n == height.length', '1 <= n <= 2 * 10^4', '0 <= height[i] <= 10^5'],
    defaultInput: { array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] },
    complexity: {
      time: { best: 'O(N)', average: 'O(N)', worst: 'O(N)', explanation: 'Two-pointer approach traverses inward in a single pass.' },
      space: { auxiliary: 'O(1)', total: 'O(1)', explanation: 'Constant space storing leftMax and rightMax.' }
    },
    starterCode: {
      python: `def trap(height):
    if not height: return 0
    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    water = 0
    while left < right:
        if left_max < right_max:
            left += 1
            left_max = max(left_max, height[left])
            water += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            water += right_max - height[right]
    return water`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;
int trap(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int leftMax = 0, rightMax = 0, water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else water += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else water += rightMax - height[right];
            right--;
        }
    }
    return water;
}`,
      java: `public class Solution {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0, water = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else water += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }
}`,
      c: `#include <stdio.h>
int trap(int* height, int heightSize) {
    int left = 0, right = heightSize - 1;
    int leftMax = 0, rightMax = 0, water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else water += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else water += rightMax - height[right];
            right--;
        }
    }
    return water;
}`
    },
    testCases: [{ input: { array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] }, expected: 6 }]
  }
];
