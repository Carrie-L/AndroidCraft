import React, { useEffect, useMemo, useState } from 'react';
import DOMPurify from 'dompurify';
import MarkdownIt from 'markdown-it';
import mdTaskLists from 'markdown-it-task-lists';
import mdAttrs from 'markdown-it-attrs';
import mdKatex from 'markdown-it-katex';
import hljs from 'highlight.js/lib/core';

// 语言注册（和 useMarkdownRenderer.js 保持一致思路）
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import python from 'highlight.js/lib/languages/python';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import java from 'highlight.js/lib/languages/java';
import kotlin from 'highlight.js/lib/languages/kotlin';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('python', python);
hljs.registerLanguage('py', python);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('shell', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('java', java);
hljs.registerLanguage('kotlin', kotlin);

interface HtmlMarkdownProps {
  content: string;
  /** 用于解析 Obsidian 图片相对路径，例如 /compose/1.1.1/ */
  basePath?: string;
  /** 额外 className，方便在外层叠加 prose 等样式 */
  className?: string;
}

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

function createMarkdownIt() {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (str, lang) => {
      try {
        if (lang && hljs.getLanguage(lang)) {
          return `<pre><code class="hljs language-${lang}">${
            hljs.highlight(str, { language: lang }).value
          }</code></pre>`;
        } else {
          return `<pre><code class="hljs">${
            hljs.highlightAuto(str).value
          }</code></pre>`;
        }
      } catch (e) {
        const esc = str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        return `<pre><code class="hljs language-plaintext">${esc}</code></pre>`;
      }
    },
  });

  md.use(mdTaskLists, { enabled: true, label: true });
  md.use(mdKatex);
  md.use(mdAttrs);

  // 兼容 mermaid 代码块：仅输出 div，后续若需要可在外部初始化 mermaid
  const defaultFence =
    md.renderer.rules.fence ??
    ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options));

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const info = (token.info || '').trim().toLowerCase();

    if (info === 'mermaid') {
      const code = token.content.trim();
      return `<div class="mermaid">${code}</div>`;
    }

    return defaultFence(tokens, idx, options, env, self);
  };

  return md;
}

const mdInstance = createMarkdownIt();

const HtmlMarkdown: React.FC<HtmlMarkdownProps> = ({ content, basePath, className }) => {
  const debouncedContent = useDebouncedValue(content, 150);

  const sanitizedHtml = useMemo(() => {
    if (debouncedContent == null) return '';

    // 1. 处理 Obsidian 图片语法：![[xxx.png]]
    let processed = debouncedContent.replace(/!\[\[(.+?)\]\]/g, (_m, p1) => {
      const raw = String(p1).trim();
      const finalSrc = basePath ? `${basePath}${raw}` : raw;
      return `![](${finalSrc})`;
    });

    // 2. 渲染为 HTML
    let rawHtml = mdInstance.render(processed);

    // 3. 安全清理（与 useMarkdownRenderer.js 保持接近）
    const clean = DOMPurify.sanitize(rawHtml, {
      ALLOWED_TAGS: [
        'p',
        'div',
        'span',
        'br',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'strong',
        'b',
        'em',
        'i',
        'u',
        'del',
        's',
        'code',
        'blockquote',
        'hr',
        'pre',
        'ul',
        'ol',
        'li',
        'table',
        'thead',
        'tbody',
        'tr',
        'th',
        'td',
        'a',
        'img',
        'body',
        'input',
        'style',
        // SVG / Mermaid 相关
        'svg',
        'g',
        'path',
        'circle',
        'rect',
        'ellipse',
        'line',
        'polyline',
        'polygon',
        'text',
        'tspan',
        'defs',
        'marker',
        'use',
        'clipPath',
        'foreignObject',
        'switch',
        'ruby',
        'rt',
        'rp',
      ],
      ALLOWED_ATTR: [
        'href',
        'src',
        'alt',
        'title',
        'colspan',
        'rowspan',
        'class',
        'data-task-index',
        'style',
        'id',
        'type',
        'checked',
        'disabled',
        'align',
        'role',
        'aria-hidden',
        // SVG 相关
        'width',
        'height',
        'viewBox',
        'xmlns',
        'x',
        'y',
        'dx',
        'dy',
        'fill',
        'stroke',
        'stroke-width',
        'stroke-dasharray',
        'transform',
        'd',
        'r',
        'cx',
        'cy',
        'x1',
        'y1',
        'x2',
        'y2',
        'points',
        'text-anchor',
        'dominant-baseline',
        'font-family',
        'font-size',
        'font-weight',
      ],
    });

    return clean;
  }, [debouncedContent, basePath]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

export default HtmlMarkdown;


