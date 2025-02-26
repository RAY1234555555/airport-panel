import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export default function AdminDashboard() {
  const [nodes, setNodes] = useState([]);
  const [newNode, setNewNode] = useState({ name: '', ip: '', port: '', method: '', password: '' });

  useEffect(() => {
    fetchNodes();
  }, []);

  const fetchNodes = async () => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${import.meta.env.VITE_WORKER_URL}/nodes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setNodes(data);
  };

  const addNode = async () => {
    const token = localStorage.getItem('adminToken');
    await fetch(`${import.meta.env.VITE_WORKER_URL}/nodes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(newNode),
    });
    fetchNodes();
    setNewNode({ name: '', ip: '', port: '', method: '', password: '' });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-2xl p-6 shadow-lg">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">管理面板</h2>
          <div className="mb-4">
            <Input placeholder="节点名称" value={newNode.name} onChange={(e) => setNewNode({ ...newNode, name: e.target.value })} />
            <Input placeholder="IP" value={newNode.ip} onChange={(e) => setNewNode({ ...newNode, ip: e.target.value })} />
            <Input placeholder="端口" value={newNode.port} onChange={(e) => setNewNode({ ...newNode, port: e.target.value })} />
            <Input placeholder="加密方式" value={newNode.method} onChange={(e) => setNewNode({ ...newNode, method: e.target.value })} />
            <Input placeholder="密码" value={newNode.password} onChange={(e) => setNewNode({ ...newNode, password: e.target.value })} />
            <Button onClick={addNode}>添加节点</Button>
          </div>
          {nodes.map((node) => (
            <div key={node.id}>{node.name} ({node.ip}:{node.port})</div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
