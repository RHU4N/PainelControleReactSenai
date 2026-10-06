import { useState } from "react";
import "./style.css";

export default function CardMonitoramento() {
  const [contador, setContador] = useState(0);
  const [passos, setPassos] = useState(1);

  function incrementar() {
    if (passos <= 0) {
      setPassos(1);
      console.log("O valor de passos não pode ser menor que 1.");
    } else if (passos >= 10) {
      setPassos(10);
      console.log("O valor de passos não pode ser maior que 10.");
    } else {
      setContador((valorAnterior) => valorAnterior + passos);
    }
  }

  function decrementar() {
    if (passos <= 0) {
      setPassos(1);
      console.log("O valor de passos não pode ser menor que 1.");
    } else if (passos >= 10) {
      setPassos(10);
      console.log("O valor de passos não pode ser maior que 10.");
    } else if (contador - passos < 0) {
      setContador(0);
      console.log("O valor do contador não pode ser menor que 0.");
    } else {
      setContador((valorAnterior) => valorAnterior - passos);
    }
  }

  function zerar() {
    setContador(0);
  }

  function entregarLote() {
    if (contador <= 0) {
      console.log("O valor do contador não pode ser menor que 0.");
    } else if (contador > 50) {
      console.log("O valor do contador não pode ser maior que 50.");
    } else {
      console.log("Lote com " + contador + " itens entregue com sucesso!");
      setContador(0);
    }
  }

  return (
    <div className="card-monitoramento">
      <h2>Monitoramento de Itens</h2>
      <div className="contador-display">
        <span className="numero-contador">{contador}</span>
      </div>
      <div className="passos">
        <label htmlFor="passos">Passos:</label>
        <input
          type="number"
          id="passos"
          value={passos}
          onChange={(e) => setPassos(Number(e.target.value))}
          min="1"
          max="10"
        />
      </div>
      <div className="botoes">
        <button onClick={incrementar}>Incrementar </button>
        <button onClick={decrementar}>Decrementar</button>
        <button onClick={zerar}>Zerar</button>
        <button onClick={entregarLote}>Entregar Lote</button>
      </div>
      <div className="badge"></div>
    </div>
  );
}
