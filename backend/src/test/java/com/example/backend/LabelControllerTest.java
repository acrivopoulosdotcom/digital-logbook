package com.example.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
class LabelControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private LabelRepository labelRepository;


    @DirtiesContext
    @Test
    void addLabel_whenEverythingIsOK_returnEntry() throws Exception {
        String newEntryJson =
                """
                {
                    "userId": "1",
                    "name": "Test"
                }
                """;

        mvc.perform(MockMvcRequestBuilders
                .post("/api/label/addLabel")
                .contentType(MediaType.APPLICATION_JSON)
                .content(newEntryJson))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                   {
                       "userId": "1",
                       "name": "Test"
                   }
                   """));
    }

    @DirtiesContext
    @Test
    void addLabel_whenParamsAreEmpty_returnEmptyParamsFields() throws Exception {
        String newEntryJson =
                """
                {
                    "userId": "",
                    "name": ""
                }
                """;

        mvc.perform(MockMvcRequestBuilders
                        .post("/api/label/addLabel")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newEntryJson))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                   {
                       "userId": "",
                       "name": ""
                   }
                   """));
    }

    @DirtiesContext
    @Test
    void getLabelsByUserId_whenUserIdExists_returnLabelsList() throws Exception {
        Label labelOne = new Label( "1","1", "Eins");
        Label labelTwo = new Label("2", "1","Zwei");
        labelRepository.save(labelOne);
        labelRepository.save(labelTwo);

        mvc.perform(MockMvcRequestBuilders.get("/api/label/getAllLabels/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
             
                [
                {
                    "id": "1",
                    "userId": "1",
                    "name": "Eins"
                },
                {
                    "id": "2",
                    "userId": "1",
                    "name": "Zwei"
                }
                ]
                   """));
    }

    @DirtiesContext
    @Test
    void getLabelsByUserId_whenUserIdDoesNotExist_returnEmptyList() throws Exception {
        Label labelOne = new Label( "1","1", "Eins");
        Label labelTwo = new Label("2", "1","Zwei");
        labelRepository.save(labelOne);
        labelRepository.save(labelTwo);

        mvc.perform(MockMvcRequestBuilders.get("/api/label/getAllLabels/2"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
             
                [
                ]
                   """));
    }

    @DirtiesContext
    @Test
    void deleteLabelByLabelId_whenLabelIdExists_returnNoLabel() throws Exception{
        Label labelOne = new Label( "1","1", "Eins");
        labelRepository.save(labelOne);

        mvc.perform(MockMvcRequestBuilders.delete("/api/label/deleteLabel/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string(""));
    }

    @DirtiesContext
    @Test
    void deleteLabelByLabelId_whenLabelIdDoesNotExist_returnNoLabel() throws Exception{
        Label labelOne = new Label( "1","1", "Eins");
        labelRepository.save(labelOne);

        mvc.perform(MockMvcRequestBuilders.delete("/api/label/deleteLabel/2"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string(""));
    }
}