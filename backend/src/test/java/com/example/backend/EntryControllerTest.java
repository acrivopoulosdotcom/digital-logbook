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
class EntryControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private EntryRepository entryRepository;

    @DirtiesContext
    @Test
    @WithMockUser
    void getAllEntriesByDate_shouldReturnEmptyList_whenDateOrEntriesAreNotExisting() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/api/entries/getAllEntriesByDate/1/18.09.2023"))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().json("[]"));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void getAllEntriesByDate_shouldReturnList_whenDateOrEntriesExists() throws Exception{
        Entry entry = new Entry("1","1","open", "test", "18.9.2023","prio","label","notes");
        entryRepository.save(entry);

        mvc.perform(MockMvcRequestBuilders.get("/api/entries/getAllEntriesByDate/1/18.9.2023"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                                [
                                {
                                "id": "1",
                                "userId": "1",
                                "status": "open",
                                "titel": "test",
                                "formattedDate": "18.9.2023",
                                "prio": "prio",
                                "label": "label"
                                }
                                ]
                                """
                ));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void getAllEntriesByLabel_shouldReturnEmptyList_whenLabelOrEntryDoesNotExists() throws Exception {

        mvc.perform(MockMvcRequestBuilders.get("/api/entries/getAllEntriesByLabel/1/label"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                                    [
                                    ]

                                    """
                ));
    }
    @DirtiesContext
    @Test
    @WithMockUser
    void getAllEntriesByLabel_shouldReturnList_whenLabelOrEntryExists() throws Exception {
        Entry entry = new Entry("1","1","open", "test", "18.9.2023","prio","label","notes");
        entryRepository.save(entry);

        mvc.perform(MockMvcRequestBuilders.get("/api/entries/getAllEntriesByLabel/1/label"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                        .andExpect(MockMvcResultMatchers.content().json(
                                """
                                            [
                                            {
                                                "id": "1",
                                                "userId": "1",
                                                "status": "open",
                                                "titel": "test",
                                                "formattedDate": "18.9.2023",
                                                "prio": "prio",
                                                "label": "label"
                                            }
                                            ]

                                            """
                        ));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void getAllEntriesByStatus_shouldReturnEmptyList_whenStatusDoesNotExists() throws Exception {
        Entry entry = new Entry("1","1","open", "test", "18.9.2023","prio","label","notes");
        entryRepository.save(entry);

        mvc.perform(MockMvcRequestBuilders.get("/api/entries/getAllEntriesByStatus/1/done"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                                    [
                                    ]

                                    """
                ));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void getAllEntriesByStatus_shouldReturnEmptyList_whenUserDoesNotExists() throws Exception {
        Entry entry = new Entry("1","2","open", "test", "18.9.2023","prio","label","notes");
        entryRepository.save(entry);

        mvc.perform(MockMvcRequestBuilders.get("/api/entries/getAllEntriesByStatus/1/done"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                                    [
                                    ]

                                    """
                ));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void getAllEntriesByStatus_shouldReturnList_whenStatusExists() throws Exception {
        Entry entry = new Entry("1","1","open", "test", "18.9.2023","prio","label","notes");
        entryRepository.save(entry);

        mvc.perform(MockMvcRequestBuilders.get("/api/entries/getAllEntriesByStatus/1/open"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                                    [
                                    {
                                        "id": "1",
                                        "userId": "1",
                                        "status": "open",
                                        "titel": "test",
                                        "formattedDate": "18.9.2023",
                                        "prio": "prio",
                                        "label": "label"
                                    }
                                    ]

                                    """
                ));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void getAllEntriesByUserIdAndStatusAndFormattedDate_shouldReturnEmptyList_whenUserIdDoesNotExists() throws Exception {
        Entry entry = new Entry("1","2","open", "test", "18.9.2023","prio","label","notes");
        entryRepository.save(entry);

        mvc.perform(MockMvcRequestBuilders.get("/api/entries/getAllEntriesByStatusAndFormattedDate/1/open/18.9.2023"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                                    [
                                    ]

                                    """
                ));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void getAllEntriesByUserIdAndStatusAndFormattedDate_shouldReturnEmptyList_whenStatusDoesNotExists() throws Exception {
        Entry entry = new Entry("1","1","done", "test", "18.9.2023","prio","label","notes");
        entryRepository.save(entry);

        mvc.perform(MockMvcRequestBuilders.get("/api/entries/getAllEntriesByStatusAndFormattedDate/1/open/18.9.2023"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                                    [
                                    ]

                                    """
                ));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void getAllEntriesByUserIdAndStatusAndFormattedDate_shouldReturnEmptyList_whenFormattedDateDoesNotExists() throws Exception {
        Entry entry = new Entry("1","1","open", "test", "19.9.2023","prio","label","notes");
        entryRepository.save(entry);

        mvc.perform(MockMvcRequestBuilders.get("/api/entries/getAllEntriesByStatusAndFormattedDate/1/open/18.9.2023"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                                    [
                                    ]

                                    """
                ));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void getAllEntriesByUserIdAndStatusAndFormattedDate_shouldReturnEntriesList_whenEverythingIsOk() throws Exception {
        Entry entry = new Entry("1","1","open", "test", "18.9.2023","prio","label","notes");
        entryRepository.save(entry);

        mvc.perform(MockMvcRequestBuilders.get("/api/entries/getAllEntriesByStatusAndFormattedDate/1/open/18.9.2023"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                                [
                                {
                                "id": "1",
                                "userId": "1",
                                "status": "open",
                                "titel": "test",
                                "formattedDate": "18.9.2023",
                                "prio": "prio",
                                "label": "label"
                                }
                                ]
                                """
                ));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void addEntry_whenEverythingIsOk_returnEntry() throws Exception {
        String newEntryJson =
                """
                {
                    "userId": "1",
                    "status": "open",
                    "titel": "test",
                    "formattedDate": "18.9.2023",
                    "prio": "prio",
                    "label": "label"
                }
                """;

        mvc.perform(MockMvcRequestBuilders
                        .post("/api/entries/addEntry")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newEntryJson)
                        .with(csrf()))
                        .andExpect(MockMvcResultMatchers.status().isOk())
                        .andExpect(MockMvcResultMatchers.content().json("""
                        {
                            "userId": "1",
                            "status": "open",
                            "titel": "test",
                            "formattedDate": "18.9.2023",
                            "prio": "prio",
                            "label": "label"
                        }
                        """));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void addEntry_whenEntryIsEmpty_returnEmptyObject() throws Exception {
        String newEntryJson =
                """
                {
                }
                """;

        mvc.perform(MockMvcRequestBuilders
                        .post("/api/entries/addEntry")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newEntryJson)
                        .with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        {
                        }
                        """));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void updateStatus_whenStatusAndIdExist_returnUpdatedEntry() throws Exception{
        Entry entry = new Entry("1","1","open", "test", "19.9.2023","prio","label","notes");
        entryRepository.save(entry);
        mvc.perform(MockMvcRequestBuilders.put("/api/entries/changeStatus/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                 {
                                      "status": "done"
                                 }
                                """
                        )
                        .with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                        
                         {
                            "id": "1",
                            "userId": "1",
                            "status": "done",
                            "titel": "test",
                            "formattedDate": "19.9.2023",
                            "prio": "prio",
                            "label": "label"
                         }
                        
                        """
                ));
    }
    @DirtiesContext
    @Test
    @WithMockUser
    void updateStatus_whenIdDoesNotExist_returnNoEntry() throws Exception{
        Entry entry = new Entry("1","1","open", "test", "19.9.2023","prio","label","notes");
        entryRepository.save(entry);
        mvc.perform(MockMvcRequestBuilders.put("/api/entries/changeStatus/2")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                   {
                                    "status": "done"
                                    }
                                """
                        )
                        .with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string(""));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void updateEntry_whenAllIsOk_returnEntry() throws Exception {
        Entry entry = new Entry("1","1","open", "test", "19.9.2023","prio","label","notes");
        entryRepository.save(entry);
        mvc.perform(MockMvcRequestBuilders.put("/api/entries/editEntry/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                             """
                             {
                                "id": "1",
                                "userId": "1",
                                "status": "done",
                                "titel": "test überarbeitet",
                                "formattedDate": "20.9.2023",
                                "prio": "prio überarbeitet",
                                "label": "label überarbeitet"
                             }
                             """
                        )
                        .with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                         """                        
                         {
                            "id": "1",
                            "userId": "1",
                            "status": "done",
                            "titel": "test überarbeitet",
                            "formattedDate": "20.9.2023",
                            "prio": "prio überarbeitet",
                            "label": "label überarbeitet"
                         }
                        """
                ));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void updateEntry_whenIdIsNotValid_returnMessage() throws Exception {
        Entry entry = new Entry("1","1","open", "test", "19.9.2023","prio","label","notes");
        entryRepository.save(entry);

        mvc.perform(MockMvcRequestBuilders.put("/api/entries/editEntry/2")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                {
                                   "id": "1",
                                   "userId": "1",
                                   "status": "done",
                                   "titel": "test überarbeitet",
                                   "formattedDate": "20.9.2023",
                                   "prio": "prio überarbeitet",
                                   "label": "label überarbeitet"
                                }
                                """
                        ))
                .andExpect(MockMvcResultMatchers.status().is4xxClientError());
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void updateTitelById_whenIdDoesNotExists_returnNoEntry() throws Exception{
        Entry entry = new Entry("1","1","open", "titel test", "19.9.2023","prio","label","notes");
        entryRepository.save(entry);
        mvc.perform(MockMvcRequestBuilders.put("/api/entries/changeTitel/2")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                {   
                                   "titel": "test überarbeitet"
                                }
                                """
                        ))
                .andExpect(MockMvcResultMatchers.status().is4xxClientError());
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void deleteEntryById_whenIdExists_showNoEntry() throws Exception{
        Entry entry = new Entry("1","1","open", "titel test", "19.9.2023","prio","label","notes");
        entryRepository.save(entry);
        mvc.perform(MockMvcRequestBuilders.delete("/api/entries/deleteEntry/1")
                        .with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string(""));
    }

    @DirtiesContext
    @Test
    @WithMockUser
    void deleteEntryById_whenIdDoesNotExist_showNoEntry() throws Exception{
        Entry entry = new Entry("1","1","open", "titel test", "19.9.2023","prio","label","notes");
        entryRepository.save(entry);
        mvc.perform(MockMvcRequestBuilders.delete("/api/entries/deleteEntry/2")
                        .with(csrf()))

                .andExpect(MockMvcResultMatchers.status().is4xxClientError());
    }
}