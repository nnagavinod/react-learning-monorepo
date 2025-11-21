-- Insert seed users
INSERT INTO blog_users (username, email, avatar, bio) VALUES
('admin', 'admin@blog.com', 'https://picsum.photos/seed/user1/150', 'Blog administrator and main content creator'),
('john_doe', 'john@example.com', 'https://picsum.photos/seed/user2/150', 'Tech enthusiast and writer'),
('jane_smith', 'jane@example.com', 'https://picsum.photos/seed/user3/150', 'Full-stack developer sharing knowledge')
ON CONFLICT (username) DO NOTHING;

-- Insert seed posts
INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, author_id, tags, published, featured, views) VALUES
(
  'Getting Started with React 19',
  'getting-started-react-19',
  'Learn about the latest features in React 19 and how to get started with the new version.',
  E'# Getting Started with React 19\n\nReact 19 introduces several groundbreaking features that revolutionize how we build modern web applications. This comprehensive guide will walk you through everything you need to know.\n\n## What''s New in React 19\n\nReact 19 comes with exciting new features including:\n- Server Components for better performance\n- Improved hydration and streaming\n- Enhanced concurrent rendering\n- New hooks and APIs\n\n## Getting Started\n\nTo get started with React 19, you''ll need to update your project dependencies:\n\n```bash\nnpm install react@19 react-dom@19\n```\n\n## Server Components\n\nServer Components allow you to render components on the server, reducing the JavaScript bundle size and improving initial load times.\n\n## Conclusion\n\nReact 19 is a significant update that brings powerful new features to help you build better, faster applications. Start exploring these features today!',
  'https://picsum.photos/seed/react19/800/450',
  (SELECT id FROM blog_users WHERE username = 'admin' LIMIT 1),
  ARRAY['react', 'javascript', 'web-development'],
  true,
  true,
  1250
),
(
  'TypeScript Best Practices in 2025',
  'typescript-best-practices-2025',
  'Discover the most effective TypeScript patterns and practices for modern application development.',
  E'# TypeScript Best Practices in 2025\n\nTypeScript has become the de facto standard for building scalable JavaScript applications. Here are the best practices you should follow.\n\n## Type Safety First\n\nAlways leverage TypeScript''s type system to catch errors at compile time:\n- Use strict mode\n- Avoid ''any'' type\n- Leverage union types and type guards\n\n## Code Organization\n\nStructure your TypeScript projects for maximum maintainability:\n- Separate types from implementation\n- Use barrel exports\n- Organize by feature, not by type\n\n## Advanced Patterns\n\nMaster advanced TypeScript patterns:\n- Generic constraints\n- Conditional types\n- Template literal types\n- Mapped types\n\nStart implementing these practices today to write more robust TypeScript code!',
  'https://picsum.photos/seed/typescript/800/450',
  (SELECT id FROM blog_users WHERE username = 'john_doe' LIMIT 1),
  ARRAY['typescript', 'javascript', 'best-practices'],
  true,
  true,
  890
),
(
  'Building Scalable Web Applications',
  'building-scalable-web-applications',
  'A comprehensive guide to architecting and building applications that scale.',
  E'# Building Scalable Web Applications\n\nScalability is crucial for modern web applications. Learn how to build applications that can grow with your user base.\n\n## Architecture Principles\n\nKey principles for scalable architecture:\n- Separation of concerns\n- Modular design\n- Loose coupling\n- High cohesion\n\n## Performance Optimization\n\nOptimize your application for scale:\n- Code splitting\n- Lazy loading\n- Caching strategies\n- Database optimization\n\n## Deployment Strategies\n\nDeploy with confidence:\n- CI/CD pipelines\n- Blue-green deployments\n- Load balancing\n- Auto-scaling\n\nBuild applications that are ready to scale from day one!',
  'https://picsum.photos/seed/scalable/800/450',
  (SELECT id FROM blog_users WHERE username = 'admin' LIMIT 1),
  ARRAY['architecture', 'scalability', 'web-development'],
  true,
  true,
  2100
),
(
  'Modern CSS Techniques',
  'modern-css-techniques',
  'Explore cutting-edge CSS features and techniques for creating beautiful, responsive designs.',
  E'# Modern CSS Techniques\n\nCSS has evolved dramatically. Discover modern techniques for creating stunning user interfaces.\n\n## CSS Grid & Flexbox\n\nMaster modern layout systems:\n- Grid for two-dimensional layouts\n- Flexbox for one-dimensional layouts\n- Combining both for powerful layouts\n\n## CSS Variables\n\nUse CSS custom properties for dynamic theming:\n```css\n:root {\n  --primary-color: #3498db;\n  --spacing: 1rem;\n}\n```\n\n## Container Queries\n\nResponsive components with container queries enable component-level responsiveness.\n\nTransform your CSS skills with these modern techniques!',
  'https://picsum.photos/seed/css/800/450',
  (SELECT id FROM blog_users WHERE username = 'jane_smith' LIMIT 1),
  ARRAY['css', 'design', 'frontend'],
  true,
  false,
  650
),
(
  'Introduction to TanStack Router',
  'introduction-tanstack-router',
  'Learn how to implement type-safe routing in React applications using TanStack Router.',
  E'# Introduction to TanStack Router\n\nTanStack Router brings type-safe routing to React applications with powerful features and excellent developer experience.\n\n## Why TanStack Router?\n\nBenefits of using TanStack Router:\n- Full type safety\n- Automatic code splitting\n- Built-in data loading\n- Search param management\n- Nested routing\n\n## Getting Started\n\nInstall TanStack Router:\n```bash\nnpm install @tanstack/react-router\n```\n\n## Route Configuration\n\nDefine your routes with full type safety:\n```typescript\nconst postsRoute = createRoute({\n  path: ''/posts/$postId'',\n  component: PostDetail,\n})\n```\n\nTanStack Router is the future of React routing!',
  'https://picsum.photos/seed/router/800/450',
  (SELECT id FROM blog_users WHERE username = 'john_doe' LIMIT 1),
  ARRAY['react', 'routing', 'typescript'],
  true,
  false,
  520
),
(
  'State Management in 2025',
  'state-management-2025',
  'Compare modern state management solutions and choose the right one for your application.',
  E'# State Management in 2025\n\nState management is crucial for complex React applications. Let''s explore the modern options available.\n\n## Popular Solutions\n\nCurrent state management landscape:\n- Zustand - Minimal and fast\n- Redux Toolkit - Powerful and opinionated\n- Jotai - Atomic state management\n- React Context - Built-in solution\n\n## Choosing the Right Tool\n\nConsider these factors:\n- Application complexity\n- Team expertise\n- Performance requirements\n- Developer experience\n\n## Best Practices\n\nGuidelines for effective state management:\n- Keep state as local as possible\n- Avoid prop drilling\n- Use derived state\n- Normalize your data\n\nChoose wisely to build maintainable applications!',
  'https://picsum.photos/seed/statemanagement/800/450',
  (SELECT id FROM blog_users WHERE username = 'jane_smith' LIMIT 1),
  ARRAY['react', 'state-management', 'architecture'],
  true,
  false,
  780
)
ON CONFLICT (slug) DO NOTHING;

