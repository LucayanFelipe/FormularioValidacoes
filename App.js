import React, { useState, useEffect } from "react";
import './style.css';

const Formulario = () => {
  // Estados para cada seção do formulário
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefoneFixo, setTelefoneFixo] = useState("");
  const [celular, setCelular] = useState("");
  const [nomeMae, setNomeMae] = useState("");
  const [nomePai, setNomePai] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // Estados para erros e validações
  const [erros, setErros] = useState({});
  const [idade, setIdade] = useState(0);

  // Função para calcular a idade
  const calcularIdade = (data) => {
    const hoje = new Date();
    const nascimento = new Date(data);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  // Validação do CPF
  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
    const cpfArray = cpf.split("").map((el) => + el);
    const rest = (count) =>
      ((cpfArray
        .slice(0, count - 12)
        .reduce((soma, el, index) => soma + el * (count - index), 0) *
        10) %
        11) %
      10;
    return rest(10) === cpfArray[9] && rest(11) === cpfArray[10];
  };

  // Validação do formulário
  const validarFormulario = () => {
    const novosErros = {};

    // Validação do Nome Completo
    if (!nomeCompleto || nomeCompleto.split(" ").length < 2) {
      novosErros.nomeCompleto = "Nome completo deve conter pelo menos dois nomes.";
    }

    // Validação da Data de Nascimento
    const dataValida = /^\d{4}-\d{2}-\d{2}$/.test(dataNascimento);
    
    if (!dataValida) {
      novosErros.dataNascimento = "Data de nascimento inválida.";
    } else {
      const idadeCalculada = calcularIdade(dataNascimento);
      setIdade(idadeCalculada);
      if (idadeCalculada < 18 && (!nomeMae || !nomePai)) {
        novosErros.nomeMae = "Nome da mãe é obrigatório para menores de 18 anos.";
        novosErros.nomePai = "Nome do pai é obrigatório para menores de 18 anos.";
      }
    }

    // Validação do CPF
    if (!validarCPF(cpf)) {
      novosErros.cpf = "CPF inválido.";
    }

    // (XX)XXXX-XXXX
    // Validação do Telefone Fixo
    if (!/^\(\d{2}\)\d{4}-\d{4}$/.test(telefoneFixo) && !/^\\d{2}\\d{4}-\d{4}$/.test(telefoneFixo) && !/^\d{2}\d{4}\d{4}$/.test(telefoneFixo)) {
      novosErros.telefoneFixo = "Telefone fixo inválido.";
    }

    // (XX)XXXXX-XXXX ou XXXXXXXXXXX ou (XX)XXXXXXXXX
    // Validação do Celular
    if (!/^\(\d{2}\)\d{5}-\d{4}$/.test(celular) && !/^\(\d{2}\)\d{5}\d{4}$/.test(celular) && !/^\d{2}\d{5}\d{4}$/.test(celular)) {
      novosErros.celular = "Celular inválido.";
    }

    // Validação do CEP
    if (!/^\d{5}-\d{3}$/.test(cep)) {
      novosErros.cep = "CEP inválido.";
    }

    // Validação do Email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      novosErros.email = "Email inválido.";
    }
    //{erros.endereco && <span>{erros.endereco}</span>}
    if(/^\s*$/.test(endereco)) {
      novosErros.endereco = "insira endereço.";
    }
     //{erros.numero && <span>{erros.numero}</span>}
     if(/^\s*$/.test(numero)) {
      novosErros.numero = "insira numero.";
    }
     //{erros.cidade && <span>{erros.cidade}</span>}
     if(/^\s*$/.test(cidade)) {
      novosErros.cidade = "insira cidade.";
    }
     //{erros.estado && <span>{erros.estado}</span>}
     if(/^\s*$/.test(estado)) {
      novosErros.estado = "insira estado.";
    }

    // Validação da Senha
    if (senha.length < 8) {
      novosErros.senha = "Senha deve ter no mínimo 8 caracteres.";
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(senha)) {
      novosErros.senha =
        "Senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais.";
    }

    // Validação da Confirmação de Senha
    if (senha !== confirmarSenha) {
      novosErros.confirmarSenha = "As senhas não coincidem.";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      alert("Formulário enviado com sucesso!");
      // Aqui você pode enviar os dados para o backend
    } else {
      alert("Corrija os erros antes de enviar.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Seção 1: Informações Pessoais */}
      <h2>Informações Pessoais</h2>
      <div>
        <label>Nome Completo:</label>
        <input
          type="text"
          value={nomeCompleto}
          onChange={(e) => setNomeCompleto(e.target.value)}
        />
        {erros.nomeCompleto && <span>{erros.nomeCompleto}</span>}
      </div>
      <div>
        <label>Data de Nascimento:</label>
        <input
          type="date"
          placeholder="DD/MM/AAAA"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
        />
        {erros.dataNascimento && <span>{erros.dataNascimento}</span>}
      </div>
      <div>
        <label>CPF:</label>
        <input
          type="text"
          placeholder="XXX.XXX.XXX-XX"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        {erros.cpf && <span>{erros.cpf}</span>}
      </div>
      <div>
        <label>Telefone Fixo:</label>
        <input
          type="text"
          placeholder="(XX)XXXX-XXXX"
          value={telefoneFixo}
          onChange={(e) => setTelefoneFixo(e.target.value)}
        />
        {erros.telefoneFixo && <span>{erros.telefoneFixo}</span>}
      </div>
      <div>
        <label>Celular:</label>
        <input
          type="text"
          placeholder="(XX)XXXXX-XXXX"
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
        />
        {erros.celular && <span>{erros.celular}</span>}
      </div>
      {idade < 18 && (
        <>
          <div>
            <label>Nome da Mãe:</label>
            <input
              type="text"
              value={nomeMae}
              onChange={(e) => setNomeMae(e.target.value)}
            />
            {erros.nomeMae && <span>{erros.nomeMae}</span>}
          </div>
          <div>
            <label>Nome do Pai:</label>
            <input
              type="text"
              value={nomePai}
              onChange={(e) => setNomePai(e.target.value)}
            />
            {erros.nomePai && <span>{erros.nomePai}</span>}
          </div>
        </>
      )}

      {/* Seção 2: Endereço */}
      <h2>Endereço</h2>
      <div>
        <label>CEP:</label>
        <input
          type="text"
          placeholder="XXXXX-XXX"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />
        {erros.cep && <span>{erros.cep}</span>}
      </div>
      <div>
        <label>Endereço:</label>
        <input
          type="text"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
        />

        {erros.endereco && <span>{erros.endereco}</span>}
        
      </div>
      <div>
        <label>Número:</label>
        <input
          type="text"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
        {erros.numero && <span>{erros.numero}</span>}
      </div>
      <div>
        <label>Complemento:</label>
        <input
          type="text"
          value={complemento}
          onChange={(e) => setComplemento(e.target.value)}
        />
      </div>
      <div>
        <label>Cidade:</label>
        <input
          type="text"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />
        {erros.cidade && <span>{erros.cidade}</span>}
      </div>
      <div>
        <label>Estado:</label>
        <input
          type="text"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        />
        {erros.estado && <span>{erros.estado}</span>}
      </div>

      {/* Seção 3: Informação da Conta */}
      <h2>Informação da Conta</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {erros.email && <span>{erros.email}</span>}
      </div>
      <div>
        <label>Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        {erros.senha && <span>{erros.senha}</span>}
      </div>
      <div>
        <label>Confirmar Senha:</label>
        <input
          type="password"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />
        {erros.confirmarSenha && <span>{erros.confirmarSenha}</span>}
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
};

export default Formulario;