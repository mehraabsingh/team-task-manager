import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/tasks"
      );

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">
        Team Task Manager Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">
            Total Tasks
          </h2>

          <p className="text-3xl mt-4">
            {totalTasks}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">
            In Progress
          </h2>

          <p className="text-3xl mt-4">
            {inProgressTasks}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">
            Completed
          </h2>

          <p className="text-3xl mt-4">
            {completedTasks}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6">
          Tasks
        </h2>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="border p-4 rounded-lg"
            >
              <h3 className="text-xl font-semibold">
                {task.title}
              </h3>

              <p className="text-gray-600 mt-2">
                {task.description}
              </p>

              <div className="flex gap-4 mt-4">
                <span className="bg-blue-100 px-3 py-1 rounded">
                  {task.status}
                </span>

                <span className="bg-red-100 px-3 py-1 rounded">
                  {task.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}