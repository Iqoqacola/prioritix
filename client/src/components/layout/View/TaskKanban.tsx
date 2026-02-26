import { useEffect, useMemo, useState } from "react";
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

  // State untuk melacak item yang sedang di-drag
  const [draggedItem, setDraggedItem] = useState<{
    id: number;
    colId: TaskStatus;
    index: number;
  } | null>(null);
  const [dragOverCol, setDragOverCol] = useState<TaskStatus | null>(null);

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

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    task: Task,
    colId: TaskStatus,
    index: number,
  ) => {
    setDraggedItem({ id: task.id, colId, index });
    // Menentukan efek visual kursor saat drag
    e.dataTransfer.effectAllowed = "move";
    // Set data kosong sebagai syarat agar drag berfungsi di beberapa browser
    e.dataTransfer.setData("text/plain", "");

    // CATATAN: Kode setTimeout untuk opacity 50% DIHAPUS di sini agar item tidak "hilang".
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setDraggedItem(null);
    setDragOverCol(null);
    // CATATAN: Kode penghapus opacity juga DIHAPUS.
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    colId: TaskStatus,
  ) => {
    e.preventDefault(); // Wajib: Mencegah default behavior browser yang menolak drop
    e.dataTransfer.dropEffect = "move";
    if (dragOverCol !== colId) {
      setDragOverCol(colId);
    }
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    destColId: TaskStatus,
    dropIndex?: number,
  ) => {
    e.preventDefault();
    setDragOverCol(null);

    if (!draggedItem) return;

    const { id: taskId, colId: sourceColId, index: sourceIndex } = draggedItem;

    // Jika di-drop di tempat yang sama persis, tidak perlu ada perubahan
    if (
      sourceColId === destColId &&
      sourceIndex === dropIndex &&
      dropIndex !== undefined
    )
      return;

    const sourceTasks = [...boardData[sourceColId]];
    const destTasks =
      sourceColId === destColId ? sourceTasks : [...boardData[destColId]];

    // Cari index terkini dari task yang di-drag (jaga-jaga kalau ada update async)
    const currentTaskIndex = sourceTasks.findIndex((t) => t.id === taskId);
    if (currentTaskIndex === -1) return;

    // 1. Hapus task dari array kolom asal
    const [movedTask] = sourceTasks.splice(currentTaskIndex, 1);

    // Update status task agar sesuai kolom tujuan
    const updatedTask: Task = {
      ...movedTask,
      status: destColId,
    };

    // 2. Masukkan task ke array kolom tujuan
    if (dropIndex !== undefined) {
      // Kalau di-drop di atas task lain, selipkan di posisi tersebut
      destTasks.splice(dropIndex, 0, updatedTask);
    } else {
      // Kalau di-drop di area kosong kolom, taruh paling bawah
      destTasks.push(updatedTask);
    }

    // Update state board secara lokal (optimistic update) agar terasa cepat
    setBoardData((prev) => ({
      ...prev,
      [sourceColId]: sourceTasks,
      [destColId]: destTasks,
    }));

    // Trigger update ke server jika status berubah (pindah kolom)
    if (sourceColId !== destColId) {
      updateTask(updatedTask);
    }
    // Catatan: Jika lu butuh menyimpan urutan baru dalam satu kolom,
    // lu perlu memanggil API tambahan di sini untuk menyimpan order baru 'destTasks'.
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-220px)] min-h-[500px] pb-4 overflow-x-auto">
      {columns.map((col) => (
        <div
          key={col.id}
          className={`flex flex-col h-full rounded-xl border ${col.border} ${col.bg} overflow-hidden transition-colors duration-200 ease-in-out`}
        >
          {/* Column Header */}
          <div
            className={`p-3 flex items-center justify-between border-b ${col.headerColors} backdrop-blur-sm`}
          >
            <h3 className="font-bold text-sm">{col.label}</h3>
            <span className="bg-white/60 px-2 py-0.5 rounded-full text-xs font-bold border border-black/5 shadow-sm">
              {boardData[col.id]?.length || 0}
            </span>
          </div>

          {/* Droppable Area */}
          <div
            // Event handlers untuk area kolom
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDragLeave={() => setDragOverCol(null)}
            onDrop={(e) => handleDrop(e, col.id)}
            className={`flex-1 overflow-y-auto p-3 flex flex-col gap-3 scrollbar-hide transition-all duration-200 ease-in-out ${
              dragOverCol === col.id
                ? "bg-primary/5 ring-2 ring-inset ring-primary/20"
                : ""
            }`}
          >
            {boardData[col.id]?.map((task, index) => (
              <div
                key={task.id}
                id={`task-${task.id}`}
                draggable // Mengaktifkan fitur drag native HTML5
                // Event handlers untuk item task
                onDragStart={(e) => handleDragStart(e, task, col.id, index)}
                onDragEnd={handleDragEnd}
                // Handle drop pada task lain untuk fitur reordering
                onDragOver={(e) => handleDragOver(e, col.id)}
                onDrop={(e) => {
                  // Mencegah bubbling agar drop tidak ditangani dua kali oleh kolom
                  e.stopPropagation();
                  handleDrop(e, col.id, index);
                }}
                onClick={() => {
                  // Mencegah edit terpanggil saat selesai drag
                  if (draggedItem?.id !== task.id) onEdit(task);
                }}
                // Styling dinamis berdasarkan state drag
                className={`bg-white p-3.5 rounded-xl border border-border shadow-sm hover:shadow-md cursor-pointer select-none transition-all duration-200 ease-in-out
                  ${
                    draggedItem?.id === task.id
                      ? "border-dashed border-primary/50 bg-gray-50 shadow-none" // Style saat item ini sedang di-drag (sumber)
                      : ""
                  }`}
              >
                {/* Task Content */}
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
                      {new Date(task.due_date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
