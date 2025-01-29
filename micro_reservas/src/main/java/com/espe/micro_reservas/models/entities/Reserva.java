package com.espe.micro_reservas.models.entities;

import com.espe.micro_reservas.models.Servicio;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="reservas")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "El ID del cliente no puede ser nulo")
    @PositiveOrZero(message = "El ID del cliente no puede ser negativo")
    private Long clienteId;

    @NotNull(message = "La fecha no puede ser nula")
    @FutureOrPresent(message = "La fecha debe ser en el presente o en el futuro")
    private LocalDate fecha;

    @NotEmpty(message = "El estado no puede estar vacío")
    private String estado;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(updatable = false)
    private Date creadoEn;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "reserva_id")
    private List<ReservaServicio> reservaServicios = new ArrayList<>();

    @Transient
    private List<Servicio> servicios;

    public Reserva() {
        reservaServicios = new ArrayList<>();
        servicios = new ArrayList<>();
    }

    @PrePersist
    protected void onCreate() {
        this.creadoEn = new Date();
    }

    public void addReservaServicio(ReservaServicio reservaServicio) {
        reservaServicios.add(reservaServicio);
    }

    public void removeReservaServicio(ReservaServicio reservaServicio) {
        reservaServicios.remove(reservaServicio);
    }

    public void removeReservaServicioByServicioId(Long servicioId) {
        reservaServicios.removeIf(reservaServicio -> reservaServicio.getServicioId().equals(servicioId));
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Date getCreadoEn() {
        return creadoEn;
    }

    public List<ReservaServicio> getReservaServicios() {
        return reservaServicios;
    }

    public List<Servicio> getServicios() {
        return servicios;
    }

    public void setServicios(List<Servicio> servicios) {
        this.servicios = servicios;
    }
}