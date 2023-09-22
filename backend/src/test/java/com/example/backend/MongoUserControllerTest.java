package com.example.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

@SpringBootTest
@AutoConfigureMockMvc
class MongoUserControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private MongoUserRepository mongoUserRepository;

    @DirtiesContext
    @Test
    @WithMockUser
    void addUser_whenUserIsOk_returnUser() throws Exception {
        String newUserJson =
                """
               {
                   "username": "test@test.de",
                   "password": "test"
               }
               """;

        mvc.perform(MockMvcRequestBuilders
                .post("/api/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(newUserJson)
                        .with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("test@test.de"));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void login() {
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void updateUser_whenUserExists_returnUpdatedEntry() throws Exception{
        MongoUser mongoUser = new MongoUser("1","test@test.de","test");
        mongoUserRepository.save(mongoUser);

        mvc.perform(MockMvcRequestBuilders
                        .put("/api/user/update/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                {
                                    "id": "1",
                                    "username": "neu@neu.de",
                                    "password": "neu neu"
                                }
                                """
                        )
                        .with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                """
                {
                   "id": "1",
                   "username": "neu@neu.de",
                   "password": "neu neu"
                }
                """
                ));
    }
}