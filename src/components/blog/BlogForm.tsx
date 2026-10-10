import { X } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import LinkExtension from '@tiptap/extension-link';
import ImageExtension from '@tiptap/extension-image';
import { Table as TableExtension } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { Extension } from '@tiptap/core';
import HardBreak from '@tiptap/extension-hard-break';
import { EditorToolbar } from './EditorToolbar';
import { BlogPost, FormData, DEFAULT_CATEGORIES } from '../../types/blog';

const SVGNode = Extension.create({
  name: 'svgNode',

  addGlobalAttributes() {
    return [
      {
        types: ['paragraph', 'heading'],
        attributes: {
          style: {
            default: null,
            parseHTML: element => element.getAttribute('style'),
            renderHTML: attributes => {
              if (!attributes.style) return {};
              return { style: attributes.style };
            },
          },
        },
      },
    ];
  },
});

interface BlogFormProps {
  onClose: () => void;
  onSave: (formData: FormData) => Promise<void>;
  editingPost?: BlogPost | null;
  initialFormData: FormData;
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const PreserveFormatting = Extension.create({
  name: 'preserveFormatting',

  addProseMirrorPlugins() {
    const { Plugin, PluginKey } = require('@tiptap/pm/state');
    const { Slice, DOMParser: PMDOMParser } = require('@tiptap/pm/model');

    return [
      new Plugin({
        key: new PluginKey('preserveFormatting'),
        props: {
          handlePaste: (view: any, event: ClipboardEvent) => {
            const html = event.clipboardData?.getData('text/html');
            if (!html) return false;

            try {
              const parser = new DOMParser();
              const doc = parser.parseFromString(html, 'text/html');

              const { schema } = view.state;
              const slice = Slice.maxOpen(PMDOMParser.fromSchema(schema).parse(doc));
              view.dispatch(view.state.tr.replaceSelection(slice));
              return true;
            } catch (err) {
              return false;
            }
          },
        },
      }),
    ];
  },
});

export function BlogForm({
  onClose,
  onSave,
  editingPost,
  formData,
  setFormData,
}: BlogFormProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        codeBlock: false,
        paragraph: {
          HTMLAttributes: {
            class: 'paragraph',
          },
        },
      }),
      HardBreak.configure({
        keepMarks: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      LinkExtension.configure({
        openOnClick: false,
        autolink: true,
      }),
      ImageExtension.configure({
        allowBase64: true,
        inline: false,
      }),
      TableExtension.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      SVGNode,
      PreserveFormatting,
    ],
    content: formData.content,
    onUpdate: ({ editor }) => {
      setFormData({ ...formData, content: editor.getHTML() });
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none',
      },
    },
  });

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in title and content');
      return;
    }

    try {
      await onSave({
        ...formData,
        tags: formData.tags as string,
      });
      onClose();
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <div className="blog-form-overlay">
      <div className="blog-form">
        <div className="form-header">
          <h3>{editingPost ? 'Edit Post' : 'Create New Post'}</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <input
          type="text"
          placeholder="Post Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="form-input"
        />

        <div className="tiptap-editor-wrapper">
          <EditorToolbar editor={editor} />
          <EditorContent editor={editor} className="editor-content" />
        </div>

        <input
          type="text"
          placeholder="Featured Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="form-input"
        />

        <div className="form-row">
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="form-select"
          >
            {DEFAULT_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            max="60"
            value={formData.readingTime}
            onChange={(e) => setFormData({ ...formData, readingTime: parseInt(e.target.value) })}
            className="form-input"
            placeholder="Reading time (minutes)"
          />
        </div>

        <input
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className="form-input"
          placeholder="Time"
        />

        <input
          type="text"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          className="form-input"
          placeholder="Author Name"
        />

        <textarea
          placeholder="Excerpt (optional - auto-generated if empty)"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          className="form-textarea"
          style={{ minHeight: '60px' }}
        />

        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          className="form-input"
          placeholder="Tags (comma-separated: React, Docker, etc.)"
        />

        <div className="form-checkbox">
          <input
            type="checkbox"
            id="featured"
            checked={formData.isFeatured}
            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
          />
          <label htmlFor="featured">⭐ Feature this post</label>
        </div>

        <button className="save-btn" onClick={handleSave}>
          {editingPost ? 'Update Post' : 'Publish Post'}
        </button>
      </div>
    </div>
  );
}
