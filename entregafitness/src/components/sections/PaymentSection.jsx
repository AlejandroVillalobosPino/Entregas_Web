import { useFormikContext, Field, ErrorMessage } from 'formik';
import styles from '../../styles/Section.module.css';
import clsx from 'clsx';

export default function PaymentSection() {
    const { touched, errors, values } = useFormikContext();

    return (
        <div className={styles.row}>
            <div>
                <label>Método de pago</label>
                <Field as="select" name="pago.metodo"
                       className={clsx({ [styles.stateError]: touched.pago?.metodo && errors.pago?.metodo })}>
                    <option value="">Selecciona…</option>
                    <option value="tarjeta">Tarjeta</option>
                    <option value="domiciliacion">Domiciliación</option>
                </Field>
                <ErrorMessage name="pago.metodo" component="div" className={styles.error}/>
            </div>

            {/* Si es tarjeta, pedimos datos */}
            {values.pago.metodo === 'tarjeta' && (
                <>
                    <div className={styles.full}>
                        <label>Número de tarjeta</label>
                        <Field name="pago.card" placeholder="4111 1111 1111 1111"
                               className={clsx({ [styles.stateError]: touched.pago?.card && errors.pago?.card })}/>
                        <ErrorMessage name="pago.card" component="div" className={styles.error}/>
                    </div>
                    <div>
                        <label>Caducidad (MM/AA)</label>
                        <Field name="pago.exp" placeholder="08/28"
                               className={clsx({ [styles.stateError]: touched.pago?.exp && errors.pago?.exp })}/>
                        <ErrorMessage name="pago.exp" component="div" className={styles.error}/>
                    </div>
                    <div>
                        <label>CVV</label>
                        <Field name="pago.cvv" type="password" placeholder="123"
                               className={clsx({ [styles.stateError]: touched.pago?.cvv && errors.pago?.cvv })}/>
                        <ErrorMessage name="pago.cvv" component="div" className={styles.error}/>
                    </div>
                </>
            )}
        </div>
    );
}