-- Insert seed comments
INSERT INTO blog_comments (post_id, user_id, content) VALUES
(
  (SELECT id FROM blog_posts WHERE slug = 'getting-started-react-19' LIMIT 1),
  (SELECT id FROM blog_users WHERE username = 'john_doe' LIMIT 1),
  'Great introduction to React 19! Very helpful.'
),
(
  (SELECT id FROM blog_posts WHERE slug = 'getting-started-react-19' LIMIT 1),
  (SELECT id FROM blog_users WHERE username = 'jane_smith' LIMIT 1),
  'Looking forward to trying out Server Components.'
),
(
  (SELECT id FROM blog_posts WHERE slug = 'getting-started-react-19' LIMIT 1),
  (SELECT id FROM blog_users WHERE username = 'admin' LIMIT 1),
  'Thanks for the feedback! More React 19 content coming soon.'
),
(
  (SELECT id FROM blog_posts WHERE slug = 'typescript-best-practices-2025' LIMIT 1),
  (SELECT id FROM blog_users WHERE username = 'admin' LIMIT 1),
  'Excellent TypeScript tips!'
),
(
  (SELECT id FROM blog_posts WHERE slug = 'typescript-best-practices-2025' LIMIT 1),
  (SELECT id FROM blog_users WHERE username = 'jane_smith' LIMIT 1),
  'The section on type guards was particularly useful.'
),
(
  (SELECT id FROM blog_posts WHERE slug = 'building-scalable-web-applications' LIMIT 1),
  (SELECT id FROM blog_users WHERE username = 'john_doe' LIMIT 1),
  'This will help me architect my next project better.'
),
(
  (SELECT id FROM blog_posts WHERE slug = 'building-scalable-web-applications' LIMIT 1),
  (SELECT id FROM blog_users WHERE username = 'jane_smith' LIMIT 1),
  'Scalability is so important. Thanks for sharing!'
),
(
  (SELECT id FROM blog_posts WHERE slug = 'modern-css-techniques' LIMIT 1),
  (SELECT id FROM blog_users WHERE username = 'admin' LIMIT 1),
  'CSS Grid is a game-changer!'
),
(
  (SELECT id FROM blog_posts WHERE slug = 'introduction-tanstack-router' LIMIT 1),
  (SELECT id FROM blog_users WHERE username = 'jane_smith' LIMIT 1),
  'TanStack Router looks amazing. Will give it a try!'
),
(
  (SELECT id FROM blog_posts WHERE slug = 'state-management-2025' LIMIT 1),
  (SELECT id FROM blog_users WHERE username = 'admin' LIMIT 1),
  'I''ve been using Zustand and loving it.'
);
