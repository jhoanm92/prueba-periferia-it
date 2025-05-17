import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { getProfile } from '../services/userService';
import type { User } from '../types';

export default function UserProfile() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await getProfile();
        setUser(profileData);
        setFormData({
          username: profileData.username,
          email: profileData.email,
        });
      } catch (err) {
        setError('Error al cargar el perfil');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    alert('Perfil actualizado');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4">
        <p>No has iniciado sesión.</p>
        <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
          Iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-indigo-100 text-indigo-600 text-xl font-bold mb-4">
              {user.username.charAt(0).toUpperCase()}
            </div>
            {!isEditing ? (
              <>
                <h2 className="text-2xl font-bold text-gray-800">{user.username}</h2>
                <p className="text-gray-600">{user.email}</p>
              </>
            ) : (
              <h2 className="text-2xl font-bold text-gray-800">Editar Perfil</h2>
            )}
          </div>
          
          {!isEditing ? (
            <div className="space-y-4">
              <div className="border-t border-b border-gray-200 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">ID</p>
                    <p className="mt-1">{user.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nombre de usuario</p>
                    <p className="mt-1">{user.username}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="mt-1">{user.email}</p>
                  </div>
                </div>
              </div>

              {user.Posts && user.Posts.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Mis Posts</h3>
                  <div className="space-y-4">
                    {user.Posts.map(post => (
                      <div key={post.id} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-lg font-medium text-gray-800 mb-2">{post.title}</h4>
                        <p className="text-gray-600">{post.content}</p>
                        <div className="mt-2 text-sm text-gray-500">
                          Publicado el {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex-1 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors"
                >
                  Editar perfil
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition-colors disabled:opacity-50"
                >
                  {loading ? 'Guardando...' : 'Guardar cambios'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
