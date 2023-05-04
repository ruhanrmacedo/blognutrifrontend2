import { useState } from 'react'
import './App.css'
import { Blog } from './components/blog/blog';
import { BlogData } from './interface/BlogData';
import { useBlogData } from './hooks/useBlogData';
import { CreateModal } from './components/create-modal/create-modal';
import { useDeleteBlog } from './hooks/useDeleteBlog';

function App() {
  const { data, isLoading, isError } = useBlogData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');
  const deleteBlog = useDeleteBlog();

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }

  //Alert identificando o titulo do post que o usuário gostaria de excluir
  const handleDeletePost = async () => {
    const post = data?.find(blogData => blogData.id === Number(postIdToDelete));
    const confirmMessage = `Tem certeza que deseja excluir o post "${post?.title}"?`;
    
    if (window.confirm(confirmMessage)) {
      await deleteBlog.mutateAsync(Number(postIdToDelete));
      setPostIdToDelete('');
    }
  };

  return (
    <div className="container">
      <h1>Blog Nutri</h1>
      {isError && <div>Erro ao carregar dados do blog.</div>}
      {isLoading ? ( // Tratar o estado de carregamento
        <div>Carregando...</div>
      ) : (
        <div className='blog-grid blog-grid-reverse'>
          {data?.reverse()?.map((blogData: BlogData) => ( // reverse fará com que os novos posts sejam exibidos no início da lista
            <div key={blogData.id}>
              <Blog
                id={blogData.id}
                title={blogData.title}
                image={blogData.image}
                description={blogData.description}
              />
            </div>
          ))}
        </div>
      )}
      
      <div className="delete-form">
        <label htmlFor="postIdInput">ID do post:</label>
        <input type="number" id="postIdInput" value={postIdToDelete} onChange={(e) => setPostIdToDelete(e.target.value)} />
        <button onClick={handleDeletePost}>Excluir</button>
      </div>
      {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
      <button onClick={handleOpenModal}>Novo Post</button>
    </div>
  );
}
export default App
