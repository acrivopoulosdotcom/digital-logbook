package com.example.backend;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.test.annotation.DirtiesContext;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class LabelServiceTest {

    @DirtiesContext
    @Test
    public void getAllLabelsByUserId_whenUserIdExists_returnList() {
        LabelRepository labelRepository = Mockito.mock(LabelRepository.class);
        IdService idService = Mockito.mock(IdService.class);
        LabelService labelService = new LabelService(labelRepository,idService);

        Mockito.when(labelRepository.findLabelsByUserId("1")).thenReturn(List.of(
                new Label("1", "1", "Wohnung"),
                new Label("2", "1", "Arbeit")
        ));

        assertEquals(
                List.of(
                    new Label("1", "1", "Wohnung"),
                    new Label("2", "1", "Arbeit")
                ),
                labelService.getAllLabelsByUserId("1")
        );

        Mockito.verify(labelRepository).findLabelsByUserId("1");
    }

    @DirtiesContext
    @Test
    public void getAllLabelsByUserId_whenUserIdDoesNotExist_returnEmptyList() {
        LabelRepository labelRepository = Mockito.mock(LabelRepository.class);
        IdService idService = Mockito.mock(IdService.class);
        LabelService labelService = new LabelService(labelRepository,idService);

        Mockito.when(labelRepository.findLabelsByUserId("1")).thenReturn(Collections.emptyList());

        assertEquals(
                Collections.emptyList(),

                labelService.getAllLabelsByUserId("1")
        );

        Mockito.verify(labelRepository).findLabelsByUserId("1");
    }

    @DirtiesContext
    @Test
    public void addLabel_LabelIdExists_thenReturnLabel() {
        LabelRepository labelRepository = Mockito.mock(LabelRepository.class);
        IdService idService = Mockito.mock(IdService.class);
        LabelService labelService = new LabelService(labelRepository,idService);

        Label toSaveLabel = new Label(idService.generateID(),"1", "Haushalt");

        Mockito.when(labelRepository.save(toSaveLabel)).thenReturn(toSaveLabel);

        assertEquals(
                toSaveLabel,
                labelService.addLabel(toSaveLabel)
        );

        Mockito.verify(labelRepository).save(toSaveLabel);
    }

    @DirtiesContext
    @Test
    public void deleteLabelByLabelId() {
        LabelRepository labelRepository = Mockito.mock(LabelRepository.class);
        IdService idService = Mockito.mock(IdService.class);
        LabelService labelService = new LabelService(labelRepository,idService);
        Mockito.when(idService.generateID()).thenReturn("1");

        Label existingLabel = new Label(idService.generateID(),"1", "Haushalt");

        Mockito.when(labelRepository.findById(existingLabel.getId())).thenReturn(null);

        labelService.deleteLabelByLabelId("1");

        Mockito.verify(labelRepository).deleteById("1");
    }
}