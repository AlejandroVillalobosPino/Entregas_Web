import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Card, Footer, Btn, Banner, Header, Title, Steps } from './Layout';
import PersonalSection from './sections/PersonalSection';
import ContactSection from './sections/ContactSection';
import TrainingSection from './sections/TrainingSection';
import PaymentSection from './sections/PaymentSection';
import { registerMember } from '../api/client';
import { useState } from 'react';

const initialValues = {
    personal: { nombre:'', apellidos:'', email:'', telefono:'' },
    contacto: { direccion:'', ciudad:'', cp:'' },
    entreno:  { objetivo:'', tipo:'', disponibilidad:'', rm:'', yogaNivel:'' },
    pago:     { metodo:'', card:'', exp:'', cvv:'' }
};

// Validación por pasos (esquemas separados)
const schemaPersonal = Yup.object({
    personal: Yup.object({
        nombre: Yup.string().required('El nombre es obligatorio'),
        apellidos: Yup.string().required('Los apellidos son obligatorios'),
        email: Yup.string().email('Email inválido').required('El email es obligatorio'),
        telefono: Yup.string().min(7,'Mínimo 7 dígitos').required('El teléfono es obligatorio'),
    })
});
const schemaContacto = Yup.object({
    contacto: Yup.object({
        direccion: Yup.string().required('Dirección obligatoria'),
        ciudad: Yup.string().required('Ciudad obligatoria'),
        cp: Yup.string().matches(/^[0-9A-Za-z\- ]{3,10}$/,'CP inválido').required('CP obligatorio'),
    })
});
const schemaEntreno = Yup.object({
    entreno: Yup.object({
        objetivo: Yup.string().required('Selecciona un objetivo'),
        tipo: Yup.string().required('Selecciona un tipo'),
        disponibilidad: Yup.number().min(1).max(7).required('Indica días/semana'),
        rm: Yup.number().min(0).nullable().transform(v=> (v===''? null : v)),
        yogaNivel: Yup.string().when('tipo',{
            is:'yoga',
            then: s => s.required('Selecciona nivel de yoga'),
            otherwise: s => s
        })
    })
});
const schemaPago = Yup.object({
    pago: Yup.object({
        metodo: Yup.string().required('Selecciona método'),
        card: Yup.string().when('metodo',{
            is:'tarjeta',
            then: s => s.matches(/^[0-9 ]{12,19}$/,'Formato tarjeta inválido').required('Número de tarjeta requerido'),
            otherwise: s => s.notRequired()
        }),
        exp: Yup.string().when('metodo',{
            is:'tarjeta',
            then: s => s.matches(/^(0[1-9]|1[0-2])\/\d{2}$/,'Usa MM/AA').required('Caducidad requerida'),
            otherwise: s => s.notRequired()
        }),
        cvv: Yup.string().when('metodo',{
            is:'tarjeta',
            then: s => s.matches(/^\d{3,4}$/,'CVV inválido').required('CVV requerido'),
            otherwise: s => s.notRequired()
        })
    })
});

const stepSchemas = [schemaPersonal, schemaContacto, schemaEntreno, schemaPago];
const stepTitles  = ['Datos personales', 'Contacto', 'Preferencias', 'Pago'];

export default function FormSteps() {
    const [step, setStep] = useState(0);
    const [msg, setMsg]   = useState({ type:'', text:'' });
    const isLast = step === stepTitles.length - 1;

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={stepSchemas[step]}
            validateOnMount
            onSubmit={async (values, actions)=>{
                setMsg({ type:'', text:'' });
                try{
                    await registerMember(values);
                    setMsg({ type:'ok', text:'¡Registro completado! Te hemos dado de alta en FitLife.' });
                    actions.resetForm();
                    setStep(0);
                }catch(err){
                    setMsg({ type:'error', text: err.message });
                }finally{
                    actions.setSubmitting(false);
                }
            }}
        >
            {({ isValid, isSubmitting })=>(
                <Card>
                    <Header>
                        <div>
                            <Title>Únete a <span style={{color:'var(--brand)'}}>FitLife</span></Title>
                            <Steps>
                                {stepTitles.map((t,i)=>(
                                    <li key={t} className={i===step ? 'active' : ''}>{i+1}. {t}</li>
                                ))}
                            </Steps>
                        </div>
                    </Header>

                    {msg.text && <Banner type={msg.type==='ok' ? 'ok' : 'error'}>{msg.text}</Banner>}

                    <Form>
                        {step===0 && <PersonalSection/>}
                        {step===1 && <ContactSection/>}
                        {step===2 && <TrainingSection/>}
                        {step===3 && <PaymentSection/>}

                        <Footer>
                            <Btn type="button" onClick={()=> setStep(s=> Math.max(0, s-1))} disabled={step===0 || isSubmitting}>
                                Atrás
                            </Btn>
                            {!isLast ? (
                                <Btn variant="primary" type="button" disabled={!isValid || isSubmitting}
                                     onClick={()=> setStep(s=> Math.min(stepTitles.length-1, s+1))}>
                                    Siguiente
                                </Btn>
                            ) : (
                                <Btn variant="primary" type="submit" disabled={!isValid || isSubmitting}>
                                    {isSubmitting ? 'Enviando…' : 'Finalizar registro'}
                                </Btn>
                            )}
                        </Footer>
                    </Form>
                </Card>
            )}
        </Formik>
    );
}
