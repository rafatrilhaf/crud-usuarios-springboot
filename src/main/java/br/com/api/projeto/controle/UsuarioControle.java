package br.com.api.projeto.controle;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.projeto.DAO.IUsuario;
import br.com.api.projeto.model.Usuario;

@RestController
@CrossOrigin("*")
@RequestMapping("/usuarios")
public class UsuarioControle {

    @Autowired
    private IUsuario dao;

    // GET all users
    @GetMapping
    public List<Usuario> listarUsuarios() {
        return (List<Usuario>) dao.findAll();
    }

    // GET user by ID (AQUI TAVA FALTANDO)
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Integer id) {
        Optional<Usuario> usuario = dao.findById(id);
        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // POST - Create user
    @PostMapping
    public Usuario criarUsuario(@RequestBody Usuario usuario) {
        return dao.save(usuario);
    }

    // PUT - Update user
    @PutMapping
    public Usuario editarUsuario(@RequestBody Usuario usuario) {
        return dao.save(usuario);
    }

    // DELETE - Delete user by ID
    @DeleteMapping("/{id}")
    public Optional<Usuario> deleteUsuario(@PathVariable Integer id) {
        Optional<Usuario> usuario = dao.findById(id);
        dao.deleteById(id);
        return usuario;
    }
}
