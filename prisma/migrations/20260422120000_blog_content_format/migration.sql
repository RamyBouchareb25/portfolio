-- Add persisted blog content format to support Markdown and HTML posts
ALTER TABLE "blog_posts"
ADD COLUMN "contentFormat" TEXT NOT NULL DEFAULT 'markdown';
