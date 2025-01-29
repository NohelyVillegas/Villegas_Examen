package com.espe.micro_servicios.controllers;

import com.espe.micro_servicios.models.entities.Servicios;
import com.espe.micro_servicios.services.ServicioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/servicios")
public class ServicioController {

    @Autowired
    private ServicioService service;

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Servicios servicio, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            result.getFieldErrors().forEach(
                    error -> errors.put(error.getField(), error.getDefaultMessage())
            );
            return ResponseEntity.badRequest().body(errors);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(servicio));
    }

    @GetMapping
    public List<Servicios> listar() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Servicios> buscarPorId(@PathVariable Long id) {
        Optional<Servicios> servicioOptional = service.findById(id);
        if (servicioOptional.isPresent()) {
            return ResponseEntity.ok(servicioOptional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@Valid @RequestBody Servicios servicio, BindingResult result, @PathVariable Long id) {
        if (result.hasErrors()) {
            return validarErrores(result);
        }

        Optional<Servicios> servicioOptional = service.findById(id);
        if (servicioOptional.isPresent()) {
            Servicios servicioDB = servicioOptional.get();
            servicioDB.setNombre(servicio.getNombre());
            servicioDB.setDescripcion(servicio.getDescripcion());
            servicioDB.setPrecio(servicio.getPrecio());
            return ResponseEntity.status(HttpStatus.CREATED).body(service.save(servicioDB));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        Optional<Servicios> servicioOptional = service.findById(id);
        if (servicioOptional.isPresent()) {
            service.deleteById(id);
            return ResponseEntity.noContent().build();
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
