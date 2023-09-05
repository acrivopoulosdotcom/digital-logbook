package com.example.backend;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LogEntry {

    private String id;

    private String email;

    private String car;

    private String typeOfUse;

    private String reasonForUse;

    private String companyName;

    private String firstName;

    private String lastName;

    private String previousLocation;

    private String targetLocation;

    private Long previousOdoDisplay;

    private Long currentOdoDisplay;

    private Integer distance;

    private String notes;
}
