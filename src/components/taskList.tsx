import { Trash } from "phosphor-react";

interface TaskListProps {
  id: number;
  title: string;
  isComplete: boolean;
  onCheck: (taskId: number, isComplete: boolean) => void;
  onDelete: (taskId: number) => void;
}

export function TaskList({ title, id, isComplete, onCheck, onDelete }: TaskListProps) {
  function handleCheck(event: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = event.target.checked;
    onCheck(id, isChecked);
  }

  function handleOnDelete() {
    onDelete(id)
  }
  return (
    <div className="flex">
      <input
        className="text-blue-500 border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        type="checkbox"
        checked={isComplete}
        onChange={handleCheck}
      />
      <label className="w-[600px] pl-4">{title}</label>
      <Trash className="cursor-pointer" onClick={handleOnDelete} />
    </div>
  );
}
