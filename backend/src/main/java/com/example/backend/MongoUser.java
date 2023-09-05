package com.example.backend;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("user")
@With
public class MongoUser {

    private String id;
    private String email;
    private String password;
    private String salutation;
    private String firstName;
    private String lastName;

}
