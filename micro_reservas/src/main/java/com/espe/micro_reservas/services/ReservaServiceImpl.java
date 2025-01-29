package com.espe.micro_reservas.services;

import com.espe.micro_reservas.models.Servicio;
import com.espe.micro_reservas.models.entities.Reserva;
import com.espe.micro_reservas.models.entities.ReservaServicio;
import com.espe.micro_reservas.repositories.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ReservaServiceImpl implements ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private RestTemplate restTemplate;

    private final String servicioMicroserviceUrl = "http://localhost:8003/api/servicios";

    @Override
    public List<Reserva> findAll() {
        return (List<Reserva>) reservaRepository.findAll();
    }

    @Override
    public Optional<Reserva> findById(Long id) {
        return reservaRepository.findById(id);
    }

    @Override
    public Reserva save(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    @Override
    public void deleteById(Long id) {
        reservaRepository.deleteById(id);
    }

    @Override
    public Optional<Servicio> addServicio(Servicio servicio, Long id) {
        Optional<Reserva> optional = reservaRepository.findById(id);
        if (optional.isPresent()) {
            Reserva reserva = optional.get();
            ReservaServicio reservaServicio = new ReservaServicio();
            reservaServicio.setServicioId(servicio.getId());
            reserva.addReservaServicio(reservaServicio);
            reservaRepository.save(reserva);
            return Optional.of(servicio);
        }
        return Optional.empty();
    }

    @Override
    public Optional<Servicio> removeServicio(Long servicioId, Long reservaId) {
        Optional<Reserva> reservaOptional = reservaRepository.findById(reservaId);
        if (reservaOptional.isPresent()) {
            Reserva reserva = reservaOptional.get();
            reserva.removeReservaServicioByServicioId(servicioId);
            reservaRepository.save(reserva);
            return Optional.empty();
        }
        return Optional.empty();
    }

    @Override
    public List<Servicio> getServiciosByReservaId(Long reservaId) {
        Optional<Reserva> reservaOptional = reservaRepository.findById(reservaId);
        if (reservaOptional.isPresent()) {
            Reserva reserva = reservaOptional.get();
            List<Servicio> servicios = new ArrayList<>();
            for (ReservaServicio rs : reserva.getReservaServicios()) {
                Servicio servicio = restTemplate.getForObject(servicioMicroserviceUrl + "/" + rs.getServicioId(), Servicio.class);
                if (servicio != null) {
                    servicios.add(servicio);
                }
            }
            return servicios;
        }
        return Collections.emptyList();
    }
}