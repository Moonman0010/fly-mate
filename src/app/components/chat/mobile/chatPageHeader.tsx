interface MobileChatHeaderProps {
    onBack: () => void;
  }
  
  export default function MobileChatHeader({ onBack }: MobileChatHeaderProps) {
    return (
      <div className="flex items-center justify-between p-2">
        {/* Back Button */}
        <button
          className="text-yellow-400 text-lg font-bold"
          onClick={onBack}
        >
          ← Back
        </button>
  
        {/* Three-Dot Menu */}
        <button className="text-yellow-400 text-xl">⋮</button>
      </div>
    );
  }