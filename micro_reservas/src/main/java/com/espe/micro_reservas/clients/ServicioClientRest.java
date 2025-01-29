package com.espe.micro_reservas.clients;

import com.espe.micro_reservas.models.entities.Reserva;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "micro-reservas", url = "localhost:8003/api/reservas")
public interface ServicioClientRest {

    @GetMapping("/{id}")
    Reserva findById(@PathVariable Long id);

    @PostMapping
    Reserva save(@RequestBody Reserva reserva);
}