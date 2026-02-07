import { useEffect, useState } from "react";
import { CreateButton } from "../components/ui/Button";
import { CreateMenu } from "../components/ui/Menu";
import { creates } from "../constants/creates";
import { useGetTasks } from "../hooks/Tasks/useGetTasks";
import { useCreateTask } from "../hooks/Tasks/useCreateTask";
import { useTasksContext } from "../hooks/Tasks/useTasksContext";

const Dashboard = () => {
  const [isCreateAcitve, setIsCreateAcitve] = useState(false);
  const { tasks } = useTasksContext();
  const { getTasks } = useGetTasks();
  const handleCreate = () => {
    setIsCreateAcitve((prev: boolean) => !prev);
  };

  useEffect(() => {}, []);
  return (
    <div className="relative">
      <CreateButton handleCreateButtonClick={handleCreate} />

      {isCreateAcitve && (
        <CreateMenu creates={creates} handleCloseButton={handleCreate} />
      )}

      <div>Dashboard</div>
    </div>
  );
};

export default Dashboard;
