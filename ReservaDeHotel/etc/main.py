reservas = {}

def main():
    while True:
        print("Bem-Vindo ao Hotéis\n\nDigite sua opção:\n1 - Adicionar uma reserva\n2 - Verificar uma reserva\n3 - Desfazer uma reserva\n0 - Sair")
        opcao = input("Opção: ")
        if opcao == "1":
            adicionar()
        elif opcao == "2":
            verificar()
        elif opcao == "3":
            desfazer()
        elif opcao == "0":
            print("Saindo...")
            break
        else:
            print("Opção inválida")

def adicionar():
    nome = input("Nome: ")
    verificadorQuartos(nome)

def verificadorQuartos(nome):
    quartosDisponiveis = ["101", "102", "103", "104", "105"]
    
    quantidadeDePessoas = int(input("Digite a quantidade de pessoas que irão ficar hospedadas: "))
    quantidadeDeQuartos = -(-quantidadeDePessoas // 4)  # Arredonda para cima

    for i in range(quantidadeDeQuartos):
        print("Escolha um quarto: ", quartosDisponiveis)
        quarto = input("Quarto: ")
        if quarto in quartosDisponiveis:
            quartosDisponiveis.remove(quarto)
            reservas[quarto] = nome
        else:
            print("Quarto não disponível. Escolha outro quarto.")

def verificar():
    verificarSeFoiReservado = input("Digite o nome cadastrado: ")
    encontrados = [quarto for quarto, nome in reservas.items() if nome == verificarSeFoiReservado]
    if encontrados:
        print(f"Reservas encontradas para {verificarSeFoiReservado}: {encontrados}")
    else:
        print("Nenhuma reserva encontrada para esse nome.")

def desfazer():
    nome = input("Digite o nome da reserva a ser desfeita: ")
    encontrados = [quarto for quarto, nome_reserva in reservas.items() if nome_reserva == nome]
    if encontrados:
        for quarto in encontrados:
            del reservas[quarto]
        print(f"Reservas para {nome} foram desfeitas.")
    else:
        print("Nenhuma reserva encontrada para esse nome.")

if __name__ == "__main__":
    main()
