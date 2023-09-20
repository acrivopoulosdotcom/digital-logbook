package com.example.backend;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.test.annotation.DirtiesContext;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class EntryServiceTest {

    @Test
    public void getAllEntries_whenGetAll_thenReturnCorrectList() {
        EntryRepository entryRepository = Mockito.mock(EntryRepository.class);
        IdService idService = Mockito.mock(IdService.class);
        EntryService entryService = new EntryService(entryRepository,idService);

        Mockito.when(entryRepository.findAll()).thenReturn(List.of(
                new Entry("123", "1", "status 1", "titel 1", "14.9.2023", "prio-1", "label 1", "notes 1"),
                new Entry("124", "2", "status 2", "titel 2", "14.9.2023", "prio-2", "label 2", "notes 2")
        ));

        assertEquals(
                List.of(
                        new Entry("123", "1", "status 1", "titel 1", "14.9.2023", "prio-1", "label 1", "notes 1"),
                        new Entry("124", "2", "status 2", "titel 2", "14.9.2023", "prio-2", "label 2", "notes 2")
                ),
                entryService.getAllEntries()
        );

        Mockito.verify(entryRepository).findAll();
    }

    @Test
    public void addEntry_whenEntryIsValid_thenNoError() {
        EntryRepository entryRepository = Mockito.mock(EntryRepository.class);
        IdService idService = Mockito.mock(IdService.class);
        EntryService entryService = new EntryService(entryRepository, idService);

        entryService.addEntry(new Entry(idService.generateID(),"1", "status 1", "titel 1", "14.9.2023", "prio-1", "label 1", "notes 1"));

        Mockito.verify(entryRepository).save(new Entry(idService.generateID(),"1", "status 1", "titel 1", "14.9.2023", "prio-1", "label 1", "notes 1"));
    }

    @Test
    public void addEntry_whenEntryIsAlreadyExisting_ThenReturnException() {
        EntryRepository entryRepository = Mockito.mock(EntryRepository.class);
        IdService idService = Mockito.mock(IdService.class);

        Mockito.when(idService.generateID()).thenReturn("mockedId");

        EntryService entryService = new EntryService(entryRepository, idService);

        entryService.addEntry(new Entry(idService.generateID(),"1", "status 1", "titel 1", "14.9.2023", "prio-1", "label 1", "notes 1"));

        Mockito.verify(entryRepository).save(new Entry(idService.generateID(),"1", "status 1", "titel 1", "14.9.2023", "prio-1", "label 1", "notes 1"));
    }
    //Todo: muss auch hier ein Gegentest stattfinden, ob evtl. schon ein Eintrag besteht?

    @Test
    public void changeStatusById_whenEntryIdIsValid_thenReturnNewStatus() {
        EntryRepository entryRepository = Mockito.mock(EntryRepository.class);
        IdService idService = Mockito.mock(IdService.class);

        Mockito.when(idService.generateID()).thenReturn("mockedId");

        Entry updatedEntry = new Entry("mockedId","1", "new status", "titel 1", "14.9.2023", "prio-1", "label 1", "notes 1");

        Entry existingEntry = new Entry("mockedId","1", "initial status 1", "titel 1", "14.9.2023", "prio-1", "label 1", "notes 1");

        Mockito.when(entryRepository.findById(existingEntry.withStatus(updatedEntry.getStatus()).toString())).thenReturn(Optional.of(existingEntry));

        assertEquals("new status", updatedEntry.getStatus());
    }
    //Todo: Was definiere ich im Namen - das Funktionsergebnis des Tests oder der eigentlichen Aufgabenstellung?


    @DirtiesContext
    @Test
    public void changeStatusById_whenEntryIdIsNotValid_thenError() {
        EntryRepository entryRepository = Mockito.mock(EntryRepository.class);
        IdService idService = Mockito.mock(IdService.class);
        EntryService entryService = new EntryService(entryRepository,idService);

        Mockito.when(idService.generateID()).thenReturn("mockedId");

        Entry updatedEntry = new Entry("notMockedId","1", "new status", "titel 1", "14.9.2023", "prio-1", "label 1", "notes 1");

        Entry existingEntry = new Entry("mockedId","1", "initial status 1", "titel 1", "14.9.2023", "prio-1", "label 1", "notes 1");

        Mockito.when(entryRepository.findById(existingEntry.withStatus(updatedEntry.getStatus()).toString())).thenReturn(null);

        assertNull(entryService.changeStatusById("notMockedId",updatedEntry));
    }

    @DirtiesContext
    @Test
    public void getAllEntriesByUserIdAndStatusAndFormattedDate_whenEverythingIsOk_returnList() {
        EntryRepository entryRepository = Mockito.mock(EntryRepository.class);
        IdService idService = Mockito.mock(IdService.class);
        EntryService entryService = new EntryService(entryRepository,idService);

        Mockito.when(entryRepository.findAllByUserIdAndStatusAndFormattedDate("1","open", "19.9.2023")).thenReturn(List.of(
                new Entry("123","1", "open", "titel 1", "19.9.2023", "prio-1", "label 1", "notes 1"),
                new Entry("124","1", "open", "titel 2", "19.9.2023", "prio-1", "label 2", "notes 2"),
                new Entry("125","1", "open", "titel 3", "19.9.2023", "prio-1", "label 3", "notes 3")
        ));

        assertEquals(
                List.of(
                        new Entry("123","1", "open", "titel 1", "19.9.2023", "prio-1", "label 1", "notes 1"),
                        new Entry("124","1", "open", "titel 2", "19.9.2023", "prio-1", "label 2", "notes 2"),
                        new Entry("125","1", "open", "titel 3", "19.9.2023", "prio-1", "label 3", "notes 3")
                ),
                entryService.getAllEntriesByUserIdAndStatusAndFormattedDate("1","open", "19.9.2023")
        );

        Mockito.verify(entryRepository).findAllByUserIdAndStatusAndFormattedDate("1","open", "19.9.2023");
    }

    //Todo: warte hier auf Dominics Feedback:
    @DirtiesContext
    @Test
    public void getAllEntriesByUserIdAndStatusAndFormattedDate_whenUserIdDoesNotExist_returnEmptyList() {
        EntryRepository entryRepository = Mockito.mock(EntryRepository.class);
        IdService idService = Mockito.mock(IdService.class);
        EntryService entryService = new EntryService(entryRepository,idService);

        Mockito.when(entryRepository.findAllByUserIdAndStatusAndFormattedDate("2","open", "19.9.2023")).thenReturn(Collections.emptyList());

        assertEquals(Collections.emptyList(), entryService.getAllEntriesByUserIdAndStatusAndFormattedDate("2","open", "19.9.2023"));

        Mockito.verify(entryRepository).findAllByUserIdAndStatusAndFormattedDate("2","open", "19.9.2023");
    }

    //Todo: warte hier auf Dominics Feedback:
    @DirtiesContext
    @Test
    public void getAllEntriesByUserIdAndStatusAndFormattedDate_whenStatusDoesNotExist_returnEmptyList() {
        EntryRepository entryRepository = Mockito.mock(EntryRepository.class);
        IdService idService = Mockito.mock(IdService.class);
        EntryService entryService = new EntryService(entryRepository,idService);

        Mockito.when(entryRepository.findAllByUserIdAndStatusAndFormattedDate("2","open", "19.9.2023")).thenReturn(Collections.emptyList());

        assertEquals(Collections.emptyList(), entryService.getAllEntriesByUserIdAndStatusAndFormattedDate("2","open", "19.9.2023"));

        Mockito.verify(entryRepository).findAllByUserIdAndStatusAndFormattedDate("2","open", "19.9.2023");
    }

    //Todo: warte hier auf Dominics Feedback:
    @DirtiesContext
    @Test
    public void getAllEntriesByUserIdAndStatusAndFormattedDate_whenFormattedDateDoesNotExist_returnEmptyList() {
        EntryRepository entryRepository = Mockito.mock(EntryRepository.class);
        IdService idService = Mockito.mock(IdService.class);
        EntryService entryService = new EntryService(entryRepository,idService);

        Mockito.when(entryRepository.findAllByUserIdAndStatusAndFormattedDate("2","open", "19.9.2023")).thenReturn(Collections.emptyList());

        assertEquals(Collections.emptyList(), entryService.getAllEntriesByUserIdAndStatusAndFormattedDate("2","open", "19.9.2023"));

        Mockito.verify(entryRepository).findAllByUserIdAndStatusAndFormattedDate("2","open", "19.9.2023");
    }

    //Todo: mit Dominic abklären:
    @DirtiesContext
    @Test
    public void deleteEntryById_whenIdExists_returnNothing() throws Exception{
        EntryRepository entryRepository = Mockito.mock(EntryRepository.class);
        IdService idService = Mockito.mock(IdService.class);
        EntryService entryService = new EntryService(entryRepository,idService);
        Mockito.when(idService.generateID()).thenReturn("mockedId");

        Entry existingEntry = new Entry("mockedId","1", "open", "titel 1", "19.9.2023", "prio-1", "label 1", "notes 1");

        Mockito.when(entryRepository.existsById(existingEntry.getId())).thenReturn(true);

       assertEquals(null, entryService.deleteEntryById("mockedId"));

       Mockito.verify(entryRepository).deleteById("mockedId");
    }


    @DirtiesContext
    @Test
    public void updateEntry_whenIdExists_returnEntry() throws Exception {
        EntryRepository entryRepository = Mockito.mock(EntryRepository.class);
        IdService idService = Mockito.mock(IdService.class);
        EntryService entryService = new EntryService(entryRepository,idService);
        Mockito.when(idService.generateID()).thenReturn("mockedId");

        Entry updatedEntry = new Entry("mockedId","1", "new status", "titel new", "20.9.2023", "prio-1", "label new", "notes new");

        Mockito.when(entryRepository.existsById("mockedId")).thenReturn(true);
        Mockito.when(entryRepository.save(updatedEntry)).thenReturn(updatedEntry);

        Entry result = entryService.updateEntry("mockedId", updatedEntry);
        assertEquals(updatedEntry, result);

    }

    @DirtiesContext
    @Test
    public void updateEntry_whenIdNotExists_throwEntryDoesNotExitsException() throws EntryDoesNotExistException {
        EntryRepository entryRepository = Mockito.mock(EntryRepository.class);
        IdService idService = Mockito.mock(IdService.class);
        EntryService entryService = new EntryService(entryRepository,idService);
        Mockito.when(idService.generateID()).thenReturn("mockedId");

        Entry updatedEntry = new Entry("notMockedId","1", "new status", "titel new", "20.9.2023", "prio-1", "label new", "notes new");

        Mockito.when(entryRepository.existsById("notMockedId")).thenReturn(false);

        assertThrows(EntryDoesNotExistException.class, () -> entryService.updateEntry("notMockedId", updatedEntry));
    }





    //Neue Methode:
    @DirtiesContext
    @Test
    public void getAllEntriesByUserIdAndSelectedDay_whenAllParamsExist_returnList() {
        EntryRepository entryRepository = Mockito.mock(EntryRepository.class);
        IdService idService = Mockito.mock(IdService.class);
        EntryService entryService = new EntryService(entryRepository,idService);

        Mockito.when(entryRepository.findAllByUserIdAndFormattedDate("1", "14.9.2023")).thenReturn(List.of(
                new Entry("123", "1", "status 1", "titel 1", "14.9.2023", "prio-1", "label 1", "notes 1"),
                new Entry("124", "1", "status 2", "titel 2", "14.9.2023", "prio-2", "label 2", "notes 2")
        ));

        assertEquals(
                List.of(
                        new Entry("123", "1", "status 1", "titel 1", "14.9.2023", "prio-1", "label 1", "notes 1"),
                        new Entry("124", "1", "status 2", "titel 2", "14.9.2023", "prio-2", "label 2", "notes 2")
                ),
                entryService.getAllEntriesByUserIdAndSelectedDay("1","14.9.2023")
        );

        Mockito.verify(entryRepository).findAllByUserIdAndFormattedDate("1", "14.9.2023");
    }

    @DirtiesContext //Todo: Bessere Option?
    @Test
    public void getAllEntriesByUserIdAndSelectedDay_UserIdDoesNotExist_returnEmpty() {
        EntryRepository entryRepository = Mockito.mock(EntryRepository.class);
        IdService idService = Mockito.mock(IdService.class);
        EntryService entryService = new EntryService(entryRepository,idService);

        Mockito.when(entryRepository.findAllByUserIdAndFormattedDate("1", "14.9.2023")).thenReturn(Collections.emptyList());

        List<Entry> result = entryService.getAllEntriesByUserIdAndSelectedDay("1", "14.9.2023");

        assertEquals(Collections.emptyList(), result);

        Mockito.verify(entryRepository).findAllByUserIdAndFormattedDate("1", "14.9.2023");
    }

    @DirtiesContext
    @Test
    public void getAllEntriesByUserIdAndSelectedDay_SelectedDayDoesNotExist_returnEmpty() {
        EntryRepository entryRepository = Mockito.mock(EntryRepository.class);
        IdService idService = Mockito.mock(IdService.class);
        EntryService entryService = new EntryService(entryRepository,idService);

        Mockito.when(entryRepository.findAllByUserIdAndFormattedDate("1", "14.9.2023")).thenReturn(Collections.emptyList());

        List<Entry> result = entryService.getAllEntriesByUserIdAndSelectedDay("1", "14.9.2023");

        assertEquals(Collections.emptyList(), result);

        Mockito.verify(entryRepository).findAllByUserIdAndFormattedDate("1", "14.9.2023");
    }

    @DirtiesContext
    @Test
    public void getAllEntriesByUserIdAndSelectedDay_BothParamsDoesNotExist_returnEmpty() {
        EntryRepository entryRepository = Mockito.mock(EntryRepository.class);
        IdService idService = Mockito.mock(IdService.class);
        EntryService entryService = new EntryService(entryRepository,idService);

        Mockito.when(entryRepository.findAllByUserIdAndFormattedDate("1", "14.9.2023")).thenReturn(Collections.emptyList());

        List<Entry> result = entryService.getAllEntriesByUserIdAndSelectedDay("1", "14.9.2023");

        assertEquals(Collections.emptyList(), result);

        Mockito.verify(entryRepository).findAllByUserIdAndFormattedDate("1", "14.9.2023");
    }





    //Nächste Methode:
    @DirtiesContext
    @Test
    public void getAllEntriesByUserIdAndLabel_whenAllParamsExist_returnList() {
        EntryRepository entryRepository = Mockito.mock(EntryRepository.class);
        IdService idService = Mockito.mock(IdService.class);
        EntryService entryService = new EntryService(entryRepository,idService);

        Mockito.when(entryRepository.findAllByUserIdAndAndLabel("1", "test")).thenReturn(List.of(
                new Entry("123", "1", "status 1", "titel 1", "14.9.2023", "prio-1", "test", "notes 1"),
                new Entry("124", "1", "status 2", "titel 2", "14.9.2023", "prio-2", "test", "notes 2")
        ));

        assertEquals(
                List.of(
                        new Entry("123", "1", "status 1", "titel 1", "14.9.2023", "prio-1", "test", "notes 1"),
                        new Entry("124", "1", "status 2", "titel 2", "14.9.2023", "prio-2", "test", "notes 2")
                ),
                entryService.getAllEntriesByUserIdAndLabel("1","test")
        );

        Mockito.verify(entryRepository).findAllByUserIdAndAndLabel("1", "test");
    }

    @DirtiesContext
    @Test
    public void getAllEntriesByUserIdAndLabel_whenUserIdDoesNotExist_returnEmptyList() {
        EntryRepository entryRepository = Mockito.mock(EntryRepository.class);
        IdService idService = Mockito.mock(IdService.class);
        EntryService entryService = new EntryService(entryRepository,idService);

        Mockito.when(entryRepository.findAllByUserIdAndAndLabel("1", "test")).thenReturn(Collections.emptyList());

        List<Entry> result = entryService.getAllEntriesByUserIdAndLabel("1", "test");

        assertEquals(Collections.emptyList(), result);

        Mockito.verify(entryRepository).findAllByUserIdAndAndLabel("1", "test");

        Mockito.verify(entryRepository).findAllByUserIdAndAndLabel("1", "test");
    }

    @DirtiesContext
    @Test
    public void getAllEntriesByUserIdAndLabel_whenLabelDoesNotExist_returnEmptyList() {
        EntryRepository entryRepository = Mockito.mock(EntryRepository.class);
        IdService idService = Mockito.mock(IdService.class);
        EntryService entryService = new EntryService(entryRepository,idService);

        Mockito.when(entryRepository.findAllByUserIdAndAndLabel("1", "test")).thenReturn(Collections.emptyList());

        List<Entry> result = entryService.getAllEntriesByUserIdAndLabel("1", "test");

        assertEquals(Collections.emptyList(), result);

        Mockito.verify(entryRepository).findAllByUserIdAndAndLabel("1", "test");

        Mockito.verify(entryRepository).findAllByUserIdAndAndLabel("1", "test");
    }




    //Nächste Methode:
    @DirtiesContext
    @Test
    public void getAllEntriesByUserIdAndSelectedStatus_whenAllParamsExist_returnList() {
        EntryRepository entryRepository = Mockito.mock(EntryRepository.class);
        IdService idService = Mockito.mock(IdService.class);
        EntryService entryService = new EntryService(entryRepository,idService);

        Mockito.when(entryRepository.findAllByUserIdAndStatus("1", "test")).thenReturn(List.of(
                new Entry("123", "1", "test", "titel 1", "14.9.2023", "prio-1", "label 1", "notes 1"),
                new Entry("124", "1", "test", "titel 2", "14.9.2023", "prio-2", "label 2", "notes 2")
        ));

        assertEquals(
                List.of(
                        new Entry("123", "1", "test", "titel 1", "14.9.2023", "prio-1", "label 1", "notes 1"),
                        new Entry("124", "1", "test", "titel 2", "14.9.2023", "prio-2", "label 2", "notes 2")
                ),
                entryService.getAllEntriesByUserIdAndSelectedStatus("1","test")
        );

        Mockito.verify(entryRepository).findAllByUserIdAndStatus("1", "test");
    }

    @DirtiesContext
    @Test
    public void getAllEntriesByUserIdAndSelectedStatus_whenUserIdDoesNotExist_returnEmptyList() {
        EntryRepository entryRepository = Mockito.mock(EntryRepository.class);
        IdService idService = Mockito.mock(IdService.class);
        EntryService entryService = new EntryService(entryRepository,idService);

        Mockito.when(entryRepository.findAllByUserIdAndStatus("1", "test")).thenReturn(Collections.emptyList());

        List<Entry> result = entryService.getAllEntriesByUserIdAndSelectedStatus("1", "test");

        assertEquals(Collections.emptyList(), result);

        Mockito.verify(entryRepository).findAllByUserIdAndStatus("1", "test");

        Mockito.verify(entryRepository).findAllByUserIdAndStatus("1", "test");
    }

    @DirtiesContext
    @Test
    public void getAllEntriesByUserIdAndSelectedStatus_whenSelectedStatusDoesNotExist_returnEmptyList() {
        EntryRepository entryRepository = Mockito.mock(EntryRepository.class);
        IdService idService = Mockito.mock(IdService.class);
        EntryService entryService = new EntryService(entryRepository,idService);

        Mockito.when(entryRepository.findAllByUserIdAndStatus("1", "test")).thenReturn(Collections.emptyList());

        List<Entry> result = entryService.getAllEntriesByUserIdAndSelectedStatus("1", "test");

        assertEquals(Collections.emptyList(), result);

        Mockito.verify(entryRepository).findAllByUserIdAndStatus("1", "test");

        Mockito.verify(entryRepository).findAllByUserIdAndStatus("1", "test");
    }

}
