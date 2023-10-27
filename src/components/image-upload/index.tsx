'use client';

// import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';

export default function PostImageUpload({ sk }: { sk?: string }) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<any | null>(null);
  return (
    <>
      <h1>Upload Your Image</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (!inputFileRef.current?.files) {
            throw new Error('No file selected');
          }

          const file = inputFileRef.current.files[0];

          const response = await fetch(
            `/api/images?filename=${file.name}&sk=${sk}`,
            {
              method: 'POST',
              body: file,
            },
          );

          const newBlob = (await response.json()) as any;
          setBlob(newBlob);
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
}
