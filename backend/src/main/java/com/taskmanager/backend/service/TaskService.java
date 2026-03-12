package com.taskmanager.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.taskmanager.backend.dto.AssignTaskRequest;
import com.taskmanager.backend.entity.Task;
import com.taskmanager.backend.entity.User;
import com.taskmanager.backend.repository.TaskRepository;
import com.taskmanager.backend.repository.UserRepository;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    // ===============================
    // GET ALL TASKS
    // ===============================
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // ===============================
    // GET TASK BY ID
    // ===============================
    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    // ===============================
    // CREATE TASK
    // ===============================
    public Task createTask(Task task) {

        if (task.getStatus() == null || task.getStatus().isEmpty()) {
            task.setStatus("TODO");
        }

        if (task.getPriority() == null || task.getPriority().isEmpty()) {
            task.setPriority("MEDIUM");
        }

        System.out.println("CREATE TASK -> Priority: " + task.getPriority());
        System.out.println("CREATE TASK -> DueDate: " + task.getDueDate());

        return taskRepository.save(task);
    }

    // ===============================
    // UPDATE TASK
    // ===============================
    public Task updateTask(Long id, Task updatedTask) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setStatus(updatedTask.getStatus());
        task.setPriority(updatedTask.getPriority());
        task.setDueDate(updatedTask.getDueDate());

        return taskRepository.save(task);
    }

    // ===============================
    // DELETE TASK
    // ===============================
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    // ===============================
    // ASSIGN TASK (ADMIN)
    // ===============================
public Task assignTask(AssignTaskRequest request, User admin) {

    User assignedUser = userRepository.findById(request.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));

    Task task = new Task();

    task.setTitle(request.getTitle());
    task.setDescription(request.getDescription());
    task.setStatus(request.getStatus());
    task.setPriority(request.getPriority());
    task.setDueDate(request.getDueDate());

    // 🔥 creator = admin
    task.setUser(admin);

    return taskRepository.save(task);
}

    // ===============================
    // GET TASKS BY USER
    // ===============================
    public List<Task> getTasksByUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return taskRepository.findByUser(user);
    }
}