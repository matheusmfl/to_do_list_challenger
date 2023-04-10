import Image from "next/image";
import logo from "./../../public/toDoLogo.svg";
import { Inter } from "next/font/google";
import { Clipboard } from "phosphor-react";
import { useState } from "react";
import { TaskList } from "@/components/taskList";

// Armazenas as informações da Task CHECK

// Adicionar no array de TASKS a nova task CHECK

// Marcar uma TASK como completa

// Guardar quantas tasks completas tem e quantas tem no total

// remover uma task pelo ID

const inter = Inter({ subsets: ["latin"] });

interface taskProps {
  id: number;
  isComplete: boolean;
  taskName: string;
}

export default function Home() {
  const [task, setTask] = useState("");
  const [tasksArray, setTasksArray] = useState<taskProps[]>([]);

  let counterTasksUncompleted = 0;
  const completedTasks = tasksArray.map((task) => {
    if (task.isComplete === true) {
      return (counterTasksUncompleted += 1);
    }
  });

  function handleTask(event: any) {
    setTask(event.target.value);
  }

  function handleSubmitTask(event: any) {
    event?.preventDefault();
    const newTask = {
      id: tasksArray.length + 1,
      isComplete: false,
      taskName: task,
    };

    if (task.length > 0) {
      return setTasksArray([...tasksArray, newTask]);
    } else return alert("Digite uma tarefa");
  }

  function handleCheckTask(taskId: number, isComplete: boolean) {
    const updatedTasks = tasksArray.map((task) =>
      task.id === taskId ? { ...task, isComplete: isComplete } : task
    );

    setTasksArray(updatedTasks);
  }

  function handleOnDelete(taskId: number) {
    const arrayFiltered = tasksArray.filter((task) => {
      return task.id !== taskId;
    });
    setTasksArray(arrayFiltered);
  }

  console.log(tasksArray);
  return (
    <>
      <header className="bg-gray-900 flex justify-center items-center h-52 ">
        <Image
          src={logo}
          alt="Logo de um foguete com o nome ToDo escrito"
          className="w-32 h-12"
        />
      </header>

      <main className="bg-gray-500 flex justify-center h-screen relative">
        <div
          className="max-w-2xl absolute top-[-27px] 
        "
        >
          <form
            className="w-full flex gap-2"
            onSubmit={(event) => handleSubmitTask(event)}
          >
            <input
              type="text"
              onChange={handleTask}
              className="h-[54px] min-w-[638px] bg-[#262626] border border-solid border-gray-900 rounded-lg"
            />
            <button
              type="submit"
              className="h-full w-[90px] flex items-center justify-center"
            >
              Criar
            </button>
          </form>
          <div className="mt-4">
            <div className="flex justify-between">
              <div className="flex gap-2">
                Tarefas criadas{" "}
                <span className="w-[25px] flex items-center justify-center pt-[2px] pr-[8px] pb-[2px] pl-[8px] bg-[#333333] rounded-[999px] text-white">
                  {tasksArray.length}
                </span>
              </div>
              <div className="flex gap-2">
                Concluídas{" "}
                <span className="w-[52px] h-[19px] text-xs text-center flex items-center justify-center pt-[2px] pr-[8px] pb-[2px] pl-[8px] bg-[#333333] rounded-[999px] text-white">
                  {counterTasksUncompleted} de {tasksArray.length}
                </span>
              </div>
            </div>

            {tasksArray.length === 0 ? (
              <div className="min-h-[245px] border-t border-solid border-gray-600 mt-4 flex items-center justify-center">
                <div className="flex items-center justify-center flex-col">
                  <Clipboard className="w-14 h-14" />
                  <strong className="font-inter font-bold text-lg leading-relaxed text-center">
                    Você ainda não tem tarefas cadastradas <br />
                  </strong>
                  <span className="font-normal text-center w-full block">
                    Crie tarefas e organize seus itens a fazer
                  </span>
                </div>
              </div>
            ) : (
              tasksArray.map((task) => {
                return (
                  <TaskList
                    key={task.id}
                    id={task.id}
                    isComplete={task.isComplete}
                    onCheck={(
                      taskId = task.id,
                      isComplete = !task.isComplete
                    ) => handleCheckTask(taskId, isComplete)}
                    title={task.taskName}
                    onDelete={handleOnDelete}
                  />
                );
              })
            )}
          </div>
        </div>
      </main>
    </>
  );
}
