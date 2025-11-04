import { useFormikContext, Field, ErrorMessage } from 'formik';
import styles from '../../styles/Section.module.css';
import clsx from 'clsx';

const opciones = [
    { value:'fuerza', label:'Fuerza' },
    { value:'cardio', label:'Cardio' },
    { value:'crossfit', label:'CrossFit' },
    { value:'yoga', label:'Yoga' },
    { value:'pilates', label:'Pilates' },
];

export default function TrainingSection() {
    const { values, touched, errors, setFieldValue } = useFormikContext();

    return (
        <>
            <div className={styles.row}>
                <div>
                    <label>Objetivo principal</label>
                    <Field as="select" name="entreno.objetivo"
                           className={clsx({ [styles.stateError]: touched.entreno?.objetivo && errors.entreno?.objetivo })}>
                        <option value="">Selecciona…</option>
                        <option value="perder-grasa">Perder grasa</option>
                        <option value="ganar-musculo">Ganar músculo</option>
                        <option value="rendimiento">Rendimiento</option>
                        <option value="bienestar">Bienestar</option>
                    </Field>
                    <ErrorMessage name="entreno.objetivo" component="div" className={styles.error}/>
                </div>

                <div>
                    <label>Tipo de entrenamiento</label>
                    <Field as="select" name="entreno.tipo"
                           className={clsx({ [styles.stateError]: touched.entreno?.tipo && errors.entreno?.tipo })}
                           onChange={(e)=>{
                               const v = e.target.value;
                               setFieldValue('entreno.tipo', v);
                               // Limpiar campos dependientes
                               if (v !== 'yoga') setFieldValue('entreno.yogaNivel', '');
                               if (v !== 'fuerza') setFieldValue('entreno.rm', '');
                           }}>
                        <option value="">Selecciona…</option>
                        {opciones.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
                    </Field>
                    <ErrorMessage name="entreno.tipo" component="div" className={styles.error}/>
                </div>

                <div>
                    <label>Disponibilidad semanal (días)</label>
                    <Field name="entreno.disponibilidad" type="number" min="1" max="7"
                           className={clsx({ [styles.stateError]: touched.entreno?.disponibilidad && errors.entreno?.disponibilidad })}/>
                    <ErrorMessage name="entreno.disponibilidad" component="div" className={styles.error}/>
                </div>

                {/* Campos condicionales */}
                <div className={values.entreno.tipo === 'fuerza' ? '' : styles.hidden}>
                    <label>RM sentadilla (kg) (opcional)</label>
                    <Field name="entreno.rm" type="number"/>
                    <ErrorMessage name="entreno.rm" component="div" className={styles.error}/>
                </div>

                <div className={values.entreno.tipo === 'yoga' ? '' : styles.hidden}>
                    <label>Nivel de Yoga</label>
                    <Field as="select" name="entreno.yogaNivel">
                        <option value="">Selecciona…</option>
                        <option value="inic">Inicial</option>
                        <option value="inter">Intermedio</option>
                        <option value="avz">Avanzado</option>
                    </Field>
                    <ErrorMessage name="entreno.yogaNivel" component="div" className={styles.error}/>
                </div>
            </div>

            <p className={styles.hint}>La lista anterior muestra tipos de entrenamiento disponibles. Se revelan campos extra según la opción (condicionales).</p>
        </>
    );
}
