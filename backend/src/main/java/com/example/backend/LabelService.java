package com.example.backend;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;
import java.util.List;

@Data
@Service
@AllArgsConstructor
public class LabelService {

    private final LabelRepository labelRepo;
    private final IdService idService;

    public List<Label> getAllLabelsByUserId(String userId) {return labelRepo.findLabelsByUserId(userId);}

    public Label addLabel(Label label) {
        return labelRepo.save(label.withId(idService.generateID()));
    }

    public void deleteLabelByLabelId(String id) {
        labelRepo.deleteById(id);
    }
}
