import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Fragment, type ReactNode } from 'react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function highlightText(text: string | undefined, query: string): ReactNode {
  if (!text) return '';
  if (!query) return text;
  
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <Fragment>
      {parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-yellow-200 rounded-sm px-0.5">{part}</mark>
        ) : (
          part
        )
      )}
    </Fragment>
  );
}