import { TaskList } from "@/components/TaskList"
import { TaskForm } from "@/components/TaskForm"
import { ClientProvider } from "@/components/ClientProvider"

export default function Home() {
  return (
    <ClientProvider>
      <main className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-8">Task Management</h1>
        <TaskForm />
        <div className="mt-8">
          <TaskList />
        </div>
      </main>
    </ClientProvider>
  )
}