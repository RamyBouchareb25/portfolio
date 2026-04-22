"use client";

import React, { useEffect, useRef } from "react";

interface HtmlContentSandboxProps {
  html: string;
  className?: string;
}

export function HtmlContentSandbox({
  html,
  className = "",
}: HtmlContentSandboxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !html) return;

    // Create Shadow DOM root if it doesn't exist
    let shadowRoot = containerRef.current.shadowRoot;
    if (!shadowRoot) {
      shadowRoot = containerRef.current.attachShadow({ mode: "open" });
    }

    // Clear previous content
    shadowRoot.innerHTML = "";

    // Create a temporary wrapper to parse HTML
    const tempWrapper = document.createElement("div");
    tempWrapper.innerHTML = html;

    // Extract CSS from style tags and transform :root to :host for Shadow DOM
    let allCss = "";
    const styleTags = tempWrapper.querySelectorAll("style");
    styleTags.forEach((styleTag) => {
      let cssText = styleTag.textContent || "";
      // Transform :root to :host so CSS custom properties work in shadow DOM
      cssText = cssText.replace(/:root\s*\{/g, ":host {");

      // Remove background/color-scheme from :host block to prevent override
      cssText = cssText.replace(/:host\s*\{([^}]*)\}/g, (match) => {
        // Remove background, background-color, color-scheme properties
        const cleaned = match
          .replace(/background\s*:\s*[^;]*;?/g, "")
          .replace(/background-color\s*:\s*[^;]*;?/g, "")
          .replace(/color-scheme\s*:\s*[^;]*;?/g, "");
        return cleaned;
      });

      allCss += cssText + "\n";
    });

    // Create base styles with all extracted CSS
    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: block;
      }

      /* All styles from the HTML content */
      ${allCss}

      /* Ensure callout text color is always dark on light backgrounds */
      .callout {
        color: var(--ink) !important;
      }

      * {
        box-sizing: border-box;
      }

      div, section, article, p, h1, h2, h3, h4, h5, h6, ul, ol, li, blockquote, pre, code, span, a, img, strong, em, b, i {
        all: revert;
      }
    `;

    shadowRoot.appendChild(style);

    // Create wrapper for content
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;

    // Remove style tags from wrapper since we've already injected them
    wrapper.querySelectorAll("style").forEach((tag) => tag.remove());

    shadowRoot.appendChild(wrapper);
  }, [html]);

  return <div ref={containerRef} className={className} />;
}
