import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: "Home",
        icon: "nb-home",
        link: "pages/",
        home: true,
    },
    {
        title: "Cadastrar",
        icon: "nb-plus",
        link: "cadastros/",
        children: [
            {
                title: "Veículo",
                link: "cadastro-veiculo",
            },
            {
                title: "Funcionário",
                link: "novo-funcionario",
            },
            /*
            {
                title: "Franquia",
                //link: "subAdmin",
            },
            {
                title: "Vendedor",
                //link: "consultor",
            },
            {   
                title: "Cidade",
                //link: "nova-cidade",
            },*/
        ],
    },
    {
        title: "Consultar",
        icon: "nb-search",
        link: "consultar/",
        children: [
           /* {
                title: "Cliente",
                link: "consultar-cliente",
            },
            /*{
                title: "Empresa",
                //link: "novo-vendedor",
            },
            {
                title: "Franquia",
                //link: "subAdmin",
            },
            {
                title: "Vendedor",
                //link: "consultor",
            },
            {   
                title: "Cidade",
                //link: "nova-cidade",
            },*/
        ],
    },
    {
        title: "Relatórios",
        icon: "nb-bar-chart",
        link: "relatorios/",
        children: [
           /* {
                title: "Vendas",
                //link: "consultarVendedor",
            },
            {
                title: "Vencimento",
                //link: "relatorio-pendencias-pedidos", 
            },
            /*{
                title: "Empresas",
                //link: "relatorio-pendencias-boletos", 
            }*/
        ],
    },
    {
        title: "Versão 1.0",
        icon: "nb-gear",
    }, 
];
