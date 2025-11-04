import styled from 'styled-components';

export const Page = styled.div`
  max-width: 960px; margin: 3rem auto; padding: 0 1rem;
`;
export const Card = styled.div`
  background: var(--card); border: 1px solid #1f2937; border-radius: 1.25rem;
  padding: 1.25rem 1.25rem 1.5rem; box-shadow: 0 10px 30px rgba(0,0,0,.25);
`;
export const Header = styled.div`
  display:flex; align-items:center; justify-content:space-between; gap:1rem; margin-bottom:1rem;
`;
export const Title = styled.h1`
  margin:0; font-size:1.5rem; letter-spacing: .2px;
`;
export const Steps = styled.ol`
  display:flex; gap:.5rem; list-style:none; padding:0; margin: .5rem 0 0 0;
  li{ padding:.35rem .7rem; border-radius:.7rem; background:#0b1322; font-size:.85rem; }
  .active{ background: var(--brand); color: #001016; font-weight: 600; }
`;
export const Footer = styled.div`
  display:flex; justify-content:space-between; margin-top:1rem; gap:.75rem;
`;
export const Btn = styled.button`
  background: ${p=>p.variant==='primary' ? 'var(--brand)' : '#0b1322'};
  color: ${p=>p.variant==='primary' ? '#001016' : 'var(--text)'};
  border: 1px solid ${p=>p.variant==='primary' ? 'var(--brand-dark)' : '#1f2937'};
  transition: transform .06s ease, filter .06s ease;
  &:hover { transform: translateY(-1px); filter: brightness(1.05); }
  &:active { transform: translateY(0); }
  opacity: ${p => p.disabled ? .6 : 1};
`;
export const Banner = styled.div`
  padding:.85rem 1rem; border-radius:.9rem; font-size:.95rem; margin-bottom:1rem;
  background: ${p=>p.type==='ok' ? 'rgba(22,163,74,.15)' : 'rgba(239,68,68,.12)'};
  border: 1px solid ${p=>p.type==='ok' ? 'rgba(22,163,74,.35)' : 'rgba(239,68,68,.35)'};
  color: ${p=>p.type==='ok' ? '#65d38a' : '#ff8a8a'};
`;
