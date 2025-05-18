import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getAllPosts, createPost, likePost } from '../services/postService';
import type { Post } from '../types';
import { AxiosError } from 'axios';

interface ApiError {
  error: string;
}

export default function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [createSuccess, setCreateSuccess] = useState('');
  const [likingPosts, setLikingPosts] = useState<number[]>([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await getAllPosts();
      setPosts(data);
    } catch (err) {
      setError('Error al cargar los posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError('');
    setCreateSuccess('');
    setIsCreating(true);

    try {
      if (!newPost.title.trim() || !newPost.content.trim()) {
        setCreateError('El título y el contenido son obligatorios');
        return;
      }

      await createPost(newPost);
      setCreateSuccess('¡Post creado exitosamente!');
      setNewPost({ title: '', content: '' });
      await loadPosts();
    } catch (err) {
      console.error('Error creating post:', err);
      const error = err as AxiosError<ApiError>;
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setCreateError('El título y el contenido son obligatorios');
            break;
          case 401:
            setCreateError('No estás autorizado. Por favor, inicia sesión nuevamente.');
            break;
          default:
            setCreateError('Error al crear el post. Por favor, inténtalo de nuevo.');
        }
      } else {
        setCreateError('Error al crear el post. Por favor, inténtalo de nuevo.');
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleLike = async (postId: number) => {
    if (!user || likingPosts.includes(postId)) return;

    setLikingPosts(prev => [...prev, postId]);
    try {
      await likePost(postId);
      await loadPosts();
    } catch (err) {
      console.error('Error liking post:', err);
      const error = err as AxiosError<ApiError>;
      if (error.response?.status === 400) {
        await loadPosts();
      }
    } finally {
      setLikingPosts(prev => prev.filter(id => id !== postId));
    }
  };

  const hasUserLiked = (post: Post) => {
    return post.Likes.some(like => like.userId === user?.id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Bienvenido{user?.username ? `, ${user.username}` : ''}
        </h1>
        <p className="text-gray-600">
          Aquí puedes ver todos los posts y crear los tuyos.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Crear nuevo post</h2>
        {createError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {createError}
          </div>
        )}
        {createSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {createSuccess}
          </div>
        )}
        <form onSubmit={handleCreatePost} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Título
            </label>
            <input
              type="text"
              id="title"
              value={newPost.title}
              onChange={e => setNewPost(prev => ({ ...prev, title: e.target.value }))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Contenido
            </label>
            <textarea
              id="content"
              value={newPost.content}
              onChange={e => setNewPost(prev => ({ ...prev, content: e.target.value }))}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isCreating || !newPost.title.trim() || !newPost.content.trim()}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isCreating ? 'Creando...' : 'Crear Post'}
          </button>
        </form>
      </div>

      {error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{post.content}</p>
                  </div>
                  {post.userId === user?.id && (
                    <Link
                      to={`/posts/${post.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      Editar
                    </Link>
                  )}
                </div>
                <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900">
                      {post.User?.username || 'Usuario desconocido'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <button
                      onClick={() => handleLike(post.id)}
                      disabled={!user || likingPosts.includes(post.id) || hasUserLiked(post)}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-colors ${
                        hasUserLiked(post)
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'hover:bg-gray-100 text-gray-600 hover:text-gray-700'
                      } ${(!user || likingPosts.includes(post.id)) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill={hasUserLiked(post) ? 'currentColor' : 'none'}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span>{post.Likes.length}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
