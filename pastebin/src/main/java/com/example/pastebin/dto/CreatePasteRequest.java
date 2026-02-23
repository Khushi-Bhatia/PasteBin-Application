
package com.example.pastebin.dto;

import jakarta.validation.constraints.NotBlank;

public class CreatePasteRequest {

    @NotBlank
    public String content;

    public Integer ttl_seconds;
    public Integer max_views;
}

