package com.taskmanager.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.taskmanager.backend.entity.Task;
import com.taskmanager.backend.entity.User;

public interface TaskRepository extends JpaRepository<Task, Long> {

    // fetch tasks with user join
    @Query("SELECT t FROM Task t JOIN FETCH t.user")
    List<Task> findAll();

    List<Task> findByUser(User user);
}