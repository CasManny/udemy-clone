import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";

interface ISectionProp {
  items: {
    _id: string;
    isFree: boolean;
    isPublished: boolean;
    position: number;
    progress: string[];
    resources: string[];
    title: string;
    courseId: string;
  }[];
  onReorder: (updateData: { _id: string; position: number }[]) => void;
  onEdit: (_id: string) => void;
}
const SectionList = ({ items, onReorder, onEdit }: ISectionProp) => {
  const [isMounted, setIsMounted] = useState(false);
    const [sections, setSections] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setSections(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedSection = items.slice(startIndex, endIndex + 1);
    setSections(items);

    const bulkUpdateData = updatedSection.map((section) => ({
      _id: section._id,
      position: items.findIndex((item) => item._id === section._id),
    }));
    onReorder(bulkUpdateData);
  };

  if (!isMounted) return null;
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sections">
        {(provided) => (
          <div
            className={`${
              sections.length > 0 ? "my-10" : "mt-7"
            } flex flex-col gap-5`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {sections.map((section, index) => (
              <Draggable
                key={section._id}
                draggableId={section._id}
                index={index}
              >
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="flex items-center bg-[#FFF8EB] rounded-lg text-sm font-medium p-3"
                  >
                    <div {...provided.dragHandleProps}>
                      <Grip className="h-4 w-4 cursor-pointer mr-4 hover:text-[#FDAB04]" />
                    </div>
                    {section.title}
                    <div className="ml-auto">
                      <Pencil
                        className="h-4 w-4 cursor-pointer hover:text-[#FDAB04]"
                        onClick={() => onEdit(section._id)}
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SectionList;
