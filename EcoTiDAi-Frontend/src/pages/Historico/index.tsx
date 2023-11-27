import React, { FC, useCallback, useEffect, useState } from "react";
import styles from './styles.module.scss';
import MapaBogota from "components/MapaBogota";
import Cargando from "components/Cargando"
import { useStore } from "stores";
import { observer } from "mobx-react-lite";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InputGroup from 'react-bootstrap/InputGroup';
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

interface DataProps
{
  titulo: string,
  cantidad: number,
  fecha: string,
}

const HistoricoData : FC<DataProps> = observer(({
  titulo,
  cantidad,
  fecha,
}) => {
  return (
  <div className={styles.data}>
    <div className={styles.title}>{titulo}</div>
    <div className={styles.number}>{cantidad}</div>
    <div className={styles.date}>desde {fecha}</div>
  </div>
  );
})

const CustomInput = ({ value, onClick }: { value?: string; onClick?: () => void }) => (
  <InputGroup  onClick={onClick}  className="mb-3">
    <Form.Control value={value} readOnly/>
    <InputGroup.Text>
      <FontAwesomeIcon icon={faCalendar} />
    </InputGroup.Text>
  </InputGroup>
);

const Historico: FC = () => {

    const store = useStore();

    const [fechaInicio, setFechaInicio] = useState<Date|null>(null);
    const [fechaFin, setFechaFin] = useState<Date|null>(null);

    const cargarHistorico = useCallback(()=> {
      const fetchData = async () => {
        await store.historico.cargarPuntosHistorico(fechaInicio,fechaFin);
        await store.historico.cargarConsolidados(fechaInicio,fechaFin);  
      }
        fetchData().then().catch(console.error)
    },[fechaInicio, fechaFin])

    useEffect(()=>{
      cargarHistorico();       
    },[])    

    return ( 
        <div className={styles.layout}>
          {!(store.historico.posicionesArray.length > 0) ?
            <Cargando/>
            :
            <>
            <div className={styles.mapa}>
              {store.historico.posiciones &&
                <MapaBogota
                  ubicaciones={store.historico.posicionesArray}
                />
              }
            </div>
            <div className={styles.info}>
              <div className={styles.dateFlex}>
                <div className={styles.datePick}>
                  <h3>Desde: </h3>
                  <DatePicker
                  selected={fechaInicio}
                  onChange={date => setFechaInicio(date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Seleccione desde donde filtrar"
                  minDate={new Date(store.historico.primeraFecha)}
                  customInput={<CustomInput />}
                />
                </div>
                <div className={styles.datePick}>
                  <h3>Hasta: </h3>
                  <DatePicker
                  selected={fechaFin}
                  onChange={date => setFechaFin(date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Seleccione hasta donde filtrar"
                  maxDate={new Date()}
                  customInput={<CustomInput />}
                />
                </div> 
              </div>
              <div className={styles.block}>
                <div className={styles.row}>
                  <hr/>
                  <HistoricoData
                    titulo="Neumáticos recogidos"
                    cantidad={store.historico.totalLlantas}
                    fecha={store.historico.primeraFecha}
                    />
                    <HistoricoData
                    titulo="PQRS por atender"
                    cantidad={store.historico.pqrsPendientes}
                    fecha={store.historico.primeraFecha}
                    />
                </div>
                <div className={styles.row}>
                  <hr/>
                  <HistoricoData
                    titulo="Ubicaciones Atendidas"
                    cantidad={store.historico.ubicacionesAtendidas}
                    fecha={store.historico.primeraFecha}
                    />
                  <HistoricoData
                    titulo="Kilómetros Recorridos"
                    cantidad={store.historico.kilometrosRecorridos}
                    fecha={store.historico.primeraFecha}
                    />
                </div>
            </div>
            </div>
            </>
          }
        </div>
         
    );
}

export default observer(Historico);