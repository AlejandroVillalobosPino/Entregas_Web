import { useFormikContext, Field, ErrorMessage } from 'formik';
import styles from '../../styles/Section.module.css';
import clsx from 'clsx';

export default function ContactSection() {
    const { touched, errors } = useFormikContext();
    return (
        <div className={styles.row}>
            <div className={styles.full}>
                <label>Dirección</label>
                <Field name="contacto.direccion" type="text"
                       className={clsx({ [styles.stateError]: touched.contacto?.direccion && errors.contacto?.direccion })}/>
                <ErrorMessage name="contacto.direccion" component="div" className={styles.error}/>
            </div>
            <div>
                <label>Ciudad</label>
                <Field name="contacto.ciudad" type="text"
                       className={clsx({ [styles.stateError]: touched.contacto?.ciudad && errors.contacto?.ciudad })}/>
                <ErrorMessage name="contacto.ciudad" component="div" className={styles.error}/>
            </div>
            <div>
                <label>Código postal</label>
                <Field name="contacto.cp" type="text"
                       className={clsx({ [styles.stateError]: touched.contacto?.cp && errors.contacto?.cp })}/>
                <ErrorMessage name="contacto.cp" component="div" className={styles.error}/>
            </div>
        </div>
    );
}
