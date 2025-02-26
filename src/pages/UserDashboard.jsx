import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export default function UserDashboard() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    fetchNodes();
  }, []);

  const fetchNodes = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${import.meta.env.VITE_WORKER_URL}/nodes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setNodes(data);
  };

  const generateSubscription = (node) => {
    const subLink = `ss://${node.method}:${node.password}@${node.ip}:${node.port}`;
    navigator.clipboard.writeText(subLink);
    alert('订阅链接已复制到剪贴板');
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-2xl p-6 shadow-lg">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">用户仪表盘</h2>
          {nodes.map((node) => (
            <div key={node.id} className="mb-4">
              <p>{node.name} ({node.ip}:{node.port})</p>
              <Button onClick={() => generateSubscription(node)}>生成订阅</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
