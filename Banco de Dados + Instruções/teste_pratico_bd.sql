-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 22-Jun-2019 às 18:29
-- Versão do servidor: 10.3.15-MariaDB
-- versão do PHP: 7.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `teste_pratico_bd`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `funcionarios`
--

CREATE TABLE `funcionarios` (
  `cpf` text NOT NULL,
  `nome` text NOT NULL,
  `dtNasc` text NOT NULL,
  `login` text NOT NULL,
  `senha` text NOT NULL,
  `dtCadastro` text NOT NULL,
  `timestampCadastro` date NOT NULL,
  `cpfResponsavelCadastro` text NOT NULL,
  `mesAniversario` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `funcionarios`
--

INSERT INTO `funcionarios` (`cpf`, `nome`, `dtNasc`, `login`, `senha`, `dtCadastro`, `timestampCadastro`, `cpfResponsavelCadastro`, `mesAniversario`) VALUES
('077.899.156-30', 'Wiharlley Yitzhak Abdo Arges Santos de S', '02/01/1996', 'Wiharlley', 'teste123', '17/06/2019', '2019-06-18', '000.000.000-00', '01'),
('412.194.540-95', 'Usuario Teste 2019 22062019', '03/03/1990', 'LoginTeste', 'teste123', '22/06/2019', '2019-06-22', '077.899.156-30', '03'),
('416.847.880-72', 'DSADJashjdjasdasdaskdjaDASDIJASIDASJDOAP', '02/01/1996', 'dasdsadasdas', 'teste123dasd', '20/06/2019', '2019-06-20', '077.899.156-30', '01'),
('600.574.110-18', 'Nome Alterado Teste Final', '02/01/1996', 'TESTE LOGIN2', 'teste123', '21/06/2019', '2019-06-21', '077.899.156-30', '01'),
('794.498.850-01', 'Funcionário Teste FINAL', '01/01/1996', '565465498dsa', '65d4asdas98d', '20/06/2019', '2019-06-20', '000.000.000-00', '01');

-- --------------------------------------------------------

--
-- Estrutura da tabela `veiculos`
--

CREATE TABLE `veiculos` (
  `placa` text NOT NULL,
  `ativo` tinyint(1) NOT NULL,
  `anoFabricacao` text NOT NULL,
  `anoModelo` text NOT NULL,
  `chassi` text NOT NULL,
  `dtCadastro` text NOT NULL,
  `timestampCadastro` date NOT NULL,
  `dtAtivacao` text DEFAULT NULL,
  `timestampAtivacao` date DEFAULT NULL,
  `dtDesativacao` text NOT NULL,
  `timestampDesativacao` date DEFAULT NULL,
  `modelo` text NOT NULL,
  `cor` text DEFAULT NULL,
  `consumoMedio` float NOT NULL,
  `numeroPassageiros` int(11) NOT NULL,
  `cpfFuncionario` text NOT NULL,
  `nomeFuncionario` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `veiculos`
--

INSERT INTO `veiculos` (`placa`, `ativo`, `anoFabricacao`, `anoModelo`, `chassi`, `dtCadastro`, `timestampCadastro`, `dtAtivacao`, `timestampAtivacao`, `dtDesativacao`, `timestampDesativacao`, `modelo`, `cor`, `consumoMedio`, `numeroPassageiros`, `cpfFuncionario`, `nomeFuncionario`) VALUES
('1111111111', 0, '2004', '2005', 'DSAKDJASKDJaskldajsldajs ld askldj askdj', '22/06/2019', '2019-06-22', '22/06/2019', '0000-00-00', '- - -', '2019-06-22', 'dklasj dklaj dkas jdklasj dkla', 'DSAKDJASKDJaskldajsl', 11.25, 4, '077.899.156-30', 'Wiharlley'),
('2019-TESTE', 1, '1999', '1998', 'CHASSICRIADOPARATESTEFINALDECADASTRO+654', '22/06/2019', '2019-06-22', '- - -', '0000-00-00', '22/06/2019', '2019-06-22', 'MODELOFINALCRIADOTESTECADASTRO', 'Cor Teste', 6.2, 3, '077.899.156-30', 'Wiharlley'),
('2222222222', 0, '1886', '1886', 'DSAKDJASKDJ ASDJK ASKD ASJDADSAKDJASKDJ ', '22/06/2019', '2019-06-22', '22/06/2019', '2019-06-22', '- - -', '0000-00-00', 'DSAKDJASKDJ ASDJK ASKD ASJDADS', 'DSAKDJASKDJ ASDJK AS', 1.25, 6, '077.899.156-30', 'Wiharlley'),
('2ATIVAD234', 0, '2000', '1999', 'dklasjdklasdj aksjdaskjdklasj dkla kdjal', '22/06/2019', '2019-06-22', '22/06/2019', '2019-06-22', '- - -', '0000-00-00', 'dklasjdklasdj aksjdaskjdklasj ', 'dklasjdklasdj aksjda', 2.25, 5, '077.899.156-30', 'Wiharlley'),
('ATIVADAPLA', 0, '2001', '1999', 'CHASSIATIVADOPLACAATIVADACHASSIATIVADOPL', '22/06/2019', '2019-06-22', '22/06/2019', '2019-06-22', '- - -', '0000-00-00', 'MODELOATIVADOATIVADOPLACAATIVA', 'CORATIVADA', 12.6, 7, '077.899.156-30', 'Wiharlley'),
('D6AS+56DA4', 1, '2000', '1999', 'cpfFuncionariocpfFuncionariocpfFuncionar', '21/06/2019', '2019-06-22', NULL, NULL, '21/06/2019', '2019-06-21', 'cpfFuncionariocpfFuncionariocp', '', 3, 8, '077.899.156-30', 'Wiharlley'),
('DASD123123', 0, '2019', '2019', 'd5sa40d56+as4ad056d04as5d5sa406d41asd7d4', '22/06/2019', '2019-06-22', '22/06/2019', '2019-06-22', '- - -', '0000-00-00', 'd5sa40d56+as4ad056d04as56d41as', '', 1.7, 4, '077.899.156-30', 'Wiharlley'),
('DSAD654564', 1, '2009', '2004', 'dSAdjiasdilasjd a56498799865987894564564', '21/06/2019', '2019-06-22', NULL, NULL, '22/06/2019', '2019-06-22', 'dasdasd9as54d5as4d89sa74d89as4', 'CORALTERADA', 2.1, 3, '077.899.156-30', 'Wiharlley'),
('DSADASD54A', 0, '2003', '2000', 'dSAdjiasdilasjd askljdnk asj dklasdj asd', '20/06/2019', '2019-06-20', '20/06/2019', '2019-06-20', '- - -', NULL, 'dasdasd9as54d5as4d89sa74d89as4', 'dasdasd9as54d5as4d89', 2.99, 5, '794.498.850-01', 'Funcionário Teste'),
('DSADJHASDA', 0, '2019', '2019', 'DSADJHASDAS DAS DJ ASJD ASKÇAADSADJHASDA', '22/06/2019', '2019-06-22', '- - -', '0000-00-00', '22/06/2019', '2019-06-22', 'DSADJHASDAS DAS DJ ASJD ASKÇAA', 'DSADJHASDAS DAS DJ A', 1.56, 3, '077.899.156-30', 'Wiharlley'),
('DSAJD54464', 0, '2019', '2019', 'dsad95as1d456as9d140qwd04a5 s640a564 0as', '21/06/2019', '2019-06-22', '21/06/2019', '2019-06-21', '- - -', NULL, 'dsad95as1d456as9d140qwd04a5 s6', '', 3.35, 3, '077.899.156-30', 'Wiharlley'),
('PLACA-2222', 0, '2012', '2014', 'das56d4as89d4as56d1a65a4dsa6d45as4d98a4s', '19/06/2019', '2019-06-20', '19/06/2019', '2019-06-19', '- - -', '0000-00-00', 'das5d64as471641d62as495d4a54dq', 'Colorido', 2.87, 5, '794.498.850-01', 'Funcionário Teste'),
('PLACA-6556', 0, '2001', '2000', 'dasdASDASDASdDsajiduy1iu7893217kldjaskld', '17/06/2019', '2019-06-18', '17/06/2019', '2019-06-17', '- - -', NULL, 'das5d64as471641d62as495d4a54dq', 'dsadsadsadasd!@!3123', 2.99, 4, '794.498.850-01', 'Funcionário Teste'),
('PLACA22222', 1, '2019', '2019', 'dskldjlaksj DSADKJASDKs dksadjasd6as+6ds', '21/06/2019', '2019-06-22', NULL, NULL, '21/06/2019', '2019-06-21', 'dskldjlaksj DSADKJASDKs dksadj', '', 2.76, 3, '077.899.156-30', 'Wiharlley'),
('PLACA77777', 1, '2019', '2019', 'dsadasdaskldjaskdas Chassi Desativadodsa', '21/06/2019', '2019-06-22', '- - -', '0000-00-00', '22/06/2019', '2019-06-22', 'DSADJHASDAS DAS DJ ASJD ASKÇAA', '', 3.58, 3, '077.899.156-30', 'Wiharlley'),
('PLACA89999', 0, '2019', '2019', 'dasdlaskjdas565d4as56dasdalkdasdlaskjdas', '21/06/2019', '2019-06-22', '22/06/2019', '2019-06-22', '- - -', '0000-00-00', 'dasdlaskjdas565d4as56dasdalkda', '', 2.85, 3, '077.899.156-30', 'Wiharlley'),
('PLACAATIVA', 0, '2019', '2019', 'DSADJHASDAS DAS DJ ASJD ASKÇAATIVADSADJH', '21/06/2019', '2019-06-22', '21/06/2019', '2019-06-21', '- - -', '0000-00-00', 'DSADJHASDAS DAS DJ ASJD ASKÇAA', 'DSADJHASDAS DAS DJ A', 2.97, 3, '077.899.156-30', 'Wiharlley'),
('PLACANOVA9', 1, '2019', '2019', 'dasd56as4d56as4dda89798ASDASDAdadasd56as', '21/06/2019', '2019-06-22', NULL, NULL, '21/06/2019', '2019-06-21', 'dasd56as4d56as4dda89798ASDASDA', '', 75.6, 2, '077.899.156-30', 'Wiharlley'),
('PLACATR654', 1, '2019', '2019', 'd56sa4dasDASDaskldajdasDASd56sa4dasDASDa', '22/06/2019', '2019-06-22', '- - -', '0000-00-00', '22/06/2019', '2019-06-22', 'd56sa4dasDASDaskldajdasDAdsadS', '', 1.5, 3, '077.899.156-30', 'Wiharlley');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD PRIMARY KEY (`cpf`(14));

--
-- Índices para tabela `veiculos`
--
ALTER TABLE `veiculos`
  ADD PRIMARY KEY (`placa`(10));
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
