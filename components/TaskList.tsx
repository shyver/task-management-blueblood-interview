"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "./ui/spinner"; // Assuming you have a Spinner component

type Task = {
  id: string;
  name: string;
  completed: boolean;
  createdAt: string;
};

export function TaskList() {
  const [filter, setFilter] = useState<string | null>("all");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ["tasks", filter, sortBy, order],
    queryFn: async () => {
      const completedFilter = filter === "all" ? "" : `&completed=${filter}`;
      const response = await fetch(`/api/tasks?sortBy=${sortBy}&order=${order}${completedFilter}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async (task: Task) => {
      const response = await fetch(`/api/tasks`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/tasks?id=${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  if (isLoading) return <div className="flex justify-center items-center h-64"><Spinner /></div>;

  return (
    <div className="space-y-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="  flex flex-wrap gap-2  md:justify-between items-center">
        <Select onValueChange={(value) => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Completed</SelectItem>
            <SelectItem value="false">Not Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setSortBy(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">Created At</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>
          {order === "asc" ? "Ascending" : "Descending"}
        </Button>
      </div>
      <Table className="bg-white rounded-lg shadow-md">
        <TableHeader>
          <TableRow>
        <TableHead>Status</TableHead>
        <TableHead>Name</TableHead>
        <TableHead className="hidden md:table-cell">Created At</TableHead>
        <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks?.map((task) => (
        <TableRow key={task.id} className="hover:bg-gray-100">
          <TableCell>
            <Checkbox
          checked={task.completed}
          onCheckedChange={(checked) => {
            updateTaskMutation.mutate({ ...task, completed: checked as boolean });
          }}
            />
          </TableCell>
          <TableCell>{task.name}</TableCell>
          <TableCell className="hidden md:table-cell">{new Date(task.createdAt).toLocaleString()}</TableCell>
          <TableCell>
            <Button variant="destructive" onClick={() => deleteTaskMutation.mutate(task.id)}>
          Delete
            </Button>
          </TableCell>
        </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}