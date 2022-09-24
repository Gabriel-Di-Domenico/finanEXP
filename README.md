# FinanEXP

Este aplicativo é inspirado pelo aplicativo web "Mobills" a intenção por trás do projeto é criar um aplicativo de gerenciamento financeiro,
mas acima de tudo aprender mais sobre angular, .NET e desenvolvimento em web em si.

Este projeto esta sendo desenvolvido por mim, por motivos puramente acadêmicos.

## Como rodar

A versão atual apenas permite a utilização do aplicativo em modo desenvolvedor.

Para rodar basta clonar o repositório, ter instalado em sua máquina o postgreSQL
e criar um arquivo chamado ".Settings.cs" na pasta backend e colocar nele:

```c#
namespace backend
{
  public class Settings
  {
    public static string Secret = "Seu segredo para o JWT token";
    public static string DatabasePassword = "Sua senha do banco de dados";
    public static string DataBaseName = "Nome do seu banco de dados";
  }
}
```

Agora é só rodar o backend da forma que preferir e o front end com o comando "ng-serve"

## Conhecimentos envolvidos

* Scrum
* Angular
* .NET
* MVC
* SQL

