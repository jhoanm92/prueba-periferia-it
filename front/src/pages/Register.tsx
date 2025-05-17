import RegisterForm from '../components/RegisterForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-indigo-600">Mi Red</h1>
          <p className="mt-2 text-sm text-gray-600">
            Crea una cuenta nueva para empezar
          </p>
        </div>
        
        <RegisterForm />
      </div>
    </div>
  );
}
