import { useFormikContext, Field, ErrorMessage } from 'formik';
import styles from '../../styles/Section.module.css';
import clsx from 'clsx';

export default function PersonalSection() {
    const { touched, errors } = useFormikContext();

    return (
        <>
            <div className={styles.row}>
                <div>
                    <label>Nombre</label>
                    <Field name="personal.nombre" type="text"
                           className={clsx({ [styles.stateError]: touched.personal?.nombre && errors.personal?.nombre })}/>
                    <ErrorMessage name="personal.nombre" component="div" className={styles.error}/>
                </div>
                <div>
                    <label>Apellidos</label>
                    <Field name="personal.apellidos" type="text"
                           className={clsx({ [styles.stateError]: touched.personal?.apellidos && errors.personal?.apellidos })}/>
                    <ErrorMessage name="personal.apellidos" component="div" className={styles.error}/>
                </div>
                <div>
                    <label>Email</label>
                    <Field name="personal.email" type="email"
                           className={clsx({ [styles.stateError]: touched.personal?.email && errors.personal?.email })}/>
                    <ErrorMessage name="personal.email" component="div" className={styles.error}/>
                </div>
                <div>
                    <label>Teléfono</label>
                    <Field name="personal.telefono" type="tel"
                           className={clsx({ [styles.stateError]: touched.personal?.telefono && errors.personal?.telefono })}/>
                    <ErrorMessage name="personal.telefono" component="div" className={styles.error}/>
                </div>
            </div>
            <p className={styles.hint}>Estos datos nos permiten crear tu cuenta FitLife.</p>
        </>
    );
}
