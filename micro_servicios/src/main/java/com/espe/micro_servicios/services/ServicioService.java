package com.espe.micro_servicios.services;

import com.espe.micro_servicios.models.entities.Servicios;

import java.util.List;
import java.util.Optional;

public interface ServicioService {

    List<Servicios> findAll();

    Optional<Servicios> findById(Long id);

    Servicios save(Servicios servicio);

    void deleteById(Long id);
}

