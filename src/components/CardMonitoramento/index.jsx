import {useState} from 'react';
import './style.css';

export default function CardMonitoramento() {
    const [contador, setContador] = useState(0);
    const [incremento, setIncremento] = useState(1);
    const [ultimoLoteRegistrado, setUltimoLoteRegistrado] = useState(null);
    const [ultimoLoteEnviado, setUltimoLoteEnviado] = useState(null);

    function incrementar() {
        setContador(valorAnterior => {
            if (valorAnterior + incremento > 50) {
                return valorAnterior;
            }
            return valorAnterior + incremento;
        });
    }

    function decrementar() {
        setContador(valorAnterior => {
            if (valorAnterior - incremento < 0) {
                return valorAnterior;
            }
            return valorAnterior - incremento;
        });
    }

    function resetar() {
        if (contador > 0) {
            setUltimoLoteRegistrado(contador);
            setContador(0);
        }
    }

    function enviarLote() {
        if (contador > 0) {
            setUltimoLoteEnviado(contador);
            resetar();
        }
    }

    function validarIncremento(event) {
        const valor = Number(event.target.value);

        if (!Number.isFinite(valor) || valor < 1) {
            setIncremento(1);
        } else if (valor > 10) {
            setIncremento(10);
        } else {
            setIncremento(Math.trunc(valor));
        }
    }

    let status = 'normal';
    let mensagemStatus = 'Capacidade normal';

    if (contador === 50) {
        status = 'completo';
        mensagemStatus = 'Lote Fechado';
    } else if (contador > 40) {
        status = 'alerta';
        mensagemStatus = 'Capacidade quase atingida';
    }

    return (
        <section className="card-exemplo" aria-labelledby="titulo-monitoramento">
            <div className="card-header">
                <span className="badge">Controle de lotes</span>
                <h2 id="titulo-monitoramento">Monitoramento de caixas</h2>
            </div>
            <div className={`contador-display status-${status}`} role="status" aria-live="polite" aria-atomic="true">
                <span className="numero-contador">{contador}</span>
                <span>de 50 caixas</span>
                <span className="badge">{mensagemStatus}</span>
            </div>
            <div className="passo-container">
                <label htmlFor="passo-input">Passo do incremento:</label>
                <input
                    type="number"
                    min="1"
                    max="10"
                    step="1"
                    value={incremento}
                    id="passo-input"
                    onChange={validarIncremento}
                    aria-describedby="ajuda-passo"
                />
            </div>
            <p className="ajuda-passo" id="ajuda-passo">Informe um número inteiro de 1 a 10.</p>
            <div className="botoes-grupo">
                <button
                    type="button"
                    className="btn btn-decrementar"
                    onClick={decrementar}
                    disabled={contador === 0 || contador - incremento < 0}
                    aria-label={`Decrementar ${incremento} caixas`}
                >
                    - {incremento}
                </button>
                <button type="button" className="btn btn-resetar" onClick={resetar} disabled={contador === 0}>
                    Zerar
                </button>
                <button
                    type="button"
                    className="btn btn-incrementar"
                    onClick={incrementar}
                    disabled={contador === 50 || contador + incremento > 50}
                    aria-label={`Incrementar ${incremento} caixas`}
                >
                    + {incremento}
                </button>
            </div>
            <div className="botoes-grupo">
                <button type="button" className="btn btn-enviar" onClick={enviarLote} disabled={contador === 0}>
                    Enviar lote
                </button>
            </div>
            <div className="registro-lote" role="status" aria-live="polite" aria-atomic="true">
                <h3>Último lote enviado</h3>
                {ultimoLoteEnviado === null ? (
                    <p>Nenhum lote enviado nesta sessão.</p>
                ) : (
                    <p>Lote enviado com {ultimoLoteEnviado} {ultimoLoteEnviado === 1 ? 'caixa' : 'caixas'}.</p>
                )}
            </div>
            <div className="registro-lote" role="status" aria-live="polite" aria-atomic="true">
                <h3>Último lote registrado</h3>
                {ultimoLoteRegistrado === null ? (
                    <p>Nenhum lote finalizado nesta sessão.</p>
                ) : (
                    <p>{ultimoLoteRegistrado} {ultimoLoteRegistrado === 1 ? 'caixa registrada' : 'caixas registradas'}.</p>
                )}
            </div>
        </section>
    );
}
