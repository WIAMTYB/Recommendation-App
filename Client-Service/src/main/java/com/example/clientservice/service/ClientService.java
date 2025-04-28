package com.example.clientservice.service;


import com.example.clientservice.entities.Client;
import com.example.clientservice.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;

    public Client registerClient(Client client) {
        return clientRepository.save(client);
    }

    public Optional<Client> loginClient(String email, String password) {
        return clientRepository.findByEmail(email)
                .filter(client -> client.getPassword().equals(password));
    }

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }


    public Client getClientById(Long id) {
        return clientRepository.findById(id).orElse(null); // Renvoie null si le client n'existe pas
    }

}

