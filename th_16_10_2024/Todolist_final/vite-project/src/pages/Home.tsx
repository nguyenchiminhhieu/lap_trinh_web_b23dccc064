import { useState, useEffect } from "react";
import {
  CalendarDays,
  CircleCheckBig,
  ListTodo,
  Plus,
  Trash,
} from "lucide-react";
import Item from "../components/Item";
import TodoPieChart from "@/components/TodoPieChart";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { todoList } from "@/sampleData/todoList";
import { ItemType } from "@/types/Todo";

// framer stagger motion
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Home = () => {
  const [todoData, setTodoData] = useState<ItemType[]>(todoList);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", date: "" });
  const [showDelete, setShowDelete] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // show delete button
  useEffect(() => {
    const hasCheckedTasks = todoData.some((item) => item.state);
    setShowDelete(hasCheckedTasks);
  }, [todoData]);

  // checkbox
  const toggleItemState = (index: number) => {
    const taskIndex = todoData.findIndex(
      (task) => task === filteredTasks[index]
    );
    const updatedTodoData = [...todoData];
    updatedTodoData[taskIndex] = {
      ...updatedTodoData[taskIndex],
      state: !updatedTodoData[taskIndex].state,
    };
    setTodoData(updatedTodoData);
  };

  // convert color
  const getColorByDate = (date: string) => {
    switch (date.toLowerCase()) {
      case "today":
        return "green";
      case "tomorrow":
        return "orange";
      default:
        return "lavender";
    }
  };

  // add new task
  const handleAddTask = () => {
    if (!newTask.title || !newTask.date) {
      toast.error("Bạn chưa điền đầy đủ thông tin");
      return;
    }

    setTodoData((prevData) => [
      ...prevData,
      {
        title: newTask.title,
        date: newTask.date,
        color: getColorByDate(newTask.date),
        state: false,
      },
    ]);

    setNewTask({ title: "", date: "" });
    toast.success("Thêm task thành công");
    setIsDialogOpen(false);
  };

  const handleDeleteTask = () => {
    setTodoData(todoData.filter((item) => !item.state));
    setShowDelete(false);
  };

  // filter tasks
  const filteredTasks = todoData.filter((task) => {
    const statusMatch =
      statusFilter === "all"
        ? true
        : statusFilter === "completed"
        ? task.state
        : !task.state;

    const dateMatch =
      dateFilter === "all"
        ? true
        : dateFilter === "today"
        ? task.date.toLowerCase() === "today"
        : dateFilter === "tomorrow"
        ? task.date.toLowerCase() === "tomorrow"
        : !["today", "tomorrow"].includes(task.date.toLowerCase());

    return statusMatch && dateMatch;
  });

  const renderField = (
    label: string,
    id: string,
    placeholder: string,
    value: string,
    onChange: (e: any) => void
  ) => (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );

  return (
    <div className="flex flex-col gap-6 min-h-screen px-4">
      <div className="flex justify-between w-full pb-4 border-b border-gray-border px-4">
        <div className="flex items-center text-center gap-2 text-white font-bold text-2xl">
          <ListTodo />
          <p>My work</p>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-4 mb-4 font-semibold">
          <Select onValueChange={setStatusFilter} defaultValue="all">
            <SelectTrigger className="w-fit flex items-center gap-2">
              <CircleCheckBig className="w-4" />
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Trạng thái</SelectLabel>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="completed">Đã hoàn thành</SelectItem>
                <SelectItem value="incomplete">Chưa hoàn thành</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={setDateFilter} defaultValue="all">
            <SelectTrigger className="w-fit flex items-center gap-2">
              <CalendarDays className="w-4" />
              <SelectValue placeholder="Lọc theo thời hạn" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Thời hạn</SelectLabel>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button className="bg-sand hover:bg-sand text-dirt font-semibold">
                Thống kê 
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-sheet border border-l-gray-border border-y-0 b border-r-0">
              <SheetHeader className="border-b border-gray-border pb-4">
                <SheetTitle className="text-white font-bold">
                  Thống kê 
                </SheetTitle>
                <SheetDescription className="font-semibold text-sub-text2">
                  Thống kê dữ liệu task theo trạng thái
                </SheetDescription>
              </SheetHeader>
              <TodoPieChart data={todoData} />
            </SheetContent>
          </Sheet>
        </div>

        {showDelete && (
          <Button
            onClick={handleDeleteTask}
            className="w-fit flex items-center gap-2 bg-red-500 border-2 border-red-400 hover:bg-red-500/75 font-semibold"
          >
            <Trash className="w-4 h-4" />
            <span className="hidden sm:inline">Xóa các task đã chọn</span>
          </Button>
        )}
      </div>

      <motion.div
        className="flex flex-col gap-4"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {filteredTasks.map((item, index) => (
          <motion.div key={index} variants={itemVariant}>
            <Item
              title={item.title}
              date={item.date}
              color={item.color}
              state={item.state}
              onToggle={() => toggleItemState(index)}
            />
          </motion.div>
        ))}
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-fit bg-lavender-border text-white hover:bg-lavender-border/90 flex items-center gap-1 border-2 border-lavender font-semibold ">
            <Plus size={24} /> Thêm mới
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-6">Thêm task mới</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            {renderField(
              "Tên Task",
              "taskName",
              "Nhập tên công việc",
              newTask.title,
              (e) => setNewTask({ ...newTask, title: e.target.value })
            )}
            {renderField(
              "Ngày hết hạn",
              "dueDate",
              "Nhập ngày hết hạn (Today, Tomorrow, ...)",
              newTask.date,
              (e) => setNewTask({ ...newTask, date: e.target.value })
            )}
          </div>

          <Button
            onClick={handleAddTask}
            className="bg-lavender-border border-2 border-lavender hover:bg-lavender-border/90 font-semibold"
          >
            Xác nhận
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
