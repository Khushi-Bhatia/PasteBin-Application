package com.example.pastebin.service;


import com.example.pastebin.dto.CreatePasteRequest;
import com.example.pastebin.model.Paste;
import com.example.pastebin.repository.PasteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import java.time.Instant;
import java.util.UUID;

@Service
public class PasteService {

    @Autowired
    private PasteRepository repo;

    public Paste create(CreatePasteRequest req, String baseUrl) {
        Paste p = new Paste();
        p.setId(UUID.randomUUID().toString().substring(0, 8));
        p.setContent(req.content);
        p.setCreatedAt(Instant.now());

        if (req.ttl_seconds != null) {
            p.setExpiresAt(Instant.now().plusSeconds(req.ttl_seconds));
        }

        if (req.max_views != null) {
            p.setMaxViews(req.max_views);
        }

        return repo.save(p);
    }

    public Paste fetch(String id, Instant now) {
        Paste p = repo.findById(id).orElseThrow();

        if (p.getExpiresAt() != null && now.isAfter(p.getExpiresAt())) {
            throw new RuntimeException("Expired");
        }

        if (p.getMaxViews() != null &&
                p.getViewCount() >= p.getMaxViews()) {
            throw new RuntimeException("View limit exceeded");
        }

        p.setViewCount(p.getViewCount() + 1);
        repo.save(p);

        return p;
    }
}

