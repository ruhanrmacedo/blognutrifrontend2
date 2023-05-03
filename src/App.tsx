import { useState } from 'react'
import './App.css'
import { Blog } from './components/blog/blog';
//import { BlogData } from './interface/BlogData';
import { useBlogData } from './hooks/useBlogData';
import { CreateModal } from './components/create-modal/create-modal';

function App() {
  const { data } = useBlogData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }

  return (
    <div className="container">
      <h1>Blog Nutri</h1>
      <div className='blog-grid'>
        {data?.map(blogData =>
          <Blog
            title={blogData.title}
            image={blogData.image}
            description={blogData.description}
          />
        )}
      </div>
      {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
      <button onClick={handleOpenModal}>Novo Post</button>
    </div>
  )

}
export default App
