package com.espe.micro_reservas.services;

import java.util.Optional;
import java.util.List;

import com.espe.micro_reservas.models.Servicio;
import com.espe.micro_reservas.models.entities.Reserva;

public interface ReservaService {

    List<Reserva> findAll();
    Optional<Reserva> findById(Long id);
    Reserva save(Reserva reserva);
    void deleteById(Long id);

    Optional<Servicio> addServicio(Servicio servicio, Long id);
    Optional<Servicio> removeServicio(Long servicioId, Long reservaId);
    List<Servicio> getServiciosByReservaId(Long reservaId);
}