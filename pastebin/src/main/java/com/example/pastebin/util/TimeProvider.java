package com.example.pastebin.util;

//public class TimeProvider {
//}

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class TimeProvider {

    @Value("${TEST_MODE:0}")
    private int testMode;

    public Instant now(HttpServletRequest request) {
        if (testMode == 1) {
            String header = request.getHeader("x-test-now-ms");
            if (header != null) {
                return Instant.ofEpochMilli(Long.parseLong(header));
            }
        }
        return Instant.now();
    }
}

