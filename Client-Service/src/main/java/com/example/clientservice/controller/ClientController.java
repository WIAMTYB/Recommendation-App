package com.example.clientservice.controller;
import com.example.clientservice.entities.Client;
import com.example.clientservice.repositories.ClientRepository;
import com.example.clientservice.service.ClientService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@CrossOrigin(origins = "http://localhost:5173" , allowCredentials = "true")
@RequestMapping("/api/client")
public class ClientController {

    @Autowired
    private ClientService clientService;
    @Autowired
    ClientRepository clientRepository;




    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        List<Client> clients = clientService.getAllClients();
        return ResponseEntity.ok(clients);
    }

    @GetMapping("/{id}")
    public Client getClientById(@PathVariable Long id) {
        return clientService.getClientById(id);
    }


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody Client client) {
        Client newUser = clientService.registerClient(client);
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestParam String email, @RequestParam String password, HttpServletResponse response, HttpSession session) {
        Optional<Client> client = clientRepository.findByEmail(email);

        if (client.isPresent() && client.get().getPassword().equals(password)) {
            session.setAttribute("userId", client.get().getId()); // Stockez l'ID de l'utilisateur dans la session
            // Spring Session gérera l'identifiant de session (sessionId) via le cookie
            return ResponseEntity.ok("Connexion réussie");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Identifiants incorrects");
        }
    }

    // Endpoint pour vérifier si l'utilisateur est connecté (exemple pour la page OPCVM)
    @GetMapping("/check-auth")
    public ResponseEntity<?> checkAuthentication(HttpSession session) {
        Object userId = session.getAttribute("userId");
        if (userId != null) {
            Optional<Client> client = clientRepository.findById((Long) userId);
            if (client.isPresent()) {
                return ResponseEntity.ok("Authentifié");
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Non authentifié");
    }

    // Endpoint de déconnexion
    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpSession session, HttpServletResponse response) {
        session.invalidate(); // Invalide la session côté serveur (et demandera au navigateur de supprimer le cookie)
        return ResponseEntity.ok("Déconnexion réussie");
    }


}


