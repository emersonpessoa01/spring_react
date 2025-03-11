package br.com.api.produtos.controle;

import org.springframework.web.bind.annotation.RestController;

import br.com.api.produtos.modelo.ProdutoModelo;
import br.com.api.produtos.modelo.RespostaModelo;
import br.com.api.produtos.servico.ProdutoServico;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
// @CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "*") // LLiberar acesso de qualquer origem
public class ProdutoControle {

    @Autowired
    private ProdutoServico produtoServico;

    @GetMapping("/listar")
    public Iterable<ProdutoModelo> listar() {
        return produtoServico.listar();
    }

    @GetMapping("/")
    public String rota() {
        return "API de produtos funcionando!";
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody ProdutoModelo produtoModelo){
    return produtoServico.cadastrarAlterar(produtoModelo, "cadastrar");
    }
    // @PostMapping("/cadastrar")
    // public ResponseEntity<?> cadastrar(@RequestBody List<ProdutoModelo> produtoModelo) {
    //     for (ProdutoModelo produto : produtoModelo) {
    //         produtoServico.cadastrarAlterar(produto, "cadastrar");
    //     }
    //     return ResponseEntity.ok("Produtos cadastrados com sucesso!");
    // }

    @PutMapping("/editar")
    public ResponseEntity<?> editar(@RequestBody ProdutoModelo produtoModelo) {
        return produtoServico.cadastrarAlterar(produtoModelo, "editar");
    }

    @DeleteMapping("/remover/{codigo}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable Long codigo) {
        return produtoServico.remover(codigo);
    }
}