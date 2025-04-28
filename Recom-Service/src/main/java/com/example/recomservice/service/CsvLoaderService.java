package com.example.recomservice.service;

import com.example.recomservice.entities.Opcvm;
import com.example.recomservice.repositories.OpcvmRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStreamReader;
import java.io.Reader;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class CsvLoaderService {

    @Autowired
    private OpcvmRepository opcvmRepository;

    @PostConstruct
    @Transactional
    public void loadCsvData() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        try (Reader reader = new InputStreamReader(
                new ClassPathResource("opcvm_complet_last.csv").getInputStream(), StandardCharsets.UTF_8);
             CSVParser csvParser = new CSVParser(reader,
                     CSVFormat.DEFAULT.withFirstRecordAsHeader().withDelimiter(';'))) {

            List<Opcvm> opcvmList = new ArrayList<>();

            for (CSVRecord record : csvParser) {
                try {
                    // Parser la date
                    String dateStr = record.get("PRICEDATE").trim();
                    if (dateStr.isEmpty()) continue; // Ignorer si la date est vide

                    LocalDate date = LocalDate.parse(dateStr, formatter);
                    if (date.getYear() == 1900) {
                        System.out.println("Ligne ignorée (année 1900) : " + record);
                        continue;
                    }

                    // Créer l’objet OPCVM
                    Opcvm opcvm = new Opcvm();
                    opcvm.setCode(record.get("PROVIDERPRICEDVALUECODE_").trim());
                    opcvm.setProvider(record.get("PROVIDER$CODE_").trim());
                    opcvm.setDatePrix(date);
                    opcvm.setNom(record.get("Nom").trim());


                    // Gérer le champ NAV_
                    String navStr = record.get("NAV_").replace(",", ".").trim();
                    if (!navStr.isEmpty() && navStr.matches("-?\\d+(\\.\\d+)?")) {
                        opcvm.setNav(new BigDecimal(navStr));
                    } else {
                        System.out.println("NAV invalide, valeur par défaut (0) : " + navStr);
                        opcvm.setNav(BigDecimal.ZERO);
                    }

                    opcvmList.add(opcvm);
                } catch (Exception e) {
                    System.out.println("Erreur lors du parsing d'une ligne : " + record);
                    e.printStackTrace();
                }
            }

            opcvmRepository.saveAll(opcvmList);
            System.out.println("Données chargées avec succès !");

        } catch (Exception e) {
            System.out.println("Erreur lors du chargement du fichier CSV :");
            e.printStackTrace();
        }
    }
}
