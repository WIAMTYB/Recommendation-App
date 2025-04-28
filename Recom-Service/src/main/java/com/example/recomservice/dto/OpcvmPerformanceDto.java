package com.example.recomservice.dto;

import java.math.BigDecimal;
import java.util.Map;

public class OpcvmPerformanceDto {
    private Map<Integer, BigDecimal> rendementsParAnnee;
    private BigDecimal medianeRendements;

    public OpcvmPerformanceDto(Map<Integer, BigDecimal> rendementsParAnnee, BigDecimal medianeRendements) {
        this.rendementsParAnnee = rendementsParAnnee;
        this.medianeRendements = medianeRendements;
    }

    public Map<Integer, BigDecimal> getRendementsParAnnee() {
        return rendementsParAnnee;
    }

    public BigDecimal getMedianeRendements() {
        return medianeRendements;
    }
}

