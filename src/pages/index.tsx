import Image from "next/image";
import logo from "./../../public/toDoLogo.svg";
import { Inter } from "next/font/google";
import { Clipboard } from "phosphor-react";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

interface taskProps {
  id: number;
  isComplete: boolean;
  task: string;
}

export default function Home() {
  const [task, setTask] = useState("");
  const [tasksArray, setTasksArray] = useState<taskProps[]>([]);

  function handleTask(event: any) {
    setTask(event.target.value);
  }

  function handleSubmitTask(event: any, data: taskProps) {
    event?.preventDefault();
    const newTask = {
      id: tasksArray.length + 1,
      isComplete: false,
      task: task,
    };

    setTasksArray([...tasksArray, newTask]);
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
          <form className="w-full flex gap-2" onSubmit={() => handleSubmitTask}>
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
                  0
                </span>
              </div>
              <div className="flex gap-2">
                Concluídas{" "}
                <span className="w-[25px] flex items-center justify-center pt-[2px] pr-[8px] pb-[2px] pl-[8px] bg-[#333333] rounded-[999px] text-white">
                  0
                </span>
              </div>
            </div>

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
          </div>
        </div>
      </main>
    </>
  );
}
