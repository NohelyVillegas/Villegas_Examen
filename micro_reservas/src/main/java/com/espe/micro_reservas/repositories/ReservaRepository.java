package com.espe.micro_reservas.repositories;

import com.espe.micro_reservas.models.entities.Reserva;
import org.springframework.data.repository.CrudRepository;

public interface ReservaRepository extends CrudRepository<Reserva, Long> {
}
