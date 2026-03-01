import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data.token);
      navigate('/admin');
    } catch {
      setError('فشل تسجيل الدخول');
    }
  };

  return (
    <section className="section narrow">
      <h1>دخول المدير</h1>
      <form className="order-form" onSubmit={submit}>
        <input required type="email" placeholder="البريد الإلكتروني" onChange={(e) => setEmail(e.target.value)} />
        <input required type="password" placeholder="كلمة المرور" onChange={(e) => setPassword(e.target.value)} />
        <button className="btn" type="submit">دخول</button>
        {error && <p>{error}</p>}
      </form>
    </section>
  );
};

export default AdminLoginPage;
