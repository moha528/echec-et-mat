import { useEffect, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Eyebrow } from '@/components/Eyebrow';
import { CTA } from '@/components/CTA';
import { Icon } from '@/components/Icon';
import { fadeUp, stagger } from '@/lib/motion';

const CANDIDATE_EMAIL = 'Bayeamadou283@gmail.com';
const WHATSAPP_DIRECT_URL = 'https://wa.me/221779331767';
const WHATSAPP_GROUP_URL =
  'https://chat.whatsapp.com/FmTdNVOgAFFKkfp3emqHj4';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&');

export const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [botField, setBotField] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    document.title = 'Contact — Échec et Mat';
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'contact',
          'bot-field': botField,
          name,
          email,
          message,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <article className="pt-32 pb-16">
      <section className="max-w-page mx-auto px-5 sm:px-8 md:px-10 lg:px-16">
        <motion.div initial="hidden" animate="show" variants={stagger(0.1, 0.1)}>
          <motion.div variants={fadeUp}>
            <Eyebrow className="mb-5">Échange direct</Eyebrow>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-display text-bone tracking-tightest"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400 }}
          >
            Laisse un mot.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="font-display italic text-bone-3 mt-5 text-[1.125rem] max-w-prose2"
          >
            Tu veux conseiller, soutenir, partager une idée ? Chaque message
            compte.
          </motion.p>
        </motion.div>

        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={onSubmit}
          className="mt-16 max-w-2xl"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden">
            <label>
              Ne pas remplir :{' '}
              <input
                name="bot-field"
                value={botField}
                onChange={(e) => setBotField(e.target.value)}
              />
            </label>
          </p>

          <div className="space-y-6">
            <label className="block">
              <span className="label text-bone-3 text-[0.6875rem]">
                Ton prénom
              </span>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full bg-transparent border border-line focus:border-bronze focus:outline-none px-4 py-4 text-bone text-[1rem] transition-colors"
                required
              />
            </label>

            <label className="block">
              <span className="label text-bone-3 text-[0.6875rem]">
                Ton email (pour que Baye Amadou puisse te répondre)
              </span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full bg-transparent border border-line focus:border-bronze focus:outline-none px-4 py-4 text-bone text-[1rem] transition-colors"
                required
              />
            </label>

            <label className="block">
              <span className="label text-bone-3 text-[0.6875rem]">
                Ton message
              </span>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="mt-2 w-full bg-transparent border border-line focus:border-bronze focus:outline-none px-4 py-4 text-bone text-[1rem] resize-none transition-colors"
                required
              />
            </label>
          </div>

          <div className="mt-10 flex items-center gap-6">
            <CTA variant="primary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Envoi…' : 'Envoyer'}
            </CTA>
            {status === 'sent' && (
              <span className="text-bronze text-[0.875rem]">
                Message envoyé. Merci.
              </span>
            )}
            {status === 'error' && (
              <span className="text-red-400 text-[0.875rem]">
                Échec de l’envoi. Réessaie ou utilise un lien direct ci-dessous.
              </span>
            )}
          </div>
        </form>

        <hr className="border-line my-20" />

        <div className="space-y-5">
          <Eyebrow className="mb-4">Liens directs</Eyebrow>
          <ul className="space-y-1">
            <li>
              <a
                href={WHATSAPP_DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-5 border-b border-line text-bone-2 hover:text-bronze transition-colors"
              >
                <Icon name="whatsapp" size={18} className="text-bronze" />
                <span className="font-display text-[1.25rem]">
                  WhatsApp direct
                </span>
                <span className="ml-auto text-[0.8125rem] font-mono text-bone-3 group-hover:text-bronze">
                  +221 77 933 17 67
                </span>
              </a>
            </li>
            <li>
              <a
                href={WHATSAPP_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-5 border-b border-line text-bone-2 hover:text-bronze transition-colors"
              >
                <Icon name="whatsapp" size={18} className="text-bronze" />
                <span className="font-display text-[1.25rem]">
                  Groupe WhatsApp EEM
                </span>
                <span className="ml-auto text-[0.6875rem] tracking-eyebrow uppercase text-bone-3 group-hover:text-bronze">
                  Rejoindre
                </span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CANDIDATE_EMAIL}`}
                className="group flex items-center gap-4 py-5 border-b border-line text-bone-2 hover:text-bronze transition-colors"
              >
                <Icon name="mail" size={18} className="text-bronze" />
                <span className="font-display text-[1.25rem]">Email direct</span>
                <span className="ml-auto text-[0.8125rem] font-mono text-bone-3 group-hover:text-bronze">
                  {CANDIDATE_EMAIL}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </article>
  );
};
