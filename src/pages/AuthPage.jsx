import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [isAdminPage, setIsAdminPage] = useState(false);

  useEffect(() => {
    setIsAdminPage(location.pathname.startsWith('/admin'));
  }, [location.pathname]);

  const sendCode = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_WORKER_URL}/send-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) setIsCodeSent(true);
      else alert('发送验证码失败');
    } catch (error) {
      alert('网络错误');
    }
  };

  const verifyLogin = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_WORKER_URL}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        navigate('/dashboard');
      } else {
        alert('验证码错误');
      }
    } catch (error) {
      alert('登录失败');
    }
  };

  const checkAdminLogin = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_WORKER_URL}/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminUser, adminPass }),
      });
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('adminToken', token);
        navigate('/admin/dashboard');
      } else {
        alert('管理员账号或密码错误');
      }
    } catch (error) {
      alert('登录失败');
    }
  };

  if (isAdminPage) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <Card className="w-96 p-6 shadow-lg">
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">管理员登录</h2>
            <Input
              type="text"
              placeholder="管理员账号"
              value={adminUser}
              onChange={(e) => setAdminUser(e.target.value)}
              className="mb-4"
            />
            <Input
              type="password"
              placeholder="管理员密码"
              value={adminPass}
              onChange={(e) => setAdminPass(e.target.value)}
              className="mb-4"
            />
            <Button className="w-full" onClick={checkAdminLogin}>
              登录
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-96 p-6 shadow-lg">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">用户登录</h2>
          <Input
            type="email"
            placeholder="请输入邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4"
          />
          {isCodeSent && (
            <Input
              type="text"
              placeholder="输入验证码"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mb-4"
            />
          )}
          {!isCodeSent ? (
            <Button className="w-full" onClick={sendCode}>
              发送验证码
            </Button>
          ) : (
            <Button className="w-full" onClick={verifyLogin}>
              验证并登录
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
