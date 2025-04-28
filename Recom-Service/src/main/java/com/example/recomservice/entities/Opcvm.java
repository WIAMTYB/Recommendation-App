package com.example.recomservice.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "opcvm")
 @NoArgsConstructor @AllArgsConstructor
@Getter
@Setter
public class Opcvm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code; // Code de l'OPCVM
    private String provider; // Fournisseur
    private LocalDate datePrix; // Date du prix
    private BigDecimal nav; // Valeur liquidative (NAV)
    private String nom;


}



