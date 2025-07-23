package br.com.api.projeto.DAO;

import org.springframework.data.repository.CrudRepository;

import br.com.api.projeto.model.Usuario;

public interface IUsuario extends CrudRepository<Usuario, Integer> {

}