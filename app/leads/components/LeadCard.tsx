import { Card, CardContent } from "@/components/ui/card";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLink,
  FaEllipsisH,
} from "react-icons/fa";
import { Draggable } from "react-beautiful-dnd";
import { useRouter } from "next/navigation";

interface LeadCardProps {
  id: string;
  name: string;
  source: string;
  dateCreated: string;
  index: number;
}

const sourceIcons: Record<string, JSX.Element> = {
  facebook: <FaFacebook className="w-4 h-4" />,
  instagram: <FaInstagram className="w-4 h-4" />,
  twitter: <FaTwitter className="w-4 h-4" />,
  external: <FaLink className="w-4 h-4" />,
  other: <FaEllipsisH className="w-4 h-4" />,
};

const sourceNames: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  twitter: "Twitter",
  external: "External",
  other: "Other",
};

export const LeadCard = ({
  id,
  name,
  source,
  dateCreated,
  index,
}: LeadCardProps) => {
  const router = useRouter();
  
  // Format the date to show only day, month, and year
  const formattedDate = new Date(dateCreated).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    router.push(`/leads/${id}`);
  };

  const renderCard = (provided: any, snapshot: any) => (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`transition-shadow ${snapshot.isDragging ? "shadow-lg" : ""}`}
    >
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">{name}</h3>
            <button 
              onClick={handleClick}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <FaEllipsisH className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center space-x-2">
              {/* Platform Icon */}
              {sourceIcons[source] || sourceIcons.other}
              {/* Platform Name */}
              <span className="text-sm text-gray-700">
                {sourceNames[source]}
              </span>
            </div>
            <div className="mx-1 border-l border-gray-300 h-4"></div>
            <p className="text-sm text-gray-500 mt-2">{formattedDate}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Draggable draggableId={id} index={index}>
      {renderCard}
    </Draggable>
  );
};
