package com.example.pastebin.repository;


import com.example.pastebin.model.Paste;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasteRepository extends JpaRepository<Paste, String> {
}

