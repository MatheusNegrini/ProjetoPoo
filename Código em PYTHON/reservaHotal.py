import re
from datetime import datetime

class HotelService:
    def __init__(self):
        self.users = []  # Armazena (email, senha) para cada usuário cadastrado
        self.rooms = {
            "Deluxe": 1286,
            "Master": 732,
            "Standard": 358
        }
        self.reservas = []  # Armazena todas as reservas feitas

    def cadastrar_usuario(self, email, senha):
        if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', email):
            print("Erro: E-mail inválido. Por favor, insira um e-mail válido.")
            return False
        elif len(senha) < 8:
            print("Erro: A senha deve conter no mínimo 8 caracteres.")
            return False
        else:
            self.users.append((email, senha))
            print("Usuário cadastrado com sucesso!")
            return True

    def autenticar_usuario(self, email, senha):
        for user_email, user_senha in self.users:
            if user_email == email:
                if user_senha == senha:
                    return True
                else:
                    print("Erro: Senha incorreta. Por favor, tente novamente.")
                    return False
        print("Erro: Usuário não encontrado. Deseja cadastrar-se?")
        return None

    def consultar_reserva(self, email):
        reservas_usuario = [reserva for reserva in self.reservas if reserva.email == email]
        if reservas_usuario:
            for reserva in reservas_usuario:
                custo_formatado = f"R$ {reserva.custo_total(self.rooms[reserva.quarto]):,.2f}".replace('.', ',')
                print(f"Reserva - Quarto: {reserva.quarto} | Entrada: {reserva.data_entrada} | Saída: {reserva.data_saida} | Custo Total: {custo_formatado}")
        else:
            print("Você não possui reservas ativas.")

    def cancelar_reserva(self, email):
        reservas_usuario = [reserva for reserva in self.reservas if reserva.email == email]
        if reservas_usuario:
            for idx, reserva in enumerate(reservas_usuario, start=1):
                print(f"{idx}. Quarto: {reserva.quarto} | Entrada: {reserva.data_entrada} | Saída: {reserva.data_saida}")
            opcao = int(input("Selecione o número da reserva que deseja cancelar: ")) - 1
            if 0 <= opcao < len(reservas_usuario):
                reserva_cancelada = reservas_usuario[opcao]
                self.reservas.remove(reserva_cancelada)
                print("Reserva cancelada com sucesso!")
            else:
                print("Opção inválida.")
        else:
            print("Você não possui reservas para cancelar.")

class Reserva:
    def __init__(self, email, quarto, num_pessoas, data_entrada, data_saida):
        self.email = email
        self.quarto = quarto
        self.num_pessoas = num_pessoas
        self.data_entrada = data_entrada
        self.data_saida = data_saida

    def calcular_diarias(self):
        return (self.data_saida - self.data_entrada).days if self.data_saida > self.data_entrada else 0

    def custo_total(self, preco_diaria):
        return self.calcular_diarias() * preco_diaria

def solicitar_reserva(hotel_service, email):
    num_pessoas = int(input("Quantas pessoas ficarão no quarto? "))
    data_entrada = datetime.strptime(input("Data de entrada (dd/mm/aaaa): "), "%d/%m/%Y")
    data_saida = datetime.strptime(input("Data de saída (dd/mm/aaaa): "), "%d/%m/%Y")

    while num_pessoas > 0:
        if num_pessoas > 4:
            print("O número de pessoas excede a capacidade de um quarto. Será necessário reservar quartos adicionais.")
            pessoas_quarto = 4
            num_pessoas -= 4
        else:
            pessoas_quarto = num_pessoas
            num_pessoas = 0

        tipo_quarto = input("Digite o tipo de quarto (Deluxe, Master, Standard): ")
        if tipo_quarto not in hotel_service.rooms:
            print("Erro: Tipo de quarto inválido. Tente novamente.")
            continue

        reserva = Reserva(email, tipo_quarto, pessoas_quarto, data_entrada, data_saida)
        custo = reserva.custo_total(hotel_service.rooms[tipo_quarto])
        custo_formatado = f"R$ {custo:,.2f}".replace('.', ',')

        if custo > 0:
            hotel_service.reservas.append(reserva)
            print(f"Reserva realizada com sucesso! Quarto: {tipo_quarto} | Pessoas: {pessoas_quarto} | Total de diárias: {reserva.calcular_diarias()} | Custo total: {custo_formatado}")
        else:
            print("Erro ao realizar a reserva. Verifique os detalhes e tente novamente.")

def main():
    hotel_service = HotelService()

    while True:
        print("\n--- Sistema de Reservas de Hotel ---")
        print("1 - Alugar um quarto")
        print("2 - Ver se há uma reserva (usar o email de cadastro)")
        print("3 - Desfazer uma reserva")
        print("0 - Sair do programa")
        
        opcao = input("Escolha uma opção: ")
        
        if opcao == "1":
            email = input("Digite seu e-mail para login/cadastro: ")
            senha = input("Digite sua senha (mínimo 8 caracteres): ")

            autenticado = hotel_service.autenticar_usuario(email, senha)
            if autenticado is None:
                cadastrar = input("Usuário não encontrado. Deseja cadastrar? (s/n): ")
                if cadastrar.lower() == 's':
                    if not hotel_service.cadastrar_usuario(email, senha):
                        continue
            elif autenticado: 
                solicitar_reserva(hotel_service, email)

        elif opcao == "2":
            email = input("Digite seu e-mail para ver reservas: ")
            hotel_service.consultar_reserva(email)

        elif opcao == "3":
            email = input("Digite seu e-mail para cancelar uma reserva: ")
            hotel_service.cancelar_reserva(email)

        elif opcao == "0":
            print("Saindo do sistema. Até logo!")
            break

        else:
            print("Opção inválida. Por favor, escolha uma opção válida.")

# Executa o sistema
main()
