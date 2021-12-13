var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

const url = "/http/RFC_CALL_MATERIAL_TABLE";
const token = ("Basic token")

//// Auth apenas para o XHR ////
function auth() {
    xhr.open("POST",url);
    xhr.setRequestHeader("Authorization", token);
    xhr.setRequestHeader("Content-Type", "application/json");
};

//// COLETA dados do Backend ////
function fisico() {
    var data = JSON.stringify({
        "ns1:ZFM_LIST_MATERIAL": {
            "I_TIPO": "FISICO"
        }
    });
    auth();
    xhr.send(data);
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var response = JSON.parse(xhr.responseText);
            tbl(response)

        }
    });
};
function ebook() {
    var data = JSON.stringify({
        "ns1:ZFM_LIST_MATERIAL": {
            "I_TIPO": "EBOOK"
        }
    });
    auth();
    xhr.send(data);
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var response = JSON.parse(xhr.responseText);
            tbl(response)


        }
    });
};

//// Adiciona RESPONSE na tabela HTML  ////
function tbl(response) {

    var tabela = response.ET_MATERIAL.item; //Esta variavel da acesso ao caminho especifico dos dados JSON
    if (tabela.length > 0) {
        var temp = " ";


        tabela.forEach((u) => {
            temp += "<tr>";
            temp += '<td class="CODIGO" >' + u.CODIGO + '</td>';
            temp += '<td class="TIPO">' + u.TIPO + '</td>';
            temp += '<td class="NOME">' + u.NOME + '</td>';
            temp += '<td class="DESCRICAO">' + u.DESCRICAO + '</td>';
            temp += '<td class="QUANTIDADE">' + u.QUANTIDADE + '</td>';
            temp += `<td>
                        <button class="btn btn-danger btnDelete">Excluir</button>
                        <button class="btn btnUpdate btn-outline-warning" data-toggle="modal" data-target="#exampleModal">
                        Editar
                        </button>
                    </td>`;
        })
        document.getElementById("data").innerHTML = temp;
    }
};

//// Criar novo material para a tabela ////
$("#criar").click(function () {
    var NOME = $("#criar-NOME").val();
    var DESCRICAO = $("#criar-DESCRICAO").val();
    var TIPO = $("#criar-TIPO").val();
    var QUANTIDADE = $("#criar-QUANTIDADE").val();
    var CODIGO = $("#criar-CODIGO").val();
    var settings = {
        "url": url,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "ns1:ZFM_CREATE_MATERIAL": {
                "CODIGO": CODIGO,
                "DESCRICAO": DESCRICAO,
                "NOME": NOME,
                "TIPO": TIPO,
                "QUANTIDADE": QUANTIDADE
            }
        }),
    };

    $.ajax(settings).done(function (response) {
        alert('Material Criado!') ? "" : location.reload();
    });
})

//// Deletar material da Tabela ////
$(document).ready(function () {
    $("#data").on('click', '.btnDelete', function () {
        var currentRow = $(this).closest("tr");
        var col1 = currentRow.find("td:eq(0)").text();
        var CODIGO = col1;

        var settings = {
            "url": url,
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": token,
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "ns1:ZFM_DELETE_MATERIAL": {
                    "I_CODIGO": CODIGO,
                }
            }),
        };
        $.ajax(settings).done(function (response) {
            alert('Material Deletado!') ? "" : location.reload();
        });

    });
});

//// Loader da pagina ///
window.addEventListener("load", function () {
    const loader = document.querySelector(".loader")
    loader.className += " hidden";
});

//// Preenche Automaticamente os Inputs para modificação ////
$(document).ready(function () {
    $("#data").on('click', '.btnUpdate', function () {
        var currentRow = $(this).closest("tr");
        var col1 = currentRow.find("td:eq(0)").text();
        var col2 = currentRow.find("td:eq(1)").text();
        var col3 = currentRow.find("td:eq(2)").text();
        var col4 = currentRow.find("td:eq(3)").text();
        var col5 = currentRow.find("td:eq(4)").text();
        function preencher() {
            $('.form-group').click(function () {
                $('#updade-CODIGO').val(col1)
                $('#updade-TIPO').val(col2)
                $('#updade-NOME').val(col3)
                $('#updade-DESCRICAO').val(col4)
                $('#updade-QUANTIDADE').val(col5)
            })
        }
        preencher();
    });
});

/// Modificar dados na Tabela
$("#modificar").click(function () {
    var NOME = $("#updade-NOME").val();
    var DESCRICAO = $("#updade-DESCRICAO").val();
    var TIPO = $("#updade-TIPO").val();
    var QUANTIDADE = $("#updade-QUANTIDADE").val();
    var CODIGO = $("#updade-CODIGO").val();
    var settings = {
        "url": url,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "ns1:ZFM_UPDATE_MATERIAL": {
                "CODIGO": CODIGO,
                "DESCRICAO": DESCRICAO,
                "NOME": NOME,
                "TIPO": TIPO,
                "QUANTIDADE": QUANTIDADE
            }
        }),
    };

    $.ajax(settings).done(function (response) {
        alert('Material Modificado!') ? "" : location.reload();
    });
})