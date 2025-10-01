export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  acceptanceRate: number;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  prerequisites: string[];
  resources: Array<{
    title: string;
    url: string;
  }>;
  solved: boolean;
  attempts: number;
}

export const mockProblems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    acceptanceRate: 47.2,
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9"
    ],
    prerequisites: ["Hash Tables", "Array Traversal"],
    resources: [
      { title: "Hash Table Basics", url: "#" },
      { title: "Array Algorithms", url: "#" }
    ],
    solved: true,
    attempts: 3
  },
  {
    id: 2,
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "Linked List",
    acceptanceRate: 71.5,
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]"
      },
      {
        input: "head = [1,2]",
        output: "[2,1]"
      }
    ],
    constraints: [
      "The number of nodes in the list is the range [0, 5000]",
      "-5000 <= Node.val <= 5000"
    ],
    prerequisites: ["Linked Lists", "Pointer Manipulation"],
    resources: [
      { title: "Linked List Fundamentals", url: "#" },
      { title: "Pointer Techniques", url: "#" }
    ],
    solved: true,
    attempts: 2
  },
  {
    id: 3,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    acceptanceRate: 40.1,
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets and in the correct order.",
    examples: [
      {
        input: "s = \"()\"",
        output: "true"
      },
      {
        input: "s = \"()[]{}\"",
        output: "true"
      },
      {
        input: "s = \"(]\"",
        output: "false"
      }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'"
    ],
    prerequisites: ["Stack Data Structure", "String Processing"],
    resources: [
      { title: "Stack Implementation", url: "#" },
      { title: "Matching Algorithms", url: "#" }
    ],
    solved: false,
    attempts: 1
  },
  {
    id: 4,
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Dynamic Programming",
    acceptanceRate: 49.8,
    description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "[4,-1,2,1] has the largest sum = 6"
      },
      {
        input: "nums = [1]",
        output: "1"
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    prerequisites: ["Dynamic Programming", "Kadane's Algorithm"],
    resources: [
      { title: "DP Introduction", url: "#" },
      { title: "Kadane's Algorithm Explained", url: "#" }
    ],
    solved: false,
    attempts: 0
  },
  {
    id: 5,
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Arrays",
    acceptanceRate: 44.3,
    description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals.",
    examples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
        explanation: "Since intervals [1,3] and [2,6] overlap, merge them into [1,6]"
      }
    ],
    constraints: [
      "1 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= starti <= endi <= 10^4"
    ],
    prerequisites: ["Sorting", "Array Manipulation"],
    resources: [
      { title: "Interval Problems", url: "#" },
      { title: "Sorting Algorithms", url: "#" }
    ],
    solved: true,
    attempts: 4
  },
  {
    id: 6,
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    category: "Trees",
    acceptanceRate: 61.2,
    description: "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "[[3],[9,20],[15,7]]"
      }
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 2000]",
      "-1000 <= Node.val <= 1000"
    ],
    prerequisites: ["Binary Trees", "BFS", "Queue"],
    resources: [
      { title: "Tree Traversals", url: "#" },
      { title: "BFS vs DFS", url: "#" }
    ],
    solved: false,
    attempts: 2
  },
  {
    id: 7,
    title: "Word Ladder",
    difficulty: "Hard",
    category: "Graph",
    acceptanceRate: 36.7,
    description: "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that every adjacent pair of words differs by a single letter. Return the length of the shortest transformation sequence.",
    examples: [
      {
        input: "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
        output: "5",
        explanation: "One shortest transformation sequence is \"hit\" -> \"hot\" -> \"dot\" -> \"dog\" -> \"cog\", which is 5 words long"
      }
    ],
    constraints: [
      "1 <= beginWord.length <= 10",
      "endWord.length == beginWord.length",
      "1 <= wordList.length <= 5000"
    ],
    prerequisites: ["Graph Theory", "BFS", "Hash Sets"],
    resources: [
      { title: "Graph Algorithms", url: "#" },
      { title: "Shortest Path Problems", url: "#" }
    ],
    solved: false,
    attempts: 0
  },
  {
    id: 8,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Binary Search",
    acceptanceRate: 34.2,
    description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
    examples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        explanation: "merged array = [1,2,3] and median is 2"
      },
      {
        input: "nums1 = [1,2], nums2 = [3,4]",
        output: "2.50000",
        explanation: "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5"
      }
    ],
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000"
    ],
    prerequisites: ["Binary Search", "Divide and Conquer"],
    resources: [
      { title: "Binary Search Mastery", url: "#" },
      { title: "Median Finding Algorithms", url: "#" }
    ],
    solved: false,
    attempts: 5
  }
];

export const userStats = {
  problemsSolved: 3,
  totalProblems: 8,
  easy: { solved: 2, total: 3 },
  medium: { solved: 1, total: 3 },
  hard: { solved: 0, total: 2 },
  streak: 5,
  totalAttempts: 17,
  averageTime: 42,
  recentActivity: [
    { date: '2025-09-30', problemsSolved: 1, timeSpent: 45 },
    { date: '2025-09-29', problemsSolved: 2, timeSpent: 80 },
    { date: '2025-09-28', problemsSolved: 0, timeSpent: 30 },
    { date: '2025-09-27', problemsSolved: 1, timeSpent: 55 },
    { date: '2025-09-26', problemsSolved: 1, timeSpent: 38 },
    { date: '2025-09-25', problemsSolved: 2, timeSpent: 92 },
    { date: '2025-09-24', problemsSolved: 1, timeSpent: 48 }
  ]
};

export const categories = [
  "All",
  "Arrays",
  "Linked List",
  "Stack",
  "Queue",
  "Trees",
  "Graph",
  "Dynamic Programming",
  "Binary Search",
  "Sorting",
  "Backtracking"
];
