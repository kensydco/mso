import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Eye, Trash2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  inquiryType?: string;
  isRead: boolean;
  createdAt: string | Date;
}

export default function AdminContact() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const utils = trpc.useUtils();
  const { data: messages, isLoading } = trpc.contact.list.useQuery();

  const markAsReadMutation = trpc.contact.markAsRead.useMutation({
    onSuccess: () => utils.contact.list.invalidate(),
  });

  const deleteMutation = trpc.contact.delete.useMutation({
    onSuccess: () => {
      utils.contact.list.invalidate();
      setDeleteId(null);
      toast.success('Message deleted successfully');
    },
    onError: (err) => toast.error(err.message),
  });

  const handleOpen = (id: number, isRead: boolean) => {
    setSelectedId(id);
    if (!isRead) {
      markAsReadMutation.mutate({ id });
    }
  };

  const selectedMessage = messages?.find((m: ContactMessage) => m.id === selectedId);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A]">Contact Messages</h1>
          <p className="text-[#64748B] mt-1">View and manage contact form submissions</p>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-8 text-center text-[#64748B]">Loading...</div>
            ) : messages?.length === 0 ? (
              <div className="p-8 text-center">
                <Mail className="w-12 h-12 mx-auto text-[#CBD5E1] mb-4" />
                <p className="text-[#64748B]">No messages yet</p>
              </div>
            ) : (
              <div className="divide-y">
                {messages?.map((msg: ContactMessage) => (
                  <div
                    key={msg.id}
                    className={`p-4 flex items-center justify-between hover:bg-[#F8FAFC] cursor-pointer ${
                      msg.isRead ? '' : 'bg-blue-50/50'
                    }`}
                    onClick={() => handleOpen(msg.id, msg.isRead)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        {!msg.isRead && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                        <h3 className={`font-semibold text-[#0F172A] ${msg.isRead ? '' : 'font-bold'}`}>
                          {msg.name}
                        </h3>
                        {msg.inquiryType && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                            {msg.inquiryType}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#64748B] mt-1 truncate max-w-lg">
                        {msg.message}
                      </p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-[#94A3B8]">
                        <span>{msg.email}</span>
                        <span>• {new Date(msg.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpen(msg.id, msg.isRead)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteId(msg.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Message Detail Dialog */}
        <Dialog open={selectedId !== null} onOpenChange={() => setSelectedId(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Message from {selectedMessage?.name}</DialogTitle>
              <DialogDescription>
                Received {selectedMessage && new Date(selectedMessage.createdAt).toLocaleString()}
              </DialogDescription>
            </DialogHeader>
            {selectedMessage && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-[#64748B]">Name</Label>
                    <p className="font-medium">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <Label className="text-[#64748B]">Email</Label>
                    <p className="font-medium">
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="text-[#3B82F6] hover:underline"
                      >
                        {selectedMessage.email}
                      </a>
                    </p>
                  </div>
                  {selectedMessage.phone && (
                    <div>
                      <Label className="text-[#64748B]">Phone</Label>
                      <p className="font-medium">{selectedMessage.phone}</p>
                    </div>
                  )}
                  {selectedMessage.inquiryType && (
                    <div>
                      <Label className="text-[#64748B]">Inquiry Type</Label>
                      <p className="font-medium">{selectedMessage.inquiryType}</p>
                    </div>
                  )}
                </div>
                <div>
                  <Label className="text-[#64748B]">Message</Label>
                  <div className="mt-2 p-4 bg-[#F8FAFC] rounded-lg text-sm whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedId(null)}>
                Close
              </Button>
              {selectedMessage && (
                <Button asChild className="bg-[#3B82F6] hover:bg-[#2563EB]">
                  <a href={`mailto:${selectedMessage.email}`}>Reply via Email</a>
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Message</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this message? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => deleteId && deleteMutation.mutate({ id: deleteId })}
                disabled={deleteMutation.isPending}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
