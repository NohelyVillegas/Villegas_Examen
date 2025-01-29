package com.espe.micro_servicios.services;

import com.espe.micro_servicios.models.entities.Servicios;
import com.espe.micro_servicios.repositories.ServicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioServiceImpl implements ServicioService {

    @Autowired
    private ServicioRepository repository;

    @Override
    public List<Servicios> findAll() {
        return (List<Servicios>) repository.findAll();
    }

    @Override
    public Optional<Servicios> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Servicios save(Servicios servicio) {
        return repository.save(servicio);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
