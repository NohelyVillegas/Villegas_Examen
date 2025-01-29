package com.espe.micro_reservas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class MicroReservasApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroReservasApplication.class, args);
	}

}
