import React, { useMemo } from 'react'
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';


interface IRichEditor {
    placeholder: string;
    onchange: (value: string) => void;
    value?: string;
}

const RichEditor = ({ placeholder, onchange, value }: IRichEditor) => {
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false}), [])
    return (
        <ReactQuill
            theme='snow'
            placeholder={placeholder}
            value={value}
            onChange={onchange}
        />
  )
}

export default RichEditor