package com.example.pastebin.controller;

import com.example.pastebin.dto.CreatePasteRequest;
import com.example.pastebin.dto.PasteResponse;
import com.example.pastebin.model.Paste;
import com.example.pastebin.service.PasteService;
import com.example.pastebin.util.TimeProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/pastes")
public class PasteController {

    @Autowired
    PasteService service;

    @Autowired
    TimeProvider timeProvider;

    @GetMapping("/healthz")
    public Map<String, Boolean> health() {
        return Map.of("ok", true);
    }

    @PostMapping
    public Map<String, String> create(@RequestBody @Valid CreatePasteRequest req, HttpServletRequest request) {
        Paste p = service.create(req, request.getRequestURL().toString());
        return Map.of("id", p.getId());
    }

    @GetMapping("/{id}")
    public PasteResponse fetch(@PathVariable String id, HttpServletRequest request) {
        Instant now = timeProvider.now(request);
        Paste p = service.fetch(id, now);

        PasteResponse res = new PasteResponse();
        res.content = p.getContent();
        res.remaining_views = p.getMaxViews() == null ? null : p.getMaxViews() - p.getViewCount();
        res.expires_at = p.getExpiresAt();

        return res;
    }
}
