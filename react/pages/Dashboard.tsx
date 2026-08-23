import { useEffect, useState } from "react";
import { CreateButton } from "../../client/src/components/ui/Button/Button";
import { CreateMenu } from "../../client/src/components/ui/Menuui/Menu";
import { creates } from "../../client/src/constants/createscreates";
import { useGetTasks } from "../../client/src/hooks/Tasks/useGetTasksetTasks";
import { useCreateTask } from "../../client/src/hooks/Tasks/useCreateTaskateTask";
import { useTasksContext } from "../../client/src/hooks/Tasks/useTasksContextContext";

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
