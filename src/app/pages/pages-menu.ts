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
                link: "cadastrar-funcionario",
            }
        ],
    },
    {
        title: "Consultar",
        icon: "nb-search",
        link: "consultar/",
        children: [
            {
                title: "Funcionário",
                link: "consultar-funcionario",
            },
            {
                title: "Veículo",
                link: "consultar-veiculo",
            }
        ],
    },
    {
        title: "Relatórios",
        icon: "nb-bar-chart",
        link: "relatorios/",
        children: [
            {
                title: "Veículos Ativados",
                link: "relatorio-veiculos-ativados",
            },
            {
                title: "Aniversariantes",
                link: "relatorio-aniversariantes", 
            }
        ],
    },
    {
        title: "Versão 1.0",
        icon: "nb-gear",
    }, 
];
