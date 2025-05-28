
import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { TweetComponent } from '@/components/tweet/tweet-comp';
import Outline from './Outline'; // Added import for Outline component

const CustomLink = (props: any) => {
  const href = props.href;

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

function RoundedImage(props: any) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

function Callout(props: any) {
  return (
    <div className="px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm flex items-center text-neutral-900 dark:text-neutral-100 mb-8">
      <div className="flex items-center w-4 mr-4">{props.emoji}</div>
      <div className="w-full callout">{props.children}</div>
    </div>
  );
}

function ProsCard({ title, pros }: {
  title: string;
  pros: string[];
}) {
  return (
    <div className="border border-emerald-200 dark:border-emerald-900 bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 my-4 w-full">
      <span>{`You might use ${title} if...`}</span>
      <div className="mt-4">
        {pros.map((pro: any) => (
          <div key={pro} className="flex font-medium items-baseline mb-2">
            <div className="h-4 w-4 mr-2">
              <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </g>
              </svg>
            </div>
            <span>{pro}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConsCard({ title, cons }: {
  title: string;
  cons: string[];
}) {
  return (
    <div className="border border-red-200 dark:border-red-900 bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 my-6 w-full">
      <span>{`You might not use ${title} if...`}</span>
      <div className="mt-4">
        {cons.map((con) => (
          <div key={con} className="flex font-medium items-baseline mb-2">
            <div className="h-4 w-4 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-red-500"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </div>
            <span>{con}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const components = {
  Image: RoundedImage,
  a: CustomLink,
  Callout,
  ProsCard,
  ConsCard,
  StaticTweet: TweetComponent,
};

// Helper function to recursively extract text from children
const getTextFromChildren = (children: React.ReactNode): string => {
  let text = '';
  React.Children.forEach(children, (child) => {
    if (typeof child === 'string') {
      text += child;
    } else if (React.isValidElement(child) && child.props.children) {
      // If the child is a React element and has children, recurse
      text += getTextFromChildren(child.props.children);
    }
    // Note: This won't extract 'alt' text from images or other non-textual elements if they end up in headings.
    // For typical MDX headings (text, links, inline code), this should be sufficient.
  });
  return text;
};


// Helper function to generate slugs (should be identical to the one in Outline.tsx,
// minus the duplicate handling)
const generateSlug = (children: React.ReactNode): string => {
  const textContent = getTextFromChildren(children);
  return textContent
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, ''); // Remove special characters (alphanumeric and hyphens allowed)
};

const CustomH1 = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
  const slug = generateSlug(children);
  return <h1 id={slug} {...props}>{children}</h1>;
};

const CustomH2 = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
  const slug = generateSlug(children);
  return <h2 id={slug} {...props}>{children}</h2>;
};

const CustomH3 = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
  const slug = generateSlug(children);
  return <h3 id={slug} {...props}>{children}</h3>;
};

const CustomH4 = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
  const slug = generateSlug(children);
  return <h4 id={slug} {...props}>{children}</h4>;
};

const componentsWithCustomHeadings = {
  ...components, // Spread the existing components
  h1: CustomH1,
  h2: CustomH2,
  h3: CustomH3,
  h4: CustomH4,
};

export function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);

  return (
    <div style={{ display: 'flex' }}> {/* Added a wrapper div for layout */}
      <article className="prose prose-quoteless prose-neutral dark:prose-invert flex-grow"> {/* Added flex-grow to article */}
        <Component components={componentsWithCustomHeadings} /> {/* Use components with custom headings */}
      </article>
      <Outline content={code} /> {/* Added the Outline component here */}
    </div>
  );
}
