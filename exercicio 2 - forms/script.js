document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("form").addEventListener("submit", function (event) {
        event.preventDefault();

        var fnome = document.getElementById("fname").value;
        var lnome = document.getElementById("lname").value;
        var birthdate = document.getElementById("birthdate").value;
        var castrado = document.getElementById("castrado").checked;

        if (fnome === "" || lnome === "" || birthdate === "") {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        fetch('http://localhost:3000/cadastros', {
            method: 'POST',
            body: JSON.stringify({
                fnome: fnome,
                lnome: lnome,
                birthdate: birthdate,
                castrado: castrado,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(location.reload())
            .catch(error => {
                console.error('Erro durante o cadastro:', error);
            });
    });

    function createItemList(items) {
        var itemList = document.getElementById("item-list");
        items.forEach(function (item) {
            var listItem = document.createElement("p");
            listItem.textContent = ">" + " " + item.fnome + " " + item.lnome;
            itemList.appendChild(listItem);
        });
    }

    fetch('http://localhost:3000/cadastros')
        .then(response => response.json())
        .then(posts => {
            var items = posts;
            createItemList(items);
        })
        .catch(error => {
            console.error('Erro ao obter lista de itens:', error);
        });
});
