import promptSync from 'prompt-sync';

export default class Entrada {
    public static receberNumero(mensagem: string) {
        let prompt = promptSync();
        let valor = prompt(mensagem);
        let numero = new Number(valor);
        return numero.valueOf();
    }

    public static receberTexto(mensagem: string) {
        let prompt = promptSync();
        let texto = prompt(mensagem);
        return texto;
    }
}
