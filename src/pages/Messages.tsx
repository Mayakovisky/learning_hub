import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search, Send, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  sender: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  status: "online" | "offline";
}

interface ChatMessage {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

const conversations: Message[] = [
  {
    id: 1,
    sender: "Dr. Sarah Chen",
    avatar: "SC",
    lastMessage: "Great work on the latest assignment! Your CSS is improving...",
    timestamp: "2 hours ago",
    unread: 2,
    status: "online",
  },
  {
    id: 2,
    sender: "Prof. Michael Brown",
    avatar: "MB",
    lastMessage: "The data visualization project is due next Friday",
    timestamp: "1 day ago",
    unread: 0,
    status: "online",
  },
  {
    id: 3,
    sender: "Jane Williams",
    avatar: "JW",
    lastMessage: "Check out the new UI design resources I shared",
    timestamp: "3 days ago",
    unread: 0,
    status: "offline",
  },
  {
    id: 4,
    sender: "Alex Johnson",
    avatar: "AJ",
    lastMessage: "Let me know if you have questions about React hooks",
    timestamp: "1 week ago",
    unread: 0,
    status: "offline",
  },
];

const chatMessages: ChatMessage[] = [
  {
    id: 1,
    sender: "Dr. Sarah Chen",
    content: "Hi Alex! How are you doing with the web development course?",
    timestamp: "10:30 AM",
    isOwn: false,
  },
  {
    id: 2,
    sender: "You",
    content: "Hi Dr. Chen! I'm doing great, really enjoying the course so far.",
    timestamp: "10:32 AM",
    isOwn: true,
  },
  {
    id: 3,
    sender: "Dr. Sarah Chen",
    content: "That's wonderful! I saw your flexbox assignment - very impressive!",
    timestamp: "10:35 AM",
    isOwn: false,
  },
  {
    id: 4,
    sender: "Dr. Sarah Chen",
    content: "Great work on the latest assignment! Your CSS is improving a lot.",
    timestamp: "10:37 AM",
    isOwn: false,
  },
  {
    id: 5,
    sender: "You",
    content: "Thank you so much! Your explanations in the video modules really help.",
    timestamp: "10:40 AM",
    isOwn: true,
  },
];

export const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<Message | null>(
    conversations[0]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState(chatMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filteredConversations = conversations.filter((conv) =>
    conv.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "You",
          content: inputMessage,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isOwn: true,
        },
      ]);
      setInputMessage("");
    }
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground mt-1">
            Chat with instructors and peers
          </p>
        </div>

        {/* Main Chat Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className={cn("lg:col-span-1", !sidebarOpen && "hidden lg:block")}>
            <CardHeader className="border-b">
              <CardTitle className="text-lg">Conversations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Search */}
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Conversations */}
              <ScrollArea className="h-[520px]">
                <div className="space-y-1 p-4">
                  {filteredConversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      onClick={() => {
                        setSelectedConversation(conversation);
                        setSidebarOpen(false);
                      }}
                      className={cn(
                        "w-full text-left p-3 rounded-lg transition-colors border",
                        selectedConversation?.id === conversation.id
                          ? "bg-primary/10 border-primary text-primary"
                          : "border-transparent hover:bg-muted"
                      )}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-xs font-medium">
                            {conversation.avatar}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">
                              {conversation.sender}
                            </p>
                          </div>
                          {conversation.status === "online" && (
                            <div className="h-2 w-2 bg-green-500 rounded-full" />
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {conversation.lastMessage}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          {conversation.timestamp}
                        </span>
                        {conversation.unread > 0 && (
                          <Badge variant="default" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Area */}
          {selectedConversation ? (
            <Card className="lg:col-span-2 flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                  <div className="h-10 w-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-medium">
                    {selectedConversation.avatar}
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedConversation.sender}</h3>
                    <p className="text-xs text-muted-foreground">
                      {selectedConversation.status === "online"
                        ? "Active now"
                        : "Offline"}
                    </p>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex gap-3",
                        msg.isOwn && "justify-end"
                      )}
                    >
                      {!msg.isOwn && (
                        <div className="h-8 w-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                          {selectedConversation.avatar}
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[70%] rounded-lg px-4 py-2",
                          msg.isOwn
                            ? "bg-primary text-primary-foreground rounded-br-none"
                            : "bg-muted text-muted-foreground rounded-bl-none"
                        )}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="lg:col-span-2 flex items-center justify-center">
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Select a conversation to start messaging
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
