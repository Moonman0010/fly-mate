interface ChatListProps {
  onSelectChat: (chatId: string) => void;
  searchQuery: string; // Accept search query for filtering
}

export default function ChatList({ onSelectChat, searchQuery }: ChatListProps) {
  const chats = [
    { id: "chat1", name: "BOOM BOOM" },
    { id: "chat2", name: "Bangarang" },
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {filteredChats.length > 0 ? (
        filteredChats.map(chat => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className="w-full text-left p-2 hover:bg-gray-800 rounded-md"
          >
            {chat.name}
          </button>
        ))
      ) : (
        <p className="text-gray-400">No chats found</p>
      )}
    </div>
  );
}