import React, { useRef, useEffect } from 'react';
import 'quill/dist/quill.snow.css'; // import Quill styles
import Quill from 'quill';

interface QuillEditorProps {
  onChange: (content: string) => void;
  value: string;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ onChange, value }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  console.log("value...",value);
  
  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['link'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['blockquote', 'code-block'],
            [{ script: 'sub' }, { script: 'super' }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['clean'] // remove formatting button
          ]
        }
      });

      // Set the initial content
      quillRef.current.root.innerHTML = value;

      quillRef.current.on('text-change', () => {
        if (quillRef.current) {
          onChange(quillRef.current.root.innerHTML);
        }
      });
    }

    return () => {
      // Cleanup editor instance on component unmount
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, [onChange, value]);

  useEffect(() => {
    console.log("quillRef.current...",quillRef.current);
    if (quillRef.current) {
      // Update content if prop value changes
      quillRef.current.root.innerHTML = value;
    }
  }, [value]);

  return <div ref={editorRef} />;
};

export default QuillEditor;
