import { useEffect, useState } from 'react';
import { useBlogDataMutate } from '../../hooks/useBlogDataMutate';
import { BlogData } from '../../interface/BlogData';

import "./modal.css";

interface InputProps {
  label: string,
  value: string | number,
  updateValue(value: any): void,
  maxLength?: number,
  showLength?: boolean
}

interface ModalProps {
  closeModal(): void
}

const Input = ({ label, value, updateValue, maxLength, showLength }: InputProps) => {
  const [length, setLength] = useState(value.toString().length);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    if (maxLength && inputValue.length > maxLength) return;
    updateValue(inputValue);
    setLength(inputValue.length);
  }

  return (
    <>
      <label>{label}</label>
      {maxLength && showLength && <span>{length}/{maxLength}</span>}
      {maxLength ?
        <textarea maxLength={maxLength} value={value} onChange={handleChange}></textarea> :
        <input type="text" value={value} onChange={handleChange} />}
    </>
  )
}

export function CreateModal({ closeModal }: ModalProps) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const { mutate, isSuccess, isLoading } = useBlogDataMutate();

  const submit = () => {
    const blogData: BlogData = {
      title,
      image,
      description
    }
    mutate(blogData)
  }

  useEffect(() => {
    if (!isSuccess) return
    closeModal();
  }, [isSuccess])

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <h2>Novo Post</h2>
        <form className="input-container">
          <Input label="Titulo" value={title} updateValue={setTitle} />
          <Input label="Imagem" value={image} updateValue={setImage} />
          <Input label="Descrição" value={description} updateValue={setDescription} maxLength={2000} showLength />
        </form>
        <button onClick={submit} className="btn-secondary">
          {isLoading ? 'postando...' : 'postar'}
        </button>
      </div>
    </div>
  )
}