import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProblems } from '../data/mockData';
import {
  ArrowLeft,
  BookOpen,
  ExternalLink,
  Play,
  CheckCircle2,
  AlertCircle,
  MessageSquare
} from 'lucide-react';

export default function ProblemDetail() {
  const { id } = useParams();
  const problem = mockProblems.find((p) => p.id === Number(id));
  const [activeTab, setActiveTab] = useState<'description' | 'solution' | 'discussion'>('description');
  const [code, setCode] = useState('// Write your solution here\n\nfunction solve() {\n  \n}');

  if (!problem) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Problem Not Found</h2>
          <Link to="/problems" className="text-emerald-400 hover:text-emerald-300">
            Back to Problems
          </Link>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-400 bg-green-400/10';
      case 'Medium':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'Hard':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-slate-400 bg-slate-400/10';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="h-screen flex flex-col">
        <div className="border-b border-slate-800 bg-slate-900 px-4 py-3">
          <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/problems"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-white">{problem.title}</h1>
                <div className="flex items-center space-x-3 mt-1">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getDifficultyColor(
                      problem.difficulty
                    )}`}
                  >
                    {problem.difficulty}
                  </span>
                  <span className="text-sm text-slate-400">{problem.category}</span>
                  {problem.solved && (
                    <span className="flex items-center text-sm text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Solved
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 text-sm bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors">
                Reset
              </button>
              <button className="px-4 py-2 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Run Code</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="h-full grid lg:grid-cols-2 divide-x divide-slate-800">
            <div className="overflow-y-auto bg-slate-900">
              <div className="p-6">
                <div className="flex space-x-1 border-b border-slate-800 mb-6">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`px-4 py-2 font-medium transition-colors ${
                      activeTab === 'description'
                        ? 'text-emerald-400 border-b-2 border-emerald-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab('solution')}
                    className={`px-4 py-2 font-medium transition-colors ${
                      activeTab === 'solution'
                        ? 'text-emerald-400 border-b-2 border-emerald-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Solution
                  </button>
                  <button
                    onClick={() => setActiveTab('discussion')}
                    className={`px-4 py-2 font-medium transition-colors ${
                      activeTab === 'discussion'
                        ? 'text-emerald-400 border-b-2 border-emerald-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Discussion
                  </button>
                </div>

                {activeTab === 'description' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-3">Problem Statement</h2>
                      <p className="text-slate-300 leading-relaxed">{problem.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Examples</h3>
                      <div className="space-y-4">
                        {problem.examples.map((example, index) => (
                          <div key={index} className="bg-slate-800 rounded-lg p-4">
                            <div className="mb-2">
                              <span className="text-sm font-medium text-slate-400">Input:</span>
                              <pre className="mt-1 text-white font-mono text-sm">{example.input}</pre>
                            </div>
                            <div className="mb-2">
                              <span className="text-sm font-medium text-slate-400">Output:</span>
                              <pre className="mt-1 text-white font-mono text-sm">{example.output}</pre>
                            </div>
                            {example.explanation && (
                              <div>
                                <span className="text-sm font-medium text-slate-400">Explanation:</span>
                                <p className="mt-1 text-slate-300 text-sm">{example.explanation}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Constraints</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {problem.constraints.map((constraint, index) => (
                          <li key={index} className="text-slate-300 text-sm">
                            {constraint}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <BookOpen className="w-5 h-5 mr-2" />
                        Prerequisites
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {problem.prerequisites.map((prereq, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-400/10 text-blue-400 rounded-lg text-sm"
                          >
                            {prereq}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <ExternalLink className="w-5 h-5 mr-2" />
                        Resources
                      </h3>
                      <div className="space-y-2">
                        {problem.resources.map((resource, index) => (
                          <a
                            key={index}
                            href={resource.url}
                            className="flex items-center text-emerald-400 hover:text-emerald-300 transition-colors"
                          >
                            <span className="text-sm">{resource.title}</span>
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'solution' && (
                  <div className="space-y-4">
                    <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4">
                      <p className="text-yellow-400 text-sm">
                        Try solving the problem on your own before viewing the solution!
                      </p>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-4">
                      <h3 className="text-white font-semibold mb-2">Approach</h3>
                      <p className="text-slate-300 text-sm mb-4">
                        This is a mock solution section. In a full implementation, detailed
                        explanations, time complexity analysis, and code walkthroughs would appear here.
                      </p>
                      <div className="bg-slate-900 rounded p-4">
                        <pre className="text-emerald-400 text-sm font-mono">
{`function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return [];
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'discussion' && (
                  <div className="space-y-4">
                    <div className="flex items-center text-slate-400 mb-4">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      <span>Community Discussion</span>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-6 text-center">
                      <p className="text-slate-400">
                        Discussion forum would be integrated here, allowing users to share
                        insights, ask questions, and learn from the community.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="overflow-y-auto bg-slate-950">
              <div className="p-4">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-400">Code Editor</span>
                    <select className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-sm text-white focus:outline-none focus:border-emerald-500">
                      <option>JavaScript</option>
                      <option>Python</option>
                      <option>Java</option>
                      <option>C++</option>
                    </select>
                  </div>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-96 bg-slate-900 border border-slate-800 rounded-lg p-4 text-white font-mono text-sm focus:outline-none focus:border-emerald-500 resize-none"
                    spellCheck={false}
                  />
                </div>

                <div className="bg-slate-900 rounded-lg border border-slate-800 p-4">
                  <h3 className="text-sm font-medium text-slate-400 mb-3">Test Results</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                      <span className="text-sm text-slate-300">Test Case 1</span>
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                      <span className="text-sm text-slate-300">Test Case 2</span>
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                      <span className="text-sm text-slate-300">Test Case 3</span>
                      <span className="text-sm text-slate-500">Not run</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
