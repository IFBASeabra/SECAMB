"use client"

import { marked } from 'marked';
import markdownContent from '@/content/termsAndConditions.md';

export default function MarkdownPage() {
  const htmlContent = marked(markdownContent);

  return (
    <div className="terms-and-conditions">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}
