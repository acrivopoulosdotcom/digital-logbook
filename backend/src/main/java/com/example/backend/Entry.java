package com.example.backend;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@With
public class Entry {

    private String id;

    private String userId;

    private String status;

    private String todoTitel;

    private String formattedDate;

    private String prio;

    private String label;

    private String notes;
}
