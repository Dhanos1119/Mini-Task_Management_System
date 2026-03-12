package com.taskmanager.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanager.backend.dto.AssignTaskRequest;
import com.taskmanager.backend.entity.Task;
import com.taskmanager.backend.entity.User;
import com.taskmanager.backend.repository.UserRepository;
import com.taskmanager.backend.service.TaskService;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    private final TaskService taskService;
    private final UserRepository userRepository;

    public TaskController(TaskService taskService, UserRepository userRepository) {
        this.taskService = taskService;
        this.userRepository = userRepository;
    }

    // ===============================
    // GET ALL TASKS
    // ===============================
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    // ===============================
    // GET TASK BY ID
    // ===============================
    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    // ===============================
    // CREATE TASK (USER CREATE)
    // ===============================
    @PostMapping
    public Task createTask(@RequestBody Task task, Authentication authentication) {

        if (authentication == null) {
            throw new RuntimeException("User not authenticated");
        }

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // creator
        task.setUser(user);

        return taskService.createTask(task);
    }

    // ===============================
    // UPDATE TASK
    // ===============================
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }

    // ===============================
    // DELETE TASK
    // ===============================
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    // ===============================
    // ADMIN ASSIGN TASK
    // ===============================
    @PostMapping("/assign")
public Task assignTask(@RequestBody AssignTaskRequest request, Authentication authentication) {

    String email = authentication.getName();

    User admin = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Admin not found"));

    return taskService.assignTask(request, admin);
}
    // ===============================
    // GET TASKS BY USER
    // ===============================
    @GetMapping("/user/{userId}")
    public List<Task> getTasksByUser(@PathVariable Long userId) {
        return taskService.getTasksByUser(userId);
    }

    // ===============================
    // MARK TASK COMPLETE
    // ===============================
    @PutMapping("/{id}/complete")
    public Task completeTask(@PathVariable Long id) {

        Task task = taskService.getTaskById(id);

        task.setStatus("DONE");

        return taskService.updateTask(id, task);
    }

    // ===============================
    // TASK STATISTICS
    // ===============================
    @GetMapping("/stats")
    public Map<String, Long> getTaskStats() {

        List<Task> tasks = taskService.getAllTasks();

        long total = tasks.size();

        long completed = tasks.stream()
                .filter(task -> "DONE".equals(task.getStatus()))
                .count();

        long pending = tasks.stream()
                .filter(task -> !"DONE".equals(task.getStatus()))
                .count();

        Map<String, Long> stats = new HashMap<>();

        stats.put("total", total);
        stats.put("completed", completed);
        stats.put("pending", pending);

        return stats;
    }
}