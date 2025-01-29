package com.espe.micro_reservas.controllers;

import com.espe.micro_reservas.models.Servicio;
import com.espe.micro_reservas.models.entities.Reserva;
import com.espe.micro_reservas.services.ReservaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    @Autowired
    private ReservaService service;

    // Crear una nueva reserva
    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody Reserva reserva, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors().forEach(
                    error -> errors.put(error.getField(), error.getDefaultMessage())
            );
            return ResponseEntity.badRequest().body(errors);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(reserva));
    }

    // Listar todas las reservas
    @GetMapping
    public ResponseEntity<?> listar() {
        return ResponseEntity.ok(service.findAll());
    }

    // Buscar una reserva por su ID
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        Optional<Reserva> reservaOptional = service.findById(id);
        if (reservaOptional.isPresent()) {
            return ResponseEntity.ok(reservaOptional.get());
        }
        return ResponseEntity.notFound().build();
    }

    // Modificar una reserva por su ID
    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@Valid @RequestBody Reserva reserva, BindingResult result, @PathVariable Long id) {
        if (result.hasErrors()) {
            return validarErrores(result);
        }

        Optional<Reserva> reservaOptional = service.findById(id);
        if (reservaOptional.isPresent()) {
            Reserva reservaDB = reservaOptional.get();
            reservaDB.setClienteId(reserva.getClienteId());
            reservaDB.setFecha(reserva.getFecha());
            reservaDB.setEstado(reserva.getEstado());
            return ResponseEntity.status(HttpStatus.CREATED).body(service.save(reservaDB));
        }
        return ResponseEntity.notFound().build();
    }

    // Eliminar una reserva por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        Optional<Reserva> reservaOptional = service.findById(id);
        if (reservaOptional.isPresent()) {
            service.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/servicios")
    public ResponseEntity<?> agregarServicio(@RequestBody Servicio servicio, @PathVariable Long id) {
        Optional<Servicio> optional = service.addServicio(servicio, id);
        if (optional.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(optional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{reservaId}/servicios/{servicioId}")
    public ResponseEntity<?> eliminarServicio(@PathVariable Long reservaId, @PathVariable Long servicioId) {
        Optional<Servicio> servicioOptional = service.removeServicio(servicioId, reservaId);
        if (servicioOptional.isPresent()) {
            return ResponseEntity.ok(servicioOptional.get());
        }
        return ResponseEntity.notFound().build();
    }


    @GetMapping("/{reservaId}/servicios")
    public ResponseEntity<?> listarServiciosPorReserva(@PathVariable Long reservaId) {
        List<Servicio> servicios = service.getServiciosByReservaId(reservaId);
        if (!servicios.isEmpty()) {
            return ResponseEntity.ok(servicios);
        }
        return ResponseEntity.notFound().build();
    }
    private ResponseEntity<?> validarErrores(BindingResult result) {
        Map<String, String> errores = new HashMap<>();
        result.getFieldErrors().forEach(
                error -> errores.put(error.getField(), error.getDefaultMessage())
        );
        return ResponseEntity.badRequest().body(errores);
    }
}