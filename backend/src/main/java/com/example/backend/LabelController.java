package com.example.backend;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Data
@AllArgsConstructor
@RestController
@RequestMapping("/api/label")
public class LabelController {

    private final LabelService labelService;

    @PostMapping("/addLabel")
    public Label addLabel(@RequestBody Label label) {
        return labelService.addLabel(label);
    }

    @GetMapping("/getAllLabels/{userId}")
    public List<Label> getLabelsByUserId(@PathVariable String userId) {
        return labelService.getAllLabelsByUserId(userId);
    }

    @DeleteMapping("/deleteLabel/{id}")
    void deleteLabelByLabelId(@PathVariable String id) {
        labelService.deleteLabelByLabelId(id);
    }
}
