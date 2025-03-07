import { useEffect, useState } from "react";
import Formulario from "./components/Formulario";
import Tabela from "./components/Tabela";
import "./App.css";

function App() {
  //Objeto produto
  const produto = {
    codigo: "",
    nome: "",
    marca: "",
  };
  const [btnCadastrar, setBtnCadastrar] = useState(true); //Para mostrar ou não o botão de cadastrar
  const [produtos, setProdutos] = useState([]); //Para mostrar os produtos
  const [objProduto, setObjProduto] = useState(produto); // Para capturar os dados do formulário

  // Para mostrar os dados do array
  useEffect(() => {
    //Executar uma única vez quando o componente é montado
    // fetch("http://localhost:8081/listar")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setpProdutos(data);
    //   });
    //Usar async await com try/catch

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8081/listar");
        const data = await response.json();
        setProdutos(data);
        // console.log(data);
      } catch (error) {
        console.log("Falha ao buscar dados:", error);
      }
    };
    fetchData();
  }, []);

  // Obtendo dados do formulário
  const obterDados = (e) => {
    // console.log(`${e.target.name}: ${ e.target.value}`);
    setObjProduto({
      ...objProduto,
      [e.target.name]: e.target.value,
    });
  };

  //Função para cadastrar produto
  const cadastrar = async () => {
    const header = {
      method: "POST",
      body: JSON.stringify(objProduto),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    try {
      const response = await fetch("http://localhost:8081/cadastrar", header);

      const data = await response.json();
      //condição para mostrar a alteração da tabela dinamicamente
      // if (data.status === "ok") {
      //   setProdutos([...produtos, data.produto]);
      // }
      //Condição para mostrar os produtos cadastrados dinamicamente
      if (data.mensagem !== undefined) {
        alert(data.mensagem);
      } else {
        setProdutos([...produtos, data]);
        alert("Produto cadastrado com sucesso!");
        limparFormulario();
      }
      console.log(data);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  };
  //Função para editar produto
  const editar = async () => {
    const header = {
      method: "PUT",
      body: JSON.stringify(objProduto),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    try {
      const response = await fetch("http://localhost:8081/editar", header);

      const data = await response.json();
      //condição para mostrar a alteração da tabela dinamicamente
      // if (data.status === "ok") {
      //   setProdutos([...produtos, data.produto]);
      // }
      //Condição para mostrar os produtos cadastrados dinamicamente
      if (data.mensagem !== undefined) {
        alert(data.mensagem);
      } else {
        alert("Produto editado com sucesso!");
        //Cópia do vetor deprodutos para excluir o produto selecionado
        let vetorTemp = [...produtos];
        //Filtrar o vetor de produtos
        // valorTemp = valorTemp.filter((produto) => produto.codigo !== objProduto.codigo);

        //Indice do vetor de produtos
        let indice = vetorTemp.findIndex((produto) => produto.codigo === objProduto.codigo);
        console.log(indice); // Para testar se está buscando o produto correto para excluir

        //Alterar o produto selecionado
        vetorTemp[indice] = objProduto;

        //Atualizar o vetor de produtos
        setProdutos(vetorTemp);
        limparFormulario();
      }
      console.log(data);
    } catch (error) {
      console.error("Erro ao editar:", error);
    }
  };

  //Função para remover produto
  const remover = async () => {
    const header = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    try {
      const response = await fetch(`http://localhost:8081/remover/${objProduto.codigo}`, header);

      const data = await response.json();
      //Mensagem de confirmação
      alert(data.mensagem);

      //Cópia do vetor deprodutos para excluir o produto selecionado
      let vetorTemp = [...produtos];
      //Filtrar o vetor de produtos
      // valorTemp = valorTemp.filter((produto) => produto.codigo !== objProduto.codigo);

      //Indice do vetor de produtos
      let indice = vetorTemp.findIndex((produto) => produto.codigo === objProduto.codigo);
      console.log(indice); // Para testar se está buscando o produto correto para excluir

      //Excluir o produto selecionado
      vetorTemp.splice(indice, 1);

      //Atualizar o vetor de produtos
      setProdutos(vetorTemp);

      //Limpar o formulário
      limparFormulario();

      console.log(data);
    } catch (error) {
      console.error("Erro ao remover:", error);
    }
  };
  // Limpar o formulário
  const limparFormulario = () => {
    setObjProduto(produto);
    //limpar o formulário, porque o objeto produto não muda
    setBtnCadastrar(true);
  };

  // Selecionar produto
  const selecionarProduto = (indice) => {
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  };

  return (
    <div>
      <h1>Produtos</h1>
      {/* <p>{JSON.stringify(produtos)}</p> */} {/* Para mostar os dados do array */}
      {/* <p>{JSON.stringify(objProduto)}</p> */} {/* Para testar se está capturando os dados do formulário */}
      <Formulario
        botao={btnCadastrar}
        eventoTeclado={obterDados}
        cadastrar={cadastrar}
        obj={objProduto}
        cancelar={limparFormulario}
        remover={remover}
        alterar={editar}
      />
      {/* obj tem características de um objeto:codigo, nome e marca */}
      <Tabela vetor={produtos} selecionar={selecionarProduto} />
    </div>
  );
}

export default App;
