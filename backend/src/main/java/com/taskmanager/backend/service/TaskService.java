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

    // GET all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // GET task by ID
    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    // CREATE task
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    // UPDATE task
    public Task updateTask(Long id, Task updatedTask) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setStatus(updatedTask.getStatus());

        return taskRepository.save(task);
    }

    // DELETE task
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    // ASSIGN TASK TO USER
    public Task assignTask(AssignTaskRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setUser(user);

        return taskRepository.save(task);
    }

    // GET TASKS BY USER
    public List<Task> getTasksByUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return taskRepository.findByUser(user);
    }


}