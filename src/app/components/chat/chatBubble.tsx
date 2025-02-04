export default function ChatBubble({
    userId,
    message,
    isCurrentUser,
  }: {
    userId: string;
    message: string;
    isCurrentUser: boolean;
  }) {
    return (
      <div
        className={`mb-2 p-2 rounded ${
          isCurrentUser ? "bg-yellow-400 text-black text-right" : "bg-gray-700"
        }`}
      >
        <strong>{userId}:</strong> {message}
      </div>
    );
  }