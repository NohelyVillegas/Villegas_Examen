package com.espe.micro_servicios.repositories;

import com.espe.micro_servicios.models.entities.Servicios;
import org.springframework.data.repository.CrudRepository;

public interface ServicioRepository extends CrudRepository<Servicios, Long> {
}
