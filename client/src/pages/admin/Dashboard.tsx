import { Link } from 'wouter';
import AdminLayout from '@/components/AdminLayout';
import { Briefcase, FileUser, Users, Newspaper, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { trpc } from '@/lib/trpc';

export default function Dashboard() {
  const { data: positionsData } = trpc.positions.listAll.useQuery();
  const { data: applicationsData } = trpc.applications.list.useQuery();
  const { data: newsData } = trpc.news.listAll.useQuery();
  const { data: contactData } = trpc.contact.list.useQuery();
  const { data: brandsData } = trpc.brands.list.useQuery();

  const stats = [
    {
      title: 'Portfolio Brands',
      value: brandsData?.length ?? 0,
      icon: Briefcase,
      color: 'bg-blue-500',
      href: '/admin/portfolio',
    },
    {
      title: 'Open Positions',
      value: positionsData?.filter((p: { isActive: boolean }) => p.isActive).length ?? 0,
      icon: FileUser,
      color: 'bg-green-500',
      href: '/admin/positions',
    },
    {
      title: 'Applications',
      value: applicationsData?.filter((a: { status: string }) => a.status === 'new').length ?? 0,
      description: 'New applications',
      icon: Users,
      color: 'bg-purple-500',
      href: '/admin/applications',
    },
    {
      title: 'News Articles',
      value: newsData?.length ?? 0,
      icon: Newspaper,
      color: 'bg-orange-500',
      href: '/admin/news',
    },
    {
      title: 'Contact Messages',
      value: contactData?.filter((c: { isRead: boolean }) => !c.isRead).length ?? 0,
      description: 'Unread messages',
      icon: Mail,
      color: 'bg-red-500',
      href: '/admin/contact',
    },
  ];

  const recentApplications = applicationsData?.slice(0, 5) ?? [];
  const recentMessages = contactData?.slice(0, 5) ?? [];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A]">Dashboard</h1>
          <p className="text-[#64748B] mt-1">Welcome to the Kensyd Companies admin panel</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat) => (
            <Link key={stat.title} href={stat.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#0F172A]">{stat.value}</p>
                      <p className="text-sm text-[#64748B]">{stat.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Recent Applications</CardTitle>
              <CardDescription>Latest job applications received</CardDescription>
            </CardHeader>
            <CardContent>
              {recentApplications.length === 0 ? (
                <p className="text-[#64748B] text-sm">No applications yet</p>
              ) : (
                <div className="space-y-3">
                  {recentApplications.map((app: {
                    id: number;
                    firstName: string;
                    lastName: string;
                    positionTitle?: string;
                    status: string;
                  }) => (
                    <div key={app.id} className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg">
                      <div>
                        <p className="font-medium text-[#0F172A]">{app.firstName} {app.lastName}</p>
                        <p className="text-sm text-[#64748B]">{app.positionTitle}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        app.status === 'new' ? 'bg-blue-100 text-blue-700' :
                        app.status === 'reviewing' ? 'bg-yellow-100 text-yellow-700' :
                        app.status === 'hired' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <Link href="/admin/applications" className="block mt-4 text-sm text-[#3B82F6] hover:underline">
                View all applications →
              </Link>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Recent Messages</CardTitle>
              <CardDescription>Latest contact form submissions</CardDescription>
            </CardHeader>
            <CardContent>
              {recentMessages.length === 0 ? (
                <p className="text-[#64748B] text-sm">No messages yet</p>
              ) : (
                <div className="space-y-3">
                  {recentMessages.map((msg: {
                    id: number;
                    name: string;
                    message: string;
                    isRead: boolean;
                  }) => (
                    <div key={msg.id} className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg">
                      <div>
                        <p className="font-medium text-[#0F172A]">{msg.name}</p>
                        <p className="text-sm text-[#64748B] truncate max-w-[200px]">{msg.message}</p>
                      </div>
                      {!msg.isRead && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                    </div>
                  ))}
                </div>
              )}
              <Link href="/admin/contact" className="block mt-4 text-sm text-[#3B82F6] hover:underline">
                View all messages →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
