import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, User } from 'lucide-react';

function Forum() {
  const [discussions] = useState([
    {
      id: 1,
      author: 'John Doe',
      title: 'Best approach for Two Sum problem?',
      excerpt: 'I solved it with brute force but wondering if there is a better way...',
      replies: 5,
      likes: 12,
      category: 'Arrays',
      time: '2 hours ago'
    },
    {
      id: 2,
      author: 'Sarah Smith',
      title: 'Help with Dynamic Programming concepts',
      excerpt: 'Can someone explain the memoization technique in simple terms?',
      replies: 8,
      likes: 23,
      category: 'Dynamic Programming',
      time: '4 hours ago'
    },
    {
      id: 3,
      author: 'Mike Johnson',
      title: 'String manipulation tricks and tips',
      excerpt: 'Share your favorite string manipulation patterns here!',
      replies: 12,
      likes: 34,
      category: 'Strings',
      time: '1 day ago'
    },
    {
      id: 4,
      author: 'Emily Chen',
      title: 'Graph algorithms - which one to use?',
      excerpt: 'When should I use DFS vs BFS? Pros and cons?',
      replies: 6,
      likes: 18,
      category: 'Algorithms',
      time: '1 day ago'
    },
  ]);

  return (
    <div className="forum-page">
      <div className="page-header">
        <h2>Community Discussions</h2>
        <p>Learn from others and share your knowledge</p>
      </div>

      <div className="forum-action-bar">
        <button className="btn btn-primary">+ Start New Discussion</button>
      </div>

      <div className="discussions-list">
        {discussions.map(discussion => (
          <div key={discussion.id} className="discussion-card">
            <div className="discussion-header">
              <div className="author-info">
                <div className="avatar">
                  <User size={24} />
                </div>
                <div className="author-details">
                  <span className="author-name">{discussion.author}</span>
                  <span className="discussion-time">{discussion.time}</span>
                </div>
              </div>
              <span className="category-badge">{discussion.category}</span>
            </div>

            <div className="discussion-body">
              <h3 className="discussion-title">{discussion.title}</h3>
              <p className="discussion-excerpt">{discussion.excerpt}</p>
            </div>

            <div className="discussion-footer">
              <div className="engagement-stats">
                <span className="stat">
                  <MessageCircle size={16} />
                  {discussion.replies} replies
                </span>
                <span className="stat">
                  <ThumbsUp size={16} />
                  {discussion.likes} likes
                </span>
              </div>
              <button className="btn btn-secondary btn-sm">View Thread</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forum;
