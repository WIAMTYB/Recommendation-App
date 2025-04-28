package com.example.recomservice.controller;

import com.example.recomservice.dto.OpcvmPerformanceDto;
import com.example.recomservice.entities.Opcvm;
import com.example.recomservice.repositories.OpcvmRepository;
import com.example.recomservice.service.OpcvmService;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/opcvm")
public class RecommendationController {

    @Autowired
    private OpcvmService opcvmService;

    @Autowired
    private OpcvmRepository opcvmRepository;

    private List<String> nomsOpcvmCache; // ✅ cache pour /noms
    private List<Map<String, String>> nomsCodesOpcvmCache; // ✅ cache pour /noms-codes
    private Map<String, OpcvmPerformanceDto> rendementsCache; // ✅ cache pour /rendements et /{code}/performance

    @PostConstruct
    public void init() {
        // Cache pour /noms
        nomsOpcvmCache = opcvmRepository.findAll().stream()
                .map(Opcvm::getNom)
                .filter(Objects::nonNull)
                .distinct()
                .toList();

        // Cache pour /noms-codes
        Set<String> seen = new HashSet<>();
        nomsCodesOpcvmCache = opcvmRepository.findAll().stream()
                .filter(opcvm -> opcvm.getNom() != null && opcvm.getCode() != null)
                .filter(opcvm -> seen.add(opcvm.getNom() + "::" + opcvm.getCode()))
                .map(opcvm -> Map.of("nom", opcvm.getNom(), "code", opcvm.getCode()))
                .collect(Collectors.toList());

        // Cache pour /rendements
        rendementsCache = opcvmService.calculerRendementsEtMediane();
    }

    @GetMapping("/noms")
    public ResponseEntity<List<String>> getNomsOpcvm(HttpSession session) {
        Object userId = session.getAttribute("userId");
        if (userId != null) {
            return ResponseEntity.ok(nomsOpcvmCache);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @GetMapping("/noms-codes")
    public ResponseEntity<List<Map<String, String>>> getOpcvmNomsEtCodes(HttpSession session) {
        Object userId = session.getAttribute("userId");
        if (userId != null) {
            return ResponseEntity.ok(nomsCodesOpcvmCache);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @GetMapping("/rendements")
    public ResponseEntity<Map<String, OpcvmPerformanceDto>> getRendementsEtMediane(HttpSession session) {
        Object userId = session.getAttribute("userId");
        if (userId != null) {
            return ResponseEntity.ok(rendementsCache);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @GetMapping("/{code}/performance")
    public ResponseEntity<OpcvmPerformanceDto> getOpcvmPerformance(@PathVariable String code, HttpSession session) {
        Object userId = session.getAttribute("userId");
        if (userId != null) {
            if (rendementsCache.containsKey(code)) {
                return ResponseEntity.ok(rendementsCache.get(code));
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }


    @GetMapping("/{code}/{annee}/rendement-mensuel")
    public ResponseEntity<Map<String, Double>> getRendementsMensuels(
            @PathVariable String code,
            @PathVariable int annee,
            HttpSession session) {

        Object userId = session.getAttribute("userId");
        if (userId != null) {
            Map<String, Double> rendements = opcvmService.getRendementsMensuels(code, annee);
            if (rendements != null) {
                return ResponseEntity.ok(rendements);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }



}
