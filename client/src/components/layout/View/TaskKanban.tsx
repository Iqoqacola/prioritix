import { useEffect, useMemo, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import { CalendarDays } from "lucide-react";

import { useUpdateTask } from "../../../hooks/Tasks/useUpdateTask";

type TaskStatus = "pending" | "in_progress" | "completed";
type TaskPriority = "low" | "medium" | "high";

type Task = {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date?: string;
  tags?: string;
  starred?: boolean;
  project_id: number;
};

type BoardData = Record<TaskStatus, Task[]>;

type TaskKanbanProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
};

const groupTasksByStatus = (items: Task[]): BoardData => {
  const grouped: BoardData = {
    pending: [],
    in_progress: [],
    completed: [],
  };

  items.forEach((task) => {
    grouped[task.status || "pending"].push(task);
  });

  return grouped;
};

export const TaskKanban = ({ tasks, onEdit }: TaskKanbanProps) => {
  const { updateTask } = useUpdateTask();
  const groupedTasks = useMemo(() => groupTasksByStatus(tasks), [tasks]);
  const [boardData, setBoardData] = useState<BoardData>(groupedTasks);

  useEffect(() => {
    setBoardData(groupedTasks);
  }, [groupedTasks]);

  const columns = [
    {
      id: "pending" as TaskStatus,
      label: "To Do",
      bg: "bg-gray-50/50",
      border: "border-gray-200/60",
      headerColors: "text-gray-700 bg-gray-100/80 border-gray-200",
    },
    {
      id: "in_progress" as TaskStatus,
      label: "In Progress",
      bg: "bg-blue-50/30",
      border: "border-blue-100/60",
      headerColors: "text-blue-700 bg-blue-50 border-blue-100",
    },
    {
      id: "completed" as TaskStatus,
      label: "Done",
      bg: "bg-green-50/30",
      border: "border-green-100/60",
      headerColors: "text-green-700 bg-green-50 border-green-100",
    },
  ];

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const sourceColId = source.droppableId as TaskStatus;
    const destColId = destination.droppableId as TaskStatus;

    const sourceTasks = [...boardData[sourceColId]];
    const destTasks =
      sourceColId === destColId ? sourceTasks : [...boardData[destColId]];

    const [movedTask] = sourceTasks.splice(source.index, 1);
    if (!movedTask) return;

    const updatedTask: Task = {
      ...movedTask,
      status: destColId,
    };

    destTasks.splice(destination.index, 0, updatedTask);

    setBoardData((prev) => ({
      ...prev,
      [sourceColId]: sourceTasks,
      [destColId]: destTasks,
    }));

    updateTask(updatedTask);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-220px)] min-h-[500px] pb-4 overflow-x-auto">
        {columns.map((col) => (
          <div
            key={col.id}
            className={`flex flex-col h-full rounded-xl border ${col.border} ${col.bg} overflow-hidden`}
          >
            <div
              className={`p-3 flex items-center justify-between border-b ${col.headerColors} backdrop-blur-sm`}
            >
              <h3 className="font-bold text-sm">{col.label}</h3>
              <span className="bg-white/60 px-2 py-0.5 rounded-full text-xs font-bold border border-black/5 shadow-sm">
                {boardData[col.id]?.length || 0}
              </span>
            </div>
            <Droppable droppableId={col.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex-1 overflow-y-auto p-3 flex flex-col gap-3 transition-colors scrollbar-hide ${snapshot.isDraggingOver ? "bg-primary/5" : ""}`}
                >
                  {boardData[col.id]?.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => !snapshot.isDragging && onEdit(task)}
                          style={{ ...provided.draggableProps.style }}
                          className={`bg-white p-3.5 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow duration-200 group cursor-pointer select-none
                            ${snapshot.isDragging ? "shadow-2xl ring-2 ring-primary z-50 opacity-90" : ""}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded font-medium border uppercase tracking-wider
                              ${
                                task.priority === "high"
                                  ? "bg-red-50 text-danger border-red-100/50"
                                  : task.priority === "medium"
                                    ? "bg-orange-50 text-warning border-orange-100/50"
                                    : "bg-green-50 text-success border-green-100/50"
                              }`}
                            >
                              {task.priority}
                            </span>
                          </div>
                          <h4 className="font-semibold text-text-primary text-sm mb-1 line-clamp-1">
                            {task.title}
                          </h4>
                          {task.description && (
                            <p className="text-xs text-text-secondary line-clamp-2 mb-3">
                              {task.description}
                            </p>
                          )}
                          <div className="flex items-center justify-between pt-2 border-t border-dashed border-gray-100 mt-auto">
                            {task.due_date && (
                              <span className="text-xs text-text-secondary flex items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded">
                                <CalendarDays size={10} />
                                {new Date(task.due_date).toLocaleDateString(
                                  undefined,
                                  { month: "short", day: "numeric" },
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};
